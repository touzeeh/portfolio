'use client';

import React from 'react';
import { SKILL_CATEGORIES } from '@/data/portfolioData';
import { TiltCard } from '@/components/ui/TiltCard';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-14 space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold drop-shadow-sm">
          Technical Stack
        </span>
        <h2 className="font-display text-section-fluid text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
          Skills &amp; Capabilities
        </h2>
        <p className="text-slate-300 text-base max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
          Core technical competencies across frontend, backend systems, databases, and spatial web graphics.
        </p>
      </div>

      {/* 3 Focused Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
        {SKILL_CATEGORIES.map((category) => (
          <TiltCard
            key={category.name}
            className="glass-card p-6 sm:p-7 flex flex-col justify-between h-full border border-white/10 hover:border-cyan-400/40 transition-colors"
            maxTilt={4}
            borderRadius="lg"
            glareColor={`${category.accentColor}20`}
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

              <p className="text-sm text-slate-300 leading-relaxed">
                {category.description}
              </p>

              {/* Prominent, readable skill chips */}
              <div className="flex flex-wrap gap-2 pt-3">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-2 rounded-lg text-sm font-mono font-medium bg-slate-900 border border-white/10 text-slate-200 hover:border-cyan-400/50 hover:text-white transition-all cursor-default shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
};
