import Link from 'next/link'

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Book Now' },
]

const socialLinks = [
  { href: 'https://instagram.com', label: 'Instagram' },
  { href: 'https://facebook.com', label: 'Facebook' },
]

export default function Footer() {
  return (
    <footer className="bg-premium-black border-t border-border-default">
      <div className="container-narrow section-padding">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="text-h4 text-text-primary">
              Detailing<span className="text-premium-accent">.</span>
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
              <li><a href="tel:+440000000000" className="hover:text-premium-accent transition-colors">00000 000000</a></li>
              <li><a href="mailto:hello@example.com" className="hover:text-premium-accent transition-colors">hello@example.com</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-body-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Follow</h4>
            <ul className="flex gap-4">
              {socialLinks.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-premium-accent transition-colors duration-ui text-body-sm"
                  >
                    {s.label}
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
