'use client'

import { useMemo, useState } from 'react'

import { cn } from '@/lib/utils'
import { JOUR_LABEL, JOURS_ORDRE, type CoursJour, type CoursWithDetails } from '@/lib/sanity/types'

const HEURE_DEBUT = 8 // 8h
const HEURE_FIN = 21 // 21h
const STEP_MIN = 15 // pas de la grille en minutes (permet les créneaux à la 1/4 h près)
const ROW_HEIGHT_DESKTOP = 19 // hauteur d'une ligne 15 min en px (≈ 38px par 30 min)

function timeToMinutes(t: string | null): number | null {
  if (!t) return null
  const [h, m] = t.split(':').map(Number)
  if (h === undefined || m === undefined || Number.isNaN(h) || Number.isNaN(m)) return null
  return h * 60 + m
}

const TOTAL_MIN = (HEURE_FIN - HEURE_DEBUT) * 60
const TOTAL_ROWS = TOTAL_MIN / STEP_MIN
const ROW_HEIGHT_PX = ROW_HEIGHT_DESKTOP
const ROWS_PER_HOUR = 60 / STEP_MIN

// Convertit une heure HH:MM en index de ligne CSS Grid (1-based).
// Avec un pas de 15 min, les horaires usuels (XX:00, XX:15, XX:30, XX:45) tombent
// exactement sur une ligne, donc floor suffit.
function rowFromTime(minutes: number): number {
  const offset = Math.max(0, minutes - HEURE_DEBUT * 60)
  return Math.floor(offset / STEP_MIN) + 1
}

type Props = {
  cours: CoursWithDetails[]
  onSelectCours: (cours: CoursWithDetails) => void
}

export function PlanningGrille({ cours, onSelectCours }: Props) {
  // Mobile : on choisit un jour à la fois. Par défaut "lundi".
  const [jourMobile, setJourMobile] = useState<CoursJour>('lundi')

  // Indexe les cours par jour
  const coursParJour = useMemo(() => {
    const map = new Map<CoursJour, CoursWithDetails[]>()
    for (const j of JOURS_ORDRE) map.set(j, [])
    for (const c of cours) {
      if (c.jour && map.has(c.jour)) map.get(c.jour)!.push(c)
    }
    return map
  }, [cours])

  // Heures à afficher en colonne de gauche (toutes les heures pleines)
  const heuresLabels = useMemo(() => {
    const list: { row: number; label: string }[] = []
    for (let h = HEURE_DEBUT; h < HEURE_FIN; h++) {
      list.push({
        row: (h - HEURE_DEBUT) * ROWS_PER_HOUR + 1,
        label: `${String(h).padStart(2, '0')}h`,
      })
    }
    return list
  }, [])

  return (
    <div className="bg-background border-foreground/10 rounded-[var(--radius-lg)] border p-4 shadow-[0_20px_40px_-25px_rgba(15,20,25,0.15)] md:p-7">
      {/* Mobile : segmented control */}
      <div
        role="tablist"
        aria-label="Choisir un jour"
        className="-mx-4 mb-4 flex gap-1 overflow-x-auto px-4 pb-1 md:hidden"
      >
        {JOURS_ORDRE.map((j) => (
          <button
            key={j}
            type="button"
            role="tab"
            aria-selected={jourMobile === j}
            onClick={() => setJourMobile(j)}
            className={cn(
              'inline-flex h-10 shrink-0 items-center rounded-full border px-4 text-sm font-semibold tracking-wide transition-all',
              jourMobile === j
                ? 'bg-foreground text-background border-foreground'
                : 'border-foreground/15 bg-background text-foreground/80 hover:border-foreground/30',
            )}
          >
            {JOUR_LABEL[j]}
          </button>
        ))}
      </div>

      {/* Desktop : grille 7 colonnes */}
      <div className="hidden md:block">
        <DesktopGrid
          coursParJour={coursParJour}
          heuresLabels={heuresLabels}
          onSelectCours={onSelectCours}
        />
      </div>

      {/* Mobile : grille 1 jour */}
      <div className="md:hidden">
        <SingleDayGrid
          jour={jourMobile}
          courses={coursParJour.get(jourMobile) ?? []}
          heuresLabels={heuresLabels}
          onSelectCours={onSelectCours}
        />
      </div>
    </div>
  )
}

