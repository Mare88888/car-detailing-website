'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionEntrance } from '@/components/MotionSection'
import { buttonTap } from '@/lib/motion'

const serviceOptions = [
  'Quick valet',
  'Full valet',
  'Day detail',
  'Like new',
  'Other / Enquiry',
]

interface FormErrors {
  name?: string
  carType?: string
  service?: string
  date?: string
  message?: string
}

const inputBase =
  'w-full px-4 py-3 bg-premium-slate border rounded-sharp text-text-primary placeholder-text-muted text-body-sm focus:outline-none focus:ring-2 focus:ring-premium-accent focus:border-transparent transition-colors duration-200'

const inputError = 'border-error focus:ring-error'
const inputDefault = 'border-border-default'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [values, setValues] = useState({
    name: '',
    carType: '',
    service: '',
    date: '',
    message: '',
  })

  function validateField(name: keyof FormErrors, value: string): string | undefined {
    const trimmed = value.trim()
    switch (name) {
      case 'name':
        return trimmed.length < 2 ? 'Please enter your name' : undefined
      case 'carType':
        return !trimmed ? 'Please enter your car type or model' : undefined
      case 'service':
        return !trimmed ? 'Please select a service' : undefined
      case 'date':
        return !trimmed ? 'Please choose a preferred date' : undefined
      case 'message':
        return trimmed.length < 10 ? 'Please add a few more details (min 10 characters)' : undefined
      default:
        return undefined
    }
  }

  function validateAll(): FormErrors {
    const next: FormErrors = {}
      ; (Object.keys(values) as (keyof FormErrors)[]).forEach((key) => {
        if (key === 'name' || key === 'carType' || key === 'service' || key === 'date' || key === 'message') {
          const err = validateField(key, values[key])
          if (err) next[key] = err
        }
      })
    setErrors(next)
    return next
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name as keyof FormErrors, value) }))
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name as keyof FormErrors, value) }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTouched({ name: true, carType: true, service: true, date: true, message: true })
    const nextErrors = validateAll()
    if (Object.keys(nextErrors).length > 0) return
    setSubmitted(true)
  }

  function getInputClass(name: keyof FormErrors) {
    return `${inputBase} ${errors[name] ? inputError : inputDefault}`
  }

  return (
    <SectionEntrance
      id="contact"
      className="section-padding bg-premium-charcoal scroll-mt-20"
      aria-labelledby="contact-heading"
    >
      <div className="container-narrow">
        <header className="text-center mb-12 sm:mb-16">
          <p className="text-premium-accent text-overline uppercase mb-2">
            Get in touch
          </p>
          <h2 id="contact-heading" className="text-h2 text-text-primary">
            Book or enquire
          </h2>
          <p className="mt-4 text-body text-text-secondary max-w-2xl mx-auto">
            Tell us your car, service, and preferred date. We’ll get back with a quote.
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr,auto] gap-10 lg:gap-16 lg:items-start">
          {/* Form column */}
          <div>
            {submitted ? (
              <div className="rounded-card bg-premium-slate border border-premium-accent/40 p-8 sm:p-10 text-center">
                <p className="text-premium-accent font-semibold text-body-lg">
                  Thanks for your message
                </p>
                <p className="text-text-secondary mt-2 text-body-sm">
                  We’ll be in touch soon to confirm your booking.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="contact-name" className="block text-body-sm font-medium text-text-secondary mb-2">
                    Name <span className="text-error">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClass('name')}
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  />
                  {errors.name && touched.name && (
                    <p id="contact-name-error" className="mt-1.5 text-body-sm text-error" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-carType" className="block text-body-sm font-medium text-text-secondary mb-2">
                    Car type / model <span className="text-error">*</span>
                  </label>
                  <input
                    id="contact-carType"
                    name="carType"
                    type="text"
                    value={values.carType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClass('carType')}
                    placeholder="e.g. BMW 3 Series, Audi A4"
                    aria-invalid={!!errors.carType}
                    aria-describedby={errors.carType ? 'contact-carType-error' : undefined}
                  />
                  {errors.carType && touched.carType && (
                    <p id="contact-carType-error" className="mt-1.5 text-body-sm text-error" role="alert">
                      {errors.carType}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-service" className="block text-body-sm font-medium text-text-secondary mb-2">
                    Service <span className="text-error">*</span>
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={values.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${getInputClass('service')} appearance-none cursor-pointer bg-premium-slate`}
                    aria-invalid={!!errors.service}
                    aria-describedby={errors.service ? 'contact-service-error' : undefined}
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.service && touched.service && (
                    <p id="contact-service-error" className="mt-1.5 text-body-sm text-error" role="alert">
                      {errors.service}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-date" className="block text-body-sm font-medium text-text-secondary mb-2">
                    Preferred date <span className="text-error">*</span>
                  </label>
                  <input
                    id="contact-date"
                    name="date"
                    type="date"
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClass('date')}
                    aria-invalid={!!errors.date}
                    aria-describedby={errors.date ? 'contact-date-error' : undefined}
                  />
                  {errors.date && touched.date && (
                    <p id="contact-date-error" className="mt-1.5 text-body-sm text-error" role="alert">
                      {errors.date}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-body-sm font-medium text-text-secondary mb-2">
                    Message <span className="text-error">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${getInputClass('message')} resize-none`}
                    placeholder="Any extra details, location, or questions..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  />
                  {errors.message && touched.message && (
                    <p id="contact-message-error" className="mt-1.5 text-body-sm text-error" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  whileTap={buttonTap}
                  className="btn-primary w-full py-4 text-body-sm font-semibold"
                >
                  Request booking
                </motion.button>
              </form>
            )}
          </div>

          {/* Contact details column */}
          <div className="lg:w-72 lg:sticky lg:top-24">
            <div className="rounded-card bg-premium-slate border border-border-default p-6 sm:p-8">
              <h3 className="text-h4 text-text-primary font-semibold mb-4">
                Contact details
              </h3>
              <ul className="space-y-4 text-body-sm">
                <li>
                  <span className="block text-text-muted uppercase tracking-wider text-caption mb-1">
                    Phone
                  </span>
                  <a
                    href="tel:+440000000000"
                    className="text-text-primary hover:text-premium-accent transition-colors font-medium"
                  >
                    00000 000000
                  </a>
                </li>
                <li>
                  <span className="block text-text-muted uppercase tracking-wider text-caption mb-1">
                    Email
                  </span>
                  <a
                    href="mailto:hello@example.com"
                    className="text-text-primary hover:text-premium-accent transition-colors font-medium break-all"
                  >
                    hello@example.com
                  </a>
                </li>
              </ul>
              <p className="mt-6 pt-6 border-t border-border-default text-body-sm text-text-secondary">
                Prefer to call? We’re happy to discuss your car and recommend a package.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionEntrance>
  )
}
