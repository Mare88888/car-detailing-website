'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { SectionEntrance } from '@/components/MotionSection'
import { buttonTap } from '@/lib/motion'
import { EmailIcon, PhoneIcon } from './Footer'
import { carCleaningPackages, carDetailingPackages } from './Pricing'

const PACKAGE_CUSTOM_ID = 'custom'

const INITIAL_FORM_VALUES: Record<string, string> = {
  name: '',
  email: '',
  phone: '',
  serviceCategory: '',
  service: '',
  locationType: '',
  distance: '',
  date: '',
  message: '',
}

const FORM_FIELD_KEYS = Object.keys(INITIAL_FORM_VALUES) as (keyof FormErrors)[]

function getPackagesForType(serviceType: string) {
  if (serviceType === 'cleaning') return carCleaningPackages
  if (serviceType === 'detailing') return carDetailingPackages
  return []
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  serviceCategory?: string
  service?: string
  locationType?: string
  distance?: string
  date?: string
  message?: string
}

// Input base — no ring, clean border-color transition
const inputBase =
  'w-full px-4 py-3 bg-premium-black/40 border rounded-sharp text-text-primary placeholder-text-muted/50 text-body-sm focus:outline-none focus:border-premium-accent focus:bg-premium-black/60 transition-all duration-200'
const inputError = 'border-error'
const inputDefault = 'border-border-default hover:border-premium-graphite'

