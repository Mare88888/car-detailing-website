'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useTranslations, useMessages } from 'next-intl'
import { motion } from 'framer-motion'
import { SectionEntrance } from '@/components/MotionSection'
import { staggerContainer, staggerItem, cardHover, ease } from '@/lib/motion'

const MOBILE_BREAKPOINT = 640
const CARD_TRANSITION = { duration: 0.2, ease }

type PricingPackagesMessages = Record<string, { features?: string[] }>

export interface PricingPackage {
  id: string
  name: string
  price: string
  description: string
  features: string[]
}

// Visual tier styling for packages – from "worst" (muted) → middle (darker) → "best" (accent)
const PACKAGE_STYLE_BY_ID: Record<string, string> = {
  // Cleaning – basic → full → premium
  'cleaning-basic':
    'border-border-default bg-premium-slate/80 shadow-none',
  'cleaning-full':
    'border-premium-graphite bg-premium-charcoal shadow-md shadow-black/40',
  'cleaning-premium':
    'border-premium-accent bg-premium-accent-muted shadow-lg shadow-black/50',

  // Detailing – standard → DeepShine → Showroom
  'detail-standard':
    'border-border-default bg-premium-slate/80 shadow-none',
  'detail-deepshine':
    'border-premium-graphite bg-premium-charcoal shadow-md shadow-black/40',
  'detail-showroom':
    'border-premium-accent bg-premium-accent-muted shadow-lg shadow-black/50',
}

const DETAILING_FACTOR_KEYS = ['detailingIntroFactor2', 'detailingIntroFactor3', 'detailingIntroFactor4', 'detailingIntroFactor5'] as const
const CLEANING_SERVICE_KEYS = ['cleaningService1', 'cleaningService2', 'cleaningService3'] as const
const CLEANING_PRICE_FACTOR_KEYS = ['cleaningPriceFactor1', 'cleaningPriceFactor2', 'cleaningPriceFactor3', 'cleaningPriceFactor4'] as const
const EXTERIOR_KEYS = ['detailingExterior1', 'detailingExterior2', 'detailingExterior3', 'detailingExterior4', 'detailingExterior5', 'detailingExterior6'] as const
const INTERIOR_KEYS = ['detailingInterior1', 'detailingInterior2', 'detailingInterior3', 'detailingInterior4', 'detailingInterior5', 'detailingInterior6'] as const

/** Cleaning service – packages (price on request) */
export const carCleaningPackages: PricingPackage[] = [
  { id: 'cleaning-basic', name: '', price: '', description: '', features: [] },
  { id: 'cleaning-full', name: '', price: '', description: '', features: [] },
  { id: 'cleaning-premium', name: '', price: '', description: '', features: [] },
]

/** Vehicle detailing – packages with prices */
export const carDetailingPackages: PricingPackage[] = [
  { id: 'detail-standard', name: '', price: '', description: '', features: [] },
  { id: 'detail-deepshine', name: '', price: '', description: '', features: [] },
  { id: 'detail-showroom', name: '', price: '', description: '', features: [] },
]

