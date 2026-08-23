import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [counter, setCounter] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const duration = 1800;
    const interval = 25;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setCounter(progress);

      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 600);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-brand-navyDark px-8 py-12 text-white overflow-hidden select-none"
        >
          {/* --- RICH CINEMATIC BACKGROUND ELEMENTS --- */}
          {/* Animated Radial Ambient Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-accent/20 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
          <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-brand-primary/50 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-hover/30 rounded-full blur-[130px] pointer-events-none" />

          {/* Geometric Blueprint Grid Lines Overlay */}
          <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#0D98A2 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />

          {/* Rotating Decorative Circular Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[450px] sm:h-[450px] rounded-full border border-brand-accent/20 animate-spin-slow pointer-events-none" />

          {/* Top Brand Status Bar */}
          <div className="relative z-10 w-full flex justify-between items-center text-xs tracking-widest uppercase font-mono text-muted-dim">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
              <span>QORVEX STUDIO ENGINE</span>
            </div>
            <span>COLOR PALETTE: #152436 • #0D98A2</span>
          </div>

          {/* Center Logo Assembly with Animated Background Halo */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
              
              {/* Glowing Background Halo */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-brand-primary via-brand-accent/30 to-transparent blur-xl" />

              {/* Kinetic SVG Logo Assembly */}
              <svg viewBox="0 0 100 100" className="relative z-10 w-full h-full fill-none">
                {/* Octagonal Outer Q Frame Draw */}
                <motion.path
                  d="M 32,10 L 68,10 L 90,32 L 90,68 L 68,90 L 32,90 L 10,68 L 10,32 Z"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: counter / 100 }}
                  transition={{ ease: "easeInOut" }}
                />
                {/* Inner Octagonal Body */}
                <motion.path
                  d="M 34,30 L 30,34 L 30,62 L 34,66 L 52,66 L 40,50 L 58,50 L 66,60 L 70,60 L 70,34 L 66,30 Z"
                  fill="#152436"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: counter > 35 ? 1 : 0 }}
                />
                {/* Slanted Teal Slash Parallelogram Tail */}
                <motion.path
                  d="M 44,54 L 75,54 L 96,82 L 65,82 Z"
                  fill="#0D98A2"
                  initial={{ x: -25, opacity: 0 }}
                  animate={{ x: counter > 50 ? 0 : -25, opacity: counter > 50 ? 1 : 0 }}
                  transition={{ ease: "easeOut", duration: 0.4 }}
                />
              </svg>
            </div>

            {/* Typography Wordmark */}
            <div className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight text-white flex items-center">
              <span>QorvE</span>
              <span className="relative inline-block ml-0.5">
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
            </div>
          </div>

          {/* Bottom Progress Counter */}
          <div className="relative z-10 w-full flex justify-between items-end border-t border-brand-darkBorder/60 pt-4">
            <div className="font-mono text-xs text-muted-dim flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              <span>INITIALIZING SYSTEM CORE...</span>
            </div>
            <div className="font-display text-5xl sm:text-7xl font-extrabold text-brand-accent font-mono shadow-glow-teal">
              {counter}<span className="text-xl text-muted-dim">%</span>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