function ChevronDown({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={`w-4 h-4 ${className}`}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function FieldLabel({ htmlFor, children, required }: { htmlFor?: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[0.6875rem] font-semibold uppercase tracking-widest text-text-muted mb-2"
    >
      {children}
      {required && <span className="text-error ml-1">*</span>}
    </label>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1.5 text-[0.75rem] text-error" role="alert">
      {message}
    </p>
  )
}

function GroupSeparator() {
  return <div className="border-t border-border-default/60 mt-6 pt-6" />
}

export default function Contact() {
  const t = useTranslations('contact')
  const tPricing = useTranslations('pricing')
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [values, setValues] = useState<Record<string, string>>({ ...INITIAL_FORM_VALUES })

  const serviceTypes = useMemo(
    () => [
      { value: 'cleaning', label: t('serviceCleaning') },
      { value: 'detailing', label: t('serviceDetailing') },
      { value: 'custom', label: t('serviceCustom') },
    ] as const,
    [t]
  )
  const locationOptions = useMemo(
    () => [
      { value: 'our-location', label: t('locationOur') },
      { value: 'mobile', label: t('locationMobile') },
    ] as const,
    [t]
  )
  const distanceOptions = useMemo(
    () => [
      { value: '50', label: t('distance50') },
      { value: '100', label: t('distance100') },
      { value: '200', label: t('distance200') },
    ] as const,
    [t]
  )
  const customPackageLabel = t('customPackage')

  function validateField(name: keyof FormErrors, value: string): string | undefined {
    const trimmed = value.trim()
    switch (name) {
      case 'name':
        return trimmed.length < 2 ? t('errors.name') : undefined
      case 'email': {
        if (!trimmed) return t('errors.email')
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return !emailRegex.test(trimmed) ? t('errors.emailInvalid') : undefined
      }
      case 'phone':
        return undefined
      case 'serviceCategory':
        return !trimmed ? t('errors.serviceCategory') : undefined
      case 'service':
        return !trimmed ? t('errors.service') : undefined
      case 'locationType':
        return undefined
      case 'distance':
        return values.locationType === 'mobile' && !trimmed ? t('errors.distance') : undefined
      case 'date':
        return undefined
      case 'message':
        return trimmed && trimmed.length < 10 ? t('errors.message') : undefined
      default:
        return undefined
    }
  }

  function validateAll(): FormErrors {
    const next: FormErrors = {}
    FORM_FIELD_KEYS.forEach((key) => {
      const err = validateField(key, values[key])
      if (err) next[key] = err
    })
    setErrors(next)
    return next
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setValues((prev) => {
      const next = { ...prev, [name]: value }
      if (name === 'serviceCategory') {
        next.service = value === 'custom' ? PACKAGE_CUSTOM_ID : ''
      }
      if (name === 'locationType') {
        next.distance = value === 'mobile' ? prev.distance : ''
      }
      return next
    })
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name as keyof FormErrors, value) }))
    }
    if (name === 'serviceCategory' && errors.service) {
      setErrors((prev) => ({ ...prev, service: undefined }))
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name as keyof FormErrors, value) }))
  }

  function getServiceLabel(serviceCategory: string, packageId: string): string {
    if (serviceCategory === 'custom' || packageId === PACKAGE_CUSTOM_ID) {
      if (serviceCategory === 'custom') return t('serviceCustom')
      const categoryLabel = serviceCategory === 'cleaning' ? t('serviceCleaning') : t('serviceDetailing')
      return `${categoryLabel} – ${customPackageLabel}`
    }
    const packages = getPackagesForType(serviceCategory)
    const pkg = packages.find((p) => p.id === packageId)
    const categoryLabel = serviceCategory === 'cleaning' ? t('serviceCleaning') : t('serviceDetailing')
    const pkgName = pkg ? tPricing(`packages.${pkg.id}.name`) : packageId
    return pkg ? `${categoryLabel} – ${pkgName}` : packageId
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitError(null)
    setTouched({ name: true, email: true, phone: true, serviceCategory: true, service: true, locationType: true, distance: true, date: true, message: true })
    const nextErrors = validateAll()
    if (Object.keys(nextErrors).length > 0) return
    setSending(true)
    try {
      const payload = {
        ...values,
        service: getServiceLabel(values.serviceCategory, values.service),
      }
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setSubmitError(data.error ?? t('errors.submitError'))
        return
      }
      setSubmitted(true)
    } catch {
      setSubmitError(t('errors.networkError'))
    } finally {
      setSending(false)
    }
  }

  function getInputClass(name: keyof FormErrors) {
    return `${inputBase} ${errors[name] ? inputError : inputDefault}`
  }

  function getSelectClass(name: keyof FormErrors, extra = '') {
    return `${getInputClass(name)} appearance-none cursor-pointer pr-10 ${extra}`
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
            {t('overline')}
          </p>
          <h2 id="contact-heading" className="text-h2 text-text-primary">
            {t('heading')}
          </h2>
          <p className="mt-4 text-body text-text-secondary max-w-2xl mx-auto">
            {t('subheading')}
          </p>
        </header>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {(['trust1', 'trust2', 'trust3', 'trust4'] as const).map((key) => (
            <div
              key={key}
              className="inline-flex items-center gap-2 rounded-sharp border border-border-default bg-premium-slate/60 px-3.5 py-2 text-body-sm text-text-secondary"
            >
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-premium-accent/20 text-premium-accent" aria-hidden>
                <svg viewBox="0 0 12 12" fill="currentColor" className="h-2.5 w-2.5">
                  <path fillRule="evenodd" d="M10.157 3.843a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47 3.97-3.97a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                </svg>
              </span>
              <span>{t(key)}</span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr,auto] gap-10 lg:gap-16 lg:items-start">

          {/* ── Form column ── */}
          <div className="rounded-card border border-border-default bg-premium-slate/20 p-6 sm:p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="py-8 text-center"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-premium-accent/15 border border-premium-accent/30 mb-5">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-premium-accent" aria-hidden>
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-premium-accent font-semibold text-body">
                  {t('thanksTitle')}
                </p>
                <p className="text-text-secondary mt-2 text-body-sm">
                  {t('thanksBody')}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>

                {submitError && (
                  <p className="mb-6 text-body-sm text-error bg-error/8 border border-error/25 rounded-sharp px-4 py-3" role="alert">
                    {submitError}
                  </p>
                )}

                {/* ── Group 1: Personal details ── */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <FieldLabel htmlFor="contact-name" required>{t('name')}</FieldLabel>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass('name')}
                      placeholder={t('placeholderName')}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    />
                    <FieldError id="contact-name-error" message={touched.name ? errors.name : undefined} />
                  </div>

                  <div>
                    <FieldLabel htmlFor="contact-email" required>{t('email')}</FieldLabel>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass('email')}
                      placeholder={t('placeholderEmail')}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    />
                    <FieldError id="contact-email-error" message={touched.email ? errors.email : undefined} />
                  </div>
                </div>

                <div className="mt-4">
                  <FieldLabel htmlFor="contact-phone">{t('phone')}</FieldLabel>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClass('phone')}
                    placeholder={t('placeholderPhone')}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                  />
                  <FieldError id="contact-phone-error" message={touched.phone ? errors.phone : undefined} />
                </div>

                {/* ── Group 2: Service ── */}
                <GroupSeparator />
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <FieldLabel htmlFor="contact-serviceCategory" required>{t('serviceType')}</FieldLabel>
                    <div className="relative">
                      <select
                        id="contact-serviceCategory"
                        name="serviceCategory"
                        value={values.serviceCategory}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getSelectClass('serviceCategory')}
                        aria-invalid={!!errors.serviceCategory}
                        aria-describedby={errors.serviceCategory ? 'contact-serviceCategory-error' : undefined}
                      >
                        <option value="" disabled hidden>{t('selectServiceType')}</option>
                        {serviceTypes.map(({ value, label }) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted" />
                    </div>
                    <FieldError id="contact-serviceCategory-error" message={touched.serviceCategory ? errors.serviceCategory : undefined} />
                  </div>

                  <div>
                    <FieldLabel htmlFor="contact-service" required>{t('package')}</FieldLabel>
                    <div className="relative">
                      <select
                        id="contact-service"
                        name="service"
                        value={values.service}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={!values.serviceCategory}
                        className={getSelectClass('service', 'disabled:opacity-50 disabled:cursor-not-allowed')}
                        aria-invalid={!!errors.service}
                        aria-describedby={errors.service ? 'contact-service-error' : undefined}
                      >
                        <option value="" disabled hidden>
                          {values.serviceCategory ? t('selectPackage') : t('selectServiceFirst')}
                        </option>
                        {values.serviceCategory === 'custom' ? (
                          <option value={PACKAGE_CUSTOM_ID}>{customPackageLabel}</option>
                        ) : (
                          <>
                            {getPackagesForType(values.serviceCategory).map((pkg) => (
                              <option key={pkg.id} value={pkg.id}>
                                {tPricing(`packages.${pkg.id}.name`)} ({tPricing(`packages.${pkg.id}.price`)})
                              </option>
                            ))}
                            <option value={PACKAGE_CUSTOM_ID}>{customPackageLabel}</option>
                          </>
                        )}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted" />
                    </div>
                    <FieldError id="contact-service-error" message={touched.service ? errors.service : undefined} />
                  </div>
                </div>

                {/* ── Group 3: Logistics ── */}
                <GroupSeparator />
                <div>
                  <FieldLabel>{t('whereService')}</FieldLabel>
                  <div className="flex flex-wrap gap-4 items-start">
                    <div className="flex-1 min-w-[180px]">
                      <div className="relative">
                        <select
                          id="contact-locationType"
                          name="locationType"
                          value={values.locationType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={getSelectClass('locationType')}
                          aria-invalid={!!errors.locationType}
                          aria-describedby={errors.locationType ? 'contact-locationType-error' : undefined}
                        >
                          <option value="" disabled hidden>{t('chooseLocation')}</option>
                          {locationOptions.map(({ value, label }) => (
                            <option key={value} value={value}>{label}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted" />
                      </div>
                      <FieldError id="contact-locationType-error" message={touched.locationType ? errors.locationType : undefined} />
                    </div>
                    {values.locationType === 'mobile' && (
                      <div className="flex-1 min-w-[130px]">
                        <label htmlFor="contact-distance" className="sr-only">{t('distance')}</label>
                        <div className="relative">
                          <select
                            id="contact-distance"
                            name="distance"
                            value={values.distance}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={getSelectClass('distance')}
                            aria-invalid={!!errors.distance}
                            aria-describedby={errors.distance ? 'contact-distance-error' : undefined}
                          >
                            <option value="" disabled hidden>{t('distance')}</option>
                            {distanceOptions.map(({ value, label }) => (
                              <option key={value} value={value}>{label}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted" />
                        </div>
                        <FieldError id="contact-distance-error" message={touched.distance ? errors.distance : undefined} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <FieldLabel htmlFor="contact-date">{t('preferredDate')}</FieldLabel>
                  <input
                    id="contact-date"
                    name="date"
                    type="date"
                    value={values.date}
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${getInputClass('date')} date-picker-white-icon`}
                    aria-invalid={!!errors.date}
                    aria-describedby={errors.date ? 'contact-date-error' : undefined}
                  />
                  <FieldError id="contact-date-error" message={touched.date ? errors.date : undefined} />
                </div>

                {/* ── Group 4: Message ── */}
                <GroupSeparator />
                <div>
                  <FieldLabel htmlFor="contact-message">{t('message')}</FieldLabel>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${getInputClass('message')} resize-none`}
                    placeholder={t('placeholderMessage')}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  />
                  <FieldError id="contact-message-error" message={touched.message ? errors.message : undefined} />
                </div>

                {/* ── Submit ── */}
                <div className="mt-6">
                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileTap={sending ? undefined : buttonTap}
                    className="btn-primary w-full py-4 text-body-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? t('sending') : t('send')}
                  </motion.button>
                </div>
              </form>
            )}
          </div>

          {/* ── Contact details column ── */}
          <div className="lg:w-72 lg:sticky lg:top-24">
            <div className="relative overflow-hidden rounded-card bg-premium-slate border border-border-default p-6 sm:p-8">
              {/* Cyan top line */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-premium-accent to-transparent"
              />

              <h3 className="text-h4 text-text-primary font-semibold mb-6">
                {t('contactDetails')}
              </h3>

              <ul className="space-y-5 text-body-sm">
                <li>
                  <span className="block text-[0.6875rem] font-semibold uppercase tracking-widest text-text-muted mb-2">
                    {t('phone')}
                  </span>
                  <a
                    href="tel:+38670742363"
                    className="inline-flex items-center gap-2.5 text-text-primary hover:text-premium-accent transition-colors font-medium"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-premium-accent/10 border border-premium-accent/20 text-premium-accent shrink-0">
                      <PhoneIcon />
                    </span>
                    <span>+386 70 742 363</span>
                  </a>
                </li>
                <li>
                  <span className="block text-[0.6875rem] font-semibold uppercase tracking-widest text-text-muted mb-2">
                    {t('email')}
                  </span>
                  <a
                    href="mailto:AShine@gmail.com"
                    className="inline-flex items-center gap-2.5 text-text-primary hover:text-premium-accent transition-colors font-medium break-all"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-premium-accent/10 border border-premium-accent/20 text-premium-accent shrink-0">
                      <EmailIcon />
                    </span>
                    <span>AShine@gmail.com</span>
                  </a>
                </li>
              </ul>

              <p className="mt-6 pt-6 border-t border-border-default text-body-sm text-text-secondary leading-relaxed">
                {t('preferCall')}
              </p>
            </div>
          </div>

        </div>
      </div>
    </SectionEntrance>
  )
}
