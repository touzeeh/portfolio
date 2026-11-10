'use client';

import React, { useRef, useState, useCallback, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
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
  maxTilt = 7,
  glareColor = 'rgba(255, 255, 255, 0.08)',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const isTouch = useSyncExternalStore(subscribePointerCoarse, getPointerCoarseSnapshot, getServerTrue);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  // Spring physics for butter-smooth 3D tilt tracking and damping
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawScale = useMotionValue(1);

  const springConfig = { damping: 22, stiffness: 220, mass: 0.6 };
  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);
  const scale = useSpring(rawScale, springConfig);

  const radiusClass = borderRadius === 'lg' ? 'rounded-[22px]' : 'rounded-[14px]';

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (isTouch || shouldReduceMotion || !ANIMATION_FLAGS.cardTiltAndSpotlight || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalized coordinates (-0.5 to 0.5)
    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;

    // 3D Tilt calculation: tilting towards cursor
    rawRotateX.set(-normY * maxTilt);
    rawRotateY.set(normX * maxTilt);
    rawScale.set(1.015);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });

    // Update CSS variables for hairline spotlight border
    cardRef.current.style.setProperty('--card-mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--card-mouse-y', `${y}px`);
  }, [isTouch, shouldReduceMotion, maxTilt, rawRotateX, rawRotateY, rawScale]);

  const handlePointerEnter = useCallback(() => {
    if (isTouch || shouldReduceMotion) return;
    setIsHovered(true);
  }, [isTouch, shouldReduceMotion]);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawScale.set(1);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  }, [rawRotateX, rawRotateY, rawScale]);

  // If mobile touch or reduced motion, render lightweight static container
  if (isTouch || shouldReduceMotion || !ANIMATION_FLAGS.cardTiltAndSpotlight) {
    return (
      <div
        ref={cardRef}
        className={`relative overflow-hidden ${radiusClass} ${className} transition-colors duration-200 group/card`}
      >
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ perspective: 1200 }}
      className="w-full h-full"
    >
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        className={`relative overflow-hidden ${radiusClass} ${className} transition-shadow duration-300 group/card`}
      >
        {/* 1. Realistic 3D Glass Glare Sheen Reflection */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out z-20"
          style={{
            opacity: isHovered ? glarePos.opacity : 0,
            background: `radial-gradient(500px circle at ${glarePos.x}% ${glarePos.y}%, ${glareColor}, rgba(255, 255, 255, 0.02) 40%, transparent 80%)`,
            mixBlendMode: 'overlay',
          }}
          aria-hidden="true"
        />

        {/* 2. Cursor-Following Hairline Glow Border Highlight */}
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-[inherit] transition-opacity duration-300 z-10 opacity-0 group-hover/card:opacity-100"
          style={{
            background: `radial-gradient(280px circle at var(--card-mouse-x, 50%) var(--card-mouse-y, 50%), rgba(34, 211, 238, 0.28), transparent 70%)`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px',
          }}
          aria-hidden="true"
        />

        {/* 3. Card Inner Content with 3D Depth */}
        <div
          className="relative z-10 w-full h-full"
          style={{ transform: 'translateZ(1px)' }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};
