'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { buttonHover, buttonTap } from '@/lib/motion'

export interface HeroProps {
  /** Optional background image path (e.g. /hero-bg.jpg). If not set, gradient only. */
  backgroundImage?: string
  /** Overline text above the headline */
  overline?: string
  /** Main headline */
  headline?: string
  /** Subheadline / description */
  subheadline?: string
  /** Primary CTA label */
  primaryCtaLabel?: string
  /** Secondary CTA label */
  secondaryCtaLabel?: string
}

export default function Hero({
  backgroundImage = "/Logo.jpg",
  overline = 'Professional car care',
  headline = 'Premium car detailing & valeting',
  subheadline = 'Showroom finish. Ceramic coatings. Paint correction. We come to you.',
  primaryCtaLabel = 'Book Now',
  secondaryCtaLabel = 'View Services',
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      <div className="absolute inset-0 bg-premium-black" aria-hidden />
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image src={backgroundImage} alt="" fill className="object-cover object-center" priority sizes="100vw" />
        </div>
      )}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-premium-charcoal/90 via-premium-black/85 to-premium-black ${backgroundImage ? '' : 'from-premium-charcoal via-premium-black to-premium-black'}`}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,255,136,0.08),transparent)]"
        aria-hidden
      />
      <div className="relative z-10 w-full px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-premium-accent text-overline uppercase mb-4">{overline}</p>
          <h1 className="text-display text-text-primary max-w-4xl mx-auto">{headline}</h1>
          <p className="mt-4 text-base text-text-secondary max-w-2xl mx-auto sm:mt-6 sm:text-lg">{subheadline}</p>
          <div className="mt-8 flex flex-col gap-4 justify-center sm:mt-10 sm:flex-row sm:gap-5">
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Link href="#contact" className="btn-primary inline-flex items-center justify-center px-7 py-3.5 sm:px-8 sm:py-4">
                {primaryCtaLabel}
              </Link>
            </motion.div>
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Link href="#services" className="btn-secondary inline-flex items-center justify-center px-7 py-3.5 sm:px-8 sm:py-4">
                {secondaryCtaLabel}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
