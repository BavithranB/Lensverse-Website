import Link from 'next/link';
import { getContent } from '@/lib/content';

export default function NotFound() {
  const content = getContent();

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal-900 text-offwhite px-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-9xl font-display font-bold text-red-600 mb-4">
          404
        </h1>
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
          Page Not Found
        </h2>
        <p className="text-xl text-offwhite/70 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-red-600 text-offwhite rounded-full font-semibold hover:bg-red-700 hover:scale-105 transition-transform"
          >
            Go Home
          </Link>
          <Link
            href="/gallery"
            className="px-8 py-4 bg-transparent border-2 border-offwhite text-offwhite rounded-full font-semibold hover:bg-offwhite hover:text-charcoal-900 transition-colors"
          >
            View Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}

