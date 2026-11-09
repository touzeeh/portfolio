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
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  // Raw mouse coordinates
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Fast direct spring for the solid full dot (near-zero latency, crisp tracking)
  const dotX = useSpring(rawX, { damping: 45, stiffness: 1200, mass: 0.05 });
  const dotY = useSpring(rawY, { damping: 45, stiffness: 1200, mass: 0.05 });

  // Smooth fluid spring for the outer trailing glow ring
  const ringX = useSpring(rawX, { damping: 25, stiffness: 350, mass: 0.25 });
  const ringY = useSpring(rawY, { damping: 25, stiffness: 350, mass: 0.25 });

  useEffect(() => {
    let hasAddedClass = false;

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      if (!hasAddedClass) {
        document.documentElement.classList.add('custom-cursor-active');
        hasAddedClass = true;
      }
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
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [rawX, rawY, isVisible]);

  // Clean up completed ripples after animation
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [ripples]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[999999] transition-opacity duration-200"
      aria-hidden="true"
    >
      {/* 1. Outer Smooth Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform z-10"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: isTextInput ? 4 : isHovered ? 52 : isClicking ? 28 : 38,
          height: isTextInput ? 26 : isHovered ? 52 : isClicking ? 28 : 38,
          borderRadius: isTextInput ? '2px' : '9999px',
          borderColor: isHovered
            ? '#22d3ee'
            : isClicking
            ? '#a78bfa'
            : 'rgba(34, 211, 238, 0.65)',
          backgroundColor: isHovered
            ? 'rgba(34, 211, 238, 0.14)'
            : isClicking
            ? 'rgba(167, 139, 250, 0.25)'
            : 'rgba(34, 211, 238, 0.04)',
          boxShadow: isHovered
            ? '0 0 20px rgba(34, 211, 238, 0.5), inset 0 0 10px rgba(34, 211, 238, 0.25)'
            : isClicking
            ? '0 0 16px rgba(167, 139, 250, 0.6)'
            : '0 0 10px rgba(34, 211, 238, 0.3)',
          borderWidth: isTextInput ? '0px' : '1.5px',
          scale: isClicking ? 0.9 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 380,
        }}
      />

      {/* 2. Solid Full Dot Core (Highly Visible Full Dot) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform z-20 flex items-center justify-center"
        style={{ x: dotX, y: dotY }}
      >
        {isTextInput ? (
          <div className="w-[3px] h-6 bg-cyan-400 rounded-sm shadow-[0_0_12px_#22d3ee] animate-pulse" />
        ) : (
          <motion.div
            animate={{
              width: isHovered ? 16 : isClicking ? 9 : 13,
              height: isHovered ? 16 : isClicking ? 9 : 13,
              scale: isClicking ? 0.85 : 1,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 450 }}
            className="rounded-full bg-[#22d3ee] border-2 border-black/90 shadow-[0_0_12px_#22d3ee,0_0_24px_rgba(34,211,238,0.8),0_2px_4px_rgba(0,0,0,0.9)] flex items-center justify-center"
          >
            {/* White-hot center highlight */}
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
          </motion.div>
        )}
      </motion.div>

      {/* 3. Click Shockwave Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0.3, opacity: 0.95 }}
            animate={{ scale: 2.6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-400 z-10"
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
