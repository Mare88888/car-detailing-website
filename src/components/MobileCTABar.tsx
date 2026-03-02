'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'

const SCROLL_THRESHOLD = 300

function PhoneIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.25 11.36 11.36 0 0 0 3.48.56 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .56 3.48 1 1 0 0 1-.25 1l-2.2 2.2z" />
    </svg>
  )
}

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

export default function MobileCTABar() {
  const t = useTranslations('mobileCta')
  const [scrolledPast, setScrolledPast] = useState(false)
  const [contactVisible, setContactVisible] = useState(false)

  // Show only after scrolling past threshold
  useEffect(() => {
    const onScroll = () => setScrolledPast(window.scrollY > SCROLL_THRESHOLD)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Hide when contact section (or footer) is in view — bar is redundant there
  useEffect(() => {
    const targets = ['contact', 'footer-root']
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setContactVisible(true)
        } else if (entries.every((e) => !e.isIntersecting)) {
          setContactVisible(false)
        }
      },
      { threshold: 0.1 }
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const visible = scrolledPast && !contactVisible

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          aria-label={t('ariaLabel')}
        >
          {/* Top accent line */}
          <div
            aria-hidden
            className="h-px w-full bg-gradient-to-r from-transparent via-premium-accent/60 to-transparent"
          />

          <div className="bg-premium-charcoal/95 backdrop-blur-sm px-4 py-3 flex gap-3">
            <a
              href="tel:+38670742363"
              className="flex flex-1 items-center justify-center gap-2 rounded-sharp border border-border-default bg-premium-slate text-text-primary text-body-sm font-semibold py-3 transition-colors active:bg-premium-zinc"
              aria-label={t('callAriaLabel')}
            >
              <PhoneIcon />
              <span className="truncate">+386 70 742 363</span>
            </a>

            <button
              type="button"
              onClick={scrollToContact}
              className="flex flex-1 items-center justify-center rounded-sharp bg-premium-accent text-white text-body-sm font-semibold py-3 transition-all duration-ui hover:bg-premium-accent-hover active:scale-[0.98]"
            >
              {t('bookNow')}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
