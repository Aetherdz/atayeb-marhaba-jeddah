import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { BakeryPhoto, Language, UI_COPY } from '../data/bakeryData';
import { SmartImage } from './SmartImage';

interface LightboxProps {
  photos: readonly BakeryPhoto[];
  currentIndex: number | null;
  lang: Language;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export function Lightbox({
  photos,
  currentIndex,
  lang,
  onClose,
  onNavigate,
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.title[lang]}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#120D0A]/88 backdrop-blur-sm p-4 sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#FFFDF9] dark:bg-[#211915] rounded-2xl overflow-hidden border border-[#E5D7C6] dark:border-[#3A2D25] shadow-2xl"
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

        {/* Image frame */}
        <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full bg-[#EFE5D8] dark:bg-[#191310]">
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

        {/* Caption */}
        <div className="px-5 py-4 text-sm sm:text-base text-[#5C473B] dark:text-[#CDBBAE]">
          {photo.caption[lang]}
        </div>
      </div>
    </div>
  );
}
