'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SHARED_EASE } from '@/lib/animations';

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
  glareColor = 'rgba(6, 182, 212, 0.15)',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, opacity: 0 });
  const radiusClass = borderRadius === 'lg' ? 'rounded-[20px]' : 'rounded-[12px]';

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || shouldReduceMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  }, [shouldReduceMotion]);

  const handleMouseLeave = useCallback(() => {
    setMousePos((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ y: 0 }}
      whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.01 }}
      transition={{
        duration: 0.25,
        ease: SHARED_EASE,
      }}
      className={`relative overflow-hidden ${radiusClass} ${className} transition-shadow duration-300`}
      style={{ willChange: 'transform' }}
    >
      {/* Sensitive cursor spotlight glare */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 ease-out z-0"
        style={{
          opacity: mousePos.opacity,
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${glareColor}, transparent 75%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};
