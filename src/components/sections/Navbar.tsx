'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { ArrowUpRightIcon } from '@/components/ui/Icons';
import { SHARED_EASE } from '@/lib/animations';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030712]/90 backdrop-blur-xl border-b border-white/10 py-3 sm:py-3.5 shadow-lg shadow-black/40'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <motion.a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
          className="flex items-center gap-2.5 group outline-none"
          aria-label={`${PERSONAL_INFO.fullName} Home`}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 p-[1.5px] flex items-center justify-center group-hover:shadow-[0_0_14px_rgba(6,182,212,0.6)] transition-shadow">
            <div className="w-full h-full rounded-[10px] bg-[#030712] flex items-center justify-center font-display font-bold text-xs text-white">
              TA
            </div>
          </div>
          <span className="font-display font-semibold text-sm tracking-tight text-slate-200 group-hover:text-white transition">
            {PERSONAL_INFO.shortName}
          </span>
        </motion.a>

        {/* Right Action: Keep Connect Only */}
        <motion.a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('contact');
          }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.05, y: -1 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
          transition={{ duration: 0.2, ease: SHARED_EASE }}
          className="btn-primary text-xs py-2 px-4 sm:px-5 group shadow-lg hover:shadow-cyan-500/20"
        >
          <span>Connect</span>
          <ArrowUpRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.a>
      </div>
    </header>
  );
};
