import { type NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

import { ContactNotification } from '@/emails/ContactNotification'
import { contactSchema, SUJET_LABEL } from '@/lib/contact-schema'
import { SITE, CONTACT } from '@/lib/constants'
import { getSiteSettings } from '@/lib/sanity/fetch'

// =====================================================================
// Rate limit naïf en mémoire
// (suffisant pour V1 sur un seul process Vercel ; à renforcer si besoin)
// =====================================================================
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 5
const rateMap = new Map<string, { count: number; reset: number }>()

function rateLimit(ip: string): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || entry.reset < now) {
    rateMap.set(ip, { count: 1, reset: now + RATE_WINDOW_MS })
    return { ok: true }
  }
  if (entry.count >= RATE_MAX) {
    return { ok: false, retryAfterSec: Math.ceil((entry.reset - now) / 1000) }
  }
  entry.count += 1
  return { ok: true }
}

function getIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0]!.trim()
  const real = req.headers.get('x-real-ip')
  if (real) return real
  return 'unknown'
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'validation', issues: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const data = parsed.data

  // Honeypot — répondre 200 silencieusement pour ne pas leaker l'info aux bots
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  // Rate limit
  const ip = getIp(req)
  const { ok, retryAfterSec } = rateLimit(ip)
  if (!ok) {
    return NextResponse.json(
      { ok: false, error: 'rate_limited' },
      { status: 429, headers: { 'Retry-After': String(retryAfterSec ?? 600) } },
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? `noreply@gym-seyssin.fr`

  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY manquant')
    return NextResponse.json({ ok: false, error: 'server_config' }, { status: 500 })
  }

  // Adresse de destination : siteSettings.contactEmail si défini, sinon fallback constant
  let toEmail = process.env.RESEND_TO_EMAIL ?? CONTACT.email
  try {
    const settings = await getSiteSettings()
    if (settings?.contactEmail) toEmail = settings.contactEmail
  } catch (err) {
    console.warn('[contact] getSiteSettings failed, using fallback', err)
  }

  const sujetLabel = SUJET_LABEL[data.sujet]
  const subject = `[Site] ${sujetLabel} — ${data.prenom} ${data.nom}`

  const text = [
    `Sujet : ${sujetLabel}`,
    `De : ${data.prenom} ${data.nom} <${data.email}>`,
    data.telephone ? `Téléphone : ${data.telephone}` : null,
    '',
    'Message :',
    data.message,
    '',
    `— Email envoyé depuis le formulaire de contact de ${SITE.name}`,
  ]
    .filter(Boolean)
    .join('\n')

  const resend = new Resend(apiKey)
  const result = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: data.email,
    subject,
    react: ContactNotification({
      prenom: data.prenom,
      nom: data.nom,
      email: data.email,
      telephone: data.telephone,
      sujet: data.sujet,
      message: data.message,
      siteName: SITE.name,
    }),
    text,
  })

  if (result.error) {
    console.error('[contact] Resend error:', result.error)
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
