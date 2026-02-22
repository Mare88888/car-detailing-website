import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How AShineMobile uses cookies and similar technologies on this website.',
}

export default function CookiesPage() {
  return (
    <article className="section-padding bg-premium-black min-h-screen">
      <div className="container-narrow">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-body-sm text-text-muted hover:text-premium-accent transition-colors mb-8"
        >
          ← Back to home
        </Link>
        <h1 className="text-h1 text-text-primary mb-2">Cookie Policy</h1>
        <p className="text-body-sm text-text-muted mb-10">Last updated: February 2025</p>

        <div className="prose prose-invert max-w-none space-y-6 text-body text-text-secondary">
          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">1. What are cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They are widely used to make sites work properly, remember preferences, and understand how visitors use the site.
            </p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">2. How we use cookies</h2>
            <p>Our website may use:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong className="text-text-primary">Strictly necessary cookies:</strong> Required for the site to function (e.g. security, load balancing). These generally do not require consent under applicable law.
              </li>
              <li>
                <strong className="text-text-primary">Functional cookies:</strong> Remember choices you make (e.g. language, region) to improve your experience.
              </li>
              <li>
                <strong className="text-text-primary">Analytics cookies:</strong> If we use analytics (e.g. to see how many people visit the site), these help us understand usage. They may be set by us or by third-party services.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">3. Third-party services</h2>
            <p>
              Our site may include content or features from third parties (e.g. Google Maps for the service area map). Those services may set their own cookies. We do not control these; please check the relevant provider&apos;s privacy and cookie policies (e.g. Google) for more information.
            </p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">4. Managing cookies</h2>
            <p>
              You can control or delete cookies through your browser settings. Blocking or deleting cookies may affect how the website works (e.g. some features may not function correctly).
            </p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">5. Updates</h2>
            <p>
              We may update this cookie policy from time to time. The &quot;Last updated&quot; date at the top will be revised when we do. We encourage you to review this page periodically.
            </p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">6. Contact</h2>
            <p>
              If you have questions about our use of cookies, contact us at{' '}
              <a href="mailto:AShineMobile@gmail.com" className="text-premium-accent hover:underline">
                AShineMobile@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </article>
  )
}
