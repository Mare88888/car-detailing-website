'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { SectionEntrance } from '@/components/MotionSection'
import { staggerContainer, staggerItem, cardHover, ease } from '@/lib/motion'

export interface GalleryItem {
  id: number
  before: string
  after: string
  label?: string
}

const SLIDER_DEFAULT_PCT = 50
const CARD_IMAGE_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
const LIGHTBOX_IMAGE_SIZES = '(max-width: 896px) 100vw, 896px'
const CARD_TRANSITION = { duration: 0.2, ease }

/* Placeholder pairs using picsum.photos (replace with your own /gallery/*.jpg paths) */
const defaultItems: GalleryItem[] = [
  { id: 1, before: '/before1.png', after: '/after1.png'},
  { id: 2, before: '/before2.png', after: '/after2.png'},
  { id: 3, before: '/before3.png', after: '/after3.png'},
  { id: 4, before: '/before4.png', after: '/after4.png'},
  { id: 5, before: '/before5.png', after: '/after5.png'},
  { id: 6, before: '/before6.png', after: '/after6.png'},
  { id: 7, before: '/before7.png', after: '/after7.png'},
]

interface ComparisonCardProps {
  item: GalleryItem
  onClick: () => void
  ariaLabel: string
  beforeLabel: string
  afterLabel: string
}

function ComparisonCard({ item, onClick, ariaLabel, beforeLabel, afterLabel }: ComparisonCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={cardHover}
      transition={CARD_TRANSITION}
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-card border border-border-default bg-premium-slate transition-colors duration-300 hover:border-premium-accent/50 hover:shadow-xl hover:shadow-black/20 focus:outline-none focus:ring-2 focus:ring-premium-accent focus:ring-offset-2 focus:ring-offset-premium-black"
      aria-label={ariaLabel}
    >
      {/* After image (base layer) */}
      <div className="absolute inset-0">
        <Image
          src={item.after}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={CARD_IMAGE_SIZES}
        />
      </div>

      <div
        className="absolute inset-0 transition-[clip-path] duration-500 ease-out"
        style={{
          clipPath: isHovered ? 'inset(0 0 0 0)' : 'inset(0 0 0 100%)',
        }}
      >
        <Image
          src={item.before}
          alt=""
          fill
          className="object-cover"
          sizes={CARD_IMAGE_SIZES}
        />
      </div>

      {/* Labels overlay — on hover, accent moves from Before to After */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between p-3 bg-gradient-to-t from-black/80 to-transparent text-white/90">
        <span className={`text-overline uppercase ${isHovered ? '' : 'text-premium-accent'}`}>{afterLabel}</span>
        <span className={`text-overline uppercase ${isHovered ? 'text-premium-accent' : ''}`}>{beforeLabel}</span>
      </div>

    </motion.button>
  )
}

interface LightboxProps {
  item: GalleryItem
  onClose: () => void
  beforeLabel: string
  afterLabel: string
  afterDragLabel: string
  closeLabel: string
  lightboxLabel: string
}

function Lightbox({ item, onClose, beforeLabel, afterLabel, afterDragLabel, closeLabel, lightboxLabel }: LightboxProps) {
  const [sliderPosition, setSliderPosition] = useState(SLIDER_DEFAULT_PCT)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const afterClipRef = useRef<HTMLDivElement>(null)
  const sliderHandleRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef(SLIDER_DEFAULT_PCT)
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

  useEffect(() => {
    setSliderPosition(SLIDER_DEFAULT_PCT)
    positionRef.current = SLIDER_DEFAULT_PCT
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
      aria-label={lightboxLabel}
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
            alt={beforeLabel}
            fill
            className="object-cover"
            sizes={LIGHTBOX_IMAGE_SIZES}
          />
        </div>

        <div
          ref={afterClipRef}
          className="absolute inset-0 transition-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={item.after}
            alt={afterLabel}
            fill
            className="object-cover"
            sizes={LIGHTBOX_IMAGE_SIZES}
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
          <span>{beforeLabel}</span>
          <span className="text-premium-accent">{afterDragLabel}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-premium-accent"
        aria-label={closeLabel}
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

const MOBILE_BREAKPOINT = 640
const MOBILE_INITIAL_COUNT = 2

export default function Gallery({ items = defaultItems }: GalleryProps) {
  const t = useTranslations('gallery')
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const itemsToShow =
    isMobile && !mobileExpanded ? items.slice(0, MOBILE_INITIAL_COUNT) : items
  const hasMoreOnMobile = isMobile && items.length > MOBILE_INITIAL_COUNT && !mobileExpanded

  return (
    <SectionEntrance
      id="gallery"
      className="section-padding bg-premium-charcoal scroll-mt-20"
      aria-labelledby="gallery-heading"
    >
      <div className="container-narrow">
        <header className="text-center mb-12 sm:mb-16">
          <p className="text-premium-accent text-overline uppercase mb-2">
            {t('overline')}
          </p>
          <h2 id="gallery-heading" className="text-h2 text-text-primary">
            {t('heading')}
          </h2>
          <p className="mt-4 text-body text-text-secondary max-w-2xl mx-auto">
            {t('subheading')}
          </p>
        </header>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={staggerContainer}
          initial="visible"
          animate="visible"
        >
          {itemsToShow.map((item) => (
            <motion.div key={item.id} variants={staggerItem}>
              <ComparisonCard
                item={item}
                onClick={() => setLightboxItem(item)}
                ariaLabel={t('viewBeforeAfter', { label: item.label ?? 'Gallery image' })}
                beforeLabel={t('before')}
                afterLabel={t('after')}
              />
            </motion.div>
          ))}
        </motion.div>

        {hasMoreOnMobile && (
          <div className="mt-6 flex justify-center sm:hidden">
            <motion.button
              type="button"
              onClick={() => setMobileExpanded(true)}
              whileTap={{ scale: 0.98 }}
              className="btn-primary px-8 py-3.5 text-body-sm font-semibold"
            >
              {t('seeMore')}
            </motion.button>
          </div>
        )}
      </div>

      {lightboxItem && (
        <Lightbox
          item={lightboxItem}
          onClose={() => setLightboxItem(null)}
          beforeLabel={t('before')}
          afterLabel={t('after')}
          afterDragLabel={t('afterDrag')}
          closeLabel={t('close')}
          lightboxLabel={t('lightboxLabel')}
        />
      )}
    </SectionEntrance>
  )
}