function DesktopGrid({
  coursParJour,
  heuresLabels,
  onSelectCours,
}: {
  coursParJour: Map<CoursJour, CoursWithDetails[]>
  heuresLabels: { row: number; label: string }[]
  onSelectCours: (c: CoursWithDetails) => void
}) {
  return (
    <div
      role="grid"
      aria-label="Planning hebdomadaire"
      className="grid"
      style={{
        gridTemplateColumns: '64px repeat(6, minmax(0, 1fr))',
        gridTemplateRows: `auto repeat(${TOTAL_ROWS}, ${ROW_HEIGHT_PX}px)`,
      }}
    >
      {/* En-têtes des jours — sticky pour rester visible au scroll.
          top aligné sur la hauteur du header en mode "scrolled" (56px / 64px),
          + pt pour absorber visuellement la transition vers la hauteur normale. */}
      <div
        role="columnheader"
        aria-label="Heures"
        className="bg-background border-foreground/15 sticky top-14 z-20 border-b py-5 md:top-16"
        style={{ gridColumn: '1 / 2', gridRow: '1 / 2' }}
      >
        <span className="sr-only">Heures</span>
      </div>
      {JOURS_ORDRE.map((j, i) => (
        <div
          key={j}
          role="columnheader"
          className="bg-background border-foreground/15 text-foreground sticky top-14 z-20 flex items-center justify-center border-b py-5 text-center font-mono text-[0.75rem] font-semibold tracking-[0.2em] uppercase md:top-16"
          style={{ gridColumn: `${i + 2} / span 1` }}
        >
          {JOUR_LABEL[j]}
        </div>
      ))}

      {/* Séparateurs verticaux entre les jours */}
      {JOURS_ORDRE.map((_, i) =>
        i === 0 ? null : (
          <div
            key={`sep-${i}`}
            aria-hidden="true"
            className="border-foreground/10 border-l border-dashed"
            style={{
              gridColumn: `${i + 2} / span 1`,
              gridRow: `2 / span ${TOTAL_ROWS}`,
            }}
          />
        ),
      )}

      {/* Labels horaires + lignes de fond */}
      {heuresLabels.map(({ row, label }) => (
        <div
          key={`h-${label}`}
          className="border-foreground/10 text-muted-foreground border-t border-dashed pt-1 pr-2 text-right font-mono text-[0.7rem] tracking-wider"
          style={{ gridColumn: '1 / 2', gridRow: `${row + 1} / span ${ROWS_PER_HOUR}` }}
        >
          {label}
        </div>
      ))}

      {/* Lignes de fond pour les colonnes jours (zebra) */}
      {JOURS_ORDRE.map((_, i) =>
        heuresLabels.map(({ row }) => (
          <div
            key={`bg-${i}-${row}`}
            aria-hidden="true"
            className="border-foreground/8 border-t border-dashed"
            style={{ gridColumn: `${i + 2} / span 1`, gridRow: `${row + 1} / span ${ROWS_PER_HOUR}` }}
          />
        )),
      )}

      {/* Cellules cours */}
      {JOURS_ORDRE.map((jour, dayIndex) =>
        renderDayCells(coursParJour.get(jour) ?? [], dayIndex + 2, onSelectCours),
      )}
    </div>
  )
}

function SingleDayGrid({
  jour,
  courses,
  heuresLabels,
  onSelectCours,
}: {
  jour: CoursJour
  courses: CoursWithDetails[]
  heuresLabels: { row: number; label: string }[]
  onSelectCours: (c: CoursWithDetails) => void
}) {
  return (
    <div
      role="grid"
      aria-label={`Planning du ${JOUR_LABEL[jour]}`}
      className="grid"
      style={{
        gridTemplateColumns: '52px 1fr',
        gridTemplateRows: `repeat(${TOTAL_ROWS}, ${ROW_HEIGHT_PX}px)`,
      }}
    >
      {heuresLabels.map(({ row, label }) => (
        <div
          key={`h-${label}`}
          className="border-foreground/10 text-muted-foreground border-t border-dashed pt-1 pr-2 text-right font-mono text-[0.7rem] tracking-wider"
          style={{ gridColumn: '1 / 2', gridRow: `${row} / span ${ROWS_PER_HOUR}` }}
        >
          {label}
        </div>
      ))}
      {heuresLabels.map(({ row }) => (
        <div
          key={`bg-${row}`}
          aria-hidden="true"
          className="border-border/60 border-t border-dashed"
          style={{ gridColumn: '2 / 3', gridRow: `${row} / span ${ROWS_PER_HOUR}` }}
        />
      ))}
      {renderDayCells(courses, 2, onSelectCours, /* offsetRow */ -1)}
      {courses.length === 0 ? (
        <div
          className="text-muted-foreground flex items-center justify-center text-sm"
          style={{ gridColumn: '2 / 3', gridRow: '1 / -1' }}
        >
          Aucun cours ce jour.
        </div>
      ) : null}
    </div>
  )
}

