import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Eye, Zap } from 'lucide-react';

export default function Manifesto() {
  const pillars = [
    {
      icon: Cpu,
      title: 'CORE',
      subtitle: 'Engineering Rigor',
      description: 'Zero bloat, sub-second execution, and rock-solid architecture. We treat code as applied mathematics.'
    },
    {
      icon: Eye,
      title: 'VISION',
      subtitle: 'Spatial Craft',
      description: 'Awwwards-tier visual motion, spatial lighting, and kinetic interactions that make digital products feel alive.'
    },
    {
      icon: Zap,
      title: 'EXECUTION',
      subtitle: 'Organic Velocity',
      description: 'Technical SEO dominance and speed optimization that transform search traffic into quantifiable enterprise value.'
    }
  ];

  const stats = [
    { value: '45+', label: 'Projects Shipped', detail: 'High-impact enterprise & startup builds' },
    { value: '99.8%', label: 'On-Time Velocity', detail: 'Disciplined sprint milestones' },
    { value: '14', label: 'Awwwards & FWA', detail: 'Global visual recognition' },
    { value: '$120M+', label: 'Client Valuation', detail: 'Enterprise market growth' }
  ];

  return (
    <section id="manifesto" className="py-24 sm:py-32 relative bg-brand-bgLight dark:bg-brand-navyDark border-t border-brand-primary/10 dark:border-brand-darkBorder transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="w-12 h-px bg-brand-accent" />
          <span className="font-mono text-xs text-brand-accent tracking-widest uppercase font-bold">
            THE QORVEX MANIFESTO
          </span>
        </div>

        {/* Big Manifesto Headline Reveal */}
        <div className="max-w-4xl mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-brand-primary dark:text-white leading-tight"
          >
            We don't build generic template agency sites. We build <span className="text-gradient-teal">cinematic digital engines</span> that define industries.
          </motion.h2>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {pillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white dark:bg-brand-navyCard p-8 rounded-2xl border border-brand-primary/10 dark:border-brand-darkBorder relative group overflow-hidden shadow-card-light transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-accent/20 border border-brand-accent flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform">
                  <IconComp className="w-6 h-6" />
                </div>
                <div className="font-mono text-xs text-brand-accent tracking-widest mb-1 font-bold">
                  0{idx + 1} — {pillar.title}
                </div>
                <h3 className="font-display text-xl font-bold text-brand-primary dark:text-white mb-3">
                  {pillar.subtitle}
                </h3>
                <p className="text-brand-bodyText dark:text-muted-dim text-sm leading-relaxed font-medium">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Animated Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-2xl bg-white dark:bg-brand-navyCard border border-brand-primary/10 dark:border-brand-darkBorder shadow-card-light transition-colors">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col border-l border-brand-primary/10 dark:border-brand-darkBorder pl-6 first:border-l-0"
            >
              <span className="font-display font-extrabold text-3xl sm:text-5xl text-brand-accent mb-1">
                {stat.value}
              </span>
              <span className="font-display text-sm font-semibold text-brand-primary dark:text-white mb-0.5">
                {stat.label}
              </span>
              <span className="text-xs text-brand-bodyText dark:text-muted-dim font-mono">
                {stat.detail}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
