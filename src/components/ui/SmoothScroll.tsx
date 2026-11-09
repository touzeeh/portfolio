/* oxlint-disable react/only-export-components */
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

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

/**
 * Native Pure Scroll Provider
 * Replaces any smooth-scroll libraries (Lenis, Locomotive) with 100% native scrolling.
 * Guarantees zero scroll-hijacking, flawless scroll-spy, and unhindered modal inner scroll.
 */
export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrollState, setScrollState] = useState<ScrollContextValue>({
    progress: 0,
    scrollY: 0,
    isMobile: false,
  });

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

    const updateScrollProgress = () => {
      const currentY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(currentY / docHeight, 0), 1) : 0;
      setScrollState({
        progress,
        scrollY: currentY,
        isMobile: isTouch,
      });
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <ScrollContext.Provider value={scrollState}>
      {children}
    </ScrollContext.Provider>
  );
};
