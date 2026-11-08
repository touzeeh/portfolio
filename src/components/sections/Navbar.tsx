'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none ${
        scrolled
          ? 'bg-[#030712]/90 backdrop-blur-xl border-b border-white/10 py-3 sm:py-3.5 shadow-lg shadow-black/40'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-end">
        {/* Right Action: Connect Only */}
        <motion.a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('contact');
          }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.05, y: -1 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
          transition={{ duration: 0.2, ease: SHARED_EASE }}
          className="btn-primary pointer-events-auto text-xs py-2 px-4 sm:px-5 group shadow-lg hover:shadow-cyan-500/20"
        >
          <span>Connect</span>
          <ArrowUpRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.a>
      </div>
    </header>
  );
};
