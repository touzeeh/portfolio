'use client';

import React from 'react';
import { SKILL_CATEGORIES } from '@/data/portfolioData';
import { TiltCard } from '@/components/ui/TiltCard';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-12 space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold drop-shadow-sm">
          Expertise
        </span>
        <h2 className="font-display text-section-fluid text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
          Skills & Technical Stack
        </h2>
        <p className="text-slate-300 text-base max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
          Grouped by engineering domain. No artificial percentages or vanity bars—just the actual tools and technologies I use to build software.
        </p>
      </div>

      {/* 3 Balanced Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SKILL_CATEGORIES.map((category) => (
          <TiltCard
            key={category.name}
            className="glass-card p-6 sm:p-7 flex flex-col justify-between h-full"
            maxTilt={5}
            borderRadius="sm"
            glareColor={`${category.accentColor}25`}
          >
            <div className="space-y-4">
              {/* Category Header */}
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.accentColor }}
                />
                <h3 className="font-display text-lg font-bold text-white">
                  {category.name}
                </h3>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed min-h-[40px]">
                {category.description}
              </p>

              {/* Skills Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-[12px] text-xs font-mono bg-slate-900/80 border border-white/[0.08] text-slate-200 hover:border-violet-400/40 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Accent Line */}
            <div
              className="mt-6 pt-4 border-t border-white/[0.06] text-xs text-slate-400 font-mono flex items-center justify-between"
            >
              <span>{category.items.length} Core Technologies</span>
              <span style={{ color: category.accentColor }}>Active Usage</span>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
};