function PricingCard({
  pkg,
  isMobile,
  isExpanded,
  onToggle,
  readMore,
  readLess,
}: {
  pkg: PricingPackage
  isMobile: boolean
  isExpanded: boolean
  onToggle: () => void
  readMore: string
  readLess: string
}) {
  const showFeatures = !isMobile || isExpanded
  const showReadMoreButton = isMobile

  return (
    <motion.article
      variants={staggerItem}
      whileHover={cardHover}
      transition={CARD_TRANSITION}
      className={`relative flex flex-col rounded-card border p-5 sm:p-7 transition-colors duration-300 hover:border-premium-graphite hover:bg-premium-slate ${PACKAGE_STYLE_BY_ID[pkg.id] ?? 'border-border-default bg-premium-slate/90'}`}
    >
      <div className="flex-1">
        <h3 className="text-h4 text-text-primary font-semibold">
          {pkg.name}
        </h3>
        <p className="mt-2 text-2xl sm:text-3xl font-bold text-premium-accent tracking-tight">
          {pkg.price}
        </p>
        <p className="mt-3 sm:mt-4 text-body-sm text-text-secondary leading-relaxed">
          {pkg.description}
        </p>

        {/* Feature list: on desktop always visible; on mobile visible when expanded */}
        {showFeatures && (
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
        )}

        {showReadMoreButton && (
          <div className="mt-4 sm:hidden">
            <motion.button
              type="button"
              onClick={onToggle}
              whileTap={{ scale: 0.98 }}
              className="text-body-sm font-semibold text-premium-accent hover:text-premium-accent-light transition-colors focus:outline-none focus:ring-2 focus:ring-premium-accent focus:ring-offset-2 focus:ring-offset-premium-slate rounded"
            >
              {isExpanded ? readLess : readMore}
            </motion.button>
          </div>
        )}
      </div>
    </motion.article>
  )
}

function useTranslatedPackages(
  packages: PricingPackage[],
  t: (key: string) => string,
  packagesMessages: PricingPackagesMessages
): PricingPackage[] {
  return useMemo(
    () =>
      packages.map((pkg) => {
        const msg = packagesMessages[pkg.id]
        return {
          ...pkg,
          name: t(`packages.${pkg.id}.name`),
          price: t(`packages.${pkg.id}.price`),
          description: t(`packages.${pkg.id}.description`),
          features: Array.isArray(msg?.features) ? msg.features : [],
        }
      }),
    [packages, t, packagesMessages]
  )
}

