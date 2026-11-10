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
    <footer className="border-t border-white/10 py-8 px-4 sm:px-6 bg-[var(--surface)]/75 backdrop-blur-xl text-[var(--text-muted)] text-sm transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="font-mono text-xs">
          © 2026 <span className="text-[var(--text)] font-semibold">{SITE_DATA.personal.fullName}</span>. Built with calm precision.
        </p>

        {/* Socials & Back to Top with spring animations (44px touch targets) */}
        <div className="flex items-center gap-2">
          <motion.a
            href={SITE_DATA.personal.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.12, y: -2 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.18, ease: SHARED_EASE }}
            className="btn-icon w-11 h-11 rounded-[10px] flex items-center justify-center transition-colors group"
            aria-label="GitHub Profile"
            title="GitHub Profile"
          >
            <Image src="/icons/github.png" alt="GitHub" width={18} height={18} className="w-[18px] h-[18px] object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
          </motion.a>

          <motion.a
            href={SITE_DATA.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.12, y: -2 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.18, ease: SHARED_EASE }}
            className="btn-icon w-11 h-11 rounded-[10px] flex items-center justify-center transition-colors group"
            aria-label="LinkedIn Profile"
            title="LinkedIn Profile"
          >
            <Image src="/icons/linkedin.png" alt="LinkedIn" width={17} height={17} className="w-[17px] h-[17px] object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
          </motion.a>

          <motion.a
            href={`mailto:${SITE_DATA.personal.email}`}
            whileHover={{ scale: 1.12, y: -2 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.18, ease: SHARED_EASE }}
            className="btn-icon w-11 h-11 rounded-[10px] flex items-center justify-center transition-colors group"
            aria-label="Send direct email"
            title="Send direct email"
          >
            <Image src="/icons/gmail.png" alt="Gmail" width={17} height={17} className="w-[17px] h-[17px] object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
          </motion.a>

          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{ scale: 1.12, y: -2 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.18, ease: SHARED_EASE }}
            className="btn-icon w-11 h-11 rounded-[10px] flex items-center justify-center transition-colors ml-2 group cursor-pointer"
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
