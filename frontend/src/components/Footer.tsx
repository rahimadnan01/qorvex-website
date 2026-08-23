import React, { useState, useEffect } from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Dribbble } from 'lucide-react';
import { Link } from 'react-router-dom';
import QorvexLogo from './QorvexLogo';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: false }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-bgLight dark:bg-brand-navyDark border-t border-brand-primary/15 dark:border-brand-accent/20 pt-20 pb-12 relative overflow-hidden text-brand-primary dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* Brand Info & High-Visibility Logo */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-block group" data-cursor="hover">
              <QorvexLogo size={46} showText={true} variant="colored" useImage={true} />
            </Link>
            <p className="max-w-sm text-brand-bodyText dark:text-muted-dim text-sm font-medium leading-relaxed">
              A Next-Gen Software, UI/UX Design, and Technical SEO Agency. Engineering digital authority for market-defining startups.
            </p>
            <div className="font-mono text-xs text-brand-accent font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-pulse" />
              <span>NEW YORK (EST): {time || '12:00:00'}</span>
            </div>
          </div>

          {/* Navigation Sitemap */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs text-brand-accent tracking-widest uppercase mb-4 font-bold">
              SITEMAP
            </h4>
            <ul className="space-y-2.5 text-sm font-bold text-brand-primary dark:text-white">
              <li><a href="#hero" className="hover:text-brand-accent transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-brand-accent transition-colors">Services & Stack</a></li>
              <li><a href="#work" className="hover:text-brand-accent transition-colors">Selected Work</a></li>
              <li><a href="#process" className="hover:text-brand-accent transition-colors">Process</a></li>
              <li><a href="#team" className="hover:text-brand-accent transition-colors">Founding Team</a></li>
              <li><a href="#contact" className="hover:text-brand-accent transition-colors">Initiate Project</a></li>
              <li><Link to="/admin" className="text-brand-accent hover:underline transition-colors">Admin CMS Portal</Link></li>
            </ul>
          </div>

          {/* Socials & Locations */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs text-brand-accent tracking-widest uppercase mb-4 font-bold">
              CONNECT & FOLLOW
            </h4>
            <div className="flex items-center gap-3 mb-6">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white dark:bg-brand-navyCard border border-brand-primary/15 dark:border-brand-accent/30 flex items-center justify-center text-brand-primary dark:text-white hover:text-brand-accent hover:border-brand-accent transition-all shadow-card-light">
                <Github className="w-4.5 h-4.5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white dark:bg-brand-navyCard border border-brand-primary/15 dark:border-brand-accent/30 flex items-center justify-center text-brand-primary dark:text-white hover:text-brand-accent hover:border-brand-accent transition-all shadow-card-light">
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white dark:bg-brand-navyCard border border-brand-primary/15 dark:border-brand-accent/30 flex items-center justify-center text-brand-primary dark:text-white hover:text-brand-accent hover:border-brand-accent transition-all shadow-card-light">
                <Twitter className="w-4.5 h-4.5" />
              </a>
              <a href="https://dribbble.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white dark:bg-brand-navyCard border border-brand-primary/15 dark:border-brand-accent/30 flex items-center justify-center text-brand-primary dark:text-white hover:text-brand-accent hover:border-brand-accent transition-all shadow-card-light">
                <Dribbble className="w-4.5 h-4.5" />
              </a>
            </div>
            <div className="font-mono text-xs text-brand-bodyText dark:text-muted-dim font-bold space-y-1">
              <div>STUDIO HQ: San Francisco • New York • Remote</div>
              <div>GENERAL INQUIRIES: hello@qorvex.com</div>
            </div>
          </div>

        </div>

        {/* Giant Kinetic Brand Logo Banner with Full "QORVEX" Word Visibility (No Clipping of X!) */}
        <div className="relative py-12 border-t border-brand-primary/15 dark:border-brand-accent/20 w-full flex items-center justify-center overflow-hidden">
          <div className="font-display font-black text-4xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10.5rem] tracking-tight leading-none text-center text-brand-primary/15 dark:text-white/15 select-none hover:text-brand-accent/20 transition-colors w-full px-2">
            QORVEX
          </div>
        </div>

        {/* Bottom Copyright & Back-to-Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-brand-primary/15 dark:border-brand-accent/20 font-mono text-xs text-brand-bodyText dark:text-muted-dim font-bold">
          <div>
            © {new Date().getFullYear()} QORVEX STUDIO INC. ALL RIGHTS RESERVED.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-brand-accent hover:text-brand-primary dark:hover:text-white transition-colors"
            data-cursor="hover"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