export default function Pricing() {
  const t = useTranslations('pricing')
  const messages = useMessages() as { pricing?: { packages?: PricingPackagesMessages } }
  const packagesMessages = messages?.pricing?.packages ?? {}
  const translatedCleaning = useTranslatedPackages(carCleaningPackages, t, packagesMessages)
  const translatedDetailing = useTranslatedPackages(carDetailingPackages, t, packagesMessages)
  const [isMobile, setIsMobile] = useState(false)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const toggleExpanded = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const scrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <SectionEntrance
      id="pricing"
      className="section-padding bg-premium-charcoal scroll-mt-20"
      aria-labelledby="pricing-heading"
    >
      <div className="container-narrow">
        <header className="text-center mb-12 sm:mb-16">
          <p className="text-premium-accent text-overline uppercase mb-2">
            {t('overline')}
          </p>
          <h2 id="pricing-heading" className="text-h2 text-text-primary">
            {t('heading')}
          </h2>
          <p className="mt-4 text-body text-text-secondary max-w-2xl mx-auto">
            {t('subheading')}
          </p>
        </header>

        {/* Vehicle Detailing – intro, packages, then exterior/interior breakdown */}
        <section id="car-detailing" className="mb-16 scroll-mt-20" aria-labelledby="detailing-heading">
          <h3 id="detailing-heading" className="text-h3 text-text-primary mb-4 text-center">
            {t('detailingHeading')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-6 mb-8">
            <div className="sm:col-span-4 sm:col-start-2">
              <div className="rounded-card border border-border-default bg-premium-slate/80 p-5 sm:p-6 text-center">
                <div className="mx-auto w-fit text-left text-body-sm text-text-secondary">
                  <p className="text-text-primary font-medium block w-full">
                    {t('detailingIntro')}
                  </p>
                  <br />
                  <p className="font-medium">
                    {t('detailingIntroFactor1')}
                  </p>
                  <ul className="mt-3 space-y-2" role="list">
                    {DETAILING_FACTOR_KEYS.map((key) => (
                      <li key={key} className="flex items-start gap-3">
                        <span
                          className="mt-1 h-1.5 w-1.5 rounded-full bg-premium-accent shrink-0"
                          aria-hidden
                        />
                        <span>{t(key)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <h4 className="text-h4 text-text-primary font-semibold mb-4">
            {t('detailingPackagesHeading')}
          </h4>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="visible"
            animate="visible"
          >
            {translatedDetailing.map((pkg) => (
              <PricingCard
                key={pkg.id}
                pkg={pkg}
                isMobile={isMobile}
                isExpanded={expandedIds.has(pkg.id)}
                onToggle={() => toggleExpanded(pkg.id)}
                readMore={t('readMore')}
                readLess={t('readLess')}
              />
            ))}
          </motion.div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-card border border-border-default bg-premium-slate/80 p-5 sm:p-6">
              <h4 className="text-h4 text-text-primary font-semibold mb-4">
                {t('detailingExteriorHeading')}
              </h4>
              <ul className="space-y-2 text-body-sm text-text-secondary" role="list">
                {EXTERIOR_KEYS.map((key) => (
                  <li key={key} className="flex justify-between gap-3">
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-card border border-border-default bg-premium-slate/80 p-5 sm:p-6">
              <h4 className="text-h4 text-text-primary font-semibold mb-4">
                {t('detailingInteriorHeading')}
              </h4>
              <ul className="space-y-2 text-body-sm text-text-secondary" role="list">
                {INTERIOR_KEYS.map((key) => (
                  <li key={key} className="flex justify-between gap-3">
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Cleaning Service – intro, packages, additional, CTA */}
        <section id="car-cleaning" className="mb-16 scroll-mt-20" aria-labelledby="cleaning-heading">
          <h3 id="cleaning-heading" className="text-h3 text-text-primary mb-4 text-center">
            {t('cleaningHeading')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-6 mb-8">
            <div className="sm:col-span-4 sm:col-start-2">
              <div className="rounded-card border border-border-default bg-premium-slate/80 p-5 sm:p-6 text-center">
                <div className="mx-auto max-w-md text-left text-body-sm text-text-secondary">
                  <div className="w-fit mx-auto">
                    <p className="text-text-primary font-medium">
                      {t('cleaningIntroShort')}
                    </p>
                    <p className="mt-1 text-text-primary font-medium">
                      {t('cleaningIntroLine2')}
                    </p>
                    <p className="mt-2 font-medium">
                      {t('cleaningServicesHeading')}
                    </p>
                    <ul className="mt-2 space-y-2" role="list">
                      {CLEANING_SERVICE_KEYS.map((key) => (
                        <li key={key} className="flex items-start gap-3">
                          <span
                            className="mt-1 h-1.5 w-1.5 rounded-full bg-premium-accent shrink-0"
                            aria-hidden
                          />
                          <span>{t(key)}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 font-medium">
                      {t('cleaningPriceHeading')}
                    </p>
                    <ul className="mt-2 space-y-2" role="list">
                      {CLEANING_PRICE_FACTOR_KEYS.map((key) => (
                        <li key={key} className="flex items-start gap-3">
                          <span
                            className="mt-1 h-1.5 w-1.5 rounded-full bg-premium-accent shrink-0"
                            aria-hidden
                          />
                          <span>{t(key)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10"
            variants={staggerContainer}
            initial="visible"
            animate="visible"
          >
            {translatedCleaning.map((pkg) => (
              <PricingCard
                key={pkg.id}
                pkg={pkg}
                isMobile={isMobile}
                isExpanded={expandedIds.has(pkg.id)}
                onToggle={() => toggleExpanded(pkg.id)}
                readMore={t('readMore')}
                readLess={t('readLess')}
              />
            ))}
          </motion.div>
          <div className="text-center">
            <motion.button
              type="button"
              onClick={scrollToContact}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary inline-flex items-center justify-center px-7 py-3.5"
            >
              {t('cleaningCta')}
            </motion.button>
          </div>
        </section>
      </div>
    </SectionEntrance>
  )
}
