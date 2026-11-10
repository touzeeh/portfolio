'use client';

import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { WINS } from '@/data/portfolioData';
import type { WinItem } from '@/types';
import { TrophyIcon, EyeIcon, SparklesIcon, ArrowUpRightIcon } from '@/components/ui/Icons';
import { TiltCard } from '@/components/ui/TiltCard';
import {
  scrollRevealVariants,
  staggerGridVariants,
  staggerItemVariants,
  VIEWPORT_CONFIG,
  SHARED_EASE,
} from '@/lib/animations';

const emptySubscribe = () => () => {};

export const WinsSection: React.FC = () => {
  const [selectedWin, setSelectedWin] = useState<WinItem | null>(null);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleOpen = (win: WinItem, e: React.MouseEvent) => {
    lastActiveElementRef.current = e.currentTarget as HTMLElement;
    setSelectedWin(win);
  };

  const handleClose = () => {
    setSelectedWin(null);
    if (lastActiveElementRef.current) {
      lastActiveElementRef.current.focus();
    }
  };

  // Lock background scroll without layout shift
  useEffect(() => {
    if (!selectedWin) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [selectedWin]);

  // Close on Escape key press
  useEffect(() => {
    if (!selectedWin) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedWin]);

  return (
    <section id="wins" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header Scroll Reveal */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={scrollRevealVariants}
        className="mb-8 sm:mb-14 space-y-2"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono font-medium mb-1">
          <TrophyIcon className="w-3.5 h-3.5 text-amber-400" />
          <span>Competitions</span>
        </div>
        <h2 className="font-display text-section-fluid text-[var(--text)] tracking-tight">
          Hackathons
        </h2>
        <p className="text-[var(--text-muted)] text-base max-w-2xl">
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
              className="glass-card flex flex-col justify-between h-full p-4 sm:p-6 transition-all rounded-[20px] group flex-1"
            >
              <div className="space-y-4">
                {/* Image Frame with Clean Hairline */}
                <div
                  className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950 border border-white/10 group-hover:border-amber-400/50 transition-colors shadow-lg cursor-pointer"
                  onClick={(e) => handleOpen(win, e)}
                >
                  {/* Image Display */}
                  <Image
                    src={win.image}
                    alt={`${win.title} certificate display`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Top Rank Badge */}
                  <div className="glass-pill absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-amber-400/50 text-[11px] font-mono font-bold text-amber-300 shadow-md">
                    <SparklesIcon className="w-3 h-3 text-amber-400" />
                    <span>{win.rank}</span>
                  </div>
                </div>

                {/* Metadata */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-amber-400/90 mb-1">
                    <span>{win.competition}</span>
                    <span className="text-[var(--text-muted)]">{win.date}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[var(--text)] group-hover:text-amber-300 transition-colors">
                    {win.title}
                  </h3>
                  <p className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                    Category: <span className="text-[var(--text)]">{win.category}</span>
                  </p>
                </div>

                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {win.description}
                </p>

                {/* Tags with spring hover */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {win.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ y: -2, scale: 1.05 }}
                      transition={{ duration: 0.15, ease: SHARED_EASE }}
                      className="tech-chip text-[11px] py-0.5 px-2 cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Unified baseline with mt-auto */}
              <div className="pt-4 border-t border-white/[0.08] mt-6 flex items-center justify-start">
                <motion.button
                  type="button"
                  onClick={(e) => handleOpen(win, e)}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ duration: 0.2, ease: SHARED_EASE }}
                  className="btn-secondary text-xs py-2 px-3.5 flex items-center gap-1.5 hover:border-amber-400/50 hover:text-amber-200 text-amber-300 group/btn shadow-sm cursor-pointer"
                >
                  <span>View Proof</span>
                  <EyeIcon className="w-3.5 h-3.5 group-hover/btn:scale-125 group-hover/btn:rotate-6 transition-transform duration-200" />
                </motion.button>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox Modal for Full Proof View via createPortal to document.body */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedWin && (
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
                transition={{ duration: 0.25, ease: SHARED_EASE }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-xl"
                onClick={handleClose}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-win-title"
              >
                <motion.div
                  initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0.94, opacity: 0, y: 15 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { scale: 1, opacity: 0 } : { scale: 0.94, opacity: 0, y: 15 }}
                  transition={{ duration: 0.3, ease: SHARED_EASE }}
                  className="glass-modal relative w-full max-w-2xl max-h-[calc(100dvh-24px)] sm:max-h-[calc(100dvh-32px)] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/80"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Always-Visible Fixed Close (X) Button (Touch target >= 44px) */}
                  <motion.button
                    type="button"
                    onClick={handleClose}
                    whileHover={{ scale: 1.15, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="glass-pill absolute top-3 right-3 sm:top-3.5 sm:right-3.5 w-11 h-11 rounded-full text-[var(--text-muted)] hover:text-[var(--text)] border border-white/20 hover:border-amber-400/70 transition-colors z-40 shadow-xl cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    aria-label="Close modal"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>

                  {/* Scrollable Inner Content Area */}
                  <div className="overflow-y-auto overscroll-contain min-h-0 flex-1 flex flex-col">
                    {/* Modal Banner Image Area: Clamped height so info section is visible without scrolling on 1366x768 */}
                    <div className="relative w-full h-[28vh] max-h-[220px] sm:max-h-[260px] min-h-[150px] bg-slate-950/70 border-b border-white/10 shrink-0">
                      <Image
                        src={selectedWin.image}
                        alt={`${selectedWin.title} full view`}
                        fill
                        className="object-contain p-3 sm:p-4"
                        priority
                      />
                    </div>

                    {/* Modal Body Info Section */}
                    <div className="p-4 sm:p-6 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="relative overflow-hidden inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold shadow-sm">
                          <motion.span
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: [1, 1.25, 1], opacity: 1 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                          >
                            <TrophyIcon className="w-3.5 h-3.5 text-amber-400" />
                          </motion.span>
                          <span>{selectedWin.rank}</span>
                          {/* One-time shine sweep across 1ST PLACE WINNER ribbon */}
                          <motion.span
                            initial={{ x: '-100%' }}
                            animate={{ x: '200%' }}
                            transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="text-xs font-mono text-[var(--text-muted)]">
                          {selectedWin.date} • {selectedWin.competition}
                        </span>
                      </div>

                      <div>
                        <h3 id="modal-win-title" className="font-display text-xl font-bold text-[var(--text)]">
                          {selectedWin.title}
                        </h3>
                        <p className="text-xs font-mono text-amber-400/80 mt-1">
                          Category: {selectedWin.category}
                        </p>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-3">
                          {selectedWin.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-1.5">
                          {selectedWin.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded bg-[var(--surface-2)] text-[10px] font-mono text-[var(--text-muted)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        {selectedWin.proofUrl && (
                          <a
                            href={selectedWin.proofUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-400/40 text-amber-300 hover:bg-amber-500/25 text-xs font-mono font-medium transition-colors"
                          >
                            <span>View GitHub Proof</span>
                            <ArrowUpRightIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};
