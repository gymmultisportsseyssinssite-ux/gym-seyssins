import type { Metadata } from 'next'
import Link from 'next/link'
import { Camera } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { PageHero } from '@/components/shared/PageHero'
import { SanityImage } from '@/components/shared/SanityImage'
import { formatDateFR } from '@/lib/format'
import { getAllGaleries } from '@/lib/sanity/fetch'
import type { GalerieListItem } from '@/lib/sanity/types'

export const metadata: Metadata = {
  title: 'Galeries photo',
  description: 'Photos des cours, événements et temps forts de la Gym Multisport Seyssins.',
}

export default async function GaleriesPage() {
  const raw = (await getAllGaleries().catch(() => [])) ?? []
  const galeries = raw as unknown as GalerieListItem[]

  return (
    <>
      <PageHero
        eyebrow="En images"
        title="Galeries photo"
        subtitle="Les moments forts de l’association capturés au fil des saisons."
        imageSrc="/images/galeries-hero.jpg"
        imageAlt="Photographe en action"
      />
      <section className="bg-background">
        <div className="container-content py-16 md:py-20">
          {galeries.length === 0 ? (
            <p className="border-border bg-muted/40 text-muted-foreground rounded-[var(--radius-lg)] border border-dashed p-16 text-center">
              Aucune galerie publiée pour l’instant.
            </p>
          ) : (
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {galeries.map((g) => {
                const date = formatDateFR(g.date)
                const href = g.slug ? `/galeries/${g.slug}` : '/galeries'
                return (
                  <li key={g._id}>
                    <Link
                      href={href}
                      className="group bg-card focus-visible:ring-ring focus-visible:ring-offset-background block overflow-hidden rounded-[var(--radius-lg)] transition-all hover:-translate-y-1 hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2"
                    >
                      <div className="bg-muted relative aspect-[4/3] w-full overflow-hidden">
                        {g.coverImage ? (
                          <SanityImage
                            value={g.coverImage}
                            width={800}
                            sizes="(min-width: 1024px) 33vw, 100vw"
                            className="size-full"
                          />
                        ) : null}
                        {typeof g.nombrePhotos === 'number' && g.nombrePhotos > 0 ? (
                          <Badge
                            variant="secondary"
                            className="bg-foreground/80 text-background absolute right-3 bottom-3"
                          >
                            <Camera className="size-3" aria-hidden="true" />
                            {g.nombrePhotos} photo{g.nombrePhotos > 1 ? 's' : ''}
                          </Badge>
                        ) : null}
                      </div>
                      <div className="p-5">
                        <h2 className="font-display text-foreground group-hover:text-primary text-xl transition-colors">
                          {g.titre}
                        </h2>
                        {date ? (
                          <time
                            className="text-muted-foreground mt-1 block text-sm"
                            dateTime={g.date ?? undefined}
                          >
                            {date}
                          </time>
                        ) : null}
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}
