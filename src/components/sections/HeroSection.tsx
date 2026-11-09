'use client';

import React, { useEffect, useSyncExternalStore } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';
import Image from 'next/image';
import { PERSONAL_INFO } from '@/data/portfolioData';
import {
  FileTextIcon,
  ArrowUpRightIcon,
  TrophyIcon,
} from '@/components/ui/Icons';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { DURATION, EASE } from '@/lib/motion';
import { ANIMATION_FLAGS } from '@/config/animations';

const subscribePointerFine = (callback: () => void) => {
  const mql = window.matchMedia('(pointer: fine)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
};
const getPointerFineSnapshot = () => window.matchMedia('(pointer: fine)').matches;
const getServerFalse = () => false;

const subscribeNoop = () => () => {};
const getFirstVisitSnapshot = () => {
  if (typeof window === 'undefined') return false;
  try {
    return !sessionStorage.getItem('portfolio_intro_seen');
  } catch {
    return false;
  }
};

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const isFinePointer = useSyncExternalStore(subscribePointerFine, getPointerFineSnapshot, getServerFalse);
  const isFirstVisit = useSyncExternalStore(subscribeNoop, getFirstVisitSnapshot, getServerFalse);

  // Parallax spring coordinates for fine pointer devices
  const mouseX = useSpring(0, { damping: 30, stiffness: 180 });
  const mouseY = useSpring(0, { damping: 30, stiffness: 180 });

  useEffect(() => {
    if (isFirstVisit) {
      try {
        sessionStorage.setItem('portfolio_intro_seen', 'true');
      } catch {}
    }
  }, [isFirstVisit]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isFinePointer || shouldReduceMotion || !ANIMATION_FLAGS.hero3DParallax) return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 24; // max +-12px
    const y = (e.clientY / innerHeight - 0.5) * 24;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Staggered Intro sequence variants
  const shouldAnimateIntro = isFirstVisit && ANIMATION_FLAGS.introSequence && !shouldReduceMotion;

  const containerVariants = {
    hidden: { opacity: shouldAnimateIntro ? 0 : 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldAnimateIntro ? 0.08 : 0,
        delayChildren: shouldAnimateIntro ? 0.05 : 0,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldAnimateIntro ? 0 : 1,
      y: shouldAnimateIntro ? 16 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldAnimateIntro ? DURATION.base : 0,
        ease: EASE.entrance,
      },
    },
  };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 pt-28 pb-20 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Ambient Floating Holographic Cyber Orbs with Parallax Drift */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[340px] bg-gradient-to-r from-cyan-500/12 via-violet-500/10 to-cyan-500/8 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        className="absolute bottom-10 right-1/4 w-[280px] h-[180px] bg-violet-600/10 blur-2xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-5 sm:gap-6"
      >
        {/* 1st Place Winner Badge on Top */}
        <motion.div variants={itemVariants} className="flex items-center justify-center">
          <motion.a
            href="#wins"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--surface-2)]/90 backdrop-blur-md border border-amber-500/30 hover:border-amber-400/60 text-xs font-mono text-amber-300 shadow-sm hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all group"
            title="View Hackathon Win & Verified Proof"
          >
            <TrophyIcon className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-amber-300">1st Place Winner</span>
            <span className="text-[var(--text-muted)]">• Smart Health Hackathon 2025 (InnerSight 3D)</span>
            <span className="text-amber-400 font-bold group-hover:translate-x-0.5 transition-transform">→</span>
          </motion.a>
        </motion.div>

        {/* Heading & Recruiter-Targeted Copy: Just "Touzeeh" */}
        <motion.div variants={itemVariants} className="space-y-4 max-w-4xl mx-auto">
          {/* Masked reveal container on intro */}
          <div className="overflow-hidden py-1">
            <h1 className="font-display text-[clamp(2.1rem,6vw,4.5rem)] font-bold tracking-tight text-[var(--text)] [text-wrap:balance] leading-[1.14]">
              <span>Hi, I'm </span>
              <span className="text-gradient drop-shadow-[0_0_25px_rgba(34,211,238,0.3)]">
                Touzeeh.
              </span>
            </h1>
          </div>

          {/* Recruiter-Targeted Concrete Tagline */}
          <p className="text-xl sm:text-2xl md:text-[25px] font-medium text-[var(--text)] max-w-[680px] mx-auto leading-relaxed [text-wrap:balance]">
            {PERSONAL_INFO.headline}
          </p>

          {/* Recruiter-Targeted Supporting Line */}
          <p className="max-w-[640px] mx-auto text-[var(--text-muted)] text-base sm:text-lg leading-relaxed [text-wrap:balance]">
            {PERSONAL_INFO.subheadline}
          </p>
        </motion.div>

        {/* Action Row: Magnetic CTAs & Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
        >
          {/* Primary CTA */}
          <MagneticButton
            href="#projects"
            className="btn-primary group overflow-hidden"
          >
            {/* One-pass shine sweep on hover */}
            <span className="relative z-10 flex items-center gap-1.5">
              <span>View projects</span>
              <ArrowUpRightIcon className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
            </span>
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </MagneticButton>

          {/* Secondary Outline CTA for Resume PDF */}
          <MagneticButton
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary group min-h-[44px] min-w-[44px]"
            title="Download 1-Page Resume PDF"
            aria-label="Download Resume (PDF)"
          >
            <FileTextIcon className="w-4 h-4 text-[var(--accent)] group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-200 mr-2" />
            <span>Resume</span>
          </MagneticButton>

          {/* Social Icon Buttons (with official downloaded logos) */}
          <div className="flex items-center gap-2 sm:ml-2">
            <MagneticButton
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="btn-icon min-h-[44px] min-w-[44px] focus-visible:ring-2 focus-visible:ring-[var(--accent)] group"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <Image
                src="/icons/github.png"
                alt="GitHub"
                width={19}
                height={19}
                className="w-[19px] h-[19px] object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
              />
            </MagneticButton>

            <MagneticButton
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-icon min-h-[44px] min-w-[44px] focus-visible:ring-2 focus-visible:ring-[var(--accent)] group"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <Image
                src="/icons/linkedin.png"
                alt="LinkedIn"
                width={18}
                height={18}
                className="w-[18px] h-[18px] object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
              />
            </MagneticButton>

            <MagneticButton
              href={`mailto:${PERSONAL_INFO.email}`}
              className="btn-icon min-h-[44px] min-w-[44px] focus-visible:ring-2 focus-visible:ring-[var(--accent)] group"
              aria-label="Send direct email"
              title="Send direct email"
            >
              <Image
                src="/icons/gmail.png"
                alt="Gmail"
                width={18}
                height={18}
                className="w-[18px] h-[18px] object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
              />
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
