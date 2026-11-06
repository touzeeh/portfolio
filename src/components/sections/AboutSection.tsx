'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { GraduationCapIcon, MapPinIcon, CalendarIcon } from '@/components/ui/Icons';
import {
  scrollRevealVariants,
  staggerGridVariants,
  staggerItemVariants,
  VIEWPORT_CONFIG,
  SHARED_EASE,
} from '@/lib/animations';

export const AboutSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = {
    initial: { y: 0 },
    hover: {
      y: shouldReduceMotion ? 0 : -5,
      transition: {
        duration: 0.25,
        ease: SHARED_EASE,
      },
    },
  };

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
          Engineering trajectory, academic foundation, and technical focus.
        </p>
      </motion.div>

      {/* Grid: 2 columns on desktop with stagger */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={staggerGridVariants}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7"
      >
        {/* Story Card (spans 7 cols) */}
        <motion.div variants={staggerItemVariants} className="lg:col-span-7 h-full">
          <motion.div
            initial="initial"
            whileHover="hover"
            variants={cardVariants}
            className="glass-card p-6 sm:p-8 h-full flex flex-col justify-between border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_16px_36px_-8px_rgba(6,182,212,0.18)] transition-colors rounded-[20px]"
            style={{ willChange: 'transform' }}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                {/* Photo / Avatar Placeholder */}
                <div className="w-16 h-16 rounded-[14px] bg-gradient-to-tr from-cyan-500 to-violet-600 p-[2px] shrink-0">
                  <div className="w-full h-full rounded-[12px] bg-slate-950 flex items-center justify-center font-display font-bold text-lg text-white">
                    TA
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {PERSONAL_INFO.fullName}
                  </h3>
                  <p className="text-sm text-cyan-400 font-mono">
                    2nd-Year Computer Science Student
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-slate-200 text-base leading-relaxed">
                <p className="text-base font-medium text-slate-100">
                  {PERSONAL_INFO.bio}
                </p>
                <p className="text-sm text-slate-300">
                  Currently studying at LNCT Bhopal, balancing core computer science coursework (DSA, OOP, DBMS, OS) with hands-on full-stack development, 3D WebGL implementations, and microservices in Python and TypeScript.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08] mt-6 flex items-center justify-between">
              <div className="text-xs text-slate-300 font-mono">
                Class of <span className="text-white font-semibold">{PERSONAL_INFO.graduatingYear}</span>
              </div>
              <span className="text-xs font-mono text-cyan-400">
                LNCT Bhopal • CSE
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Education & Quick Facts Card (spans 5 cols) */}
        <motion.div variants={staggerItemVariants} className="lg:col-span-5 flex flex-col gap-6 h-full">
          <motion.div
            initial="initial"
            whileHover="hover"
            variants={cardVariants}
            className="glass-card p-6 sm:p-8 h-full flex flex-col justify-between border border-white/10 hover:border-violet-400/40 hover:shadow-[0_16px_36px_-8px_rgba(139,92,246,0.18)] transition-colors rounded-[20px]"
            style={{ willChange: 'transform' }}
          >
            <div className="space-y-6">
              <h3 className="font-display text-lg font-bold text-white">
                Education &amp; Focus
              </h3>

              <div className="space-y-5">
                {/* Education Item */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-[12px] bg-cyan-600/15 border border-cyan-500/25 text-cyan-400 mt-1 shrink-0">
                    <GraduationCapIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {PERSONAL_INFO.degree}
                    </h4>
                    <p className="text-sm text-slate-300 mt-0.5">
                      {PERSONAL_INFO.institution}
                    </p>
                    <p className="text-xs text-slate-400 mt-1 font-mono">
                      {PERSONAL_INFO.year} • 2025–2029
                    </p>
                  </div>
                </div>

                {/* Location Item */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-[12px] bg-violet-600/15 border border-violet-500/25 text-violet-400 mt-1 shrink-0">
                    <MapPinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Location</h4>
                    <p className="text-sm text-slate-300 mt-0.5">
                      {PERSONAL_INFO.location}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Available for remote &amp; on-site internships
                    </p>
                  </div>
                </div>

                {/* Shipped Work */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-[12px] bg-emerald-600/15 border border-emerald-500/25 text-emerald-400 mt-1 shrink-0">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Core Focus</h4>
                    <p className="text-sm text-slate-300 mt-0.5">
                      Full-Stack Web &amp; 3D Spatial Systems
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      3 shipped projects actively maintained
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08] mt-6">
              <span className="text-xs font-mono text-slate-300">
                Core: Python, TypeScript, JavaScript, Dart
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
