import { useState } from 'react';
import { ArrowLeft, ArrowRight, Expand } from 'lucide-react';
import {
  FEATURED_PRODUCTS,
  Language,
  PageId,
  PHOTOS,
  ProductCategory,
  QUICK_INFO_PILLARS,
  STORE_QUOTES,
  UI_COPY,
} from '../data/bakeryData';
import { FaqSection } from './FaqSection';
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
      {/* 1. Real Images First: Large Interactive Hero Photo + Bakery Identity */}
      <section aria-label={UI_COPY.brandFull[lang]}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Primary Dominant Visual: Starts on Tiramisu, updates when clicking any photo in strip */}
          <div className="lg:col-span-7">
            <button
              type="button"
              onClick={() => onOpenLightbox(heroPhotoIndex)}
              aria-label={heroPhoto.title[lang]}
              className="group relative block w-full h-full min-h-[320px] sm:min-h-[430px] lg:min-h-[500px] rounded-2xl overflow-hidden border border-[#E6D8C8] dark:border-[#362A22] cursor-pointer text-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C85A17] dark:focus-visible:outline-[#E57A32]"
            >
              <SmartImage
                src={heroPhoto.url}
                alt={heroPhoto.title[lang]}
                priority
                className="transition-transform duration-500 ease-out group-hover:scale-[1.025]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#160F0B]/85 via-[#160F0B]/40 to-transparent px-5 sm:px-7 pt-16 pb-5 sm:pb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="font-display text-lg sm:text-xl font-bold text-[#FFFDF9]">
                    {heroPhoto.title[lang]}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-[#EFE3D7] max-w-md leading-relaxed">
                    {heroPhoto.caption[lang]}
                  </p>
                </div>
                <span className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center bg-[#FFFDF9]/15 text-[#FFFDF9] backdrop-blur-xs border border-[#FFFDF9]/25 group-hover:bg-[#C85A17] group-hover:border-[#C85A17] transition-colors">
                  <Expand className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </button>
          </div>

          {/* Editorial Brand Introduction */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#E6D8C8] dark:border-[#362A22]">
            <div className="space-y-5">
              <p className="text-sm font-medium text-[#9A4715] dark:text-[#E57A32]">
                {UI_COPY.cityLabel[lang]}
              </p>

              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#241914] dark:text-[#F6EDE3] leading-[1.2]">
                {UI_COPY.brandFull[lang]}
              </h1>

              <p className="text-base sm:text-[17px] leading-[1.85] text-[#523E33] dark:text-[#D5C3B5]">
                {UI_COPY.bio[lang]}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EFE3D5] dark:border-[#342821] flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('products', 'all')}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#C85A17] hover:bg-[#AD4B11] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-sm font-semibold transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C85A17] dark:focus-visible:outline-[#E57A32]"
              >
                <span>{UI_COPY.actions.viewAllProducts[lang]}</span>
                <DirectionArrow className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('branches')}
                className="px-3 py-2 text-sm font-semibold text-[#6E3F24] dark:text-[#E2C9B4] hover:text-[#C85A17] dark:hover:text-[#E57A32] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {UI_COPY.actions.viewBranches[lang]}
              </button>
            </div>
          </div>
        </div>

        {/* 2. Interactive Photo Strip: Clicking switches the large Hero image and caption */}
        <div className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="font-display text-base sm:text-lg font-bold text-[#241914] dark:text-[#F6EDE3]">
                {UI_COPY.home.stripTitle[lang]}
              </h2>
              <span className="text-xs text-[#7D6759] dark:text-[#A89283]">
                {UI_COPY.home.stripHint[lang]}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('gallery')}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#9A4715] dark:text-[#E57A32] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
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
                  className={`group relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C85A17] dark:focus-visible:outline-[#E57A32] ${
                    isSelected
                      ? 'border-[#C85A17] dark:border-[#E57A32] shadow-sm'
                      : 'border-[#E6D8C8] dark:border-[#362A22] opacity-85 hover:opacity-100 hover:border-[#C85A17]/60 dark:hover:border-[#E57A32]/60'
                  }`}
                >
                  <SmartImage
                    src={photo.url}
                    alt={photo.title[lang]}
                    className="transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#160F0B]/85 via-[#160F0B]/35 to-transparent px-2.5 pt-7 pb-2">
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

      {/* 3. Quick Info Cards Strip from Verbatim Bio Pillars Only */}
      <section aria-label={UI_COPY.bio[lang]}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_INFO_PILLARS.map((pillar) => (
            <button
              key={pillar.id}
              type="button"
              onClick={() => onNavigate(pillar.targetPage, pillar.targetCategory)}
              className="group p-5 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#E6D8C8] dark:border-[#362A22] hover:border-[#C85A17] dark:hover:border-[#E57A32] transition-colors duration-200 text-start flex flex-col justify-between gap-3 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C85A17] dark:focus-visible:outline-[#E57A32]"
            >
              <div className="space-y-1.5">
                <h2 className="font-display text-base font-bold text-[#241914] dark:text-[#F6EDE3] group-hover:text-[#C85A17] dark:group-hover:text-[#E57A32] transition-colors">
                  {pillar.title[lang]}
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed text-[#6B5446] dark:text-[#BFA99A]">
                  {pillar.subtitle[lang]}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#9A4715] dark:text-[#E57A32]">
                <span>{UI_COPY.nav[pillar.targetPage][lang]}</span>
                <DirectionArrow className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. Small Store-Voice Quotes Section (Strictly the 2 Verified Quotes Only) */}
      <section aria-labelledby="store-quotes-heading">
        <div className="mb-5">
          <h2
            id="store-quotes-heading"
            className="font-display text-lg sm:text-xl font-bold text-[#241914] dark:text-[#F6EDE3]"
          >
            {UI_COPY.home.quotesTitle[lang]}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {STORE_QUOTES.map((quote) => (
            <figure
              key={quote.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#F4ECE1] dark:bg-[#221A16] border border-[#E6D8C8] dark:border-[#362A22] flex flex-col justify-between gap-4"
            >
              <blockquote className="font-display text-base sm:text-lg font-medium leading-relaxed text-[#2C1E17] dark:text-[#F4E9DE]">
                {quote.text[lang]}
              </blockquote>
              <figcaption className="text-xs sm:text-sm font-medium text-[#8E3C0C] dark:text-[#E57A32]">
                {quote.context[lang]}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 5. Interactive Loqmah Box Card (No prices, no quantities, Instagram link only) */}
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#9A4715] dark:text-[#E57A32] hover:underline whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer"
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
                className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer block focus-visible:outline-2 focus-visible:outline-[#C85A17]"
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
                  <p className="pt-3 border-t border-[#F0E5D8] dark:border-[#332720] text-xs font-medium text-[#8E3C0C] dark:text-[#E09B6B] leading-relaxed">
                    {product.varieties[lang].join(' · ')}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. How to Order (3 Real Channels Only) */}
      <HowToOrderSection lang={lang} onNavigate={(page) => onNavigate(page)} />

      {/* 8. Verified FAQ Accordion (5 Questions Only) */}
      <FaqSection lang={lang} />
    </div>
  );
}
