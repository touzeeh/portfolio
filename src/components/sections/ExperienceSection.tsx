'use client';

import React from 'react';
import { EXPERIENCES } from '@/data/portfolioData';
import { TiltCard } from '@/components/ui/TiltCard';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-14 space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold drop-shadow-sm">
          Milestones
        </span>
        <h2 className="font-display text-section-fluid text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
          Timeline
        </h2>
        <p className="text-slate-300 text-base max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
          Academic progression, competitive hackathons, and open-source contributions.
        </p>
      </div>

      {/* Timeline Vertical Track */}
      <div className="relative ml-2 sm:ml-4 pl-6 sm:pl-8 border-l border-cyan-500/30 space-y-7 max-w-3xl">
        {EXPERIENCES.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline Node Dot centered on vertical line */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-2 w-3.5 h-3.5 rounded-full border-2 border-cyan-400 bg-slate-950 shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-transform duration-300 group-hover:scale-125" />

            {/* Content Card */}
            <TiltCard
              className="glass-card p-5 sm:p-6 border border-white/10 group-hover:border-cyan-400/35 transition-colors"
              maxTilt={2}
              borderRadius="lg"
              glareColor="rgba(6, 182, 212, 0.12)"
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
            </TiltCard>
          </div>
        ))}
      </div>
    </section>
  );
};
