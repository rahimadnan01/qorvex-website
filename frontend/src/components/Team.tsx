import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Facebook, Instagram, Quote } from 'lucide-react';
import { getTeam } from '../services/api';
import { TeamMember } from '../types';

export default function Team() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  useEffect(() => {
    getTeam()
      .then((data) => setTeam(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="team" className="py-32 bg-brand-bgLight dark:bg-brand-navyDark border-t border-brand-primary/10 dark:border-brand-darkBorder transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-12 h-px bg-brand-accent" />
              <span className="font-mono text-xs text-brand-accent tracking-widest uppercase font-bold">
                FOUNDING PARTNERS
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-brand-primary dark:text-white">
              Core • Vision • <span className="text-gradient-teal">Execution</span>
            </h2>
          </div>
          <p className="max-w-md text-brand-bodyText dark:text-muted-dim text-base font-medium leading-relaxed">
            Led by senior founders bridging engineering precision, visual craft, and growth strategy.
          </p>
        </div>

        {/* Team Cards Grid */}
        {loading ? (
          <div className="w-full py-20 text-center font-mono text-xs font-bold text-brand-primary dark:text-white">
            FETCHING TEAM PROFILES FROM REST API...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => {
              const isHovered = hoveredMember === member._id;
              const s = member.socials || {};

              return (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  onMouseEnter={() => setHoveredMember(member._id)}
                  onMouseLeave={() => setHoveredMember(null)}
                  className="rounded-2xl overflow-hidden flex flex-col justify-between group shadow-card-light bg-brand-primary dark:bg-brand-navyCard border border-transparent dark:border-brand-darkBorder transition-colors"
                  data-cursor="hover"
                >
                  {/* Photo Container */}
                  <div className="relative h-80 w-full overflow-hidden bg-brand-primary">
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className={`w-full h-full object-cover object-center transition-all duration-700 ${
                        isHovered ? 'scale-105 contrast-125' : 'contrast-110'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/30 to-transparent" />
                    
                    {/* Pillar Badge */}
                    <div className="absolute top-4 left-4 font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-brand-accent text-white backdrop-blur-md shadow-glow-teal">
                      {member.pillar} PILLAR
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="p-8 flex flex-col justify-between flex-1 bg-brand-primary dark:bg-brand-navyCard">
                    <div>
                      <h3 className="font-display text-2xl font-extrabold text-white group-hover:text-brand-accent transition-colors mb-1">
                        {member.name}
                      </h3>
                      <div className="font-mono text-xs font-bold text-brand-accent mb-4">
                        {member.role}
                      </div>

                      <p className="text-white dark:text-muted-dim text-sm font-medium leading-relaxed mb-6">
                        {member.bio}
                      </p>

                      {/* Philosophy Quote */}
                      <div className="p-4 rounded-xl bg-brand-navyDark border border-white/10 relative mb-6">
                        <Quote className="w-4 h-4 text-brand-accent mb-2" />
                        <p className="font-mono text-xs text-white font-bold italic">
                          "{member.philosophy}"
                        </p>
                      </div>
                    </div>

                    {/* Dynamic Social Handles */}
                    <div className="border-t border-white/10 pt-4 flex flex-wrap items-center gap-4 text-white">
                      {s.linkedin && (
                        <a href={s.linkedin} target="_blank" rel="noreferrer" className="hover:text-brand-accent transition-colors" title="LinkedIn Profile">
                          <Linkedin className="w-4.5 h-4.5" />
                        </a>
                      )}
                      {s.email && (
                        <a href={s.email.startsWith('mailto:') ? s.email : `mailto:${s.email}`} className="hover:text-brand-accent transition-colors" title={`Send Email to ${member.name}`}>
                          <Mail className="w-4.5 h-4.5" />
                        </a>
                      )}
                      {s.github && (
                        <a href={s.github} target="_blank" rel="noreferrer" className="hover:text-brand-accent transition-colors" title="GitHub Profile">
                          <Github className="w-4.5 h-4.5" />
                        </a>
                      )}
                      {s.facebook && (
                        <a href={s.facebook} target="_blank" rel="noreferrer" className="hover:text-brand-accent transition-colors" title="Facebook Profile">
                          <Facebook className="w-4.5 h-4.5" />
                        </a>
                      )}
                      {s.instagram && (
                        <a href={s.instagram} target="_blank" rel="noreferrer" className="hover:text-brand-accent transition-colors" title="Instagram Profile">
                          <Instagram className="w-4.5 h-4.5" />
                        </a>
                      )}
                      {s.twitter && (
                        <a href={s.twitter} target="_blank" rel="noreferrer" className="hover:text-brand-accent transition-colors" title="Twitter / X Profile">
                          <Twitter className="w-4.5 h-4.5" />
                        </a>
                      )}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
