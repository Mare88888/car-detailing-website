import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'privacy' })
  return { title: t('title'), description: t('description') }
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('privacy')

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
            <h2 className="text-h4 text-text-primary mt-8 mb-3">{t('whoWeAreTitle')}</h2>
            <p>{t('whoWeAreBody')}</p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">{t('dataWeCollectTitle')}</h2>
            <p>{t('dataWeCollectIntro')}</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>{t('dataWeCollect1')}</li>
              <li>{t('dataWeCollect2')}</li>
              <li>{t('dataWeCollect3')}</li>
              <li>{t('dataWeCollect4')}</li>
              <li>{t('dataWeCollect5')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">{t('howWeUseTitle')}</h2>
            <p>{t('howWeUseIntro')}</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>{t('howWeUse1')}</li>
              <li>{t('howWeUse2')}</li>
              <li>{t('howWeUse3')}</li>
              <li>{t('howWeUse4')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">{t('legalBasisTitle')}</h2>
            <p>{t('legalBasisBody')}</p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">{t('sharingTitle')}</h2>
            <p>{t('sharingBody')}</p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">{t('yourRightsTitle')}</h2>
            <p>
              {t('yourRightsBody')}
              <a href="mailto:AShineMobile@gmail.com" className="text-premium-accent hover:underline">
                AShineMobile@gmail.com
              </a>
              {t('yourRightsSuffix')}
            </p>
          </section>

          <section>
            <h2 className="text-h4 text-text-primary mt-8 mb-3">{t('changesTitle')}</h2>
            <p>{t('changesBody')}</p>
          </section>
        </div>
      </div>
    </article>
  )
}
