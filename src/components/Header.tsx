import {
  Croissant,
  Globe,
  Home,
  Images,
  MapPin,
  MessageCircle,
  Moon,
  Sun,
} from 'lucide-react';
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

const PAGE_ITEMS: readonly {
  id: PageId;
  Icon: typeof Home;
}[] = [
  { id: 'home', Icon: Home },
  { id: 'products', Icon: Croissant },
  { id: 'gallery', Icon: Images },
  { id: 'branches', Icon: MapPin },
  { id: 'contact', Icon: MessageCircle },
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
    <>
      {/* Top Bar: Static on mobile to preserve 15% sticky cap; sticky on md+ desktop */}
      <header className="relative md:sticky md:top-0 z-40 border-b border-[#E5D7C6] dark:border-[#342821] bg-[#FBF7F0]/95 dark:bg-[#17120F]/95 md:backdrop-blur-md transition-colors duration-200">
        <ScrollProgressBar lang={lang} activePage={activePage} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-[68px] md:h-[78px] flex items-center justify-between gap-2 sm:gap-6">
            {/* Zone 1: Designed Brand Logo linking to Home */}
            <BrandLogo onClick={() => onNavigate('home')} />

            {/* Zone 2: Clean open-air desktop navigation (no pill-inside-pill island, strong inverted active tab) */}
            <nav
              aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}
              className="hidden md:flex items-center gap-1.5 lg:gap-2"
            >
              {PAGE_ITEMS.map(({ id }) => {
                const isActive = activePage === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onNavigate(id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`min-h-[44px] px-4 lg:px-5 rounded-xl text-[15px] font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3] ${
                      isActive
                        ? 'bg-[#241914] text-[#FFFDF9] dark:bg-[#F6EDE3] dark:text-[#17120F]'
                        : 'text-[#3D2B21] dark:text-[#E6D8CA] hover:text-[#241914] dark:hover:text-[#FFFDF9] hover:bg-[#EFE5D8] dark:hover:bg-[#2A201B]'
                    }`}
                  >
                    {UI_COPY.nav[id][lang]}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Language & Theme controls (icon + accessible label + clear visual state, >= 44px, fits 360px cleanly) */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={onToggleLanguage}
                aria-label={langActionLabel}
                title={langActionLabel}
                className="min-h-[44px] px-2.5 sm:px-3.5 rounded-xl inline-flex items-center justify-center gap-1.5 bg-[#F2E8DC] dark:bg-[#251D18] border border-[#D8C6B2] dark:border-[#493A30] text-[#241914] dark:text-[#F6EDE3] hover:bg-[#E7DAC8] dark:hover:bg-[#332720] transition-colors duration-150 text-sm font-bold whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
              >
                <Globe className="w-[17px] h-[17px] shrink-0" strokeWidth={1.9} aria-hidden="true" />
                <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
              </button>

              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={themeActionLabel}
                title={themeActionLabel}
                aria-pressed={darkMode}
                className={`min-h-[44px] min-w-[44px] px-2.5 sm:px-3.5 rounded-xl inline-flex items-center justify-center gap-1.5 border transition-colors duration-150 text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3] ${
                  darkMode
                    ? 'bg-[#2C221C] border-[#5E4A3D] text-[#F6EDE3] hover:bg-[#3A2D25]'
                    : 'bg-[#F2E8DC] border-[#D8C6B2] text-[#241914] hover:bg-[#E7DAC8]'
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
        </div>
      </header>

      {/* Mobile Fixed Thumb-Zone Bottom Navigation Bar (All 5 pages visible at 360px, <10% viewport height) */}
      <nav
        aria-label={lang === 'ar' ? 'التنقل للجوال' : 'Mobile navigation'}
        className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[#DFCEBC] dark:border-[#3A2D25] bg-[#FBF7F0]/96 dark:bg-[#17120F]/96 backdrop-blur-md pb-safe"
      >
        <div className="grid grid-cols-5 items-stretch px-1.5 py-1.5 gap-1">
          {PAGE_ITEMS.map(({ id, Icon }) => {
            const isActive = activePage === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(id)}
                aria-current={isActive ? 'page' : undefined}
                className={`min-h-[50px] px-1 py-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors duration-150 cursor-pointer active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3] ${
                  isActive
                    ? 'bg-[#241914] text-[#FFFDF9] dark:bg-[#F6EDE3] dark:text-[#17120F]'
                    : 'text-[#4A372C] dark:text-[#DFD0C3] hover:bg-[#EFE5D8] dark:hover:bg-[#261D18]'
                }`}
              >
                <Icon
                  className="w-[19px] h-[19px] shrink-0"
                  strokeWidth={isActive ? 2.2 : 1.85}
                  aria-hidden="true"
                />
                <span className="text-[11px] font-bold leading-none whitespace-nowrap truncate max-w-full">
                  {UI_COPY.nav[id][lang]}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
