'use client'

import { motion } from 'framer-motion'

interface SectionEntranceProps {
  children: React.ReactNode
  className?: string
  id?: string
  rootMargin?: string
  'aria-labelledby'?: string
}

/**
 * Section wrapper: passes through with correct semantics.
 * Entrance animation disabled so sections are always visible (avoids invisible content before useInView runs).
 */
export function SectionEntrance({
  children,
  className = '',
  id,
  'aria-labelledby': ariaLabelledby,
}: SectionEntranceProps) {
  return (
    <motion.section
      id={id}
      className={className}
      aria-labelledby={ariaLabelledby}
      initial={false}
    >
      {children}
    </motion.section>
  )
}
