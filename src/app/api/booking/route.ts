import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getClientIp, isRateLimited } from '@/lib/rate-limit'

const RESEND = new Resend(process.env.RESEND_API_KEY)
const BOOKING_TO_EMAIL = 'marko.lempl4@gmail.com'
const RATE_LIMIT_KEY_PREFIX = 'booking:'
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const REQUIRED_FIELDS = ['name', 'email', 'carType', 'service', 'date', 'message'] as const

export type BookingPayload = {
  name: string
  email: string
  phone?: string
  carType: string
  service: string
  locationType?: string
  distance?: string
  date: string
  message: string
}

function getLocationLabel(payload: { locationType?: string; distance?: string }): string {
  const { locationType, distance } = payload
  if (!locationType) return ''
  if (locationType === 'our-location') return 'At our location'
  return distance ? `We come to you (−${distance} km)` : 'We come to you'
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)
    if (isRateLimited(`${RATE_LIMIT_KEY_PREFIX}${ip}`)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a few minutes.' },
        { status: 429 }
      )
    }

    const body = (await request.json()) as BookingPayload
    const { name, email, phone, carType, service, locationType, distance, date, message } = body

    const missing = REQUIRED_FIELDS.filter((field) => !body[field]?.trim())
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      )
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set')
      return NextResponse.json(
        { error: 'Email is not configured. Please set RESEND_API_KEY.' },
        { status: 500 }
      )
    }

    const locationLabel = getLocationLabel({ locationType, distance })
    const phoneLine = phone?.trim() ? `<p><strong>Phone:</strong> ${escapeHtml(phone.trim())}</p>` : ''
    const locationLine = locationLabel ? `<p><strong>Location:</strong> ${locationLabel}</p>` : ''
    const html = `
      <h2>New booking request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${phoneLine}
      <p><strong>Car type / model:</strong> ${escapeHtml(carType)}</p>
      <p><strong>Service:</strong> ${escapeHtml(service)}</p>
      ${locationLine}
      <p><strong>Preferred date:</strong> ${escapeHtml(date)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `.trim()

    const fromAddress = process.env.RESEND_FROM ?? 'Car Detailing Website <onboarding@resend.dev>'

    const { data, error } = await RESEND.emails.send({
      from: fromAddress,
      to: [BOOKING_TO_EMAIL],
      replyTo: email.trim(),
      subject: `Booking request from ${name.trim()} – ${service.trim()}`,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Send confirmation email to the customer
    const confirmationHtml = `
      <h2>We received your booking request</h2>
      <p>Hi ${escapeHtml(name.trim())},</p>
      <p>Thank you for getting in touch. We've received your request and will get back to you soon to confirm your booking.</p>
      <p><strong>Summary of your request:</strong></p>
      <ul>
        <li>Service: ${escapeHtml(service)}</li>
        <li>Car: ${escapeHtml(carType)}</li>
        ${locationLabel ? `<li>Location: ${escapeHtml(locationLabel)}</li>` : ''}
        <li>Preferred date: ${escapeHtml(date)}</li>
      </ul>
      <p>If you have any questions in the meantime, just reply to this email or give us a call.</p>
      <p>Best regards,<br>AShineMobile</p>
    `.trim()

    const confirmResult = await RESEND.emails.send({
      from: fromAddress,
      to: [email.trim()],
      subject: `We received your booking request – AShineMobile`,
      html: confirmationHtml,
    })

    if (confirmResult.error) {
      console.error('Confirmation email error:', confirmResult.error)
      // Still return success – the booking was received by the business
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Booking API error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to send booking email' },
      { status: 500 }
    )
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
