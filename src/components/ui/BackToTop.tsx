'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpIcon } from '@/components/ui/Icons';
import { SHARED_EASE } from '@/lib/animations';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.3, ease: SHARED_EASE }}
          whileHover={shouldReduceMotion ? undefined : { y: -3 }}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl bg-slate-900/90 border border-white/20 text-slate-300 hover:text-white hover:border-cyan-400/50 shadow-xl shadow-black/60 backdrop-blur-xl flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Back to Top"
        >
          <ArrowUpIcon size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
