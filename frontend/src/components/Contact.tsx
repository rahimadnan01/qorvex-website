import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Mail, Calendar, ArrowUpRight } from 'lucide-react';
import { submitContactForm } from '../services/api';
import { ContactFormData } from '../types';

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    projectTypes: [],
    budgetRange: '$25k - $50k',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const projectOptions = [
    'Software & Web App',
    'UI/UX & 3D Spatial Design',
    'Technical SEO & Growth',
    'AI Workflows & LLMs',
    'Full Agency Retainer'
  ];

  const budgetOptions = ['$10k - $25k', '$25k - $50k', '$50k - $100k', '$100k+'];

  const toggleProjectType = (type: string) => {
    setFormData(prev => {
      const exists = prev.projectTypes.includes(type);
      return {
        ...prev,
        projectTypes: exists
          ? prev.projectTypes.filter(t => t !== type)
          : [...prev.projectTypes, type]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in your name, email, and message project details.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      await submitContactForm(formData);
      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-brand-bgLight dark:bg-brand-navyDark border-t border-brand-primary/10 dark:border-brand-darkBorder transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Headline & Direct Channels */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-px bg-brand-accent" />
              <span className="font-mono text-xs text-brand-accent tracking-widest uppercase font-bold">
                INITIATE PROJECT
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-brand-primary dark:text-white leading-tight mb-6">
              Let's Build <span className="text-gradient-teal">Something Industry-Defining</span>
            </h2>

            <p className="text-brand-bodyText dark:text-muted-dim text-base font-medium leading-relaxed mb-10">
              Have an ambitious vision, platform build, or SEO transformation? Fill out the project builder or connect directly with our founding partners.
            </p>

            {/* Direct Channels Cards */}
            <div className="space-y-4 mb-10">
              <a
                href="mailto:hello@qorvex.com"
                className="p-5 rounded-2xl bg-white dark:bg-brand-navyCard border border-brand-primary/15 dark:border-brand-darkBorder hover:border-brand-accent transition-all flex items-center justify-between group shadow-card-light"
                data-cursor="hover"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent text-white flex items-center justify-center font-bold">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-brand-accent uppercase font-bold">DIRECT EMAIL</div>
                    <div className="font-display font-extrabold text-brand-primary dark:text-white group-hover:text-brand-accent transition-colors">hello@qorvex.com</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-brand-primary dark:text-white group-hover:text-brand-accent transition-colors" />
              </a>

              <a
                href="https://calendly.com"
                target="_blank"
                rel="noreferrer"
                className="p-5 rounded-2xl bg-white dark:bg-brand-navyCard border border-brand-primary/15 dark:border-brand-darkBorder hover:border-brand-accent transition-all flex items-center justify-between group shadow-card-light"
                data-cursor="hover"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary dark:bg-brand-navyDark text-white flex items-center justify-center font-bold">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-brand-primary dark:text-brand-accent uppercase font-bold">BOOK A DISCOVERY CALL</div>
                    <div className="font-display font-extrabold text-brand-primary dark:text-white group-hover:text-brand-accent transition-colors">30-Min Founder Sync</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-brand-primary dark:text-white group-hover:text-brand-accent transition-colors" />
              </a>
            </div>

            {/* Studio Hours */}
            <div className="p-6 rounded-2xl bg-white dark:bg-brand-navyCard border border-brand-primary/15 dark:border-brand-darkBorder font-mono text-xs text-brand-primary dark:text-white font-bold shadow-card-light">
              <span className="text-brand-accent font-extrabold block mb-1">STUDIO SLA</span>
              Response time within 6 hours. NDA provided upon request.
            </div>
          </div>

          {/* Right Column: Interactive Project Builder Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-brand-navyCard p-8 sm:p-12 rounded-3xl border border-brand-primary/15 dark:border-brand-darkBorder shadow-card-light relative transition-colors">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16 flex flex-col items-center justify-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-brand-accent text-white flex items-center justify-center mb-6 shadow-glow-teal">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="font-display text-3xl font-extrabold text-brand-primary dark:text-white mb-3">
                      Project Brief Received
                    </h3>
                    <p className="text-brand-bodyText dark:text-muted-dim text-base font-medium max-w-md mb-8">
                      Thank you! One of our founding partners will review your requirements and reach out via email within 6 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', projectTypes: [], budgetRange: '$25k - $50k', message: '' });
                      }}
                      className="px-6 py-3 rounded-xl bg-brand-primary text-white font-mono text-xs font-bold hover:bg-brand-accent transition-colors"
                      data-cursor="hover"
                    >
                      SUBMIT ANOTHER BRIEF
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8 text-brand-primary dark:text-white"
                  >
                    {/* Project Types Selection */}
                    <div>
                      <label className="font-mono text-xs text-brand-accent tracking-wider uppercase block mb-3 font-bold">
                        01. SELECT PROJECT CAPABILITIES
                      </label>
                      <div className="flex flex-wrap gap-2.5">
                        {projectOptions.map((option) => {
                          const isSelected = formData.projectTypes.includes(option);
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => toggleProjectType(option)}
                              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
                                isSelected
                                  ? 'bg-brand-accent text-white shadow-glow-teal'
                                  : 'bg-brand-bgLight dark:bg-brand-navyDark border border-brand-primary/15 dark:border-brand-darkBorder text-brand-primary dark:text-white hover:border-brand-accent'
                              }`}
                              data-cursor="hover"
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Budget Selector */}
                    <div>
                      <label className="font-mono text-xs text-brand-accent tracking-wider uppercase block mb-3 font-bold">
                        02. ESTIMATED BUDGET TIER
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {budgetOptions.map((budget) => {
                          const isSelected = formData.budgetRange === budget;
                          return (
                            <button
                              key={budget}
                              type="button"
                              onClick={() => setFormData({ ...formData, budgetRange: budget })}
                              className={`py-2.5 rounded-xl font-mono text-xs font-bold transition-all text-center ${
                                isSelected
                                  ? 'bg-brand-primary text-white shadow-glow-navy'
                                  : 'bg-brand-bgLight dark:bg-brand-navyDark border border-brand-primary/15 dark:border-brand-darkBorder text-brand-primary dark:text-white hover:border-brand-accent'
                              }`}
                              data-cursor="hover"
                            >
                              {budget}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Direct Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="font-mono text-xs text-brand-primary dark:text-white font-bold block mb-2">YOUR NAME *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Alexander Vance"
                          className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-brand-navyDark border border-slate-300 dark:border-brand-darkBorder text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 font-semibold text-sm focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 focus:outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="font-mono text-xs text-brand-primary dark:text-white font-bold block mb-2">WORK EMAIL *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="vance@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-brand-navyDark border border-slate-300 dark:border-brand-darkBorder text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 font-semibold text-sm focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Message Details */}
                    <div>
                      <label className="font-mono text-xs text-brand-primary dark:text-white font-bold block mb-2">PROJECT GOALS & TIMELINE *</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your product goals, timeline, and key requirements..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-brand-navyDark border border-slate-300 dark:border-brand-darkBorder text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 font-semibold text-sm focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 focus:outline-none transition-all resize-none"
                      />
                    </div>

                    {errorMessage && (
                      <div className="p-3 rounded-lg bg-red-100 border border-red-300 text-red-800 font-mono text-xs font-bold">
                        {errorMessage}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 rounded-xl bg-brand-accent text-white font-display font-extrabold text-sm uppercase tracking-wider hover:bg-brand-hover transition-all shadow-glow-teal flex items-center justify-center gap-2"
                      data-cursor="hover"
                    >
                      {submitting ? (
                        <span>TRANSMITTING BRIEF...</span>
                      ) : (
                        <>
                          <span>Send Project Brief</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
