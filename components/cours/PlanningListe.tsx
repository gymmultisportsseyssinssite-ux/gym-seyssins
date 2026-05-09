'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs'
import { ArrowRight, Clock, MapPin, X } from 'lucide-react'

import { SanityImage } from '@/components/shared/SanityImage'
import {
  JOUR_LABEL,
  JOURS_ORDRE,
  NIVEAU_LABEL,
  type CoursWithDetails,
  type NiveauRequis,
} from '@/lib/sanity/types'
import { cn } from '@/lib/utils'

import { StatutBadge } from './StatutBadge'

const NIVEAUX: NiveauRequis[] = ['tous', 'débutant', 'intermédiaire', 'avancé']

type Props = {
  cours: CoursWithDetails[]
  onSelectCours: (cours: CoursWithDetails) => void
  onInscrire: () => void
}

export function PlanningListe({ cours, onSelectCours, onInscrire }: Props) {
  const disciplinesDispo = useMemo(() => {
    const map = new Map<string, { slug: string; nom: string; couleur: string }>()
    for (const c of cours) {
      const slug = c.discipline?.slug
      const nom = c.discipline?.nom
      if (slug && nom && !map.has(slug)) {
        map.set(slug, { slug, nom, couleur: c.discipline?.couleur ?? 'var(--color-primary)' })
      }
    }
    return Array.from(map.values()).sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
  }, [cours])

  const [filters, setFilters] = useQueryStates(
    {
      d: parseAsArrayOf(parseAsString).withDefault([]),
      j: parseAsArrayOf(parseAsString).withDefault([]),
      n: parseAsArrayOf(parseAsString).withDefault([]),
    },
    { shallow: true, clearOnDefault: true },
  )

  const hasFilters = filters.d.length > 0 || filters.j.length > 0 || filters.n.length > 0

  const filtres = (key: 'd' | 'j' | 'n', value: string) => {
    const current = filters[key]
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    setFilters({ [key]: next })
  }

  const filtered = useMemo(() => {
    return cours.filter((c) => {
      if (filters.d.length > 0 && !filters.d.includes(c.discipline?.slug ?? '')) return false
      if (filters.j.length > 0 && (!c.jour || !filters.j.includes(c.jour))) return false
      if (filters.n.length > 0) {
        const niveau = c.discipline?.niveauRequis ?? ''
        if (!filters.n.includes(niveau)) return false
      }
      return true
    })
  }, [cours, filters])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const ja = a.jour ? JOURS_ORDRE.indexOf(a.jour) : 99
      const jb = b.jour ? JOURS_ORDRE.indexOf(b.jour) : 99
      if (ja !== jb) return ja - jb
      return (a.heureDebut ?? '').localeCompare(b.heureDebut ?? '')
    })
  }, [filtered])

  return (
    <div>
      {/* Filtres */}
      <div className="bg-background border-foreground/10 rounded-[var(--radius-lg)] border p-5 shadow-[0_20px_40px_-25px_rgba(15,20,25,0.12)] md:p-6">
        <FilterRow label="Discipline">
          {disciplinesDispo.map((d) => (
            <Chip
              key={d.slug}
              active={filters.d.includes(d.slug)}
              onClick={() => filtres('d', d.slug)}
              accentColor={d.couleur}
            >
              {d.nom}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Jour">
          {JOURS_ORDRE.map((j) => (
            <Chip key={j} active={filters.j.includes(j)} onClick={() => filtres('j', j)}>
              {JOUR_LABEL[j]}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Niveau">
          {NIVEAUX.map((n) => (
            <Chip key={n} active={filters.n.includes(n)} onClick={() => filtres('n', n)}>
              {NIVEAU_LABEL[n]}
            </Chip>
          ))}
        </FilterRow>
        {hasFilters ? (
          <button
            type="button"
            onClick={() => setFilters({ d: [], j: [], n: [] })}
            className="text-foreground/60 hover:text-foreground mt-2 inline-flex items-center gap-1.5 font-mono text-[0.7rem] font-semibold tracking-wider uppercase transition-colors"
          >
            <X className="size-3" aria-hidden="true" />
            Réinitialiser
          </button>
        ) : null}
      </div>

      {/* Annonce du nombre de résultats */}
      <p
        aria-live="polite"
        className="text-muted-foreground mt-6 font-mono text-[0.75rem] font-semibold tracking-[0.18em] uppercase"
        role="status"
      >
        {sorted.length} cours{hasFilters ? ' filtré' + (sorted.length > 1 ? 's' : '') : ''}
      </p>

      {/* Liste */}
      {sorted.length === 0 ? (
        <p className="border-foreground/10 bg-background text-muted-foreground mt-6 rounded-[var(--radius-lg)] border border-dashed p-10 text-center">
          Aucun cours ne correspond aux filtres.
        </p>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-4">
          {sorted.map((c) => {
            const couleur = c.discipline?.couleur ?? 'var(--color-primary)'
            const profNom = [c.professeur?.prenom, c.professeur?.nom].filter(Boolean).join(' ')
            return (
              <li key={c._id} style={{ ['--c' as string]: couleur }}>
                <div className="group/card bg-background border-foreground/10 hover:border-[color:color-mix(in_oklab,var(--c)_35%,transparent)] hover:shadow-[0_20px_40px_-20px_color-mix(in_oklab,var(--c)_25%,transparent)] grid grid-cols-[6px_1fr] overflow-hidden rounded-[var(--radius-lg)] border transition-all">
                  <span aria-hidden="true" style={{ backgroundColor: couleur }} />
                  <div className="grid gap-4 p-6 md:grid-cols-[1fr_auto] md:items-center">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        {c.discipline?.nom ? (
                          <span
                            className="inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.7rem] font-medium tracking-wider uppercase"
                            style={{
                              backgroundColor: `color-mix(in oklab, ${couleur} 8%, transparent)`,
                              color: couleur,
                              borderColor: `color-mix(in oklab, ${couleur} 35%, transparent)`,
                            }}
                          >
                            {c.discipline.nom}
                          </span>
                        ) : null}
                        {c.discipline?.niveauRequis ? (
                          <span className="border-foreground/15 text-foreground/70 inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.7rem] font-medium tracking-wider uppercase">
                            {NIVEAU_LABEL[c.discipline.niveauRequis]}
                          </span>
                        ) : null}
                        <StatutBadge statut={c.statut} />
                      </div>
                      <h3 className="font-display text-foreground mt-3 text-xl font-bold tracking-tight md:text-2xl">
                        {c.titre}
                      </h3>
                      <ul className="text-foreground/65 mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm">
                        {c.jour ? (
                          <li className="flex items-center gap-1.5">
                            <Clock className="text-primary size-4" aria-hidden="true" />
                            <span className="text-foreground font-semibold">
                              {JOUR_LABEL[c.jour]}
                            </span>
                            {c.heureDebut && c.heureFin ? (
                              <span className="text-foreground/65 font-mono text-[0.85rem]">
                                · {c.heureDebut}–{c.heureFin}
                              </span>
                            ) : null}
                          </li>
                        ) : null}
                        {c.lieu ? (
                          <li className="flex items-center gap-1.5">
                            <MapPin className="text-primary size-4" aria-hidden="true" />
                            <span>{c.lieu}</span>
                          </li>
                        ) : null}
                      </ul>
                      {profNom ? (
                        <div className="mt-4 flex items-center gap-2.5 text-sm">
                          {c.professeur?.photo ? (
                            <div className="relative size-8 overflow-hidden rounded-full">
                              <SanityImage
                                value={c.professeur.photo}
                                fill
                                width={64}
                                height={64}
                                sizes="32px"
                              />
                            </div>
                          ) : null}
                          <span className="text-muted-foreground font-mono text-[0.7rem] tracking-wider uppercase">
                            Animé par
                          </span>
                          <Link
                            href="/professeurs"
                            className="text-foreground hover:text-primary font-semibold transition-colors"
                          >
                            {profNom}
                          </Link>
                        </div>
                      ) : null}
                      {typeof c.placesRestantes === 'number' && c.placesRestantes > 0 ? (
                        <p className="text-muted-foreground mt-3 font-mono text-[0.7rem] tracking-wider uppercase">
                          {c.placesRestantes} place{c.placesRestantes > 1 ? 's' : ''} restante
                          {c.placesRestantes > 1 ? 's' : ''}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 md:flex-col md:items-stretch">
                      <button
                        type="button"
                        onClick={onInscrire}
                        disabled={c.statut === 'complet'}
                        className="group/btn bg-foreground text-background hover:bg-primary inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-all disabled:cursor-not-allowed disabled:opacity-50 md:w-full"
                      >
                        <span>S’inscrire</span>
                        <ArrowRight
                          className="size-3.5 transition-transform group-hover/btn:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectCours(c)}
                        className="text-foreground/70 hover:text-foreground inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold tracking-wider uppercase transition-colors md:w-full"
                      >
                        Voir le détail
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 last:mb-0">
      <p className="text-muted-foreground mb-3 font-mono text-[0.7rem] font-semibold tracking-[0.2em] uppercase">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function Chip({
  active,
  onClick,
  children,
  accentColor,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  accentColor?: string
}) {
  const couleur = accentColor ?? 'var(--color-primary)'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex h-9 items-center rounded-full border px-3.5 text-sm font-medium transition-all',
        'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        active
          ? 'border-transparent text-white shadow-sm'
          : 'border-foreground/15 bg-background text-foreground/80 hover:border-foreground/30',
      )}
      style={
        active
          ? { backgroundColor: couleur, borderColor: couleur }
          : { borderColor: `color-mix(in oklab, ${couleur} 25%, transparent)` }
      }
    >
      {children}
    </button>
  )
}
