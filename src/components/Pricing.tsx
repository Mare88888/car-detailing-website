'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SectionEntrance } from '@/components/MotionSection'
import { staggerContainer, staggerItem, cardHover, buttonTap } from '@/lib/motion'

export interface PricingPackage {
  id: string
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
}

const defaultPackages: PricingPackage[] = [
  {
    id: 'quick-valet',
    name: 'Quick valet',
    price: 'From £45',
    description: 'Exterior wash, interior vacuum & wipe. Ideal for regular upkeep.',
    features: [
      'Two-bucket wash',
      'Wheels & arches',
      'Interior vacuum',
      'Dash & trim wipe',
    ],
    popular: false,
  },
  {
    id: 'full-valet',
    name: 'Full valet',
    price: 'From £120',
    description: 'Deep clean inside and out including engine bay.',
    features: [
      'Everything in Quick valet',
      'Engine bay clean',
      'Door shuts & sills',
      'Glass inside & out',
    ],
    popular: true,
  },
  {
    id: 'day-detail',
    name: 'Day detail',
    price: 'From £350',
    description: 'Single-stage machine polish and ceramic coating.',
    features: [
      'Full valet included',
      'Paint correction',
      '12-month ceramic coating',
      'Glass coating option',
    ],
    popular: false,
  },
  {
    id: 'like-new',
    name: 'Like new',
    price: 'From £650',
    description: 'Multi-stage correction and long-life ceramic.',
    features: [
      'Multi-stage machine polish',
      '2–3 year ceramic coating',
      'Wheels & glass coated',
      'Interior deep clean',
    ],
    popular: false,
  },
]

function PricingCard({
  pkg,
  ctaHref,
  ctaLabel,
}: {
  pkg: PricingPackage
  ctaHref: string
  ctaLabel: string
}) {
  const isPopular = pkg.popular === true

  return (
    <motion.article
      variants={staggerItem}
      whileHover={cardHover}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative flex flex-col rounded-card border p-6 sm:p-7 transition-colors duration-300 ${isPopular
        ? 'border-premium-accent bg-premium-slate shadow-lg shadow-premium-accent/10 ring-1 ring-premium-accent/30'
        : 'border-border-default bg-premium-slate/90 hover:border-premium-graphite hover:bg-premium-slate'
        }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-block px-4 py-1 bg-premium-accent text-white text-caption font-bold uppercase tracking-wider rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="flex-1">
        <h3 className="text-h4 text-text-primary font-semibold">
          {pkg.name}
        </h3>
        <p className="mt-2 text-2xl sm:text-3xl font-bold text-premium-accent tracking-tight">
          {pkg.price}
        </p>
        <p className="mt-4 text-body-sm text-text-secondary leading-relaxed">
          {pkg.description}
        </p>

        <ul className="mt-6 space-y-3" role="list">
          {pkg.features.map((feature) => (
            <li
              key={feature}
              className="text-body-sm text-text-secondary flex items-start gap-3"
            >
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full bg-premium-accent shrink-0"
                aria-hidden
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <motion.div whileTap={buttonTap}>
          <Link
            href={ctaHref.startsWith('#') ? '/' : ctaHref}
            onClick={ctaHref.startsWith('#') ? (e) => {
              e.preventDefault()
              document.getElementById(ctaHref.slice(1))?.scrollIntoView({ behavior: 'smooth' })
            } : undefined}
            className={`block w-full text-center py-3.5 px-6 rounded-sharp font-semibold text-body-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-premium-accent focus:ring-offset-2 focus:ring-offset-premium-slate ${isPopular
              ? 'btn-primary w-full'
              : 'btn-secondary w-full'
              }`}
          >
            {ctaLabel}
          </Link>
        </motion.div>
      </div>
    </motion.article>
  )
}

export interface PricingProps {
  /** Pricing packages (3–4). Omit to use defaults. */
  packages?: PricingPackage[]
  /** Section overline text */
  overline?: string
  /** Section heading */
  heading?: string
  /** Section subheading */
  subheading?: string
  /** CTA link (e.g. #contact) */
  ctaHref?: string
  /** CTA button label */
  ctaLabel?: string
}

export default function Pricing({
  packages = defaultPackages,
  overline = 'Packages',
  heading = 'Pricing',
  subheading = 'Transparent packages. Quotes tailored to your car and goals.',
  ctaHref = '#contact',
  ctaLabel = 'Get a quote',
}: PricingProps) {
  return (
    <SectionEntrance
      id="pricing"
      className="section-padding bg-premium-charcoal scroll-mt-20"
      aria-labelledby="pricing-heading"
    >
      <div className="container-narrow">
        <header className="text-center mb-12 sm:mb-16">
          <p className="text-premium-accent text-overline uppercase mb-2">
            {overline}
          </p>
          <h2 id="pricing-heading" className="text-h2 text-text-primary">
            {heading}
          </h2>
          <p className="mt-4 text-body text-text-secondary max-w-2xl mx-auto">
            {subheading}
          </p>
        </header>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="visible"
          animate="visible"
        >
          {packages.map((pkg) => (
            <PricingCard
              key={pkg.id}
              pkg={pkg}
              ctaHref={ctaHref}
              ctaLabel={ctaLabel}
            />
          ))}
        </motion.div>
      </div>
    </SectionEntrance>
  )
}
