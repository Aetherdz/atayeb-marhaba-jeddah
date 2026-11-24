import { useEffect, useRef, useState } from 'react';
import { Croissant } from 'lucide-react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fit?: 'cover' | 'contain';
  priority?: boolean;
  showSkeleton?: boolean;
}

function normalizeImageUrl(rawUrl: string): string {
  const match = rawUrl.match(/instagram\.com\/p\/([^/]+)\/media\/\?size=l/i);
  if (match && !rawUrl.startsWith('https://images.weserv.nl/')) {
    return `https://images.weserv.nl/?url=www.instagram.com/p/${match[1]}/media/?size=l&output=jpg`;
  }
  return rawUrl;
}

export function SmartImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  fit = 'cover',
  priority = false,
  showSkeleton = true,
}: SmartImageProps) {
  const resolvedSrc = normalizeImageUrl(src);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [resolvedSrc]);

  const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-[#F2E8DC] dark:bg-[#261D18] ${containerClassName}`}
    >
      {showSkeleton && !loaded && !failed && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 skeleton-shimmer"
        />
      )}

      {!failed ? (
        <img
          ref={imgRef}
          src={resolvedSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`w-full h-full ${fitClass} transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center bg-gradient-to-br from-[#F3E7D8] via-[#EADAC7] to-[#DFC8B0] dark:from-[#2A201A] dark:via-[#221914] dark:to-[#1B1410]">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#C85A17]/15 text-[#9B4310] dark:bg-[#E57A32]/20 dark:text-[#E57A32]">
            <Croissant className="w-6 h-6" strokeWidth={1.75} aria-hidden="true" />
          </div>
          <span className="font-display text-sm font-semibold text-[#2C1E17] dark:text-[#F4EAE0]">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
}
