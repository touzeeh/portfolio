'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { SITE_DATA } from '@/data/site';
import { ANIMATION_FLAGS } from '@/config/animations';

const TRACK_HEIGHT = 260;

export const WayfindingRouteLine: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Smooth spring for SVG line drawing and traveling agent dot
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 24,
    stiffness: 220,
    mass: 0.15,
  });

  const agentY = useTransform(smoothProgress, [0, 1], [4, TRACK_HEIGHT - 4]);

  useEffect(() => {
    const handleScroll = () => {
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
      aria-label="A* Floor plan wayfinding route"
      className="hidden min-[1200px]:flex fixed left-6 2xl:left-10 top-1/2 -translate-y-1/2 z-40 flex-col items-center pointer-events-none select-none"
    >
      {/* Route track header indicator */}
      <span className="font-mono text-[9px] tracking-widest text-[var(--text-muted)] uppercase mb-3.5 select-none font-bold opacity-75">
        A* ROUTE
      </span>

      {/* Vertical Wayfinding Track */}
      <div className="relative flex flex-col items-center w-6 h-[260px]">
        {/* SVG Drawing Track */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          viewBox={`0 0 24 ${TRACK_HEIGHT}`}
          fill="none"
        >
          <defs>
            <linearGradient id="route-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
            <filter id="agent-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Static Blueprint Background Track */}
          <line
            x1="12"
            y1="4"
            x2="12"
            y2={TRACK_HEIGHT - 4}
            stroke="var(--border)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            strokeOpacity="0.8"
          />

          {/* Animated Scroll-Driven Drawn Path */}
          {ANIMATION_FLAGS.wayfindingRoute && (
            <motion.line
              x1="12"
              y1="4"
              x2="12"
              y2={TRACK_HEIGHT - 4}
              stroke="url(#route-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{
                pathLength: shouldReduceMotion ? scrollYProgress : smoothProgress,
              }}
            />
          )}

          {/* Traveling Glowing Agent Dot at Head of Active Path */}
          {ANIMATION_FLAGS.wayfindingRoute && !shouldReduceMotion && (
            <motion.circle
              cx="12"
              style={{ cy: agentY }}
              r="3.5"
              fill="#FFFFFF"
              filter="url(#agent-glow)"
            />
          )}
        </svg>

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
                aria-label={`Jump to ${item.label} (Waypoint ${item.number})`}
              >
                {/* Center Node Dot */}
                <div className="relative flex items-center justify-center">
                  {/* Pulse Ring when reached */}
                  {isActive && !shouldReduceMotion && (
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0.8 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="absolute w-3.5 h-3.5 rounded-full bg-[var(--accent)]"
                    />
                  )}

                  <div
                    className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                      isActive
                        ? 'bg-[var(--accent)] border-white scale-125 shadow-[0_0_12px_rgba(34,211,238,0.95)]'
                        : 'bg-[var(--surface-2)] border-[var(--border)] group-hover:border-[var(--accent)] group-hover:scale-115'
                    }`}
                  />
                </div>

                {/* Popout Eyebrow Label on Hover or Active */}
                <span
                  className={`absolute left-7 font-mono text-[11px] whitespace-nowrap px-2 py-0.5 rounded bg-[var(--surface-2)]/90 border border-[var(--border)] backdrop-blur-sm transition-all duration-200 select-none pointer-events-none shadow-sm ${
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
