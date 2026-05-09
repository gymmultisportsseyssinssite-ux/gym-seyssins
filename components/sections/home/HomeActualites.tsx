import Link from 'next/link'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

import { homeContent } from '@/content/home'
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

function formatEditorialDate(iso: string | null): { day: string; month: string; year: string } | null {
  if (!iso) return null
  const d = new Date(iso)
  return {
    day: format(d, 'dd', { locale: fr }),
    month: format(d, 'MMM', { locale: fr }).toUpperCase().replace('.', ''),
    year: format(d, 'yyyy', { locale: fr }),
  }
}

function CategoryPill({ value, accent = false }: { value: string | null; accent?: boolean }) {
  if (!value) return null
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.7rem] font-medium tracking-wider uppercase',
        accent
          ? 'border-secondary/40 bg-secondary/8 text-secondary'
          : 'border-foreground/15 text-foreground/70',
      )}
    >
      {CATEGORIE_LABELS[value] ?? value}
    </span>
  )
}

function FeaturedArticle({ article }: { article: ArticleCard }) {
  const date = formatEditorialDate(article.datePublication)
  const href = article.slug ? `/actualites/${article.slug}` : '/actualites'

  return (
    <Link
      href={href}
      className="group focus-visible:ring-ring focus-visible:ring-offset-background block rounded-[var(--radius-lg)] focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] shadow-[0_30px_60px_-25px_rgba(15,20,25,0.35)]">
        {article.imagePrincipale ? (
          <SanityImage
            value={article.imagePrincipale}
            fill
            width={1200}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="bg-muted absolute inset-0" />
        )}
        <div
          aria-hidden="true"
          className="from-foreground/40 absolute inset-0 bg-gradient-to-t to-transparent"
        />
        {/* Date overlay horizontale */}
        {date ? (
          <div className="text-background absolute bottom-5 left-5 flex items-baseline gap-2.5">
            <span className="font-display text-4xl leading-none font-bold tracking-[-0.03em] md:text-5xl">
              {date.day}
            </span>
            <span className="font-mono text-[0.7rem] font-semibold tracking-[0.2em] uppercase">
              {date.month} {date.year}
            </span>
          </div>
        ) : null}
      </div>

      <div className="mt-6">
        <CategoryPill value={article.categorie} accent />
        <h3 className="font-display text-foreground group-hover:text-primary mt-4 text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.1] font-bold tracking-tight transition-colors">
          {article.titre}
        </h3>
        {article.chapo ? (
          <p className="text-foreground/70 mt-3 line-clamp-2 text-base leading-[1.6]">
            {article.chapo}
          </p>
        ) : null}
        <span
          aria-hidden="true"
          className="text-foreground/40 group-hover:text-primary mt-4 inline-flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-wider uppercase transition-all group-hover:gap-2.5"
        >
          <span className="bg-foreground/30 group-hover:bg-primary h-px w-5 transition-all group-hover:w-9" />
          Lire l’article
        </span>
      </div>
    </Link>
  )
}

function SecondaryArticle({
  article,
  last,
  first,
}: {
  article: ArticleCard
  last?: boolean
  first?: boolean
}) {
  const date = formatEditorialDate(article.datePublication)
  const href = article.slug ? `/actualites/${article.slug}` : '/actualites'

  return (
    <Link
      href={href}
      className={cn(
        'group focus-visible:ring-ring focus-visible:ring-offset-background flex items-stretch gap-5 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2',
        first ? 'pb-5' : 'py-5',
        !last && 'border-foreground/12 border-b border-dashed',
      )}
    >
      {/* Vignette carrée */}
      <div className="bg-muted relative aspect-square w-[110px] shrink-0 overflow-hidden rounded-[var(--radius-md)] sm:w-[130px]">
        {article.imagePrincipale ? (
          <SanityImage
            value={article.imagePrincipale}
            fill
            width={300}
            sizes="130px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : null}
      </div>

      {/* Contenu */}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="text-foreground/60 flex items-baseline gap-3 font-mono text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
          {date ? (
            <span className="text-foreground tabular-nums shrink-0">
              {date.day} / {date.month} {date.year}
            </span>
          ) : null}
          <span className="bg-foreground/15 h-px flex-1" aria-hidden="true" />
          <CategoryPill value={article.categorie} />
        </div>

        <h3 className="font-display text-foreground group-hover:text-primary mt-2 line-clamp-2 text-base leading-[1.25] font-bold tracking-tight transition-colors md:text-lg">
          {article.titre}
        </h3>

        <span
          aria-hidden="true"
          className="text-foreground/40 group-hover:text-primary mt-2 inline-flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-wider uppercase transition-all group-hover:gap-2.5"
        >
          <span className="bg-foreground/30 group-hover:bg-primary h-px w-5 transition-all group-hover:w-9" />
          Lire
        </span>
      </div>
    </Link>
  )
}

export async function HomeActualites() {
  const { actualites } = homeContent
  const articlesRaw = (await getFeaturedArticles().catch(() => [])) ?? []
  const articles = articlesRaw as unknown as ArticleCard[]

  return (
    <section
      aria-labelledby="home-news-title"
      className="bg-background relative isolate overflow-hidden"
    >
      <div className="container-content relative py-12 md:py-16 lg:py-20">
        {/* Header éditorial */}
        <div className="mb-12 flex items-baseline gap-6 md:mb-16">
          <span
            aria-hidden="true"
            className="font-display text-primary/15 text-[5rem] leading-none font-light tracking-tighter md:text-[7rem]"
          >
            03
          </span>
          <div className="flex-1 border-t border-dashed border-[color:color-mix(in_oklab,var(--color-primary)_25%,transparent)] pt-3">
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
              {actualites.eyebrow}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2
              id="home-news-title"
              className="font-display text-foreground text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.025em]"
            >
              {actualites.title}
            </h2>
            <p className="text-foreground/70 mt-5 text-lg leading-[1.6]">{actualites.subtitle}</p>
          </div>

          <Link
            href={actualites.cta.href}
            className="group text-foreground hover:text-primary hidden items-center gap-2 text-sm font-semibold tracking-wide transition-colors md:inline-flex"
          >
            <span className="relative">
              {actualites.cta.label}
              <span
                aria-hidden="true"
                className="bg-foreground group-hover:bg-primary absolute right-0 -bottom-1 left-0 h-px origin-left scale-x-100 transition-transform group-hover:scale-x-0"
              />
              <span
                aria-hidden="true"
                className="bg-primary absolute right-0 -bottom-1 left-0 h-px origin-right scale-x-0 transition-transform delay-150 group-hover:origin-left group-hover:scale-x-100"
              />
            </span>
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </div>

        {articles.length === 0 ? (
          <p className="text-muted-foreground mt-14 max-w-xl">
            Les premiers articles publiés dans le Studio apparaîtront ici.
          </p>
        ) : (
          <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Featured (gauche) */}
            <div className="lg:col-span-6">
              {articles[0] ? <FeaturedArticle article={articles[0]} /> : null}
            </div>

            {/* Liste verticale (droite) */}
            <div className="lg:col-span-6">
              {articles.slice(1, 5).map((a, idx, arr) => (
                <SecondaryArticle
                  key={a._id}
                  article={a}
                  first={idx === 0}
                  last={idx === arr.length - 1}
                />
              ))}
            </div>
          </div>
        )}

        {/* CTA mobile */}
        <div className="mt-12 flex justify-center md:hidden">
          <Link
            href={actualites.cta.href}
            className="group bg-foreground text-background hover:bg-primary inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all"
          >
            <span>{actualites.cta.label}</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
