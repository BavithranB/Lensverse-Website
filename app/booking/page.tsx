import ScrollReveal from '@/components/ScrollReveal';
import BookingForm from '@/components/BookingForm';
import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Booking - Lensverse',
  description: 'Book a photography, videography, or editing session with Lensverse.',
};

function BookingFormWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingForm />
    </Suspense>
  );
}

export default function BookingPage() {
  return (
    // ensure booking page content starts below fixed navbar
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Hero Section */}
      <section className="py-20 bg-charcoal-900 text-offwhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Book a Shoot
            </h1>
            <p className="text-xl md:text-2xl text-offwhite/80">
              Fill out the form below and we&apos;ll get back to you as soon as
              possible to discuss your project.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingFormWrapper />
        </div>
      </section>
    </div>
  );
}
