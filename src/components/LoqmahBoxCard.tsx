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
      className="p-6 sm:p-7 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#DFCEBC] dark:border-[#3E3028]"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-4">
          <h2
            id="loqmah-box-builder-heading"
            className="font-display text-xl sm:text-2xl font-bold text-[#241914] dark:text-[#F6EDE3]"
          >
            {UI_COPY.loqmahCard.title[lang]}
          </h2>

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
                  className={`min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm sm:text-[15px] font-semibold border transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3] ${
                    isSelected
                      ? 'bg-[#241914] border-[#241914] text-[#FFFDF9] dark:bg-[#F6EDE3] dark:border-[#F6EDE3] dark:text-[#17120F]'
                      : 'bg-[#F4ECE1] dark:bg-[#2B211B] border-[#D8C6B2] dark:border-[#493A30] text-[#241914] dark:text-[#F6EDE3] hover:border-[#4A372C] dark:hover:border-[#DFD0C3]'
                  }`}
                >
                  {isSelected && (
                    <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                  )}
                  <span>{variety.label[lang]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3.5 pt-4 border-t border-[#EFE3D5] dark:border-[#332720] lg:pt-0 lg:border-t-0 shrink-0">
          <p className="font-display text-base sm:text-[17px] font-bold text-[#241914] dark:text-[#F6EDE3]">
            {selectedLabels.length > 0
              ? selectedLabels.join(' · ')
              : UI_COPY.loqmahCard.emptyPrompt[lang]}
          </p>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[46px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D8C6B2] dark:border-[#4A3A2F] bg-[#F4ECE1] hover:bg-[#EAE0D1] dark:bg-[#2D221C] dark:hover:bg-[#382B23] text-[#241914] dark:text-[#F6EDE3] text-[15px] font-bold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
          >
            <Instagram className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{UI_COPY.actions.orderOnInstagram[lang]}</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
