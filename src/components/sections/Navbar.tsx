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
      setScrolled(window.scrollY > 30);

      // Determine active section
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-white/[0.08] py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero"
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
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-slate-900/60 border border-white/[0.06] backdrop-blur-md">
          {NAV_SECTIONS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
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
            aria-label="Download Resume (PDF placeholder)"
          >
            <FileTextIcon className="w-3.5 h-3.5 text-violet-400" />
            <span>Resume</span>
          </a>

          <a
            href="#contact"
            className="btn-primary text-xs py-2 px-4"
          >
            <span>Connect</span>
            <ArrowUpRightIcon className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-slate-900/80 border border-white/[0.08] text-slate-300 hover:text-white"
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#030712]/95 backdrop-blur-2xl px-6 py-5 flex flex-col gap-2">
          {NAV_SECTIONS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition ${
                activeSection === item.id
                  ? 'bg-violet-600/20 text-white border border-violet-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/[0.08] flex items-center gap-3">
            <a
              href={PERSONAL_INFO.resumeUrl}
              className="btn-secondary text-xs flex-1 text-center justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resume
            </a>
            <a
              href="#contact"
              className="btn-primary text-xs flex-1 text-center justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Connect
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
