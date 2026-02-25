'use client'

import { useState, useMemo, useCallback } from 'react'
import { useTranslations, useMessages } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionEntrance } from '@/components/MotionSection'
import { ease } from '@/lib/motion'

const DETAILING_FACTOR_KEYS = ['detailingIntroFactor2', 'detailingIntroFactor3', 'detailingIntroFactor4', 'detailingIntroFactor5'] as const
const CLEANING_SERVICE_KEYS = ['cleaningService1', 'cleaningService2', 'cleaningService3'] as const
const CLEANING_PRICE_FACTOR_KEYS = ['cleaningPriceFactor1', 'cleaningPriceFactor2', 'cleaningPriceFactor3', 'cleaningPriceFactor4'] as const
const EXTERIOR_KEYS = ['detailingExterior1', 'detailingExterior2', 'detailingExterior3', 'detailingExterior4', 'detailingExterior5', 'detailingExterior6'] as const
const INTERIOR_KEYS = ['detailingInterior1', 'detailingInterior2', 'detailingInterior3', 'detailingInterior4', 'detailingInterior5', 'detailingInterior6'] as const

type PricingPackagesMessages = Record<string, { features?: string[] }>

export interface PricingPackage {
  id: string
  name: string
  price: string
  description: string
  features: string[]
}

export const carCleaningPackages: PricingPackage[] = [
  { id: 'cleaning-basic', name: '', price: '', description: '', features: [] },
  { id: 'cleaning-full', name: '', price: '', description: '', features: [] },
  { id: 'cleaning-premium', name: '', price: '', description: '', features: [] },
]

export const carDetailingPackages: PricingPackage[] = [
  { id: 'detail-standard', name: '', price: '', description: '', features: [] },
  { id: 'detail-deepshine', name: '', price: '', description: '', features: [] },
  { id: 'detail-showroom', name: '', price: '', description: '', features: [] },
]

// The top-tier in each service gets the accent treatment
const FEATURED_IDS = new Set(['detail-showroom', 'cleaning-premium'])

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

