'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_DATA, type HackathonAward } from '@/data/site';
import { TrophyIcon, EyeIcon, ExternalLinkIcon, XIcon } from '@/components/ui/Icons';
import {
  scrollRevealVariants,
  staggerGridVariants,
  staggerItemVariants,
  VIEWPORT_CONFIG,
  SHARED_EASE,
} from '@/lib/animations';

export const WinsSection: React.FC = () => {
  const [selectedAward, setSelectedAward] = useState<HackathonAward | null>(null);

  return (
    <section id="hackathons" className="section-padding max-w-6xl mx-auto px-4 sm:px-6">
      {/* Section Header with Numbered Eyebrow */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={scrollRevealVariants}
        className="mb-12 space-y-2"
      >
        <span className="eyebrow-label">
          03 / Hackathons
        </span>
        <h2 className="font-display text-section-fluid text-[var(--text)] tracking-tight">
          Competition Results & Awards
        </h2>
        <p className="text-[var(--text-muted)] text-base sm:text-lg max-w-2xl leading-relaxed">
          Official competitive hackathon placements with verifiable project submissions.
        </p>
      </motion.div>

      {/* 2-Card Equal-Height Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={staggerGridVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch"
      >
        {SITE_DATA.hackathons.map((award) => (
          <motion.div key={award.id} variants={staggerItemVariants} className="flex flex-col h-full">
            <div className="site-card p-6 sm:p-7 flex flex-col justify-between h-full space-y-5">
              <div className="space-y-4">
                {/* Real Certificate Photo Slot: 1px border + radius */}
                <div className="relative aspect-[16/10] w-full rounded-[12px] overflow-hidden bg-[var(--surface-2)] border border-[var(--border)] group">
                  <Image
                    src={award.evidenceImage}
                    alt={`${award.officialEventName} award certificate`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Top Placement Chip */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-[8px] bg-[var(--surface)]/95 border border-[var(--border)] font-mono text-xs font-semibold text-[var(--award)] shadow-sm">
                    <TrophyIcon className="w-3.5 h-3.5 text-[var(--award)]" />
                    <span>{award.placement}</span>
                  </div>
                </div>

                {/* Event Name & Metadata */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-1">
                    <span>{award.organizer}</span>
                    <span>{award.year}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-[var(--text)]">
                    {award.officialEventName}
                  </h3>
                  <p className="text-xs text-[var(--accent)] font-mono mt-0.5">
                    Track: {award.category}
                  </p>
                </div>

                {/* 2 Lines on What I Built */}
                <p className="text-sm text-[var(--text)] leading-relaxed">
                  {award.whatIBuilt}
                </p>

                {/* Plain Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {award.tags.map((tag) => (
                    <span key={tag} className="tech-chip text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action: Evidence Link / Proof View pinned to bottom */}
              <div className="pt-4 border-t border-[var(--border)] mt-auto flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedAward(award)}
                  className="btn-secondary text-xs flex items-center gap-1.5"
                >
                  <EyeIcon className="w-3.5 h-3.5 text-[var(--award)]" />
                  <span>Inspect Certificate</span>
                </button>

                {award.evidenceUrl && (
                  <a
                    href={award.evidenceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost text-xs flex items-center gap-1"
                    aria-label={`View submission for ${award.officialEventName}`}
                  >
                    <span>Submission</span>
                    <ExternalLinkIcon className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox Modal for Certificate / Award Proof */}
      <AnimatePresence>
        {selectedAward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedAward(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2, ease: SHARED_EASE }}
              className="relative max-w-3xl w-full bg-[var(--surface)] border border-[var(--border)] rounded-[16px] overflow-hidden p-6 sm:p-8 space-y-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="eyebrow-label text-[var(--award)]">
                    Official Award Record
                  </span>
                  <h3 className="font-display text-xl font-bold text-[var(--text)] mt-1">
                    {selectedAward.officialEventName}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] font-mono">
                    {selectedAward.organizer} • {selectedAward.year}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAward(null)}
                  className="p-2 rounded-[8px] hover:bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close modal"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate Image Frame */}
              <div className="relative aspect-[16/10] w-full rounded-[12px] overflow-hidden border border-[var(--border)] bg-[var(--surface-2)]">
                <Image
                  src={selectedAward.evidenceImage}
                  alt={selectedAward.officialEventName}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-[var(--text-muted)]">
                  Awarded for <span className="text-[var(--text)] font-semibold">{selectedAward.projectTitle}</span>
                </p>
                {selectedAward.evidenceUrl && (
                  <a
                    href={selectedAward.evidenceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary text-xs"
                  >
                    <span>View Repository & Submission</span>
                    <ExternalLinkIcon className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
