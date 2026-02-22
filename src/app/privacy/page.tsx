import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for AShineMobile – how we collect, use and protect your personal data.',
}

export default function PrivacyPage() {
  return (
    <article className="section-padding bg-premium-black min-h-screen">
      <div className="container-narrow">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-body-sm text-text-muted hover:text-premium-accent transition-colors mb-8"
        >
          ← Back to home
        </Link>
        <h1 className="text-h1 text-text-primary mb-2">Privacy Policy</h1>
        <p className="text-body-sm text-text-muted mb-10">Last updated: February 2025</p>

        <div className="prose prose-invert max-w-none space-y-6 text-body text-text-secondary">
          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">1. Who we are</h2>
            <p>
              AShineMobile (&quot;we&quot;, &quot;us&quot;) provides car detailing and mobile valeting services in Slovenia. Our website allows you to request bookings and get in touch. This policy explains how we handle your personal data.
            </p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">2. Data we collect</h2>
            <p>When you use our booking form or contact us, we may collect:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Name and email address</li>
              <li>Phone number (if you provide it)</li>
              <li>Car type or model</li>
              <li>Service and location preferences (e.g. at our location or we come to you, distance)</li>
              <li>Preferred date and any message you send</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">3. How we use your data</h2>
            <p>We use this information to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Process and respond to your booking or enquiry</li>
              <li>Send you a confirmation email when you submit a request</li>
              <li>Contact you about your booking (e.g. by phone or email)</li>
              <li>Improve our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">4. Legal basis and retention</h2>
            <p>
              We process your data on the basis of your consent (when you submit the form) and for the performance of a contract (to provide the requested service). We keep booking-related data for as long as needed to fulfil the booking and for a reasonable period thereafter for legal and business purposes.
            </p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">5. Sharing and security</h2>
            <p>
              We do not sell your data. We may share it only with service providers that help us operate the website (e.g. email delivery). We take reasonable steps to keep your data secure.
            </p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">6. Your rights</h2>
            <p>
              Under applicable data protection law (including GDPR where it applies), you may have the right to access, correct, delete, or restrict processing of your personal data, and to data portability or to object to processing. To exercise these rights or ask questions, contact us at{' '}
              <a href="mailto:AShineMobile@gmail.com" className="text-premium-accent hover:underline">
                AShineMobile@gmail.com
              </a>
              . You may also have the right to lodge a complaint with a supervisory authority.
            </p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">7. Changes</h2>
            <p>
              We may update this privacy policy from time to time. The &quot;Last updated&quot; date at the top will be revised when we do. Continued use of the site after changes constitutes acceptance of the updated policy.
            </p>
          </section>
        </div>
      </div>
    </article>
  )
}
