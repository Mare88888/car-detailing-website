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
  carType: '',
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
  return [] // custom type: only "Custom / Other" option is shown in UI
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  carType?: string
  serviceCategory?: string
  service?: string
  locationType?: string
  distance?: string
  date?: string
  message?: string
}

const inputBase =
  'w-full px-4 py-3 bg-premium-slate border rounded-sharp text-text-primary placeholder-text-muted text-body-sm focus:outline-none focus:ring-2 focus:ring-premium-accent focus:border-transparent transition-colors duration-200'

const inputError = 'border-error focus:ring-error'
const inputDefault = 'border-border-default'

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
        return undefined // optional
      case 'carType':
        return !trimmed ? t('errors.carType') : undefined
      case 'serviceCategory':
        return !trimmed ? t('errors.serviceCategory') : undefined
      case 'service':
        return !trimmed ? t('errors.service') : undefined
      case 'locationType':
        return !trimmed ? t('errors.locationType') : undefined
      case 'distance':
        return values.locationType === 'mobile' && !trimmed ? t('errors.distance') : undefined
      case 'date': {
        if (!trimmed) return t('errors.date')
        const match = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
        if (!match) return t('errors.dateFormat')
        const [, d, m, y] = match.map(Number)
        if (m < 1 || m > 12) return t('errors.dateMonth')
        if (d < 1 || d > 31) return t('errors.dateDay')
        if (y < 2020 || y > 2040) return t('errors.dateYear')
        return undefined
      }
      case 'message':
        return trimmed.length < 10 ? t('errors.message') : undefined
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

  function formatDateInput(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 8)
    const monthFirst = digits[2]
    const singleDigitMonth = monthFirst >= '2' && monthFirst <= '9' // month 02–09: next digits are year

    if (digits.length <= 2) return digits
    if (digits.length === 3) {
      if (singleDigitMonth) return `${digits.slice(0, 2)}/${digits.slice(2)}/`
      return `${digits.slice(0, 2)}/${digits.slice(2)}`
    }
    // Once we added DD/M/, further digits go to year (so 4th digit isn’t second digit of month)
    if (singleDigitMonth) {
      const day = digits.slice(0, 2)
      const month = digits.slice(2, 3)
      const year = digits.slice(3, 7) // max 4 digits for year
      return `${day}/${month}/${year}`
    }
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    const nextValue = name === 'date' ? formatDateInput(value) : value
    setValues((prev) => {
      const next = { ...prev, [name]: nextValue }
      if (name === 'serviceCategory') {
        next.service = nextValue === 'custom' ? PACKAGE_CUSTOM_ID : ''
      }
      if (name === 'locationType') {
        next.distance = nextValue === 'mobile' ? prev.distance : ''
      }
      return next
    })
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name as keyof FormErrors, nextValue) }))
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
    setTouched({ name: true, email: true, phone: true, carType: true, serviceCategory: true, service: true, locationType: true, distance: true, date: true, message: true })
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

        <div className="grid lg:grid-cols-[1fr,auto] gap-10 lg:gap-16 lg:items-start">
          {/* Form column */}
          <div>
            {submitted ? (
              <div className="rounded-card bg-premium-slate border border-premium-accent/40 p-8 sm:p-10 text-center">
                <p className="text-premium-accent font-semibold text-body-lg">
                  {t('thanksTitle')}
                </p>
                <p className="text-text-secondary mt-2 text-body-sm">
                  {t('thanksBody')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {submitError && (
                  <p className="text-body-sm text-error bg-error/10 border border-error/30 rounded-sharp px-4 py-3" role="alert">
                    {submitError}
                  </p>
                )}
                <div>
                  <label htmlFor="contact-name" className="block text-body-sm font-medium text-text-secondary mb-2">
                    {t('name')} <span className="text-error">*</span>
                  </label>
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
                  {errors.name && touched.name && (
                    <p id="contact-name-error" className="mt-1.5 text-body-sm text-error" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-body-sm font-medium text-text-secondary mb-2">
                    {t('email')} <span className="text-error">*</span>
                  </label>
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
                  {errors.email && touched.email && (
                    <p id="contact-email-error" className="mt-1.5 text-body-sm text-error" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-body-sm font-medium text-text-secondary mb-2">
                    {t('phone')}
                  </label>
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
                  {errors.phone && touched.phone && (
                    <p id="contact-phone-error" className="mt-1.5 text-body-sm text-error" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-carType" className="block text-body-sm font-medium text-text-secondary mb-2">
                    {t('carType')} <span className="text-error">*</span>
                  </label>
                  <input
                    id="contact-carType"
                    name="carType"
                    type="text"
                    value={values.carType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClass('carType')}
                    placeholder={t('placeholderCar')}
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
                  <label htmlFor="contact-serviceCategory" className="block text-body-sm font-medium text-text-secondary mb-2">
                    {t('serviceType')} <span className="text-error">*</span>
                  </label>
                  <select
                    id="contact-serviceCategory"
                    name="serviceCategory"
                    value={values.serviceCategory}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${getInputClass('serviceCategory')} appearance-none cursor-pointer bg-premium-slate`}
                    aria-invalid={!!errors.serviceCategory}
                    aria-describedby={errors.serviceCategory ? 'contact-serviceCategory-error' : undefined}
                  >
                    <option value="" disabled hidden>{t('selectServiceType')}</option>
                    {serviceTypes.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  {errors.serviceCategory && touched.serviceCategory && (
                    <p id="contact-serviceCategory-error" className="mt-1.5 text-body-sm text-error" role="alert">
                      {errors.serviceCategory}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-service" className="block text-body-sm font-medium text-text-secondary mb-2">
                    {t('package')} <span className="text-error">*</span>
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={values.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={!values.serviceCategory}
                    className={`${getInputClass('service')} appearance-none cursor-pointer bg-premium-slate disabled:opacity-60 disabled:cursor-not-allowed`}
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
                  {errors.service && touched.service && (
                    <p id="contact-service-error" className="mt-1.5 text-body-sm text-error" role="alert">
                      {errors.service}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-body-sm font-medium text-text-secondary mb-2">
                    {t('whereService')} <span className="text-error">*</span>
                  </label>
                  <div className="flex flex-wrap gap-4 items-start">
                    <div className="flex-1 min-w-[200px]">
                      <select
                        id="contact-locationType"
                        name="locationType"
                        value={values.locationType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${getInputClass('locationType')} appearance-none cursor-pointer bg-premium-slate`}
                        aria-invalid={!!errors.locationType}
                        aria-describedby={errors.locationType ? 'contact-locationType-error' : undefined}
                      >
                        <option value="" disabled hidden>{t('chooseLocation')}</option>
                        {locationOptions.map(({ value, label }) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                      {errors.locationType && touched.locationType && (
                        <p id="contact-locationType-error" className="mt-1.5 text-body-sm text-error" role="alert">
                          {errors.locationType}
                        </p>
                      )}
                    </div>
                    {values.locationType === 'mobile' && (
                      <div className="flex-1 min-w-[140px]">
                        <label htmlFor="contact-distance" className="sr-only">{t('distance')}</label>
                        <select
                          id="contact-distance"
                          name="distance"
                          value={values.distance}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${getInputClass('distance')} appearance-none cursor-pointer bg-premium-slate`}
                          aria-invalid={!!errors.distance}
                          aria-describedby={errors.distance ? 'contact-distance-error' : undefined}
                        >
                          <option value="" disabled hidden>{t('distance')}</option>
                          {distanceOptions.map(({ value, label }) => (
                            <option key={value} value={value}>{label}</option>
                          ))}
                        </select>
                        {errors.distance && touched.distance && (
                          <p id="contact-distance-error" className="mt-1.5 text-body-sm text-error" role="alert">
                            {errors.distance}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-date" className="block text-body-sm font-medium text-text-secondary mb-2">
                    {t('preferredDate')} <span className="text-error">*</span>
                  </label>
                  <input
                    id="contact-date"
                    name="date"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="DD/MM/YYYY"
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
                    {t('message')} <span className="text-error">*</span>
                  </label>
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
                  {errors.message && touched.message && (
                    <p id="contact-message-error" className="mt-1.5 text-body-sm text-error" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileTap={sending ? undefined : buttonTap}
                  className="btn-primary w-full py-4 text-body-sm font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {sending ? t('sending') : t('send')}
                </motion.button>
              </form>
            )}
          </div>

          {/* Contact details column */}
          <div className="lg:w-72 lg:sticky lg:top-24">
            <div className="rounded-card bg-premium-slate border border-border-default p-6 sm:p-8">
              <h3 className="text-h4 text-text-primary font-semibold mb-4">
                {t('contactDetails')}
              </h3>
              <ul className="space-y-4 text-body-sm">
                <li>
                  <span className="block text-text-muted uppercase tracking-wider text-caption mb-1">
                    {t('phone')}
                  </span>
                  <a
                    href="tel:+38670742363"
                    className="inline-flex items-center gap-2 text-text-primary hover:text-premium-accent transition-colors font-medium"
                  >
                    <PhoneIcon className="shrink-0" />
                    <span>+386 70 742 363</span>
                  </a>
                </li>
                <li>
                  <span className="block text-text-muted uppercase tracking-wider text-caption mb-1">
                    {t('email')}
                  </span>
                  <a
                    href="mailto:AShineMobile@gmail.com"
                    className="inline-flex items-center gap-2 text-text-primary hover:text-premium-accent transition-colors font-medium break-all"
                  >
                    <EmailIcon className="shrink-0" />
                    <span>AShineMobile@gmail.com</span>
                  </a>
                </li>
              </ul>
              <p className="mt-6 pt-6 border-t border-border-default text-body-sm text-text-secondary">
                {t('preferCall')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionEntrance>
  )
}
