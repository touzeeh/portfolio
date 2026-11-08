'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

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
  const shouldReduceMotion = useReducedMotion();

  // Raw mouse coordinates
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Smooth spring physics for outer reticle ring
  const springConfig = shouldReduceMotion
    ? { damping: 50, stiffness: 1000, mass: 0.1 }
    : { damping: 26, stiffness: 380, mass: 0.45 };

  const ringX = useSpring(rawX, springConfig);
  const ringY = useSpring(rawY, springConfig);

  // Fast spring for inner dot (zero lag)
  const dotConfig = { damping: 35, stiffness: 900, mass: 0.1 };
  const dotX = useSpring(rawX, dotConfig);
  const dotY = useSpring(rawY, dotConfig);

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
        'a, button, input, textarea, select, [role="button"], .glass-card, .btn-primary, .btn-secondary, [data-cursor-hover]'
      );
      const text = target.closest('input[type="text"], input[type="email"], textarea');

      setIsHovered(Boolean(interactive));
      setIsTextInput(Boolean(text));
    };

    const handleMouseDown = () => setIsClicking(true);
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

  if (!isFinePointer) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Outer Spring Precision Reticle / Cyber Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          width: isTextInput ? 6 : isHovered ? 52 : isClicking ? 26 : 38,
          height: isTextInput ? 28 : isHovered ? 52 : isClicking ? 26 : 38,
          borderRadius: isTextInput ? '4px' : '9999px',
          borderColor: isHovered
            ? 'rgba(34, 211, 238, 0.95)'
            : isClicking
            ? 'rgba(168, 85, 247, 1)'
            : 'rgba(34, 211, 238, 0.5)',
          backgroundColor: isHovered
            ? 'rgba(6, 182, 212, 0.14)'
            : isClicking
            ? 'rgba(168, 85, 247, 0.25)'
            : 'rgba(6, 182, 212, 0.03)',
          boxShadow: isHovered
            ? '0 0 24px rgba(6, 182, 212, 0.65), inset 0 0 12px rgba(6, 182, 212, 0.3)'
            : isClicking
            ? '0 0 20px rgba(168, 85, 247, 0.8)'
            : '0 0 14px rgba(139, 92, 246, 0.3)',
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 400,
        }}
      >
        {/* Subtle Cyber Crosshairs on Hover */}
        {isHovered && !isTextInput && !shouldReduceMotion && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-1.5 h-[1px] bg-cyan-300 absolute -left-1" />
            <div className="w-1.5 h-[1px] bg-cyan-300 absolute -right-1" />
            <div className="h-1.5 w-[1px] bg-cyan-300 absolute -top-1" />
            <div className="h-1.5 w-[1px] bg-cyan-300 absolute -bottom-1" />
          </div>
        )}
      </motion.div>

      {/* Inner Immediate Core Dot */}
      {!isTextInput && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
          style={{
            x: dotX,
            y: dotY,
          }}
          animate={{
            width: isHovered ? 8 : isClicking ? 5 : 7,
            height: isHovered ? 8 : isClicking ? 5 : 7,
            backgroundColor: isHovered
              ? '#ffffff'
              : isClicking
              ? '#c084fc'
              : '#22d3ee',
            boxShadow: isHovered
              ? '0 0 10px #ffffff, 0 0 20px #22d3ee'
              : '0 0 8px #22d3ee',
          }}
          transition={{ duration: 0.15 }}
        />
      )}
    </div>
  );
};
