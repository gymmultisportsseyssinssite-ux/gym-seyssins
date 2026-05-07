import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { SanityImage } from '@/components/shared/SanityImage'
import { formatDateFR } from '@/lib/format'
import { CATEGORIE_ARTICLE_LABEL, type ArticleListItem } from '@/lib/sanity/types'
import { cn } from '@/lib/utils'

type Props = {
  article: ArticleListItem
  large?: boolean
}

export function ArticleCard({ article, large = false }: Props) {
  const date = formatDateFR(article.datePublication)
  const href = article.slug ? `/actualites/${article.slug}` : '/actualites'

  return (
    <Link
      href={href}
      className={cn(
        'group bg-card focus-visible:ring-ring focus-visible:ring-offset-background block overflow-hidden rounded-[var(--radius-lg)] transition-all hover:-translate-y-1 hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2',
        large ? 'lg:grid lg:grid-cols-2 lg:gap-0' : '',
      )}
    >
      <div
        className={cn(
          'bg-muted relative w-full overflow-hidden',
          large ? 'aspect-[16/10] lg:aspect-auto lg:h-full' : 'aspect-[4/3]',
        )}
      >
        {article.imagePrincipale ? (
          <SanityImage
            value={article.imagePrincipale}
            width={large ? 1200 : 600}
            sizes={large ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 33vw, 100vw'}
            className="size-full"
          />
        ) : null}
      </div>
      <div className={cn('p-6', large ? 'lg:p-10' : '')}>
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
        <h2
          className={cn(
            'font-display text-foreground group-hover:text-primary mt-3 line-clamp-2 transition-colors',
            large ? 'text-3xl' : 'text-xl',
          )}
        >
          {article.titre}
        </h2>
        {article.chapo ? (
          <p
            className={cn(
              'text-muted-foreground mt-2 line-clamp-3',
              large ? 'text-lg' : 'text-base',
            )}
          >
            {article.chapo}
          </p>
        ) : null}
      </div>
    </Link>
  )
}
