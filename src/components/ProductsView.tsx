import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  AlertCircle,
  Expand,
  ExternalLink,
  Flame,
  Instagram,
  MessageCircle,
  Search,
  X,
} from 'lucide-react';
import {
  ADDITIONAL_PRODUCTS,
  DELIVERY_APPS,
  FEATURED_PRODUCTS,
  INSTAGRAM_URL,
  Language,
  MNAKEESH_MENU,
  MnakeeshCategory,
  ProductCategory,
  UI_COPY,
  WHATSAPP_URL,
} from '../data/bakeryData';
import { SmartImage } from './SmartImage';

interface ProductsViewProps {
  lang: Language;
  initialCategory?: ProductCategory;
  isLoading?: boolean;
  onOpenLightbox: (photoIndex: number) => void;
}

const TOP_TABS: readonly ProductCategory[] = [
  'all',
  'mnakeesh',
  'savory',
  'sweets',
  'seasonal',
];

const MNAKEESH_CATEGORIES: readonly MnakeeshCategory[] = [
  'all',
  'cheese',
  'meat',
  'labneh',
  'assorted',
  'sweet',
];

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[’']/g, '')
    .trim();
}

function formatPrice(value: number | null): string {
  if (value === null) return '—';
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

// Verified price labels derived strictly from the official Mnakeesh price sheet
function getVerifiedProductPriceLabel(
  productId: string,
  lang: Language
): { text: string; isExactPrice: boolean } {
  if (productId === 'mankousheh') {
    return {
      text: lang === 'ar' ? '4 – 15.5 ر.س' : '4 – 15.5 SAR',
      isExactPrice: true,
    };
  }
  if (productId === 'loqmah-box') {
    return {
      text: lang === 'ar' ? 'اللقمة 4 – 5.5 ر.س' : 'Loqmah 4 – 5.5 SAR',
      isExactPrice: true,
    };
  }
  return {
    text: lang === 'ar' ? 'السعر عبر واتساب' : 'Price on WhatsApp',
    isExactPrice: false,
  };
}

function FeaturedProductCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="rounded-2xl overflow-hidden bg-[#FFFFFF] dark:bg-[#241B16] border border-[#D0BAA4] dark:border-[#4F3E33] flex flex-col"
    >
      <div className="aspect-[4/5] w-full skeleton-shimmer" />
      <div className="p-5 sm:p-6 space-y-3.5">
        <div className="flex items-center justify-between gap-3">
          <div className="h-7 w-2/5 rounded-lg skeleton-shimmer" />
          <div className="h-7 w-28 rounded-lg skeleton-shimmer" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full rounded-md skeleton-shimmer" />
          <div className="h-4 w-4/5 rounded-md skeleton-shimmer" />
        </div>
        <div className="pt-1 h-4 w-3/5 rounded-md skeleton-shimmer" />
      </div>
    </div>
  );
}

function MnakeeshCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#241B16] border border-[#D0BAA4] dark:border-[#4F3E33] flex flex-col justify-between gap-4"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="h-6 w-3/5 rounded-lg skeleton-shimmer" />
        <div className="h-4 w-16 rounded-md skeleton-shimmer" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="h-[58px] rounded-xl skeleton-shimmer" />
        <div className="h-[58px] rounded-xl skeleton-shimmer" />
        <div className="h-[58px] rounded-xl skeleton-shimmer" />
      </div>
    </div>
  );
}

function AdditionalProductCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#241B16] border border-[#D0BAA4] dark:border-[#4F3E33] space-y-2.5"
    >
      <div className="h-6 w-1/2 rounded-lg skeleton-shimmer" />
      <div className="h-4 w-5/6 rounded-md skeleton-shimmer" />
    </div>
  );
}

