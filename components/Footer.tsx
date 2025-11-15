'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getContent } from '@/lib/content';

export default function Footer() {
  const content = getContent();
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="bg-charcoal-900 text-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            {logoError ? (
              <h3 className="text-2xl font-display font-bold mb-4">
                {content.brand.name}
              </h3>
            ) : (
              <img
                src="/images/logo.png"
                alt={content.brand.name}
                className="h-16 w-auto object-contain mb-4 max-w-[120px]"
                onError={() => setLogoError(true)}
                onLoad={() => setLogoError(false)}
              />
            )}
            <p className="text-offwhite/70 mb-4">{content.brand.tagline}</p>
            <div className="flex space-x-4">
              {content.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-offwhite/70 hover:text-red-500 transition-colors"
                  aria-label={social.label}
                >
                  <span className="sr-only">{social.label}</span>
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-offwhite/70 hover:text-red-500 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-offwhite/70 hover:text-red-500 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-offwhite/70 hover:text-red-500 transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="text-offwhite/70 hover:text-red-500 transition-colors"
                >
                  Booking
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-offwhite/70">
              <li>
                <a
                  href={`mailto:${content.contact.email}`}
                  className="hover:text-red-500 transition-colors"
                >
                  {content.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${content.contact.phone}`}
                  className="hover:text-red-500 transition-colors"
                >
                  {content.contact.phone}
                </a>
              </li>
              <li>{content.contact.address}</li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-8 pt-8 border-t border-charcoal-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold mb-2">Stay Updated</h4>
              <p className="text-offwhite/70 text-sm">
                Subscribe to our newsletter for updates and special offers.
              </p>
            </div>
            <form className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-charcoal-800 border border-charcoal-700 rounded-lg text-offwhite placeholder-offwhite/50 focus:outline-none focus:border-red-600 flex-1 md:flex-none md:w-64"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-offwhite rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-charcoal-700 text-center text-offwhite/50 text-sm">
          <p>
            &copy; {new Date().getFullYear()} {content.brand.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