// Génère les cellules cours pour un jour donné, avec gestion des conflits
// (subdivision verticale de la colonne).
function renderDayCells(
  courses: CoursWithDetails[],
  gridColumn: number,
  onSelectCours: (c: CoursWithDetails) => void,
  offsetRow = 0,
) {
  type Positioned = {
    cours: CoursWithDetails
    rowStart: number
    rowEnd: number
    column: number
    columnSpan: number
  }
  // Trie par heure de début pour positionner
  const sorted = [...courses]
    .map((c) => {
      const start = timeToMinutes(c.heureDebut)
      const end = timeToMinutes(c.heureFin)
      return { c, start, end }
    })
    .filter(
      (x): x is { c: CoursWithDetails; start: number; end: number } =>
        x.start !== null && x.end !== null && x.end > x.start,
    )
    .sort((a, b) => a.start - b.start)

  // Détection de conflits : groupe de cours qui se chevauchent ⇒ subdivision en N colonnes
  const positioned: Positioned[] = []
  let groupEnd = -1
  let groupStartIdx = 0
  for (let i = 0; i < sorted.length; i++) {
    const { c, start, end } = sorted[i]!
    if (start >= groupEnd) {
      // Nouveau groupe
      groupEnd = end
      groupStartIdx = i
      positioned.push({
        cours: c,
        rowStart: rowFromTime(start) + 1 + offsetRow,
        rowEnd: rowFromTime(end) + 1 + offsetRow,
        column: 0,
        columnSpan: 1,
      })
    } else {
      // En conflit avec le groupe précédent
      groupEnd = Math.max(groupEnd, end)
      const idxInGroup = i - groupStartIdx
      positioned.push({
        cours: c,
        rowStart: rowFromTime(start) + 1 + offsetRow,
        rowEnd: rowFromTime(end) + 1 + offsetRow,
        column: idxInGroup,
        columnSpan: 1,
      })
      // Met à jour columnSpan total pour ce groupe (utilisé pour calcul largeur)
      const groupSize = i - groupStartIdx + 1
      for (let k = groupStartIdx; k <= i; k++) {
        positioned[k]!.columnSpan = groupSize
      }
    }
  }

  return positioned.map(({ cours, rowStart, rowEnd, column, columnSpan }) => {
    const couleur = cours.discipline?.couleur ?? 'var(--color-primary)'
    const duration = rowEnd - rowStart // nombre de demi-heures
    const isShort = duration <= 2 // <= 1h
    const isNarrow = columnSpan > 1 // cellule en sous-colonne (conflit)
    return (
      <button
        key={cours._id}
        type="button"
        onClick={() => onSelectCours(cours)}
        className={cn(
          'group/cell relative m-0.5 flex flex-col items-start justify-start overflow-hidden rounded-lg text-left transition-all duration-200',
          'hover:z-10 hover:scale-[1.02] hover:shadow-[0_8px_20px_-6px_rgba(15,20,25,0.25)]',
          'focus-visible:ring-ring focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none',
          isShort ? 'px-1.5 py-1' : isNarrow ? 'px-1.5 py-1.5' : 'px-2.5 py-2',
        )}
        style={{
          gridColumn: `${gridColumn} / span 1`,
          gridRow: `${rowStart} / ${rowEnd}`,
          backgroundColor: `color-mix(in oklab, ${couleur} 16%, var(--color-background))`,
          color: `color-mix(in oklab, ${couleur} 80%, var(--color-foreground))`,
          borderLeft: `3px solid ${couleur}`,
          // Subdivision si conflit
          width: isNarrow ? `calc(${100 / columnSpan}% - 4px)` : undefined,
          marginLeft: isNarrow ? `calc(${(column * 100) / columnSpan}%)` : undefined,
        }}
        aria-label={`${cours.titre ?? 'Cours'} — ${cours.heureDebut} à ${cours.heureFin}`}
      >
        <span
          className={cn(
            'block leading-[1.1] font-bold tracking-tight hyphens-auto',
            isNarrow
              ? 'text-[0.68rem]'
              : isShort
                ? 'text-[0.72rem]'
                : 'text-[0.78rem]',
          )}
          style={{ wordBreak: 'break-word' }}
          lang="fr"
          title={cours.titre ?? undefined}
        >
          {cours.titre}
        </span>
        {!isShort ? (
          <span
            className={cn(
              'mt-1 font-mono whitespace-nowrap tracking-wider opacity-70',
              isNarrow ? 'text-[0.58rem]' : 'text-[0.65rem]',
            )}
          >
            {cours.heureDebut}–{cours.heureFin}
          </span>
        ) : (
          <span
            className={cn(
              'mt-0.5 font-mono whitespace-nowrap tracking-wider opacity-65',
              isNarrow ? 'text-[0.55rem]' : 'text-[0.6rem]',
            )}
          >
            {cours.heureDebut}–{cours.heureFin}
          </span>
        )}
      </button>
    )
  })
}
