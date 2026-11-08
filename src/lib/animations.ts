import { type Transition, type Variants } from 'framer-motion';

// Design Tokens: Motion
export const MOTION_TOKENS = {
  duration: {
    fast: 0.15,      // 150ms
    normal: 0.25,    // 250ms
    moderate: 0.4,   // 400ms
    slow: 0.7,       // 700ms
  },
  ease: [0.22, 1, 0.36, 1] as const,
};

export const SHARED_EASE = MOTION_TOKENS.ease;

export const SHARED_TRANSITION: Transition = {
  duration: MOTION_TOKENS.duration.moderate,
  ease: SHARED_EASE,
};

// Scroll Reveal: translateY(16px) + fade, once only
export const scrollRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.moderate,
      ease: SHARED_EASE,
    },
  },
};

// Stagger Grid Container: 60ms stagger, max 5 items
export const staggerGridVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

// Stagger Item Reveal
export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.moderate,
      ease: SHARED_EASE,
    },
  },
};

// Viewport trigger config (20% threshold, triggers once only)
export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.2,
} as const;

// Card hover lift: 2px lift, 250ms, shared ease
export const cardHoverVariants: Variants = {
  initial: {
    y: 0,
  },
  hover: {
    y: -2,
    transition: {
      duration: MOTION_TOKENS.duration.normal,
      ease: SHARED_EASE,
    },
  },
};

// Project card inner image zoom (1.03x)
export const imageZoomVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.03,
    transition: {
      duration: MOTION_TOKENS.duration.slow,
      ease: SHARED_EASE,
    },
  },
};
