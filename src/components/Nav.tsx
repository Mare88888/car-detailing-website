'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import LanguageSwitcher from '@/components/LanguageSwitcher'

const sectionIds = ['services', 'gallery', 'pricing', 'map', 'testimonials', 'contact'] as const

const navLinkKeys = [
  { id: 'services' as const, key: 'services' },
  { id: 'gallery' as const, key: 'gallery' },
  { id: 'pricing' as const, key: 'pricing' },
  { id: 'map' as const, key: 'map' },
  { id: 'testimonials' as const, key: 'testimonials' },
] as const

export default function Nav() {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  // Solid background when scrolled past threshold
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section highlight via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          })
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-premium-black/95 backdrop-blur-md border-b border-border-default'
        : 'bg-transparent'
        }`}
      role="banner"
    >
      <nav
        className="container-narrow px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        {/* Logo + brand — left */}
        <Link
          href="/"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            const path = window.location.pathname
            if (path === '/' || path === '/en' || path === '/sl') {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
              setActiveSection(null)
            }
          }}
          className="flex items-center gap-3 text-h3 text-text-primary tracking-tight shrink-0 focus:outline-none focus:ring-0"
          aria-label={t('home')}
        >
          <Image
            src="/NavigationBarLogo.png"
            alt="AShineMobile Logo"
            width={100}
            height={100}
            className="h-30 w-30 object-contain"
            style={{ borderRadius: '5px' }}
            priority
            sizes="(max-width: 768px) 96px, 100px"
          />
          <span>AShineMobile</span>
        </Link>

        {/* Desktop: center links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinkKeys.map((link) => {
            const isActive = activeSection === link.id
            return (
              <li key={link.id}>
                <Link
                  href="/"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault()
                    document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={`text-body font-medium transition-colors duration-200 hover:text-premium-accent-light ${isActive ? 'text-premium-accent' : 'text-text-secondary'
                    }`}
                >
                  {t(link.key)}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Desktop: language switcher + Book Now — top right */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <LanguageSwitcher />
          <Link
            href="/"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-primary inline-flex items-center justify-center px-6 py-3 text-body-sm"
          >
            {t('bookNow')}
          </Link>
        </div>

        {/* Mobile: language switcher + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
        <button
          type="button"
          className="md:hidden relative p-2 -mr-2 w-10 h-10 text-text-secondary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-premium-accent focus:ring-offset-2 focus:ring-offset-premium-black rounded"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
        >
          <svg className="w-6 h-6 absolute inset-0 m-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" aria-hidden>
            {/* Hamburger: three lines */}
            <g className={`transition-opacity duration-200 ease-out ${mobileOpen ? 'opacity-0' : 'opacity-100'}`}>
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </g>
            {/* X: two equal diagonals crossing at center */}
            <g className={`transition-opacity duration-200 ease-out ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </g>
          </svg>
        </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${mobileOpen ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0'
          }`}
        aria-hidden={!mobileOpen}
      >
        <div className="bg-premium-charcoal border-t border-border-default px-4 py-4 overflow-y-auto max-h-[85vh]">
          <ul className="flex flex-col gap-1">
            {navLinkKeys.map((link) => {
              const isActive = activeSection === link.id
              return (
                <li key={link.id}>
                  <Link
                    href="/"
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.preventDefault()
                      document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })
                      setMobileOpen(false)
                    }}
                    className={`block py-3 px-2 rounded-sharp text-body font-medium transition-colors ${isActive
                      ? 'text-premium-accent bg-premium-accent-muted'
                      : 'text-text-secondary hover:text-premium-accent-light hover:bg-premium-slate'
                      }`}
                  >
                    {t(link.key)}
                  </Link>
                </li>
              )
            })}
            <li className="mt-2 pt-2 border-t border-border-default">
              <Link
                href="/"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault()
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  setMobileOpen(false)
                }}
                className="btn-primary flex items-center justify-center w-full py-3.5"
              >
                {t('bookNow')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
