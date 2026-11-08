'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SITE_DATA } from '@/data/site';
import { FileTextIcon, TerminalIcon } from '@/components/ui/Icons';
import {
  scrollRevealVariants,
  staggerGridVariants,
  staggerItemVariants,
  VIEWPORT_CONFIG,
} from '@/lib/animations';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section-padding max-w-6xl mx-auto px-4 sm:px-6">
      {/* Section Header with Numbered Eyebrow */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={scrollRevealVariants}
        className="mb-12 space-y-2"
      >
        <span className="eyebrow-label">
          04 / About
        </span>
        <h2 className="font-display text-section-fluid text-[var(--text)] tracking-tight">
          Background & Technical Focus
        </h2>
        <p className="text-[var(--text-muted)] text-base sm:text-lg max-w-2xl leading-relaxed">
          How I approach software architecture, spatial visualization, and backend system engineering.
        </p>
      </motion.div>

      {/* Grid: 2 Columns (Narrative & Facts) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={staggerGridVariants}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch"
      >
        {/* Narrative Card (Spans 7 Cols) */}
        <motion.div variants={staggerItemVariants} className="lg:col-span-7 flex flex-col h-full">
          <div className="site-card p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
            <div className="flex items-center gap-4 pb-4 border-b border-[var(--border)]">
              {/* Photo Slot with Initials Fallback */}
              <div
                className="w-14 h-14 rounded-[12px] bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center font-display font-bold text-lg text-[var(--accent)] shrink-0 shadow-sm"
                aria-label="Profile Initials Fallback"
              >
                <span>TA</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-[var(--text)]">
                  {SITE_DATA.personal.fullName}
                </h3>
                <p className="text-xs font-mono text-[var(--accent)]">
                  {SITE_DATA.personal.title}
                </p>
              </div>
            </div>

            {/* 3 Short First-Person Paragraphs */}
            <div className="space-y-4 text-base leading-relaxed text-[var(--text)] max-w-[65ch]">
              {SITE_DATA.about.paragraphs.map((p, idx) => (
                <p key={idx} className="text-[var(--text)]">
                  {p}
                </p>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-[var(--border)] mt-auto flex flex-wrap items-center gap-3">
              <a
                href={SITE_DATA.personal.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-xs"
              >
                <FileTextIcon className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Download Resume (PDF)</span>
              </a>
              <a
                href="#contact"
                className="btn-ghost text-xs"
              >
                <span>Get in touch →</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Facts List Card (Spans 5 Cols) */}
        <motion.div variants={staggerItemVariants} className="lg:col-span-5 flex flex-col h-full">
          <div className="site-card p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
            <div>
              <span className="eyebrow-label text-[var(--accent)]">
                Verified Facts
              </span>
              <h3 className="font-display text-xl font-bold text-[var(--text)] mt-1">
                At a Glance
              </h3>
            </div>

            <div className="space-y-4">
              {SITE_DATA.about.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="p-3.5 rounded-[12px] bg-[var(--surface-2)] border border-[var(--border)]"
                >
                  <span className="eyebrow-label block mb-1">
                    {fact.label}
                  </span>
                  <span className="font-sans text-sm font-semibold text-[var(--text)]">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Floorplan Signature Accent Micro-Card */}
            <div className="p-4 rounded-[12px] bg-[var(--surface-2)] border border-[var(--border)] flex items-start gap-3 mt-auto">
              <TerminalIcon className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Currently building experimental indoor navigation meshes and deterministic token bucket algorithms.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
