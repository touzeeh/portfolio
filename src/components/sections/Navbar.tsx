'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useReducedMotion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { SITE_DATA } from '@/data/site';
import { ArrowUpRightIcon, MenuIcon, XIcon } from '@/components/ui/Icons';
import { SHARED_EASE } from '@/lib/animations';
import { ANIMATION_FLAGS } from '@/config/animations';

const MusicDock = dynamic(
  () => import('@/components/ui/Music').then((m) => m.MusicDock),
  {
    ssr: false,
    loading: () => (
      <div className="w-7 h-7 rounded-full border border-[var(--border)] opacity-40 shrink-0" />
    ),
  }
);

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const lensRef = useRef<{ destroy?: () => void; setTint?: (tint: string) => void } | null>(null);
  const isMountedRef = useRef(true);

  // Apply liquidGL glass effect to ONE element only: the navbar pill
  useEffect(() => {
    isMountedRef.current = true;

    const initLiquidGL = async () => {
      const pillElement = document.getElementById('navbar-pill');
      if (!pillElement) return;

      try {
        const liquidGLModule = await import('liquid-gl');
        const liquidGL = liquidGLModule.default;
        if (!isMountedRef.current || !liquidGL) return;

        const isLight = document.documentElement.classList.contains('light');

        const instance = liquidGL({
          target: '#navbar-pill-lens',
          content: false,
          snapshot: 'body',
          engine: 'auto', // WebGPU -> WebGL2 -> WebGL1 -> CSS fallback
          refraction: 0.015,
          bevelDepth: 0.08,
          bevelWidth: 0.12,
          frost: 1.5,
          shadow: false,
          specular: true,
          reveal: 'none',
          tint: isLight ? 'rgba(255, 255, 255, 0.3)' : 'rgba(14, 20, 36, 0.35)',
        });
        if (!isMountedRef.current) {
          instance?.destroy?.();
        } else {
          lensRef.current = instance;
        }
      } catch (err) {
        // Fall back to normal CSS backdrop-filter glass if WebGL fails
        console.warn('liquidGL fallback to CSS glass:', err);
      }
    };

    initLiquidGL();

    const themeObserver = new MutationObserver(() => {
      if (lensRef.current?.setTint) {
        const isLight = document.documentElement.classList.contains('light');
        lensRef.current.setTint(isLight ? 'rgba(255, 255, 255, 0.45)' : 'rgba(14, 20, 36, 0.45)');
      }
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });

    return () => {
      isMountedRef.current = false;
      themeObserver.disconnect();
      try {
        lensRef.current?.destroy?.();
        lensRef.current = null;
      } catch {}
    };
  }, []);

  // Scroll-spy with IntersectionObserver & distance-to-focal-point
  useEffect(() => {
    const handleScroll = () => {
      // Condense header after 40px scroll
      setScrolled(window.scrollY > 40);

      // NO active nav item in the hero section (< 260px)
      if (window.scrollY < 260) {
        setActiveSection('');
        return;
      }

      // Compute section closest to target reading zone (top 35% of viewport)
      const focalY = window.innerHeight * 0.35;
      let closestId = '';
      let closestDist = Infinity;

      for (const item of SITE_DATA.nav) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= focalY + 120 && rect.bottom >= focalY - 80) {
            const dist = Math.abs(rect.top - focalY);
            if (dist < closestDist) {
              closestDist = dist;
              closestId = item.id;
            }
          }
        }
      }
      if (closestId) {
        setActiveSection(closestId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver fallback for smooth entry
    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 260) {
          setActiveSection('');
          return;
        }
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0.15, 0.3, 0.6],
      }
    );

    SITE_DATA.nav.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Trap focus when mobile menu is open & ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      const focusable = mobileMenuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable && focusable.length > 0) {
        focusable[0].focus();
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled && ANIMATION_FLAGS.condensedHeader
          ? 'bg-[var(--surface)]/90 backdrop-blur-xl border-b border-[var(--border)] py-2 sm:py-2.5 shadow-md shadow-black/10'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      {/* Top Wayfinding Line Progress */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          transformOrigin: 'left',
        }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--accent)] pointer-events-none z-50"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-[1fr_auto_1fr] items-center">
        {/* Left Column: Music Dock (28px button + 10px gap + lyric line) */}
        <div className="min-w-0 flex items-center pr-3">
          <MusicDock />
        </div>

        {/* Center Column: Center Pill Nav (Desktop) with liquidGL Glass Effect */}
        <nav
          id="navbar-pill"
          aria-label="Main section navigation"
          className="hidden md:flex items-center justify-center gap-1 p-1 rounded-full bg-[var(--surface-2)]/80 backdrop-blur-md border border-[var(--border)] shadow-lg shadow-black/20 relative"
        >
          {/* Glass Lens Element for liquidGL */}
          <div
            id="navbar-pill-lens"
            aria-hidden="true"
            className="absolute inset-0 rounded-full pointer-events-none -z-10"
          />

          <div id="navbar-pill-content" className="flex items-center justify-center gap-1 relative z-10">
            {SITE_DATA.nav.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.18, ease: SHARED_EASE }}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
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
                  <span className="relative z-10">{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </nav>

        {/* Right Column: Contact CTA & Mobile Hamburger */}
        <div className="flex items-center justify-end gap-2.5">
          {/* Contact CTA */}
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: SHARED_EASE }}
            className="hidden sm:inline-flex items-center gap-1.5 min-h-[40px] px-3.5 rounded-[10px] btn-secondary text-xs font-semibold focus-visible:ring-2 focus-visible:ring-[var(--accent)] group shadow-sm hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          >
            <span>Contact</span>
            <ArrowUpRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.a>

          {/* Mobile Menu Hamburger (Touch target >= 44px) */}
          <motion.button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.15 }}
            className="md:hidden w-11 h-11 rounded-[10px] btn-icon text-[var(--text)] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer (Accessible modal with focus trapping & glass UI) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: SHARED_EASE }}
            className="md:hidden fixed inset-x-0 top-[60px] bg-[#070A14]/95 backdrop-blur-3xl border-b border-white/10 shadow-2xl p-6 select-none z-50"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="flex flex-col gap-2 max-w-sm mx-auto">
              {SITE_DATA.nav.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center justify-between w-full p-3.5 rounded-xl text-left text-sm font-medium transition-all ${
                      isActive
                        ? 'glass-subcard text-[var(--accent)] !border-cyan-400/40 font-semibold'
                        : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="flex-1 text-sm">{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
                    )}
                  </motion.button>
                );
              })}

              <div className="pt-4 mt-2 border-t border-white/10">
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('contact');
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full btn-primary py-3.5 px-4 text-center text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Contact Touzeeh</span>
                  <ArrowUpRightIcon className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
