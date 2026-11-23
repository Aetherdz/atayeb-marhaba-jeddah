import { ArrowLeft, ArrowRight, ExternalLink, Instagram } from 'lucide-react';
import {
  DELIVERY_APPS,
  INSTAGRAM_URL,
  Language,
  PageId,
  UI_COPY,
} from '../data/bakeryData';
import { FaqSection } from './FaqSection';
import { HowToOrderSection } from './HowToOrderSection';

interface ContactViewProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export function ContactView({ lang, onNavigate }: ContactViewProps) {
  const DirectionArrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-12">
      <div className="max-w-2xl space-y-2.5">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#241914] dark:text-[#F6EDE3]">
          {UI_COPY.contact.pageTitle[lang]}
        </h1>
        <p className="text-base sm:text-[17px] leading-relaxed text-[#4A372C] dark:text-[#DFD0C3]">
          {UI_COPY.contact.pageSubtitle[lang]}
        </p>
      </div>

      {/* Single Unified Contact & Ordering Block */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#DFCEBC] dark:border-[#3E3028] space-y-8">
        {/* 1. Verbatim Instagram Bio (Once Only on the Site) */}
        <section aria-labelledby="instagram-bio-heading" className="space-y-3">
          <h2
            id="instagram-bio-heading"
            className="text-sm font-semibold text-[#4A372C] dark:text-[#DFD0C3]"
          >
            {UI_COPY.contact.bioSourceLabel[lang]}
          </h2>

          <p className="font-display text-lg sm:text-xl font-medium leading-[1.8] text-[#241914] dark:text-[#F6EDE3]">
            {UI_COPY.bio[lang]}
          </p>
        </section>

        {/* 2. Full How to Order Pathways */}
        <div className="pt-7 border-t border-[#EFE3D5] dark:border-[#332720]">
          <HowToOrderSection lang={lang} onNavigate={onNavigate} />
        </div>

        {/* 3. Single Unified Action & Channels Row */}
        <div className="pt-7 border-t border-[#EFE3D5] dark:border-[#332720] flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[50px] inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#A84208] hover:bg-[#8E3706] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-base font-bold transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
            >
              <Instagram className="w-[18px] h-[18px]" aria-hidden="true" />
              <span>{UI_COPY.actions.orderOnInstagram[lang]}</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => onNavigate('branches')}
              className="min-h-[44px] inline-flex items-center gap-1.5 text-base font-semibold text-[#241914] dark:text-[#F6EDE3] underline decoration-[#8D7463] dark:decoration-[#9C8474] underline-offset-4 hover:decoration-[#241914] dark:hover:decoration-[#F6EDE3] transition-colors whitespace-nowrap shrink-0 cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
            >
              <span>{UI_COPY.actions.viewBranches[lang]}</span>
              <DirectionArrow className="w-4 h-4 shrink-0" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-y-2 gap-x-4 text-base text-[#3D2B21] dark:text-[#E5D7CA]">
            <span>{UI_COPY.contact.facebookText[lang]}</span>
            <span
              aria-hidden="true"
              className="hidden sm:inline text-[#7D6658] dark:text-[#A99586]"
            >
              ·
            </span>
            <span dir="ltr" className="font-semibold text-[#241914] dark:text-[#F6EDE3]">
              {DELIVERY_APPS.join(' · ')}
            </span>
          </div>
        </div>
      </div>

      {/* Shortened 3-question FAQ Accordion */}
      <FaqSection lang={lang} />
    </div>
  );
}
