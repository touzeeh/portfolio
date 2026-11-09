'use client';

import React, { useRef, useSyncExternalStore } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { SPRING } from '@/lib/motion';
import { ANIMATION_FLAGS } from '@/config/animations';

const subscribePointerCoarse = (callback: () => void) => {
  const mql = window.matchMedia('(pointer: coarse)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
};
const getPointerCoarseSnapshot = () => window.matchMedia('(pointer: coarse)').matches;
const getServerTrue = () => true;

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  maxDistance?: number;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  target?: string;
  rel?: string;
  title?: string;
  'aria-label'?: string;
  as?: 'button' | 'a';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  maxDistance = 8,
  onClick,
  href,
  target,
  rel,
  title,
  'aria-label': ariaLabel,
  as = href ? 'a' : 'button',
  type = 'button',
  disabled = false,
}) => {
  const ref = useRef<HTMLElement>(null);
  const isCoarse = useSyncExternalStore(subscribePointerCoarse, getPointerCoarseSnapshot, getServerTrue);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, SPRING.magnetic);
  const springY = useSpring(y, SPRING.magnetic);

  const handleMouseMove = (e: React.PointerEvent) => {
    if (isCoarse || !ANIMATION_FLAGS.magneticButtons || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.35;
    const distanceY = (e.clientY - centerY) * 0.35;

    x.set(Math.max(-maxDistance, Math.min(maxDistance, distanceX)));
    y.set(Math.max(-maxDistance, Math.min(maxDistance, distanceY)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = as === 'a' ? motion.a : motion.button;

  return (
    <Component
      ref={ref as any}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick as any}
      type={as === 'button' ? type : undefined}
      disabled={as === 'button' ? disabled : undefined}
      onPointerMove={handleMouseMove}
      onPointerLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
      data-cursor-hover="true"
      title={title}
      aria-label={ariaLabel}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
    >
      {children}
    </Component>
  );
};
