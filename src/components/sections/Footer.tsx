'use client';

import React from 'react';
import { SITE_DATA } from '@/data/site';
import { GithubIcon, LinkedinIcon, MailIcon, ArrowUpIcon } from '@/components/ui/Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--border)] py-8 px-4 sm:px-6 bg-[var(--surface)] text-[var(--text-muted)] text-sm transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="font-mono text-xs">
          © 2026 <span className="text-[var(--text)] font-semibold">{SITE_DATA.personal.fullName}</span>. Built with calm precision.
        </p>

        {/* Socials & Back to Top */}
        <div className="flex items-center gap-2">
          <a
            href={SITE_DATA.personal.github}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-[8px] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--text)] flex items-center justify-center transition-colors"
            aria-label="GitHub Profile"
            title="GitHub Profile"
          >
            <GithubIcon size={16} />
          </a>

          <a
            href={SITE_DATA.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-[8px] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--text)] flex items-center justify-center transition-colors"
            aria-label="LinkedIn Profile"
            title="LinkedIn Profile"
          >
            <LinkedinIcon size={16} />
          </a>

          <a
            href={`mailto:${SITE_DATA.personal.email}`}
            className="w-10 h-10 rounded-[8px] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--text)] flex items-center justify-center transition-colors"
            aria-label="Send direct email"
            title="Send direct email"
          >
            <MailIcon size={16} />
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            className="w-10 h-10 rounded-[8px] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--text)] flex items-center justify-center transition-colors ml-2"
            aria-label="Scroll back to top"
            title="Back to top"
          >
            <ArrowUpIcon size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};
