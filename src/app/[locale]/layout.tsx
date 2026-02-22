import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

function isValidLocale(locale: string): locale is Locale {
  return routing.locales.includes(locale as Locale)
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <Nav />
      <main className="flex-1" id="main-content">
        {children}
      </main>
      <Footer />
    </NextIntlClientProvider>
  )
}
