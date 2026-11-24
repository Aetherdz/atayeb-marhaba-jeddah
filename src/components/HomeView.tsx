import { ArrowLeft, ArrowRight, ExternalLink, MessageCircle } from 'lucide-react';
import {
  CATEGORY_PHOTO_CARDS,
  DELIVERY_APPS,
  Language,
  PageId,
  PHOTOS,
  ProductCategory,
  UI_COPY,
  WHATSAPP_URL,
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
    <div className="space-y-10 sm:space-y-14 lg:space-y-16">
      {/* 1. Single Fixed Tiramisu Hero Panel — Direct WhatsApp Primary CTA + Menu & Prices Link */}
      <section aria-label={UI_COPY.brandFull[lang]}>
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#251710] border border-[#3B261B] text-[#FAF3EA]">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:min-h-[480px] items-stretch">
            {/* Fixed Featured Hero Photo */}
            <div className="relative order-1 lg:order-2 lg:col-span-6 aspect-[4/4.2] max-h-[350px] sm:max-h-[420px] lg:aspect-auto lg:max-h-none lg:h-full">
              <button
                type="button"
                onClick={() => onOpenLightbox(0)}
                aria-label={heroPhoto.title[lang]}
                className="group relative block w-full h-full cursor-pointer text-start focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#FAF3EA]"
              >
                <SmartImage
                  src={heroPhoto.url}
                  alt={heroPhoto.title[lang]}
                  priority
                  containerClassName="bg-[#251710]"
                  className="object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-[#251710] via-[#251710]/20 to-transparent ${
                    lang === 'ar'
                      ? 'lg:bg-gradient-to-l lg:from-[#251710] lg:via-[#251710]/30 lg:to-transparent'
                      : 'lg:bg-gradient-to-r lg:from-[#251710] lg:via-[#251710]/30 lg:to-transparent'
                  }`}
                />
              </button>
            </div>

            {/* Hero Copy & Single Unmissable Primary Action */}
            <div className="relative z-10 order-2 lg:order-1 lg:col-span-6 px-5 pb-6 pt-3 sm:px-8 sm:pb-9 sm:pt-4 lg:p-11 flex flex-col justify-center gap-5 sm:gap-6">
              <h1 className="font-display text-[32px] sm:text-5xl lg:text-[52px] font-bold tracking-tight leading-[1.18]">
                <span className="block text-[#FAF3EA]">
                  {UI_COPY.home.heroLine1[lang]}
                </span>
                <span className="block mt-1.5 text-xl sm:text-3xl lg:text-[32px] text-[#F08A43]">
                  {UI_COPY.home.heroLine2[lang]}
                </span>
              </h1>

              <p className="text-base sm:text-[18px] leading-relaxed text-[#F2E5D7] max-w-md">
                {UI_COPY.home.heroSubtitle[lang]}
              </p>

              <div className="pt-1 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3.5 sm:gap-5">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[52px] w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#E57A32] hover:bg-[#F08D49] text-[#17100B] text-base sm:text-[17px] font-bold transition-colors duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF3EA]"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>{UI_COPY.actions.orderOnWhatsapp[lang]}</span>
                  <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={() => onNavigate('products', 'mnakeesh')}
                  className="min-h-[44px] inline-flex items-center justify-center sm:justify-start gap-1.5 text-base font-semibold text-[#F4E7DA] hover:text-[#FFFDF9] underline decoration-[#F4E7DA]/60 underline-offset-4 hover:decoration-[#FFFDF9] transition-colors whitespace-nowrap shrink-0 cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FAF3EA]"
                >
                  <span>{UI_COPY.actions.browseMenu[lang]}</span>
                  <DirectionArrow className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Photo Navigation Cards (4:5 vertical ratio matching posters) */}
      <section aria-labelledby="home-categories-heading">
        <h2
          id="home-categories-heading"
          className="font-display text-2xl sm:text-[26px] font-bold text-[#241914] dark:text-[#F6EDE3] mb-4 sm:mb-5"
        >
          {UI_COPY.home.categoriesTitle[lang]}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {CATEGORY_PHOTO_CARDS.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => onNavigate('products', card.targetCategory)}
              aria-label={`${UI_COPY.home.browseCategoryPrefix[lang]} ${card.title[lang]}`}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#F2E8DC] dark:bg-[#261D18] border border-[#DFCEBC] dark:border-[#3E3028] cursor-pointer text-start active:scale-[0.99] transition-transform duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
            >
              <SmartImage
                src={card.imageUrl}
                alt={card.title[lang]}
                className="object-center transition-transform duration-400 ease-out group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#190F0A]/90 via-[#190F0A]/40 to-transparent px-3.5 sm:px-5 pt-14 pb-3.5 sm:pb-4 flex items-center justify-between gap-2">
                <span className="font-display text-base sm:text-xl font-bold text-[#FFFDF9]">
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

      {/* 3. Functional Loqmah Box Picker (Sends Selected Mix to WhatsApp) */}
      <LoqmahBoxCard lang={lang} />

      {/* 4. Clean Delivery & Branches Strip (Zero Duplicate Order CTAs) */}
      <section
        aria-label={UI_COPY.home.deliveryBarLabel[lang]}
        className="p-5 sm:p-6 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#DFCEBC] dark:border-[#3E3028] flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div className="space-y-1">
          <span className="block text-sm font-semibold text-[#5A4437] dark:text-[#CBB9AA]">
            {UI_COPY.home.deliveryBarLabel[lang]}
          </span>
          <p
            dir="ltr"
            className="text-base font-bold text-[#241914] dark:text-[#F6EDE3] text-start"
          >
            {DELIVERY_APPS.join(' · ')}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('branches')}
          className="min-h-[46px] px-5 rounded-xl bg-[#F4ECE1] hover:bg-[#EAE0D1] dark:bg-[#2D221C] dark:hover:bg-[#382B23] border border-[#D8C6B2] dark:border-[#4A3A2F] inline-flex items-center justify-center gap-2 text-sm sm:text-[15px] font-bold text-[#241914] dark:text-[#F6EDE3] transition-colors whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.98]"
        >
          <span>{UI_COPY.actions.viewBranches[lang]}</span>
          <DirectionArrow className="w-4 h-4 shrink-0" aria-hidden="true" />
        </button>
      </section>
    </div>
  );
}
