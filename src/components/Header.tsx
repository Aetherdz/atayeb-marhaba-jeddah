import { Moon, Sun } from 'lucide-react';
import { Language, PageId, UI_COPY } from '../data/bakeryData';
import { BrandLogo } from './BrandLogo';

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
  return (
    <header className="sticky top-0 z-40 border-b border-[#E6D8C8]/90 dark:border-[#342821] bg-[#FBF7F0]/92 dark:bg-[#17120F]/92 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Primary top bar row */}
        <div className="h-[68px] sm:h-[74px] flex items-center justify-between gap-4">
          {/* Zone 1: Designed Brand Logo linking to Home */}
          <BrandLogo onClick={() => onNavigate('home')} />

          {/* Zone 2: Desktop pill-shaped navigation */}
          <nav
            aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}
            className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[#F1E7DA] dark:bg-[#231B16] border border-[#E5D7C6] dark:border-[#362A22]"
          >
            {PAGE_ORDER.map((pageId) => {
              const isActive = activePage === pageId;
              return (
                <button
                  key={pageId}
                  type="button"
                  onClick={() => onNavigate(pageId)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C85A17] dark:focus-visible:outline-[#E57A32] ${
                    isActive
                      ? 'bg-[#C85A17] text-[#FFFDF9] dark:bg-[#E57A32] dark:text-[#17120F] shadow-xs'
                      : 'text-[#5C473B] dark:text-[#CDBBAE] hover:text-[#241914] dark:hover:text-[#F6EDE3] hover:bg-[#E8DBCA]/60 dark:hover:bg-[#31261F]'
                  }`}
                >
                  {UI_COPY.nav[pageId][lang]}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Compact circular icon buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onToggleLanguage}
              aria-label={
                lang === 'ar' ? UI_COPY.actions.switchToEn : UI_COPY.actions.switchToAr
              }
              title={
                lang === 'ar' ? UI_COPY.actions.switchToEn : UI_COPY.actions.switchToAr
              }
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F1E7DA] dark:bg-[#241C17] border border-[#E4D5C3] dark:border-[#3A2D25] text-[#3B2A21] dark:text-[#F2E7DC] hover:border-[#C85A17] dark:hover:border-[#E57A32] hover:text-[#C85A17] dark:hover:text-[#E57A32] transition-colors duration-200 text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C85A17] dark:focus-visible:outline-[#E57A32]"
            >
              {lang === 'ar' ? 'EN' : 'ع'}
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={UI_COPY.actions.toggleTheme[lang]}
              title={UI_COPY.actions.toggleTheme[lang]}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F1E7DA] dark:bg-[#241C17] border border-[#E4D5C3] dark:border-[#3A2D25] text-[#3B2A21] dark:text-[#F2E7DC] hover:border-[#C85A17] dark:hover:border-[#E57A32] hover:text-[#C85A17] dark:hover:text-[#E57A32] transition-colors duration-200 shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C85A17] dark:focus-visible:outline-[#E57A32]"
            >
              {darkMode ? (
                <Sun className="w-[18px] h-[18px]" strokeWidth={1.9} aria-hidden="true" />
              ) : (
                <Moon className="w-[18px] h-[18px]" strokeWidth={1.9} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile pill navigation strip (compact, single-line scrollable) */}
        <nav
          aria-label={lang === 'ar' ? 'التنقل للجوال' : 'Mobile navigation'}
          className="md:hidden pb-2.5 -mx-4 px-4 overflow-x-auto no-scrollbar"
        >
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#F1E7DA] dark:bg-[#231B16] border border-[#E5D7C6] dark:border-[#362A22] min-w-full justify-between">
            {PAGE_ORDER.map((pageId) => {
              const isActive = activePage === pageId;
              return (
                <button
                  key={pageId}
                  type="button"
                  onClick={() => onNavigate(pageId)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#C85A17] text-[#FFFDF9] dark:bg-[#E57A32] dark:text-[#17120F]'
                      : 'text-[#5C473B] dark:text-[#CDBBAE]'
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
