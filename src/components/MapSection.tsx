'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { SectionEntrance } from '@/components/MotionSection'

const MAP_CENTER = { lat: 46.552, lng: 15.634 } // Celestrina 19, Malečnik, Slovenia
// Smallest = green, middle = blue, largest = purple (drawn largest first so smallest is on top)
const CIRCLE_CONFIGS = [
  { radius: 200000, fillColor: '#FC3912' }, // purple – largest (200 km)
  { radius: 100000, fillColor: '#1A67FF' }, // blue – middle (100 km)
  { radius: 50000, fillColor: '#0BFF00' }, // green – smallest (50 km)
]
const FILL_OPACITY = 0.2

export default function MapSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<object | null>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    if (!scriptLoaded || !containerRef.current || typeof google === 'undefined') return

    const map = new google.maps.Map(containerRef.current, {
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

    // Marker at center (Celestrina 19, Malečnik)
    new google.maps.Marker({
      position: MAP_CENTER,
      map,
      title: 'Celestrina 19, Malečnik',
    })

    // Multiple circles: largest first (purple, blue), smallest on top (green)
    CIRCLE_CONFIGS.forEach(({ radius, fillColor }) => {
      new google.maps.Circle({
        map,
        center: MAP_CENTER,
        radius,
        fillColor,
        fillOpacity: FILL_OPACITY,
        strokeColor: fillColor,
        strokeOpacity: 0.4,
        strokeWeight: 1,
      })
    })

    return () => {
      mapRef.current = null
    }
  }, [scriptLoaded])

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    return (
      <SectionEntrance id="map" className="section-padding bg-premium-charcoal" aria-labelledby="map-heading">
        <div className="container-narrow text-center py-16">
          <h2 id="map-heading" className="text-h2 text-text-primary mb-2">Service area</h2>
          <p className="text-text-muted text-body-sm">
            Add <code className="text-text-secondary">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your environment to show the map.
          </p>
          <p className="text-text-muted text-body-sm mt-2">
            Celestrina 19, Malečnik
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
            <p className="text-premium-accent text-overline uppercase mb-2">Service area</p>
            <h2 id="map-heading" className="text-h2 text-text-primary">
              Where we operate
            </h2>
            <p className="mt-3 text-body text-text-secondary max-w-xl mx-auto">
              We come to you. Our service area is centered at Celestrina 19, Malečnik.
            </p>
          </header>
          <div
            ref={containerRef}
            className="w-full h-[400px] sm:h-[480px] rounded-card overflow-hidden border border-border-default bg-premium-slate"
            aria-hidden
          />
        </div>
      </SectionEntrance>
    </>
  )
}
