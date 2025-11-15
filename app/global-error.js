'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error);
    
    // You can also log to your error tracking service here
    console.error('Global error caught:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
            <p className="text-gray-700 mb-6">
              We&apos;re sorry, but an unexpected error occurred. Our team has been notified and we&apos;re working on fixing it.
            </p>
            <button
              onClick={() => reset()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try again
            </button>
            <div className="mt-6 text-sm text-gray-500">
              <p>Error details (only visible in development):</p>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-left overflow-auto">
                {error?.message || 'No error message available'}
              </pre>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

// This tells Next.js to use this component for error handling
export const dynamic = 'force-dynamic';
