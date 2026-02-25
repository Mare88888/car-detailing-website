import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'cookies' })
  return { title: t('title'), description: t('description') }
}

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('cookies')

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
            <h2 className="text-h4 text-text-primary mt-8 mb-3">{t('whatAreTitle')}</h2>
            <p>{t('whatAreBody')}</p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">{t('howWeUseTitle')}</h2>
            <p>{t('howWeUseIntro')}</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong className="text-text-primary">{t('necessaryLabel')}</strong> {t('necessaryDesc')}
              </li>
              <li>
                <strong className="text-text-primary">{t('functionalLabel')}</strong> {t('functionalDesc')}
              </li>
              <li>
                <strong className="text-text-primary">{t('analyticsLabel')}</strong> {t('analyticsDesc')}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">{t('thirdPartyTitle')}</h2>
            <p>{t('thirdPartyBody')}</p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">{t('managingTitle')}</h2>
            <p>{t('managingBody')}</p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">{t('updatesTitle')}</h2>
            <p>{t('updatesBody')}</p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">{t('contactTitle')}</h2>
            <p>
              {t('contactPrefix')}
              <a href="mailto:AShine@gmail.com" className="text-premium-accent hover:underline">
                AShine@gmail.com
              </a>
              {t('contactSuffix')}
            </p>
          </section>
        </div>
      </div>
    </article>
  )
}
