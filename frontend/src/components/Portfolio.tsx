import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, X, ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { getProjects } from '../services/api';
import { Project } from '../types';

// Individual Row Stacked Card (3 Layers Stacked; fans out on mouse hover)
function RowStackedCard({
  project,
  index,
  onSelect
}: {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Spring Physics on Mouse Movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      className="relative w-full h-[480px] perspective-[1200px] cursor-pointer group"
      data-cursor="view"
      data-cursor-text="CASE STUDY"
    >
      {/* BACK LAYER 1 (Fans out to top-left on mouse hover) */}
      <motion.div
        animate={
          isHovered
            ? { x: -40, y: -28, rotate: -8, scale: 0.96, opacity: 0.95 }
            : { x: -5, y: 8, rotate: -3, scale: 0.95, opacity: 0.7 }
        }
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="absolute inset-0 rounded-2xl bg-brand-primary text-white border border-brand-accent/50 p-6 flex flex-col justify-between overflow-hidden shadow-2xl pointer-events-none z-0"
      >
        <div className="flex items-center justify-between text-xs font-mono text-brand-accent font-bold">
          <span>{project.category}</span>
          <span>LAYER 01</span>
        </div>
        <div className="space-y-2">
          <span className="font-mono text-[10px] text-brand-accent uppercase font-bold block">CHALLENGE & BRIEF</span>
          <p className="text-xs text-white font-medium leading-relaxed line-clamp-3 italic">
            "{project.problem}"
          </p>
        </div>
        <div className="font-mono text-[10px] text-brand-accent font-bold flex items-center gap-1">
          <span>HOVER UNLOCKS CASE STUDY</span>
          <span>→</span>
        </div>
      </motion.div>

      {/* BACK LAYER 2 (Fans out to top-right on mouse hover) */}
      <motion.div
        animate={
          isHovered
            ? { x: 40, y: -28, rotate: 8, scale: 0.96, opacity: 0.95 }
            : { x: 5, y: 16, rotate: 3, scale: 0.92, opacity: 0.5 }
        }
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="absolute inset-0 rounded-2xl bg-brand-primary text-white border border-white/20 p-6 flex flex-col justify-between overflow-hidden shadow-2xl pointer-events-none z-10"
      >
        <div className="flex items-center justify-between text-xs font-mono text-brand-accent font-bold">
          <span>{project.client}</span>
          <span>METRIC DECK</span>
        </div>
        <div className="grid grid-cols-2 gap-2 my-auto">
          {project.metrics.slice(0, 2).map((m, idx) => (
            <div key={idx} className="p-2.5 rounded-lg bg-brand-navyDark border border-white/10">
              <span className="font-display font-extrabold text-sm text-brand-accent block">{m.value}</span>
              <span className="font-mono text-[9px] text-white font-bold uppercase block">{m.label}</span>
            </div>
          ))}
        </div>
        <div className="font-mono text-[10px] text-white font-bold flex items-center gap-1">
          <span>CLICK FOR DEEP DIVE</span>
          <span>→</span>
        </div>
      </motion.div>

      {/* FRONT MAIN CARD */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        animate={
          isHovered
            ? { y: -12, scale: 1.02 }
            : { y: 0, scale: 1 }
        }
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative z-20 w-full h-full rounded-2xl bg-white dark:bg-brand-navyCard border border-brand-primary/15 dark:border-brand-darkBorder overflow-hidden flex flex-col justify-between transition-all group-hover:border-brand-accent group-hover:shadow-glow-teal shadow-card-light"
      >
        {/* Project Cover Image */}
        <div className="relative h-60 w-full overflow-hidden bg-brand-primary">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent" />

          {/* Top Category Badge */}
          <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-md bg-brand-primary text-white font-bold border border-white/20">
            {project.category}
          </div>

          {/* 3-Stack Badge Indicator */}
          <div className="absolute top-4 right-4 font-mono text-[11px] font-bold px-3 py-1 rounded-full bg-brand-accent text-white flex items-center gap-1.5 shadow-glow-teal">
            <Layers className="w-3.5 h-3.5" />
            <span>3-STACK</span>
          </div>
        </div>

        {/* Card Content & Details */}
        <div className="p-6 flex flex-col justify-between flex-1 bg-white dark:bg-brand-navyCard">
          <div>
            <div className="font-mono text-[11px] text-brand-accent font-bold uppercase mb-1">
              CLIENT: {project.client}
            </div>
            <h3 className="font-display text-xl font-extrabold text-brand-primary dark:text-white group-hover:text-brand-accent transition-colors line-clamp-1">
              {project.title}
            </h3>
            <p className="text-brand-bodyText dark:text-muted-dim text-xs font-semibold line-clamp-2 mt-2 leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Footer Metric & Action Button */}
          <div className="border-t border-brand-primary/10 dark:border-brand-darkBorder pt-4 flex items-center justify-between mt-auto">
            <div className="flex items-center gap-3">
              {project.metrics[0] && (
                <div>
                  <span className="font-display font-extrabold text-base text-brand-accent block">
                    {project.metrics[0].value}
                  </span>
                  <span className="font-mono text-[10px] text-brand-primary dark:text-white font-bold uppercase block">
                    {project.metrics[0].label}
                  </span>
                </div>
              )}
            </div>

            <div className="w-9 h-9 rounded-full bg-brand-primary dark:bg-brand-navyDark text-white flex items-center justify-center group-hover:bg-brand-accent transition-all">
              <ArrowUpRight className="w-4.5 h-4.5" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', 'Software & Web UI', 'UI/UX Design', 'SEO & Growth', 'Software & AI'];

  const filteredProjects = selectedFilter === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase().includes(selectedFilter.toLowerCase()) || selectedFilter.toLowerCase().includes(p.category.toLowerCase()));

  return (
    <section id="work" className="py-32 bg-brand-bgLight dark:bg-brand-navyDark border-t border-brand-primary/10 dark:border-brand-darkBorder transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-12 h-px bg-brand-accent" />
              <span className="font-mono text-xs text-brand-accent tracking-widest uppercase flex items-center gap-2 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
                STACKED CARDS SHOWCASE
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-brand-primary dark:text-white">
              Featured <span className="text-gradient-teal">Projects</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-bold tracking-wider transition-all ${
                  selectedFilter === cat
                    ? 'bg-brand-accent text-white shadow-glow-teal'
                    : 'bg-white dark:bg-brand-navyCard text-brand-primary dark:text-white border border-brand-primary/15 dark:border-brand-darkBorder hover:border-brand-accent'
                }`}
                data-cursor="hover"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Subtitle / Interaction Hint */}
        <div className="mb-12 flex items-center gap-2 font-mono text-xs text-brand-primary dark:text-brand-accent font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4 text-brand-accent" />
          <span>HOVER OVER ANY STACKED CARD IN THE ROW TO FAN OUT SUB-LAYERS</span>
        </div>

        {/* ROW / GRID OF INDIVIDUAL STACKED CARDS */}
        {loading ? (
          <div className="w-full py-24 text-center text-brand-primary dark:text-white font-mono text-xs font-bold">
            LOADING CASE STUDIES FROM REST API...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 sm:gap-14">
            {filteredProjects.map((project, idx) => (
              <RowStackedCard
                key={project._id}
                project={project}
                index={idx}
                onSelect={setActiveProject}
              />
            ))}
          </div>
        )}

      </div>

      {/* Deep-Dive Case Study Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-brand-primary/80 dark:bg-brand-navyDark/90 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-brand-navyCard border border-brand-primary/20 dark:border-brand-darkBorder rounded-3xl p-6 sm:p-10 shadow-2xl text-brand-primary dark:text-white transition-colors"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-brand-bgLight dark:bg-brand-navyDark border border-brand-primary/20 dark:border-brand-darkBorder flex items-center justify-center text-brand-primary dark:text-white hover:text-brand-accent hover:border-brand-accent transition-colors"
                data-cursor="hover"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Banner */}
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden mb-8">
                <img src={activeProject.imageUrl} alt={activeProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-brand-navyCard via-transparent to-transparent" />
              </div>

              {/* Header Title */}
              <div className="mb-8">
                <div className="font-mono text-xs text-brand-accent tracking-widest uppercase mb-2 font-bold">
                  CASE STUDY — {activeProject.client}
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-brand-primary dark:text-white mb-4">
                  {activeProject.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.map(t => (
                    <span key={t} className="px-3 py-1 rounded-md bg-brand-bgLight dark:bg-brand-navyDark border border-brand-primary/15 dark:border-brand-darkBorder text-xs font-mono text-brand-primary dark:text-white font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-2xl bg-brand-bgLight dark:bg-brand-navyDark border border-brand-primary/10 dark:border-brand-darkBorder mb-10">
                {activeProject.metrics.map((m, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-mono text-xs text-brand-bodyText dark:text-muted-dim font-bold mb-1">{m.label}</span>
                    <span className="font-display text-2xl sm:text-3xl font-extrabold text-brand-accent">{m.value}</span>
                  </div>
                ))}
              </div>

              {/* Narrative breakdown */}
              <div className="space-y-8 text-brand-bodyText dark:text-white font-medium leading-relaxed">
                <div>
                  <h4 className="font-display text-lg font-extrabold text-brand-primary dark:text-brand-accent mb-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-accent" />
                    The Challenge & Problem
                  </h4>
                  <p className="text-brand-bodyText dark:text-white text-base font-medium">{activeProject.problem}</p>
                </div>

                <div>
                  <h4 className="font-display text-lg font-extrabold text-brand-primary dark:text-brand-accent mb-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-primary dark:bg-white" />
                    Strategy & Engineering Approach
                  </h4>
                  <p className="text-brand-bodyText dark:text-white text-base font-medium">{activeProject.approach}</p>
                </div>

                <div>
                  <h4 className="font-display text-lg font-extrabold text-brand-primary dark:text-brand-accent mb-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-accent" />
                    Quantifiable Impact & Results
                  </h4>
                  <p className="text-brand-bodyText dark:text-white text-base font-medium">{activeProject.result}</p>
                </div>
              </div>

              {/* Live Link */}
              {activeProject.liveUrl && (
                <div className="mt-10 pt-6 border-t border-brand-primary/10 dark:border-brand-darkBorder flex justify-end">
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-accent text-white font-bold text-sm hover:bg-brand-hover transition-colors shadow-glow-teal"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
