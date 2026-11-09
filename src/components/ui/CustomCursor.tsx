'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion, AnimatePresence } from 'framer-motion';

function subscribeFinePointer(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const media = window.matchMedia('(pointer: fine)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function getFinePointerSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: fine)').matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export const CustomCursor: React.FC = () => {
  const isFinePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot
  );

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const shouldReduceMotion = useReducedMotion();

  // Raw mouse coordinates
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Fast spring for inner core dot (direct, zero lag response)
  const dotConfig = { damping: 38, stiffness: 950, mass: 0.08 };
  const dotX = useSpring(rawX, dotConfig);
  const dotY = useSpring(rawY, dotConfig);

  // Smooth fluid spring for outer tactical HUD reticle
  const ringConfig = shouldReduceMotion
    ? { damping: 50, stiffness: 1000, mass: 0.1 }
    : { damping: 24, stiffness: 360, mass: 0.3 };
  const ringX = useSpring(rawX, ringConfig);
  const ringY = useSpring(rawY, ringConfig);

  // Secondary trailing satellite node (momentum lag effect)
  const trailConfig = { damping: 18, stiffness: 190, mass: 0.45 };
  const trailX = useSpring(rawX, trailConfig);
  const trailY = useSpring(rawY, trailConfig);

  useEffect(() => {
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], .site-card, .btn-primary, .btn-secondary, .tech-chip, [data-cursor-hover]'
      );
      const text = target.closest('input[type="text"], input[type="email"], textarea');

      setIsHovered(Boolean(interactive));
      setIsTextInput(Boolean(text));
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const newRipple = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-3), newRipple]);
    };

    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [rawX, rawY, isFinePointer]);

  // Clean up completed ripples after animation
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [ripples]);

  if (!isFinePointer || shouldReduceMotion) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 1. Trailing Satellite Particle Node */}
      {!isTextInput && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform z-10"
          style={{ x: trailX, y: trailY }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-violet-400/80 shadow-[0_0_10px_#a78bfa] blur-[0.5px]" />
        </motion.div>
      )}

      {/* 2. Outer Tactical Sci-Fi HUD Reticle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform z-20"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: isTextInput ? 4 : isHovered ? 56 : isClicking ? 28 : 38,
          height: isTextInput ? 26 : isHovered ? 56 : isClicking ? 28 : 38,
          borderRadius: isTextInput ? '2px' : '9999px',
          borderColor: isHovered
            ? '#22d3ee'
            : isClicking
            ? '#a78bfa'
            : 'rgba(34, 211, 238, 0.75)',
          backgroundColor: isHovered
            ? 'rgba(34, 211, 238, 0.12)'
            : isClicking
            ? 'rgba(167, 139, 250, 0.25)'
            : 'rgba(7, 10, 20, 0.2)',
          boxShadow: isHovered
            ? '0 0 24px rgba(34, 211, 238, 0.6), inset 0 0 12px rgba(34, 211, 238, 0.3)'
            : isClicking
            ? '0 0 20px rgba(167, 139, 250, 0.7)'
            : '0 0 12px rgba(34, 211, 238, 0.35)',
          borderWidth: isTextInput ? '0px' : '1.5px',
          scale: isClicking ? 0.9 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 380,
        }}
      >
        {/* Four HUD Crosshair Ticks when not typing */}
        {!isTextInput && (
          <>
            {/* Top Tick */}
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-[2px] h-1.5 bg-cyan-400 rounded-full shadow-[0_0_6px_#22d3ee]" />
            {/* Bottom Tick */}
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[2px] h-1.5 bg-cyan-400 rounded-full shadow-[0_0_6px_#22d3ee]" />
            {/* Left Tick */}
            <span className="absolute top-1/2 -left-2 -translate-y-1/2 h-[2px] w-1.5 bg-cyan-400 rounded-full shadow-[0_0_6px_#22d3ee]" />
            {/* Right Tick */}
            <span className="absolute top-1/2 -right-2 -translate-y-1/2 h-[2px] w-1.5 bg-cyan-400 rounded-full shadow-[0_0_6px_#22d3ee]" />

            {/* Corner Targeting Reticles on Hover */}
            {isHovered && (
              <>
                <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-300" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-300" />
                <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-300" />
                <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-300" />
              </>
            )}

            {/* Orbiting Satellite Light Beam */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
              className="absolute inset-0 flex items-center justify-start pointer-events-none"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff,0_0_12px_#22d3ee] -translate-x-0.5" />
            </motion.div>
          </>
        )}
      </motion.div>

      {/* 3. Inner Immediate High-Precision Laser Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform z-30 flex items-center justify-center"
        style={{ x: dotX, y: dotY }}
      >
        {isTextInput ? (
          <div className="w-[3px] h-6 bg-cyan-400 rounded-sm shadow-[0_0_10px_#22d3ee] animate-pulse" />
        ) : (
          <div className="relative flex items-center justify-center">
            {/* Outer halo */}
            <span
              className={`absolute rounded-full transition-all duration-200 ${
                isHovered
                  ? 'w-4 h-4 bg-cyan-400/30 blur-[1px]'
                  : 'w-3 h-3 bg-cyan-400/20'
              }`}
            />
            {/* Core bright point */}
            <span
              className={`relative rounded-full transition-all duration-150 border border-slate-950/80 ${
                isHovered
                  ? 'w-2.5 h-2.5 bg-white shadow-[0_0_10px_#ffffff,0_0_16px_#22d3ee]'
                  : isClicking
                  ? 'w-2 h-2 bg-violet-300 shadow-[0_0_12px_#a78bfa]'
                  : 'w-2 h-2 bg-cyan-300 shadow-[0_0_8px_#22d3ee]'
              }`}
            />
          </div>
        )}
      </motion.div>

      {/* 4. Click Shockwave Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0.3, opacity: 0.95 }}
            animate={{ scale: 2.8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="fixed pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-400 z-20"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 32,
              height: 32,
              boxShadow: '0 0 16px rgba(34, 211, 238, 0.8)',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
