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
              className="pointer-events-none absolute top-1/2 -translate-y-1/2 start-3.5 w-4 h-4 text-[#8A7162] dark:text-[#A99282]"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={UI_COPY.branches.searchPlaceholder[lang]}
              aria-label={UI_COPY.branches.searchPlaceholder[lang]}
              className="w-full ps-10 pe-10 py-2.5 rounded-full bg-[#FFFDF9] dark:bg-[#221A16] border border-[#E4D5C3] dark:border-[#3A2D25] text-sm text-[#241914] dark:text-[#F6EDE3] placeholder:text-[#8A7162] dark:placeholder:text-[#9C8677] focus:outline-none focus:border-[#C85A17] dark:focus:border-[#E57A32] transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label={UI_COPY.actions.clearSearch[lang]}
                className="absolute top-1/2 -translate-y-1/2 end-2.5 w-7 h-7 rounded-full flex items-center justify-center text-[#7D6759] dark:text-[#B5A090] hover:bg-[#F1E7DA] dark:hover:bg-[#31261F] transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          <div
            role="tablist"
            aria-label={UI_COPY.branches.pageTitle[lang]}
            className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl sm:rounded-full bg-[#F1E7DA] dark:bg-[#231B16] border border-[#E5D7C6] dark:border-[#362A22] self-start"
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
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C85A17] dark:focus-visible:outline-[#E57A32] ${
                    isSelected
                      ? 'bg-[#C85A17] text-[#FFFDF9] dark:bg-[#E57A32] dark:text-[#17120F]'
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
        <div className="p-8 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#E6D8C8] dark:border-[#362A22] text-center space-y-4">
          <p className="text-base font-medium text-[#5C473B] dark:text-[#CDBBAE]">
            {UI_COPY.branches.noResults[lang]}
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2 rounded-full bg-[#C85A17] hover:bg-[#AD4B11] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-sm font-semibold transition-colors cursor-pointer"
          >
            {UI_COPY.actions.resetFilters[lang]}
          </button>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {visibleBranches.map((branch) => {
            const isCopied = copiedId === branch.id;
            return (
              <li
                key={branch.id}
                className="h-full p-5 sm:p-6 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#E6D8C8] dark:border-[#362A22] flex flex-col justify-between gap-5"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <span className="mt-0.5 w-10 h-10 rounded-full shrink-0 flex items-center justify-center bg-[#F4E9DC] dark:bg-[#2F241E] text-[#B24E12] dark:text-[#E57A32]">
                    <MapPin className="w-[18px] h-[18px]" aria-hidden="true" />
                  </span>

                  <div className="space-y-1.5 min-w-0 flex-1">
                    <p className="text-xs font-semibold text-[#9A4715] dark:text-[#E57A32]">
                      {branch.district[lang]} · {branch.road[lang]}
                    </p>
                    <p
                      dir="ltr"
                      className={`text-sm sm:text-[15px] font-semibold leading-relaxed text-[#241914] dark:text-[#F6EDE3] ${
                        lang === 'ar' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {branch.address}
                    </p>
                  </div>
                </div>

                {/* Copy Address & Google Maps actions */}
                <div className="pt-4 border-t border-[#F0E5D8] dark:border-[#332720] flex flex-wrap items-center gap-2.5">
                  <a
                    href={getGoogleMapsSearchUrl(branch.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C85A17] hover:bg-[#AD4B11] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C85A17] dark:focus-visible:outline-[#E57A32]"
                  >
                    <span>{UI_COPY.actions.openInMaps[lang]}</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopyAddress(branch.id, branch.address)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F4ECE1] hover:bg-[#EAE0D1] dark:bg-[#2D221C] dark:hover:bg-[#382B23] border border-[#E4D5C3] dark:border-[#3E3028] text-[#3B2A21] dark:text-[#F2E7DC] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C85A17] dark:focus-visible:outline-[#E57A32]"
                  >
                    {isCopied ? (
                      <>
                        <Check
                          className="w-3.5 h-3.5 text-[#9A4715] dark:text-[#E57A32]"
                          aria-hidden="true"
                        />
                        <span>{UI_COPY.actions.copied[lang]}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{UI_COPY.actions.copyAddress[lang]}</span>
                      </>
                    )}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
