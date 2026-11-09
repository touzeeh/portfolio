'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useInView } from 'framer-motion';
import { EXPERIENCES } from '@/data/portfolioData';
import type { ExperienceItem } from '@/types';
import { TiltCard } from '@/components/ui/TiltCard';
import {
  scrollRevealVariants,
  VIEWPORT_CONFIG,
  SHARED_EASE,
} from '@/lib/animations';

const TimelineRow: React.FC<{ item: ExperienceItem; index: number }> = ({ item }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { amount: 0.4, once: false });

  return (
    <div ref={rowRef} className="relative group pl-8 sm:pl-10">
      {/* (5) Node Dot that activates per entry with sensitive glow and radar ring */}
      <motion.div
        animate={{
          scale: isInView ? 1.25 : 1,
          borderColor: isInView ? '#22d3ee' : 'rgba(255, 255, 255, 0.2)',
          backgroundColor: isInView ? '#083344' : '#030712',
          boxShadow: isInView ? '0 0 10px rgba(34, 211, 238, 0.4)' : 'none',
        }}
        transition={{ duration: 0.3, ease: SHARED_EASE }}
        className="absolute -left-[6px] sm:-left-[7px] top-3 w-4 h-4 rounded-full border-2 border-white/20 bg-slate-950 z-10 flex items-center justify-center"
        style={{ willChange: 'transform' }}
      >
        {isInView && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60" />
        )}
      </motion.div>

      {/* Content Card with cursor spotlight and sensitive hover */}
      <TiltCard
        glareColor="rgba(255, 255, 255, 0.04)"
        className={`glass-card p-5 sm:p-6 border transition-all rounded-[20px] ${
          isInView
            ? 'border-[var(--accent)]/30'
            : 'border-[var(--border)]'
        } hover:border-[var(--accent)]/50 hover:shadow-xl`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <span className="text-xs font-mono text-[var(--accent)] font-bold">
            {item.period}
          </span>
        </div>

        <h3 className="font-display text-lg font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
          {item.title}
        </h3>

        <div className="text-xs font-mono text-[var(--text-muted)] mb-2">
          {item.organization} • <span>{item.location}</span>
        </div>

        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3">
          {item.description}
        </p>

        {item.tags && (
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ y: -3, scale: 1.08 }}
                transition={{ duration: 0.18, ease: SHARED_EASE }}
                className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--accent)]/60 text-[var(--text-muted)] hover:text-[var(--text)] transition-all cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        )}
      </TiltCard>
    </div>
  );
};

export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold drop-shadow-sm">
          Milestones
        </span>
        <h2 className="font-display text-section-fluid text-[var(--text)] tracking-tight">
          Timeline
        </h2>
        <p className="text-[var(--text-muted)] text-base max-w-xl">
          Academic progression, competitive hackathons, and open-source contributions.
        </p>
      </motion.div>

      {/* (5) Timeline Container Track with Scroll-Driven Laser Line */}
      <div ref={containerRef} className="relative ml-2 sm:ml-4 space-y-7 max-w-3xl">
        {/* Background Inactive Line */}
        <div
          className="absolute left-[1px] sm:left-[0px] top-3 bottom-3 w-[2px] bg-white/10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Dynamic Active Line drawn with scroll progress with subtle neon laser glow */}
        <motion.div
          style={{
            scaleY: scrollYProgress,
            transformOrigin: 'top',
            willChange: 'transform',
          }}
          className="absolute left-[1px] sm:left-[0px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-cyan-400 via-violet-400 to-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.8)] pointer-events-none z-0"
          aria-hidden="true"
        />

        {EXPERIENCES.map((item, index) => (
          <TimelineRow key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};
