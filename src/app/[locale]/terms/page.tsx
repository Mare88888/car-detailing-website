import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'terms' })
  return { title: t('title'), description: t('description') }
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('terms')

  return (
    <article className="section-padding bg-premium-black min-h-screen">
      <div className="container-narrow">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-body-sm text-text-muted hover:text-premium-accent transition-colors mb-8"
        >
          {t('backToHome')}
        </Link>
        <h1 className="text-h1 text-text-primary mb-2">{t('title')}</h1>
        <p className="text-body-sm text-text-muted mb-10">{t('lastUpdated')}</p>

        <div className="prose prose-invert max-w-none space-y-6 text-body text-text-secondary">
          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">{t('agreementTitle')}</h2>
            <p>{t('agreementBody')}</p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">{t('servicesTitle')}</h2>
            <p>{t('servicesBody')}</p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">{t('bookingsTitle')}</h2>
            <p>{t('bookingsBody')}</p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">{t('cancellationTitle')}</h2>
            <p>{t('cancellationBody')}</p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">{t('useOfWebsiteTitle')}</h2>
            <p>{t('useOfWebsiteBody')}</p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">{t('liabilityTitle')}</h2>
            <p>{t('liabilityBody')}</p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">{t('contactTitle')}</h2>
            <p>
              {t('contactPrefix')}
              <a href="mailto:AShineMobile@gmail.com" className="text-premium-accent hover:underline">
                AShineMobile@gmail.com
              </a>
              {t('contactSuffix')}
            </p>
          </section>
        </div>
      </div>
    </article>
  )
}
