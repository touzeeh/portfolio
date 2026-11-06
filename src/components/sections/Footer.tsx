'use client';

import React from 'react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { GithubIcon, LinkedinIcon, ArrowUpIcon } from '@/components/ui/Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.08] py-8 px-4 sm:px-6 bg-[#030712]/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="text-xs text-slate-400 font-mono">
          © 2026 {PERSONAL_INFO.fullName}. Built with Next.js, R3F & Tailwind.
        </p>

        {/* Socials & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="btn-icon w-8 h-8"
            aria-label="GitHub Profile"
          >
            <GithubIcon size={14} />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="btn-icon w-8 h-8 text-cyan-400 hover:text-cyan-300"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon size={14} />
          </a>

          <a
            href="#hero"
            className="btn-icon w-8 h-8 ml-2"
            aria-label="Back to Top"
          >
            <ArrowUpIcon size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
};
