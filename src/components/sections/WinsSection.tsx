'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { WINS } from '@/data/portfolioData';
import type { WinItem } from '@/types';
import { TiltCard } from '@/components/ui/TiltCard';
import { TrophyIcon, ArrowUpRightIcon, EyeIcon, SparklesIcon } from '@/components/ui/Icons';

export const WinsSection: React.FC = () => {
  const [selectedWin, setSelectedWin] = useState<WinItem | null>(null);

  return (
    <section id="wins" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-14 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono font-medium mb-1">
          <TrophyIcon className="w-3.5 h-3.5 text-amber-400" />
          <span>Accolades &amp; Victories</span>
        </div>
        <h2 className="font-display text-section-fluid text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
          Wins &amp; Competition Proof
        </h2>
        <p className="text-slate-300 text-base max-w-2xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
          A showcase of hackathon victories, engineering challenge awards, and recognized buildathons with verified project credentials.
        </p>
      </div>

      {/* Wins Grid: 1 col on mobile, 3 cols on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7">
        {WINS.map((win) => (
          <div key={win.id} className="group">
            <TiltCard
              className="glass-card flex flex-col justify-between h-full p-5 sm:p-6 transition-all duration-300 group-hover:border-amber-400/40"
              maxTilt={4}
              borderRadius="lg"
              glareColor="rgba(245, 158, 11, 0.15)"
            >
              <div className="space-y-4">
                {/* Image Frame with Viewfinder Tech Boundaries */}
                <div
                  className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950 border border-amber-500/30 group-hover:border-amber-400/70 transition-colors shadow-lg cursor-pointer"
                  onClick={() => setSelectedWin(win)}
                >
                  {/* Viewfinder Corner Brackets */}
                  <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-400 z-10 pointer-events-none" />
                  <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-400 z-10 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-400 z-10 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-400 z-10 pointer-events-none" />

                  {/* Image Display */}
                  <Image
                    src={win.image}
                    alt={`${win.title} win award`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Top Rank Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-md border border-amber-400/40 text-amber-300 text-[11px] font-mono font-bold shadow-md">
                      <TrophyIcon className="w-3 h-3 text-amber-400" />
                      {win.rank}
                    </span>
                  </div>

                  {/* Date Pill */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-slate-300 border border-white/10">
                      {win.date}
                    </span>
                  </div>

                  {/* Hover Overlay with Preview Cue */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500 text-slate-950 text-xs font-semibold shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <EyeIcon className="w-4 h-4" />
                      <span>Inspect Victory</span>
                    </span>
                  </div>
                </div>

                {/* Win Details */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400/90 font-medium block">
                    {win.category}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                    {win.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    {win.competition}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed pt-1">
                    {win.description}
                  </p>
                </div>
              </div>

              {/* Tags & Action Row */}
              <div className="pt-4 border-t border-white/[0.08] mt-4 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {win.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-slate-900 border border-white/[0.08] text-[10px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setSelectedWin(win)}
                    className="text-xs font-medium text-amber-300 hover:text-amber-200 inline-flex items-center gap-1 transition"
                  >
                    <span>View Certificate Proof</span>
                    <EyeIcon className="w-3.5 h-3.5" />
                  </button>

                  {win.proofUrl && (
                    <a
                      href={win.proofUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-medium text-slate-300 hover:text-white inline-flex items-center gap-1 transition"
                      aria-label={`View code for ${win.title}`}
                    >
                      <span>Repository</span>
                      <ArrowUpRightIcon className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </TiltCard>
          </div>
        ))}
      </div>

      {/* Lightbox Modal for Full Proof View */}
      {selectedWin && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setSelectedWin(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-2xl bg-slate-900 border-2 border-amber-400/50 rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Viewfinder Frame Accents on Modal */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-400 z-10" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-400 z-10" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-400 z-10" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-400 z-10" />

            {/* Modal Image with boundary */}
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

                {selectedWin.proofUrl && (
                  <a
                    href={selectedWin.proofUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary text-xs py-2 px-3.5 inline-flex items-center gap-1.5"
                  >
                    <span>Verify on GitHub</span>
                    <ArrowUpRightIcon className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
