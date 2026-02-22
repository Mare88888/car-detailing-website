'use client'

import Image from 'next/image'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useTransition } from 'react'

const LOCALES = [
  { code: 'en' as const, label: 'English', ariaLabel: 'Switch to English', flag: '/flag-united-kingdom.svg' },
  { code: 'sl' as const, label: 'Slovenščina', ariaLabel: 'Preklopi na slovenščino', flag: '/flag-slovenia.svg' },
] as const

const BUTTON_BASE_CLASS =
  'flex h-8 w-10 items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-premium-accent focus:ring-offset-2 focus:ring-offset-premium-black disabled:opacity-50'
const BUTTON_ACTIVE_CLASS = 'bg-premium-accent/20 text-premium-accent ring-1 ring-premium-accent/50'
const BUTTON_INACTIVE_CLASS = 'text-text-secondary hover:bg-premium-slate hover:text-text-primary'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleChange = (nextLocale: 'en' | 'sl') => {
    if (nextLocale === locale) return
    startTransition(() => router.replace(pathname, { locale: nextLocale }))
  }

  return (
    <div className="flex items-center rounded-full border border-border-default bg-premium-charcoal/80 p-0.5" role="group" aria-label="Language">
      {LOCALES.map(({ code, label, ariaLabel, flag }) => (
        <button
          key={code}
          type="button"
          onClick={() => handleChange(code)}
          disabled={isPending}
          aria-label={ariaLabel}
          aria-current={locale === code ? 'true' : undefined}
          title={label}
          className={`${BUTTON_BASE_CLASS} ${locale === code ? BUTTON_ACTIVE_CLASS : BUTTON_INACTIVE_CLASS}`}
        >
          <Image src={flag} alt="" width={24} height={16} className="h-4 w-6 object-cover rounded-sm" aria-hidden />
        </button>
      ))}
    </div>
  )
}
