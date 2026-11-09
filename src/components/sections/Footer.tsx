'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { SITE_DATA } from '@/data/site';
import { ArrowUpIcon } from '@/components/ui/Icons';
import { SHARED_EASE } from '@/lib/animations';

export const Footer: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <footer className="border-t border-[var(--border)] py-8 px-4 sm:px-6 bg-[var(--surface)] text-[var(--text-muted)] text-sm transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="font-mono text-xs">
          © 2026 <span className="text-[var(--text)] font-semibold">{SITE_DATA.personal.fullName}</span>. Built with calm precision.
        </p>

        {/* Socials & Back to Top with spring animations */}
        <div className="flex items-center gap-2">
          <motion.a
            href={SITE_DATA.personal.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.18, ease: SHARED_EASE }}
            className="w-10 h-10 rounded-[8px] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--text)] hover:shadow-[0_0_12px_rgba(34,211,238,0.25)] flex items-center justify-center transition-colors group"
            aria-label="GitHub Profile"
            title="GitHub Profile"
          >
            <Image src="/icons/github.png" alt="GitHub" width={16} height={16} className="w-4 h-4 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
          </motion.a>

          <motion.a
            href={SITE_DATA.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.18, ease: SHARED_EASE }}
            className="w-10 h-10 rounded-[8px] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--text)] hover:shadow-[0_0_12px_rgba(34,211,238,0.25)] flex items-center justify-center transition-colors group"
            aria-label="LinkedIn Profile"
            title="LinkedIn Profile"
          >
            <Image src="/icons/linkedin.png" alt="LinkedIn" width={15} height={15} className="w-[15px] h-[15px] object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
          </motion.a>

          <motion.a
            href={`mailto:${SITE_DATA.personal.email}`}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.18, ease: SHARED_EASE }}
            className="w-10 h-10 rounded-[8px] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--text)] hover:shadow-[0_0_12px_rgba(34,211,238,0.25)] flex items-center justify-center transition-colors group"
            aria-label="Send direct email"
            title="Send direct email"
          >
            <Image src="/icons/gmail.png" alt="Gmail" width={15} height={15} className="w-[15px] h-[15px] object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
          </motion.a>

          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.18, ease: SHARED_EASE }}
            className="w-10 h-10 rounded-[8px] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--text)] hover:shadow-[0_0_12px_rgba(34,211,238,0.25)] flex items-center justify-center transition-colors ml-2 group"
            aria-label="Scroll back to top"
            title="Back to top"
          >
            <ArrowUpIcon size={16} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};
