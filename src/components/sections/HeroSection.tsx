'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PERSONAL_INFO } from '@/data/portfolioData';
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

  // Entrance sequence under 1.2s
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
        {/* Eyebrow Proof Row */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3">
          <motion.a
            href="#wins"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.05, y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            transition={{ duration: 0.2, ease: SHARED_EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-2)]/90 backdrop-blur-md border border-[var(--border)] hover:border-[var(--award)] text-xs font-mono font-medium text-[var(--award)] transition-all focus-visible:ring-2 focus-visible:ring-[var(--accent)] group hover:shadow-[0_0_18px_rgba(251,191,36,0.35)]"
            title="View Hackathon Awards"
          >
            <TrophyIcon className="w-3.5 h-3.5 text-[var(--award)] group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
            <span>{PERSONAL_INFO.proofHighlight}</span>
          </motion.a>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-2)]/90 backdrop-blur-md border border-[var(--border)] text-xs font-mono text-[var(--text-muted)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>{PERSONAL_INFO.status}</span>
          </div>
        </motion.div>

        {/* 1-Line Proof-Led Headline */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="font-display text-hero-fluid font-bold tracking-tight text-[var(--text)] max-w-2xl mx-auto">
            Hi, I'm <span className="text-gradient drop-shadow-[0_0_25px_rgba(34,211,238,0.3)]">{PERSONAL_INFO.fullName}</span>.
          </h1>
          <p className="text-xl sm:text-2xl md:text-[26px] font-medium text-[var(--text)] max-w-2xl mx-auto leading-relaxed">
            {PERSONAL_INFO.headline}
          </p>
        </motion.div>

        {/* Supporting Line */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl text-[var(--text-muted)] text-base sm:text-lg leading-relaxed max-w-[65ch]"
        >
          {PERSONAL_INFO.subheadline}
        </motion.p>

        {/* Action Row: Hero owns the only solid primary CTA with rich interactive animations */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
        >
          {/* Primary CTA (Solid fill with shimmer sweep & arrow motion) */}
          <motion.a
            href="#projects"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.05, y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            transition={{ duration: 0.2, ease: SHARED_EASE }}
            className="btn-primary group"
          >
            <span>View projects</span>
            <ArrowUpRightIcon className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
          </motion.a>

          {/* Secondary Outline CTA with document icon tilt */}
          <motion.a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.05, y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            transition={{ duration: 0.2, ease: SHARED_EASE }}
            className="btn-secondary group"
            aria-label="Download Resume (PDF)"
            title="Download 1-Page Resume PDF"
          >
            <FileTextIcon className="w-4 h-4 text-[var(--accent)] group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-200" />
            <span>Resume</span>
          </motion.a>

          {/* Labelled Social Links with spring rotation */}
          <div className="flex items-center gap-2 sm:ml-2">
            <motion.a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.15, rotate: 6, y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
              transition={{ duration: 0.2, ease: SHARED_EASE }}
              className="btn-icon"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <GithubIcon size={18} />
            </motion.a>

            <motion.a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.15, rotate: -6, y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
              transition={{ duration: 0.2, ease: SHARED_EASE }}
              className="btn-icon"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <LinkedinIcon size={18} />
            </motion.a>

            <motion.a
              href={`mailto:${PERSONAL_INFO.email}`}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.15, rotate: 6, y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
              transition={{ duration: 0.2, ease: SHARED_EASE }}
              className="btn-icon"
              aria-label="Send direct email"
              title="Send direct email"
            >
              <MailIcon size={18} />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
