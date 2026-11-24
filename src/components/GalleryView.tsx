import { useState } from 'react';
import { Expand } from 'lucide-react';
import {
  GalleryCategory,
  Language,
  PHOTOS,
  UI_COPY,
} from '../data/bakeryData';
import { SmartImage } from './SmartImage';

interface GalleryViewProps {
  lang: Language;
  onOpenLightbox: (photoIndex: number) => void;
}

const GALLERY_CATEGORIES: readonly GalleryCategory[] = [
  'all',
  'savory',
  'sweets',
];

export function GalleryView({ lang, onOpenLightbox }: GalleryViewProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<GalleryCategory>('all');

  const visiblePhotos = PHOTOS.map((photo, originalIndex) => ({
    photo,
    originalIndex,
  })).filter(
    ({ photo }) =>
      selectedCategory === 'all' || photo.category === selectedCategory
  );

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="space-y-5">
        <div className="max-w-2xl space-y-2">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#241914] dark:text-[#F6EDE3]">
            {UI_COPY.gallery.pageTitle[lang]}
          </h1>
          <p className="text-base sm:text-[17px] leading-relaxed text-[#4A372C] dark:text-[#DFD0C3]">
            {UI_COPY.gallery.pageSubtitle[lang]}
          </p>
        </div>

        {/* Quick gallery filter tabs */}
        <div
          role="tablist"
          aria-label={UI_COPY.gallery.pageTitle[lang]}
          className="flex overflow-x-auto no-scrollbar items-center gap-2 -mx-4 px-4 pb-1 sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap"
        >
          {GALLERY_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(category)}
                className={`min-h-[44px] px-4 rounded-xl text-sm sm:text-[15px] font-semibold border transition-colors duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3] ${
                  isSelected
                    ? 'bg-[#241914] border-[#241914] text-[#FFFDF9] dark:bg-[#F6EDE3] dark:border-[#F6EDE3] dark:text-[#17120F]'
                    : 'bg-[#F4ECE1] dark:bg-[#231B16] border-[#DFCEBC] dark:border-[#3E3028] text-[#241914] dark:text-[#F6EDE3] hover:bg-[#EAE0D1] dark:hover:bg-[#31261F]'
                }`}
              >
                {UI_COPY.gallery.filters[category][lang]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Framed uncropped Instagram posters — natural 4:5 contain framing, zero text underneath */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {visiblePhotos.map(({ photo, originalIndex }) => (
          <div
            key={photo.id}
            className="group rounded-2xl overflow-hidden bg-[#F2E8DC] dark:bg-[#261D18] border border-[#DFCEBC] dark:border-[#3E3028]"
          >
            <button
              type="button"
              onClick={() => onOpenLightbox(originalIndex)}
              aria-label={photo.title[lang]}
              className="relative aspect-[4/5] w-full p-2.5 sm:p-3.5 overflow-hidden block cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
            >
              <SmartImage
                src={photo.url}
                alt={photo.title[lang]}
                fit="contain"
                containerClassName="bg-[#F2E8DC] dark:bg-[#261D18] rounded-xl"
                className="transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              />
              <span className="pointer-events-none absolute top-4 end-4 w-10 h-10 rounded-xl flex items-center justify-center bg-[#160F0B]/70 text-[#FFFDF9] opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-xs">
                <Expand className="w-4 h-4" aria-hidden="true" />
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
