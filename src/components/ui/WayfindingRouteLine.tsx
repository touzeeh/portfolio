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
      // In the hero (scrollY < 280), no section is active
      if (window.scrollY < 280) {
        setActiveSection('');
        return;
      }

      let current = '';
      for (const item of SITE_DATA.nav) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active when section top is within top 40% of viewport
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
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

  const handleNodeClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Floor plan wayfinding route"
      className="hidden xl:flex fixed left-6 2xl:left-10 top-1/2 -translate-y-1/2 z-40 flex-col items-center pointer-events-none"
    >
      {/* Route track header indicator */}
      <span className="font-mono text-[10px] tracking-widest text-[var(--text-muted)] uppercase mb-3 select-none">
        NAV
      </span>

      {/* Vertical Wayfinding Track */}
      <div className="relative flex flex-col items-center">
        {/* Background static track */}
        <div className="w-[1.5px] h-64 bg-[var(--route-track)] rounded-full" />

        {/* Animated dynamic progress line */}
        <motion.div
          style={{
            scaleY: shouldReduceMotion ? 0 : scrollYProgress,
            transformOrigin: 'top',
          }}
          className="absolute top-0 w-[2px] h-64 bg-[var(--route-active)] rounded-full"
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
                className="group relative flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded p-1"
                aria-label={`Jump to ${item.label} (Section ${item.number})`}
              >
                {/* Center Node Dot */}
                <div
                  className={`w-2.5 h-2.5 rounded-full border transition-all duration-200 ${
                    isActive
                      ? 'bg-[var(--route-active)] border-[var(--route-active)] scale-125 shadow-[0_0_8px_var(--accent)]'
                      : 'bg-[var(--surface)] border-[var(--route-track)] group-hover:border-[var(--accent)] group-hover:scale-110'
                  }`}
                />

                {/* Popout Eyebrow Label on Hover or Active */}
                <span
                  className={`absolute left-5 font-mono text-[11px] whitespace-nowrap transition-all duration-200 select-none ${
                    isActive
                      ? 'text-[var(--text)] font-semibold opacity-100 translate-x-0'
                      : 'text-[var(--text-muted)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                  }`}
                >
                  <span className="text-[var(--accent)] mr-1">{item.number}</span>
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
