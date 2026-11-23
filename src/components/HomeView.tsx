import { useState } from 'react';
import { ArrowLeft, ArrowRight, Expand, ExternalLink } from 'lucide-react';
import {
  CATEGORY_PHOTO_CARDS,
  FEATURED_PRODUCTS,
  Language,
  PageId,
  PHOTOS,
  ProductCategory,
  STORE_QUOTES,
  UI_COPY,
} from '../data/bakeryData';
import { HowToOrderSection } from './HowToOrderSection';
import { LoqmahBoxCard } from './LoqmahBoxCard';
import { SmartImage } from './SmartImage';

interface HomeViewProps {
  lang: Language;
  onNavigate: (page: PageId, productCategory?: ProductCategory) => void;
  onOpenLightbox: (photoIndex: number) => void;
}

export function HomeView({
  lang,
  onNavigate,
  onOpenLightbox,
}: HomeViewProps) {
  const [heroPhotoIndex, setHeroPhotoIndex] = useState(0);
  const heroPhoto = PHOTOS[heroPhotoIndex];
  const DirectionArrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* 1. Unified Deep Bakery-Brown Hero Panel + Interactive Photo Strip */}
      <section aria-label={UI_COPY.brandFull[lang]}>
        <div className="relative rounded-3xl overflow-hidden bg-[#251710] border border-[#3B261B] text-[#FAF3EA]">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:min-h-[500px]">
            {/* Media half (top on mobile, end side on desktop so headline never collides with photo text) */}
            <div className="relative order-1 lg:order-2 lg:col-span-7 min-h-[280px] sm:min-h-[360px] lg:min-h-full">
              <button
                type="button"
                onClick={() => onOpenLightbox(heroPhotoIndex)}
                aria-label={heroPhoto.title[lang]}
                className="group relative block w-full h-full min-h-[280px] sm:min-h-[360px] lg:min-h-full cursor-pointer text-start focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#FAF3EA]"
              >
                <SmartImage
                  src={heroPhoto.url}
                  alt={heroPhoto.title[lang]}
                  priority
                  className="transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                />

                {/* Smooth dark bakery-brown gradient blending from the text side */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-[#251710] via-[#251710]/20 to-transparent ${
                    lang === 'ar'
                      ? 'lg:bg-gradient-to-l lg:from-[#251710] lg:via-[#251710]/35 lg:to-transparent'
                      : 'lg:bg-gradient-to-r lg:from-[#251710] lg:via-[#251710]/35 lg:to-transparent'
                  }`}
                />

                {/* Subtle bottom-end unboxed caption & expand affordance */}
                <div className="pointer-events-none absolute bottom-4 inset-x-4 sm:bottom-5 sm:inset-x-5 flex items-end justify-between gap-3">
                  <span className="text-xs sm:text-sm font-semibold text-[#FAF3EA] drop-shadow-xs">
                    {heroPhoto.title[lang]}
                  </span>
                  <span className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center bg-[#251710]/75 text-[#FAF3EA] backdrop-blur-xs border border-[#FAF3EA]/20 group-hover:bg-[#FAF3EA] group-hover:text-[#251710] transition-colors">
                    <Expand className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </button>
            </div>

            {/* Copy half: sits cleanly on solid deep bakery brown away from photo's printed text */}
            <div className="relative z-10 order-2 lg:order-1 lg:col-span-5 px-6 pb-8 pt-4 sm:px-9 sm:pb-10 lg:p-11 flex flex-col justify-center gap-6">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[52px] font-bold tracking-tight leading-[1.16]">
                <span className="block text-[#FAF3EA]">
                  {UI_COPY.home.heroLine1[lang]}
                </span>
                <span className="block mt-1.5 text-[#E57A32]">
                  {UI_COPY.home.heroLine2[lang]}
                </span>
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-[#E2D3C5] max-w-md">
                {UI_COPY.home.heroSubtitle[lang]}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onNavigate('products', 'all')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E57A32] hover:bg-[#F08D49] text-[#1A100B] text-sm sm:text-base font-bold transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF3EA]"
                >
                  <span>{UI_COPY.home.heroProductsCta[lang]}</span>
                  <DirectionArrow className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('branches')}
                  className="inline-flex items-center px-6 py-3 rounded-full border border-[#FAF3EA]/40 hover:border-[#FAF3EA]/80 hover:bg-[#FAF3EA]/10 text-[#FAF3EA] text-sm sm:text-base font-semibold transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF3EA]"
                >
                  {UI_COPY.home.heroBranchesCta[lang]}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Interactive Photo Strip: Clicking switches the large Hero photo & caption */}
        <div className="mt-7">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="font-display text-base sm:text-lg font-bold text-[#241914] dark:text-[#F6EDE3]">
                {UI_COPY.home.stripTitle[lang]}
              </h2>
              <span className="text-xs text-[#6B5446] dark:text-[#B5A090]">
                {UI_COPY.home.stripHint[lang]}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('gallery')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3B2418] dark:text-[#E6D5C6] hover:underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
            >
              <span>{UI_COPY.actions.viewGallery[lang]}</span>
              <DirectionArrow className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5">
            {PHOTOS.map((photo, idx) => {
              const isSelected = idx === heroPhotoIndex;
              return (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setHeroPhotoIndex(idx)}
                  aria-pressed={isSelected}
                  aria-label={photo.title[lang]}
                  className={`group relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3] ${
                    isSelected
                      ? 'border-[#2C1C14] dark:border-[#F4EAE0] shadow-sm'
                      : 'border-[#E6D8C8] dark:border-[#362A22] opacity-85 hover:opacity-100 hover:border-[#6B5446] dark:hover:border-[#A89283]'
                  }`}
                >
                  <SmartImage
                    src={photo.url}
                    alt={photo.title[lang]}
                    className="transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1D120C]/85 via-[#1D120C]/35 to-transparent px-2.5 pt-7 pb-2">
                    <span className="block text-xs font-semibold text-[#FFFDF9] truncate">
                      {photo.title[lang]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Product-Category Photo Cards (Mankousheh, Pastries, Cakes, Sweets) */}
      <section aria-labelledby="home-categories-heading">
        <h2
          id="home-categories-heading"
          className="font-display text-xl sm:text-2xl font-bold text-[#241914] dark:text-[#F6EDE3] mb-5"
        >
          {UI_COPY.home.categoriesTitle[lang]}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CATEGORY_PHOTO_CARDS.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => onNavigate('products', card.targetCategory)}
              aria-label={card.title[lang]}
              className="group relative aspect-[4/3] sm:aspect-[5/4] rounded-2xl overflow-hidden border border-[#E6D8C8] dark:border-[#362A22] cursor-pointer text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
            >
              <SmartImage
                src={card.imageUrl}
                alt={card.title[lang]}
                className="transition-transform duration-400 ease-out group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1D120C]/90 via-[#1D120C]/45 to-transparent px-4 sm:px-5 pt-12 pb-4 flex items-center justify-between gap-2">
                <span className="font-display text-lg sm:text-xl font-bold text-[#FFFDF9]">
                  {card.title[lang]}
                </span>
                <DirectionArrow
                  className="w-4 h-4 text-[#FAF3EA] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 4. Large Quotes Section with Links to Original Instagram Posts */}
      <section aria-labelledby="store-quotes-heading">
        <h2
          id="store-quotes-heading"
          className="font-display text-xl sm:text-2xl font-bold text-[#241914] dark:text-[#F6EDE3] mb-5"
        >
          {UI_COPY.home.quotesTitle[lang]}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {STORE_QUOTES.map((quote) => (
            <figure
              key={quote.id}
              className="p-7 sm:p-8 rounded-2xl bg-[#F4ECE1] dark:bg-[#221A16] border border-[#E6D8C8] dark:border-[#362A22] flex flex-col justify-between gap-6"
            >
              <blockquote className="font-display text-xl sm:text-2xl font-semibold leading-[1.55] text-[#241914] dark:text-[#F6EDE3]">
                {quote.text[lang]}
              </blockquote>
              <figcaption className="pt-4 border-t border-[#E6D8C8] dark:border-[#342821] flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm font-semibold text-[#5C473B] dark:text-[#CDBBAE]">
                  {quote.context[lang]}
                </span>
                <a
                  href={quote.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#241914] dark:text-[#F6EDE3] underline decoration-[#C9B39E] dark:decoration-[#665143] underline-offset-4 hover:decoration-[#241914] dark:hover:decoration-[#F6EDE3] transition-colors rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
                >
                  <span>{UI_COPY.home.originalPostLink[lang]}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 5. Interactive Loqmah Box Card (logic unchanged) */}
      <LoqmahBoxCard lang={lang} />

      {/* 6. Products Section Below the Images */}
      <section aria-labelledby="home-products-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
          <div>
            <h2
              id="home-products-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#241914] dark:text-[#F6EDE3]"
            >
              {UI_COPY.home.productsHeading[lang]}
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-[#6B5446] dark:text-[#BFA99A]">
              {UI_COPY.home.productsSubheading[lang]}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('products', 'all')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#241914] dark:text-[#F6EDE3] underline decoration-[#C9B39E] dark:decoration-[#665143] underline-offset-4 hover:decoration-[#241914] dark:hover:decoration-[#F6EDE3] whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
          >
            <span>{UI_COPY.actions.viewAllProducts[lang]}</span>
            <DirectionArrow className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PRODUCTS.map((product, index) => (
            <article
              key={product.id}
              className="group rounded-2xl overflow-hidden bg-[#FFFDF9] dark:bg-[#221A16] border border-[#E6D8C8] dark:border-[#362A22] transition-transform duration-200 hover:-translate-y-0.5 flex flex-col"
            >
              <button
                type="button"
                onClick={() => onOpenLightbox(index)}
                className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer block focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
                aria-label={product.name[lang]}
              >
                <SmartImage
                  src={product.imageUrl}
                  alt={product.name[lang]}
                  className="transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
              </button>

              <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#241914] dark:text-[#F6EDE3]">
                    {product.name[lang]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5C473B] dark:text-[#CDBBAE]">
                    {product.description[lang]}
                  </p>
                </div>

                {product.varieties && (
                  <p className="pt-3 border-t border-[#F0E5D8] dark:border-[#332720] text-xs font-medium text-[#6B5446] dark:text-[#BFA99A] leading-relaxed">
                    {product.varieties[lang].join(' · ')}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. Simplified Compact How to Order Row */}
      <HowToOrderSection lang={lang} onNavigate={(page) => onNavigate(page)} />
    </div>
  );
}
