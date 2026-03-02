import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { SITE_URL } from '@/config/site'

const STATIC_PAGES = ['privacy', 'terms', 'cookies'] as const
const NOW = new Date()

function localePath(locale: string, page?: string): string {
  const isDefault = locale === routing.defaultLocale
  const base = isDefault ? SITE_URL : `${SITE_URL}/${locale}`
  return page ? `${base}/${page}` : base
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  for (const locale of routing.locales) {
    entries.push({ url: localePath(locale), lastModified: NOW, changeFrequency: 'weekly', priority: 1 })
    for (const page of STATIC_PAGES) {
      entries.push({ url: localePath(locale, page), lastModified: NOW, changeFrequency: 'monthly', priority: 0.5 })
    }
  }
  return entries
}
