import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

import { revalidateSecret } from '@/sanity/env'

type SanityWebhookBody = {
  _type?: string
  slug?: { current?: string } | string
}

const PATHS_BY_TYPE: Record<string, (slug?: string) => string[]> = {
  article: (slug) => (slug ? ['/', '/actualites', `/actualites/${slug}`] : ['/', '/actualites']),
  cours: () => ['/', '/cours'],
  discipline: () => ['/', '/cours'],
  professeur: () => ['/', '/professeurs'],
  galeriePhoto: (slug) => (slug ? ['/', '/galeries', `/galeries/${slug}`] : ['/', '/galeries']),
  documentTelechargeable: () => ['/documents'],
  siteSettings: () => ['/'],
}

export async function POST(req: NextRequest) {
  const headerSecret =
    req.headers.get('x-sanity-revalidate-secret') ??
    req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')

  if (!revalidateSecret || headerSecret !== revalidateSecret) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  let body: SanityWebhookBody
  try {
    body = (await req.json()) as SanityWebhookBody
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 })
  }

  const type = body._type
  if (!type || !(type in PATHS_BY_TYPE)) {
    return NextResponse.json({ ok: true, revalidated: [], reason: 'unknown_type' })
  }

  const slug = typeof body.slug === 'string' ? body.slug : (body.slug?.current ?? undefined)

  const paths = PATHS_BY_TYPE[type]!(slug)
  for (const path of paths) {
    revalidatePath(path)
  }

  return NextResponse.json({ ok: true, revalidated: paths, type })
}
