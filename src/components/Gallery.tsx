'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionEntrance } from '@/components/MotionSection'
import { staggerContainer, staggerItem, cardHover } from '@/lib/motion'

export interface GalleryItem {
  id: number
  before: string
  after: string
  label?: string
}

/* Placeholder pairs using picsum.photos (replace with your own /gallery/*.jpg paths) */
const defaultItems: GalleryItem[] = [
  { id: 1, before: 'https://picsum.photos/seed/ba1a/800/600', after: 'https://picsum.photos/seed/ba1b/800/600', label: 'Paint correction' },
  { id: 2, before: 'https://picsum.photos/seed/ba2a/800/600', after: 'https://picsum.photos/seed/ba2b/800/600', label: 'Headlight restore' },
  { id: 3, before: 'https://picsum.photos/seed/ba3a/800/600', after: 'https://picsum.photos/seed/ba3b/800/600', label: 'Interior detail' },
  { id: 4, before: 'https://picsum.photos/seed/ba4a/800/600', after: 'https://picsum.photos/seed/ba4b/800/600', label: 'Trim & plastics' },
  { id: 5, before: 'https://picsum.photos/seed/ba5a/800/600', after: 'https://picsum.photos/seed/ba5b/800/600', label: 'Ceramic coating' },
  { id: 6, before: 'https://picsum.photos/seed/ba6a/800/600', after: 'https://picsum.photos/seed/ba6b/800/600', label: 'Wheels & arches' },
]

function ComparisonCard({
  item,
  onClick,
}: {
  item: GalleryItem
  onClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={cardHover}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-card border border-border-default bg-premium-slate transition-colors duration-300 hover:border-premium-accent/50 hover:shadow-xl hover:shadow-black/20 focus:outline-none focus:ring-2 focus:ring-premium-accent focus:ring-offset-2 focus:ring-offset-premium-black"
      aria-label={`View before and after: ${item.label ?? 'Gallery image'}`}
    >
      {/* Before image (base layer) */}
      <div className="absolute inset-0">
        <Image
          src={item.before}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* After image (revealed on hover via clip-path) */}
      <div
        className="absolute inset-0 transition-[clip-path] duration-500 ease-out"
        style={{
          clipPath: isHovered ? 'inset(0 0 0 0)' : 'inset(0 0 0 100%)',
        }}
      >
        <Image
          src={item.after}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Labels overlay — on hover, accent moves from After to Before */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between p-3 bg-gradient-to-t from-black/80 to-transparent text-white/90">
        <span className={`text-overline uppercase ${isHovered ? 'text-premium-accent' : ''}`}>Before</span>
        <span className={`text-overline uppercase ${isHovered ? '' : 'text-premium-accent'}`}>After</span>
      </div>

    </motion.button>
  )
}

function Lightbox({
  item,
  onClose,
}: {
  item: GalleryItem
  onClose: () => void
}) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const afterClipRef = useRef<HTMLDivElement>(null)
  const sliderHandleRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef(50)
  const rafIdRef = useRef<number | null>(null)

  // Apply position to DOM only (no React re-render) for 60fps drag
  const applyPositionToDOM = useCallback((pct: number) => {
    const clip = afterClipRef.current
    const handle = sliderHandleRef.current
    if (clip) clip.style.clipPath = `inset(0 ${100 - pct}% 0 0)`
    if (handle) handle.style.left = `${pct}%`
  }, [])

  const handleMove = useCallback(
    (clientX: number, rect: DOMRect) => {
      const x = clientX - rect.left
      const pct = Math.max(0, Math.min(100, (x / rect.width) * 100))
      positionRef.current = pct
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          applyPositionToDOM(positionRef.current)
          rafIdRef.current = null
        })
      }
    },
    [applyPositionToDOM]
  )

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true)
      ; (e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  }, [])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      handleMove(e.clientX, rect)
    },
    [isDragging, handleMove]
  )

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    ; (e.target as HTMLElement).releasePointerCapture?.(e.pointerId)
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
    setSliderPosition(positionRef.current)
    setIsDragging(false)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Reset slider when opening a new image; keep positionRef in sync with state
  useEffect(() => {
    setSliderPosition(50)
    positionRef.current = 50
  }, [item.id])

  useEffect(() => {
    if (!isDragging) positionRef.current = sliderPosition
  }, [isDragging, sliderPosition])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm opacity-0 animate-fade-in"
      style={{ animationFillMode: 'forwards' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Before and after comparison"
    >
      <div
        ref={containerRef}
        className="relative w-full max-w-4xl aspect-[4/3] rounded-card overflow-hidden border border-border-default bg-premium-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Before (full) */}
        <div className="absolute inset-0">
          <Image
            src={item.before}
            alt="Before"
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>

        {/* After (clipped by slider) */}
        <div
          ref={afterClipRef}
          className="absolute inset-0 transition-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={item.after}
            alt="After"
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>

        {/* Slider line + handle (wider hit area for easier dragging) */}
        <div
          ref={sliderHandleRef}
          className="absolute inset-y-0 w-8 -translate-x-1/2 cursor-ew-resize select-none touch-none"
          style={{ left: `${sliderPosition}%` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-white shadow-lg" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-premium-accent text-white shadow-lg">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>

        {/* Labels in lightbox */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between p-4 bg-gradient-to-t from-black/90 to-transparent text-sm text-white/90">
          <span>Before</span>
          <span className="text-premium-accent">After — drag to compare</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-premium-accent"
        aria-label="Close"
      >
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

interface GalleryProps {
  items?: GalleryItem[]
}

export default function Gallery({ items = defaultItems }: GalleryProps) {
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null)

  return (
    <SectionEntrance
      id="gallery"
      className="section-padding bg-premium-charcoal scroll-mt-20"
      aria-labelledby="gallery-heading"
    >
      <div className="container-narrow">
        <header className="text-center mb-12 sm:mb-16">
          <p className="text-premium-accent text-overline uppercase mb-2">
            Our work
          </p>
          <h2 id="gallery-heading" className="text-h2 text-text-primary">
            Before & after
          </h2>
          <p className="mt-4 text-body text-text-secondary max-w-2xl mx-auto">
            Real results from paint correction, ceramic coating, and full-detail
            packages.
          </p>
        </header>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={staggerContainer}
          initial="visible"
          animate="visible"
        >
          {items.map((item) => (
            <motion.div key={item.id} variants={staggerItem}>
              <ComparisonCard
                item={item}
                onClick={() => setLightboxItem(item)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {lightboxItem && (
        <Lightbox
          item={lightboxItem}
          onClose={() => setLightboxItem(null)}
        />
      )}
    </SectionEntrance>
  )
}
