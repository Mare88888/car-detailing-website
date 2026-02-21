'use client'

import Link from 'next/link'

/* Simple solid icons – light gray, before label */
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.25 11.36 11.36 0 0 0 3.48.56 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .56 3.48 1 1 0 0 1-.25 1l-2.2 2.2z" />
    </svg>
  )
}
function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.34L4 8.7V6l8 5.33L20 6v2.7z" />
    </svg>
  )
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.16c3.2 0 3.58 0 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38 3.92 3.9 2.38 7.16 2.23c1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33 0 7.05.07 2.7.27.27 2.69.07 7.04 0 8.33 0 8.74 0 12s0 3.67.07 4.95c.2 4.36 2.37 6.53 6.73 6.73C8.33 23 8.74 23 12 23s3.67 0 4.95-.07c4.36-.2 6.53-2.37 6.73-6.73C23 15.67 23 15.26 23 12s0-3.67-.07-4.95C22.77 2.7 20.31.27 15.96.07 14.67 0 14.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.84a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
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
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Book Now' },
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
                <li key={link.href}>
                  <Link href={link.href} className="text-text-muted hover:text-premium-accent transition-colors duration-ui text-body-sm">
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
                    className="inline-flex items-center gap-2 text-text-muted hover:text-premium-accent transition-colors duration-ui text-body-sm"
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
          <p className="text-text-muted text-body-sm">© {new Date().getFullYear()} Car Detailing. All rights reserved.</p>
          <p className="text-text-muted text-body-sm">Keep your car looking its best.</p>
        </div>
      </div>
    </footer>
  )
}
