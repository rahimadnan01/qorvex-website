import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { getServices } from '../services/api';
import { Service } from '../types';
import ServiceIconsCanvas from './canvas/ServiceIconsCanvas';

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then((data) => {
        setServices(data);
        if (data.length > 0) setActiveId(data[0]._id);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="services" className="py-28 bg-brand-bgMain dark:bg-brand-navyDark border-t border-brand-primary/10 dark:border-brand-darkBorder transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-12 h-px bg-brand-accent" />
              <span className="font-mono text-xs text-brand-accent tracking-widest uppercase font-bold">
                CAPABILITIES & SERVICES
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-brand-primary dark:text-white">
              What We <span className="text-gradient-teal">Engineer</span>
            </h2>
          </div>
          <p className="max-w-md text-brand-bodyText dark:text-muted-dim text-base font-medium leading-relaxed">
            Full-spectrum digital solutions crafted for maximum velocity, visual authority, and technical resilience.
          </p>
        </div>

        {/* Dynamic Accordion / List */}
        {loading ? (
          <div className="w-full py-20 flex justify-center items-center text-brand-primary dark:text-white font-mono text-xs font-bold">
            FETCHING CAPABILITIES FROM API...
          </div>
        ) : (
          <div className="space-y-6">
            {services.map((service, index) => {
              const isActive = activeId === service._id;
              const isHovered = hoveredId === service._id;

              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredId(service._id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActiveId(isActive ? null : service._id)}
                  className={`rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 border bg-white dark:bg-brand-navyCard ${
                    isActive
                      ? 'border-brand-accent shadow-glow-teal'
                      : 'border-brand-primary/10 dark:border-brand-darkBorder hover:border-brand-accent'
                  }`}
                  data-cursor="hover"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* Left 3D Icon & Title */}
                    <div className="flex items-center gap-6">
                      <ServiceIconsCanvas type={service.iconMesh} hovered={isHovered || isActive} />
                      <div>
                        <div className="font-mono text-xs text-brand-accent tracking-wider font-bold mb-1">
                          0{index + 1} — SERVICES
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-brand-primary dark:text-white group-hover:text-brand-accent transition-colors">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {/* Short Teaser & Toggle */}
                    <div className="flex items-center gap-4 justify-between md:justify-end">
                      <p className="hidden lg:block max-w-sm text-sm text-brand-bodyText dark:text-muted-dim font-medium text-right">
                        {service.shortDescription}
                      </p>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                        isActive ? 'bg-brand-accent text-white border-brand-accent rotate-90' : 'border-brand-primary/20 dark:border-brand-darkBorder text-brand-primary dark:text-white'
                      }`}>
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-t border-brand-primary/10 dark:border-brand-darkBorder mt-6 pt-6"
                      >
                        <p className="text-brand-bodyText dark:text-muted-light text-base font-medium leading-relaxed mb-8 max-w-3xl">
                          {service.fullDescription}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Tech Stack Pills */}
                          <div>
                            <span className="font-mono text-xs text-brand-primary dark:text-brand-accent font-bold tracking-wider uppercase mb-3 block">
                              TECH STACK & TOOLS
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {service.techStack.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1 rounded-lg bg-brand-primary dark:bg-brand-navyDark text-white font-mono text-xs font-bold border border-transparent dark:border-brand-darkBorder"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Key Deliverables */}
                          <div>
                            <span className="font-mono text-xs text-brand-primary dark:text-brand-accent font-bold tracking-wider uppercase mb-3 block">
                              KEY DELIVERABLES
                            </span>
                            <ul className="space-y-2">
                              {service.deliverables.map((item) => (
                                <li key={item} className="flex items-center gap-2 text-sm text-brand-bodyText dark:text-white font-medium">
                                  <CheckCircle2 className="w-4 h-4 text-brand-accent flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
