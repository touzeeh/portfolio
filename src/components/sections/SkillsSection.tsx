'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SKILL_CATEGORIES } from '@/data/portfolioData';
import {
  scrollRevealVariants,
  staggerGridVariants,
  staggerItemVariants,
  VIEWPORT_CONFIG,
  SHARED_EASE,
} from '@/lib/animations';

export const SkillsSection: React.FC = () => {
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
    <section id="skills" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header Scroll Reveal */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={scrollRevealVariants}
        className="mb-14 space-y-2"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold drop-shadow-sm">
          Technical Stack
        </span>
        <h2 className="font-display text-section-fluid text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
          Skills &amp; Capabilities
        </h2>
        <p className="text-slate-300 text-base max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
          Core technical competencies across frontend, backend systems, databases, and spatial web graphics.
        </p>
      </motion.div>

      {/* 3 Focused Cards Grid with 70ms stagger */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={staggerGridVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7"
      >
        {SKILL_CATEGORIES.map((category) => (
          <motion.div
            key={category.name}
            variants={staggerItemVariants}
            className="h-full"
          >
            <motion.div
              initial="initial"
              whileHover="hover"
              variants={cardVariants}
              className="glass-card p-6 sm:p-7 flex flex-col justify-between h-full border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_16px_36px_-8px_rgba(6,182,212,0.18)] transition-colors rounded-[20px]"
              style={{ willChange: 'transform' }}
            >
              <div className="space-y-4">
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: category.accentColor }}
                  />
                  <h3 className="font-display text-lg font-bold text-white">
                    {category.name}
                  </h3>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {category.description}
                </p>

                {/* Prominent, readable skill chips */}
                <div className="flex flex-wrap gap-2 pt-3">
                  {category.items.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                      transition={{ duration: 0.2, ease: SHARED_EASE }}
                      className="px-3.5 py-2 rounded-lg text-sm font-mono font-medium bg-slate-900 border border-white/10 text-slate-200 hover:border-cyan-400/50 hover:text-white transition-colors cursor-default shadow-sm"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
