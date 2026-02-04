"use client";

import { Variants } from "framer-motion";

/**
 * Premium motion config: smooth, fast, professional.
 * No flashy effects — short duration, ease-out, subtle movement.
 */

export const duration = {
  fast: 0.2,
  normal: 0.35,
  slow: 0.5,
} as const;

export const ease = [0.25, 0.46, 0.45, 0.94] as const; // ease-out-ish

/** Section entrance: fade up into view (use with useInView or once) */
export const sectionEntrance: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease },
  },
};

/** Stagger children (e.g. cards in a grid) */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/** Single item for stagger (fade + slight y) */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease },
  },
};

/** Card hover: subtle lift + shadow feel (use with whileHover) */
export const cardHover = {
  y: -4,
  transition: { duration: duration.fast, ease },
};

/** Button tap (use with whileTap) */
export const buttonTap = {
  scale: 0.98,
  transition: { duration: duration.fast },
};

/** Button hover (use with whileHover) */
export const buttonHover = {
  scale: 1.02,
  transition: { duration: duration.fast, ease },
};

/** Fade in only (for overlays / modals) */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.normal, ease } },
  exit: { opacity: 0, transition: { duration: duration.fast } },
};
