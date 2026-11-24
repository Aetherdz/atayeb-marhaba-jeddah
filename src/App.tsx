import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BranchesView } from './components/BranchesView';
import { ContactView } from './components/ContactView';
import { Footer } from './components/Footer';
import { GalleryView } from './components/GalleryView';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { Lightbox } from './components/Lightbox';
import { ProductsView } from './components/ProductsView';
import {
  Language,
  PageId,
  PHOTOS,
  ProductCategory,
  UI_COPY,
} from './data/bakeryData';

const VALID_PAGES: readonly PageId[] = [
  'home',
  'products',
  'gallery',
  'branches',
  'contact',
];

function getInitialPage(): PageId {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '') as PageId;
  return VALID_PAGES.includes(hash) ? hash : 'home';
}

function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const saved = window.localStorage.getItem('atayeb_theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
  } catch {
    // Ignore storage access errors in restricted iframe environments
  }
  return false;
}

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [darkMode, setDarkMode] = useState<boolean>(getInitialTheme);
  const [activePage, setActivePage] = useState<PageId>(getInitialPage);
  const [productCategory, setProductCategory] =
    useState<ProductCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Sync HTML dir, lang, and document title when language switches
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = UI_COPY.brandFull[lang];
  }, [lang]);

  // Sync Tailwind dark class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    try {
      window.localStorage.setItem('atayeb_theme', darkMode ? 'dark' : 'light');
    } catch {
      // Ignore storage access errors
    }
  }, [darkMode]);

  // Keep in-site pages synced with browser hash history
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (VALID_PAGES.includes(hash)) {
        setActivePage(hash);
      } else if (!hash) {
        setActivePage('home');
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigate = (
    page: PageId,
    nextProductCategory?: ProductCategory
  ) => {
    if (page === 'products' && nextProductCategory) {
      setProductCategory(nextProductCategory);
    } else if (page === 'products' && !nextProductCategory) {
      setProductCategory('all');
    }
    setActivePage(page);
    if (window.location.hash !== `#${page}`) {
      window.history.pushState(null, '', `#${page}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleToggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7F0] text-[#241914] dark:bg-[#17120F] dark:text-[#F6EDE3] transition-colors duration-200 pb-[74px] md:pb-0">
      <Header
        lang={lang}
        darkMode={darkMode}
        activePage={activePage}
        onNavigate={(page) => handleNavigate(page)}
        onToggleLanguage={handleToggleLanguage}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-5 pb-10 sm:py-10 lg:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activePage}-${lang}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {activePage === 'home' && (
              <HomeView
                lang={lang}
                onNavigate={handleNavigate}
                onOpenLightbox={setLightboxIndex}
              />
            )}
            {activePage === 'products' && (
              <ProductsView
                lang={lang}
                initialCategory={productCategory}
                onOpenLightbox={setLightboxIndex}
              />
            )}
            {activePage === 'gallery' && (
              <GalleryView lang={lang} onOpenLightbox={setLightboxIndex} />
            )}
            {activePage === 'branches' && <BranchesView lang={lang} />}
            {activePage === 'contact' && (
              <ContactView
                lang={lang}
                onNavigate={(page) => handleNavigate(page)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer lang={lang} />

      <Lightbox
        photos={PHOTOS}
        currentIndex={lightboxIndex}
        lang={lang}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
        onGoToProducts={() => handleNavigate('products', 'all')}
      />
    </div>
  );
}
