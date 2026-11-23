import { useEffect, useRef, useState } from 'react';
import { Check, Copy, ExternalLink, MapPin, Search, X } from 'lucide-react';
import {
  BranchRoadFilter,
  getGoogleMapsSearchUrl,
  JEDDAH_BRANCHES,
  Language,
  UI_COPY,
} from '../data/bakeryData';

interface BranchesViewProps {
  lang: Language;
}

const ROAD_FILTERS: readonly BranchRoadFilter[] = [
  'all',
  'prince-sultan',
  'king-abdulaziz',
  'prince-mohammed',
];

function normalizeSearch(value: string): string {
  return value
    .toLowerCase()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/-/g, ' ')
    .trim();
}

export function BranchesView({ lang }: BranchesViewProps) {
  const [query, setQuery] = useState('');
  const [roadFilter, setRoadFilter] = useState<BranchRoadFilter>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopyAddress = async (id: string, address: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(address);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = address;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedId(id);
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch {
      // Ignore clipboard permission errors cleanly
    }
  };

  const normalizedQuery = normalizeSearch(query);

  const visibleBranches = JEDDAH_BRANCHES.filter((branch) => {
    const matchesRoad = roadFilter === 'all' || branch.roadKey === roadFilter;
    if (!matchesRoad) return false;
    if (!normalizedQuery) return true;
    const searchable = [
      branch.address,
      branch.district.ar,
      branch.district.en,
      branch.road.ar,
      branch.road.en,
    ];
    return searchable.some((part) =>
      normalizeSearch(part).includes(normalizedQuery)
    );
  });

  const handleReset = () => {
    setQuery('');
    setRoadFilter('all');
  };

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <div className="max-w-2xl space-y-2.5">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#241914] dark:text-[#F6EDE3]">
            {UI_COPY.branches.pageTitle[lang]}
          </h1>
          <p className="text-sm sm:text-base leading-relaxed text-[#6B5446] dark:text-[#BFA99A]">
            {UI_COPY.branches.pageSubtitle[lang]}
          </p>
        </div>

        {/* Instant search + road filter tabs */}
        <div className="flex flex-col gap-4">
          <div className="relative w-full max-w-md">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 -translate-y-1/2 start-3.5 w-4 h-4 text-[#7D6759] dark:text-[#A99282]"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={UI_COPY.branches.searchPlaceholder[lang]}
              aria-label={UI_COPY.branches.searchPlaceholder[lang]}
              className="w-full ps-10 pe-10 py-2.5 rounded-full bg-[#FFFDF9] dark:bg-[#221A16] border border-[#E4D5C3] dark:border-[#3A2D25] text-sm text-[#241914] dark:text-[#F6EDE3] placeholder:text-[#7D6759] dark:placeholder:text-[#9C8677] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3] transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label={UI_COPY.actions.clearSearch[lang]}
                className="absolute top-1/2 -translate-y-1/2 end-2.5 w-7 h-7 rounded-full flex items-center justify-center text-[#5C473B] dark:text-[#CDBBAE] hover:bg-[#F1E7DA] dark:hover:bg-[#31261F] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          <div
            role="tablist"
            aria-label={UI_COPY.branches.pageTitle[lang]}
            className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl sm:rounded-full bg-[#F1E7DA] dark:bg-[#231B16] border border-[#E5D7C6] dark:border-[#362A22] self-start max-w-full"
          >
            {ROAD_FILTERS.map((road) => {
              const isSelected = roadFilter === road;
              return (
                <button
                  key={road}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setRoadFilter(road)}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3] ${
                    isSelected
                      ? 'bg-[#2C1C14] text-[#FFFDF9] dark:bg-[#F4EAE0] dark:text-[#17120F]'
                      : 'text-[#5C473B] dark:text-[#CDBBAE] hover:text-[#241914] dark:hover:text-[#F6EDE3]'
                  }`}
                >
                  {UI_COPY.branches.roadFilters[road][lang]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {visibleBranches.length === 0 ? (
        <div className="p-8 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#D8C6B2] dark:border-[#413228] text-center space-y-4">
          <p className="text-base font-medium text-[#5C473B] dark:text-[#CDBBAE]">
            {UI_COPY.branches.noResults[lang]}
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 h-12 rounded-full bg-[#B2480B] hover:bg-[#963B08] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
          >
            {UI_COPY.actions.resetFilters[lang]}
          </button>
        </div>
      ) : (
        <ul className="flex flex-col gap-5 sm:gap-6">
          {visibleBranches.map((branch) => {
            const isCopied = copiedId === branch.id;
            const openMapsLabel =
              lang === 'ar' ? 'افتح في خرائط Google' : 'Open in Google Maps';

            return (
              <li
                key={branch.id}
                className="w-full p-5 sm:p-6 lg:px-7 lg:py-6 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#D8C6B2] dark:border-[#413228] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 lg:gap-8"
              >
                {/* 1. Prominent District / Road + 2. Full Verbatim Address */}
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <MapPin
                      className="w-5 h-5 mt-1 shrink-0 text-[#5C473B] dark:text-[#CDBBAE]"
                      aria-hidden="true"
                    />
                    <h2 className="font-display text-xl sm:text-2xl font-bold leading-snug text-[#241914] dark:text-[#F6EDE3]">
                      <span>{branch.district[lang]}</span>
                      <span
                        aria-hidden="true"
                        className="mx-2 font-normal text-[#A89283] dark:text-[#6E594C]"
                      >
                        ·
                      </span>
                      <span className="font-semibold text-[#5C473B] dark:text-[#D5C3B5]">
                        {branch.road[lang]}
                      </span>
                    </h2>
                  </div>

                  <p
                    dir="ltr"
                    className={`text-sm sm:text-base font-medium leading-relaxed text-[#4F3B30] dark:text-[#D5C3B5] break-words ${
                      lang === 'ar' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {branch.address}
                  </p>
                </div>

                {/* 3. Two 56px Action Buttons: Copy Address & Open in Google Maps */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 pt-4 border-t border-[#EFE3D5] dark:border-[#332720] lg:pt-0 lg:border-t-0">
                  <button
                    type="button"
                    onClick={() => handleCopyAddress(branch.id, branch.address)}
                    aria-live="polite"
                    className="h-14 px-5 rounded-full inline-flex items-center justify-center gap-2 bg-[#F4ECE1] hover:bg-[#EAE0D1] dark:bg-[#2D221C] dark:hover:bg-[#382B23] border border-[#D8C6B2] dark:border-[#4A3A2F] text-[#241914] dark:text-[#F6EDE3] text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{UI_COPY.actions.copied[lang]}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{UI_COPY.actions.copyAddress[lang]}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={getGoogleMapsSearchUrl(branch.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-14 px-6 rounded-full inline-flex items-center justify-center gap-2 bg-[#B2480B] hover:bg-[#963B08] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
                  >
                    <span>{openMapsLabel}</span>
                    <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
