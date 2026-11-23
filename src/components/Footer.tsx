import { Instagram } from 'lucide-react';
import { INSTAGRAM_URL, Language, UI_COPY } from '../data/bakeryData';

interface FooterProps {
  lang: Language;
}

export function Footer({ lang }: FooterProps) {
  return (
    <footer className="border-t border-[#E6D8C8] dark:border-[#332720] bg-[#F5EDE2]/70 dark:bg-[#1C1511]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-start">
          <span className="font-display text-base font-bold text-[#241914] dark:text-[#F6EDE3]">
            {UI_COPY.brandFull[lang]}
          </span>
          <span
            aria-hidden="true"
            className="hidden sm:inline text-[#B8A18D] dark:text-[#665347]"
          >
            ·
          </span>
          <span className="text-sm text-[#6B5446] dark:text-[#BFA99A]">
            {UI_COPY.cityFooter[lang]}
          </span>
        </div>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram @atayeb_marhaba"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#8E3C0C] dark:text-[#E57A32] hover:text-[#C85A17] dark:hover:text-[#F39A5C] transition-colors whitespace-nowrap shrink-0"
        >
          <Instagram className="w-4 h-4" aria-hidden="true" />
          <span dir="ltr">@atayeb_marhaba</span>
        </a>
      </div>
    </footer>
  );
}
