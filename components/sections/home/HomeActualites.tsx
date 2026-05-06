import Link from 'next/link'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

import { homeContent } from '@/content/home'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SanityImage } from '@/components/shared/SanityImage'
import { getFeaturedArticles } from '@/lib/sanity/fetch'
import { cn } from '@/lib/utils'

const CATEGORIE_LABELS: Record<string, string> = {
  actualité: 'Actualité',
  événement: 'Événement',
  communiqué: 'Communiqué',
}

type ArticleCard = {
  _id: string
  titre: string | null
  slug: string | null
  datePublication: string | null
  chapo: string | null
  categorie: string | null
  imagePrincipale: Parameters<typeof SanityImage>[0]['value'] | null
  featured?: boolean | null
}

function ArticleTile({ article, large = false }: { article: ArticleCard; large?: boolean }) {
  const date = article.datePublication
    ? format(new Date(article.datePublication), 'd MMMM yyyy', { locale: fr })
    : null
  const href = article.slug ? `/actualites/${article.slug}` : '/actualites'

  return (
    <Link
      href={href}
      className={cn(
        'group focus-visible:ring-ring focus-visible:ring-offset-background bg-card block overflow-hidden rounded-[var(--radius-lg)] transition-all hover:-translate-y-1 hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2',
        large ? 'lg:col-span-2 lg:row-span-2' : '',
      )}
    >
      <div
        className={cn(
          'bg-muted relative w-full overflow-hidden',
          large ? 'aspect-[16/10]' : 'aspect-[4/3]',
        )}
      >
        {article.imagePrincipale ? (
          <SanityImage
            value={article.imagePrincipale}
            width={large ? 1200 : 600}
            sizes={large ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 30vw, 50vw'}
            className="size-full"
          />
        ) : null}
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3">
          {article.categorie ? (
            <Badge variant="secondary" className="bg-muted text-muted-foreground">
              {CATEGORIE_LABELS[article.categorie] ?? article.categorie}
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
        <h3
          className={cn(
            'font-display text-foreground group-hover:text-primary mt-3 line-clamp-2 transition-colors',
            large ? 'text-2xl' : 'text-xl',
          )}
        >
          {article.titre}
        </h3>
        {article.chapo ? (
          <p className="text-muted-foreground mt-2 line-clamp-2 text-base">{article.chapo}</p>
        ) : null}
      </div>
    </Link>
  )
}

export async function HomeActualites() {
  const { actualites } = homeContent
  const articlesRaw = (await getFeaturedArticles().catch(() => [])) ?? []
  const articles = articlesRaw as unknown as ArticleCard[]

  if (articles.length === 0) {
    return (
      <section
        aria-labelledby="home-news-title"
        className="bg-[color-mix(in_oklab,var(--color-secondary)_15%,var(--color-background))]"
      >
        <div className="container-content py-16 md:py-24">
          <p className="text-primary text-sm font-medium tracking-wide uppercase">
            {actualites.eyebrow}
          </p>
          <h2
            id="home-news-title"
            className="font-display text-foreground mt-3 text-[length:var(--text-3xl)]"
          >
            {actualites.title}
          </h2>
          <p className="text-muted-foreground mt-6 max-w-xl">
            Les premiers articles publiés dans le Studio apparaîtront ici.
          </p>
        </div>
      </section>
    )
  }

  const [first, ...rest] = articles

  return (
    <section
      aria-labelledby="home-news-title"
      className="bg-[color-mix(in_oklab,var(--color-secondary)_15%,var(--color-background))]"
    >
      <div className="container-content py-16 md:py-24">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-primary text-sm font-medium tracking-wide uppercase">
              {actualites.eyebrow}
            </p>
            <h2
              id="home-news-title"
              className="font-display text-foreground mt-3 text-[length:var(--text-3xl)]"
            >
              {actualites.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">{actualites.subtitle}</p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-2">
          {first ? <ArticleTile article={first} large /> : null}
          {rest.slice(0, 2).map((a) => (
            <ArticleTile key={a._id} article={a} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="secondary" size="lg">
            <Link href={actualites.cta.href}>{actualites.cta.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