export function ProductsView({
  lang,
  initialCategory = 'all',
  isLoading = false,
  onOpenLightbox,
}: ProductsViewProps) {
  const [selectedTab, setSelectedTab] =
    useState<ProductCategory>(initialCategory);
  const [mnakeeshSubCat, setMnakeeshSubCat] =
    useState<MnakeeshCategory>('all');
  const [showAllergens, setShowAllergens] = useState(false);
  const [query, setQuery] = useState('');
  const [isTransitionLoading, setIsTransitionLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const cardScaleMotion = prefersReducedMotion
    ? {}
    : {
        whileHover: { scale: 1.015, y: -2 },
        whileTap: { scale: 0.97 },
        transition: {
          type: 'spring' as const,
          stiffness: 440,
          damping: 26,
          mass: 0.8,
        },
      };

  useEffect(() => {
    setSelectedTab(initialCategory);
  }, [initialCategory]);

  // Brief smooth skeleton state on initial view entry & tab switching (skipped if reduced motion)
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsTransitionLoading(false);
      return;
    }

    setIsTransitionLoading(true);
    const timer = window.setTimeout(() => {
      setIsTransitionLoading(false);
    }, 280);

    return () => window.clearTimeout(timer);
  }, [selectedTab]);

  const showSkeleton = isLoading || isTransitionLoading;

  const normalizedQuery = normalizeText(query);

  const matchesSearch = (parts: string[]): boolean => {
    if (!normalizedQuery) return true;
    return parts.some((part) => normalizeText(part).includes(normalizedQuery));
  };

  // Photographed products filter
  const visibleFeatured = FEATURED_PRODUCTS.filter((item) => {
    if (!normalizedQuery) {
      if (selectedTab === 'mnakeesh') {
        if (item.id !== 'mankousheh' && item.id !== 'loqmah-box') return false;
      } else if (selectedTab !== 'all' && item.category !== selectedTab) {
        return false;
      }
    }
    const searchable = [
      item.name.ar,
      item.name.en,
      item.description.ar,
      item.description.en,
      ...(item.varieties?.ar ?? []),
      ...(item.varieties?.en ?? []),
      ...(item.searchTerms?.ar ?? []),
      ...(item.searchTerms?.en ?? []),
    ];
    return matchesSearch(searchable);
  });

  // Official 34-item Mnakeesh Menu filter
  const visibleMnakeesh = MNAKEESH_MENU.filter((item) => {
    if (!normalizedQuery) {
      if (selectedTab !== 'all' && selectedTab !== 'mnakeesh') return false;
      if (mnakeeshSubCat !== 'all' && item.category !== mnakeeshSubCat) {
        return false;
      }
    }
    return matchesSearch([
      item.name.ar,
      item.name.en,
      UI_COPY.products.mnakeeshCategories[item.category].ar,
      UI_COPY.products.mnakeeshCategories[item.category].en,
    ]);
  });

  const visibleAdditional = ADDITIONAL_PRODUCTS.filter((item) => {
    if (!normalizedQuery) {
      if (selectedTab === 'mnakeesh') return false;
      if (selectedTab !== 'all' && item.category !== selectedTab) return false;
    }
    return matchesSearch([item.name.ar, item.name.en]);
  });

  const showFeaturedSection = visibleFeatured.length > 0;
  const showMnakeeshSection = visibleMnakeesh.length > 0;
  const showAdditionalSection = visibleAdditional.length > 0;
  const hasAnyResults =
    showFeaturedSection || showMnakeeshSection || showAdditionalSection;

  const mnakeeshGroups = (
    ['cheese', 'meat', 'labneh', 'assorted', 'sweet'] as const
  )
    .map((cat) => ({
      category: cat,
      items: visibleMnakeesh.filter((i) => i.category === cat),
    }))
    .filter((group) => group.items.length > 0);

  const handleReset = () => {
    setQuery('');
    setMnakeeshSubCat('all');
    setSelectedTab('all');
  };

  const featuredSkeletonCount =
    selectedTab === 'mnakeesh'
      ? 2
      : selectedTab === 'sweets'
        ? 2
        : selectedTab === 'seasonal'
          ? 0
          : 4;

  const showMnakeeshSkeleton =
    selectedTab === 'all' || selectedTab === 'mnakeesh';

  const showAdditionalSkeleton =
    selectedTab === 'all' ||
    selectedTab === 'savory' ||
    selectedTab === 'seasonal';

  return (
    <div className="space-y-9 sm:space-y-12">
      {/* Page Header + High-Contrast Category Tabs + Search */}
      <div className="space-y-5">
        <div className="max-w-3xl space-y-2">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1A110C] dark:text-[#FFF8F0]">
            {UI_COPY.products.pageTitle[lang]}
          </h1>
          <p className="text-base sm:text-[17px] leading-relaxed text-[#463328] dark:text-[#E6D7C9]">
            {UI_COPY.products.pageSubtitle[lang]}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
          <div
            role="tablist"
            aria-label={UI_COPY.products.pageTitle[lang]}
            className="flex overflow-x-auto no-scrollbar items-center gap-2 -mx-4 px-4 pb-1 sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap"
          >
            {TOP_TABS.map((tab) => {
              const isSelected = selectedTab === tab;
              const label =
                tab === 'all'
                  ? lang === 'ar'
                    ? 'الكل'
                    : 'All'
                  : UI_COPY.products.filters[tab][lang];

              return (
                <button
                  key={tab}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setSelectedTab(tab)}
                  className={`min-h-[44px] px-4 rounded-xl text-sm sm:text-[15px] font-bold border transition-colors duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1A110C] border-[#1A110C] text-[#FFFFFF] dark:bg-[#FFF8F0] dark:border-[#FFF8F0] dark:text-[#17120F]'
                      : 'bg-[#FFFFFF] dark:bg-[#241B16] border-[#D0BAA4] dark:border-[#4F3E33] text-[#1A110C] dark:text-[#FFF8F0] hover:bg-[#F3E9DD] dark:hover:bg-[#31251E]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:max-w-sm">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 -translate-y-1/2 start-3.5 w-4 h-4 text-[#463328] dark:text-[#E6D7C9]"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={UI_COPY.products.searchPlaceholder[lang]}
              aria-label={UI_COPY.products.searchPlaceholder[lang]}
              className="w-full min-h-[46px] ps-10 pe-10 py-2.5 rounded-xl bg-[#FFFFFF] dark:bg-[#241B16] border border-[#C8B19A] dark:border-[#564438] text-base text-[#1A110C] dark:text-[#FFF8F0] placeholder:text-[#664F41] dark:placeholder:text-[#C4B09F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A110C] dark:focus-visible:outline-[#FFF8F0]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label={UI_COPY.actions.clearSearch[lang]}
                className="absolute top-1/2 -translate-y-1/2 end-1.5 w-9 h-9 rounded-lg flex items-center justify-center text-[#1A110C] dark:text-[#FFF8F0] hover:bg-[#F1E7DA] dark:hover:bg-[#332720] cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SKELETON LOADING VIEW — Zero-CLS Placeholders matching exact product & menu card geometry */}
      {showSkeleton ? (
        <div role="status" aria-live="polite" className="space-y-10">
          <span className="sr-only">
            {lang === 'ar' ? 'جاري تحميل المنتجات...' : 'Loading products...'}
          </span>

          {featuredSkeletonCount > 0 && (
            <section className="space-y-5">
              <div
                aria-hidden="true"
                className="h-8 w-56 rounded-lg skeleton-shimmer"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
                {Array.from({ length: featuredSkeletonCount }).map((_, idx) => (
                  <FeaturedProductCardSkeleton key={idx} />
                ))}
              </div>
            </section>
          )}

          {showMnakeeshSkeleton && (
            <section className="space-y-6 pt-2">
              <div className="space-y-2 pb-4 border-b border-[#D8C6B2] dark:border-[#42342B]">
                <div
                  aria-hidden="true"
                  className="h-8 w-64 rounded-lg skeleton-shimmer"
                />
                <div
                  aria-hidden="true"
                  className="h-4 w-80 max-w-full rounded-md skeleton-shimmer"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <MnakeeshCardSkeleton key={idx} />
                ))}
              </div>
            </section>
          )}

          {showAdditionalSkeleton && (
            <section className="pt-6 border-t border-[#D8C6B2] dark:border-[#42342B] space-y-4">
              <div
                aria-hidden="true"
                className="h-7 w-48 rounded-lg skeleton-shimmer"
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                {Array.from({ length: selectedTab === 'seasonal' ? 1 : 3 }).map(
                  (_, idx) => (
                    <AdditionalProductCardSkeleton key={idx} />
                  )
                )}
              </div>
            </section>
          )}
        </div>
      ) : (
        <>
          {/* Empty State */}
          {!hasAnyResults && (
            <div className="p-8 rounded-2xl bg-[#FFFFFF] dark:bg-[#241B16] border border-[#D0BAA4] dark:border-[#4F3E33] text-center space-y-4">
              <p className="text-base font-semibold text-[#1A110C] dark:text-[#FFF8F0]">
                {UI_COPY.products.noResults[lang]}
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="min-h-[46px] px-6 rounded-xl bg-[#9A3A05] hover:bg-[#7F2F04] dark:bg-[#F08A43] dark:hover:bg-[#FFA05C] text-[#FFFFFF] dark:text-[#17120F] text-sm font-bold cursor-pointer"
              >
                {UI_COPY.actions.resetFilters[lang]}
              </button>
            </div>
          )}

          {/* 1. LARGE PHOTOGRAPHED PRODUCTS DYNAMIC GRID (2-Column Hero-Scale Cards with Names & Verified Prices) */}
          {showFeaturedSection && (
            <section
              aria-labelledby="bakery-showcase-heading"
              className="space-y-5"
            >
              <div className="flex items-end justify-between gap-4">
                <h2
                  id="bakery-showcase-heading"
                  className="font-display text-2xl sm:text-[26px] font-bold text-[#1A110C] dark:text-[#FFF8F0]"
                >
                  {UI_COPY.products.showcaseHeading[lang]}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
                {visibleFeatured.map((product) => {
                  const originalIndex = FEATURED_PRODUCTS.findIndex(
                    (p) => p.id === product.id
                  );
                  const priceInfo = getVerifiedProductPriceLabel(
                    product.id,
                    lang
                  );

                  return (
                    <motion.article
                      key={product.id}
                      {...cardScaleMotion}
                      className="group rounded-2xl overflow-hidden bg-[#FFFFFF] dark:bg-[#241B16] border border-[#D0BAA4] dark:border-[#4F3E33] flex flex-col transition-colors duration-200 hover:border-[#9A3A05] dark:hover:border-[#F08A43] hover:shadow-md active:shadow-xs shadow-xs will-change-transform"
                    >
                      <button
                        type="button"
                        onClick={() => onOpenLightbox(originalIndex)}
                        aria-label={product.name[lang]}
                        className="w-full h-full flex flex-col text-start cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1A110C] dark:focus-visible:outline-[#FFF8F0]"
                      >
                        {/* Large 4:5 High-Presence Product Photo (with built-in image Skeleton shimmer while downloading) */}
                        <div className="relative aspect-[4/5] w-full overflow-hidden block bg-[#EFE4D6] dark:bg-[#1C1511]">
                          <SmartImage
                            src={product.imageUrl}
                            alt={product.name[lang]}
                            fit="cover"
                            showSkeleton
                            className="object-center transition-transform duration-400 ease-out group-hover:scale-[1.03]"
                          />
                          <span className="pointer-events-none absolute top-3.5 end-3.5 z-20 w-10 h-10 rounded-xl flex items-center justify-center bg-[#1A110C]/75 text-[#FFFFFF] opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-xs">
                            <Expand className="w-4 h-4" aria-hidden="true" />
                          </span>
                        </div>

                        {/* High-Contrast Card Info: Title + Clear Price + Description + Varieties */}
                        <div className="w-full p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
                          <div className="space-y-2.5">
                            <div className="flex flex-wrap items-baseline justify-between gap-2.5">
                              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1A110C] dark:text-[#FFF8F0]">
                                {product.name[lang]}
                              </h3>

                              <span
                                className={`text-sm sm:text-base font-bold tabular-nums px-3 py-1 rounded-lg ${
                                  priceInfo.isExactPrice
                                    ? 'bg-[#9A3A05] text-[#FFFFFF] dark:bg-[#F08A43] dark:text-[#17120F]'
                                    : 'bg-[#F3E9DD] text-[#3F2E24] dark:bg-[#332720] dark:text-[#EFE2D5]'
                                }`}
                              >
                                {priceInfo.text}
                              </span>
                            </div>

                            <p className="text-[15px] leading-relaxed text-[#463328] dark:text-[#E6D7C9]">
                              {product.description[lang]}
                            </p>

                            {product.varieties &&
                              product.varieties[lang].length > 0 && (
                                <p className="pt-1 text-sm font-semibold text-[#664B3B] dark:text-[#D5C0AF]">
                                  {product.varieties[lang].join(' · ')}
                                </p>
                              )}
                          </div>
                        </div>
                      </button>
                    </motion.article>
                  );
                })}
              </div>
            </section>
          )}

          {/* 2. OFFICIAL MNAKEESH MENU — HIGH-CONTRAST DYNAMIC CARD GRID */}
          {showMnakeeshSection && (
            <section
              aria-labelledby="mnakeesh-menu-heading"
              className="space-y-6 pt-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3.5 pb-4 border-b border-[#D8C6B2] dark:border-[#42342B]">
                <div className="space-y-1">
                  <h2
                    id="mnakeesh-menu-heading"
                    className="font-display text-2xl sm:text-3xl font-bold text-[#1A110C] dark:text-[#FFF8F0]"
                  >
                    {UI_COPY.products.mnakeeshHeading[lang]}
                  </h2>
                  <p className="text-sm sm:text-[15px] font-semibold text-[#463328] dark:text-[#E6D7C9]">
                    {lang === 'ar'
                      ? 'الأسعار بالريال السعودي (ر.س) للأحجام الثلاثة: كبير · وسط · لقمة'
                      : 'Prices in Saudi Riyals (SAR) for all three sizes: Large · Medium · Loqmah'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAllergens((prev) => !prev)}
                  aria-pressed={showAllergens}
                  className={`self-start sm:self-auto min-h-[42px] px-4 rounded-xl inline-flex items-center gap-2 text-sm font-bold border transition-colors cursor-pointer ${
                    showAllergens
                      ? 'bg-[#1A110C] border-[#1A110C] text-[#FFFFFF] dark:bg-[#FFF8F0] dark:border-[#FFF8F0] dark:text-[#17120F]'
                      : 'bg-[#FFFFFF] dark:bg-[#241B16] border-[#C8B19A] dark:border-[#564438] text-[#1A110C] dark:text-[#FFF8F0] hover:bg-[#F3E9DD] dark:hover:bg-[#31251E]'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>
                    {showAllergens
                      ? UI_COPY.products.hideAllergens[lang]
                      : UI_COPY.products.showAllergens[lang]}
                  </span>
                </button>
              </div>

              {/* Mnakeesh Section Filter Strip */}
              {!normalizedQuery && (
                <div className="flex overflow-x-auto no-scrollbar items-center gap-2 -mx-4 px-4 pb-1 sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap">
                  {MNAKEESH_CATEGORIES.map((subCat) => {
                    const isSelected = mnakeeshSubCat === subCat;
                    return (
                      <button
                        key={subCat}
                        type="button"
                        onClick={() => setMnakeeshSubCat(subCat)}
                        className={`min-h-[42px] px-4 rounded-xl text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                          isSelected
                            ? 'bg-[#9A3A05] border-[#9A3A05] text-[#FFFFFF] dark:bg-[#F08A43] dark:border-[#F08A43] dark:text-[#17120F]'
                            : 'bg-[#FFFFFF] dark:bg-[#241B16] border-[#D0BAA4] dark:border-[#4F3E33] text-[#1A110C] dark:text-[#FFF8F0] hover:bg-[#F3E9DD] dark:hover:bg-[#31251E]'
                        }`}
                      >
                        {UI_COPY.products.mnakeeshCategories[subCat][lang]}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Dynamic Card Grid Grouped by Official Menu Category */}
              <div className="space-y-8">
                {mnakeeshGroups.map(({ category, items }) => (
                  <div key={category} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#9A3A05] dark:text-[#FF9E57]">
                        {UI_COPY.products.mnakeeshCategories[category][lang]}
                      </h3>
                      <div
                        aria-hidden="true"
                        className="h-px flex-1 bg-[#D8C6B2] dark:bg-[#42342B]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                      {items.map((item) => (
                        <motion.article
                          key={item.id}
                          {...cardScaleMotion}
                          className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#241B16] border border-[#D0BAA4] dark:border-[#4F3E33] flex flex-col justify-between gap-4 transition-colors duration-200 hover:border-[#9A3A05] dark:hover:border-[#F08A43] hover:shadow-md active:shadow-xs cursor-pointer select-none will-change-transform"
                        >
                          {/* Top Row: Bold Item Name + High-Contrast Calories */}
                          <div className="flex items-start justify-between gap-2.5">
                            <h4 className="font-display text-lg font-bold leading-snug text-[#1A110C] dark:text-[#FFF8F0]">
                              {item.name[lang]}
                            </h4>

                            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#5A4031] dark:text-[#E5D3C3] shrink-0 pt-0.5 tabular-nums">
                              <Flame
                                className="w-3.5 h-3.5 text-[#C2540A] dark:text-[#FF9E57] shrink-0"
                                aria-hidden="true"
                              />
                              <span>
                                {item.calories}{' '}
                                {UI_COPY.products.caloriesUnit[lang]}
                              </span>
                            </span>
                          </div>

                          {/* 3-Size High-Contrast Price Blocks */}
                          <div className="grid grid-cols-3 gap-2">
                            {/* Large — Prominent Brand Accent */}
                            <div
                              className={`px-2 py-2.5 rounded-xl text-center border ${
                                item.priceLarge !== null
                                  ? 'bg-[#9A3A05] border-[#9A3A05] text-[#FFFFFF] dark:bg-[#F08A43] dark:border-[#F08A43] dark:text-[#17120F]'
                                  : 'bg-[#F8F3EC] dark:bg-[#1B1410] border-[#E8DDD0] dark:border-[#342821] text-[#9E8A7A] dark:text-[#665448]'
                              }`}
                            >
                              <span
                                className={`block text-[11px] font-bold ${
                                  item.priceLarge !== null
                                    ? 'opacity-90'
                                    : 'opacity-70'
                                }`}
                              >
                                {UI_COPY.products.sizeLarge[lang]}
                              </span>
                              <div className="mt-0.5 flex items-baseline justify-center gap-0.5">
                                <span className="text-[17px] font-bold tabular-nums">
                                  {formatPrice(item.priceLarge)}
                                </span>
                                {item.priceLarge !== null && (
                                  <span className="text-[10px] font-bold opacity-90">
                                    {UI_COPY.products.currency[lang]}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Medium — Crisp High-Contrast Neutral */}
                            <div
                              className={`px-2 py-2.5 rounded-xl text-center border ${
                                item.priceMedium !== null
                                  ? 'bg-[#F6EDE3] dark:bg-[#31251E] border-[#DAC5B0] dark:border-[#554236] text-[#1A110C] dark:text-[#FFF8F0]'
                                  : 'bg-[#F8F3EC] dark:bg-[#1B1410] border-[#E8DDD0] dark:border-[#342821] text-[#9E8A7A] dark:text-[#665448]'
                              }`}
                            >
                              <span className="block text-[11px] font-bold text-[#4F3A2E] dark:text-[#DFCEC0]">
                                {UI_COPY.products.sizeMedium[lang]}
                              </span>
                              <div className="mt-0.5 flex items-baseline justify-center gap-0.5">
                                <span className="text-[17px] font-bold tabular-nums">
                                  {formatPrice(item.priceMedium)}
                                </span>
                                {item.priceMedium !== null && (
                                  <span className="text-[10px] font-bold text-[#5A4437] dark:text-[#D1BEAE]">
                                    {UI_COPY.products.currency[lang]}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Loqmah — Crisp High-Contrast Neutral */}
                            <div
                              className={`px-2 py-2.5 rounded-xl text-center border ${
                                item.priceLoqmah !== null
                                  ? 'bg-[#F6EDE3] dark:bg-[#31251E] border-[#DAC5B0] dark:border-[#554236] text-[#1A110C] dark:text-[#FFF8F0]'
                                  : 'bg-[#F8F3EC] dark:bg-[#1B1410] border-[#E8DDD0] dark:border-[#342821] text-[#9E8A7A] dark:text-[#665448]'
                              }`}
                            >
                              <span className="block text-[11px] font-bold text-[#4F3A2E] dark:text-[#DFCEC0]">
                                {UI_COPY.products.sizeLoqmah[lang]}
                              </span>
                              <div className="mt-0.5 flex items-baseline justify-center gap-0.5">
                                <span className="text-[17px] font-bold tabular-nums">
                                  {formatPrice(item.priceLoqmah)}
                                </span>
                                {item.priceLoqmah !== null && (
                                  <span className="text-[10px] font-bold text-[#5A4437] dark:text-[#D1BEAE]">
                                    {UI_COPY.products.currency[lang]}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {showAllergens && (
                            <p className="pt-2.5 border-t border-[#EFE3D5] dark:border-[#382B23] text-xs font-semibold text-[#463328] dark:text-[#E0CFC0] leading-relaxed">
                              {UI_COPY.products.allergensLabel[lang]}:{' '}
                              {item.allergens[lang]}
                            </p>
                          )}
                        </motion.article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs sm:text-sm font-medium leading-relaxed text-[#463328] dark:text-[#DFCFC0] px-1">
                {UI_COPY.products.calorieNote[lang]}
              </p>
            </section>
          )}

          {/* 3. Additional Verified Bakery Specialties */}
          {showAdditionalSection && (
            <section
              aria-labelledby="more-products-heading"
              className="pt-6 border-t border-[#D8C6B2] dark:border-[#42342B]"
            >
              <h2
                id="more-products-heading"
                className="font-display text-xl sm:text-2xl font-bold text-[#1A110C] dark:text-[#FFF8F0] mb-4"
              >
                {UI_COPY.products.moreHeading[lang]}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                {visibleAdditional.map((item) => (
                  <motion.article
                    key={item.id}
                    {...cardScaleMotion}
                    className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#241B16] border border-[#D0BAA4] dark:border-[#4F3E33] space-y-1.5 transition-colors duration-200 hover:border-[#9A3A05] dark:hover:border-[#F08A43] hover:shadow-md active:shadow-xs cursor-pointer select-none will-change-transform"
                  >
                    <h3 className="font-display text-lg font-bold text-[#1A110C] dark:text-[#FFF8F0]">
                      {item.name[lang]}
                    </h3>
                    <p className="text-sm font-medium text-[#463328] dark:text-[#E6D7C9]">
                      {item.description[lang]}
                    </p>
                  </motion.article>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* Single Unified Order Strip at Bottom */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#241B16] border border-[#D0BAA4] dark:border-[#4F3E33] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-display text-lg font-bold text-[#1A110C] dark:text-[#FFF8F0]">
            {UI_COPY.products.orderStripTitle[lang]}
          </h2>
          <p
            dir="ltr"
            className="text-sm font-bold text-[#463328] dark:text-[#E6D7C9]"
          >
            {DELIVERY_APPS.join(' · ')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] px-5 rounded-xl inline-flex items-center justify-center gap-2 bg-[#9A3A05] hover:bg-[#7F2F04] dark:bg-[#F08A43] dark:hover:bg-[#FFA05C] text-[#FFFFFF] dark:text-[#17120F] text-sm sm:text-[15px] font-bold transition-colors active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{UI_COPY.actions.orderOnWhatsapp[lang]}</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] px-4 rounded-xl inline-flex items-center justify-center gap-2 bg-[#F3E9DD] hover:bg-[#E7DAC9] dark:bg-[#31251E] dark:hover:bg-[#3E2F26] border border-[#C8B19A] dark:border-[#564438] text-[#1A110C] dark:text-[#FFF8F0] text-sm font-bold transition-colors active:scale-[0.98]"
          >
            <Instagram className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span dir="ltr">@atayeb_marhaba</span>
          </a>
        </div>
      </section>
    </div>
  );
}
