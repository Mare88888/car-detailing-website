import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://example.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'AShineMobile',
  title: {
    default: 'AShineMobile – Car Detailing & Mobile Valeting | Slovenia',
    template: '%s | AShineMobile',
  },
  description:
    'Professional car detailing and mobile valeting in Slovenia. Ceramic coating, paint correction, full detail. We come to you – Celestrina 19, Malečnik. Book online.',
  keywords: [
    'car detailing Slovenia',
    'mobile valeting',
    'ceramic coating',
    'paint correction',
    'avto detailing',
    'valeting Malečnik',
    'car detailing Maribor',
  ],
  authors: [{ name: 'AShineMobile', url: siteUrl }],
  creator: 'AShineMobile',
  publisher: 'AShineMobile',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'AShineMobile',
    title: 'AShineMobile – Car Detailing & Mobile Valeting | Slovenia',
    description: 'Professional car detailing and mobile valeting in Slovenia. Ceramic coating, paint correction. We come to you.',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AShineMobile – Car Detailing & Mobile Valeting | Slovenia',
    description: 'Professional car detailing and mobile valeting in Slovenia. We come to you.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: '/',
  },
  category: 'automotive',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#08080a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-premium-black text-text-primary">
        <Nav />
        <main className="flex-1" id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
