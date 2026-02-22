import type { MetadataRoute } from 'next'

const locales = ['en', 'sl'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://example.com'
  const entries: MetadataRoute.Sitemap = []
  for (const locale of locales) {
    entries.push({ url: `${baseUrl}/${locale}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 })
    entries.push({ url: `${baseUrl}/${locale}/privacy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 })
    entries.push({ url: `${baseUrl}/${locale}/terms`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 })
    entries.push({ url: `${baseUrl}/${locale}/cookies`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 })
  }
  return entries
}
