import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';
import HeroCanvas from './canvas/HeroCanvas';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-brand-bgMain dark:bg-brand-navyDark transition-colors duration-300 bg-noise">
      {/* 3D WebGL Background Scene */}
      <HeroCanvas />

      {/* Hero Content Layer */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Brand Tagline Badge: "Core • Vision • Execution" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-bgLight dark:bg-brand-navyCard/90 border border-brand-primary/15 dark:border-brand-accent/40 text-xs font-mono font-bold tracking-widest text-brand-primary dark:text-brand-accent mb-8 shadow-glow-teal"
        >
          <Sparkles className="w-4 h-4 text-brand-accent animate-pulse" />
          <span>CORE • VISION • EXECUTION</span>
        </motion.div>

        {/* Hero Headline with Kinetic SVG Octagonal Q & Slanted Teal Slash */}
        <div className="relative mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-2 font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-none text-brand-primary dark:text-white select-none"
          >
            {/* SVG Octagonal Q Mark with Slanted Teal Slash */}
            <div className="relative inline-block w-16 h-16 sm:w-28 sm:h-28 md:w-36 md:h-36 mr-2">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none">
                {/* Octagonal Q Ring Frame */}
                <motion.path
                  d="M 32,10 L 68,10 L 90,32 L 90,68 L 68,90 L 32,90 L 10,68 L 10,32 Z
                     M 34,30 L 30,34 L 30,62 L 34,66 L 52,66 L 40,50 L 58,50 L 66,60 L 70,60 L 70,34 L 66,30 Z"
                  fill="#152436"
                  className="dark:fill-white"
                  fillRule="evenodd"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                />

                {/* Slanted Teal Slash Tail */}
                <motion.path
                  d="M 44,54 L 75,54 L 96,82 L 65,82 Z"
                  fill="#0D98A2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                />
              </svg>
            </div>

            {/* Wordmark "orveX" */}
            <span>orve</span>
            <span className="relative inline-block">
              <span>X</span>
              <span
                className="absolute inset-0 font-extrabold"
                style={{
                  color: '#0D98A2',
                  clipPath: 'polygon(50% 0, 100% 0, 50% 100%, 0% 100%)'
                }}
              >
                X
              </span>
            </span>
          </motion.div>
        </div>

        {/* Sub-headline Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl text-base sm:text-xl text-brand-bodyText dark:text-muted-dim font-medium leading-relaxed mb-10 font-body"
        >
          We engineer next-gen digital experiences. Blending high-performance software engineering, Awwwards-tier spatial UI/UX design, and technical search dominance.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        >
          <a
            href="#work"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-accent text-white font-bold text-sm tracking-wider uppercase hover:bg-brand-hover transition-all transform hover:-translate-y-1 shadow-glow-teal text-center"
            data-cursor="hover"
          >
            View Our Work
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-primary dark:bg-brand-navyCard text-white border border-brand-primary dark:border-brand-darkBorder hover:bg-brand-hover font-bold text-sm tracking-wider uppercase transition-all transform hover:-translate-y-1 shadow-glow-navy text-center"
            data-cursor="hover"
          >
            Start a Project
          </a>
        </motion.div>

        {/* Scroll Cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 flex flex-col items-center gap-2 text-brand-primary dark:text-brand-accent text-xs font-mono tracking-widest uppercase cursor-pointer font-bold"
          onClick={() => {
            const el = document.getElementById('manifesto');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown className="w-5 h-5 text-brand-accent animate-bounce" />
        </motion.div>
      </div>

      {/* Subtle Gradient Overlays */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/10 rounded-full blur-[140px] pointer-events-none" />
    </section>
  );
}
