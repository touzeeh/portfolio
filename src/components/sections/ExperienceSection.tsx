'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useInView, useReducedMotion } from 'framer-motion';
import { EXPERIENCES } from '@/data/portfolioData';
import type { ExperienceItem } from '@/types';
import {
  scrollRevealVariants,
  VIEWPORT_CONFIG,
  SHARED_EASE,
} from '@/lib/animations';

const TimelineRow: React.FC<{ item: ExperienceItem; index: number }> = ({ item }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { amount: 0.4, once: false });
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
    <div ref={rowRef} className="relative group pl-8 sm:pl-10">
      {/* (5) Node Dot that activates per entry */}
      <motion.div
        animate={{
          scale: isInView ? (shouldReduceMotion ? 1 : 1.2) : 1,
          borderColor: isInView ? '#22d3ee' : 'rgba(255, 255, 255, 0.2)',
          backgroundColor: isInView ? '#083344' : '#030712',
          boxShadow: isInView ? '0 0 14px rgba(6, 182, 212, 0.9)' : 'none',
        }}
        transition={{ duration: 0.3, ease: SHARED_EASE }}
        className="absolute -left-[6px] sm:-left-[7px] top-3 w-4 h-4 rounded-full border-2 border-white/20 bg-slate-950 z-10"
        style={{ willChange: 'transform' }}
      />

      {/* Content Card with hover lift */}
      <motion.div
        initial="initial"
        whileHover="hover"
        variants={cardVariants}
        className={`glass-card p-5 sm:p-6 border transition-all rounded-[20px] ${
          isInView
            ? 'border-cyan-500/35 shadow-[0_12px_32px_-8px_rgba(6,182,212,0.15)]'
            : 'border-white/10'
        } hover:border-cyan-400/50 hover:shadow-[0_16px_36px_-8px_rgba(6,182,212,0.22)]`}
        style={{ willChange: 'transform' }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <span className="text-xs font-mono text-cyan-400 font-bold">
            {item.period}
          </span>
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-cyan-600/15 text-cyan-300 border border-cyan-500/25">
            Verified
          </span>
        </div>

        <h3 className="font-display text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
          {item.title}
        </h3>

        <div className="text-xs font-mono text-slate-300 mb-2">
          {item.organization} • <span className="text-slate-400">{item.location}</span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          {item.description}
        </p>

        {item.tags && (
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-900 border border-white/10 text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // (5) Timeline line that draws with scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 50%'],
  });

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={scrollRevealVariants}
        className="mb-14 space-y-2"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold drop-shadow-sm">
          Milestones
        </span>
        <h2 className="font-display text-section-fluid text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
          Timeline
        </h2>
        <p className="text-slate-300 text-base max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
          Academic progression, competitive hackathons, and open-source contributions.
        </p>
      </motion.div>

      {/* (5) Timeline Container Track with Scroll-Driven Line */}
      <div ref={containerRef} className="relative ml-2 sm:ml-4 space-y-7 max-w-3xl">
        {/* Background Inactive Line */}
        <div
          className="absolute left-[1px] sm:left-[0px] top-3 bottom-3 w-[2px] bg-white/10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Dynamic Active Line drawn with scroll progress (transform only) */}
        <motion.div
          style={{
            scaleY: shouldReduceMotion ? 1 : scrollYProgress,
            transformOrigin: 'top',
            willChange: 'transform',
          }}
          className="absolute left-[1px] sm:left-[0px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-cyan-400 via-violet-400 to-cyan-500 pointer-events-none z-0"
          aria-hidden="true"
        />

        {EXPERIENCES.map((item, index) => (
          <TimelineRow key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};
