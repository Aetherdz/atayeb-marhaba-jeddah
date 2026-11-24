import { Instagram, MessageCircle } from 'lucide-react';
import {
  INSTAGRAM_URL,
  Language,
  UI_COPY,
  WHATSAPP_NUMBER_INTL,
  WHATSAPP_URL,
} from '../data/bakeryData';

interface FooterProps {
  lang: Language;
}

export function Footer({ lang }: FooterProps) {
  return (
    <footer className="border-t border-[#E6D8C8] dark:border-[#332720] bg-[#F5EDE2]/70 dark:bg-[#1C1511]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 text-center sm:text-start">
          <span className="font-display text-base font-bold text-[#241914] dark:text-[#F6EDE3]">
            {UI_COPY.brandFull[lang]}
          </span>
          <span
            aria-hidden="true"
            className="hidden sm:inline text-[#B8A18D] dark:text-[#665347]"
          >
            ·
          </span>
          <span className="text-sm sm:text-[15px] text-[#4A372C] dark:text-[#DFD0C3]">
            {UI_COPY.cityFooter[lang]}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${WHATSAPP_NUMBER_INTL}`}
            className="min-h-[44px] inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-semibold text-[#1E7A46] dark:text-[#4AD284] hover:text-[#241914] dark:hover:text-[#FFFDF9] transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <bdi dir="ltr" className="tabular-nums">
              {WHATSAPP_NUMBER_INTL}
            </bdi>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @atayeb_marhaba"
            className="min-h-[44px] inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-semibold text-[#8E3706] dark:text-[#F08A43] hover:text-[#241914] dark:hover:text-[#FFFDF9] transition-colors whitespace-nowrap shrink-0"
          >
            <Instagram className="w-4 h-4" aria-hidden="true" />
            <span dir="ltr">@atayeb_marhaba</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
