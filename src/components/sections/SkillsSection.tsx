'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SITE_DATA } from '@/data/site';
import {
  scrollRevealVariants,
  staggerGridVariants,
  staggerItemVariants,
  VIEWPORT_CONFIG,
} from '@/lib/animations';

export const SkillsSection: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<{ name: string; project?: string } | null>(null);

  return (
    <section id="skills" className="section-padding max-w-6xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={scrollRevealVariants}
        className="mb-12 space-y-2"
      >
        <span className="eyebrow-label">
          02 / Skills
        </span>
        <h2 className="font-display text-section-fluid text-[var(--text)] tracking-tight">
          Technical Capabilities
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-[var(--text-muted)] text-base sm:text-lg max-w-xl leading-relaxed">
            Deduplicated toolset applied across spatial frontend rendering, relational databases, and REST APIs.
          </p>

          {/* Interactive Project Context Pill: Appears when hovering or focusing a skill */}
          <div className="min-h-[32px] flex items-center">
            {activeSkill?.project ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface-2)] border border-[var(--accent)] font-mono text-xs text-[var(--accent)] transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                <span>{activeSkill.name} → Applied in {activeSkill.project}</span>
              </span>
            ) : (
              <span className="font-mono text-xs text-[var(--text-muted)] opacity-60">
                Hover or focus any technology to see its project context
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Skills Grid: Grouped into 3 logical categories */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={staggerGridVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch"
      >
        {SITE_DATA.skills.map((category) => (
          <motion.div key={category.title} variants={staggerItemVariants} className="flex flex-col h-full">
            <div className="site-card p-6 sm:p-7 flex flex-col justify-between h-full space-y-5">
              <div className="space-y-3">
                <h3 className="font-display text-lg font-bold text-[var(--text)]">
                  {category.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Plain Chips (Sans 13-14px). Project shows on hover/focus, not inside text */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border)] mt-auto">
                {category.skills.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onMouseEnter={() => setActiveSkill({ name: item.name, project: item.relatedProject })}
                    onMouseLeave={() => setActiveSkill(null)}
                    onFocus={() => setActiveSkill({ name: item.name, project: item.relatedProject })}
                    onBlur={() => setActiveSkill(null)}
                    className="tech-chip text-left cursor-default focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    aria-label={`${item.name}${item.relatedProject ? ` (Used in ${item.relatedProject})` : ''}`}
                  >
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
