import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Instagram,
  MapPin,
  ShoppingBag,
} from 'lucide-react';
import {
  DELIVERY_APPS,
  INSTAGRAM_URL,
  Language,
  PageId,
  UI_COPY,
} from '../data/bakeryData';

interface HowToOrderSectionProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export function HowToOrderSection({
  lang,
  onNavigate,
}: HowToOrderSectionProps) {
  const DirectionArrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section aria-labelledby="how-to-order-heading" className="space-y-6">
      <div className="max-w-2xl space-y-1.5">
        <h2
          id="how-to-order-heading"
          className="font-display text-2xl sm:text-3xl font-bold text-[#241914] dark:text-[#F6EDE3]"
        >
          {UI_COPY.howToOrder.title[lang]}
        </h2>
        <p className="text-sm sm:text-base text-[#6B5446] dark:text-[#BFA99A]">
          {UI_COPY.howToOrder.subtitle[lang]}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Step 1: Delivery Apps (names only, no links) */}
        <article className="p-6 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#E6D8C8] dark:border-[#362A22] flex flex-col justify-between gap-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F4E9DC] dark:bg-[#2F241E] text-[#B24E12] dark:text-[#E57A32]">
                <ShoppingBag className="w-[18px] h-[18px]" aria-hidden="true" />
              </span>
              <span className="font-display text-xs font-bold tabular-nums text-[#9A4715] dark:text-[#E57A32]">
                01
              </span>
            </div>
            <h3 className="font-display text-lg font-bold text-[#241914] dark:text-[#F6EDE3]">
              {UI_COPY.howToOrder.step1Title[lang]}
            </h3>
            <p className="text-sm leading-relaxed text-[#5C473B] dark:text-[#CDBBAE]">
              {UI_COPY.howToOrder.step1Desc[lang]}
            </p>
          </div>

          <p
            dir="ltr"
            className={`pt-3.5 border-t border-[#F0E5D8] dark:border-[#332720] text-sm font-semibold text-[#2E2018] dark:text-[#F4E9DE] leading-relaxed ${
              lang === 'ar' ? 'text-right' : 'text-left'
            }`}
          >
            {DELIVERY_APPS.join(' · ')}
          </p>
        </article>

        {/* Step 2: Visit Jeddah Branches via Google Maps */}
        <article className="p-6 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#E6D8C8] dark:border-[#362A22] flex flex-col justify-between gap-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F4E9DC] dark:bg-[#2F241E] text-[#B24E12] dark:text-[#E57A32]">
                <MapPin className="w-[18px] h-[18px]" aria-hidden="true" />
              </span>
              <span className="font-display text-xs font-bold tabular-nums text-[#9A4715] dark:text-[#E57A32]">
                02
              </span>
            </div>
            <h3 className="font-display text-lg font-bold text-[#241914] dark:text-[#F6EDE3]">
              {UI_COPY.howToOrder.step2Title[lang]}
            </h3>
            <p className="text-sm leading-relaxed text-[#5C473B] dark:text-[#CDBBAE]">
              {UI_COPY.howToOrder.step2Desc[lang]}
            </p>
          </div>

          <div className="pt-3.5 border-t border-[#F0E5D8] dark:border-[#332720]">
            <button
              type="button"
              onClick={() => onNavigate('branches')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9A4715] dark:text-[#E57A32] hover:underline whitespace-nowrap cursor-pointer"
            >
              <span>{UI_COPY.actions.viewBranches[lang]}</span>
              <DirectionArrow className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </article>

        {/* Step 3: Message via Instagram */}
        <article className="p-6 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#E6D8C8] dark:border-[#362A22] flex flex-col justify-between gap-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F4E9DC] dark:bg-[#2F241E] text-[#B24E12] dark:text-[#E57A32]">
                <Instagram className="w-[18px] h-[18px]" aria-hidden="true" />
              </span>
              <span className="font-display text-xs font-bold tabular-nums text-[#9A4715] dark:text-[#E57A32]">
                03
              </span>
            </div>
            <h3 className="font-display text-lg font-bold text-[#241914] dark:text-[#F6EDE3]">
              {UI_COPY.howToOrder.step3Title[lang]}
            </h3>
            <p className="text-sm leading-relaxed text-[#5C473B] dark:text-[#CDBBAE]">
              {UI_COPY.howToOrder.step3Desc[lang]}
            </p>
          </div>

          <div className="pt-3.5 border-t border-[#F0E5D8] dark:border-[#332720]">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9A4715] dark:text-[#E57A32] hover:underline whitespace-nowrap"
            >
              <span>{UI_COPY.actions.instagramCta[lang]}</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
