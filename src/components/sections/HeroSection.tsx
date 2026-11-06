'use client';

import React from 'react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  FileTextIcon,
  ArrowDownIcon,
  ArrowUpRightIcon,
} from '@/components/ui/Icons';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 pt-28 pb-16"
    >
      {/* Targeted radial backdrop for 100% text contrast while letting 3D universe orbit cleanly around */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_center,rgba(3,7,18,0.78)_0%,rgba(3,7,18,0.4)_60%,transparent_90%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
        {/* Prominent Status Pill Badge for Recruiters */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950/90 border border-emerald-500/35 text-xs sm:text-sm text-slate-200 backdrop-blur-xl shadow-xl shadow-black/70 max-w-full">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-medium tracking-wide">
            {PERSONAL_INFO.status}
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <h1 className="font-display text-hero-fluid font-bold tracking-tight text-white max-w-3xl mx-auto drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
            Hi, I'm{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-violet-300">
              {PERSONAL_INFO.fullName}
            </span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-100 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {PERSONAL_INFO.headline}
          </p>
        </div>

        {/* Subtext */}
        <p className="max-w-xl text-slate-300 text-base sm:text-lg leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {PERSONAL_INFO.subheadline}
        </p>

        {/* Action Row: Primary + Secondary + Small Icon Socials */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          {/* Primary CTA */}
          <a
            href="#projects"
            className="btn-primary px-7 py-3.5 text-sm sm:text-base font-semibold"
          >
            <span>View Projects</span>
            <ArrowUpRightIcon className="w-4 h-4" />
          </a>

          {/* Secondary CTA */}
          <a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary px-6 py-3.5 text-sm sm:text-base font-medium"
            aria-label="Download Resume"
          >
            <FileTextIcon className="w-4 h-4 text-cyan-400" />
            <span>Download Resume</span>
          </a>

          {/* Icon Links */}
          <div className="flex items-center gap-2 sm:ml-2">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="btn-icon"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={18} />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-icon text-cyan-400 hover:text-cyan-300"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={18} />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="btn-icon text-violet-400 hover:text-violet-300"
              aria-label="Email Touzeeh"
            >
              <MailIcon size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Down Arrow Indicator directly pointing to Projects */}
      <a
        href="#projects"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-2 rounded-xl text-slate-400 hover:text-white transition"
        aria-label="Scroll to Projects section"
      >
        <ArrowDownIcon className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  );
};
