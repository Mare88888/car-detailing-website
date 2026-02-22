'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { useTranslations } from 'next-intl'
import { SectionEntrance } from '@/components/MotionSection'

const MAP_CENTER = { lat: 46.56174661845999, lng: 15.717263781943037 } // Celestrina 19, Malečnik, Slovenia (fallback)
// Largest first so smallest is on top: red 200km, blue 100km, green 50km
const CIRCLE_CONFIGS = [
  { radius: 200000, fillColor: '#e53935', km: 200, priceKey: 'perKm' as const, priceValue: '0.40€' },
  { radius: 100000, fillColor: '#1e88e5', km: 100, priceKey: 'perKm' as const, priceValue: '0.50€' },
  { radius: 50000, fillColor: '#43a047', km: 50, priceKey: 'free' as const, priceValue: '' },
]
const FILL_OPACITY = 0.2

export default function MapSection() {
  const t = useTranslations('map')
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<object | null>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  // If script was already loaded (e.g. after locale switch), mark as loaded so map initializes
  useEffect(() => {
    if (typeof google !== 'undefined' && google.maps) {
      setScriptLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!scriptLoaded || typeof google === 'undefined') return
    const container = containerRef.current
    if (!container) return

    const map = new google.maps.Map(container, {
      center: MAP_CENTER,
      zoom: 9,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      styles: [
        { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
        { featureType: 'transit', elementType: 'labels', stylers: [{ visibility: 'off' }] },
      ],
    })
    mapRef.current = map

    const placeMarkerAndCircles = (center: { lat: number; lng: number }) => {
      new google.maps.Marker({
        position: center,
        map,
        title: t('address'),
      })
      CIRCLE_CONFIGS.forEach(({ radius, fillColor }) => {
        new google.maps.Circle({
          map,
          center,
          radius,
          fillColor,
          fillOpacity: FILL_OPACITY,
          strokeColor: fillColor,
          strokeOpacity: 0.4,
          strokeWeight: 1,
        })
      })
      map.setCenter(center)
    }

    // Geocode address so marker is exactly at Celestrina 19, Malečnik (requires Geocoding API enabled)
    const geocoder = new (google.maps as unknown as { Geocoder: new () => { geocode: (r: { address: string }, cb: (r: unknown[], s: string) => void) => void } }).Geocoder()
    geocoder.geocode(
      { address: 'Celestrina 19, Malečnik, Slovenia' },
      (results: unknown[], status: string) => {
        const first = results?.[0] as { geometry: { location: { lat: () => number; lng: () => number } } } | undefined
        if (status === 'OK' && first?.geometry?.location) {
          const loc = first.geometry.location
          placeMarkerAndCircles({ lat: loc.lat(), lng: loc.lng() })
        } else {
          placeMarkerAndCircles(MAP_CENTER)
        }
      }
    )

    return () => {
      mapRef.current = null
    }
  }, [scriptLoaded, t])

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    return (
      <SectionEntrance id="map" className="section-padding bg-premium-charcoal" aria-labelledby="map-heading">
        <div className="container-narrow text-center py-16">
          <h2 id="map-heading" className="text-h2 text-text-primary mb-2">{t('noKeyHeading')}</h2>
          <p className="text-text-muted text-body-sm">
            {t('noKeyHint')}
          </p>
          <p className="text-text-muted text-body-sm mt-2">
            {t('address')}
          </p>
        </div>
      </SectionEntrance>
    )
  }

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}`}
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
      <SectionEntrance id="map" className="section-padding bg-premium-charcoal" aria-labelledby="map-heading">
        <div className="container-narrow">
          <header className="text-center mb-8">
            <p className="text-premium-accent text-overline uppercase mb-2">{t('overline')}</p>
            <h2 id="map-heading" className="text-h2 text-text-primary">
              {t('heading')}
            </h2>
            <p className="mt-3 text-body text-text-secondary max-w-xl mx-auto">
              {t('subheading')}
            </p>
          </header>
          <div
            ref={containerRef}
            className="w-full h-[400px] sm:h-[480px] rounded-card overflow-hidden border border-border-default bg-premium-slate"
            aria-hidden
          />

          {/* Legend: color = distance + pricing */}
          <div className="mt-6 rounded-card border border-border-default bg-premium-slate/80 p-4 sm:p-5 text-center">
            <p className="text-body-sm font-semibold text-text-primary mb-3">{t('legendTitle')}</p>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 sm:gap-x-8 text-body-sm text-text-secondary" role="list">
              {[...CIRCLE_CONFIGS].reverse().map(({ fillColor, km, priceKey, priceValue }) => (
                <li key={km} className="flex items-center gap-2">
                  <span
                    className="h-4 w-4 rounded-full shrink-0 border border-white/20"
                    style={{ backgroundColor: fillColor, opacity: 0.9 }}
                    aria-hidden
                  />
                  <span>
                    <strong className="text-text-primary">{km} km</strong>
                    <span className="mx-1.5 text-text-muted">—</span>
                    <span className={priceKey === 'free' ? 'text-premium-accent font-medium' : ''}>
                      {priceKey === 'free' ? t('free') : t('perKm', { price: priceValue })}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionEntrance>
    </>
  )
}
