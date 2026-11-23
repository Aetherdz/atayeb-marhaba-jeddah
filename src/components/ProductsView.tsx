import { useEffect, useState } from 'react';
import { ExternalLink, Instagram, Search, X } from 'lucide-react';
import {
  ADDITIONAL_PRODUCTS,
  FEATURED_PRODUCTS,
  INSTAGRAM_URL,
  Language,
  ProductCategory,
  UI_COPY,
} from '../data/bakeryData';
import { SmartImage } from './SmartImage';

interface ProductsViewProps {
  lang: Language;
  initialCategory?: ProductCategory;
  onOpenLightbox: (photoIndex: number) => void;
}

const CATEGORIES: readonly ProductCategory[] = [
  'all',
  'savory',
  'sweets',
  'seasonal',
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

export function ProductsView({
  lang,
  initialCategory = 'all',
  onOpenLightbox,
}: ProductsViewProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory>(initialCategory);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const normalizedQuery = normalizeText(query);

  const matchesSearch = (parts: string[]): boolean => {
    if (!normalizedQuery) return true;
    return parts.some((part) => normalizeText(part).includes(normalizedQuery));
  };

  const visibleFeatured = FEATURED_PRODUCTS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    if (!matchesCategory) return false;
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
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    if (!matchesCategory) return false;
    const searchable = [item.name.ar, item.name.en];
    return matchesSearch(searchable);
  });

  const hasResults =
    visibleFeatured.length > 0 || visibleAdditional.length > 0;

  const handleReset = () => {
    setQuery('');
    setSelectedCategory('all');
  };

  return (
    <div className="space-y-12">
      {/* Page header + Pricing Confirmation Note + Search & Category Tabs */}
      <div className="space-y-6">
        <div className="max-w-3xl space-y-3">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#241914] dark:text-[#F6EDE3]">
            {UI_COPY.products.pageTitle[lang]}
          </h1>
          <p className="text-base sm:text-[17px] leading-relaxed text-[#4A372C] dark:text-[#DFD0C3]">
            {UI_COPY.products.pageSubtitle[lang]}
          </p>
          <p className="text-base sm:text-[17px] font-medium leading-relaxed text-[#241914] dark:text-[#F6EDE3]">
            {UI_COPY.pricingNote[lang]}
          </p>
        </div>

        {/* Search + Category filter controls working together */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label={UI_COPY.products.pageTitle[lang]}
            className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl sm:rounded-full bg-[#F1E7DA] dark:bg-[#231B16] border border-[#DFCEBC] dark:border-[#3E3028] self-start"
          >
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-[44px] px-4 rounded-full text-sm sm:text-[15px] font-semibold transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3] ${
                    isSelected
                      ? 'bg-[#241914] text-[#FFFDF9] dark:bg-[#F6EDE3] dark:text-[#17120F]'
                      : 'text-[#3D2B21] dark:text-[#E5D7CA] hover:text-[#241914] dark:hover:text-[#FFFDF9]'
                  }`}
                >
                  {UI_COPY.products.filters[category][lang]}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:max-w-sm">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 -translate-y-1/2 start-4 w-4 h-4 text-[#4A372C] dark:text-[#DFD0C3]"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={UI_COPY.products.searchPlaceholder[lang]}
              aria-label={UI_COPY.products.searchPlaceholder[lang]}
              className="w-full min-h-[46px] ps-11 pe-11 py-2.5 rounded-full bg-[#FFFDF9] dark:bg-[#221A16] border border-[#D8C6B2] dark:border-[#493A30] text-base text-[#241914] dark:text-[#F6EDE3] placeholder:text-[#5A4437] dark:placeholder:text-[#CBB9AA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3] transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label={UI_COPY.actions.clearSearch[lang]}
                className="absolute top-1/2 -translate-y-1/2 end-2 w-9 h-9 rounded-full flex items-center justify-center text-[#3D2B21] dark:text-[#E5D7CA] hover:bg-[#F1E7DA] dark:hover:bg-[#31261F] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Empty state if search + filter returns nothing */}
      {!hasResults && (
        <div className="p-8 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#DFCEBC] dark:border-[#3E3028] text-center space-y-4">
          <p className="text-base sm:text-[17px] font-medium text-[#3D2B21] dark:text-[#E5D7CA]">
            {UI_COPY.products.noResults[lang]}
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="min-h-[46px] px-6 rounded-full bg-[#A84208] hover:bg-[#8E3706] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-base font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
          >
            {UI_COPY.actions.resetFilters[lang]}
          </button>
        </div>
      )}

      {/* Uniform Photographed Products Grid (Unified 4:3 Food-Focused Crop, Name + Verified Tags + Order CTA Only) */}
      {visibleFeatured.length > 0 && (
        <section aria-label={UI_COPY.products.pageTitle[lang]}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleFeatured.map((product) => {
              const originalIndex = FEATURED_PRODUCTS.findIndex(
                (p) => p.id === product.id
              );

              return (
                <article
                  key={product.id}
                  className="group rounded-2xl overflow-hidden bg-[#FFFDF9] dark:bg-[#221A16] border border-[#DFCEBC] dark:border-[#3E3028] flex flex-col"
                >
                  <button
                    type="button"
                    onClick={() => onOpenLightbox(originalIndex)}
                    aria-label={product.name[lang]}
                    className="relative aspect-[4/3] w-full overflow-hidden block bg-[#F2E8DC] dark:bg-[#261D18] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
                  >
                    <SmartImage
                      src={product.imageUrl}
                      alt={product.name[lang]}
                      className={`${product.objectPosition} transition-transform duration-300 ease-out group-hover:scale-[1.03]`}
                    />
                  </button>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-5">
                    <div className="space-y-3.5">
                      <h2 className="font-display text-xl font-bold text-[#241914] dark:text-[#F6EDE3]">
                        {product.name[lang]}
                      </h2>

                      {product.varieties && product.varieties[lang].length > 0 && (
                        <ul className="flex flex-wrap gap-2" aria-label={product.name[lang]}>
                          {product.varieties[lang].map((tag) => (
                            <li
                              key={tag}
                              className="px-3 py-1 rounded-lg bg-[#F3E9DC] dark:bg-[#2E231D] border border-[#DFCEBC] dark:border-[#493A30] text-sm font-semibold text-[#241914] dark:text-[#F6EDE3]"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[46px] w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#A84208] hover:bg-[#8E3706] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-[15px] font-bold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
                    >
                      <Instagram className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{UI_COPY.actions.orderOnInstagram[lang]}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Non-photographed Verified Bakery Items (Name + Order CTA) */}
      {visibleAdditional.length > 0 && (
        <section
          aria-labelledby="more-products-heading"
          className="pt-6 border-t border-[#DFCEBC] dark:border-[#3E3028]"
        >
          <h2
            id="more-products-heading"
            className="font-display text-2xl font-bold text-[#241914] dark:text-[#F6EDE3] mb-5"
          >
            {UI_COPY.products.moreHeading[lang]}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {visibleAdditional.map((item) => (
              <article
                key={item.id}
                className="p-5 sm:p-6 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#DFCEBC] dark:border-[#3E3028] flex flex-col justify-between gap-4"
              >
                <h3 className="font-display text-lg font-bold text-[#241914] dark:text-[#F6EDE3]">
                  {item.name[lang]}
                </h3>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#D8C6B2] dark:border-[#4A3A2F] bg-[#F4ECE1] hover:bg-[#EAE0D1] dark:bg-[#2D221C] dark:hover:bg-[#382B23] text-[#241914] dark:text-[#F6EDE3] text-sm font-bold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
                >
                  <Instagram className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{UI_COPY.actions.orderOnInstagram[lang]}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
