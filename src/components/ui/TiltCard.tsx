'use client';

import React, { useRef, useState, useCallback, useSyncExternalStore } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SHARED_EASE } from '@/lib/animations';
import { ANIMATION_FLAGS } from '@/config/animations';

const subscribePointerCoarse = (callback: () => void) => {
  const mql = window.matchMedia('(pointer: coarse)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
};
const getPointerCoarseSnapshot = () => window.matchMedia('(pointer: coarse)').matches;
const getServerTrue = () => true;

interface CardProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: 'sm' | 'lg';
  maxTilt?: number;
  glareColor?: string;
}

export const TiltCard: React.FC<CardProps> = ({
  children,
  className = '',
  borderRadius = 'lg',
  glareColor = 'rgba(255, 255, 255, 0.04)',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const isTouch = useSyncExternalStore(subscribePointerCoarse, getPointerCoarseSnapshot, getServerTrue);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0, opacity: 0 });
  const radiusClass = borderRadius === 'lg' ? 'rounded-[22px]' : 'rounded-[14px]';

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (isTouch || shouldReduceMotion || !ANIMATION_FLAGS.cardTiltAndSpotlight || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSpotlightPos({ x, y, opacity: 1 });

    // Update CSS variables for glow border
    cardRef.current.style.setProperty('--card-mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--card-mouse-y', `${y}px`);
  }, [isTouch, shouldReduceMotion]);

  const handlePointerLeave = useCallback(() => {
    setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      initial={{ y: 0 }}
      whileHover={shouldReduceMotion || isTouch ? undefined : { y: -6, scale: 1.01 }}
      transition={{
        duration: 0.25,
        ease: SHARED_EASE,
      }}
      className={`relative overflow-hidden ${radiusClass} ${className} transition-all duration-300 group/card`}
      style={{ willChange: 'transform' }}
    >
      {/* 1. Dynamic Cursor Spotlight Glare */}
      {!isTouch && !shouldReduceMotion && ANIMATION_FLAGS.cardTiltAndSpotlight && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 ease-out z-0"
          style={{
            opacity: spotlightPos.opacity,
            background: `radial-gradient(420px circle at ${spotlightPos.x}px ${spotlightPos.y}px, ${glareColor}, transparent 75%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* 2. Cursor-Following Glow Border Highlight */}
      {!isTouch && !shouldReduceMotion && ANIMATION_FLAGS.cardTiltAndSpotlight && (
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-[inherit] transition-opacity duration-300 z-0 opacity-0 group-hover/card:opacity-100"
          style={{
            background: `radial-gradient(280px circle at var(--card-mouse-x, 50%) var(--card-mouse-y, 50%), rgba(34, 211, 238, 0.22), transparent 70%)`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px',
          }}
          aria-hidden="true"
        />
      )}

      {/* 3. Card Inner Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};
