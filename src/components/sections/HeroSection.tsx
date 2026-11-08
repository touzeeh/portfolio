'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SITE_DATA } from '@/data/site';
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  FileTextIcon,
  ArrowUpRightIcon,
  TrophyIcon,
} from '@/components/ui/Icons';
import { SHARED_EASE } from '@/lib/animations';

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Entrance sequence finishing under 1.2s
  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        ease: SHARED_EASE,
      },
    },
  };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 pt-32 pb-20 max-w-6xl mx-auto"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-6"
      >
        {/* Eyebrow Proof Row: Hackathon 1st Place + Summer 2027 Availability */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={SITE_DATA.personal.highlightAward.href}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--award)] text-xs font-mono font-medium text-[var(--award)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            title="View Hackathon Proof"
          >
            <TrophyIcon className="w-3.5 h-3.5 text-[var(--award)]" />
            <span>
              {SITE_DATA.personal.highlightAward.placement} • {SITE_DATA.personal.highlightAward.eventName}
            </span>
          </a>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-2)] border border-[var(--border)] text-xs font-mono text-[var(--text-muted)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
            <span>{SITE_DATA.personal.availability}</span>
          </div>
        </motion.div>

        {/* 1-Line Proof-Led Headline: Calm, precise, premium */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="font-display text-hero-fluid font-bold tracking-tight text-[var(--text)] max-w-2xl mx-auto">
            Hi, I'm <span className="text-gradient">{SITE_DATA.personal.fullName}</span>.
          </h1>
          <p className="text-xl sm:text-2xl md:text-[26px] font-medium text-[var(--text)] max-w-2xl mx-auto leading-relaxed">
            {SITE_DATA.personal.headline}
          </p>
        </motion.div>

        {/* Supporting Line: Grounded facts, no buzzwords */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl text-[var(--text-muted)] text-base sm:text-lg leading-relaxed max-w-[65ch]"
        >
          {SITE_DATA.personal.supportingLine}
        </motion.p>

        {/* Action Row: Hero owns the only solid primary CTA */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
        >
          {/* Primary CTA (Solid fill) */}
          <a
            href="#projects"
            className="btn-primary"
          >
            <span>View projects</span>
            <ArrowUpRightIcon className="w-4 h-4" />
          </a>

          {/* Secondary Outline CTA */}
          <a
            href={SITE_DATA.personal.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            aria-label="Download Resume (PDF)"
            title="Download 1-Page Resume PDF"
          >
            <FileTextIcon className="w-4 h-4 text-[var(--accent)]" />
            <span>Resume</span>
          </a>

          {/* Labelled Social Links */}
          <div className="flex items-center gap-2 sm:ml-2">
            <a
              href={SITE_DATA.personal.github}
              target="_blank"
              rel="noreferrer"
              className="btn-icon"
              aria-label="GitHub Profile (github.com/touzeeh)"
              title="GitHub Profile"
            >
              <GithubIcon size={18} />
            </a>

            <a
              href={SITE_DATA.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-icon"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <LinkedinIcon size={18} />
            </a>

            <a
              href={`mailto:${SITE_DATA.personal.email}`}
              className="btn-icon"
              aria-label={`Email ${SITE_DATA.personal.fullName} (${SITE_DATA.personal.email})`}
              title="Send Direct Email"
            >
              <MailIcon size={18} />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
