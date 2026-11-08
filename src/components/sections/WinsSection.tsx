'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { WINS } from '@/data/portfolioData';
import type { WinItem } from '@/types';
import { TrophyIcon, EyeIcon, SparklesIcon } from '@/components/ui/Icons';
import { TiltCard } from '@/components/ui/TiltCard';
import {
  scrollRevealVariants,
  staggerGridVariants,
  staggerItemVariants,
  VIEWPORT_CONFIG,
  SHARED_EASE,
} from '@/lib/animations';

export const WinsSection: React.FC = () => {
  const [selectedWin, setSelectedWin] = useState<WinItem | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="wins" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header Scroll Reveal */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={scrollRevealVariants}
        className="mb-14 space-y-2"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono font-medium mb-1">
          <TrophyIcon className="w-3.5 h-3.5 text-amber-400" />
          <span>Competitions</span>
        </div>
        <h2 className="font-display text-section-fluid text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
          Hackathons
        </h2>
        <p className="text-slate-300 text-base max-w-2xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
          Collegiate and regional technical buildathon challenges with working project deliverables.
        </p>
      </motion.div>

      {/* 2 Authentic Hackathon Cards Grid with 70ms stagger */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={staggerGridVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7"
      >
        {WINS.map((win) => (
          <motion.div
            key={win.id}
            variants={staggerItemVariants}
            className="h-full flex flex-col"
          >
            <TiltCard
              glareColor="rgba(245, 158, 11, 0.22)"
              className="glass-card flex flex-col justify-between h-full p-6 border border-white/10 hover:border-amber-400/40 hover:shadow-[0_16px_36px_-8px_rgba(245,158,11,0.2)] transition-all rounded-[20px] group flex-1"
            >
              <div className="space-y-4">
                {/* Image Frame with Viewfinder Tech Boundaries */}
                <div
                  className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950 border border-amber-500/30 group-hover:border-amber-400/70 transition-colors shadow-lg cursor-pointer"
                  onClick={() => setSelectedWin(win)}
                >
                  {/* Viewfinder Corner Brackets */}
                  <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-400 z-10 pointer-events-none group-hover:scale-110 transition-transform" />
                  <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-400 z-10 pointer-events-none group-hover:scale-110 transition-transform" />
                  <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-400 z-10 pointer-events-none group-hover:scale-110 transition-transform" />
                  <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-400 z-10 pointer-events-none group-hover:scale-110 transition-transform" />

                  {/* Image Display */}
                  <Image
                    src={win.image}
                    alt={`${win.title} certificate display`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Top Rank Badge */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-md border border-amber-400/50 text-[11px] font-mono font-bold text-amber-300 shadow-md">
                    <SparklesIcon className="w-3 h-3 text-amber-400" />
                    <span>{win.rank}</span>
                  </div>
                </div>

                {/* Metadata */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-amber-400/90 mb-1">
                    <span>{win.competition}</span>
                    <span className="text-slate-400">{win.date}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {win.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    Category: <span className="text-slate-300">{win.category}</span>
                  </p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {win.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {win.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-900 border border-white/10 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Unified baseline with mt-auto */}
              <div className="pt-4 border-t border-white/[0.08] mt-6 flex items-center justify-start">
                <motion.button
                  type="button"
                  onClick={() => setSelectedWin(win)}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -1 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                  transition={{ duration: 0.2, ease: SHARED_EASE }}
                  className="btn-secondary text-xs py-2 px-3.5 flex items-center gap-1.5 hover:border-amber-400/40 text-amber-300 group/btn"
                >
                  <span>View Proof</span>
                  <EyeIcon className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                </motion.button>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox Modal for Full Proof View */}
      <AnimatePresence>
        {selectedWin && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.25, ease: SHARED_EASE }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl"
            onClick={() => setSelectedWin(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { scale: 1, opacity: 0 } : { scale: 0.94, opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: SHARED_EASE }}
              className="relative w-full max-w-2xl bg-slate-900 border-2 border-amber-400/50 rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Viewfinder Frame Accents */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-400 z-10" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-400 z-10" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-400 z-10" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-400 z-10" />

              {/* Modal Image */}
              <div className="relative aspect-[16/10] w-full bg-slate-950 border-b border-white/10">
                <Image
                  src={selectedWin.image}
                  alt={`${selectedWin.title} full view`}
                  fill
                  className="object-contain p-4"
                />
                <button
                  type="button"
                  onClick={() => setSelectedWin(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/90 text-slate-300 hover:text-white border border-white/20 transition z-20"
                  aria-label="Close modal"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold">
                    <TrophyIcon className="w-3.5 h-3.5 text-amber-400" />
                    {selectedWin.rank}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {selectedWin.date} • {selectedWin.competition}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {selectedWin.title}
                  </h3>
                  <p className="text-xs font-mono text-amber-400/80 mt-1">
                    Category: {selectedWin.category}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed mt-3">
                    {selectedWin.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedWin.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
