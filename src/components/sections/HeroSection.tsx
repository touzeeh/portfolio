'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
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
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);

  // Fade out scroll cue after initial scroll (>40px)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrollIndicatorVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: SHARED_EASE,
      },
    },
  };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 pt-28 pb-20 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Ambient Floating Holographic Cyber Orbs */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[340px] bg-gradient-to-r from-cyan-500/12 via-violet-500/10 to-cyan-500/8 blur-3xl pointer-events-none -z-10 animate-[float-slow_8s_ease-in-out_infinite]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-1/4 w-[280px] h-[180px] bg-violet-600/10 blur-2xl pointer-events-none -z-10 animate-[float-slow_10s_ease-in-out_infinite_reverse]"
        aria-hidden="true"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-5 sm:gap-6"
      >
        {/* Item C.3: Single clean availability pill above heading */}
        <motion.div variants={itemVariants} className="flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-2)]/90 backdrop-blur-md border border-[var(--border)] text-xs font-mono text-[var(--text-muted)] shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>{PERSONAL_INFO.status}</span>
          </div>
        </motion.div>

        {/* Item C.1 & C.2: Wide heading (no wrap mid-name) + Unified non-redundant copy */}
        <motion.div variants={itemVariants} className="space-y-4 max-w-4xl mx-auto">
          {/* Item C.1: Font clamp and whitespace-nowrap prevents mid-name breaking on all viewports */}
          <h1 className="font-display text-[clamp(2.35rem,5.2vw,4.4rem)] font-bold tracking-tight text-[var(--text)] [text-wrap:balance] leading-[1.12]">
            Hi, I'm{' '}
            <span className="whitespace-nowrap text-gradient drop-shadow-[0_0_25px_rgba(34,211,238,0.3)]">
              {PERSONAL_INFO.fullName}.
            </span>
          </h1>

          {/* Item C.2: Punchy non-redundant tagline */}
          <p className="text-xl sm:text-2xl md:text-[25px] font-medium text-[var(--text)] max-w-[680px] mx-auto leading-relaxed [text-wrap:balance]">
            {PERSONAL_INFO.headline}
          </p>

          {/* Item C.2: Concise supporting line (<18 words) */}
          <p className="max-w-[640px] mx-auto text-[var(--text-muted)] text-base sm:text-lg leading-relaxed [text-wrap:balance]">
            {PERSONAL_INFO.subheadline}
          </p>
        </motion.div>

        {/* Action Row: CTAs & Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
        >
          {/* Primary CTA */}
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2, ease: SHARED_EASE }}
            className="btn-primary group"
          >
            <span>View projects</span>
            <ArrowUpRightIcon className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
          </motion.a>

          {/* Secondary Outline CTA for Resume PDF */}
          <motion.a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2, ease: SHARED_EASE }}
            className="btn-secondary group min-h-[44px] min-w-[44px]"
            aria-label="Download Resume (PDF)"
            title="Download 1-Page Resume PDF"
          >
            <FileTextIcon className="w-4 h-4 text-[var(--accent)] group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-200" />
            <span>Resume</span>
          </motion.a>

          {/* Item C.7: Labeled social icon buttons with >=44px touch targets and clear contrast */}
          <div className="flex items-center gap-2 sm:ml-2">
            <motion.a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.15, rotate: 6, y: -2 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.2, ease: SHARED_EASE }}
              className="btn-icon min-h-[44px] min-w-[44px] focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <GithubIcon size={18} />
            </motion.a>

            <motion.a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.15, rotate: -6, y: -2 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.2, ease: SHARED_EASE }}
              className="btn-icon min-h-[44px] min-w-[44px] focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <LinkedinIcon size={18} />
            </motion.a>

            <motion.a
              href={`mailto:${PERSONAL_INFO.email}`}
              whileHover={{ scale: 1.15, rotate: 6, y: -2 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.2, ease: SHARED_EASE }}
              className="btn-icon min-h-[44px] min-w-[44px] focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label="Send direct email"
              title="Send direct email"
            >
              <MailIcon size={18} />
            </motion.a>
          </div>
        </motion.div>

        {/* Item C.3: Quiet 1-line proof under the CTA row */}
        <motion.a
          href="#wins"
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--award)] transition-colors pt-2 group"
          title="View Hackathon Win & Verified Proof"
        >
          <TrophyIcon className="w-3.5 h-3.5 text-[var(--award)] group-hover:scale-110 transition-transform" />
          <span>1st Place Winner &bull; Smart Health Hackathon 2025 (InnerSight 3D) &rarr;</span>
        </motion.a>
      </motion.div>

      {/* Item C.11: Subtle Animated Scroll Cue at bottom-center */}
      <AnimatePresence>
        {scrollIndicatorVisible && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none text-[var(--text-muted)] select-none"
            aria-hidden="true"
          >
            <span className="font-mono text-[9px] tracking-widest uppercase opacity-60">Scroll</span>
            <div className="w-4 h-7 rounded-full border border-[var(--border)] flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                className="w-1 h-1 rounded-full bg-[var(--accent)]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
