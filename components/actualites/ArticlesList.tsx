'use client'

import { useEffect, useMemo, useState, useTransition } from 'react'
import { parseAsStringLiteral, useQueryStates } from 'nuqs'

import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArticleCard } from './ArticleCard'
import type { ArticleListItem } from '@/lib/sanity/types'

const PAGE_SIZE = 9
const SORT_OPTIONS = ['desc', 'asc'] as const
const CATEGORIES = ['toutes', 'actualité', 'événement', 'communiqué'] as const

type CategorieFilter = (typeof CATEGORIES)[number]

type Props = {
  initialItems: ArticleListItem[]
  initialTotal: number
}

export function ArticlesList({ initialItems, initialTotal }: Props) {
  const [filters, setFilters] = useQueryStates(
    {
      cat: parseAsStringLiteral(CATEGORIES).withDefault('toutes'),
      sort: parseAsStringLiteral(SORT_OPTIONS).withDefault('desc'),
    },
    { shallow: true, clearOnDefault: true },
  )

  const [items, setItems] = useState<ArticleListItem[]>(initialItems)
  const [total, setTotal] = useState<number>(initialTotal)
  const [loading, startTransition] = useTransition()
  const [loadingMore, setLoadingMore] = useState(false)

  // Quand les filtres changent, on remet la liste à zéro et on refetch
  const queryKey = useMemo(() => `${filters.cat}|${filters.sort}`, [filters])
  useEffect(() => {
    // Skip pour le tout premier rendu (où l'on a déjà initialItems)
    let cancelled = false
    startTransition(async () => {
      const cat = filters.cat === 'toutes' ? '' : filters.cat
      const url = `/api/articles?start=0&end=${PAGE_SIZE}&sort=${filters.sort}${
        cat ? `&cat=${encodeURIComponent(cat)}` : ''
      }`
      const res = await fetch(url, { cache: 'no-store' })
      if (!res.ok) return
      const data = (await res.json()) as { items: ArticleListItem[]; total: number }
      if (cancelled) return
      setItems(data.items ?? [])
      setTotal(data.total ?? 0)
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryKey])

  const loadMore = async () => {
    setLoadingMore(true)
    try {
      const cat = filters.cat === 'toutes' ? '' : filters.cat
      const url = `/api/articles?start=${items.length}&end=${items.length + PAGE_SIZE}&sort=${filters.sort}${
        cat ? `&cat=${encodeURIComponent(cat)}` : ''
      }`
      const res = await fetch(url, { cache: 'no-store' })
      if (!res.ok) return
      const data = (await res.json()) as { items: ArticleListItem[]; total: number }
      setItems((prev) => [...prev, ...(data.items ?? [])])
      setTotal(data.total ?? total)
    } finally {
      setLoadingMore(false)
    }
  }

  const featured = items[0]
  const rest = items.slice(1)
  const remaining = Math.max(0, total - items.length)
  const isFiltering = loading

  return (
    <div>
      {/* Filtres */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Tabs value={filters.cat} onValueChange={(v) => setFilters({ cat: v as CategorieFilter })}>
          <TabsList>
            <TabsTrigger value="toutes">Toutes</TabsTrigger>
            <TabsTrigger value="actualité">Actualités</TabsTrigger>
            <TabsTrigger value="événement">Événements</TabsTrigger>
            <TabsTrigger value="communiqué">Communiqués</TabsTrigger>
          </TabsList>
        </Tabs>

        <label className="text-muted-foreground flex items-center gap-2 text-sm">
          Trier par
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ sort: e.target.value === 'asc' ? 'asc' : 'desc' })}
            className="border-border bg-card text-foreground focus-visible:ring-ring h-10 rounded-md border px-3 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <option value="desc">Plus récentes</option>
            <option value="asc">Plus anciennes</option>
          </select>
        </label>
      </div>

      {/* État vide */}
      {items.length === 0 ? (
        <div className="border-border bg-muted/40 text-muted-foreground flex flex-col items-center gap-3 rounded-[var(--radius-lg)] border border-dashed p-16 text-center">
          <p className="font-display text-foreground text-xl">
            Aucune actualité pour cette catégorie.
          </p>
          <p className="max-w-md text-sm">Revenez plus tard ou explorez une autre catégorie.</p>
        </div>
      ) : (
        <>
          {/* Featured (premier article) */}
          {featured ? <ArticleCard article={featured} large /> : null}

          {/* Grille reste */}
          {rest.length > 0 ? (
            <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((a) => (
                <li key={a._id}>
                  <ArticleCard article={a} />
                </li>
              ))}
            </ul>
          ) : null}

          {remaining > 0 ? (
            <div className="mt-10 flex justify-center">
              <Button
                onClick={loadMore}
                disabled={loadingMore || isFiltering}
                variant="secondary"
                size="lg"
              >
                {loadingMore ? 'Chargement…' : `Charger plus (${remaining} restants)`}
              </Button>
            </div>
          ) : null}
        </>
      )}

      <p aria-live="polite" className="sr-only" role="status">
        {items.length} article{items.length > 1 ? 's' : ''} affiché
        {items.length > 1 ? 's' : ''} sur {total}
      </p>
    </div>
  )
}
