import { useState } from 'react';
import { Check, ExternalLink, Instagram } from 'lucide-react';
import {
  INSTAGRAM_URL,
  Language,
  MANKOUSHEH_VARIETIES,
  UI_COPY,
} from '../data/bakeryData';

interface LoqmahBoxCardProps {
  lang: Language;
}

export function LoqmahBoxCard({ lang }: LoqmahBoxCardProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'zaatar',
    'cheese',
  ]);

  const toggleVariety = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedLabels = MANKOUSHEH_VARIETIES.filter((v) =>
    selectedIds.includes(v.id)
  ).map((v) => v.label[lang]);

  return (
    <section
      aria-labelledby="loqmah-box-builder-heading"
      className="p-6 sm:p-8 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#E6D8C8] dark:border-[#362A22]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-1.5">
            <h2
              id="loqmah-box-builder-heading"
              className="font-display text-xl sm:text-2xl font-bold text-[#241914] dark:text-[#F6EDE3]"
            >
              {UI_COPY.loqmahCard.title[lang]}
            </h2>
            <p className="font-display text-sm sm:text-base font-medium text-[#5C473B] dark:text-[#D6C3B4]">
              {UI_COPY.loqmahCard.quote[lang]}
            </p>
          </div>

          <p className="text-sm text-[#5C473B] dark:text-[#CDBBAE]">
            {UI_COPY.loqmahCard.instruction[lang]}
          </p>

          <div
            role="group"
            aria-label={UI_COPY.loqmahCard.title[lang]}
            className="flex flex-wrap items-center gap-2.5"
          >
            {MANKOUSHEH_VARIETIES.map((variety) => {
              const isSelected = selectedIds.includes(variety.id);
              return (
                <button
                  key={variety.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggleVariety(variety.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3] ${
                    isSelected
                      ? 'bg-[#2C1C14] border-[#2C1C14] text-[#FFFDF9] dark:bg-[#F4EAE0] dark:border-[#F4EAE0] dark:text-[#17120F]'
                      : 'bg-[#F7F0E6] dark:bg-[#2B211B] border-[#E4D5C3] dark:border-[#3D3027] text-[#3B2A21] dark:text-[#EFE4D8] hover:border-[#5C473B] dark:hover:border-[#CDBBAE]'
                  }`}
                >
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  )}
                  <span>{variety.label[lang]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 p-5 rounded-xl bg-[#F4ECE1] dark:bg-[#1B1410] border border-[#E6D8C8] dark:border-[#342821] flex flex-col justify-between gap-5">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-[#6B5446] dark:text-[#BFA99A]">
              {UI_COPY.loqmahCard.selectedLabel[lang]}
            </p>
            <p className="font-display text-base font-bold leading-relaxed text-[#241914] dark:text-[#F6EDE3]">
              {selectedLabels.length > 0
                ? selectedLabels.join(' · ')
                : UI_COPY.loqmahCard.emptyPrompt[lang]}
            </p>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#B2480B] hover:bg-[#963B08] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-sm font-semibold transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
          >
            <Instagram className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{UI_COPY.actions.instagramCta[lang]}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
