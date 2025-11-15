// app/page.tsx (or wherever your Home component file is)
// Replace the file contents with the code below or update the featured section accordingly.

import Hero from '@/components/Hero';
import Highlights from '@/components/Highlights';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import Image from 'next/image';
import { getContent } from '@/lib/content';

export default function Home() {
  const content = getContent();

  return (
    <div className="pt-20">
      <Hero />
      <Highlights />

      {/* Featured Reels Section */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal-900 mb-4">
                Featured Work
              </h2>
              <p className="text-xl text-charcoal-700 max-w-2xl mx-auto">
                Explore our latest projects and creative vision
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {content.gallery.items.slice(0, 3).map((item, index) => {
                // stable global index in the gallery items list
                const globalIndex = content.gallery.items.findIndex((i) => i === item);
                const href = `/gallery#gallery-item-${globalIndex >= 0 ? globalIndex : index}`;

                return (
                  <Link
                    key={index}
                    href={href}
                    className="group relative overflow-hidden rounded-2xl aspect-video bg-charcoal-900 block"
                  >
                    {/* image/video container */}
                    <div className="absolute inset-0 z-0">
                      {item.type === 'image' ? (
                        <div className="relative w-full h-full">
                          {/* Use next/image for optimization */}
                          <Image
                            src={item.src}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            priority={index === 0} // optionally prioritize first image
                          />
                        </div>
                      ) : (
                        <div className="relative w-full h-full bg-black/30 flex items-center justify-center">
                          {/* For video items you could show a poster or first frame */}
                          <video
                            src={item.src}
                            className="w-full h-full object-cover"
                            muted
                            loop
                            playsInline
                          />
                        </div>
                      )}
                    </div>

                    {/* overlay gradient & text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent z-10" />
                    <div className="absolute bottom-4 left-4 right-4 z-20 text-offwhite">
                      <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                      <p className="text-offwhite/70 text-sm">{item.category}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="text-center">
              <Link
                href="/gallery"
                className="inline-block px-8 py-4 bg-charcoal-900 text-offwhite rounded-full font-semibold hover:bg-charcoal-800 hover:scale-105 transition-transform"
              >
                View Full Gallery
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-charcoal-900 text-offwhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-xl text-offwhite/80 mb-8">
              Let&apos;s bring your vision to life. Get in touch and let&apos;s discuss
              your project.
            </p>
            <Link
              href="/booking"
              className="inline-block px-8 py-4 bg-red-600 text-offwhite rounded-full font-semibold text-lg hover:bg-red-700 hover:scale-105 transition-transform"
            >
              Book a Shoot
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
