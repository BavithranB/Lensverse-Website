'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getContent } from '@/lib/content';

export default function Hero() {
  const content = getContent();
  const imageSlides = content.hero.slides.filter(
    (s: any) => s.type === 'image' || s.src.endsWith('.svg')
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (imageSlides.length <= 1) return;
    const t = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % imageSlides.length);
    }, 5000);
    return () => clearInterval(t);
  }, [imageSlides.length]);

  if (imageSlides.length === 0) return null;
  const currentSlideData = imageSlides[currentSlide] || imageSlides[0];

  // Handle CTA clicks (hash links + normal links)
  const handleCtaClick = (e: React.MouseEvent, href: string) => {
    if (!href) return;
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.slice(1);

      // If we're already on home, smooth-scroll to the section
      if (pathname === '/') {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }

      // Otherwise navigate to home with hash (/#id)
      router.push(`/${href}`);
      return;
    }

    // Normal route (e.g., /booking)
    // Let <Link> handle navigation; no preventDefault here.
  };

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full bg-charcoal-800">
          <Image
            src={currentSlideData.src}
            alt={currentSlideData.headline}
            fill
            priority
            className="object-cover"
            quality={90}
          />
        </div>
        <div className="absolute inset-0 bg-charcoal-900/40" />
      </motion.div>

      {/* Foreground */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex items-center justify-center text-center px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-offwhite mb-6"
          >
            {currentSlideData.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-offwhite/90 mb-8"
          >
            {currentSlideData.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {content.hero.ctas.map((cta: any, index: number) => (
              <Link
                key={cta.label ?? index}
                href={cta.href?.startsWith('#') ? `/${cta.href}` : cta.href ?? '/'}
                onClick={(e) => handleCtaClick(e, cta.href)}
                className={`px-8 py-4 rounded-full font-semibold text-lg transition-transform hover:scale-105 ${
                  index === 0
                    ? 'bg-offwhite text-charcoal-900 hover:bg-red-500 hover:text-offwhite'
                    : 'bg-transparent border-2 border-offwhite text-offwhite hover:bg-offwhite hover:text-charcoal-900'
                }`}
              >
                {cta.label}
              </Link>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Slide dots */}
      {imageSlides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {imageSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentSlide ? 'w-8 bg-red-600' : 'w-2 bg-offwhite/50 hover:bg-offwhite/75'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-offwhite/50 rounded-full flex justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-offwhite/50 rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