function PackageCard({ pkg, index }: { pkg: PricingPackage; index: number }) {
  const isFeatured = FEATURED_IDS.has(pkg.id)

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
      transition={{ duration: 0.28, delay: index * 0.07, ease }}
      className={`relative flex flex-col overflow-hidden rounded-card border transition-shadow duration-300 ${
        isFeatured
          ? 'border-premium-accent bg-premium-accent-muted shadow-[0_0_48px_-8px_rgba(0,184,219,0.3)]'
          : index === 1
          ? 'border-premium-graphite bg-premium-charcoal shadow-md shadow-black/50 hover:shadow-lg hover:shadow-black/60'
          : 'border-border-default bg-premium-slate/80 hover:border-premium-graphite'
      }`}
    >
      {/* Top accent line */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 ${
          isFeatured ? 'h-[2px] bg-gradient-to-r from-transparent via-premium-accent to-transparent' : 'h-px bg-border-default'
        }`}
      />

      {/* Header */}
      <div className="p-5 sm:p-6 pb-0">
        <h3 className="text-h4 text-text-primary font-semibold leading-snug">
          {pkg.name}
        </h3>
      </div>

      {/* Price band */}
      <div className={`mx-5 sm:mx-6 mt-4 rounded-sharp px-4 py-3 ${
        isFeatured ? 'bg-premium-accent/10 border border-premium-accent/25' : 'bg-black/25 border border-border-default'
      }`}>
        <p className="text-2xl sm:text-3xl font-bold tracking-tight text-premium-accent">
          {pkg.price}
        </p>
        <p className="mt-1 text-body-sm text-text-secondary leading-relaxed">
          {pkg.description}
        </p>
      </div>

      {/* Features */}
      <ul className="p-5 sm:p-6 pt-4 mt-auto space-y-2.5" role="list">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-body-sm text-text-secondary">
            <span
              className={`mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full ${isFeatured ? 'bg-premium-accent' : 'bg-premium-accent/50'}`}
              aria-hidden
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

export default function Pricing() {
  const t = useTranslations('pricing')
  const messages = useMessages() as { pricing?: { packages?: PricingPackagesMessages } }
  const packagesMessages = messages?.pricing?.packages ?? {}
  const translatedCleaning = useTranslatedPackages(carCleaningPackages, t, packagesMessages)
  const translatedDetailing = useTranslatedPackages(carDetailingPackages, t, packagesMessages)

  const [activeTab, setActiveTab] = useState<'detailing' | 'cleaning'>('detailing')

  const scrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const tabs = [
    { id: 'detailing', label: t('detailingHeading') },
    { id: 'cleaning', label: t('cleaningHeading') },
  ] as const

  return (
    <SectionEntrance
      id="pricing"
      className="section-padding bg-premium-charcoal scroll-mt-20"
      aria-labelledby="pricing-heading"
    >
      <div className="container-narrow">
        {/* Header */}
        <header className="text-center mb-10">
          <p className="text-premium-accent text-overline uppercase mb-2">
            {t('overline')}
          </p>
          <h2 id="pricing-heading" className="text-h2 text-text-primary">
            {t('heading')}
          </h2>
          <p className="mt-3 text-body text-text-secondary max-w-xl mx-auto">
            {t('subheading')}
          </p>
        </header>

        {/* Tab switcher */}
        <div className="flex justify-center mb-8" role="tablist" aria-label="Service type">
          <div className="flex rounded-card border border-border-default overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 text-body-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-premium-accent focus-visible:ring-inset ${
                  activeTab === tab.id
                    ? 'bg-premium-accent text-premium-black'
                    : 'bg-premium-slate/80 text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab panels */}
        <AnimatePresence mode="wait">
          {activeTab === 'detailing' ? (
            <motion.div
              key="detailing"
              id="panel-detailing"
              role="tabpanel"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease }}
            >
              {/* Compact factors note */}
              <p className="text-center text-body-sm text-text-secondary mb-6 max-w-lg mx-auto">
                {t('detailingIntro')}{' '}
                <span className="text-text-primary">{t('detailingIntroFactor1')}</span>{' '}
                {DETAILING_FACTOR_KEYS.map((k) => t(k)).join(', ')}.
              </p>

              {/* Packages */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {translatedDetailing.map((pkg, i) => (
                  <PackageCard key={pkg.id} pkg={pkg} index={i} />
                ))}
              </div>

              {/* A la carte */}
              <div className="rounded-card border border-border-default overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border-default">
                  <div className="p-5">
                    <h4 className="text-body-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
                      {t('detailingExteriorHeading')}
                    </h4>
                    <ul className="space-y-2 text-body-sm" role="list">
                      {EXTERIOR_KEYS.map((key) => {
                        const [service, price] = t(key).split(' — ')
                        return (
                          <li key={key} className="flex items-baseline justify-between gap-4 border-b border-border-default/40 pb-2 last:border-0 last:pb-0">
                            <span className="text-text-secondary">{service}</span>
                            <span className="text-premium-accent font-medium shrink-0">{price}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  <div className="p-5">
                    <h4 className="text-body-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
                      {t('detailingInteriorHeading')}
                    </h4>
                    <ul className="space-y-2 text-body-sm" role="list">
                      {INTERIOR_KEYS.map((key) => {
                        const [service, price] = t(key).split(' — ')
                        return (
                          <li key={key} className="flex items-baseline justify-between gap-4 border-b border-border-default/40 pb-2 last:border-0 last:pb-0">
                            <span className="text-text-secondary">{service}</span>
                            <span className="text-premium-accent font-medium shrink-0">{price}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="cleaning"
              id="panel-cleaning"
              role="tabpanel"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease }}
            >
              {/* Compact intro */}
              <p className="text-center text-body-sm text-text-secondary mb-6 max-w-lg mx-auto">
                {t('cleaningIntroShort')} {t('cleaningIntroLine2')}{' '}
                <span className="text-text-primary">{t('cleaningServicesHeading')}</span>{' '}
                {CLEANING_SERVICE_KEYS.map((k) => t(k)).join(', ')}.{' '}
                <span className="text-text-primary">{t('cleaningPriceHeading')}</span>{' '}
                {CLEANING_PRICE_FACTOR_KEYS.map((k) => t(k)).join(', ')}.
              </p>

              {/* Packages */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {translatedCleaning.map((pkg, i) => (
                  <PackageCard key={pkg.id} pkg={pkg} index={i} />
                ))}
              </div>

              {/* CTA */}
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionEntrance>
  )
}
