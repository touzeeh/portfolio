'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '@/data/portfolioData';
import { TiltCard } from '@/components/ui/TiltCard';
import {
  scrollRevealVariants,
  staggerGridVariants,
  staggerItemVariants,
  VIEWPORT_CONFIG,
  SHARED_EASE,
} from '@/lib/animations';

export const SkillsSection: React.FC = () => {

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
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold drop-shadow-sm">
          Technical Stack
        </span>
        <h2 className="font-display text-section-fluid text-[var(--text)] tracking-tight">
          Skills &amp; Capabilities
        </h2>
        <p className="text-[var(--text-muted)] text-base max-w-xl">
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
            <TiltCard
              glareColor="rgba(255, 255, 255, 0.04)"
              className="glass-card p-6 sm:p-7 flex flex-col justify-between h-full border border-[var(--border)] hover:border-[var(--accent)]/40 hover:shadow-xl transition-all rounded-[20px]"
            >
              <div className="space-y-4">
                {/* Category Header with pulsing status aura */}
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    <span
                      className="animate-ping absolute inline-flex h-4 w-4 rounded-full opacity-60"
                      style={{ backgroundColor: category.accentColor }}
                    />
                    <span
                      className="relative w-3.5 h-3.5 rounded-full shrink-0 shadow-[0_0_12px_currentColor]"
                      style={{ backgroundColor: category.accentColor, color: category.accentColor }}
                    />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    {category.name}
                  </h3>
                </div>

                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {category.description}
                </p>

                {/* Prominent, readable skill chips with interactive spring hover */}
                <div className="flex flex-wrap gap-2 pt-3">
                  {category.items.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ y: -4, scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.18, ease: SHARED_EASE }}
                      className="px-3.5 py-2 rounded-lg text-sm font-mono font-medium bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] transition-all cursor-default shadow-sm select-none"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
