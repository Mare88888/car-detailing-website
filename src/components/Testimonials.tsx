'use client'

import { motion } from 'framer-motion'
import { SectionEntrance } from '@/components/MotionSection'
import { staggerContainer, staggerItem, cardHover } from '@/lib/motion'
import { testimonials } from '@/data/testimonials'

export default function Testimonials() {
  return (
    <SectionEntrance
      id="testimonials"
      className="section-padding bg-premium-black scroll-mt-20"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-narrow">
        <header className="text-center mb-14">
          <p className="text-premium-accent text-overline uppercase mb-2">Reviews</p>
          <h2 id="testimonials-heading" className="text-h2 text-text-primary">Testimonials</h2>
          <p className="mt-4 text-body text-text-secondary max-w-2xl mx-auto">
            What our customers say about our detailing and valeting.
          </p>
        </header>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="visible"
          animate="visible"
        >
          {testimonials.map((t) => (
            <motion.blockquote
              key={t.author}
              variants={staggerItem}
              whileHover={cardHover}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col h-full p-6 rounded-card bg-premium-charcoal border border-border-default"
            >
              <p className="flex-1 text-text-secondary italic">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4 shrink-0">
                <cite className="not-italic font-semibold text-text-primary">{t.author}</cite>
                <span className="text-text-muted text-body-sm block">{t.role}</span>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </SectionEntrance>
  )
}
