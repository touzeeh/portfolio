'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useReducedMotion } from 'framer-motion';
import { ArrowUpRightIcon } from '@/components/ui/Icons';
import { NAV_SECTIONS } from '@/data/portfolioData';
import { SHARED_EASE } from '@/lib/animations';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('projects');
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple intersection check for active nav link
      const sections = NAV_SECTIONS.map((s) => document.getElementById(s.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(NAV_SECTIONS[i].id);
          break;
        }
      }
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
          ? 'bg-[#030712]/92 backdrop-blur-xl border-b border-white/10 py-3 shadow-xl shadow-black/50'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      {/* Top Laser Scroll Progress Bar */}
      <motion.div
        style={{
          scaleX: shouldReduceMotion ? 0 : scrollYProgress,
          transformOrigin: 'left',
        }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.9)] pointer-events-none z-50"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Monogram */}
        <motion.a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
          className="font-display font-bold text-base sm:text-lg tracking-tight text-white hover:text-cyan-300 transition-colors group flex items-center gap-1"
          aria-label="Touzeeh Home"
        >
          <span>Touzeeh</span>
          <span className="text-cyan-400 group-hover:animate-ping">.</span>
        </motion.a>

        {/* Center Section Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-slate-950/70 border border-white/10 backdrop-blur-md">
          {NAV_SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => handleNavClick(section.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    className="absolute inset-0 rounded-full bg-white/10 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                  />
                )}
                <span className="relative z-10">{section.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action: Connect CTA */}
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
