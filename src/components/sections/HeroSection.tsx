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
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
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
        {/* 1. Sensitive Status Pill Badge with Pinging Radar Beacon */}
        <motion.div
          variants={itemVariants}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
          transition={{ duration: 0.2, ease: SHARED_EASE }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950/90 border border-emerald-500/35 text-xs sm:text-sm text-slate-200 backdrop-blur-xl shadow-xl shadow-black/70 cursor-default"
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            {!shouldReduceMotion && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            )}
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 ring-2 ring-emerald-500/40" />
          </span>
          <span className="font-medium tracking-wide">
            {PERSONAL_INFO.status}
          </span>
        </motion.div>

        {/* 2. Headline with Shimmering Gradient Text */}
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

        {/* 3. Subtext */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl text-slate-300 text-base sm:text-lg leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        >
          {PERSONAL_INFO.subheadline}
        </motion.p>

        {/* 4. Action Row with Sensitive Spring Physics */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
        >
          {/* Primary CTA */}
          <motion.a
            href="#projects"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.2, ease: SHARED_EASE }}
            className="btn-primary px-7 py-3.5 text-sm sm:text-base font-semibold group"
          >
            <span>View Projects</span>
            <ArrowUpRightIcon className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
            aria-label="Download Resume"
          >
            <FileTextIcon className="w-4 h-4 text-cyan-400" />
            <span>Download Resume</span>
          </motion.a>

          {/* Icon Links with Sensitive Hover Bounce */}
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
            >
              <MailIcon size={18} />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      {/* Down Arrow Indicator with Sensitive Floating Wave Motion */}
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
      >
        <ArrowDownIcon className="w-5 h-5" />
      </motion.a>
    </section>
  );
};
