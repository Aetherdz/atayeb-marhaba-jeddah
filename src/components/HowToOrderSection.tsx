import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
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
    <section aria-labelledby="how-to-order-heading" className="space-y-4">
      <h2
        id="how-to-order-heading"
        className="font-display text-xl sm:text-2xl font-bold text-[#241914] dark:text-[#F6EDE3]"
      >
        {UI_COPY.howToOrder.title[lang]}
      </h2>

      <div className="rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#E6D8C8] dark:border-[#362A22] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-[#EFE3D5] dark:divide-[#332720]">
        {/* Path 1: Delivery Apps (names only, no links) */}
        <div className="p-5 sm:px-6 flex flex-col justify-between gap-2">
          <span className="text-xs font-semibold text-[#6B5446] dark:text-[#BFA99A]">
            {UI_COPY.howToOrder.step1Title[lang]}
          </span>
          <p
            dir="ltr"
            className={`text-sm font-semibold text-[#241914] dark:text-[#F6EDE3] leading-relaxed ${
              lang === 'ar' ? 'text-right' : 'text-left'
            }`}
          >
            {DELIVERY_APPS.join(' · ')}
          </p>
        </div>

        {/* Path 2: Jeddah Branches via Google Maps */}
        <div className="p-5 sm:px-6 flex flex-col justify-between gap-2">
          <span className="text-xs font-semibold text-[#6B5446] dark:text-[#BFA99A]">
            {UI_COPY.howToOrder.step2Title[lang]}
          </span>
          <div>
            <button
              type="button"
              onClick={() => onNavigate('branches')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#241914] dark:text-[#F6EDE3] underline decoration-[#C9B39E] dark:decoration-[#665143] underline-offset-4 hover:decoration-[#241914] dark:hover:decoration-[#F6EDE3] transition-colors cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
            >
              <span>{UI_COPY.howToOrder.step2Desc[lang]}</span>
              <DirectionArrow className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Path 3: Instagram Messaging */}
        <div className="p-5 sm:px-6 flex flex-col justify-between gap-2">
          <span className="text-xs font-semibold text-[#6B5446] dark:text-[#BFA99A]">
            {UI_COPY.howToOrder.step3Title[lang]}
          </span>
          <div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#241914] dark:text-[#F6EDE3] underline decoration-[#C9B39E] dark:decoration-[#665143] underline-offset-4 hover:decoration-[#241914] dark:hover:decoration-[#F6EDE3] transition-colors rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
            >
              <span>{UI_COPY.actions.instagramCta[lang]}</span>
              <span dir="ltr" className="text-xs text-[#6B5446] dark:text-[#BFA99A]">
                (@atayeb_marhaba)
              </span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
