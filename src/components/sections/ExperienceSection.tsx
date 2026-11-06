'use client';

import React from 'react';
import { EXPERIENCES } from '@/data/portfolioData';
import { TiltCard } from '@/components/ui/TiltCard';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-14 space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold drop-shadow-sm">
          Trajectory
        </span>
        <h2 className="font-display text-section-fluid text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
          Timeline & Milestones
        </h2>
        <p className="text-slate-300 text-base max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
          Academic progression, hackathons, open-source building, and continuous technical growth.
        </p>
      </div>

      {/* Timeline Vertical Track */}
      <div className="relative ml-2 sm:ml-4 pl-6 sm:pl-8 border-l border-white/[0.12] space-y-8">
        {EXPERIENCES.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline Node Dot centered on vertical line */}
            <div
              className={`absolute -left-[33px] sm:-left-[41px] top-2 w-4 h-4 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                item.isPlaceholder
                  ? 'border-slate-600 bg-slate-900'
                  : 'border-violet-400 bg-violet-600 shadow-[0_0_10px_rgba(139,92,246,0.6)]'
              }`}
            />

            {/* Content Card */}
            <TiltCard
              className="glass-card p-6 sm:p-7 max-w-3xl"
              maxTilt={3}
              borderRadius="sm"
              glareColor="rgba(139, 92, 246, 0.12)"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono text-cyan-400 font-medium">
                  {item.period}
                </span>

                {item.isPlaceholder ? (
                  <span className="px-2.5 py-0.5 rounded-[12px] text-[10px] font-mono bg-slate-800/80 text-slate-400 border border-white/[0.06]">
                    Upcoming / In Progress
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-[12px] text-[10px] font-mono bg-violet-600/20 text-violet-300 border border-violet-500/30">
                    Active
                  </span>
                )}
              </div>

              <h3 className="font-display text-lg font-bold text-white mb-1">
                {item.title}
              </h3>

              <div className="text-sm font-medium text-slate-300 mb-3">
                {item.organization} • <span className="text-slate-400 font-normal">{item.location}</span>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                {item.description}
              </p>

              {item.tags && (
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-[12px] text-[11px] font-mono bg-slate-900/60 border border-white/[0.06] text-slate-400"
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
