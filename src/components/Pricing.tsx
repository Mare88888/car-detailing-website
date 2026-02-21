'use client'

import { motion } from 'framer-motion'
import { SectionEntrance } from '@/components/MotionSection'
import { staggerContainer, staggerItem, cardHover } from '@/lib/motion'

export interface PricingPackage {
  id: string
  name: string
  price: string
  description: string
  features: string[]
}

/** Car cleaning – service packages (prices on request) */
const carCleaningPackages: PricingPackage[] = [
  {
    id: 'cleaning-basic',
    name: 'Vehicle Refresh',
    price: 'From 40€',
    description: 'Essential care for regular vehicle maintenance. Ideal for regularly maintained vehicles.',
    features: [
      'Hand exterior wash',
      'Wheel cleaning',
      'Interior vacuuming',
      'Dusting & plastic wipe-down',
      'Interior window cleaning',
    ],
  },
  {
    id: 'cleaning-advanced',
    name: 'Deep Cleaning',
    price: 'From 70€',
    description: 'More thorough care for visibly dirty vehicles. For vehicles with a higher level of dirt.',
    features: [
      'Everything from the Basic Package',
      'Deep interior cleaning',
      'Detailed cleaning of vents & seams',
      'Basic stain removal',
      'Interior plastic protection',
      'Basic exterior decontamination',
    ],
  },
  {
    id: 'cleaning-best',
    name: 'Premium Care',
    price: 'From 100€',
    description: 'Complete professional appearance restoration. Maximum gloss & long-lasting protection.',
    features: [
      'Everything from the Advanced Package',
      'Chemical seat cleaning',
      'Thorough paint decontamination',
      'Single-stage machine polishing',
      'Ceramic paint protection',
    ],
  },
]

/** Car detailing – packages with prices */
const carDetailingPackages: PricingPackage[] = [
  {
    id: 'detail-basic',
    name: 'Basic Refresh',
    price: 'From €70',
    description: 'For regularly maintained cars.',
    features: [
      'Exterior hand wash',
      'Wheel cleaning',
      'Quick interior vacuum',
      'Wipe dashboard & plastics',
      'Windows cleaned',
    ],
  },
  {
    id: 'detail-full',
    name: 'Full Detail',
    price: 'From €180',
    description: 'Most popular package.',
    features: [
      'Deep exterior wash + wax/sealant',
      'Deep interior vacuum',
      'Seat & carpet shampoo (extraction if needed)',
      'Plastic trim cleaning',
      'Door jambs',
      'Windows inside & out',
    ],
  },
  {
    id: 'detail-premium',
    name: 'Premium Protection',
    price: 'From €450',
    description: 'For people who care about paint & long-term protection.',
    features: [
      'Everything from Full Detail',
      'Paint decontamination',
      'Machine polish (1-step)',
      '6–12 month paint protection OR entry ceramic coating',
    ],
  },
]

const detailingAddOns: { name: string; price: string }[] = [
  { name: 'Pet hair removal', price: '€20–40' },
  { name: 'Headlight restoration', price: '€60' },
  { name: 'Engine bay cleaning', price: '€40' },
  { name: '2nd polish step', price: '+€100' },
  { name: 'Ceramic upgrade', price: 'Price after inspection' },
]

function PricingCard({ pkg }: { pkg: PricingPackage }) {
  return (
    <motion.article
      variants={staggerItem}
      whileHover={cardHover}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative flex flex-col rounded-card border border-border-default bg-premium-slate/90 p-6 sm:p-7 transition-colors duration-300 hover:border-premium-graphite hover:bg-premium-slate"
    >
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
    </motion.article>
  )
}

export default function Pricing() {
  return (
    <SectionEntrance
      id="pricing"
      className="section-padding bg-premium-charcoal scroll-mt-20"
      aria-labelledby="pricing-heading"
    >
      <div className="container-narrow">
        <header className="text-center mb-12 sm:mb-16">
          <p className="text-premium-accent text-overline uppercase mb-2">
            Packages
          </p>
          <h2 id="pricing-heading" className="text-h2 text-text-primary">
            Pricing
          </h2>
          <p className="mt-4 text-body text-text-secondary max-w-2xl mx-auto">
            Transparent packages. Get a quote tailored to your car and goals.
          </p>
        </header>

        {/* Car Cleaning – Service packages */}
        <section id="car-cleaning" className="mb-16 scroll-mt-20" aria-labelledby="cleaning-heading">
          <h3 id="cleaning-heading" className="text-h3 text-text-primary mb-6">
            Car cleaning packages
          </h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="visible"
            animate="visible"
          >
            {carCleaningPackages.map((pkg) => (
              <PricingCard key={pkg.id} pkg={pkg} />
            ))}
          </motion.div>
        </section>

        {/* Car Detailing – Packages with prices */}
        <section id="car-detailing" className="mb-16 scroll-mt-20" aria-labelledby="detailing-heading">
          <h3 id="detailing-heading" className="text-h3 text-text-primary mb-6">
            Car detailing packages
          </h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="visible"
            animate="visible"
          >
            {carDetailingPackages.map((pkg) => (
              <PricingCard key={pkg.id} pkg={pkg} />
            ))}
          </motion.div>

          {/* Add-ons
          <div className="mt-10 rounded-card border border-border-default bg-premium-slate/80 p-6 sm:p-8">
            <h4 className="text-h4 text-text-primary font-semibold mb-4">
              ➕ Add-ons
            </h4>
            <p className="text-body-sm text-text-secondary mb-4">
              Extra profit options.
            </p>
            <ul className="space-y-2 text-body-sm text-text-secondary" role="list">
              {detailingAddOns.map((addon) => (
                <li key={addon.name} className="flex justify-between gap-4">
                  <span>{addon.name}</span>
                  <span className="text-premium-accent font-medium shrink-0">{addon.price}</span>
                </li>
              ))}
            </ul>
          </div>
          */}
        </section>
      </div>
    </SectionEntrance>
  )
}
