'use client';

import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO, NAV_SECTIONS } from '@/data/portfolioData';
import { FileTextIcon, ArrowUpRightIcon } from '@/components/ui/Icons';

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section
      const sections = NAV_SECTIONS.map((s) => document.getElementById(s.id));
      const scrollPos = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(NAV_SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    setActiveSection(id);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030712]/85 backdrop-blur-xl border-b border-white/[0.08] py-2.5 sm:py-3'
          : 'bg-transparent py-3.5 sm:py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="flex items-center gap-2.5 group outline-none"
          aria-label={`${PERSONAL_INFO.fullName} Home`}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 p-[1.5px] flex items-center justify-center">
            <div className="w-full h-full rounded-[10px] bg-[#030712] flex items-center justify-center font-display font-bold text-xs text-white">
              TA
            </div>
          </div>
          <span className="font-display font-semibold text-sm tracking-tight text-slate-200 group-hover:text-white transition">
            {PERSONAL_INFO.shortName}
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-slate-950/80 border border-white/10 backdrop-blur-xl shadow-lg shadow-black/40">
          {NAV_SECTIONS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-violet-600/25 text-white border border-violet-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary text-xs py-2 px-3.5"
            aria-label="Download Resume (PDF)"
          >
            <FileTextIcon className="w-3.5 h-3.5 text-violet-400" />
            <span>Resume</span>
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            className="btn-primary text-xs py-2 px-4"
          >
            <span>Connect</span>
            <ArrowUpRightIcon className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger (44x44px tap target for touch) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-slate-900/90 border border-white/[0.1] text-slate-200 active:scale-95 transition"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={mobileMenuOpen}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Fullscreen Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[57px] bottom-0 bg-[#030712]/98 backdrop-blur-3xl px-6 py-6 flex flex-col justify-between border-t border-white/[0.08] z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-2">
            {NAV_SECTIONS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition ${
                  activeSection === item.id
                    ? 'bg-violet-600/25 text-white border border-violet-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs font-mono text-slate-500">→</span>
              </a>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-white/[0.08] pb-8">
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary w-full py-3.5 text-sm text-center justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FileTextIcon className="w-4 h-4 text-violet-400" />
              <span>Download Resume (PDF)</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
              className="btn-primary w-full py-3.5 text-sm text-center justify-center"
            >
              <span>Connect with Touzeeh</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
