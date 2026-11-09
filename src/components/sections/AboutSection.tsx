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
        className="mb-14 space-y-2"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold drop-shadow-sm">
          Background
        </span>
        <h2 className="font-display text-section-fluid text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
          About Me
        </h2>
        <p className="text-slate-300 text-base max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
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
            glareColor="rgba(6, 182, 212, 0.18)"
            className="glass-card p-6 sm:p-8 flex flex-col justify-between border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_16px_36px_-8px_rgba(6,182,212,0.2)] transition-all rounded-[20px] flex-1"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 flex items-center justify-center shrink-0">
                  <TerminalIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {PERSONAL_INFO.fullName}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400">
                    Full-Stack &amp; 3D Web Engineering
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 text-slate-200 text-sm sm:text-base leading-relaxed">
                <p>
                  I'm a developer who enjoys building software where visual craft meets backend reliability. Over the past year, I built <span className="text-white font-medium">InnerSight</span>, an interactive 3D hospital wayfinding tool in Three.js, and <span className="text-white font-medium">KarigarKart</span>, an inventory and order management platform built with FastAPI and Flutter.
                </p>
                <p className="text-slate-300 text-sm">
                  I care about practical system design: clean REST endpoints, normalized database schemas, and efficient algorithms like A* for spatial graphs. When I'm not writing application code, I study core computer science fundamentals and publish small developer utilities like RouteGuard.
                </p>
              </div>
            </div>

            <div className="pt-5 border-t border-white/[0.08] mt-6 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Primary Focus:</span>
              <span className="text-cyan-300 font-medium">Three.js / WebGL • FastAPI • TypeScript</span>
            </div>
          </TiltCard>
        </motion.div>

        {/* Education & Focus Card (spans 5 cols) */}
        <motion.div variants={staggerItemVariants} className="lg:col-span-5 flex flex-col">
          <TiltCard
            glareColor="rgba(139, 92, 246, 0.18)"
            className="glass-card p-6 sm:p-8 flex flex-col justify-between border border-white/10 hover:border-violet-400/40 hover:shadow-[0_16px_36px_-8px_rgba(139,92,246,0.2)] transition-all rounded-[20px] flex-1"
          >
            <div className="space-y-6">
              <h3 className="font-display text-lg font-bold text-white">
                Education &amp; Availability
              </h3>

              <div className="space-y-4">
                {/* Academic Item */}
                <div className="flex items-start gap-3.5 group">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2, ease: SHARED_EASE }}
                    className="p-2.5 rounded-[12px] bg-cyan-600/15 border border-cyan-500/25 text-cyan-400 shrink-0"
                  >
                    <GraduationCapIcon className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      BTech in Computer Science
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Core focus: Data Structures, Algorithms, DBMS, and OS
                    </p>
                    <p className="text-xs text-cyan-400 font-mono mt-1">
                      2nd Year • In Progress
                    </p>
                  </div>
                </div>

                {/* Location & Relocation */}
                <div className="flex items-start gap-3.5 group">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ duration: 0.2, ease: SHARED_EASE }}
                    className="p-2.5 rounded-[12px] bg-violet-600/15 border border-violet-500/25 text-violet-400 shrink-0"
                  >
                    <MapPinIcon className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Location</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {PERSONAL_INFO.location}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Open to remote and on-site relocation
                    </p>
                  </div>
                </div>

                {/* Internship Window */}
                <div className="flex items-start gap-3.5 group">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2, ease: SHARED_EASE }}
                    className="p-2.5 rounded-[12px] bg-emerald-600/15 border border-emerald-500/25 text-emerald-400 shrink-0"
                  >
                    <TerminalIcon className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Internship Window</h4>
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
