import { ExternalLink, Instagram } from 'lucide-react';
import {
  DELIVERY_APPS,
  INSTAGRAM_URL,
  Language,
  PageId,
  UI_COPY,
} from '../data/bakeryData';
import { HowToOrderSection } from './HowToOrderSection';

interface ContactViewProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export function ContactView({ lang, onNavigate }: ContactViewProps) {
  return (
    <div className="space-y-12">
      <div className="max-w-2xl space-y-2.5">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#241914] dark:text-[#F6EDE3]">
          {UI_COPY.contact.pageTitle[lang]}
        </h1>
        <p className="text-sm sm:text-base leading-relaxed text-[#6B5446] dark:text-[#BFA99A]">
          {UI_COPY.contact.pageSubtitle[lang]}
        </p>
      </div>

      {/* How to Order (3 Real Channels Only) */}
      <HowToOrderSection lang={lang} onNavigate={onNavigate} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Primary Contact Card: Instagram */}
        <section className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#E6D8C8] dark:border-[#362A22] flex flex-col justify-between gap-8">
          <div className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#241914] dark:text-[#F6EDE3]">
              {UI_COPY.contact.instagramCardTitle[lang]}
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#5C473B] dark:text-[#CDBBAE] max-w-xl">
              {UI_COPY.contact.instagramCardDesc[lang]}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#C85A17] hover:bg-[#AD4B11] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-sm sm:text-base font-semibold transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C85A17] dark:focus-visible:outline-[#E57A32]"
            >
              <Instagram className="w-[18px] h-[18px]" aria-hidden="true" />
              <span>{UI_COPY.actions.instagramCta[lang]}</span>
              <ExternalLink className="w-4 h-4 opacity-80" aria-hidden="true" />
            </a>

            <span
              dir="ltr"
              className="text-sm font-medium text-[#7D6759] dark:text-[#A89283]"
            >
              @atayeb_marhaba
            </span>
          </div>
        </section>

        {/* Secondary Social Note: Facebook */}
        <section className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#F4ECE1] dark:bg-[#201814] border border-[#E6D8C8] dark:border-[#362A22] flex flex-col justify-center gap-3">
          <h2 className="font-display text-xl font-bold text-[#241914] dark:text-[#F6EDE3]">
            {UI_COPY.contact.facebookTitle[lang]}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#523E33] dark:text-[#D5C3B5]">
            {UI_COPY.contact.facebookText[lang]}
          </p>
        </section>
      </div>

      {/* Ordering via Delivery Apps (Names ONLY, No Links) */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#E6D8C8] dark:border-[#362A22] space-y-6">
        <div className="space-y-2">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#241914] dark:text-[#F6EDE3]">
            {UI_COPY.contact.deliveryTitle[lang]}
          </h2>
          <p className="text-sm sm:text-base text-[#5C473B] dark:text-[#CDBBAE]">
            {UI_COPY.contact.deliveryText[lang]}
          </p>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {DELIVERY_APPS.map((appName) => (
            <li
              key={appName}
              dir="ltr"
              className="px-4 py-3.5 rounded-xl bg-[#F7F0E6] dark:bg-[#2B211B] border border-[#E8DAC9] dark:border-[#3B2E26] text-center font-display text-sm sm:text-base font-semibold text-[#2E2018] dark:text-[#F4E9DE]"
            >
              {appName}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
