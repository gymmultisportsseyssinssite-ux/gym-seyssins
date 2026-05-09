import { NextResponse } from 'next/server'

import { sanityClient } from '@/lib/sanity/client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type HealthStatus = {
  ok: boolean
  uptime: number
  timestamp: string
  checks: {
    sanity: 'ok' | 'fail'
  }
}

export async function GET() {
  const checks: HealthStatus['checks'] = { sanity: 'fail' }

  try {
    await sanityClient.fetch<number>('count(*[_type == "siteSettings"])')
    checks.sanity = 'ok'
  } catch {
    checks.sanity = 'fail'
  }

  const ok = checks.sanity === 'ok'
  const payload: HealthStatus = {
    ok,
    uptime: typeof process.uptime === 'function' ? process.uptime() : 0,
    timestamp: new Date().toISOString(),
    checks,
  }

  return NextResponse.json(payload, { status: ok ? 200 : 503 })
}
