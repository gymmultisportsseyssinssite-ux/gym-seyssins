'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs'
import { Clock, MapPin, X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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
  // Extraire les disciplines uniques présentes
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

  // Tri jour puis heure
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
      <div className="border-border bg-card rounded-[var(--radius-lg)] border p-4 md:p-5">
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
          <div className="mt-2">
            <Button variant="ghost" size="sm" onClick={() => setFilters({ d: [], j: [], n: [] })}>
              <X className="size-4" aria-hidden="true" />
              Réinitialiser les filtres
            </Button>
          </div>
        ) : null}
      </div>

      {/* Annonce du nombre de résultats */}
      <p aria-live="polite" className="text-muted-foreground mt-6 text-sm" role="status">
        {sorted.length} cours
        {hasFilters ? ' filtré' + (sorted.length > 1 ? 's' : '') : ''}
      </p>

      {/* Liste */}
      {sorted.length === 0 ? (
        <p className="border-border bg-muted/40 text-muted-foreground mt-6 rounded-[var(--radius-lg)] border border-dashed p-10 text-center">
          Aucun cours ne correspond aux filtres.
        </p>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-4">
          {sorted.map((c) => {
            const couleur = c.discipline?.couleur ?? 'var(--color-primary)'
            const profNom = [c.professeur?.prenom, c.professeur?.nom].filter(Boolean).join(' ')
            return (
              <li key={c._id}>
                <Card className="grid grid-cols-[6px_1fr] overflow-hidden">
                  <span aria-hidden="true" style={{ backgroundColor: couleur }} />
                  <div className="grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        {c.discipline?.nom ? (
                          <Badge
                            className="border font-medium"
                            style={{
                              backgroundColor: `${couleur}1F`,
                              color: couleur,
                              borderColor: `${couleur}55`,
                            }}
                          >
                            {c.discipline.nom}
                          </Badge>
                        ) : null}
                        {c.discipline?.niveauRequis ? (
                          <Badge variant="secondary" className="bg-muted text-muted-foreground">
                            {NIVEAU_LABEL[c.discipline.niveauRequis]}
                          </Badge>
                        ) : null}
                        <StatutBadge statut={c.statut} />
                      </div>
                      <h3 className="font-display text-foreground mt-2 text-xl">{c.titre}</h3>
                      <ul className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
                        {c.jour ? (
                          <li className="flex items-center gap-1.5">
                            <Clock className="size-4" aria-hidden="true" />
                            {JOUR_LABEL[c.jour]}
                            {c.heureDebut && c.heureFin ? ` · ${c.heureDebut} – ${c.heureFin}` : ''}
                          </li>
                        ) : null}
                        {c.lieu ? (
                          <li className="flex items-center gap-1.5">
                            <MapPin className="size-4" aria-hidden="true" />
                            {c.lieu}
                          </li>
                        ) : null}
                      </ul>
                      {profNom ? (
                        <div className="mt-3 flex items-center gap-2 text-sm">
                          {c.professeur?.photo ? (
                            <div className="size-8 overflow-hidden rounded-full">
                              <SanityImage
                                value={c.professeur.photo}
                                width={64}
                                height={64}
                                className="size-full"
                              />
                            </div>
                          ) : null}
                          <span className="text-muted-foreground">Animé par</span>
                          <Link
                            href="/professeurs"
                            className="text-foreground hover:text-primary font-medium hover:underline"
                          >
                            {profNom}
                          </Link>
                        </div>
                      ) : null}
                      {typeof c.placesRestantes === 'number' && c.placesRestantes > 0 ? (
                        <p className="text-muted-foreground mt-2 text-xs">
                          {c.placesRestantes} place{c.placesRestantes > 1 ? 's' : ''} restante
                          {c.placesRestantes > 1 ? 's' : ''}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 md:flex-col md:items-stretch">
                      <Button size="sm" onClick={onInscrire} disabled={c.statut === 'complet'}>
                        S’inscrire
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => onSelectCours(c)}>
                        Voir le détail
                      </Button>
                    </div>
                  </div>
                </Card>
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
    <div className="mb-3 last:mb-0">
      <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
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
        'inline-flex h-9 items-center rounded-full border px-3 text-sm font-medium transition-colors',
        'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        active
          ? 'border-transparent text-white'
          : 'border-border bg-card text-foreground hover:bg-muted',
      )}
      style={
        active
          ? { backgroundColor: couleur, borderColor: couleur }
          : { borderColor: `${couleur}55` }
      }
    >
      {children}
    </button>
  )
}
