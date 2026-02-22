import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { SITE_URL } from '@/config/site'

const STATIC_PAGES = ['privacy', 'terms', 'cookies'] as const
const NOW = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  for (const locale of routing.locales) {
    entries.push({ url: `${SITE_URL}/${locale}`, lastModified: NOW, changeFrequency: 'weekly', priority: 1 })
    for (const page of STATIC_PAGES) {
      entries.push({ url: `${SITE_URL}/${locale}/${page}`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.5 })
    }
  }
  return entries
}
