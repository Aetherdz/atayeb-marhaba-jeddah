import { useState } from 'react';
import {
  ADDITIONAL_PRODUCTS,
  FEATURED_PRODUCTS,
  Language,
  ProductCategory,
  UI_COPY,
} from '../data/bakeryData';
import { SmartImage } from './SmartImage';

interface ProductsViewProps {
  lang: Language;
  onOpenLightbox: (photoIndex: number) => void;
}

const CATEGORIES: readonly ProductCategory[] = [
  'all',
  'savory',
  'sweets',
  'seasonal',
];

export function ProductsView({ lang, onOpenLightbox }: ProductsViewProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory>('all');

  const visibleFeatured = FEATURED_PRODUCTS.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  const visibleAdditional = ADDITIONAL_PRODUCTS.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  return (
    <div className="space-y-12">
      {/* Page header + interactive filter tabs */}
      <div className="space-y-6">
        <div className="max-w-3xl space-y-2.5">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#241914] dark:text-[#F6EDE3]">
            {UI_COPY.products.pageTitle[lang]}
          </h1>
          <p className="text-sm sm:text-base leading-relaxed text-[#6B5446] dark:text-[#BFA99A]">
            {UI_COPY.products.pageSubtitle[lang]}
          </p>
        </div>

        {/* Category segmented filter bar */}
        <div
          role="tablist"
          aria-label={UI_COPY.products.pageTitle[lang]}
          className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-[#F1E7DA] dark:bg-[#231B16] border border-[#E5D7C6] dark:border-[#362A22]"
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
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C85A17] dark:focus-visible:outline-[#E57A32] ${
                  isSelected
                    ? 'bg-[#C85A17] text-[#FFFDF9] dark:bg-[#E57A32] dark:text-[#17120F]'
                    : 'text-[#5C473B] dark:text-[#CDBBAE] hover:text-[#241914] dark:hover:text-[#F6EDE3]'
                }`}
              >
                {UI_COPY.products.filters[category][lang]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Photographed Products Grid */}
      {visibleFeatured.length > 0 && (
        <section aria-label={UI_COPY.products.pageTitle[lang]}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleFeatured.map((product) => {
              const originalIndex = FEATURED_PRODUCTS.findIndex(
                (p) => p.id === product.id
              );
              return (
                <article
                  key={product.id}
                  className="group rounded-2xl overflow-hidden bg-[#FFFDF9] dark:bg-[#221A16] border border-[#E6D8C8] dark:border-[#362A22] transition-transform duration-200 hover:-translate-y-0.5 flex flex-col"
                >
                  <button
                    type="button"
                    onClick={() => onOpenLightbox(originalIndex)}
                    aria-label={product.name[lang]}
                    className="relative aspect-[4/3] w-full overflow-hidden block cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C85A17]"
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
                      <div className="pt-3.5 border-t border-[#F0E5D8] dark:border-[#332720] text-xs sm:text-sm font-medium text-[#8E3C0C] dark:text-[#E09B6B] leading-relaxed">
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
    </div>
  );
}
