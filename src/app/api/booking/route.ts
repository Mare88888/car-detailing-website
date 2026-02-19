import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const BOOKING_EMAIL = 'marko.lempl4@gmail.com'

export type BookingPayload = {
  name: string
  carType: string
  service: string
  date: string
  message: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingPayload
    const { name, carType, service, date, message } = body

    if (!name?.trim() || !carType?.trim() || !service?.trim() || !date?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Missing required fields: name, carType, service, date, message' },
        { status: 400 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set')
      return NextResponse.json(
        { error: 'Email is not configured. Please set RESEND_API_KEY.' },
        { status: 500 }
      )
    }

    const html = `
      <h2>New booking request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Car type / model:</strong> ${escapeHtml(carType)}</p>
      <p><strong>Service:</strong> ${escapeHtml(service)}</p>
      <p><strong>Preferred date:</strong> ${escapeHtml(date)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `.trim()

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM ?? 'Car Detailing Website <onboarding@resend.dev>',
      to: [BOOKING_EMAIL],
      subject: `Booking request from ${name.trim()} – ${service.trim()}`,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
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
