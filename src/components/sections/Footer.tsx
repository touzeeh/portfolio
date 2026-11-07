'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { GithubIcon, LinkedinIcon, MailIcon, ArrowUpIcon } from '@/components/ui/Icons';
import { SHARED_EASE } from '@/lib/animations';

export const Footer: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="border-t border-white/10 py-8 px-4 sm:px-6 bg-[#030712]/95 backdrop-blur-xl relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <div className="text-center sm:text-left">
          <p className="text-sm text-slate-300 font-mono">
            © 2026 <span className="text-white font-medium">{PERSONAL_INFO.fullName}</span>. All rights reserved.
          </p>
        </div>

        {/* Socials & Back to Top with Spring Hover */}
        <div className="flex items-center gap-2.5">
          <motion.a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.1, y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            transition={{ duration: 0.2, ease: SHARED_EASE }}
            className="w-9 h-9 rounded-lg bg-slate-900 border border-white/10 hover:border-white/30 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            aria-label="GitHub Profile"
          >
            <GithubIcon size={16} />
          </motion.a>

          <motion.a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.1, y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            transition={{ duration: 0.2, ease: SHARED_EASE }}
            className="w-9 h-9 rounded-lg bg-slate-900 border border-white/10 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon size={16} />
          </motion.a>

          <motion.a
            href={`mailto:${PERSONAL_INFO.email}`}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.1, y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            transition={{ duration: 0.2, ease: SHARED_EASE }}
            className="w-9 h-9 rounded-lg bg-slate-900 border border-white/10 hover:border-violet-400/50 text-slate-300 hover:text-violet-400 flex items-center justify-center transition-colors"
            aria-label="Send Email"
          >
            <MailIcon size={16} />
          </motion.a>

          <motion.a
            href="#hero"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.1, y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            transition={{ duration: 0.2, ease: SHARED_EASE }}
            className="w-9 h-9 rounded-lg bg-slate-900 border border-white/10 hover:border-white/40 text-slate-300 hover:text-white flex items-center justify-center ml-2 transition-colors"
            aria-label="Back to Top"
          >
            <ArrowUpIcon size={16} />
          </motion.a>
        </div>
      </div>
    </footer>
  );
};
