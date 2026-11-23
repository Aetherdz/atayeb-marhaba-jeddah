import { useEffect, useState } from 'react';
import { Language, PageId } from '../data/bakeryData';

interface ScrollProgressBarProps {
  lang: Language;
  activePage: PageId;
}

export function ScrollProgressBar({ lang, activePage }: ScrollProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setProgress(0);
      return;
    }

    let rafId = 0;

    const calculateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const ratio = Math.min(1, Math.max(0, scrollTop / docHeight));
      setProgress(ratio);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        calculateProgress();
        rafId = 0;
      });
    };

    calculateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reducedMotion, activePage]);

  if (reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-transparent overflow-hidden"
    >
      <div
        className={`h-full w-full bg-[#C85A17] dark:bg-[#E57A32] will-change-transform ${
          lang === 'ar' ? 'origin-right' : 'origin-left'
        }`}
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
