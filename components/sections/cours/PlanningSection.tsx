'use client'

import { useState } from 'react'
import { CalendarDays, ListFilter } from 'lucide-react'

import { CoursDetailDialog } from '@/components/cours/CoursDetailDialog'
import { InscriptionDialog } from '@/components/cours/InscriptionDialog'
import { PlanningGrille } from '@/components/cours/PlanningGrille'
import { PlanningListe } from '@/components/cours/PlanningListe'
import { cn } from '@/lib/utils'
import type { CoursWithDetails, DocumentTelechargeable } from '@/lib/sanity/types'

type Props = {
  cours: CoursWithDetails[]
  inscriptionDoc: DocumentTelechargeable | null
  certificatDoc: DocumentTelechargeable | null
}

type View = 'grille' | 'liste'

export function PlanningSection({ cours, inscriptionDoc, certificatDoc }: Props) {
  const [view, setView] = useState<View>('grille')
  const [selectedCours, setSelectedCours] = useState<CoursWithDetails | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [inscriptionOpen, setInscriptionOpen] = useState(false)

  const openDetail = (c: CoursWithDetails) => {
    setSelectedCours(c)
    setDetailOpen(true)
  }
  const openInscription = () => setInscriptionOpen(true)

  return (
    <section
      id="planning"
      aria-labelledby="planning-title"
      className="bg-card relative isolate scroll-mt-24"
    >
      <div className="container-content relative py-20 md:py-28">
        {/* Header éditorial */}
        <div className="mb-10 flex items-baseline gap-4 md:mb-14">
          <p className="text-primary shrink-0 text-xs font-semibold tracking-[0.3em] uppercase">
            — Planning
          </p>
          <span
            aria-hidden="true"
            className="flex-1 border-t border-dashed border-[color:color-mix(in_oklab,var(--color-primary)_25%,transparent)]"
          />
        </div>

        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2
              id="planning-title"
              className="font-display text-foreground text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.025em]"
            >
              Le planning de la semaine
            </h2>
            <p className="text-foreground/70 mt-5 text-lg leading-[1.6]">
              Choisissez la vue qui vous convient. Cliquez sur un cours pour voir le détail.
            </p>
          </div>

          {/* Toggle vue grille/liste, format pill éditorial */}
          <div
            role="tablist"
            aria-label="Choisir la vue du planning"
            className="border-foreground/10 bg-background/60 inline-flex shrink-0 items-center gap-1 rounded-full border p-1"
          >
            <ViewTab
              value="grille"
              current={view}
              onClick={setView}
              icon={<CalendarDays className="size-4" />}
            >
              Grille
            </ViewTab>
            <ViewTab
              value="liste"
              current={view}
              onClick={setView}
              icon={<ListFilter className="size-4" />}
            >
              Liste
            </ViewTab>
          </div>
        </div>

        <div className="mt-12">
          {view === 'grille' ? (
            <>
              <PlanningGrille cours={cours} onSelectCours={openDetail} />
              <DisciplinesLegende cours={cours} />
            </>
          ) : (
            <PlanningListe cours={cours} onSelectCours={openDetail} onInscrire={openInscription} />
          )}
        </div>
      </div>

      <CoursDetailDialog
        cours={selectedCours}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onInscrire={openInscription}
      />
      <InscriptionDialog
        open={inscriptionOpen}
        onOpenChange={setInscriptionOpen}
        inscriptionDoc={inscriptionDoc}
        certificatDoc={certificatDoc}
      />
    </section>
  )
}

function ViewTab({
  value,
  current,
  onClick,
  icon,
  children,
}: {
  value: View
  current: View
  onClick: (v: View) => void
  icon: React.ReactNode
  children: React.ReactNode
}) {
  const active = current === value
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={() => onClick(value)}
      className={cn(
        'focus-visible:ring-ring inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-semibold tracking-wide transition-all focus-visible:ring-2 focus-visible:outline-none',
        active
          ? 'bg-foreground text-background shadow-sm'
          : 'text-foreground/65 hover:text-foreground',
      )}
    >
      {icon}
      <span>{children}</span>
    </button>
  )
}

function DisciplinesLegende({ cours }: { cours: CoursWithDetails[] }) {
  const map = new Map<string, { nom: string; couleur: string }>()
  for (const c of cours) {
    const slug = c.discipline?.slug
    const nom = c.discipline?.nom
    if (slug && nom && !map.has(slug)) {
      map.set(slug, { nom, couleur: c.discipline?.couleur ?? 'var(--color-primary)' })
    }
  }
  const items = Array.from(map.values()).sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
  if (items.length === 0) return null

  return (
    <div className="border-foreground/10 mt-8 border-t border-dashed pt-6">
      <p className="text-muted-foreground mb-4 font-mono text-[0.7rem] font-semibold tracking-[0.2em] uppercase">
        Légende
      </p>
      <ul className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
        {items.map((d) => (
          <li key={d.nom} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block size-2.5 rounded-sm"
              style={{ backgroundColor: d.couleur }}
            />
            <span className="text-foreground/80">{d.nom}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
