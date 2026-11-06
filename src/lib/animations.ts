import { type Transition, type Variants } from 'framer-motion';

// Single shared easing cubic-bezier(0.22, 1, 0.36, 1)
export const SHARED_EASE = [0.22, 1, 0.36, 1] as const;

export const SHARED_TRANSITION: Transition = {
  duration: 0.5,
  ease: SHARED_EASE,
};

// 1. Scroll-reveal once per element (fade + 20px rise, 500ms, 20% viewport trigger)
export const scrollRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: SHARED_TRANSITION,
  },
};

// Grid container with 70ms stagger (up to 5 items)
export const staggerGridVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: SHARED_TRANSITION,
  },
};

// 20% viewport trigger config, runs once
export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.2,
} as const;

// Card hover lift (4-6px lift, 250ms, shared ease)
export const cardHoverVariants: Variants = {
  initial: {
    y: 0,
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.25,
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
      duration: 0.5,
      ease: SHARED_EASE,
    },
  },
};
