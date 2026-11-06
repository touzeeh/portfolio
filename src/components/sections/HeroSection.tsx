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
  SparklesIcon,
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
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 border border-white/10 text-xs text-slate-300 backdrop-blur-md shadow-lg shadow-black/60 max-w-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-mono text-[11px] tracking-wide text-slate-300 text-center">
            {PERSONAL_INFO.status}
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <h1 className="font-display text-hero-fluid font-bold tracking-tight text-white max-w-3xl mx-auto drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Hi, I'm{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-white to-cyan-300">
              {PERSONAL_INFO.fullName}
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            {PERSONAL_INFO.headline}
          </p>
        </div>

        {/* Subtext */}
        <p className="max-w-xl text-slate-300 text-sm sm:text-base leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {PERSONAL_INFO.subheadline}
        </p>

        {/* Action Row: Primary + Secondary + Small Icon Socials */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {/* Primary CTA */}
          <a
            href="#projects"
            className="btn-primary"
          >
            <span>View Work</span>
            <ArrowUpRightIcon className="w-4 h-4" />
          </a>

          {/* Secondary CTA */}
          <a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            aria-label="Download Resume (PDF placeholder)"
          >
            <FileTextIcon className="w-4 h-4 text-violet-400" />
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
              <GithubIcon size={16} />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-icon text-cyan-400 hover:text-cyan-300"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={16} />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="btn-icon text-violet-400 hover:text-violet-300"
              aria-label="Email Address"
            >
              <MailIcon size={16} />
            </a>
          </div>
        </div>

        {/* 3D Interaction Hint */}
        <div className="pt-6 flex items-center gap-2 text-xs text-slate-500 font-mono">
          <SparklesIcon className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
          <span>Scroll to travel through the 3D stages</span>
        </div>
      </div>

      {/* Down Arrow Indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-2 rounded-xl text-slate-500 hover:text-white transition"
        aria-label="Scroll to About section"
      >
        <ArrowDownIcon className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
};
