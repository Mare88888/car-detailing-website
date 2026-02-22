'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SectionEntrance } from '@/components/MotionSection'
import { testimonials } from '@/data/testimonials'
import type { Testimonial } from '@/data/testimonials'

const SLIDES_VISIBLE = 3
const GAP_PX = 24 // gap-6
// Same value on server and client to avoid hydration mismatch; updated in useEffect after mount
const INITIAL_STEP_PX = 320

function CarouselCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <blockquote className="flex flex-col h-full p-5 sm:p-6 rounded-card bg-premium-charcoal border border-border-default min-h-[200px] shrink-0">
      <p className="flex-1 text-text-secondary italic text-body-sm sm:text-body">&ldquo;{testimonial.quote}&rdquo;</p>
      <footer className="mt-4 shrink-0">
        <cite className="not-italic font-semibold text-text-primary text-body-sm">{testimonial.author}</cite>
        <span className="text-text-muted text-body-sm block mt-0.5">{testimonial.role}</span>
      </footer>
    </blockquote>
  )
}

export default function Testimonials() {
  const total = testimonials.length
  const maxIndex = Math.max(0, total - SLIDES_VISIBLE) // so we always have 3 cards to show (indices 0..maxIndex)
  const [index, setIndex] = useState(0)
  const [stepPx, setStepPx] = useState(INITIAL_STEP_PX)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const update = () => {
      const w = el.getBoundingClientRect().width
      const buffer = 4
      const contentWidth = Math.max(200, w - buffer)
      setStepPx((contentWidth + GAP_PX) / SLIDES_VISIBLE)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const goTo = useCallback(
    (nextIndex: number) => {
      setIndex(Math.max(0, Math.min(maxIndex, nextIndex)))
    },
    [maxIndex]
  )

  const goPrev = useCallback(() => goTo(index - 1), [index, goTo])
  const goNext = useCallback(() => goTo(index + 1), [index, goTo])

  return (
    <SectionEntrance
      id="testimonials"
      className="section-padding bg-premium-black scroll-mt-20"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-narrow">
        <header className="text-center mb-10 sm:mb-14">
          <p className="text-premium-accent text-overline uppercase mb-2">Reviews</p>
          <h2 id="testimonials-heading" className="text-h2 text-text-primary">
            Testimonials
          </h2>
          <p className="mt-4 text-body text-text-secondary max-w-2xl mx-auto">
            What our customers say about our detailing and valeting.
          </p>
        </header>

        <div className="relative">
          {/* Prev button */}
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:translate-x-0 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border-default bg-premium-charcoal text-text-primary hover:text-premium-accent hover:border-premium-accent transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-premium-accent focus:ring-offset-2 focus:ring-offset-premium-black"
            aria-label="Previous testimonials"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-0 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border-default bg-premium-charcoal text-text-primary hover:text-premium-accent hover:border-premium-accent transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-premium-accent focus:ring-offset-2 focus:ring-offset-premium-black"
            aria-label="Next testimonials"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Single horizontal strip — one slide per click; inner overflow so clipping matches measured width */}
          <div className="overflow-hidden pl-14 pr-14 sm:pl-20 sm:pr-20 relative min-h-[240px] sm:min-h-[220px]">
            <div ref={trackRef} className="w-full overflow-hidden">
              <motion.div
                className="flex gap-6 min-h-[240px] sm:min-h-[220px]"
                style={{ width: 'max-content' }}
                animate={{ x: -index * stepPx }}
                transition={{
                  duration: 1,
                  ease: [0.32, 0.72, 0, 1],
                }}
              >
                {testimonials.map((t, i) => (
                  <div
                    key={`${t.author}-${i}`}
                    className="shrink-0"
                    style={{
                      width: stepPx - GAP_PX,
                      minWidth: stepPx - GAP_PX,
                    }}
                  >
                    <CarouselCard testimonial={t} />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Dots: one per slide position (always 3 reviews visible) */}
          <div className="flex justify-center gap-2 mt-6 flex-wrap" role="tablist" aria-label="Testimonial navigation">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to testimonials ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-premium-accent focus:ring-offset-2 focus:ring-offset-premium-black ${
                  i === index ? 'bg-premium-accent scale-110' : 'bg-premium-graphite hover:bg-premium-zinc'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionEntrance>
  )
}
