import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using AShineMobile website and booking our car detailing services.',
}

export default function TermsPage() {
  return (
    <article className="section-padding bg-premium-black min-h-screen">
      <div className="container-narrow">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-body-sm text-text-muted hover:text-premium-accent transition-colors mb-8"
        >
          ← Back to home
        </Link>
        <h1 className="text-h1 text-text-primary mb-2">Terms of Service</h1>
        <p className="text-body-sm text-text-muted mb-10">Last updated: February 2025</p>

        <div className="prose prose-invert max-w-none space-y-6 text-body text-text-secondary">
          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">1. Agreement</h2>
            <p>
              By using the AShineMobile website and our services, you agree to these terms. If you do not agree, please do not use the site or our services.
            </p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">2. Services</h2>
            <p>
              AShineMobile provides car detailing and mobile valeting services in Slovenia. Service areas, packages, and prices are described on our website. We reserve the right to decline a booking or to adjust services and pricing. A booking is only confirmed once we have agreed with you (e.g. by email or phone).
            </p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">3. Bookings and payment</h2>
            <p>
              Submitting a booking request via the website does not create a binding contract. We will contact you to confirm availability and details. Payment terms (e.g. on completion, deposit) will be agreed with you before the service. You are responsible for providing accurate contact and vehicle information.
            </p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">4. Cancellation and rescheduling</h2>
            <p>
              If you need to cancel or reschedule, please contact us as soon as possible. We may apply a cancellation policy (e.g. notice period) as communicated at the time of booking.
            </p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">5. Use of the website</h2>
            <p>
              You must use the website lawfully and not attempt to interfere with its operation, security, or other users. Content on the site (text, images, etc.) is owned by us or our licensors and may not be copied or used without permission.
            </p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">6. Limitation of liability</h2>
            <p>
              We carry out our services with reasonable skill and care. Our liability for any claim arising from our services or your use of the website is limited to the extent permitted by applicable law. We are not liable for indirect or consequential loss.
            </p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">7. Contact and changes</h2>
            <p>
              For questions about these terms, contact us at{' '}
              <a href="mailto:AShineMobile@gmail.com" className="text-premium-accent hover:underline">
                AShineMobile@gmail.com
              </a>
              . We may update these terms from time to time; the &quot;Last updated&quot; date will be revised. Continued use of the site or services after changes constitutes acceptance.
            </p>
          </section>
        </div>
      </div>
    </article>
  )
}
