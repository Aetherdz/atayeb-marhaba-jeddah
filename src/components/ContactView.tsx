import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Instagram,
  MessageCircle,
  ShoppingBag,
} from 'lucide-react';
import {
  DELIVERY_APPS,
  INSTAGRAM_URL,
  Language,
  PageId,
  UI_COPY,
  WHATSAPP_NUMBER_INTL,
  WHATSAPP_URL,
} from '../data/bakeryData';
import { FaqSection } from './FaqSection';

interface ContactViewProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export function ContactView({ lang, onNavigate }: ContactViewProps) {
  const DirectionArrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-10 sm:space-y-12">
      <div className="max-w-2xl space-y-2">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#241914] dark:text-[#F6EDE3]">
          {UI_COPY.contact.pageTitle[lang]}
        </h1>
        <p className="text-base sm:text-[17px] leading-relaxed text-[#4A372C] dark:text-[#DFD0C3]">
          {UI_COPY.contact.pageSubtitle[lang]}
        </p>
      </div>

      {/* Single Clean Unified Contact Block — Zero Repeated Links or Labels */}
      <div className="p-5 sm:p-8 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#DFCEBC] dark:border-[#3E3028] space-y-7">
        {/* Heritage + Bio (Once) */}
        <div className="space-y-2">
          <span className="text-sm font-bold text-[#A84208] dark:text-[#F08A43]">
            {UI_COPY.sinceLabel[lang]}
          </span>
          <p className="font-display text-lg sm:text-xl font-medium leading-[1.8] text-[#241914] dark:text-[#F6EDE3]">
            {UI_COPY.bio[lang]}
          </p>
        </div>

        {/* 3 Distinct Ordering & Communication Channels */}
        <div className="pt-6 border-t border-[#EFE3D5] dark:border-[#332720] grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. WhatsApp */}
          <div className="space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-display text-lg font-bold text-[#241914] dark:text-[#F6EDE3]">
                <MessageCircle className="w-5 h-5 text-[#1E7A46] dark:text-[#4AD284]" aria-hidden="true" />
                <span>{UI_COPY.contact.whatsappTitle[lang]}</span>
              </div>
              <p className="text-sm text-[#4A372C] dark:text-[#DFD0C3]">
                {UI_COPY.contact.whatsappDesc[lang]}
              </p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[46px] px-4 rounded-xl inline-flex items-center justify-center gap-2 bg-[#A84208] hover:bg-[#8E3706] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-sm font-bold transition-colors active:scale-[0.98]"
            >
              <bdi dir="ltr" className="tabular-nums">
                {WHATSAPP_NUMBER_INTL}
              </bdi>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </a>
          </div>

          {/* 2. Instagram & Facebook */}
          <div className="space-y-3 flex flex-col justify-between pt-5 border-t border-[#EFE3D5] dark:border-[#332720] md:pt-0 md:border-t-0">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-display text-lg font-bold text-[#241914] dark:text-[#F6EDE3]">
                <Instagram className="w-5 h-5 text-[#A84208] dark:text-[#F08A43]" aria-hidden="true" />
                <span>{UI_COPY.contact.instagramTitle[lang]}</span>
              </div>
              <p className="text-sm text-[#4A372C] dark:text-[#DFD0C3]">
                {UI_COPY.contact.facebookText[lang]}
              </p>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[46px] px-4 rounded-xl inline-flex items-center justify-center gap-2 bg-[#F4ECE1] hover:bg-[#EAE0D1] dark:bg-[#2D221C] dark:hover:bg-[#382B23] border border-[#D8C6B2] dark:border-[#4A3A2F] text-[#241914] dark:text-[#F6EDE3] text-sm font-bold transition-colors active:scale-[0.98]"
            >
              <span dir="ltr">@atayeb_marhaba</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </a>
          </div>

          {/* 3. Delivery Apps */}
          <div className="space-y-3 flex flex-col justify-between pt-5 border-t border-[#EFE3D5] dark:border-[#332720] md:pt-0 md:border-t-0">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-display text-lg font-bold text-[#241914] dark:text-[#F6EDE3]">
                <ShoppingBag className="w-5 h-5 text-[#4A372C] dark:text-[#DFD0C3]" aria-hidden="true" />
                <span>{UI_COPY.contact.deliveryTitle[lang]}</span>
              </div>
              <p className="text-sm text-[#4A372C] dark:text-[#DFD0C3]">
                {UI_COPY.contact.deliveryDesc[lang]}
              </p>
            </div>
            <p
              dir="ltr"
              className="min-h-[46px] px-4 rounded-xl bg-[#FAF4EC] dark:bg-[#1B1410] border border-[#EFE3D5] dark:border-[#332720] flex items-center justify-center text-sm font-bold text-[#241914] dark:text-[#F6EDE3] text-center"
            >
              {DELIVERY_APPS.join(' · ')}
            </p>
          </div>
        </div>

        {/* Single Link to Direct Branch Numbers & Maps */}
        <div className="pt-5 border-t border-[#EFE3D5] dark:border-[#332720] flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('branches')}
            className="min-h-[44px] inline-flex items-center gap-2 text-base font-bold text-[#241914] dark:text-[#F6EDE3] underline decoration-[#8D7463] dark:decoration-[#9C8474] underline-offset-4 hover:decoration-[#241914] dark:hover:decoration-[#F6EDE3] transition-colors cursor-pointer"
          >
            <span>{UI_COPY.actions.viewBranches[lang]}</span>
            <DirectionArrow className="w-4 h-4 shrink-0" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Concise Verified FAQ Accordion */}
      <FaqSection lang={lang} />
    </div>
  );
}
