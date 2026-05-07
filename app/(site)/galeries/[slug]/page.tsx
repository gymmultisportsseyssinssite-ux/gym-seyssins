import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { GalerieLightbox } from '@/components/galeries/GalerieLightbox'
import { formatDateFR } from '@/lib/format'
import { urlFor } from '@/lib/sanity/image'
import { getAllGalerieSlugs, getGalerieBySlug } from '@/lib/sanity/fetch'
import type { GalerieDetail } from '@/lib/sanity/types'

type Params = { slug: string }

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = (await getAllGalerieSlugs().catch(() => [])) as { slug: string }[] | null
  return (slugs ?? [])
    .map((s) => s?.slug)
    .filter((s): s is string => Boolean(s))
    .map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const galerie = (await getGalerieBySlug(slug).catch(() => null)) as GalerieDetail | null
  if (!galerie) return { title: 'Galerie introuvable' }

  const ogImage = galerie.coverImage
    ? urlFor(galerie.coverImage).width(1200).height(630).url()
    : '/images/og-default.png'

  return {
    title: galerie.titre ?? 'Galerie',
    description: galerie.description ?? undefined,
    openGraph: {
      type: 'article',
      title: galerie.titre ?? undefined,
      description: galerie.description ?? undefined,
      images: [{ url: ogImage, width: 1200, height: 630, alt: galerie.titre ?? '' }],
    },
  }
}

export default async function GaleriePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const galerie = (await getGalerieBySlug(slug).catch(() => null)) as GalerieDetail | null
  if (!galerie) notFound()

  const date = formatDateFR(galerie.date)
  const photos = galerie.photos ?? []

  return (
    <>
      {/* Hero compact */}
      <section className="bg-card">
        <div className="container-content py-12 md:py-16">
          <Button asChild variant="ghost" size="sm" className="mb-4 -ml-3">
            <Link href="/galeries">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Toutes les galeries
            </Link>
          </Button>
          <h1 className="font-display text-foreground text-[length:var(--text-4xl)]">
            {galerie.titre}
          </h1>
          <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            {date ? <time dateTime={galerie.date ?? undefined}>{date}</time> : null}
            {photos.length > 0 ? (
              <span>
                · {photos.length} photo{photos.length > 1 ? 's' : ''}
              </span>
            ) : null}
          </div>
          {galerie.description ? (
            <p className="text-muted-foreground mt-5 max-w-3xl text-lg">{galerie.description}</p>
          ) : null}
        </div>
      </section>

      {/* Grille photos + lightbox */}
      <section className="bg-background">
        <div className="container-content py-12 md:py-16">
          <GalerieLightbox photos={photos} />
        </div>
      </section>

      {/* Lien article lié */}
      {galerie.evenementLie ? (
        <section className="bg-card">
          <div className="container-content py-12">
            <div className="border-border bg-background/60 flex flex-col items-start justify-between gap-4 rounded-[var(--radius-lg)] border p-6 md:flex-row md:items-center">
              <div>
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  Événement associé
                </p>
                <p className="font-display text-foreground mt-1 text-lg">
                  {galerie.evenementLie.titre}
                </p>
              </div>
              {galerie.evenementLie.slug ? (
                <Button asChild>
                  <Link href={`/actualites/${galerie.evenementLie.slug}`}>
                    Lire l’article
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
