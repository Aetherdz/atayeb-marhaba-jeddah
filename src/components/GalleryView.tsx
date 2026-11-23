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
    <div className="space-y-10">
      <div className="space-y-6">
        <div className="max-w-2xl space-y-2.5">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#241914] dark:text-[#F6EDE3]">
            {UI_COPY.gallery.pageTitle[lang]}
          </h1>
          <p className="text-sm sm:text-base leading-relaxed text-[#6B5446] dark:text-[#BFA99A]">
            {UI_COPY.gallery.pageSubtitle[lang]}
          </p>
        </div>

        {/* Quick gallery filter tabs */}
        <div
          role="tablist"
          aria-label={UI_COPY.gallery.pageTitle[lang]}
          className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-[#F1E7DA] dark:bg-[#231B16] border border-[#E5D7C6] dark:border-[#362A22]"
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
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3] ${
                  isSelected
                    ? 'bg-[#2C1C14] text-[#FFFDF9] dark:bg-[#F4EAE0] dark:text-[#17120F]'
                    : 'text-[#5C473B] dark:text-[#CDBBAE] hover:text-[#241914] dark:hover:text-[#F6EDE3]'
                }`}
              >
                {UI_COPY.gallery.filters[category][lang]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePhotos.map(({ photo, originalIndex }) => (
          <figure
            key={photo.id}
            className="group rounded-2xl overflow-hidden bg-[#FFFDF9] dark:bg-[#221A16] border border-[#E6D8C8] dark:border-[#362A22] flex flex-col"
          >
            <button
              type="button"
              onClick={() => onOpenLightbox(originalIndex)}
              aria-label={photo.title[lang]}
              className="relative aspect-[4/3] w-full overflow-hidden block cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#241914] dark:focus-visible:outline-[#F6EDE3]"
            >
              <SmartImage
                src={photo.url}
                alt={photo.title[lang]}
                className="transition-transform duration-400 ease-out group-hover:scale-[1.035]"
              />
              <span className="pointer-events-none absolute top-3 end-3 w-9 h-9 rounded-full flex items-center justify-center bg-[#160F0B]/55 text-[#FFFDF9] opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-xs">
                <Expand className="w-4 h-4" aria-hidden="true" />
              </span>
            </button>

            <figcaption className="p-4 sm:p-5 space-y-1">
              <h2 className="font-display text-base sm:text-lg font-bold text-[#241914] dark:text-[#F6EDE3]">
                {photo.title[lang]}
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-[#6B5446] dark:text-[#BFA99A]">
                {photo.caption[lang]}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
