'use client';

import React from 'react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { GithubIcon, LinkedinIcon, MailIcon, ArrowUpIcon } from '@/components/ui/Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 py-8 px-4 sm:px-6 bg-[#030712]/95 backdrop-blur-xl relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright & Tech Stack */}
        <div className="text-center sm:text-left space-y-1">
          <p className="text-sm text-slate-300 font-mono">
            © 2026 <span className="text-white font-medium">{PERSONAL_INFO.fullName}</span>. All rights reserved.
          </p>
          <p className="text-xs text-slate-400 font-mono">
            Built with Next.js, Three.js & Tailwind CSS.
          </p>
        </div>

        {/* Socials & Back to Top */}
        <div className="flex items-center gap-2.5">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-lg bg-slate-900 border border-white/10 hover:border-white/30 text-slate-300 hover:text-white flex items-center justify-center transition"
            aria-label="GitHub Profile"
          >
            <GithubIcon size={16} />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-lg bg-slate-900 border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon size={16} />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="w-9 h-9 rounded-lg bg-slate-900 border border-white/10 hover:border-violet-400/40 text-slate-300 hover:text-violet-400 flex items-center justify-center transition"
            aria-label="Send Email"
          >
            <MailIcon size={16} />
          </a>

          <a
            href="#hero"
            className="w-9 h-9 rounded-lg bg-slate-900 border border-white/10 hover:border-white/40 text-slate-300 hover:text-white flex items-center justify-center ml-2 transition"
            aria-label="Back to Top"
          >
            <ArrowUpIcon size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};
