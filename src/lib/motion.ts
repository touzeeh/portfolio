/**
 * Shared Motion System for Antigravity Portfolio
 * Standardized duration tokens, entrance easings, springs, and reusable variants.
 * Strictly animates transform and opacity for 60fps performance without layout thrashing.
 */

// 1. Duration Tokens (seconds)
export const DURATION = {
  fast: 0.2,
  base: 0.5,
  slow: 0.9,
  intro: 1.2,
} as const;

// 2. Standardized Easing Curves
// Premium entrance curve: smooth acceleration, long deceleration settle
export const EASE = {
  entrance: [0.22, 1, 0.36, 1] as const,
  smoothOut: [0.16, 1, 0.3, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
} as const;

// 3. Reusable Spring Presets for Interactive Elements
export const SPRING = {
  snappy: { type: 'spring', damping: 25, stiffness: 400, mass: 0.1 } as const,
  bouncy: { type: 'spring', damping: 15, stiffness: 300, mass: 0.2 } as const,
  gentle: { type: 'spring', damping: 30, stiffness: 200, mass: 0.4 } as const,
  magnetic: { type: 'spring', damping: 20, stiffness: 350, mass: 0.15 } as const,
} as const;

// 4. Stagger Tokens (seconds)
export const STAGGER = {
  tight: 0.06,
  base: 0.08,
  relaxed: 0.1,
} as const;

// 5. Scroll Reveal Viewport Trigger Config (once: true, amount: 0.2-0.3)
export const SCROLL_VIEWPORT = {
  once: true,
  amount: 0.25,
} as const;

// 6. Universal Reusable Motion Variants
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.base,
      ease: EASE.entrance,
    },
  },
};

export const maskRevealVariants = {
  hidden: { opacity: 0, y: '100%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: {
      duration: DURATION.base,
      ease: EASE.entrance,
    },
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER.base,
      delayChildren: 0.05,
    },
  },
};

export const scaleFadeVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.base,
      ease: EASE.entrance,
    },
  },
};
