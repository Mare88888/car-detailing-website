'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { SectionEntrance } from '@/components/MotionSection'
import { staggerContainer, staggerItem } from '@/lib/motion'

const WHY_KEYS = ['why1', 'why2', 'why3', 'why4', 'why5'] as const

export default function About() {
  const t = useTranslations('about')

  return (
    <SectionEntrance
      id="about"
      className="section-padding bg-premium-charcoal scroll-mt-20"
      aria-labelledby="about-heading"
    >
      <div className="container-narrow">
        <header className="text-center mb-12 sm:mb-16">
          <p className="text-premium-accent text-overline uppercase mb-2">
            {t('overline')}
          </p>
          <h2 id="about-heading" className="text-h2 text-text-primary">
            {t('heading')}
          </h2>
        </header>

        <motion.div
          className="space-y-12"
          variants={staggerContainer}
          initial="visible"
          animate="visible"
        >
          {/* Row 1: text left, image right */}
          <motion.section
            variants={staggerItem}
            className="grid lg:grid-cols-2 items-stretch overflow-hidden rounded-card border border-border-default"
          >
            <div className="bg-premium-slate/80 p-6 sm:p-8 space-y-4 text-body text-text-secondary">
              <p>{t('intro1')}</p>
              <p>{t('intro2')}</p>
              <p className="text-text-primary font-medium">{t('belief')}</p>
              <p>{t('offer')}</p>
            </div>
            <div className="relative min-h-64">
              <Image
                src="/Logo.jpg"
                alt="AShineMobile logo"
                fill
                className="object-contain p-6"
                sizes="(min-width: 1024px) 320px, 60vw"
              />
            </div>
          </motion.section>

          {/* Row 2: image left, why-text right */}
          <motion.section
            variants={staggerItem}
            className="grid lg:grid-cols-2 items-stretch overflow-hidden rounded-card border border-border-default"
            aria-labelledby="about-why-heading"
          >
            <div className="order-last lg:order-first relative min-h-64">
              <Image
                src="/Logo.jpg"
                alt="AShineMobile logo"
                fill
                className="object-contain p-6"
                sizes="(min-width: 1024px) 320px, 60vw"
              />
            </div>
            <div className="order-first lg:order-last bg-premium-slate/80 p-6 sm:p-8">
              <h3 id="about-why-heading" className="text-h3 text-text-primary mb-4">
                {t('whyHeading')}
              </h3>
              <ul className="space-y-3" role="list">
                {WHY_KEYS.map((key) => (
                  <li
                    key={key}
                    className="text-body text-text-secondary flex items-center gap-3"
                  >
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-premium-accent/20 text-premium-accent text-body-sm font-semibold"
                      aria-hidden
                    >
                      ✓
                    </span>
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-body-sm text-premium-accent font-medium">
                {t('whyTagline')}
              </p>
            </div>
          </motion.section>

          {/* Commitment strip below grid */}
          <motion.section
            variants={staggerItem}
            className="rounded-card border border-border-default bg-premium-slate/80 p-6 sm:p-8"
            aria-labelledby="about-commitment-heading"
          >
            <h3 id="about-commitment-heading" className="text-h3 text-text-primary mb-4">
              {t('commitmentHeading')}
            </h3>
            <p className="text-body text-text-secondary">{t('commitment1')}</p>
            <p className="mt-3 text-body text-text-secondary">{t('commitment2')}</p>
          </motion.section>
        </motion.div>
      </div>
    </SectionEntrance>
  )
}
