'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareColor?: string;
  borderRadius?: 'sm' | 'lg';
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 6,
  glareColor = 'rgba(139, 92, 246, 0.15)',
  borderRadius = 'sm',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 0, y: 0, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);
    };
    checkTouch();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransform({ rotateX, rotateY });
    setGlare({ x, y, opacity: 1 });
  }, [maxTilt, isTouch]);

  const handleMouseEnter = () => {
    if (!isTouch) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform({ rotateX: 0, rotateY: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  const radiusClass = borderRadius === 'lg' ? 'rounded-[24px]' : 'rounded-[12px]';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-all duration-300 ease-out ${radiusClass} ${className}`}
      style={{
        transform: !isTouch && isHovered
          ? `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale3d(1.01, 1.01, 1.01)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glare spotlight overlay following cursor (desktop only) */}
      {!isTouch && (
        <>
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300 ease-out"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(400px circle at ${glare.x}px ${glare.y}px, ${glareColor}, transparent 80%)`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out mix-blend-overlay"
            style={{
              opacity: glare.opacity * 0.35,
              background: `radial-gradient(350px circle at ${glare.x}px ${glare.y}px, rgba(255, 255, 255, 0.4), transparent 70%)`,
            }}
          />
        </>
      )}

      {/* Card Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
