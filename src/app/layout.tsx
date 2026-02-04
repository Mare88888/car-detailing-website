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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'),
  title: {
    default: 'Premium Car Detailing | Valeting & Protection',
    template: '%s | Car Detailing',
  },
  description:
    'Professional car detailing and mobile valeting. Showroom finish with ceramic coatings and paint correction.',
  keywords: ['car detailing', 'valeting', 'ceramic coating', 'paint correction', 'mobile valet'],
  authors: [{ name: 'Car Detailing' }],
  creator: 'Car Detailing',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Car Detailing',
    title: 'Premium Car Detailing | Valeting & Protection',
    description: 'Professional car detailing and mobile valeting. Showroom finish with ceramic coatings and paint correction.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Car Detailing | Valeting & Protection',
    description: 'Professional car detailing and mobile valeting. Showroom finish with ceramic coatings and paint correction.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
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
