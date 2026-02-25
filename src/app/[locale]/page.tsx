import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { SITE_URL } from '@/config/site'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Gallery from '@/components/Gallery'
import Pricing from '@/components/Pricing'
import MapSection from '@/components/MapSection'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import { JsonLd } from '@/components'

const PAGE_META = {
  title: 'Car Detailing & Mobile Valeting | Slovenia',
  description: 'Book car detailing and mobile valeting in Slovenia. Ceramic coating, paint correction, full detail. We come to you – service area 50–200 km from Malečnik. AShine.',
  ogTitle: 'AShine – Car Detailing & Mobile Valeting | Slovenia',
  ogDescription: 'Professional car detailing and mobile valeting in Slovenia. Ceramic coating, paint correction. We come to you. Book online.',
} as const

export const metadata: Metadata = {
  title: PAGE_META.title,
  description: PAGE_META.description,
  openGraph: {
    title: PAGE_META.ogTitle,
    description: PAGE_META.ogDescription,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_META.ogTitle,
    description: PAGE_META.ogDescription,
  },
  alternates: { canonical: SITE_URL },
}

type Props = { params: Promise<{ locale: string }> }

export default async function Home({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <JsonLd />
      <Hero backgroundVideo="/0205-web.mp4" />
      <About />
      <Services />
      <Gallery />
      <Pricing />
      <MapSection />
      <Testimonials />
      <Contact />
    </>
  )
}
