import Link from 'next/link'

import { homeContent } from '@/content/home'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getDisciplines } from '@/lib/sanity/fetch'
import { urlFor } from '@/lib/sanity/image'

const NIVEAU_LABELS: Record<string, string> = {
  tous: 'Tous niveaux',
  débutant: 'Débutant',
  intermédiaire: 'Intermédiaire',
  avancé: 'Avancé',
}

function descriptionToText(blocks: unknown): string {
  if (!Array.isArray(blocks)) return ''
  return blocks
    .filter((b): b is { _type: 'block'; children: { text?: string }[] } =>
      Boolean(
        b && typeof b === 'object' && '_type' in b && (b as { _type: string })._type === 'block',
      ),
    )
    .flatMap((b) => b.children?.map((c) => c.text ?? '') ?? [])
    .join(' ')
    .trim()
}

type Discipline = {
  _id: string
  nom: string | null
  slug: string | null
  description: unknown
  couleur: string | null
  niveauRequis: string | null
  icone: { asset?: { _ref?: string; url?: string } } | null
}

export async function HomeCoursPreview() {
  const { cours } = homeContent
  const raw = (await getDisciplines().catch(() => [])) ?? []
  const disciplines = raw as unknown as Discipline[]
  const visibles = disciplines.slice(0, 6)

  return (
    <section aria-labelledby="home-cours-title" className="bg-background">
      <div className="container-content py-16 md:py-24">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-primary text-sm font-medium tracking-wide uppercase">
              {cours.eyebrow}
            </p>
            <h2
              id="home-cours-title"
              className="font-display text-foreground mt-3 text-[length:var(--text-3xl)]"
            >
              {cours.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">{cours.subtitle}</p>
          </div>
        </div>

        {visibles.length === 0 ? (
          <p className="text-muted-foreground mt-10">
            Aucune discipline n’est encore publiée. Les disciplines créées dans le Studio
            apparaîtront automatiquement ici.
          </p>
        ) : (
          <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibles.map((d) => {
              const description = descriptionToText(d.description as unknown)
              const couleur = d.couleur ?? 'var(--color-primary)'
              const niveau = NIVEAU_LABELS[d.niveauRequis ?? 'tous'] ?? 'Tous niveaux'
              const iconUrl = d.icone?.asset
                ? urlFor(d.icone as Parameters<typeof urlFor>[0])
                    .width(120)
                    .height(120)
                    .url()
                : null

              return (
                <li key={d._id}>
                  <Card className="group relative h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                    <span
                      aria-hidden="true"
                      className="absolute top-0 left-0 h-1 w-full"
                      style={{ backgroundColor: couleur }}
                    />
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div
                          aria-hidden="true"
                          className="flex size-12 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${couleur}22`, color: couleur }}
                        >
                          {iconUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={iconUrl} alt="" className="size-7" />
                          ) : (
                            <span className="font-display text-xl">{d.nom?.[0] ?? '•'}</span>
                          )}
                        </div>
                        <CardTitle className="font-display text-xl">{d.nom}</CardTitle>
                      </div>
                      {description ? (
                        <CardDescription className="mt-2 line-clamp-2 text-base">
                          {description}
                        </CardDescription>
                      ) : null}
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary" className="bg-muted text-muted-foreground">
                        {niveau}
                      </Badge>
                    </CardContent>
                  </Card>
                </li>
              )
            })}
          </ul>
        )}

        <div className="mt-12 flex justify-center">
          <Button asChild variant="secondary" size="lg">
            <Link href={cours.cta.href}>{cours.cta.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
