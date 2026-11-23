import { Globe, Moon, Sun } from 'lucide-react';
import { Language, PageId, UI_COPY } from '../data/bakeryData';
import { BrandLogo } from './BrandLogo';
import { ScrollProgressBar } from './ScrollProgressBar';

interface HeaderProps {
  lang: Language;
  darkMode: boolean;
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
}

const PAGE_ORDER: readonly PageId[] = [
  'home',
  'products',
  'gallery',
  'branches',
  'contact',
];

export function Header({
  lang,
  darkMode,
  activePage,
  onNavigate,
  onToggleLanguage,
  onToggleTheme,
}: HeaderProps) {
  const langActionLabel =
    lang === 'ar'
      ? `${UI_COPY.actions.switchToEn} — الحالية: العربية`
      : `${UI_COPY.actions.switchToAr} — Current: English`;

  const themeActionLabel = darkMode
    ? UI_COPY.actions.switchToLight[lang]
    : UI_COPY.actions.switchToDark[lang];

  const themeStateLabel = darkMode
    ? UI_COPY.actions.themeDarkLabel[lang]
    : UI_COPY.actions.themeLightLabel[lang];

  return (
    <header className="sticky top-0 z-40 border-b border-[#DFD0BE] dark:border-[#3A2D25] bg-[#FBF7F0]/95 dark:bg-[#17120F]/95 backdrop-blur-md transition-colors duration-200">
      <ScrollProgressBar lang={lang} activePage={activePage} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Primary top bar row */}
        <div className="min-h-[76px] sm:min-h-[82px] py-2 flex items-center justify-between gap-3 sm:gap-5">
          {/* Zone 1: Designed Brand Logo linking to Home */}
          <BrandLogo onClick={() => onNavigate('home')} />

          {/* Zone 2: Desktop navigation (>= 44px touch targets, clear high-contrast active tab) */}
          <nav
            aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}
            className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-[#F1E7DA] dark:bg-[#231B16] border border-[#DFCEBC] dark:border-[#3E3028]"
          >
            {PAGE_ORDER.map((pageId) => {
              const isActive = activePage === pageId;
              return (
                <button
                  key={pageId}
                  type="button"
                  onClick={() => onNavigate(pageId)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`min-h-[44px] px-5 rounded-full text-[15px] font-semibold transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3] ${
                    isActive
                      ? 'bg-[#241914] text-[#FFFDF9] dark:bg-[#F6EDE3] dark:text-[#17120F] shadow-xs'
                      : 'text-[#3D2B21] dark:text-[#E6D8CA] hover:text-[#241914] dark:hover:text-[#FFFDF9] hover:bg-[#E6D7C5]/80 dark:hover:bg-[#332720]'
                  }`}
                >
                  {UI_COPY.nav[pageId][lang]}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Language & Theme controls (icon + accessible label + clear visual state, >= 44px) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onToggleLanguage}
              aria-label={langActionLabel}
              title={langActionLabel}
              className="min-h-[44px] px-3 sm:px-3.5 rounded-full inline-flex items-center justify-center gap-1.5 bg-[#F1E7DA] dark:bg-[#251D18] border border-[#D8C6B2] dark:border-[#493A30] text-[#241914] dark:text-[#F6EDE3] hover:bg-[#E7DAC8] dark:hover:bg-[#332720] transition-colors duration-200 text-sm font-bold whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
            >
              <Globe className="w-[18px] h-[18px] shrink-0" strokeWidth={1.9} aria-hidden="true" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={themeActionLabel}
              title={themeActionLabel}
              aria-pressed={darkMode}
              className={`min-h-[44px] px-3 sm:px-3.5 rounded-full inline-flex items-center justify-center gap-1.5 border transition-colors duration-200 text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3] ${
                darkMode
                  ? 'bg-[#2C221C] border-[#5E4A3D] text-[#F6EDE3] hover:bg-[#3A2D25]'
                  : 'bg-[#F1E7DA] border-[#D8C6B2] text-[#241914] hover:bg-[#E7DAC8]'
              }`}
            >
              {darkMode ? (
                <Sun className="w-[18px] h-[18px] shrink-0" strokeWidth={1.9} aria-hidden="true" />
              ) : (
                <Moon className="w-[18px] h-[18px] shrink-0" strokeWidth={1.9} aria-hidden="true" />
              )}
              <span className="hidden sm:inline">{themeStateLabel}</span>
            </button>
          </div>
        </div>

        {/* Mobile navigation strip (>= 44px touch targets, strong inverted active contrast) */}
        <nav
          aria-label={lang === 'ar' ? 'التنقل للجوال' : 'Mobile navigation'}
          className="md:hidden pb-3 -mx-4 px-4 overflow-x-auto no-scrollbar"
        >
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-[#F1E7DA] dark:bg-[#231B16] border border-[#DFCEBC] dark:border-[#3E3028] min-w-full justify-between">
            {PAGE_ORDER.map((pageId) => {
              const isActive = activePage === pageId;
              return (
                <button
                  key={pageId}
                  type="button"
                  onClick={() => onNavigate(pageId)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`min-h-[44px] px-4 rounded-full text-sm font-semibold transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3] ${
                    isActive
                      ? 'bg-[#241914] text-[#FFFDF9] dark:bg-[#F6EDE3] dark:text-[#17120F]'
                      : 'text-[#3D2B21] dark:text-[#E6D8CA]'
                  }`}
                >
                  {UI_COPY.nav[pageId][lang]}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
