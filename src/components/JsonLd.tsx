/**
 * JSON-LD structured data for SEO: WebSite, Organization, LocalBusiness.
 * Rendered on the home page so search engines can show rich results.
 */
import { SITE_URL, GEO } from '@/config/site'

const BUSINESS_DESCRIPTION =
  'Professional car detailing and mobile valeting in Slovenia. Ceramic coating, paint correction, full detail. We come to you – Celestrina 19, Malečnik. Service area 50–200 km.'

const localBusiness = {
  '@type': 'AutoRepair',
  '@id': `${SITE_URL}/#business`,
  name: 'AShine',
  description: BUSINESS_DESCRIPTION,
  url: SITE_URL,
  telephone: '+38670742363',
  email: 'AShine@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Celestrina 19',
    addressLocality: 'Malečnik',
    addressCountry: 'SI',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: GEO.latitude,
    longitude: GEO.longitude,
  },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: { '@type': 'GeoCoordinates', latitude: GEO.latitude, longitude: GEO.longitude },
    geoRadius: '200000',
  },
  priceRange: '€€',
  sameAs: [
    'https://www.instagram.com/ashinemobile/',
    'https://www.facebook.com/people/A-Shine/61576376247443/',
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '08:00',
    closes: '18:00',
  },
}

const organization = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'AShine',
  url: SITE_URL,
  description: BUSINESS_DESCRIPTION,
  sameAs: localBusiness.sameAs,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+38670742363',
    email: 'AShine@gmail.com',
    areaServed: 'SI',
    availableLanguage: 'English, Slovenian',
  },
}

const webSite = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'AShine – Car Detailing & Mobile Valeting | Slovenia',
  description: 'Book car detailing and mobile valeting in Slovenia. Ceramic coating, paint correction, full detail. We come to you.',
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-GB',
  potentialAction: {
    '@type': 'ReadAction',
    target: { '@type': 'EntryPoint', url: SITE_URL },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [webSite, organization, localBusiness],
}

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
