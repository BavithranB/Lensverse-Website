import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyBookButton from '@/components/StickyBookButton';
import { getContent } from '@/lib/content';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const content = getContent();

export const metadata: Metadata = {
  title: `${content.brand.name} - ${content.brand.tagline}`,
  description:
    'Professional photography, videography, and editing services. Crafting moments, framing stories with cinematic precision and artistic excellence.',
  keywords: [
    'photography',
    'videography',
    'video editing',
    'wedding photography',
    'event photography',
    'commercial photography',
    'color grading',
  ],
  authors: [{ name: content.brand.name }],
  openGraph: {
    title: `${content.brand.name} - ${content.brand.tagline}`,
    description:
      'Professional photography, videography, and editing services. Crafting moments, framing stories.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${content.brand.name} - ${content.brand.tagline}`,
    description:
      'Professional photography, videography, and editing services. Crafting moments, framing stories.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lensverse.com';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: content.brand.name,
    description: content.brand.tagline,
    url: siteUrl,
    telephone: content.contact.phone,
    email: content.contact.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: content.contact.address.split(',')[0],
      addressRegion: content.contact.address.split(',')[1]?.trim() || '',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    serviceType: ['Photography', 'Videography', 'Video Editing'],
    priceRange: '$$',
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <StickyBookButton />
      </body>
    </html>
  );
}

