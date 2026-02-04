'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const sectionIds = ['services', 'gallery', 'pricing', 'testimonials', 'contact'] as const

const navLinks = [
  { href: '#services', label: 'Services', id: 'services' },
  { href: '#gallery', label: 'Gallery', id: 'gallery' },
  { href: '#pricing', label: 'Pricing', id: 'pricing' },
  { href: '#testimonials', label: 'Testimonials', id: 'testimonials' },
] as const

export default function Nav() {
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
        {/* Logo — left; smooth scroll to top and clear active section */}
        <Link
          href="/"
          onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
              setActiveSection(null)
            }
          }}
          className="text-h3 text-text-primary tracking-tight shrink-0 focus:outline-none focus:ring-0"
          aria-label="Home"
        >
          Detailing<span className="text-premium-accent">.</span>
        </Link>

        {/* Desktop: center links + right CTA */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-body-sm font-medium transition-colors duration-200 hover:text-premium-accent ${isActive ? 'text-premium-accent' : 'text-text-secondary'
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Desktop: Book Now CTA — right */}
        <div className="hidden md:block shrink-0">
          <Link
            href="#contact"
            className="btn-primary inline-flex items-center justify-center px-6 py-3 text-body-sm"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile: hamburger */}
        <button
          type="button"
          className="md:hidden p-2 -mr-2 text-text-secondary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-premium-accent focus:ring-offset-2 focus:ring-offset-premium-black rounded"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        aria-hidden={!mobileOpen}
      >
        <div className="bg-premium-charcoal border-t border-border-default px-4 py-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-3 px-2 rounded-sharp text-body-sm font-medium transition-colors ${isActive
                      ? 'text-premium-accent bg-premium-accent-muted'
                      : 'text-text-secondary hover:text-premium-accent hover:bg-premium-slate'
                      }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
            <li className="mt-2 pt-2 border-t border-border-default">
              <Link
                href="#contact"
                className="btn-primary flex items-center justify-center w-full py-3.5"
                onClick={() => setMobileOpen(false)}
              >
                Book Now
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
