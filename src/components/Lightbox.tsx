import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { BakeryPhoto, Language, UI_COPY } from '../data/bakeryData';
import { SmartImage } from './SmartImage';

interface LightboxProps {
  photos: readonly BakeryPhoto[];
  currentIndex: number | null;
  lang: Language;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  onGoToProducts: () => void;
}

export function Lightbox({
  photos,
  currentIndex,
  lang,
  onClose,
  onNavigate,
  onGoToProducts,
}: LightboxProps) {
  const isOpen = currentIndex !== null;

  useEffect(() => {
    if (!isOpen || currentIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight') {
        const delta = lang === 'ar' ? -1 : 1;
        onNavigate((currentIndex + delta + photos.length) % photos.length);
      } else if (event.key === 'ArrowLeft') {
        const delta = lang === 'ar' ? 1 : -1;
        onNavigate((currentIndex + delta + photos.length) % photos.length);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, lang, photos.length, onClose, onNavigate]);

  if (currentIndex === null) return null;

  const photo = photos[currentIndex];
  const goPrev = () =>
    onNavigate((currentIndex - 1 + photos.length) % photos.length);
  const goNext = () => onNavigate((currentIndex + 1) % photos.length);
  const DirectionArrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.title[lang]}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#120D0A]/88 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#FFFDF9] dark:bg-[#211915] rounded-2xl overflow-hidden border border-[#E5D7C6] dark:border-[#3A2D25] shadow-2xl my-auto"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-[#EFE3D5] dark:border-[#332720]">
          <h3 className="font-display text-base sm:text-lg font-bold text-[#241914] dark:text-[#F6EDE3]">
            {photo.title[lang]}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={UI_COPY.actions.close[lang]}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-[#F3EAE0] dark:bg-[#2E231D] text-[#3B2A21] dark:text-[#EFE4D8] hover:bg-[#C85A17] hover:text-white dark:hover:bg-[#E57A32] dark:hover:text-[#17120F] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Main Image Frame */}
        <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full bg-[#EFE5D8] dark:bg-[#191310]">
          <SmartImage src={photo.url} alt={photo.title[lang]} priority />

          {/* Prev / Next circular controls */}
          <button
            type="button"
            onClick={goPrev}
            aria-label={UI_COPY.actions.previous[lang]}
            className="absolute top-1/2 -translate-y-1/2 start-3 w-10 h-10 rounded-full flex items-center justify-center bg-[#FFFDF9]/90 dark:bg-[#1E1713]/90 text-[#241914] dark:text-[#F6EDE3] border border-[#E4D5C3]/80 dark:border-[#3E3028] hover:bg-[#C85A17] hover:text-white dark:hover:bg-[#E57A32] dark:hover:text-[#17120F] transition-colors cursor-pointer shadow-md"
          >
            {lang === 'ar' ? (
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            ) : (
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label={UI_COPY.actions.next[lang]}
            className="absolute top-1/2 -translate-y-1/2 end-3 w-10 h-10 rounded-full flex items-center justify-center bg-[#FFFDF9]/90 dark:bg-[#1E1713]/90 text-[#241914] dark:text-[#F6EDE3] border border-[#E4D5C3]/80 dark:border-[#3E3028] hover:bg-[#C85A17] hover:text-white dark:hover:bg-[#E57A32] dark:hover:text-[#17120F] transition-colors cursor-pointer shadow-md"
          >
            {lang === 'ar' ? (
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            ) : (
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Caption + In-site Go to Products button */}
        <div className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EFE3D5] dark:border-[#332720]">
          <p className="text-sm text-[#5C473B] dark:text-[#CDBBAE] leading-relaxed">
            {photo.caption[lang]}
          </p>
          <button
            type="button"
            onClick={() => {
              onClose();
              onGoToProducts();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C85A17] hover:bg-[#AD4B11] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer"
          >
            <span>{UI_COPY.actions.goToProducts[lang]}</span>
            <DirectionArrow className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        {/* Thumbnail Strip */}
        <div className="px-4 py-3 bg-[#F7F0E6] dark:bg-[#1A1310] overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2.5">
            {photos.map((thumb, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={thumb.id}
                  type="button"
                  onClick={() => onNavigate(idx)}
                  aria-label={thumb.title[lang]}
                  aria-current={isSelected ? 'true' : undefined}
                  className={`relative w-16 sm:w-20 aspect-[4/3] rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C85A17] ${
                    isSelected
                      ? 'border-[#C85A17] dark:border-[#E57A32] opacity-100'
                      : 'border-transparent opacity-65 hover:opacity-100'
                  }`}
                >
                  <SmartImage src={thumb.url} alt={thumb.title[lang]} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
