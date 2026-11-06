'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SHARED_EASE } from '@/lib/animations';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: 'sm' | 'lg';
  // Legacy props kept for compatibility without tilt
  maxTilt?: number;
  glareColor?: string;
}

export const TiltCard: React.FC<CardProps> = ({
  children,
  className = '',
  borderRadius = 'sm',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const radiusClass = borderRadius === 'lg' ? 'rounded-[20px]' : 'rounded-[12px]';

  if (shouldReduceMotion) {
    return (
      <div className={`relative overflow-hidden ${radiusClass} ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 0 }}
      whileHover={{ y: -5 }}
      transition={{
        duration: 0.25,
        ease: SHARED_EASE,
      }}
      className={`relative overflow-hidden ${radiusClass} ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
};
