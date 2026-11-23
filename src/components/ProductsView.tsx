import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import {
  ADDITIONAL_PRODUCTS,
  FEATURED_PRODUCTS,
  Language,
  ProductCategory,
  UI_COPY,
} from '../data/bakeryData';
import { LoqmahBoxCard } from './LoqmahBoxCard';
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
      item.description.ar,
      item.description.en,
      ...(item.varieties?.ar ?? []),
      ...(item.varieties?.en ?? []),
    ];
    return matchesSearch(searchable);
  });

  const visibleAdditional = ADDITIONAL_PRODUCTS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    if (!matchesCategory) return false;
    const searchable = [
      item.name.ar,
      item.name.en,
      item.description.ar,
      item.description.en,
    ];
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
      {/* Page header + real-time search & category filter tabs */}
      <div className="space-y-6">
        <div className="max-w-3xl space-y-2.5">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#241914] dark:text-[#F6EDE3]">
            {UI_COPY.products.pageTitle[lang]}
          </h1>
          <p className="text-sm sm:text-base leading-relaxed text-[#6B5446] dark:text-[#BFA99A]">
            {UI_COPY.products.pageSubtitle[lang]}
          </p>
        </div>

        {/* Search + Category filter controls working together */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label={UI_COPY.products.pageTitle[lang]}
            className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-[#F1E7DA] dark:bg-[#231B16] border border-[#E5D7C6] dark:border-[#362A22] self-start"
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
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3] ${
                    isSelected
                      ? 'bg-[#2C1C14] text-[#FFFDF9] dark:bg-[#F4EAE0] dark:text-[#17120F]'
                      : 'text-[#5C473B] dark:text-[#CDBBAE] hover:text-[#241914] dark:hover:text-[#F6EDE3]'
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
              className="pointer-events-none absolute top-1/2 -translate-y-1/2 start-3.5 w-4 h-4 text-[#7D6759] dark:text-[#A99282]"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={UI_COPY.products.searchPlaceholder[lang]}
              aria-label={UI_COPY.products.searchPlaceholder[lang]}
              className="w-full ps-10 pe-10 py-2.5 rounded-full bg-[#FFFDF9] dark:bg-[#221A16] border border-[#E4D5C3] dark:border-[#3A2D25] text-sm text-[#241914] dark:text-[#F6EDE3] placeholder:text-[#7D6759] dark:placeholder:text-[#9C8677] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3] transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label={UI_COPY.actions.clearSearch[lang]}
                className="absolute top-1/2 -translate-y-1/2 end-2.5 w-7 h-7 rounded-full flex items-center justify-center text-[#5C473B] dark:text-[#CDBBAE] hover:bg-[#F1E7DA] dark:hover:bg-[#31261F] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Empty state if search + filter returns nothing */}
      {!hasResults && (
        <div className="p-8 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#E6D8C8] dark:border-[#362A22] text-center space-y-4">
          <p className="text-base font-medium text-[#5C473B] dark:text-[#CDBBAE]">
            {UI_COPY.products.noResults[lang]}
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 rounded-full bg-[#B2480B] hover:bg-[#963B08] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
          >
            {UI_COPY.actions.resetFilters[lang]}
          </button>
        </div>
      )}

      {/* Asymmetric Editorial Photographed Products Grid */}
      {visibleFeatured.length > 0 && (
        <section aria-label={UI_COPY.products.pageTitle[lang]}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleFeatured.map((product) => {
              const originalIndex = FEATURED_PRODUCTS.findIndex(
                (p) => p.id === product.id
              );
              const isWideFeatured =
                visibleFeatured.length > 1 &&
                (product.id === 'tiramisu' ||
                  product.id === 'elegant-cakes' ||
                  product.id === 'baton-sale');

              return (
                <article
                  key={product.id}
                  className={`group rounded-2xl overflow-hidden bg-[#FFFDF9] dark:bg-[#221A16] border border-[#E6D8C8] dark:border-[#362A22] transition-transform duration-200 hover:-translate-y-0.5 flex flex-col ${
                    isWideFeatured ? 'lg:col-span-2 lg:flex-row' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onOpenLightbox(originalIndex)}
                    aria-label={product.name[lang]}
                    className={`relative overflow-hidden block cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3] ${
                      isWideFeatured
                        ? 'aspect-[4/3] lg:aspect-auto lg:w-[56%] lg:min-h-[300px] shrink-0'
                        : 'aspect-[4/3] w-full'
                    }`}
                  >
                    <SmartImage
                      src={product.imageUrl}
                      alt={product.name[lang]}
                      className="transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    />
                  </button>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <h2 className="font-display text-lg sm:text-xl font-bold text-[#241914] dark:text-[#F6EDE3]">
                        {product.name[lang]}
                      </h2>
                      <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-[#5C473B] dark:text-[#CDBBAE]">
                        {product.description[lang]}
                      </p>
                    </div>

                    {product.varieties && (
                      <div className="pt-3.5 border-t border-[#F0E5D8] dark:border-[#332720] text-xs sm:text-sm font-medium text-[#6B5446] dark:text-[#BFA99A] leading-relaxed">
                        {product.varieties[lang].join(' · ')}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Additional Verified Bakery Specialties */}
      {visibleAdditional.length > 0 && (
        <section
          aria-labelledby="more-products-heading"
          className="pt-4 border-t border-[#E6D8C8] dark:border-[#332720]"
        >
          <h2
            id="more-products-heading"
            className="font-display text-xl sm:text-2xl font-bold text-[#241914] dark:text-[#F6EDE3] mb-5"
          >
            {UI_COPY.products.moreHeading[lang]}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {visibleAdditional.map((item) => (
              <article
                key={item.id}
                className="p-5 sm:p-6 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#E6D8C8] dark:border-[#362A22]"
              >
                <h3 className="font-display text-lg font-bold text-[#241914] dark:text-[#F6EDE3]">
                  {item.name[lang]}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#5C473B] dark:text-[#CDBBAE]">
                  {item.description[lang]}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Interactive Loqmah Box Card */}
      <LoqmahBoxCard lang={lang} />
    </div>
  );
}
