'use client';

import React from 'react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { TiltCard } from '@/components/ui/TiltCard';
import { GraduationCapIcon, MapPinIcon, CalendarIcon, FileTextIcon } from '@/components/ui/Icons';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-12 space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold">
          Background
        </span>
        <h2 className="font-display text-section-fluid text-white tracking-tight">
          About Me
        </h2>
        <p className="text-slate-400 text-base max-w-xl">
          A glimpse into my engineering journey, education, and technical philosophy.
        </p>
      </div>

      {/* Grid: 2 columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Story & Philosophy Card (spans 7 cols) */}
        <div className="lg:col-span-7">
          <TiltCard
            className="glass-card p-6 sm:p-8 h-full flex flex-col justify-between"
            maxTilt={4}
            borderRadius="lg"
            glareColor="rgba(139, 92, 246, 0.2)"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                {/* Photo / Avatar Placeholder */}
                <div className="w-16 h-16 rounded-[12px] bg-gradient-to-tr from-violet-600 to-cyan-500 p-[2px] shrink-0">
                  <div className="w-full h-full rounded-[10px] bg-[#030712] flex items-center justify-center font-display font-bold text-lg text-white">
                    MTA
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {PERSONAL_INFO.fullName}
                  </h3>
                  <p className="text-sm text-slate-400">
                    2nd-Year Computer Science Student
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-slate-300 text-base leading-relaxed">
                <p>{PERSONAL_INFO.bio}</p>
                <p className="text-slate-400 text-sm">
                  Currently studying at LNCT Bhopal, balancing core computer science coursework with hands-on full-stack development, 3D WebGL implementations, and microservices in Python and TypeScript.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08] mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-400 font-mono">
                Graduating <span className="text-white font-semibold">{PERSONAL_INFO.graduatingYear}</span>
              </div>
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-xs py-2 px-3.5"
                aria-label="Download Resume (placeholder)"
              >
                <FileTextIcon className="w-3.5 h-3.5 text-violet-400" />
                <span>Resume (PDF)</span>
              </a>
            </div>
          </TiltCard>
        </div>

        {/* Education & Quick Facts Card (spans 5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <TiltCard
            className="glass-card p-6 sm:p-8 h-full flex flex-col justify-between"
            maxTilt={4}
            borderRadius="lg"
            glareColor="rgba(6, 182, 212, 0.2)"
          >
            <div className="space-y-6">
              <h3 className="font-display text-lg font-bold text-white">
                Education & Facts
              </h3>

              <div className="space-y-5">
                {/* Education Item */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-[12px] bg-violet-600/15 border border-violet-500/25 text-violet-400 mt-1 shrink-0">
                    <GraduationCapIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {PERSONAL_INFO.degree}
                    </h4>
                    <p className="text-sm text-slate-300 mt-0.5">
                      {PERSONAL_INFO.institution}
                    </p>
                    <p className="text-xs text-slate-400 mt-1 font-mono">
                      {PERSONAL_INFO.year} • 2025–2029
                    </p>
                  </div>
                </div>

                {/* Location Item */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-[12px] bg-cyan-600/15 border border-cyan-500/25 text-cyan-400 mt-1 shrink-0">
                    <MapPinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Location</h4>
                    <p className="text-sm text-slate-300 mt-0.5">
                      {PERSONAL_INFO.location}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Available for remote & hybrid opportunities
                    </p>
                  </div>
                </div>

                {/* Shipped Work */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-[12px] bg-emerald-600/15 border border-emerald-500/25 text-emerald-400 mt-1 shrink-0">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Focus</h4>
                    <p className="text-sm text-slate-300 mt-0.5">
                      Full-Stack Web & 3D Spatial Systems
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      3 core production codebases actively developed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08] mt-6">
              <span className="text-xs font-mono text-slate-400">
                Languages: Python, TypeScript, JavaScript, Dart
              </span>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};
