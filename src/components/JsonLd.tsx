/**
 * JSON-LD structured data for SEO: WebSite, Organization, LocalBusiness.
 * Rendered on the home page so search engines can show rich results.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://example.com'

const businessDescription =
  'Professional car detailing and mobile valeting in Slovenia. Ceramic coating, paint correction, full detail. We come to you – Celestrina 19, Malečnik. Service area 50–200 km.'

const localBusiness = {
  '@type': 'AutoRepair',
  '@id': `${siteUrl}/#business`,
  name: 'AShineMobile',
  description: businessDescription,
  url: siteUrl,
  telephone: '+38670742363',
  email: 'AShineMobile@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Celestrina 19',
    addressLocality: 'Malečnik',
    addressCountry: 'SI',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 46.56174661845999,
    longitude: 15.717263781943037,
  },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: { '@type': 'GeoCoordinates', latitude: 46.56174661845999, longitude: 15.717263781943037 },
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
  '@id': `${siteUrl}/#organization`,
  name: 'AShineMobile',
  url: siteUrl,
  description: businessDescription,
  sameAs: localBusiness.sameAs,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+38670742363',
    email: 'AShineMobile@gmail.com',
    areaServed: 'SI',
    availableLanguage: 'English, Slovenian',
  },
}

const webSite = {
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: 'AShineMobile – Car Detailing & Mobile Valeting | Slovenia',
  description: 'Book car detailing and mobile valeting in Slovenia. Ceramic coating, paint correction, full detail. We come to you.',
  publisher: { '@id': `${siteUrl}/#organization` },
  inLanguage: 'en-GB',
  potentialAction: {
    '@type': 'ReadAction',
    target: { '@type': 'EntryPoint', url: siteUrl },
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
