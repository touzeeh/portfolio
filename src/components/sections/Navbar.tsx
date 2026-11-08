'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useReducedMotion, AnimatePresence } from 'framer-motion';
import { SITE_DATA } from '@/data/site';
import { ArrowUpRightIcon, MenuIcon, XIcon } from '@/components/ui/Icons';
import { SHARED_EASE } from '@/lib/animations';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Scroll-spy with IntersectionObserver / window scroll check
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // NO active nav item in the hero section (< 280px)
      if (window.scrollY < 280) {
        setActiveSection('');
        return;
      }

      let current = '';
      for (const item of SITE_DATA.nav) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 100) {
            current = item.id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trap focus when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const focusable = mobileMenuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable && focusable.length > 0) {
        focusable[0].focus();
      }
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[var(--surface)]/95 backdrop-blur-md border-b border-[var(--border)] py-3 shadow-sm'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      {/* Top Wayfinding Line Progress */}
      <motion.div
        style={{
          scaleX: shouldReduceMotion ? 0 : scrollYProgress,
          transformOrigin: 'left',
        }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--accent)] pointer-events-none z-50"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Wordmark Left */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="font-display font-semibold text-base sm:text-lg tracking-tight text-[var(--text)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
          aria-label={`${SITE_DATA.personal.fullName} Home`}
        >
          <span>{SITE_DATA.personal.shortName}</span>
          <span className="text-[var(--accent)] font-mono text-sm">.</span>
        </a>

        {/* Center Pill Nav (Desktop): Scroll-spy, NO active item in hero */}
        <nav
          aria-label="Main section navigation"
          className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[var(--surface-2)] border border-[var(--border)]"
        >
          {SITE_DATA.nav.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-[var(--text)] font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
                aria-current={isActive ? 'true' : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    transition={{ type: 'spring', damping: 26, stiffness: 380 }}
                    className="absolute inset-0 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-sm"
                  />
                )}
                <span className="relative z-10 font-mono text-[11px] text-[var(--accent)] mr-1.5 opacity-80">
                  {item.number}
                </span>
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Compact Outline Contact CTA */}
        <div className="flex items-center gap-2.5">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            className="hidden sm:inline-flex items-center gap-1.5 min-h-[44px] px-4 rounded-[10px] bg-transparent border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <span>Contact</span>
            <ArrowUpRightIcon className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-11 h-11 rounded-[10px] bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Sheet Menu with Focus Trap */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: SHARED_EASE }}
            className="md:hidden border-b border-[var(--border)] bg-[var(--surface)] px-6 py-6 shadow-xl flex flex-col gap-3"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="flex flex-col gap-1.5">
              {SITE_DATA.nav.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between min-h-[44px] px-4 rounded-[10px] text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-[var(--surface-2)] text-[var(--accent)] font-semibold border border-[var(--border)]'
                      : 'text-[var(--text)] hover:bg-[var(--surface-2)]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-[var(--text-muted)]">{item.number}</span>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex items-center gap-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('contact');
                }}
                className="btn-primary flex-1 text-center justify-center text-xs"
              >
                <span>Contact</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
