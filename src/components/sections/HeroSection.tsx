'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PERSONAL_INFO } from '@/data/portfolioData';
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  FileTextIcon,
  ArrowDownIcon,
  ArrowUpRightIcon,
  TrophyIcon,
} from '@/components/ui/Icons';
import { SHARED_EASE } from '@/lib/animations';

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Entrance sequence under 1s
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
      y: shouldReduceMotion ? 0 : 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.42,
        ease: SHARED_EASE,
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 pt-28 pb-16"
    >
      {/* Targeted radial backdrop */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_center,rgba(3,7,18,0.78)_0%,rgba(3,7,18,0.4)_60%,transparent_90%)] pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6"
      >
        {/* 1. Leading with Proof: Hackathon 1st Place + Summer 2027 Internship Availability */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-2.5">
          <a
            href="#wins"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-medium text-amber-300 backdrop-blur-md shadow-lg shadow-black/50 hover:border-amber-400/70 hover:text-amber-200 transition-colors"
            title="View Hackathon Awards"
          >
            <TrophyIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>{PERSONAL_INFO.proofHighlight}</span>
          </a>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/90 border border-emerald-500/35 text-xs font-mono text-emerald-300 backdrop-blur-xl shadow-lg shadow-black/50">
            <span className="relative flex h-2 w-2 shrink-0">
              {!shouldReduceMotion && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              )}
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>{PERSONAL_INFO.status}</span>
          </div>
        </motion.div>

        {/* 2. Headline: Bold & Proof-First */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="font-display text-hero-fluid font-bold tracking-tight text-white max-w-3xl mx-auto drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
            Hi, I'm{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-violet-300 to-cyan-300 bg-[length:200%_auto] hover:brightness-110 transition-all">
              {PERSONAL_INFO.fullName}
            </span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-100 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {PERSONAL_INFO.headline}
          </p>
        </motion.div>

        {/* 3. Subtext with Verified Engineering Focus */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl text-slate-300 text-base sm:text-lg leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        >
          {PERSONAL_INFO.subheadline}
        </motion.p>

        {/* 4. Action Row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
        >
          {/* Primary Action Button (Distinct styling that doesn't compete with Navbar Connect) */}
          <motion.a
            href="#projects"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.2, ease: SHARED_EASE }}
            className="btn-secondary px-7 py-3.5 text-sm sm:text-base font-semibold group border-cyan-400/40 hover:border-cyan-400 text-white shadow-lg shadow-cyan-500/10"
          >
            <span>Explore Projects</span>
            <ArrowUpRightIcon className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.2, ease: SHARED_EASE }}
            className="btn-secondary px-6 py-3.5 text-sm sm:text-base font-medium"
            aria-label="Download Resume PDF"
            title="Download ATS-Friendly Resume PDF"
          >
            <FileTextIcon className="w-4 h-4 text-cyan-400" />
            <span>Download Resume</span>
          </motion.a>

          {/* Icon Links with Explicit Accessible Tooltips */}
          <div className="flex items-center gap-2 sm:ml-2">
            <motion.a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.12, y: -3 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
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
              whileHover={shouldReduceMotion ? undefined : { scale: 1.12, y: -3 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
              transition={{ duration: 0.2, ease: SHARED_EASE }}
              className="btn-icon text-cyan-400 hover:text-cyan-300"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <LinkedinIcon size={18} />
            </motion.a>

            <motion.a
              href={`mailto:${PERSONAL_INFO.email}`}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.12, y: -3 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
              transition={{ duration: 0.2, ease: SHARED_EASE }}
              className="btn-icon text-violet-400 hover:text-violet-300"
              aria-label="Email Touzeeh"
              title="Send Direct Email"
            >
              <MailIcon size={18} />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      {/* Down Arrow Indicator */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0, y: 10 }}
        animate={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, 6, 0] }}
        transition={
          shouldReduceMotion
            ? { delay: 0.6, duration: 0.35, ease: SHARED_EASE }
            : {
                repeat: Infinity,
                duration: 2.2,
                ease: 'easeInOut',
              }
        }
        whileHover={shouldReduceMotion ? undefined : { scale: 1.15, y: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-2 rounded-xl text-slate-400 hover:text-cyan-400 transition-colors"
        aria-label="Scroll to Projects section"
        title="Scroll to Projects"
      >
        <ArrowDownIcon className="w-5 h-5" />
      </motion.a>
    </section>
  );
};
