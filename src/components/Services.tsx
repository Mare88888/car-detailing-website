'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SectionEntrance } from '@/components/MotionSection'
import { staggerContainer, staggerItem, cardHover, buttonTap } from '@/lib/motion'

/* Icons as inline SVG for no asset dependency */
function CleaningIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M24 8c-2 4-8 6-8 14 0 6.627 5.373 12 12 12s12-5.373 12-12c0-8-6-10-8-14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 26l4 4 8-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DetailingIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M24 14v4M24 30v4M14 24h4M30 24h4M17.05 17.05l2.83 2.83M28.12 28.12l2.83 2.83M17.05 30.95l2.83-2.83M28.12 19.88l2.83-2.83"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

const categories = [
  {
    id: 'cleaning',
    title: 'Car Cleaning',
    description:
      'Keep your car looking fresh with our valeting and deep-cleaning services. Exterior wash, interior vacuum, engine bay clean, and full valet packages.',
    icon: CleaningIcon,
    href: '#car-cleaning',
    /* Subtle background: soft gradient + low-opacity pattern */
    bgClass:
      'bg-gradient-to-br from-premium-slate via-premium-charcoal to-premium-black',
    patternClass:
      'before:content-[""] before:absolute before:inset-0 before:opacity-[0.03] before:bg-[radial-gradient(circle_at_30%_20%,rgba(0,184,219,0.4),transparent_50%)]',
  },
  {
    id: 'detailing',
    title: 'Car Detailing',
    description:
      'Restore gloss and protect with paint correction, ceramic coatings, and full-detail packages. Showroom finish and long-lasting protection.',
    icon: DetailingIcon,
    href: '#car-detailing',
    bgClass:
      'bg-gradient-to-br from-premium-charcoal via-premium-slate to-premium-black',
    patternClass:
      'before:content-[""] before:absolute before:inset-0 before:opacity-[0.03] before:bg-[radial-gradient(circle_at_70%_80%,rgba(0,184,219,0.4),transparent_50%)]',
  },
]

export default function Services() {
  return (
    <SectionEntrance
      id="services"
      className="section-padding bg-premium-black scroll-mt-20"
      aria-labelledby="services-heading"
    >
      <div className="container-narrow">
        <header className="text-center mb-12 sm:mb-16">
          <p className="text-premium-accent text-overline uppercase mb-2">
            What we offer
          </p>
          <h2
            id="services-heading"
            className="text-h2 text-text-primary"
          >
            Services
          </h2>
          <p className="mt-4 text-body text-text-secondary max-w-2xl mx-auto">
            From a quick valet to full paint correction and ceramic coating —
            choose the level of care your car deserves.
          </p>
        </header>

        <motion.div
          className="grid gap-6 sm:gap-8 lg:grid-cols-2"
          variants={staggerContainer}
          initial="visible"
          animate="visible"
        >
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <motion.article
                key={category.id}
                variants={staggerItem}
                whileHover={cardHover}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group relative overflow-hidden rounded-card border border-border-default bg-premium-slate transition-colors duration-300 hover:border-premium-accent/50 hover:shadow-xl hover:shadow-black/20"
              >
                {/* Subtle background gradient / pattern */}
                <div
                  className={`absolute inset-0 ${category.bgClass} ${category.patternClass}`}
                  aria-hidden
                />

                <div className="relative z-10 flex flex-col p-6 sm:p-8 lg:p-10 min-h-[280px] sm:min-h-[300px]">
                  {/* Icon */}
                  <div className="mb-5 sm:mb-6">
                    <span className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-card bg-premium-accent-muted text-premium-accent transition-all duration-card group-hover:scale-110 group-hover:bg-premium-accent/20">
                      <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                    </span>
                  </div>

                  <h3 className="text-h3 text-text-primary mb-3 sm:mb-4">
                    {category.title}
                  </h3>
                  <p className="text-body-sm text-text-secondary flex-1 max-w-lg">
                    {category.description}
                  </p>

                  <div className="mt-6 sm:mt-8">
                    <motion.div whileTap={buttonTap}>
                      <Link
                        href="/"
                        onClick={(e) => {
                          e.preventDefault()
                          const id = category.href.replace(/^#/, '')
                          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3 text-body-sm transition-all duration-ui group-hover:border-premium-accent group-hover:text-premium-accent"
                      >
                        View Packages
                        <svg
                          className="h-4 w-4 transition-transform duration-ui group-hover:translate-x-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </SectionEntrance>
  )
}
