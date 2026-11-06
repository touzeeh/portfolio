'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

interface ScrollContextValue {
  progress: number;
  scrollY: number;
  isMobile: boolean;
}

const ScrollContext = createContext<ScrollContextValue>({
  progress: 0,
  scrollY: 0,
  isMobile: false,
});

export const useScrollProgress = () => useContext(ScrollContext);

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrollState, setScrollState] = useState<ScrollContextValue>({
    progress: 0,
    scrollY: 0,
    isMobile: false,
  });

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Direct native scroll calculation
    const updateScrollProgress = (currentY: number) => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(currentY / docHeight, 0), 1) : 0;
      setScrollState({
        progress,
        scrollY: currentY,
        isMobile: isTouch,
      });
    };

    if (prefersReducedMotion) {
      const handleNativeScroll = () => updateScrollProgress(window.scrollY);
      window.addEventListener('scroll', handleNativeScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleNativeScroll);
    }

    // Configure Lenis with optimized settings for mobile and desktop
    const lenis = new Lenis({
      duration: isTouch ? 0.9 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false, // Don't fight native hardware momentum on mobile touchscreens
      touchMultiplier: 1,
    });

    lenis.on('scroll', (e: { progress: number; scroll: number }) => {
      setScrollState({
        progress: e.progress,
        scrollY: e.scroll,
        isMobile: isTouch,
      });
    });

    // Also fallback to native scroll listener for instant 120Hz response on mobile
    const handleNativeScroll = () => {
      if (isTouch) {
        updateScrollProgress(window.scrollY);
      }
    };
    window.addEventListener('scroll', handleNativeScroll, { passive: true });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleNativeScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <ScrollContext.Provider value={scrollState}>
      {children}
    </ScrollContext.Provider>
  );
};
