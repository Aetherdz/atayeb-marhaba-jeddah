import { useEffect, useRef, useState } from 'react';
import {
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  X,
} from 'lucide-react';
import {
  BranchFilterTab,
  formatLocalPhoneDisplay,
  formatLocalPhoneToTel,
  getGoogleMapsEmbedUrl,
  getGoogleMapsSearchUrl,
  JEDDAH_BRANCHES,
  JeddahBranch,
  Language,
  UI_COPY,
  WHATSAPP_NUMBER_INTL,
  WHATSAPP_URL,
} from '../data/bakeryData';

interface BranchesViewProps {
  lang: Language;
}

const FILTER_TABS: readonly BranchFilterTab[] = [
  'all',
  'with-phone',
  'with-address',
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
  const [activeTab, setActiveTab] = useState<BranchFilterTab>('all');
  const [selectedId, setSelectedId] = useState<string>(JEDDAH_BRANCHES[0].id);
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(
    JEDDAH_BRANCHES[0].id
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopy = async (key: string, value: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedKey(key);
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => {
        setCopiedKey(null);
      }, 2000);
    } catch {
      // Ignore clipboard errors cleanly
    }
  };

  const normalizedQuery = normalizeSearch(query);

  const visibleBranches = JEDDAH_BRANCHES.filter((branch) => {
    if (activeTab === 'with-phone' && !branch.phone) return false;
    if (activeTab === 'with-address' && !branch.address) return false;
    if (!normalizedQuery) return true;
    const searchable = [
      branch.district.ar,
      branch.district.en,
      branch.road?.ar ?? '',
      branch.road?.en ?? '',
      branch.address ?? '',
      branch.phone ?? '',
    ];
    return searchable.some((part) =>
      normalizeSearch(part).includes(normalizedQuery)
    );
  });

  // Keep desktop spotlight synced with filtered results
  const activeBranch: JeddahBranch | null =
    visibleBranches.find((b) => b.id === selectedId) ??
    visibleBranches[0] ??
    null;

  const handleReset = () => {
    setQuery('');
    setActiveTab('all');
    setSelectedId(JEDDAH_BRANCHES[0].id);
    setMobileOpenId(JEDDAH_BRANCHES[0].id);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header + Unified WhatsApp Strip */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="max-w-2xl space-y-1.5">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#241914] dark:text-[#F6EDE3]">
            {UI_COPY.branches.pageTitle[lang]}
          </h1>
          <p className="text-base sm:text-[17px] leading-relaxed text-[#4A372C] dark:text-[#DFD0C3]">
            {UI_COPY.branches.pageSubtitle[lang]}
          </p>
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[48px] px-4 py-2.5 rounded-xl bg-[#FFFDF9] hover:bg-[#F4ECE1] dark:bg-[#221A16] dark:hover:bg-[#2D221C] border border-[#DFCEBC] dark:border-[#3E3028] inline-flex items-center justify-between sm:justify-start gap-3 transition-colors active:scale-[0.99]"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A372C] dark:text-[#DFD0C3]">
            <MessageCircle
              className="w-4 h-4 text-[#1E7A46] dark:text-[#4AD284] shrink-0"
              aria-hidden="true"
            />
            <span>{UI_COPY.branches.generalWhatsappLabel[lang]}</span>
          </span>
          <bdi
            dir="ltr"
            className="text-sm sm:text-[15px] font-bold text-[#241914] dark:text-[#F6EDE3] tabular-nums"
          >
            {WHATSAPP_NUMBER_INTL}
          </bdi>
        </a>
      </div>

      {/* Compact Single-Row Search & Segment Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 md:max-w-md">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 -translate-y-1/2 start-3.5 w-4 h-4 text-[#4A372C] dark:text-[#DFD0C3]"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={UI_COPY.branches.searchPlaceholder[lang]}
            aria-label={UI_COPY.branches.searchPlaceholder[lang]}
            className="w-full min-h-[46px] ps-10 pe-10 py-2.5 rounded-xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#D8C6B2] dark:border-[#493A30] text-base text-[#241914] dark:text-[#F6EDE3] placeholder:text-[#6B5446] dark:placeholder:text-[#B8A495] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label={UI_COPY.actions.clearSearch[lang]}
              className="absolute top-1/2 -translate-y-1/2 end-1.5 w-9 h-9 rounded-lg flex items-center justify-center text-[#3D2B21] dark:text-[#E5D7CA] hover:bg-[#F1E7DA] dark:hover:bg-[#31261F] cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div
          role="tablist"
          aria-label={UI_COPY.branches.pageTitle[lang]}
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar"
        >
          {FILTER_TABS.map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(tab)}
                className={`min-h-[44px] px-4 rounded-xl text-sm font-semibold border transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.98] ${
                  isSelected
                    ? 'bg-[#241914] border-[#241914] text-[#FFFDF9] dark:bg-[#F6EDE3] dark:border-[#F6EDE3] dark:text-[#17120F]'
                    : 'bg-[#F4ECE1] dark:bg-[#231B16] border-[#DFCEBC] dark:border-[#3E3028] text-[#241914] dark:text-[#F6EDE3] hover:bg-[#EAE0D1] dark:hover:bg-[#31261F]'
                }`}
              >
                {UI_COPY.branches.tabs[tab][lang]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {visibleBranches.length === 0 ? (
        <div className="p-8 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#DFCEBC] dark:border-[#3E3028] text-center space-y-4">
          <p className="text-base font-medium text-[#3D2B21] dark:text-[#E5D7CA]">
            {UI_COPY.branches.noResults[lang]}
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="min-h-[46px] px-6 rounded-xl bg-[#A84208] hover:bg-[#8E3706] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-sm font-bold cursor-pointer"
          >
            {UI_COPY.actions.resetFilters[lang]}
          </button>
        </div>
      ) : (
        <>
          {/* DESKTOP (lg+): Sleek 2-Column Interactive Store Locator (Directory List + Sticky Live Map Card) */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-6 items-start">
            {/* Scrollable Clean Hairline Directory */}
            <div className="lg:col-span-5 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#DFCEBC] dark:border-[#3E3028] overflow-hidden">
              <ul className="divide-y divide-[#EFE3D5] dark:divide-[#332720] max-h-[600px] overflow-y-auto">
                {visibleBranches.map((branch) => {
                  const isActive = activeBranch?.id === branch.id;
                  return (
                    <li key={branch.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(branch.id)}
                        className={`w-full text-start px-5 py-4 flex items-center justify-between gap-3 transition-colors cursor-pointer border-s-4 ${
                          isActive
                            ? 'border-[#A84208] dark:border-[#E57A32] bg-[#FAF2E8] dark:bg-[#2B211B]'
                            : 'border-transparent hover:bg-[#FAF5EE] dark:hover:bg-[#271E19]'
                        }`}
                      >
                        <div className="min-w-0 space-y-1">
                          <div className="font-display text-base font-bold text-[#241914] dark:text-[#F6EDE3] truncate">
                            {branch.district[lang]}
                          </div>
                          {branch.road ? (
                            <div className="text-xs font-medium text-[#6B5446] dark:text-[#BCA899] truncate">
                              {branch.road[lang]}
                            </div>
                          ) : null}
                        </div>

                        {branch.phone ? (
                          <span
                            dir="ltr"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4A372C] dark:text-[#DFD0C3] tabular-nums shrink-0"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#A84208] dark:text-[#E57A32]" aria-hidden="true" />
                            <span>{formatLocalPhoneDisplay(branch.phone)}</span>
                          </span>
                        ) : (
                          <MapPin
                            className={`w-4 h-4 shrink-0 ${
                              isActive
                                ? 'text-[#A84208] dark:text-[#E57A32]'
                                : 'text-[#9C8474] dark:text-[#6E594B]'
                            }`}
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Sticky Live Spotlight Card for the Selected Branch */}
            {activeBranch && (
              <div className="lg:col-span-7 sticky top-24 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#DFCEBC] dark:border-[#3E3028] overflow-hidden">
                {/* Embedded Live Google Map */}
                <div className="bg-[#F2E8DC] dark:bg-[#261D18] border-b border-[#EFE3D5] dark:border-[#332720]">
                  <iframe
                    key={activeBranch.id}
                    title={`${UI_COPY.branches.mapTitlePrefix[lang]} ${activeBranch.district[lang]}`}
                    src={getGoogleMapsEmbedUrl(activeBranch)}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-[330px] block border-0"
                  />
                </div>

                {/* Selected Branch Clean Details + Single Action Row (Zero Repetition) */}
                <div className="p-6 space-y-5">
                  <div className="space-y-1.5">
                    <h2 className="font-display text-2xl font-bold text-[#241914] dark:text-[#F6EDE3]">
                      {activeBranch.district[lang]}
                      {activeBranch.road && (
                        <span className="text-base font-medium text-[#5A4437] dark:text-[#CBB9AA]">
                          {' '}· {activeBranch.road[lang]}
                        </span>
                      )}
                    </h2>

                    {activeBranch.address && (
                      <p className="text-sm font-medium text-[#4A372C] dark:text-[#DFD0C3]">
                        <bdi
                          dir="ltr"
                          className="inline-block [unicode-bidi:isolate] text-left"
                        >
                          {activeBranch.address}
                        </bdi>
                      </p>
                    )}

                    {activeBranch.phone && (
                      <div className="pt-1 flex items-center gap-2 text-sm text-[#4A372C] dark:text-[#DFD0C3]">
                        <span>{UI_COPY.branches.directPhoneLabel[lang]}:</span>
                        <bdi
                          dir="ltr"
                          className="font-bold text-base text-[#241914] dark:text-[#F6EDE3] tabular-nums"
                        >
                          {formatLocalPhoneDisplay(activeBranch.phone)}
                        </bdi>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a
                      href={getGoogleMapsSearchUrl(activeBranch)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[46px] px-5 rounded-xl inline-flex items-center justify-center gap-2 bg-[#A84208] hover:bg-[#8E3706] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-sm font-bold transition-colors active:scale-[0.98]"
                    >
                      <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{UI_COPY.actions.openInMaps[lang]}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    </a>

                    {activeBranch.phone && (
                      <a
                        href={formatLocalPhoneToTel(activeBranch.phone)}
                        className="min-h-[46px] px-5 rounded-xl inline-flex items-center justify-center gap-2 bg-[#F4ECE1] hover:bg-[#EAE0D1] dark:bg-[#2D221C] dark:hover:bg-[#382B23] border border-[#D8C6B2] dark:border-[#4A3A2F] text-[#241914] dark:text-[#F6EDE3] text-sm font-semibold transition-colors active:scale-[0.98]"
                      >
                        <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{UI_COPY.actions.callBranch[lang]}</span>
                      </a>
                    )}

                    {(activeBranch.address || activeBranch.phone) && (
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            activeBranch.id,
                            activeBranch.address ?? activeBranch.phone ?? ''
                          )
                        }
                        className="min-h-[46px] px-4 rounded-xl inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#F4ECE1] dark:hover:bg-[#2D221C] border border-[#DFCEBC] dark:border-[#3E3028] text-[#3D2B21] dark:text-[#E5D7CA] text-sm font-semibold transition-colors cursor-pointer active:scale-[0.98]"
                      >
                        {copiedKey === activeBranch.id ? (
                          <>
                            <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                            <span>{UI_COPY.actions.copied[lang]}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
                            <span>
                              {activeBranch.address
                                ? UI_COPY.actions.copyAddress[lang]
                                : UI_COPY.actions.copyPhone[lang]}
                            </span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* MOBILE & TABLET (< lg): Sleek Compact Accordion Directory (One-tap Call + Single Expandable Map) */}
          <div className="lg:hidden rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#DFCEBC] dark:border-[#3E3028] divide-y divide-[#EFE3D5] dark:divide-[#332720] overflow-hidden">
            {visibleBranches.map((branch) => {
              const isOpen = mobileOpenId === branch.id;
              const panelId = `mobile-branch-${branch.id}`;
              return (
                <div key={branch.id}>
                  <div className="flex items-center justify-between gap-2 px-4 py-3.5">
                    <button
                      type="button"
                      onClick={() =>
                        setMobileOpenId(isOpen ? null : branch.id)
                      }
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex-1 min-w-0 text-start flex items-center justify-between gap-3 py-0.5 cursor-pointer"
                    >
                      <div className="min-w-0 space-y-0.5">
                        <h2 className="font-display text-base font-bold text-[#241914] dark:text-[#F6EDE3] truncate">
                          {branch.district[lang]}
                        </h2>
                        <p className="text-xs font-medium text-[#5A4437] dark:text-[#CBB9AA] truncate">
                          {branch.phone ? (
                            <bdi dir="ltr" className="tabular-nums">
                              {formatLocalPhoneDisplay(branch.phone)}
                            </bdi>
                          ) : (
                            branch.road?.[lang]
                          )}
                        </p>
                      </div>

                      <ChevronDown
                        className={`w-4 h-4 shrink-0 text-[#5A4437] dark:text-[#CBB9AA] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {branch.phone && (
                      <a
                        href={formatLocalPhoneToTel(branch.phone)}
                        aria-label={`${UI_COPY.actions.callBranch[lang]} — ${branch.district[lang]}`}
                        className="w-10 h-10 rounded-xl bg-[#F4ECE1] hover:bg-[#EAE0D1] dark:bg-[#2D221C] dark:hover:bg-[#382B23] border border-[#DFCEBC] dark:border-[#413228] flex items-center justify-center text-[#A84208] dark:text-[#E57A32] shrink-0 active:scale-[0.96]"
                      >
                        <Phone className="w-4 h-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>

                  {isOpen && (
                    <div
                      id={panelId}
                      className="px-4 pb-4 pt-1 bg-[#FAF4EC] dark:bg-[#1B1410] space-y-3 border-t border-[#EFE3D5] dark:border-[#332720]"
                    >
                      {branch.address && (
                        <p className="text-xs font-medium text-[#4A372C] dark:text-[#DFD0C3] pt-2 leading-relaxed">
                          <bdi
                            dir="ltr"
                            className="inline-block [unicode-bidi:isolate] text-left"
                          >
                            {branch.address}
                          </bdi>
                        </p>
                      )}

                      <div className="overflow-hidden rounded-xl border border-[#DFCEBC] dark:border-[#3E3028] bg-[#F2E8DC] dark:bg-[#261D18]">
                        <iframe
                          title={`${UI_COPY.branches.mapTitlePrefix[lang]} ${branch.district[lang]}`}
                          src={getGoogleMapsEmbedUrl(branch)}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="w-full h-[210px] block border-0"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <a
                          href={getGoogleMapsSearchUrl(branch)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`min-h-[44px] px-3.5 rounded-xl inline-flex items-center justify-center gap-1.5 bg-[#A84208] hover:bg-[#8E3706] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-sm font-bold active:scale-[0.98] ${
                            !branch.address && !branch.phone ? 'col-span-2' : ''
                          }`}
                        >
                          <span>{UI_COPY.actions.openInMaps[lang]}</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        </a>

                        {(branch.address || branch.phone) && (
                          <button
                            type="button"
                            onClick={() =>
                              handleCopy(
                                branch.id,
                                branch.address ?? branch.phone ?? ''
                              )
                            }
                            className="min-h-[44px] px-3.5 rounded-xl inline-flex items-center justify-center gap-1.5 bg-[#FFFDF9] dark:bg-[#261D18] border border-[#D8C6B2] dark:border-[#493A30] text-[#241914] dark:text-[#F6EDE3] text-sm font-semibold cursor-pointer active:scale-[0.98]"
                          >
                            {copiedKey === branch.id ? (
                              <>
                                <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                                <span>{UI_COPY.actions.copied[lang]}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
                                <span>
                                  {branch.address
                                    ? UI_COPY.actions.copyAddress[lang]
                                    : UI_COPY.actions.copyPhone[lang]}
                                </span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
