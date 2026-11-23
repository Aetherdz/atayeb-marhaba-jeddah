import { ArrowLeft, ArrowRight, ExternalLink, Instagram } from 'lucide-react';
import {
  CATEGORY_PHOTO_CARDS,
  DELIVERY_APPS,
  INSTAGRAM_URL,
  Language,
  PageId,
  PHOTOS,
  ProductCategory,
  STORE_QUOTES,
  UI_COPY,
} from '../data/bakeryData';
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
  const heroPhoto = PHOTOS[0];
  const tiramisuQuote = STORE_QUOTES[0];
  const DirectionArrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-14 sm:space-y-16">
      {/* 1. Single Fixed Tiramisu Hero Panel — 1 Primary CTA + 1 Quiet Text Link */}
      <section aria-label={UI_COPY.brandFull[lang]}>
        <div className="relative rounded-3xl overflow-hidden bg-[#251710] border border-[#3B261B] text-[#FAF3EA]">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:min-h-[480px]">
            {/* Fixed Tiramisu Photo */}
            <div className="relative order-1 lg:order-2 lg:col-span-7 min-h-[260px] sm:min-h-[340px] lg:min-h-full">
              <button
                type="button"
                onClick={() => onOpenLightbox(0)}
                aria-label={heroPhoto.title[lang]}
                className="group relative block w-full h-full min-h-[260px] sm:min-h-[340px] lg:min-h-full cursor-pointer text-start focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#FAF3EA]"
              >
                <SmartImage
                  src={heroPhoto.url}
                  alt={heroPhoto.title[lang]}
                  priority
                  className="transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-[#251710] via-[#251710]/20 to-transparent ${
                    lang === 'ar'
                      ? 'lg:bg-gradient-to-l lg:from-[#251710] lg:via-[#251710]/35 lg:to-transparent'
                      : 'lg:bg-gradient-to-r lg:from-[#251710] lg:via-[#251710]/35 lg:to-transparent'
                  }`}
                />
              </button>
            </div>

            {/* Hero Copy */}
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

              <div className="pt-2 flex flex-wrap items-center gap-5">
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
                  className="text-sm sm:text-base font-medium text-[#E8D8C8] hover:text-[#FAF3EA] underline decoration-[#E8D8C8]/45 underline-offset-4 hover:decoration-[#FAF3EA] transition-colors whitespace-nowrap shrink-0 cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FAF3EA]"
                >
                  {UI_COPY.home.heroBranchesCta[lang]}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Single Social Proof Quote (Tiramisu Only) */}
      <section aria-labelledby="store-quotes-heading">
        <h2
          id="store-quotes-heading"
          className="font-display text-xl sm:text-2xl font-bold text-[#241914] dark:text-[#F6EDE3] mb-4"
        >
          {UI_COPY.home.quotesTitle[lang]}
        </h2>

        <figure className="p-7 sm:p-9 rounded-2xl bg-[#F4ECE1] dark:bg-[#221A16] border border-[#E6D8C8] dark:border-[#362A22] flex flex-col gap-6">
          <blockquote className="font-display text-xl sm:text-2xl font-semibold leading-[1.6] text-[#241914] dark:text-[#F6EDE3] max-w-3xl">
            {tiramisuQuote.text[lang]}
          </blockquote>
          <figcaption className="pt-4 border-t border-[#E6D8C8] dark:border-[#342821] flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-semibold text-[#5C473B] dark:text-[#CDBBAE]">
              {tiramisuQuote.context[lang]}
            </span>
            <a
              href={tiramisuQuote.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#241914] dark:text-[#F6EDE3] underline decoration-[#C9B39E] dark:decoration-[#665143] underline-offset-4 hover:decoration-[#241914] dark:hover:decoration-[#F6EDE3] transition-colors rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
            >
              <span>{UI_COPY.home.originalPostLink[lang]}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </a>
          </figcaption>
        </figure>
      </section>

      {/* 3. Category Photo Navigation Cards (Name + Photo + Link Only) */}
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

      {/* 4. Functional Loqmah Box Picker (No repeated quote/description) */}
      <LoqmahBoxCard lang={lang} />

      {/* 5. Single Compact Final Action Bar (1 Primary Button + Delivery Apps Line + Branches Text Link) */}
      <section
        aria-label={UI_COPY.howToOrder.title[lang]}
        className="p-6 sm:p-7 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#E6D8C8] dark:border-[#362A22] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#B2480B] hover:bg-[#963B08] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-sm sm:text-base font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
          >
            <Instagram className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{UI_COPY.actions.instagramCta[lang]}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80 shrink-0" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => onNavigate('branches')}
            className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-sm font-semibold text-[#241914] dark:text-[#F6EDE3] underline decoration-[#C9B39E] dark:decoration-[#665143] underline-offset-4 hover:decoration-[#241914] dark:hover:decoration-[#F6EDE3] transition-colors whitespace-nowrap shrink-0 cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
          >
            <span>{UI_COPY.actions.viewBranches[lang]}</span>
            <DirectionArrow className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          </button>
        </div>

        <p
          dir="ltr"
          className={`text-sm font-medium text-[#5C473B] dark:text-[#CDBBAE] leading-relaxed ${
            lang === 'ar' ? 'text-center lg:text-left' : 'text-center lg:text-right'
          }`}
        >
          {DELIVERY_APPS.join(' · ')}
        </p>
      </section>
    </div>
  );
}
