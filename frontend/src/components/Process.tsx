import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Layout, Code, Rocket, TrendingUp } from 'lucide-react';

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'DISCOVER & AUDIT',
      icon: Compass,
      description: 'Deep-dive architectural audit, market positioning, target audience mapping, and technical feasibility benchmarking.',
      details: ['Technical Stack Selection', 'Core Web Vitals Audit', 'Competitor Benchmark']
    },
    {
      num: '02',
      title: 'SPATIAL & UI DESIGN',
      icon: Layout,
      description: 'Crafting high-fidelity interactive wireframes, dark-mode design systems, 3D prototypes, and fluid motion guidelines.',
      details: ['Design System Tokens', '3D Scene Prototyping', 'Interactive Micro-Motion']
    },
    {
      num: '03',
      title: 'ENGINEER & ANIMATE',
      icon: Code,
      description: 'Building custom React/Next.js components, Three.js WebGL shaders, GSAP scroll triggers, and optimized APIs.',
      details: ['Next.js / Vite Architecture', 'WebGL Shader Optimization', 'REST/GraphQL API Layer']
    },
    {
      num: '04',
      title: 'OPTIMIZE & LAUNCH',
      icon: Rocket,
      description: 'Lighthouse 95+ performance tuning, automated SEO sitemap indexing, cross-browser stress testing, and edge deployment.',
      details: ['Lighthouse 95+ Mobile Score', 'JSON-LD Schema Markup', 'Vercel / Render Deployment']
    },
    {
      num: '05',
      title: 'GROW & SCALE',
      icon: TrendingUp,
      description: 'Programmatic SEO expansion, conversion rate optimization (CRO), continuous analytics monitoring, and feature iteration.',
      details: ['Programmatic SEO Engine', 'Real-time Telemetry', 'Continuous Feature Sprints']
    }
  ];

  return (
    <section id="process" className="py-32 bg-brand-bgMain dark:bg-brand-navyDark border-t border-brand-primary/10 dark:border-brand-darkBorder transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <span className="w-12 h-px bg-brand-accent" />
          <span className="font-mono text-xs text-brand-accent tracking-widest uppercase font-bold">
            HOW WE WORK & DELIVER
          </span>
        </div>
        <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-brand-primary dark:text-white mb-16">
          The Qorvex <span className="text-gradient-teal">Process</span>
        </h2>

        {/* Step Selector & Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Step List */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              const IconComp = step.icon;

              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-brand-primary dark:bg-brand-navyCard border-brand-accent text-white shadow-glow-navy'
                      : 'bg-brand-bgLight dark:bg-brand-navyCard/60 border-brand-primary/10 dark:border-brand-darkBorder text-brand-primary dark:text-white font-bold hover:border-brand-accent'
                  }`}
                  data-cursor="hover"
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-lg font-extrabold ${isActive ? 'text-brand-accent' : 'text-brand-primary dark:text-brand-accent'}`}>
                      {step.num}
                    </span>
                    <span className="font-display font-extrabold text-lg">
                      {step.title}
                    </span>
                  </div>
                  <IconComp className={`w-5 h-5 ${isActive ? 'text-brand-accent' : 'text-brand-primary dark:text-white'}`} />
                </div>
              );
            })}
          </div>

          {/* Right Active Step Detailed Showcase */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-brand-primary dark:bg-brand-navyCard p-8 sm:p-12 rounded-3xl border border-transparent dark:border-brand-darkBorder relative overflow-hidden min-h-[420px] flex flex-col justify-between shadow-card-light transition-colors text-white"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-sm text-brand-accent font-bold tracking-widest uppercase">
                    PHASE {steps[activeStep].num} OF 05
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-brand-accent/20 border border-brand-accent text-brand-accent text-xs font-mono font-bold">
                    MILESTONE DELIVERABLE
                  </span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
                  {steps[activeStep].title}
                </h3>

                <p className="text-white text-base font-medium leading-relaxed mb-8">
                  {steps[activeStep].description}
                </p>
              </div>

              {/* Milestone Bullet Points */}
              <div className="border-t border-white/10 pt-6">
                <span className="font-mono text-xs text-brand-accent font-bold uppercase tracking-wider block mb-4">
                  EXECUTION SCOPE
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {steps[activeStep].details.map((detail) => (
                    <div key={detail} className="p-3 rounded-xl bg-brand-navyDark border border-white/10 font-mono text-xs font-bold text-white">
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
