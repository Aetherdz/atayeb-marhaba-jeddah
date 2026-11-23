import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS, Language, UI_COPY } from '../data/bakeryData';

interface FaqSectionProps {
  lang: Language;
}

export function FaqSection({ lang }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section aria-labelledby="faq-heading" className="space-y-6">
      <div className="max-w-2xl space-y-1.5">
        <h2
          id="faq-heading"
          className="font-display text-2xl sm:text-3xl font-bold text-[#241914] dark:text-[#F6EDE3]"
        >
          {UI_COPY.faq.title[lang]}
        </h2>
        <p className="text-base sm:text-[17px] text-[#4A372C] dark:text-[#DFD0C3]">
          {UI_COPY.faq.subtitle[lang]}
        </p>
      </div>

      <div className="rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#DFCEBC] dark:border-[#3E3028] divide-y divide-[#EFE3D5] dark:divide-[#332720] overflow-hidden">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          const panelId = `faq-panel-${item.id}`;
          return (
            <div key={item.id}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleToggle(item.id)}
                className="w-full min-h-[56px] px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-start hover:bg-[#F7F0E6]/60 dark:hover:bg-[#2A201B]/60 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
              >
                <span className="font-display text-base sm:text-[17px] font-bold text-[#241914] dark:text-[#F6EDE3]">
                  {item.question[lang]}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={`w-5 h-5 shrink-0 text-[#4A372C] dark:text-[#DFD0C3] transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  className="px-5 sm:px-6 pb-5 pt-1 text-base sm:text-[17px] leading-relaxed text-[#3D2B21] dark:text-[#E5D7CA]"
                >
                  {item.answer[lang]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
