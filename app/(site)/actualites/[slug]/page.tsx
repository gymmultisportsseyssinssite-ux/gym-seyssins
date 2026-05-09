import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

import { ArticleCard } from '@/components/actualites/ArticleCard'
import { ArticleGallery } from '@/components/actualites/ArticleGallery'
import { ArticleToc } from '@/components/actualites/ArticleToc'
import { ShareButtons } from '@/components/actualites/ShareButtons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { JsonLd } from '@/components/shared/JsonLd'
import { PortableText } from '@/components/shared/PortableText'
import { SanityImage } from '@/components/shared/SanityImage'
import { SITE } from '@/lib/constants'
import { formatDateFR } from '@/lib/format'
import { extractToc } from '@/lib/portable-text-utils'
import { hasImageAsset, urlFor } from '@/lib/sanity/image'
import { CATEGORIE_ARTICLE_LABEL, type ArticleBySlugResult } from '@/lib/sanity/types'
import { getArticleBySlug, getAllArticleSlugs } from '@/lib/sanity/fetch'

type Params = { slug: string }

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = (await getAllArticleSlugs().catch(() => [])) as { slug: string }[] | null
  return (slugs ?? [])
    .map((s) => s?.slug)
    .filter((s): s is string => Boolean(s))
    .map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const result = (await getArticleBySlug(slug).catch(() => null)) as ArticleBySlugResult | null
  const article = result?.article
  if (!article) return { title: 'Article introuvable' }

  const hasImage = hasImageAsset(article.imagePrincipale)
  const ogImage = hasImage
    ? urlFor(article.imagePrincipale!).width(1200).height(630).url()
    : undefined

  return {
    title: article.titre ?? 'Article',
    description: article.chapo ?? SITE.description,
    openGraph: {
      type: 'article',
      title: article.titre ?? undefined,
      description: article.chapo ?? undefined,
      ...(ogImage
        ? { images: [{ url: ogImage, width: 1200, height: 630, alt: article.titre ?? '' }] }
        : {}),
      publishedTime: article.datePublication ?? undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.titre ?? undefined,
      description: article.chapo ?? undefined,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const result = (await getArticleBySlug(slug).catch(() => null)) as ArticleBySlugResult | null
  const article = result?.article
  if (!article) notFound()

  const date = formatDateFR(article.datePublication)
  const toc = extractToc(article.contenu, { includeH3: true })
  const articlesLies = result?.articlesLies ?? []
  const url = `${SITE.url}/actualites/${slug}`

  const auteurNom = [article.auteur?.prenom, article.auteur?.nom].filter(Boolean).join(' ')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.titre,
    description: article.chapo,
    datePublished: article.datePublication,
    image: hasImageAsset(article.imagePrincipale)
      ? urlFor(article.imagePrincipale!).width(1200).height(630).url()
      : undefined,
    author: auteurNom
      ? { '@type': 'Person', name: auteurNom }
      : { '@type': 'Organization', name: SITE.name },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero image pleine largeur */}
      {hasImageAsset(article.imagePrincipale) ? (
        <div className="bg-foreground relative w-full">
          <div className="relative aspect-[4/3] w-full md:aspect-[21/10]">
            <Image
              src={urlFor(article.imagePrincipale!).width(2100).url()}
              alt={article.imagePrincipale!.alt ?? article.titre ?? ''}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}

      <article className="bg-background">
        <div className="container-content py-12 md:py-16">
          {/* Layout : article centré + aside TOC sticky desktop */}
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-12">
            <div className="mx-auto max-w-[720px] lg:mx-0">
              {/* Header */}
              <header>
                <div className="flex flex-wrap items-center gap-3">
                  {article.categorie ? (
                    <Badge variant="secondary" className="bg-muted text-muted-foreground">
                      {CATEGORIE_ARTICLE_LABEL[article.categorie] ?? article.categorie}
                    </Badge>
                  ) : null}
                  {date ? (
                    <time
                      className="text-muted-foreground text-sm"
                      dateTime={article.datePublication ?? undefined}
                    >
                      {date}
                    </time>
                  ) : null}
                </div>
                <h1 className="font-display text-foreground mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.025em]">
                  {article.titre}
                </h1>
                {article.chapo ? (
                  <p className="text-foreground/70 mt-5 text-lg leading-[1.55]">{article.chapo}</p>
                ) : null}

                {auteurNom ? (
                  <div className="border-border mt-8 flex items-center gap-3 border-t pt-6">
                    {article.auteur?.photo ? (
                      <div className="relative size-10 overflow-hidden rounded-full">
                        <SanityImage
                          value={article.auteur.photo}
                          fill
                          width={80}
                          height={80}
                          sizes="40px"
                        />
                      </div>
                    ) : (
                      <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full text-sm font-semibold">
                        {(article.auteur?.prenom?.[0] ?? '') + (article.auteur?.nom?.[0] ?? '')}
                      </div>
                    )}
                    <div className="text-sm">
                      <p className="text-foreground font-medium">{auteurNom}</p>
                      {date ? <p className="text-muted-foreground">Publié le {date}</p> : null}
                    </div>
                  </div>
                ) : null}
              </header>

              {/* Corps */}
              <div className="prose-rich mt-10">
                <PortableText value={article.contenu} />
              </div>

              {/* Partage */}
              <div className="border-border mt-12 border-t pt-6">
                <ShareButtons url={url} titre={article.titre ?? ''} />
              </div>
            </div>

            {/* Aside TOC */}
            {toc.length > 1 ? (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <ArticleToc entries={toc} />
                </div>
              </aside>
            ) : null}
          </div>
        </div>
      </article>

      {/* Galerie inline (en bas d'article) */}
      {article.galerieInline && article.galerieInline.length > 0 ? (
        <ArticleGallery images={article.galerieInline} />
      ) : null}

      {/* Articles liés + retour */}
      <section aria-labelledby="related-title" className="bg-card">
        <div className="container-content py-16 md:py-20">
          <div className="flex items-end justify-between gap-4">
            <h2
              id="related-title"
              className="font-display text-foreground text-[length:var(--text-2xl)]"
            >
              Articles liés
            </h2>
            <Button asChild variant="ghost">
              <Link href="/actualites">
                <ArrowLeft className="size-4" aria-hidden="true" />
                Toutes les actualités
              </Link>
            </Button>
          </div>
          {articlesLies.length > 0 ? (
            <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {articlesLies.map((a) => (
                <li key={a._id}>
                  <ArticleCard article={a} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground mt-6">
              Pas d’autre article dans cette catégorie pour l’instant.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
