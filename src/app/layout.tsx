import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { SITE_URL, BRAND } from '@/config/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'AShine',
  title: {
    default: 'AShine – Car Detailing & Mobile Valeting | Slovenia',
    template: '%s | AShine',
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
  authors: [{ name: 'AShine', url: SITE_URL }],
  creator: 'AShine',
  publisher: 'AShine',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'AShine',
    title: 'AShine – Car Detailing & Mobile Valeting | Slovenia',
    description: 'Professional car detailing and mobile valeting in Slovenia. Ceramic coating, paint correction. We come to you.',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AShine – Car Detailing & Mobile Valeting | Slovenia',
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
  themeColor: BRAND.bg,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-premium-black text-text-primary">
        {children}
      </body>
    </html>
  )
}
