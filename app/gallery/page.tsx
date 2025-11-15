import ScrollReveal from '@/components/ScrollReveal';
import Gallery from '@/components/Gallery';
import { getContent } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery - Lensverse',
  description: 'Browse our portfolio of photography, videography, and editing work.',
};

export default function GalleryPage() {
  const content = getContent();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-charcoal-900 text-offwhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Our Gallery
            </h1>
            <p className="text-xl md:text-2xl text-offwhite/80">
              Explore our portfolio of stunning photography, videography, and editing work.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Gallery items={content.gallery.items} filters={content.gallery.filters} />
        </div>
      </section>
    </div>
  );
}
