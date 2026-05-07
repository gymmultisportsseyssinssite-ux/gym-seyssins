import { type NextRequest, NextResponse } from 'next/server'

import { getArticlesPaginated } from '@/lib/sanity/fetch'

const CATEGORIES = new Set(['actualité', 'événement', 'communiqué'])

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const start = Math.max(0, Number(searchParams.get('start') ?? 0))
  const end = Math.max(start + 1, Number(searchParams.get('end') ?? start + 9))
  const sortRaw = searchParams.get('sort')
  const sort = sortRaw === 'asc' ? 'asc' : 'desc'
  const cat = searchParams.get('cat')
  const categorie = cat && CATEGORIES.has(cat) ? cat : null

  const data = await getArticlesPaginated({ start, end, categorie, sort })
  return NextResponse.json(data)
}
