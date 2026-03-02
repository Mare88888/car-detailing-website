'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'ashine_cookie_consent'

export default function CookieBanner() {
  const t = useTranslations('cookieBanner')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true)
    }
  }, [])

  function accept(choice: 'all' | 'necessary') {
    localStorage.setItem(STORAGE_KEY, choice)
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label={t('ariaLabel')}
          aria-live="polite"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-50"
        >
          <div className="relative overflow-hidden rounded-card border border-border-default bg-premium-charcoal shadow-2xl shadow-black/60">
            {/* Cyan top accent line */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-premium-accent to-transparent"
            />

            <div className="p-5">
              <p className="text-body-sm font-semibold text-text-primary mb-1">
                {t('title')}
              </p>
              <p className="text-body-sm text-text-secondary leading-relaxed">
                {t('message')}{' '}
                <Link
                  href="/cookies"
                  className="text-premium-accent hover:underline underline-offset-2 whitespace-nowrap"
                >
                  {t('learnMore')}
                </Link>
              </p>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => accept('all')}
                  className="btn-primary flex-1 py-2.5 text-xs"
                >
                  {t('acceptAll')}
                </button>
                <button
                  type="button"
                  onClick={() => accept('necessary')}
                  className="btn-secondary flex-1 py-2.5 text-xs"
                >
                  {t('necessary')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
