import { ArrowLeft, ArrowRight, ExternalLink, Instagram } from 'lucide-react';
import {
  CATEGORY_PHOTO_CARDS,
  DELIVERY_APPS,
  INSTAGRAM_URL,
  Language,
  PageId,
  PHOTOS,
  ProductCategory,
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
  const DirectionArrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. Single Fixed Tiramisu Hero Panel — Large Order CTA + Quiet Branches Link + Pricing Note */}
      <section aria-label={UI_COPY.brandFull[lang]} className="space-y-4">
        <div className="relative rounded-3xl overflow-hidden bg-[#251710] border border-[#3B261B] text-[#FAF3EA]">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:min-h-[480px]">
            {/* Fixed Featured Hero Photo */}
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
                  containerClassName="bg-[#251710]"
                  className="object-[50%_68%] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
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

            {/* Hero Copy & Single Unmissable Primary Action */}
            <div className="relative z-10 order-2 lg:order-1 lg:col-span-5 px-6 pb-8 pt-4 sm:px-9 sm:pb-10 lg:p-11 flex flex-col justify-center gap-6">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[52px] font-bold tracking-tight leading-[1.16]">
                <span className="block text-[#FAF3EA]">
                  {UI_COPY.home.heroLine1[lang]}
                </span>
                <span className="block mt-1.5 text-[#F08A43]">
                  {UI_COPY.home.heroLine2[lang]}
                </span>
              </h1>

              <p className="text-base sm:text-[18px] leading-relaxed text-[#F2E5D7] max-w-md">
                {UI_COPY.home.heroSubtitle[lang]}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-5">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[52px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#E57A32] hover:bg-[#F08D49] text-[#17100B] text-base sm:text-[17px] font-bold transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF3EA]"
                >
                  <Instagram className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>{UI_COPY.actions.orderOnInstagram[lang]}</span>
                  <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={() => onNavigate('branches')}
                  className="min-h-[44px] inline-flex items-center text-base font-semibold text-[#F4E7DA] hover:text-[#FFFDF9] underline decoration-[#F4E7DA]/60 underline-offset-4 hover:decoration-[#FFFDF9] transition-colors whitespace-nowrap shrink-0 cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FAF3EA]"
                >
                  {UI_COPY.home.heroBranchesCta[lang]}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Clear Pricing & Order Confirmation Note Directly Below Hero */}
        <p className="px-1 text-base sm:text-[17px] font-medium leading-relaxed text-[#3D2B21] dark:text-[#E5D7CA]">
          {UI_COPY.pricingNote[lang]}
        </p>
      </section>

      {/* 2. Category Photo Navigation Cards (Navigation Role Only) */}
      <section aria-labelledby="home-categories-heading">
        <h2
          id="home-categories-heading"
          className="font-display text-2xl sm:text-[26px] font-bold text-[#241914] dark:text-[#F6EDE3] mb-5"
        >
          {UI_COPY.home.categoriesTitle[lang]}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CATEGORY_PHOTO_CARDS.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => onNavigate('products', card.targetCategory)}
              aria-label={`${UI_COPY.home.browseCategoryPrefix[lang]} ${card.title[lang]}`}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F2E8DC] dark:bg-[#261D18] border border-[#DFCEBC] dark:border-[#3E3028] cursor-pointer text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
            >
              <SmartImage
                src={card.imageUrl}
                alt={card.title[lang]}
                className="object-[50%_66%] transition-transform duration-400 ease-out group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#190F0A]/92 via-[#190F0A]/55 to-transparent px-4 sm:px-5 pt-12 pb-4 flex items-center justify-between gap-2">
                <span className="font-display text-lg sm:text-xl font-bold text-[#FFFDF9]">
                  {card.title[lang]}
                </span>
                <DirectionArrow
                  className="w-4 h-4 text-[#FFFDF9] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Functional Loqmah Box Picker */}
      <LoqmahBoxCard lang={lang} />

      {/* 4. Single Compact Final Action Bar (Primary Order CTA + Plain-Text Delivery Apps + Branches Link) */}
      <section
        aria-label={UI_COPY.howToOrder.title[lang]}
        className="p-6 sm:p-7 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#DFCEBC] dark:border-[#3E3028] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[50px] inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-[#A84208] hover:bg-[#8E3706] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-base font-bold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
          >
            <Instagram className="w-[18px] h-[18px] shrink-0" aria-hidden="true" />
            <span>{UI_COPY.actions.orderOnInstagram[lang]}</span>
            <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => onNavigate('branches')}
            className="min-h-[44px] inline-flex items-center justify-center sm:justify-start gap-1.5 text-base font-semibold text-[#241914] dark:text-[#F6EDE3] underline decoration-[#8D7463] dark:decoration-[#9C8474] underline-offset-4 hover:decoration-[#241914] dark:hover:decoration-[#F6EDE3] transition-colors whitespace-nowrap shrink-0 cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
          >
            <span>{UI_COPY.actions.viewBranches[lang]}</span>
            <DirectionArrow className="w-4 h-4 shrink-0" aria-hidden="true" />
          </button>
        </div>

        <p
          dir="ltr"
          className={`text-base font-semibold text-[#3D2B21] dark:text-[#E5D7CA] leading-relaxed ${
            lang === 'ar' ? 'text-center lg:text-left' : 'text-center lg:text-right'
          }`}
        >
          {DELIVERY_APPS.join(' · ')}
        </p>
      </section>
    </div>
  );
}
