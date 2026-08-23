import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Sun, Moon, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import QorvexLogo from './QorvexLogo';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateFavicon = (dark: boolean) => {
    const faviconElement = document.getElementById('dynamic-favicon') as HTMLLinkElement | null;
    if (faviconElement) {
      faviconElement.href = dark ? '/favicon-dark.svg' : '/favicon-light.png';
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('qorvex_theme');
    const initialDark = savedTheme ? savedTheme === 'dark' : true;
    
    setIsDark(initialDark);
    if (initialDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    updateFavicon(initialDark);
  }, []);

  const toggleDarkMode = () => {
    const nextState = !isDark;
    setIsDark(nextState);
    localStorage.setItem('qorvex_theme', nextState ? 'dark' : 'light');
    if (nextState) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    updateFavicon(nextState);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-white/95 dark:bg-brand-navyDark/95 backdrop-blur-xl border-b border-brand-primary/10 dark:border-brand-darkBorder shadow-glass'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Left: Official Qorvex Logo */}
        <Link to="/" className="group flex-shrink-0" data-cursor="hover">
          <QorvexLogo size={42} showText={true} variant="colored" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-brand-primary dark:text-white">
          <a href="#services" className="hover:text-brand-accent transition-colors" data-cursor="hover">
            Services
          </a>
          <a href="#work" className="hover:text-brand-accent transition-colors" data-cursor="hover">
            Selected Work
          </a>
          <a href="#process" className="hover:text-brand-accent transition-colors" data-cursor="hover">
            Process
          </a>
          <a href="#team" className="hover:text-brand-accent transition-colors" data-cursor="hover">
            Team
          </a>
          <a href="#contact" className="hover:text-brand-accent transition-colors" data-cursor="hover">
            Contact
          </a>
          <Link
            to="/admin"
            className="flex items-center gap-1.5 text-xs text-brand-primary dark:text-brand-accent hover:text-brand-accent font-mono font-bold border-2 border-brand-primary/20 dark:border-brand-accent/40 hover:border-brand-accent px-3 py-1.5 rounded-lg transition-colors"
            title="CMS Admin Portal"
            data-cursor="hover"
          >
            <ShieldCheck className="w-4 h-4 text-brand-accent" />
            Admin CMS
          </Link>
        </nav>

        {/* Right Actions: Full Website Dark Mode Toggle & CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl bg-brand-bgLight dark:bg-brand-navyCard border border-brand-primary/15 dark:border-brand-darkBorder text-brand-primary dark:text-brand-accent hover:border-brand-accent transition-all shadow-card-light"
            title={isDark ? "Switch Website & Favicon to Light Mode" : "Switch Website & Favicon to Dark Mode"}
            data-cursor="hover"
          >
            {isDark ? (
              <Sun className="w-4.5 h-4.5 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-brand-primary" />
            )}
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex relative group items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-brand-accent text-white font-bold text-xs sm:text-sm tracking-wide shadow-glow-teal hover:bg-brand-hover transition-all transform hover:-translate-y-0.5"
            data-cursor="hover"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-brand-bgLight dark:bg-brand-navyCard border border-brand-primary/15 dark:border-brand-darkBorder text-brand-primary dark:text-white hover:border-brand-accent transition-colors"
            aria-label="Toggle Mobile Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/98 dark:bg-brand-navyDark/98 border-b border-brand-primary/15 dark:border-brand-darkBorder backdrop-blur-2xl overflow-hidden px-6 py-6"
          >
            <nav className="flex flex-col space-y-4 font-bold text-base text-brand-primary dark:text-white">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-brand-accent transition-colors py-1 border-b border-brand-primary/5 dark:border-brand-darkBorder/50"
              >
                Services
              </a>
              <a
                href="#work"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-brand-accent transition-colors py-1 border-b border-brand-primary/5 dark:border-brand-darkBorder/50"
              >
                Selected Work
              </a>
              <a
                href="#process"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-brand-accent transition-colors py-1 border-b border-brand-primary/5 dark:border-brand-darkBorder/50"
              >
                Process
              </a>
              <a
                href="#team"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-brand-accent transition-colors py-1 border-b border-brand-primary/5 dark:border-brand-darkBorder/50"
              >
                Team
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-brand-accent transition-colors py-1 border-b border-brand-primary/5 dark:border-brand-darkBorder/50"
              >
                Contact
              </a>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm text-brand-accent font-mono py-2"
              >
                <ShieldCheck className="w-4 h-4" />
                Admin CMS Portal
              </Link>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-brand-accent text-white font-bold text-sm shadow-glow-teal mt-2"
              >
                Start a Project
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
