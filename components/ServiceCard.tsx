'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ServiceItem } from '@/lib/content';

interface ServiceCardProps {
  service: ServiceItem;
  category: string;
  index: number;
}

export default function ServiceCard({
  service,
  category,
  index,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-lift transition-all"
    >
      <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-3">
        {service.title}
      </h3>
      <p className="text-charcoal-700 mb-4">{service.desc}</p>
      <ul className="space-y-2 mb-6">
        {service.highlights.map((highlight, idx) => (
          <li key={idx} className="flex items-start text-charcoal-600">
            <svg
              className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between pt-4 border-t border-charcoal-200">
        <span className="text-2xl font-bold text-charcoal-900">
          {service.price}
        </span>
        <Link
          href={`/booking?service=${encodeURIComponent(
            `${category} - ${service.title}`
          )}`}
          className="px-6 py-2 bg-charcoal-900 text-offwhite rounded-full font-semibold hover:bg-charcoal-800 hover:scale-105 transition-transform"
        >
          Enquire
        </Link>
      </div>
    </motion.div>
  );
}


