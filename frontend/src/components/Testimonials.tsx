import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { getTestimonials } from '../services/api';
import { Testimonial } from '../types';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    getTestimonials().then(setTestimonials);
  }, []);

  const clientLogos = [
    'QUANTUMPAY', 'NEXUS CLOUD', 'ASTRA OS', 'CYBERPULSE', 'VANCE CAPITAL', 'SYNAPSE AI'
  ];

  return (
    <section className="py-24 bg-brand-bgMain dark:bg-brand-navyDark border-t border-brand-primary/10 dark:border-brand-darkBorder transition-colors duration-300 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="w-12 h-px bg-brand-accent" />
          <span className="font-mono text-xs text-brand-accent tracking-widest uppercase font-bold">
            TRUST & RECOGNITION
          </span>
          <span className="w-12 h-px bg-brand-accent" />
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-brand-primary dark:text-white text-center">
          Backed by Leading <span className="text-gradient-teal">Founders & CTOs</span>
        </h2>
      </div>

      {/* Infinite Logo Ticker Bar */}
      <div className="w-full py-6 bg-brand-bgLight dark:bg-brand-navyCard border-y border-brand-primary/10 dark:border-brand-darkBorder overflow-hidden mb-16 transition-colors">
        <div className="flex w-[200%] animate-spin-slow" style={{ animationDuration: '30s' }}>
          <div className="flex items-center justify-around w-1/2 font-display font-black text-xl sm:text-2xl text-brand-primary dark:text-white tracking-widest">
            {clientLogos.map((logo) => (
              <span key={logo} className="hover:text-brand-accent transition-colors cursor-default">
                {logo}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-around w-1/2 font-display font-black text-xl sm:text-2xl text-brand-primary dark:text-white tracking-widest">
            {clientLogos.map((logo) => (
              <span key={logo + '_dup'} className="hover:text-brand-accent transition-colors cursor-default">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white dark:bg-brand-navyCard p-8 rounded-2xl border border-brand-primary/10 dark:border-brand-darkBorder flex flex-col justify-between shadow-card-light transition-colors"
            >
              <div>
                <div className="flex items-center gap-1 text-brand-accent mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-accent" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-brand-accent/40 mb-4" />
                <p className="text-brand-bodyText dark:text-white text-base font-medium leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="border-t border-brand-primary/10 dark:border-brand-darkBorder pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-primary text-white font-display font-extrabold flex items-center justify-center">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-brand-primary dark:text-white text-sm">
                    {t.author}
                  </h4>
                  <div className="font-mono text-xs text-brand-bodyText dark:text-muted-dim font-bold">
                    {t.title}, {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
