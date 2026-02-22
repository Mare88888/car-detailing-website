/**
 * Shared site configuration: base URL and brand.
 * Used by layout, page metadata, sitemap, robots, JsonLd.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://example.com'

export const BRAND = {
  name: 'AShineMobile',
  /** Tailwind premium-black equivalent */
  bg: '#08080a',
  /** Tailwind premium-accent equivalent */
  accent: '#00b8db',
} as const

/** Celestrina 19, Malečnik – used by MapSection and JsonLd */
export const GEO = {
  latitude: 46.56174661845999,
  longitude: 15.717263781943037,
} as const
