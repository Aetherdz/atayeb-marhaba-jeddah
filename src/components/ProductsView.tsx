import { useEffect, useState } from 'react';
import {
  AlertCircle,
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
  onOpenLightbox: (photoIndex: number) => void;
}

const TOP_TABS: readonly ProductCategory[] = [
  'mnakeesh',
  'all',
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

export function ProductsView({
  lang,
  initialCategory = 'mnakeesh',
  onOpenLightbox,
}: ProductsViewProps) {
  const [selectedTab, setSelectedTab] =
    useState<ProductCategory>(initialCategory);
  const [mnakeeshSubCat, setMnakeeshSubCat] =
    useState<MnakeeshCategory>('all');
  const [showAllergens, setShowAllergens] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setSelectedTab(initialCategory);
  }, [initialCategory]);

  const normalizedQuery = normalizeText(query);

  const matchesSearch = (parts: string[]): boolean => {
    if (!normalizedQuery) return true;
    return parts.some((part) => normalizeText(part).includes(normalizedQuery));
  };

  // Official 34-item Mnakeesh Menu matches
  const visibleMnakeesh = MNAKEESH_MENU.filter((item) => {
    if (
      !normalizedQuery &&
      selectedTab === 'mnakeesh' &&
      mnakeeshSubCat !== 'all' &&
      item.category !== mnakeeshSubCat
    ) {
      return false;
    }
    return matchesSearch([
      item.name.ar,
      item.name.en,
      UI_COPY.products.mnakeeshCategories[item.category].ar,
      UI_COPY.products.mnakeeshCategories[item.category].en,
    ]);
  });

  // Photographed bakery items matches
  const visibleFeatured = FEATURED_PRODUCTS.filter((item) => {
    if (!normalizedQuery) {
      if (selectedTab === 'mnakeesh') return false;
      if (selectedTab !== 'all' && item.category !== selectedTab) return false;
    }
    const searchable = [
      item.name.ar,
      item.name.en,
      ...(item.varieties?.ar ?? []),
      ...(item.varieties?.en ?? []),
      ...(item.searchTerms?.ar ?? []),
      ...(item.searchTerms?.en ?? []),
    ];
    return matchesSearch(searchable);
  });

  const visibleAdditional = ADDITIONAL_PRODUCTS.filter((item) => {
    if (!normalizedQuery) {
      if (selectedTab === 'mnakeesh') return false;
      if (selectedTab !== 'all' && item.category !== selectedTab) return false;
    }
    return matchesSearch([item.name.ar, item.name.en]);
  });

  const showMnakeeshSection =
    selectedTab === 'mnakeesh' || (normalizedQuery.length > 0 && visibleMnakeesh.length > 0);
  const showBakeryShowcase =
    selectedTab !== 'mnakeesh' ||
    (normalizedQuery.length > 0 &&
      (visibleFeatured.length > 0 || visibleAdditional.length > 0));

  const hasAnyResults =
    (showMnakeeshSection && visibleMnakeesh.length > 0) ||
    (showBakeryShowcase &&
      (visibleFeatured.length > 0 || visibleAdditional.length > 0));

  // Group visible Mnakeesh items by their official section
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
    setSelectedTab('mnakeesh');
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Header + Top Category Tabs + Unified Search */}
      <div className="space-y-5">
        <div className="max-w-3xl space-y-1.5">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#241914] dark:text-[#F6EDE3]">
            {UI_COPY.products.pageTitle[lang]}
          </h1>
          <p className="text-base sm:text-[17px] leading-relaxed text-[#4A372C] dark:text-[#DFD0C3]">
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
              return (
                <button
                  key={tab}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setSelectedTab(tab)}
                  className={`min-h-[44px] px-4 rounded-xl text-sm sm:text-[15px] font-semibold border transition-colors duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#241914] border-[#241914] text-[#FFFDF9] dark:bg-[#F6EDE3] dark:border-[#F6EDE3] dark:text-[#17120F]'
                      : 'bg-[#F4ECE1] dark:bg-[#231B16] border-[#DFCEBC] dark:border-[#3E3028] text-[#241914] dark:text-[#F6EDE3] hover:bg-[#EAE0D1] dark:hover:bg-[#31261F]'
                  }`}
                >
                  {UI_COPY.products.filters[tab][lang]}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:max-w-sm">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 -translate-y-1/2 start-3.5 w-4 h-4 text-[#4A372C] dark:text-[#DFD0C3]"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={UI_COPY.products.searchPlaceholder[lang]}
              aria-label={UI_COPY.products.searchPlaceholder[lang]}
              className="w-full min-h-[46px] ps-10 pe-10 py-2.5 rounded-xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#D8C6B2] dark:border-[#493A30] text-base text-[#241914] dark:text-[#F6EDE3] placeholder:text-[#6B5446] dark:placeholder:text-[#B8A495] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label={UI_COPY.actions.clearSearch[lang]}
                className="absolute top-1/2 -translate-y-1/2 end-1.5 w-9 h-9 rounded-lg flex items-center justify-center text-[#3D2B21] dark:text-[#E5D7CA] hover:bg-[#F1E7DA] dark:hover:bg-[#31261F] cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {!hasAnyResults && (
        <div className="p-8 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#DFCEBC] dark:border-[#3E3028] text-center space-y-4">
          <p className="text-base font-medium text-[#3D2B21] dark:text-[#E5D7CA]">
            {UI_COPY.products.noResults[lang]}
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="min-h-[46px] px-6 rounded-xl bg-[#A84208] hover:bg-[#8E3706] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-sm font-bold cursor-pointer"
          >
            {UI_COPY.actions.resetFilters[lang]}
          </button>
        </div>
      )}

      {/* 1. OFFICIAL MNAKEESH MENU (High-Legibility Prices, Sizes, Calories & Allergens) */}
      {showMnakeeshSection && visibleMnakeesh.length > 0 && (
        <section
          aria-labelledby="mnakeesh-menu-heading"
          className="space-y-5"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <h2
                id="mnakeesh-menu-heading"
                className="font-display text-2xl font-bold text-[#241914] dark:text-[#F6EDE3]"
              >
                {UI_COPY.products.mnakeeshHeading[lang]}
              </h2>
              <p className="text-sm font-medium text-[#5A4437] dark:text-[#CBB9AA]">
                {lang === 'ar'
                  ? 'الأسعار بالريال السعودي (ر.س) حسب الحجم: كبير · وسط · لقمة'
                  : 'Prices in Saudi Riyals (SAR) by size: Large · Medium · Loqmah'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAllergens((prev) => !prev)}
              aria-pressed={showAllergens}
              className={`self-start sm:self-auto min-h-[42px] px-4 rounded-xl inline-flex items-center gap-2 text-sm font-semibold border transition-colors cursor-pointer ${
                showAllergens
                  ? 'bg-[#241914] border-[#241914] text-[#FFFDF9] dark:bg-[#F6EDE3] dark:border-[#F6EDE3] dark:text-[#17120F]'
                  : 'bg-[#FFFDF9] dark:bg-[#221A16] border-[#DFCEBC] dark:border-[#3E3028] text-[#4A372C] dark:text-[#DFD0C3] hover:bg-[#F4ECE1] dark:hover:bg-[#2C221C]'
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

          {/* Mnakeesh Sub-Category Filter Strip (hidden while searching across everything) */}
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
                        ? 'bg-[#A84208] border-[#A84208] text-[#FFFDF9] dark:bg-[#E57A32] dark:border-[#E57A32] dark:text-[#17120F]'
                        : 'bg-[#FFFDF9] dark:bg-[#221A16] border-[#DFCEBC] dark:border-[#3E3028] text-[#241914] dark:text-[#F6EDE3] hover:bg-[#F4ECE1] dark:hover:bg-[#2E231D]'
                    }`}
                  >
                    {UI_COPY.products.mnakeeshCategories[subCat][lang]}
                  </button>
                );
              })}
            </div>
          )}

          {/* High-Legibility Menu Sheets Grouped by Category */}
          <div className="space-y-6">
            {mnakeeshGroups.map(({ category, items }) => (
              <div
                key={category}
                className="rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#D8C6B2] dark:border-[#413228] overflow-x-clip shadow-xs"
              >
                {/* Sticky Section Header + Clear Desktop Column Headers */}
                <div className="md:sticky md:top-[78px] z-10 px-4 sm:px-6 py-3.5 bg-[#F4E8D8] dark:bg-[#2C211B] border-b border-[#DECBB6] dark:border-[#46362B] rounded-t-2xl flex items-center justify-between md:grid md:grid-cols-[minmax(0,2.1fr)_repeat(3,minmax(88px,0.75fr))_minmax(106px,0.85fr)] md:items-center gap-3">
                  <h3 className="font-display text-xl font-bold text-[#8E3706] dark:text-[#F08A43]">
                    {UI_COPY.products.mnakeeshCategories[category][lang]}
                  </h3>

                  <span className="md:hidden text-xs font-semibold text-[#5A4437] dark:text-[#CBB9AA]">
                    {UI_COPY.products.currency[lang]}
                  </span>

                  <div className="hidden md:flex flex-col items-center leading-tight">
                    <span className="text-sm font-bold text-[#241914] dark:text-[#F6EDE3]">
                      {UI_COPY.products.sizeLarge[lang]}
                    </span>
                    <span className="text-[11px] font-medium text-[#6B5446] dark:text-[#BCA899]">
                      {UI_COPY.products.currency[lang]}
                    </span>
                  </div>

                  <div className="hidden md:flex flex-col items-center leading-tight">
                    <span className="text-sm font-bold text-[#241914] dark:text-[#F6EDE3]">
                      {UI_COPY.products.sizeMedium[lang]}
                    </span>
                    <span className="text-[11px] font-medium text-[#6B5446] dark:text-[#BCA899]">
                      {UI_COPY.products.currency[lang]}
                    </span>
                  </div>

                  <div className="hidden md:flex flex-col items-center leading-tight">
                    <span className="text-sm font-bold text-[#241914] dark:text-[#F6EDE3]">
                      {UI_COPY.products.sizeLoqmah[lang]}
                    </span>
                    <span className="text-[11px] font-medium text-[#6B5446] dark:text-[#BCA899]">
                      {UI_COPY.products.currency[lang]}
                    </span>
                  </div>

                  <span className="hidden md:block text-end text-sm font-bold text-[#5A4437] dark:text-[#CBB9AA]">
                    {UI_COPY.products.caloriesCol[lang]}
                  </span>
                </div>

                {/* Menu Rows with Subtle Zebra Striping */}
                <ul className="divide-y divide-[#EFE3D5] dark:divide-[#332720]">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="px-4 sm:px-6 py-4 md:py-3.5 even:bg-[#FAF5EE]/75 dark:even:bg-[#271F1A]/75 hover:bg-[#F5ECE0]/70 dark:hover:bg-[#2F251E]/80 last:rounded-b-2xl transition-colors"
                    >
                      {/* Desktop Row — Balanced Columns, High-Contrast Prices */}
                      <div className="hidden md:grid md:grid-cols-[minmax(0,2.1fr)_repeat(3,minmax(88px,0.75fr))_minmax(106px,0.85fr)] items-center gap-3">
                        <div className="space-y-1 pe-2">
                          <div className="font-display font-bold text-base text-[#241914] dark:text-[#F6EDE3]">
                            {item.name[lang]}
                          </div>
                          {showAllergens && (
                            <div className="text-xs font-medium text-[#6B5446] dark:text-[#BCA899]">
                              {item.allergens[lang]}
                            </div>
                          )}
                        </div>

                        <div
                          className={`text-center text-[17px] font-bold tabular-nums ${
                            item.priceLarge !== null
                              ? 'text-[#A84208] dark:text-[#F08A43]'
                              : 'text-[#B5A08E] dark:text-[#5B493E]'
                          }`}
                        >
                          {formatPrice(item.priceLarge)}
                        </div>

                        <div
                          className={`text-center text-[17px] font-bold tabular-nums ${
                            item.priceMedium !== null
                              ? 'text-[#241914] dark:text-[#F6EDE3]'
                              : 'text-[#B5A08E] dark:text-[#5B493E]'
                          }`}
                        >
                          {formatPrice(item.priceMedium)}
                        </div>

                        <div
                          className={`text-center text-[17px] font-bold tabular-nums ${
                            item.priceLoqmah !== null
                              ? 'text-[#241914] dark:text-[#F6EDE3]'
                              : 'text-[#B5A08E] dark:text-[#5B493E]'
                          }`}
                        >
                          {formatPrice(item.priceLoqmah)}
                        </div>

                        <div className="flex items-center justify-end gap-1 text-sm font-medium text-[#6B5446] dark:text-[#BCA899] tabular-nums">
                          <Flame
                            className="w-3.5 h-3.5 text-[#C86420] dark:text-[#E58A48] shrink-0"
                            aria-hidden="true"
                          />
                          <span>
                            {item.calories} {UI_COPY.products.caloriesUnit[lang]}
                          </span>
                        </div>
                      </div>

                      {/* Mobile High-Legibility Row (360px optimized: bold name + stacked large-digit size boxes) */}
                      <div className="md:hidden space-y-2.5">
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-display font-bold text-base text-[#241914] dark:text-[#F6EDE3]">
                            {item.name[lang]}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B5446] dark:text-[#BCA899] shrink-0 tabular-nums">
                            <Flame
                              className="w-3.5 h-3.5 text-[#C86420] dark:text-[#E58A48] shrink-0"
                              aria-hidden="true"
                            />
                            <span>
                              {item.calories} {UI_COPY.products.caloriesUnit[lang]}
                            </span>
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div
                            className={`px-2.5 py-2 rounded-xl border text-center ${
                              item.priceLarge !== null
                                ? 'bg-[#FDF6EE] dark:bg-[#2C211B] border-[#E4CEB8] dark:border-[#4A382D]'
                                : 'bg-[#F8F3EC]/60 dark:bg-[#1E1713]/60 border-[#EDE3D7] dark:border-[#2F241E] opacity-50'
                            }`}
                          >
                            <span className="block text-[11px] font-semibold text-[#6B5446] dark:text-[#C5B1A2]">
                              {UI_COPY.products.sizeLarge[lang]}
                            </span>
                            <div className="mt-0.5 flex items-baseline justify-center gap-1">
                              <span className="text-[17px] font-bold text-[#A84208] dark:text-[#F08A43] tabular-nums">
                                {formatPrice(item.priceLarge)}
                              </span>
                              {item.priceLarge !== null && (
                                <span className="text-[11px] font-semibold text-[#6B5446] dark:text-[#BCA899]">
                                  {UI_COPY.products.currency[lang]}
                                </span>
                              )}
                            </div>
                          </div>

                          <div
                            className={`px-2.5 py-2 rounded-xl border text-center ${
                              item.priceMedium !== null
                                ? 'bg-[#FFFDF9] dark:bg-[#261D18] border-[#E5D7C6] dark:border-[#3D3027]'
                                : 'bg-[#F8F3EC]/60 dark:bg-[#1E1713]/60 border-[#EDE3D7] dark:border-[#2F241E] opacity-50'
                            }`}
                          >
                            <span className="block text-[11px] font-semibold text-[#6B5446] dark:text-[#C5B1A2]">
                              {UI_COPY.products.sizeMedium[lang]}
                            </span>
                            <div className="mt-0.5 flex items-baseline justify-center gap-1">
                              <span className="text-[17px] font-bold text-[#241914] dark:text-[#F6EDE3] tabular-nums">
                                {formatPrice(item.priceMedium)}
                              </span>
                              {item.priceMedium !== null && (
                                <span className="text-[11px] font-semibold text-[#6B5446] dark:text-[#BCA899]">
                                  {UI_COPY.products.currency[lang]}
                                </span>
                              )}
                            </div>
                          </div>

                          <div
                            className={`px-2.5 py-2 rounded-xl border text-center ${
                              item.priceLoqmah !== null
                                ? 'bg-[#FFFDF9] dark:bg-[#261D18] border-[#E5D7C6] dark:border-[#3D3027]'
                                : 'bg-[#F8F3EC]/60 dark:bg-[#1E1713]/60 border-[#EDE3D7] dark:border-[#2F241E] opacity-50'
                            }`}
                          >
                            <span className="block text-[11px] font-semibold text-[#6B5446] dark:text-[#C5B1A2]">
                              {UI_COPY.products.sizeLoqmah[lang]}
                            </span>
                            <div className="mt-0.5 flex items-baseline justify-center gap-1">
                              <span className="text-[17px] font-bold text-[#241914] dark:text-[#F6EDE3] tabular-nums">
                                {formatPrice(item.priceLoqmah)}
                              </span>
                              {item.priceLoqmah !== null && (
                                <span className="text-[11px] font-semibold text-[#6B5446] dark:text-[#BCA899]">
                                  {UI_COPY.products.currency[lang]}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {showAllergens && (
                          <p className="text-xs font-medium text-[#6B5446] dark:text-[#BCA899] leading-relaxed pt-0.5">
                            {UI_COPY.products.allergensLabel[lang]}: {item.allergens[lang]}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-[#5A4437] dark:text-[#CBB9AA] px-1">
            {UI_COPY.products.calorieNote[lang]}
          </p>
        </section>
      )}

      {/* 2. PHOTOGRAPHED BAKERY & SWEETS SHOWCASE (Clean Cards — ZERO Repeated Buttons Per Card!) */}
      {showBakeryShowcase && visibleFeatured.length > 0 && (
        <section
          aria-labelledby="bakery-showcase-heading"
          className="space-y-5"
        >
          {normalizedQuery && (
            <h2
              id="bakery-showcase-heading"
              className="font-display text-2xl font-bold text-[#241914] dark:text-[#F6EDE3]"
            >
              {UI_COPY.products.showcaseHeading[lang]}
            </h2>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {visibleFeatured.map((product) => {
              const originalIndex = FEATURED_PRODUCTS.findIndex(
                (p) => p.id === product.id
              );

              return (
                <article
                  key={product.id}
                  className="group rounded-2xl overflow-hidden bg-[#FFFDF9] dark:bg-[#221A16] border border-[#DFCEBC] dark:border-[#3E3028] flex flex-col transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <button
                    type="button"
                    onClick={() => onOpenLightbox(originalIndex)}
                    aria-label={product.name[lang]}
                    className="relative aspect-[4/5] w-full overflow-hidden block bg-[#F2E8DC] dark:bg-[#261D18] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
                  >
                    <SmartImage
                      src={product.imageUrl}
                      alt={product.name[lang]}
                      fit="cover"
                      className="object-center transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    />
                  </button>

                  <div className="p-4 sm:p-5 space-y-1.5">
                    <h3 className="font-display text-xl font-bold text-[#241914] dark:text-[#F6EDE3]">
                      {product.name[lang]}
                    </h3>

                    {product.varieties && product.varieties[lang].length > 0 && (
                      <p className="text-sm font-medium leading-relaxed text-[#4A372C] dark:text-[#DFD0C3]">
                        {product.varieties[lang].join(' · ')}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Non-photographed Verified Bakery Items (Clean Text Grid, Zero Repeated Buttons) */}
      {showBakeryShowcase && visibleAdditional.length > 0 && (
        <section
          aria-labelledby="more-products-heading"
          className="pt-6 border-t border-[#DFCEBC] dark:border-[#3E3028]"
        >
          <h2
            id="more-products-heading"
            className="font-display text-xl sm:text-2xl font-bold text-[#241914] dark:text-[#F6EDE3] mb-4"
          >
            {UI_COPY.products.moreHeading[lang]}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {visibleAdditional.map((item) => (
              <article
                key={item.id}
                className="p-5 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#DFCEBC] dark:border-[#3E3028] space-y-1.5"
              >
                <h3 className="font-display text-lg font-bold text-[#241914] dark:text-[#F6EDE3]">
                  {item.name[lang]}
                </h3>
                <p className="text-sm text-[#4A372C] dark:text-[#DFD0C3]">
                  {item.description[lang]}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Single Unified Order Bar at Bottom of Menu (Replaces 9 Duplicate Card Buttons) */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#DFCEBC] dark:border-[#3E3028] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-display text-lg font-bold text-[#241914] dark:text-[#F6EDE3]">
            {UI_COPY.products.orderStripTitle[lang]}
          </h2>
          <p dir="ltr" className="text-sm font-semibold text-[#5A4437] dark:text-[#CBB9AA]">
            {DELIVERY_APPS.join(' · ')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] px-5 rounded-xl inline-flex items-center justify-center gap-2 bg-[#A84208] hover:bg-[#8E3706] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-sm sm:text-[15px] font-bold transition-colors active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{UI_COPY.actions.orderOnWhatsapp[lang]}</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] px-4 rounded-xl inline-flex items-center justify-center gap-2 bg-[#F4ECE1] hover:bg-[#EAE0D1] dark:bg-[#2D221C] dark:hover:bg-[#382B23] border border-[#D8C6B2] dark:border-[#4A3A2F] text-[#241914] dark:text-[#F6EDE3] text-sm font-semibold transition-colors active:scale-[0.98]"
          >
            <Instagram className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span dir="ltr">@atayeb_marhaba</span>
          </a>
        </div>
      </section>
    </div>
  );
}
