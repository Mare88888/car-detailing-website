'use client'

import Link from 'next/link'

/* Simple solid icons – light gray, before label */
export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.25 11.36 11.36 0 0 0 3.48.56 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .56 3.48 1 1 0 0 1-.25 1l-2.2 2.2z" />
    </svg>
  )
}
export function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.34L4 8.7V6l8 5.33L20 6v2.7z" />
    </svg>
  )
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

const navLinks = [
  { sectionId: 'services', label: 'Services' },
  { sectionId: 'gallery', label: 'Gallery' },
  { sectionId: 'pricing', label: 'Pricing' },
  { sectionId: 'testimonials', label: 'Testimonials' },
  { sectionId: 'contact', label: 'Book Now' },
]

const socialLinks = [
  { href: 'https://www.instagram.com/ashinemobile/', label: 'Instagram' },
  { href: 'https://www.facebook.com/people/A-Shine/61576376247443/#', label: 'Facebook' },
]

export default function Footer() {
  return (
    <footer className="bg-premium-black border-t border-border-default">
      <div className="container-narrow section-padding">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link
              href="/"
              onClick={(e) => {
                if (typeof window !== 'undefined' && window.location.pathname === '/') {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
              className="text-h4 text-text-primary hover:text-premium-accent transition-colors"
            >
              AShineMobile
            </Link>
            <p className="mt-3 text-body-sm text-text-muted">
              Professional car detailing and mobile valeting. Showroom finish, ceramic coatings, paint correction.
            </p>
          </div>
          <div>
            <h4 className="text-body-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Quick links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.sectionId}>
                  <Link
                    href="/"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(link.sectionId)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="text-text-muted hover:text-premium-accent transition-colors duration-ui text-body-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-body-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-2 text-body-sm text-text-muted">
              <li>
                <a href="tel:+38670742363" className="inline-flex items-center gap-2 hover:text-premium-accent transition-colors">
                  <PhoneIcon className="shrink-0" />
                  <span>+386 70 742 363</span>
                </a>
              </li>
              <li>
                <a href="mailto:AShineMobile@gmail.com" className="inline-flex items-center gap-2 hover:text-premium-accent transition-colors">
                  <EmailIcon className="shrink-0" />
                  <span>AShineMobile@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-body-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Follow</h4>
            <ul className="flex flex-col gap-2">
              {socialLinks.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-text-secondary hover:text-premium-accent transition-colors duration-ui text-body-sm"
                  >
                    {s.label === 'Instagram' ? <InstagramIcon className="shrink-0" /> : <FacebookIcon className="shrink-0" />}
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border-default flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="text-text-muted text-body-sm">© {new Date().getFullYear()} AShineMobile. All rights reserved.</p>
            <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-body-sm">
              <Link href="/privacy" className="text-text-muted hover:text-premium-accent transition-colors">
                Privacy
              </Link>
              <span className="text-text-disabled">·</span>
              <Link href="/terms" className="text-text-muted hover:text-premium-accent transition-colors">
                Terms
              </Link>
              <span className="text-text-disabled">·</span>
              <Link href="/cookies" className="text-text-muted hover:text-premium-accent transition-colors">
                Cookies
              </Link>
            </nav>
          </div>
          <p className="text-text-muted text-body-sm">Keep your car looking its best.</p>
        </div>
      </div>
    </footer>
  )
}
