'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  // Raw mouse coordinates
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Snappy direct spring for solid dot core (instant, crisp tracking)
  const dotX = useSpring(rawX, { damping: 40, stiffness: 1000, mass: 0.05 });
  const dotY = useSpring(rawY, { damping: 40, stiffness: 1000, mass: 0.05 });

  // Responsive trailing spring (tightened follow smoothing ~0.22 lerp equivalent, zero sluggishness)
  const ringX = useSpring(rawX, { damping: 28, stiffness: 450, mass: 0.16 });
  const ringY = useSpring(rawY, { damping: 28, stiffness: 450, mass: 0.16 });

  useEffect(() => {
    // Detect touch / coarse pointer devices
    if (typeof window !== 'undefined') {
      const matchCoarse = window.matchMedia('(pointer: coarse)').matches;
      if (matchCoarse) {
        setIsTouchDevice(true);
        return;
      }
    }

    let hasAddedClass = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        rawX.set(e.clientX);
        rawY.set(e.clientY);
        dotX.set(e.clientX);
        dotY.set(e.clientY);
        ringX.set(e.clientX);
        ringY.set(e.clientY);
        setIsVisible(true);
      } else {
        rawX.set(e.clientX);
        rawY.set(e.clientY);
      }

      if (!hasAddedClass) {
        document.documentElement.classList.add('custom-cursor-active');
        hasAddedClass = true;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const text = target.closest('input, textarea, [contenteditable="true"]');
      const interactive = target.closest(
        'a, button, [role="button"], .site-card, .btn-primary, .btn-secondary, .btn-icon, .btn-ghost, .tech-chip, [data-cursor-hover]'
      );

      setIsTextInput(Boolean(text));
      setIsHovered(Boolean(interactive) && !text);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      if (!isTextInput) {
        const newRipple = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY };
        setRipples((prev) => [...prev.slice(-3), newRipple]);
      }
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
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [rawX, rawY, isVisible, dotX, dotY, ringX, ringY, isTextInput]);

  // Clean up completed ripples after animation
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 500);
    return () => clearTimeout(timer);
  }, [ripples]);

  // Hide completely on touch devices or before initial mouse move
  if (isTouchDevice || !isVisible) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[999999] transition-opacity duration-150 ${
        isTextInput ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* 1. Outer Smooth Trailing Ring with Morphing State */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform z-10"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: isHovered ? 48 : isClicking ? 28 : 36,
          height: isHovered ? 48 : isClicking ? 28 : 36,
          borderColor: isHovered
            ? '#22d3ee'
            : isClicking
            ? '#a78bfa'
            : 'rgba(34, 211, 238, 0.7)',
          backgroundColor: isHovered
            ? 'rgba(34, 211, 238, 0.15)'
            : isClicking
            ? 'rgba(167, 139, 250, 0.22)'
            : 'rgba(34, 211, 238, 0.04)',
          boxShadow: isHovered
            ? '0 0 20px rgba(34, 211, 238, 0.55), inset 0 0 10px rgba(34, 211, 238, 0.25)'
            : isClicking
            ? '0 0 16px rgba(167, 139, 250, 0.55)'
            : '0 0 10px rgba(34, 211, 238, 0.3)',
          borderWidth: '1.5px',
          scale: isClicking ? 0.92 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 26,
          stiffness: 420,
        }}
      />

      {/* 2. Solid Full Dot Core */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform z-20 flex items-center justify-center"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          animate={{
            width: isHovered ? 12 : isClicking ? 8 : 10,
            height: isHovered ? 12 : isClicking ? 8 : 10,
            scale: isClicking ? 0.85 : 1,
          }}
          transition={{ type: 'spring', damping: 28, stiffness: 500 }}
          className="rounded-full bg-[#22d3ee] border-2 border-[#070A14] shadow-[0_0_12px_#22d3ee,0_0_20px_rgba(34,211,238,0.8)] flex items-center justify-center cursor-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
        </motion.div>
      </motion.div>

      {/* 3. Click Shockwave Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0.3, opacity: 0.9 }}
            animate={{ scale: 2.4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="fixed pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400 z-10"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 32,
              height: 32,
              boxShadow: '0 0 14px rgba(34, 211, 238, 0.7)',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
