import { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
} from 'lucide-react';
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
        className="relative w-full max-w-3xl bg-[#FFFDF9] dark:bg-[#211915] rounded-2xl overflow-hidden border border-[#DFCEBC] dark:border-[#413228] shadow-2xl my-auto"
      >
        {/* Top bar — Product Name Only */}
        <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-[#EFE3D5] dark:border-[#332720]">
          <h3 className="font-display text-lg sm:text-xl font-bold text-[#241914] dark:text-[#F6EDE3]">
            {photo.title[lang]}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={UI_COPY.actions.close[lang]}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-[#F3EAE0] dark:bg-[#2E231D] text-[#241914] dark:text-[#F6EDE3] hover:bg-[#241914] hover:text-[#FFFDF9] dark:hover:bg-[#F6EDE3] dark:hover:text-[#17120F] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Main Image Frame — Uncropped contain on warm uniform background */}
        <div className="relative h-[52vh] min-h-[280px] max-h-[540px] w-full p-3 sm:p-4 bg-[#F2E8DC] dark:bg-[#1B1410]">
          <SmartImage
            src={photo.url}
            alt={photo.title[lang]}
            fit="contain"
            containerClassName="bg-[#F2E8DC] dark:bg-[#1B1410]"
            priority
          />

          {/* Prev / Next circular controls */}
          <button
            type="button"
            onClick={goPrev}
            aria-label={UI_COPY.actions.previous[lang]}
            className="absolute top-1/2 -translate-y-1/2 start-3 w-11 h-11 rounded-full flex items-center justify-center bg-[#FFFDF9]/95 dark:bg-[#1E1713]/95 text-[#241914] dark:text-[#F6EDE3] border border-[#D8C6B2] dark:border-[#4A3A2F] hover:bg-[#241914] hover:text-[#FFFDF9] dark:hover:bg-[#F6EDE3] dark:hover:text-[#17120F] transition-colors cursor-pointer shadow-md"
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
            className="absolute top-1/2 -translate-y-1/2 end-3 w-11 h-11 rounded-full flex items-center justify-center bg-[#FFFDF9]/95 dark:bg-[#1E1713]/95 text-[#241914] dark:text-[#F6EDE3] border border-[#D8C6B2] dark:border-[#4A3A2F] hover:bg-[#241914] hover:text-[#FFFDF9] dark:hover:bg-[#F6EDE3] dark:hover:text-[#17120F] transition-colors cursor-pointer shadow-md"
          >
            {lang === 'ar' ? (
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            ) : (
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Footer actions: Optional Original Post link (ONLY when postUrl exists in data) + Go to Products */}
        <div className="px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-[#EFE3D5] dark:border-[#332720]">
          <div>
            {photo.postUrl && (
              <a
                href={photo.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-[#241914] dark:text-[#F6EDE3] underline decoration-[#8D7463] dark:decoration-[#9C8474] underline-offset-4 hover:decoration-[#241914] dark:hover:decoration-[#F6EDE3] transition-colors rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
              >
                <span>{UI_COPY.actions.originalPost[lang]}</span>
                <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onGoToProducts();
            }}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#A84208] hover:bg-[#8E3706] dark:bg-[#E57A32] dark:hover:bg-[#F08D49] text-[#FFFDF9] dark:text-[#17120F] text-sm sm:text-[15px] font-bold transition-colors duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>{UI_COPY.actions.goToProducts[lang]}</span>
            <DirectionArrow className="w-4 h-4" aria-hidden="true" />
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
                  className={`relative w-14 sm:w-16 aspect-[4/5] rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3] ${
                    isSelected
                      ? 'border-[#241914] dark:border-[#F6EDE3] opacity-100'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <SmartImage
                    src={thumb.url}
                    alt={thumb.title[lang]}
                    fit="contain"
                    containerClassName="bg-[#F2E8DC] dark:bg-[#261D18]"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
