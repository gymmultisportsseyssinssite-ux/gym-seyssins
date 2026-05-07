import type { Metadata } from 'next'
import { Suspense } from 'react'

import { PageHero } from '@/components/shared/PageHero'
import { ArticlesList } from '@/components/actualites/ArticlesList'
import { getArticlesPaginated } from '@/lib/sanity/fetch'
import type { ArticleListItem } from '@/lib/sanity/types'

const PAGE_SIZE = 9

export const metadata: Metadata = {
  title: 'Actualités',
  description: 'Articles, événements et communiqués de la Gym Multisport Seyssins.',
}

export default async function ActualitesPage() {
  const data = await getArticlesPaginated({
    start: 0,
    end: PAGE_SIZE,
    categorie: null,
    sort: 'desc',
  }).catch(() => ({ items: [], total: 0 }))

  const items = (data?.items ?? []) as unknown as ArticleListItem[]
  const total = data?.total ?? 0

  return (
    <>
      <PageHero
        eyebrow="Vie de l’association"
        title="Actualités"
        subtitle="Articles, événements et communiqués publiés par le bureau."
        imageSrc="/images/actualites-hero.jpg"
        imageAlt="Conférence ou réunion d’association"
      />
      <section className="bg-background">
        <div className="container-content py-16 md:py-20">
          <Suspense fallback={null}>
            <ArticlesList initialItems={items} initialTotal={total} />
          </Suspense>
        </div>
      </section>
    </>
  )
}
