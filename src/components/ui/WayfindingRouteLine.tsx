'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useReducedMotion } from 'framer-motion';
import { SITE_DATA } from '@/data/site';

export const WayfindingRouteLine: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      // In the hero (scrollY < 260), no section is active
      if (window.scrollY < 260) {
        setActiveSection('');
        return;
      }

      const focalY = window.innerHeight * 0.35;
      let closestId = '';
      let closestDist = Infinity;

      for (const item of SITE_DATA.nav) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= focalY + 140 && rect.bottom >= focalY - 100) {
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNodeClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Floor plan wayfinding route"
      className="hidden min-[1200px]:flex fixed left-6 2xl:left-10 top-1/2 -translate-y-1/2 z-40 flex-col items-center pointer-events-none select-none"
    >
      {/* Route track header indicator */}
      <span className="font-mono text-[10px] tracking-widest text-[var(--text-muted)] uppercase mb-3.5 select-none font-semibold">
        NAV
      </span>

      {/* Vertical Wayfinding Track */}
      <div className="relative flex flex-col items-center">
        {/* Background static track */}
        <div className="w-[2px] h-64 bg-[var(--border)] rounded-full opacity-60" />

        {/* Animated dynamic progress line */}
        <motion.div
          style={{
            scaleY: scrollYProgress,
            transformOrigin: 'top',
          }}
          className="absolute top-0 w-[2px] h-64 bg-gradient-to-b from-cyan-400 to-violet-500 rounded-full"
        />

        {/* Section Waypoint Nodes positioned along the track */}
        <div className="absolute top-0 bottom-0 flex flex-col justify-between py-1 pointer-events-auto">
          {SITE_DATA.nav.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNodeClick(item.id)}
                className="group relative flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded p-1"
                aria-label={`Jump to ${item.label} (Section ${item.number})`}
              >
                {/* Center Node Dot (clearly visible, w-3 h-3, cyan glow when active) */}
                <div
                  className={`w-3 h-3 rounded-full border transition-all duration-200 ${
                    isActive
                      ? 'bg-[var(--accent)] border-white scale-125 shadow-[0_0_12px_rgba(34,211,238,0.9)]'
                      : 'bg-[var(--surface-2)] border-[var(--border)] group-hover:border-[var(--accent)] group-hover:scale-115'
                  }`}
                />

                {/* Popout Eyebrow Label on Hover or Active */}
                <span
                  className={`absolute left-6 font-mono text-[11px] whitespace-nowrap px-2 py-0.5 rounded bg-[var(--surface-2)]/90 border border-[var(--border)] backdrop-blur-sm transition-all duration-200 select-none pointer-events-none shadow-sm ${
                    isActive
                      ? 'text-[var(--text)] font-semibold opacity-100 translate-x-0 border-[var(--accent)]/50'
                      : 'text-[var(--text-muted)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                  }`}
                >
                  <span className="text-[var(--accent)] mr-1.5 font-bold">{item.number}</span>
                  <span>{item.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
