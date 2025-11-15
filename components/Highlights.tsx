'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { getContent } from '@/lib/content';

export default function Highlights() {
  const content = getContent();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [counters, setCounters] = useState<(number | string)[]>(
    content.highlights.map(() => 0)
  );

  useEffect(() => {
    if (!isInView) return;

    const intervals = content.highlights.map((highlight, index) => {
      const targetValue = parseInt(highlight.value.replace(/\D/g, ''));
      if (isNaN(targetValue)) {
        setCounters((prev) => {
          const newCounters = [...prev];
          newCounters[index] = highlight.value;
          return newCounters;
        });
        return null;
      }

      const duration = 2000;
      const steps = 60;
      const stepValue = targetValue / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
          setCounters((prev) => {
            const newCounters = [...prev];
            newCounters[index] = targetValue;
            return newCounters;
          });
          clearInterval(interval);
        } else {
          setCounters((prev) => {
            const newCounters = [...prev];
            newCounters[index] = Math.floor(stepValue * currentStep);
            return newCounters;
          });
        }
      }, stepDuration);

      return interval;
    });

    return () => {
      intervals.forEach((interval) => {
        if (interval) clearInterval(interval);
      });
    };
  }, [isInView, content.highlights]);

  return (
    <section className="py-20 bg-charcoal-900 text-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {content.highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-red-600 mb-2">
                {typeof counters[index] === 'number'
                  ? counters[index] + highlight.value.replace(/\d/g, '')
                  : counters[index]}
              </div>
              <div className="text-offwhite/70 text-lg md:text-xl">
                {highlight.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

