import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Gallery from '@/components/Gallery'
import Pricing from '@/components/Pricing'
import MapSection from '@/components/MapSection'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import { JsonLd } from '@/components'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://example.com'

export const metadata: Metadata = {
  title: 'Car Detailing & Mobile Valeting | Slovenia',
  description:
    'Book car detailing and mobile valeting in Slovenia. Ceramic coating, paint correction, full detail. We come to you – service area 50–200 km from Malečnik. AShineMobile.',
  openGraph: {
    title: 'AShineMobile – Car Detailing & Mobile Valeting | Slovenia',
    description: 'Professional car detailing and mobile valeting in Slovenia. Ceramic coating, paint correction. We come to you. Book online.',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AShineMobile – Car Detailing & Mobile Valeting | Slovenia',
    description: 'Professional car detailing and mobile valeting in Slovenia. We come to you. Book online.',
  },
  alternates: { canonical: siteUrl },
}

type Props = { params: Promise<{ locale: string }> }

export default async function Home({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <JsonLd />
      <Hero backgroundVideo="/0205-web.mp4" />
      <Services />
      <Gallery />
      <Pricing />
      <MapSection />
      <Testimonials />
      <Contact />
    </>
  )
}
