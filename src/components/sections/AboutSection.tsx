'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { GraduationCapIcon, MapPinIcon, TerminalIcon } from '@/components/ui/Icons';
import { TiltCard } from '@/components/ui/TiltCard';
import {
  scrollRevealVariants,
  staggerGridVariants,
  staggerItemVariants,
  VIEWPORT_CONFIG,
  SHARED_EASE,
} from '@/lib/animations';

export const AboutSection: React.FC = () => {

  return (
    <section id="about" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={scrollRevealVariants}
        className="mb-8 sm:mb-14 space-y-2"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold drop-shadow-sm">
          Background
        </span>
        <h2 className="font-display text-section-fluid text-[var(--text)] tracking-tight">
          About Me
        </h2>
        <p className="text-[var(--text-muted)] text-base max-w-xl">
          Background, technical interests, and current focus areas.
        </p>
      </motion.div>

      {/* Grid: 2 columns on desktop */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={staggerGridVariants}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 items-stretch"
      >
        {/* Story Card (spans 7 cols) */}
        <motion.div variants={staggerItemVariants} className="lg:col-span-7 flex flex-col">
          <TiltCard
            glareColor="rgba(34, 211, 238, 0.12)"
            className="glass-card p-4 sm:p-8 flex flex-col justify-between rounded-[20px] flex-1"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-3.5">
                <div className="glass-subcard w-11 h-11 rounded-xl text-[var(--accent)] flex items-center justify-center shrink-0">
                  <TerminalIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[var(--text)]">
                    {PERSONAL_INFO.fullName}
                  </h3>
                  <p className="text-xs font-mono text-[var(--accent)]">
                    Full-Stack &amp; 3D Web Engineering
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 text-[var(--text)] text-sm sm:text-base leading-relaxed">
                <p>
                  I'm a developer who enjoys building software where visual craft meets backend reliability. Over the past year, I built <span className="text-[var(--text)] font-semibold">InnerSight</span>, an interactive 3D hospital wayfinding tool in Three.js, and <span className="text-[var(--text)] font-semibold">KarigarKart</span>, an inventory and order management platform built with FastAPI and Flutter.
                </p>
                <p className="text-[var(--text-muted)] text-sm">
                  I care about practical system design: clean REST endpoints, normalized database schemas, and efficient algorithms like A* for spatial graphs. When I'm not writing application code, I study core computer science fundamentals and publish small developer utilities like RouteGuard.
                </p>
              </div>
            </div>

            <div className="pt-5 border-t border-[var(--border)] mt-6 flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--text-muted)]">Primary Focus:</span>
              <span className="text-[var(--accent)] font-medium">Three.js / WebGL • FastAPI • TypeScript</span>
            </div>
          </TiltCard>
        </motion.div>

        {/* Education & Focus Card (spans 5 cols) */}
        <motion.div variants={staggerItemVariants} className="lg:col-span-5 flex flex-col">
          <TiltCard
            glareColor="rgba(167, 139, 250, 0.12)"
            className="glass-card p-4 sm:p-8 flex flex-col justify-between rounded-[20px] flex-1"
          >
            <div className="space-y-6">
              <h3 className="font-display text-lg font-bold text-[var(--text)]">
                Education &amp; Availability
              </h3>

              <div className="space-y-4">
                {/* Academic Item */}
                <div className="flex items-start gap-3.5 group">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2, ease: SHARED_EASE }}
                    className="glass-subcard p-2.5 rounded-[12px] text-cyan-400 shrink-0"
                  >
                    <GraduationCapIcon className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text)]">
                      BTech in Computer Science
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      Core focus: Data Structures, Algorithms, DBMS, and OS
                    </p>
                    <p className="text-xs text-[var(--accent)] font-mono mt-1">
                      2nd Year • In Progress
                    </p>
                  </div>
                </div>

                {/* Location & Relocation */}
                <div className="flex items-start gap-3.5 group">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ duration: 0.2, ease: SHARED_EASE }}
                    className="glass-subcard p-2.5 rounded-[12px] text-violet-400 shrink-0"
                  >
                    <MapPinIcon className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text)]">Location</h4>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      {PERSONAL_INFO.location}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      Open to remote and on-site relocation
                    </p>
                  </div>
                </div>

                {/* Internship Window */}
                <div className="flex items-start gap-3.5 group">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2, ease: SHARED_EASE }}
                    className="glass-subcard p-2.5 rounded-[12px] text-emerald-400 shrink-0"
                  >
                    <TerminalIcon className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text)]">Internship Window</h4>
                    <p className="text-xs text-emerald-300 mt-0.5 font-medium">
                      Available for Summer 2027 internships
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Full-Stack &amp; Frontend Web Engineering
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-white/[0.08] mt-6 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Status:</span>
              <span className="inline-flex items-center gap-2 text-emerald-400 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Open to opportunities</span>
              </span>
            </div>
          </TiltCard>
        </motion.div>
      </motion.div>
    </section>
  );
};
