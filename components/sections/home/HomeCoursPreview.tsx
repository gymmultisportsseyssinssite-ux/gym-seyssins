import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

import { homeContent } from '@/content/home'
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
    <section aria-labelledby="home-cours-title" className="bg-background relative isolate overflow-hidden">
      <div className="container-content relative py-12 md:py-16 lg:py-20">
        {/* Header éditorial */}
        <div className="mb-12 flex items-baseline gap-6 md:mb-16">
          <span
            aria-hidden="true"
            className="font-display text-primary/15 text-[5rem] leading-none font-light tracking-tighter md:text-[7rem]"
          >
            02
          </span>
          <div className="flex-1 border-t border-dashed border-[color:color-mix(in_oklab,var(--color-primary)_25%,transparent)] pt-3">
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
              {cours.eyebrow}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2
              id="home-cours-title"
              className="font-display text-foreground text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.025em]"
            >
              {cours.title}
            </h2>
            <p className="text-foreground/70 mt-5 text-lg leading-[1.6]">{cours.subtitle}</p>
          </div>

          <Link
            href={cours.cta.href}
            className="group text-foreground hover:text-primary hidden items-center gap-2 text-sm font-semibold tracking-wide transition-colors md:inline-flex"
          >
            <span className="relative">
              {cours.cta.label}
              <span
                aria-hidden="true"
                className="bg-foreground group-hover:bg-primary absolute right-0 -bottom-1 left-0 h-px origin-left scale-x-100 transition-transform group-hover:scale-x-0"
              />
              <span
                aria-hidden="true"
                className="bg-primary absolute right-0 -bottom-1 left-0 h-px origin-right scale-x-0 transition-transform delay-150 group-hover:origin-left group-hover:scale-x-100"
              />
            </span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        {visibles.length === 0 ? (
          <p className="text-muted-foreground mt-12">
            Aucune discipline n’est encore publiée. Les disciplines créées dans le Studio
            apparaîtront automatiquement ici.
          </p>
        ) : (
          <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visibles.map((d, i) => {
              const description = descriptionToText(d.description as unknown)
              const couleur = d.couleur ?? 'var(--color-primary)'
              const niveau = NIVEAU_LABELS[d.niveauRequis ?? 'tous'] ?? 'Tous niveaux'
              const iconUrl = d.icone?.asset
                ? urlFor(d.icone as Parameters<typeof urlFor>[0])
                    .width(120)
                    .height(120)
                    .url()
                : null
              const num = String(i + 1).padStart(2, '0')

              return (
                <li key={d._id} style={{ ['--c' as string]: couleur }}>
                  <Link
                    href={d.slug ? `/cours#${d.slug}` : '/cours'}
                    className="group focus-visible:ring-ring focus-visible:ring-offset-background relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[color:color-mix(in_oklab,var(--color-foreground)_8%,transparent)] bg-[color-mix(in_oklab,var(--c)_4%,var(--color-card))] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[color:color-mix(in_oklab,var(--c)_40%,transparent)] hover:shadow-[0_30px_60px_-20px_color-mix(in_oklab,var(--c)_30%,transparent)] focus-visible:ring-2 focus-visible:ring-offset-2"
                  >
                    {/* Header : numéro + icône */}
                    <div className="flex items-start justify-between">
                      <span
                        aria-hidden="true"
                        className="font-display text-foreground/15 text-3xl leading-none font-bold tracking-tight transition-colors group-hover:text-[color:color-mix(in_oklab,var(--c)_60%,transparent)]"
                      >
                        {num}
                      </span>
                      <div
                        aria-hidden="true"
                        className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 transition-all group-hover:scale-110"
                        style={{
                          borderColor: `color-mix(in oklab, ${couleur} 35%, transparent)`,
                          color: couleur,
                          backgroundColor: `color-mix(in oklab, ${couleur} 8%, transparent)`,
                        }}
                      >
                        {iconUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={iconUrl} alt="" className="size-5" />
                        ) : (
                          <span className="font-display text-base font-bold">{d.nom?.[0] ?? '•'}</span>
                        )}
                      </div>
                    </div>

                    {/* Titre + trait animé */}
                    <div className="mt-10">
                      <h3 className="font-display text-foreground text-2xl font-bold tracking-tight transition-colors group-hover:text-[color:color-mix(in_oklab,var(--c)_70%,var(--color-foreground))]">
                        {d.nom}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="mt-3 block h-[3px] w-10 origin-left rounded-full transition-all duration-500 group-hover:w-full"
                        style={{ backgroundColor: couleur }}
                      />
                    </div>

                    {/* Description */}
                    {description ? (
                      <p className="text-foreground/70 mt-4 line-clamp-3 flex-1 text-[0.95rem] leading-[1.6]">
                        {description}
                      </p>
                    ) : (
                      <div className="flex-1" />
                    )}

                    {/* Footer : niveau + flèche */}
                    <div className="mt-8 flex items-center justify-between border-t border-dashed border-[color:color-mix(in_oklab,var(--color-foreground)_12%,transparent)] pt-4">
                      <span className="text-muted-foreground font-mono text-[0.7rem] tracking-wider uppercase">
                        {niveau}
                      </span>
                      <span
                        aria-hidden="true"
                        className="bg-foreground/5 group-hover:bg-foreground group-hover:text-background relative flex size-8 items-center justify-center overflow-hidden rounded-full transition-all"
                      >
                        <ArrowUpRight className="absolute size-4 transition-transform duration-300 group-hover:translate-x-4 group-hover:-translate-y-4" />
                        <ArrowUpRight className="absolute size-4 -translate-x-4 translate-y-4 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
                      </span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}

        {/* CTA mobile uniquement (le desktop est en haut) */}
        <div className="mt-12 flex justify-center md:hidden">
          <Link
            href={cours.cta.href}
            className="group bg-foreground text-background hover:bg-primary inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all"
          >
            <span>{cours.cta.label}</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
