import { useEffect, useRef, useState } from 'react';
import {
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  MapPin,
  Search,
  X,
} from 'lucide-react';
import {
  BranchDistrictFilter,
  BranchRoadFilter,
  getGoogleMapsEmbedUrl,
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
  const [districtFilter, setDistrictFilter] =
    useState<BranchDistrictFilter>('all');
  const [roadFilter, setRoadFilter] = useState<BranchRoadFilter>('all');
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
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
    const matchesDistrict =
      districtFilter === 'all' || branch.id === districtFilter;
    if (!matchesDistrict) return false;
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

  const handleSelectDistrict = (nextDistrict: BranchDistrictFilter) => {
    setDistrictFilter(nextDistrict);
    if (nextDistrict !== 'all') {
      setRoadFilter('all');
    }
  };

  const handleSelectRoad = (nextRoad: BranchRoadFilter) => {
    setRoadFilter(nextRoad);
    if (nextRoad !== 'all') {
      setDistrictFilter('all');
    }
  };

  const handleToggleBranchDetails = (branchId: string) => {
    setSelectedBranchId((prev) => (prev === branchId ? null : branchId));
  };

  const handleReset = () => {
    setQuery('');
    setDistrictFilter('all');
    setRoadFilter('all');
    setSelectedBranchId(null);
  };

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <div className="max-w-3xl space-y-2.5">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#241914] dark:text-[#F6EDE3]">
            {UI_COPY.branches.pageTitle[lang]}
          </h1>
          <p className="text-base sm:text-[17px] leading-relaxed text-[#4A372C] dark:text-[#DFD0C3]">
            {UI_COPY.branches.pageSubtitle[lang]}
          </p>
        </div>

        {/* Primary Filter: 7 Verified Districts */}
        <div className="space-y-4">
          <div
            role="tablist"
            aria-label={UI_COPY.branches.districtFilterLabel[lang]}
            className="flex flex-wrap items-center gap-2"
          >
            <button
              type="button"
              role="tab"
              aria-selected={districtFilter === 'all'}
              onClick={() => handleSelectDistrict('all')}
              className={`min-h-[44px] px-4 rounded-full text-sm sm:text-[15px] font-semibold border transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3] ${
                districtFilter === 'all'
                  ? 'bg-[#241914] border-[#241914] text-[#FFFDF9] dark:bg-[#F6EDE3] dark:border-[#F6EDE3] dark:text-[#17120F]'
                  : 'bg-[#F4ECE1] dark:bg-[#231B16] border-[#DFCEBC] dark:border-[#3E3028] text-[#241914] dark:text-[#F6EDE3] hover:bg-[#EAE0D1] dark:hover:bg-[#31261F]'
              }`}
            >
              {UI_COPY.branches.allDistricts[lang]}
            </button>

            {JEDDAH_BRANCHES.map((branch) => {
              const isSelected = districtFilter === branch.id;
              return (
                <button
                  key={branch.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() =>
                    handleSelectDistrict(branch.id as BranchDistrictFilter)
                  }
                  className={`min-h-[44px] px-4 rounded-full text-sm sm:text-[15px] font-semibold border transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3] ${
                    isSelected
                      ? 'bg-[#241914] border-[#241914] text-[#FFFDF9] dark:bg-[#F6EDE3] dark:border-[#F6EDE3] dark:text-[#17120F]'
                      : 'bg-[#F4ECE1] dark:bg-[#231B16] border-[#DFCEBC] dark:border-[#3E3028] text-[#241914] dark:text-[#F6EDE3] hover:bg-[#EAE0D1] dark:hover:bg-[#31261F]'
                  }`}
                >
                  {branch.district[lang]}
                </button>
              );
            })}
          </div>

          {/* Search + Compact Road Filter Select (No Clutter) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 -translate-y-1/2 start-4 w-4 h-4 text-[#4A372C] dark:text-[#DFD0C3]"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={UI_COPY.branches.searchPlaceholder[lang]}
                aria-label={UI_COPY.branches.searchPlaceholder[lang]}
                className="w-full min-h-[46px] ps-11 pe-11 py-2.5 rounded-full bg-[#FFFDF9] dark:bg-[#221A16] border border-[#D8C6B2] dark:border-[#493A30] text-base text-[#241914] dark:text-[#F6EDE3] placeholder:text-[#5A4437] dark:placeholder:text-[#CBB9AA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3] transition-colors"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label={UI_COPY.actions.clearSearch[lang]}
                  className="absolute top-1/2 -translate-y-1/2 end-2 w-9 h-9 rounded-full flex items-center justify-center text-[#3D2B21] dark:text-[#E5D7CA] hover:bg-[#F1E7DA] dark:hover:bg-[#31261F] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>

            <div className="relative sm:w-72">
              <select
                value={roadFilter}
                onChange={(e) =>
                  handleSelectRoad(e.target.value as BranchRoadFilter)
                }
                aria-label={UI_COPY.branches.roadFilterLabel[lang]}
                className="w-full min-h-[46px] appearance-none ps-4 pe-10 py-2.5 rounded-full bg-[#FFFDF9] dark:bg-[#221A16] border border-[#D8C6B2] dark:border-[#493A30] text-sm sm:text-[15px] font-semibold text-[#241914] dark:text-[#F6EDE3] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
              >
                {ROAD_FILTERS.map((road) => (
                  <option key={road} value={road}>
                    {UI_COPY.branches.roadFilters[road][lang]}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 -translate-y-1/2 end-3.5 w-4 h-4 text-[#4A372C] dark:text-[#DFD0C3]"
              />
            </div>
          </div>
        </div>
      </div>

      {visibleBranches.length === 0 ? (
        <div className="p-8 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#D8C6B2] dark:border-[#413228] text-center space-y-4">
          <p className="text-base sm:text-[17px] font-medium text-[#3D2B21] dark:text-[#E5D7CA]">
            {UI_COPY.branches.noResults[lang]}
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="min-h-[48px] px-6 rounded-full bg-[#A84208] hover:bg-[#8E3706] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-base font-bold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
          >
            {UI_COPY.actions.resetFilters[lang]}
          </button>
        </div>
      ) : (
        <ul className="flex flex-col gap-5 sm:gap-6">
          {visibleBranches.map((branch) => {
            const isCopied = copiedId === branch.id;
            const isSelected = selectedBranchId === branch.id;
            const detailsPanelId = `branch-details-${branch.id}`;
            const openMapsLabel =
              lang === 'ar' ? 'افتح في خرائط Google' : 'Open in Google Maps';

            return (
              <li
                key={branch.id}
                className={`w-full rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border transition-colors ${
                  isSelected
                    ? 'border-[#241914] dark:border-[#F6EDE3]'
                    : 'border-[#D8C6B2] dark:border-[#413228]'
                }`}
              >
                {/* Crux-style Full-Width Row */}
                <div className="p-5 sm:p-6 lg:px-7 lg:py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 lg:gap-8">
                  {/* 1. Prominent District / Road + 2. Bidi-Isolated Verbatim Address */}
                  <div className="min-w-0 flex-1 space-y-2.5">
                    <button
                      type="button"
                      onClick={() => handleToggleBranchDetails(branch.id)}
                      aria-expanded={isSelected}
                      aria-controls={detailsPanelId}
                      className="group w-full text-start flex items-start gap-2.5 cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
                    >
                      <MapPin
                        className="w-5 h-5 mt-1 shrink-0 text-[#4A372C] dark:text-[#DFD0C3]"
                        aria-hidden="true"
                      />
                      <h2 className="font-display text-xl sm:text-2xl font-bold leading-snug text-[#241914] dark:text-[#F6EDE3] group-hover:underline decoration-[#8D7463] dark:decoration-[#9C8474] underline-offset-4">
                        <span>{branch.district[lang]}</span>
                        <span
                          aria-hidden="true"
                          className="mx-2 font-normal text-[#7D6658] dark:text-[#A99586]"
                        >
                          ·
                        </span>
                        <span className="font-semibold text-[#4A372C] dark:text-[#DFD0C3]">
                          {branch.road[lang]}
                        </span>
                      </h2>
                    </button>

                    <p
                      className={`text-base font-medium leading-relaxed text-[#3D2B21] dark:text-[#E5D7CA] break-words ${
                        lang === 'ar' ? 'text-right' : 'text-left'
                      }`}
                    >
                      <bdi
                        dir="ltr"
                        className="inline-block [unicode-bidi:isolate] text-left"
                      >
                        {branch.address}
                      </bdi>
                    </p>
                  </div>

                  {/* 3. Action Buttons: Details & Map toggle + Copy Address + Open in Google Maps */}
                  <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 shrink-0 pt-4 border-t border-[#EFE3D5] dark:border-[#332720] lg:pt-0 lg:border-t-0">
                    <button
                      type="button"
                      onClick={() => handleToggleBranchDetails(branch.id)}
                      aria-expanded={isSelected}
                      aria-controls={detailsPanelId}
                      className={`h-14 px-5 rounded-full inline-flex items-center justify-center gap-2 border text-[15px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3] ${
                        isSelected
                          ? 'bg-[#241914] border-[#241914] text-[#FFFDF9] dark:bg-[#F6EDE3] dark:border-[#F6EDE3] dark:text-[#17120F]'
                          : 'bg-[#FFFDF9] hover:bg-[#F4ECE1] dark:bg-[#221A16] dark:hover:bg-[#2D221C] border-[#8D7463] dark:border-[#7B6658] text-[#241914] dark:text-[#F6EDE3]'
                      }`}
                    >
                      <span>
                        {isSelected
                          ? UI_COPY.branches.hideDetails[lang]
                          : UI_COPY.branches.viewDetails[lang]}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                          isSelected ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopyAddress(branch.id, branch.address)}
                      aria-live="polite"
                      className="h-14 px-5 rounded-full inline-flex items-center justify-center gap-2 bg-[#F4ECE1] hover:bg-[#EAE0D1] dark:bg-[#2D221C] dark:hover:bg-[#382B23] border border-[#D8C6B2] dark:border-[#4A3A2F] text-[#241914] dark:text-[#F6EDE3] text-[15px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
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
                      className="h-14 px-6 rounded-full inline-flex items-center justify-center gap-2 bg-[#A84208] hover:bg-[#8E3706] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-[15px] font-bold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
                    >
                      <span>{openMapsLabel}</span>
                      <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                {/* Expandable Branch Details Panel — Mounted ONLY for the single selected branch */}
                {isSelected && (
                  <div
                    id={detailsPanelId}
                    className="px-5 pb-6 pt-5 sm:px-6 lg:px-7 border-t border-[#E6D8C8] dark:border-[#3A2D25] bg-[#FAF4EC] dark:bg-[#1B1410] rounded-b-2xl space-y-5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="block text-sm font-semibold text-[#4A372C] dark:text-[#DFD0C3]">
                          {UI_COPY.branches.districtLabel[lang]}
                        </span>
                        <p className="font-display text-lg font-bold text-[#241914] dark:text-[#F6EDE3]">
                          {branch.district[lang]} — {branch.road[lang]}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="block text-sm font-semibold text-[#4A372C] dark:text-[#DFD0C3]">
                          {UI_COPY.branches.fullAddressLabel[lang]}
                        </span>
                        <p
                          className={`text-base font-semibold text-[#241914] dark:text-[#F6EDE3] break-words ${
                            lang === 'ar' ? 'text-right' : 'text-left'
                          }`}
                        >
                          <bdi
                            dir="ltr"
                            className="inline-block [unicode-bidi:isolate] text-left"
                          >
                            {branch.address}
                          </bdi>
                        </p>
                      </div>
                    </div>

                    {/* Single Real Lazy Google Maps Embed for Selected Branch Only */}
                    <div className="overflow-hidden rounded-xl border border-[#D8C6B2] dark:border-[#413228] bg-[#F2E8DC] dark:bg-[#261D18]">
                      <iframe
                        title={`${UI_COPY.branches.mapTitlePrefix[lang]} ${branch.district[lang]}`}
                        src={getGoogleMapsEmbedUrl(
                          branch.district.en,
                          branch.address
                        )}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-[300px] block border-0"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyAddress(branch.id, branch.address)
                        }
                        aria-live="polite"
                        className="min-h-[48px] px-5 rounded-full inline-flex items-center justify-center gap-2 bg-[#FFFDF9] hover:bg-[#EFE5D8] dark:bg-[#2A201B] dark:hover:bg-[#362922] border border-[#D8C6B2] dark:border-[#4A3A2F] text-[#241914] dark:text-[#F6EDE3] text-[15px] font-semibold transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
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
                        className="min-h-[48px] px-6 rounded-full inline-flex items-center justify-center gap-2 bg-[#A84208] hover:bg-[#8E3706] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-[15px] font-bold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
                      >
                        <span>{openMapsLabel}</span>
                        <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
