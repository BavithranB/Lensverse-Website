'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryItem } from '@/lib/content';

interface GalleryProps {
  items: GalleryItem[];
  filters: string[];
}

export default function Gallery({ items, filters }: GalleryProps) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState(12);

  // Filtered list (based on selectedFilter)
  const filteredItems =
    selectedFilter === 'All'
      ? items
      : items.filter((item) => item.category === selectedFilter);

  // Items actually being rendered on the page
  const displayedItems = filteredItems.slice(0, displayCount);
  const hasMore = displayedItems.length < filteredItems.length;

  // Open lightbox for the item shown at displayed index
  const openLightbox = (indexInDisplayed: number) => {
    setLightboxIndex(indexInDisplayed);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  // navigate next/prev within displayed items
  const nextItem = () => {
    setLightboxIndex((prev) => (prev + 1) % displayedItems.length);
  };
  const prevItem = () => {
    setLightboxIndex((prev) =>
      (prev - 1 + displayedItems.length) % displayedItems.length
    );
  };

  // keyboard handlers for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') nextItem();
      else if (e.key === 'ArrowLeft') prevItem();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, displayedItems.length]);

  // If page was opened with a hash like #gallery-item-3, scroll to it
  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    if (hash) {
      // small timeout to ensure DOM is rendered
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 350);
    }
  }, []);

  const currentLightboxItem = displayedItems[lightboxIndex];

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setSelectedFilter(filter);
              setDisplayCount(12);
            }}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              selectedFilter === filter
                ? 'bg-charcoal-900 text-offwhite'
                : 'bg-charcoal-100 text-charcoal-700 hover:bg-charcoal-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayedItems.map((item, indexInDisplayed) => {
          // stable index relative to the entire filteredItems array
          const globalIndex = filteredItems.findIndex((i) => i === item);
          // fallback if findIndex somehow fails (defensive)
          const safeGlobalIndex = globalIndex >= 0 ? globalIndex : indexInDisplayed;

          return (
            <motion.div
              key={safeGlobalIndex}
              id={`gallery-item-${safeGlobalIndex}`} // stable id for linking
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: indexInDisplayed * 0.05 }}
              className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer group bg-charcoal-800"
              onClick={() => openLightbox(indexInDisplayed)}
            >
              {item.type === 'image' || item.src.endsWith('.svg') ? (
                <div className="relative w-full h-full">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      // Show fallback UI
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-charcoal-700">
                            <div class="text-center p-4">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                              <p class="text-sm text-gray-300">Image not found</p>
                              <p class="text-xs text-gray-400 mt-1">${item.title}</p>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-charcoal-800">
                  <video
                    src={item.src}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                  />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform">
                <h3 className="text-offwhite font-semibold mb-1">{item.title}</h3>
                <p className="text-offwhite/70 text-sm">{item.category}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="text-center mt-12">
          <button
            onClick={() => setDisplayCount((prev) => prev + 12)}
            className="px-8 py-4 bg-charcoal-900 text-offwhite rounded-full font-semibold hover:bg-charcoal-800 hover:scale-105 transition-transform"
          >
            Load More
          </button>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && currentLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal-900/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 p-2 bg-charcoal-800 text-offwhite rounded-full hover:bg-charcoal-700 transition-colors"
                aria-label="Close lightbox"
              >
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {displayedItems.length > 1 && (
                <>
                  <button
                    onClick={prevItem}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-charcoal-800 text-offwhite rounded-full hover:bg-charcoal-700 transition-colors"
                    aria-label="Previous item"
                  >
                    <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextItem}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-charcoal-800 text-offwhite rounded-full hover:bg-charcoal-700 transition-colors"
                    aria-label="Next item"
                  >
                    <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              <div className="bg-charcoal-800 rounded-2xl overflow-hidden">
                <div className="aspect-video bg-charcoal-900 relative">
                  {currentLightboxItem.type === 'video' && !currentLightboxItem.src.endsWith('.svg') ? (
                    <video src={currentLightboxItem.src} controls autoPlay className="w-full h-full object-contain" />
                  ) : (
                    <Image src={currentLightboxItem.src} alt={currentLightboxItem.title} fill className="object-contain" sizes="90vw" />
                  )}
                </div>

                <div className="p-6 text-offwhite">
                  <h3 className="text-2xl font-display font-bold mb-2">{currentLightboxItem.title}</h3>
                  <p className="text-offwhite/70">{currentLightboxItem.category}</p>
                </div>
              </div>

              {displayedItems.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-charcoal-800 text-offwhite rounded-full text-sm">
                  {lightboxIndex + 1} / {displayedItems.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
