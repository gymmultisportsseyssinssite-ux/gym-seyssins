'use client'

import { Clock, MapPin } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { PortableText } from '@/components/shared/PortableText'
import { SanityImage } from '@/components/shared/SanityImage'
import { JOUR_LABEL, NIVEAU_LABEL, type CoursWithDetails } from '@/lib/sanity/types'

import { StatutBadge } from './StatutBadge'

function dureeMinutes(heureDebut: string | null, heureFin: string | null): number | null {
  if (!heureDebut || !heureFin) return null
  const [h1, m1] = heureDebut.split(':').map(Number)
  const [h2, m2] = heureFin.split(':').map(Number)
  if ([h1, m1, h2, m2].some((v) => v === undefined || Number.isNaN(v))) return null
  const total = h2! * 60 + m2! - (h1! * 60 + m1!)
  return total > 0 ? total : null
}

function formatDuree(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m === 0 ? `${h} h` : `${h} h ${m}`
}

type Props = {
  cours: CoursWithDetails | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onInscrire?: () => void
}

export function CoursDetailDialog({ cours, open, onOpenChange, onInscrire }: Props) {
  if (!cours) return null

  const couleur = cours.discipline?.couleur ?? 'var(--color-primary)'
  const duree = dureeMinutes(cours.heureDebut, cours.heureFin)
  const profPhoto = cours.professeur?.photo
  const profNom = [cours.professeur?.prenom, cours.professeur?.nom].filter(Boolean).join(' ')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-3">
            {cours.discipline?.nom ? (
              <Badge
                className="border font-medium"
                style={{
                  backgroundColor: `${couleur}1F`,
                  color: couleur,
                  borderColor: `${couleur}55`,
                }}
              >
                {cours.discipline.nom}
              </Badge>
            ) : null}
            <StatutBadge statut={cours.statut} />
          </div>
          <DialogTitle className="font-display mt-2 text-2xl">{cours.titre}</DialogTitle>
          <DialogDescription className="sr-only">Détail du cours</DialogDescription>
        </DialogHeader>

        {/* Prof */}
        {profNom ? (
          <div className="bg-muted flex items-center gap-3 rounded-lg px-4 py-3">
            {profPhoto ? (
              <div className="relative size-16 shrink-0 overflow-hidden rounded-full">
                <SanityImage value={profPhoto} fill width={128} height={128} sizes="64px" />
              </div>
            ) : (
              <div className="bg-primary/10 text-primary flex size-16 shrink-0 items-center justify-center rounded-full font-semibold">
                {(cours.professeur?.prenom?.[0] ?? '') + (cours.professeur?.nom?.[0] ?? '')}
              </div>
            )}
            <div>
              <p className="text-muted-foreground text-sm">Animé par</p>
              <p className="text-foreground font-semibold">{profNom}</p>
            </div>
          </div>
        ) : null}

        {/* Infos pratiques */}
        <ul className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          {cours.jour ? (
            <li className="flex items-center gap-2">
              <Clock className="text-primary size-4 shrink-0" aria-hidden="true" />
              <span>
                {JOUR_LABEL[cours.jour]}
                {cours.heureDebut && cours.heureFin
                  ? ` · ${cours.heureDebut} – ${cours.heureFin}`
                  : ''}
                {duree ? ` (${formatDuree(duree)})` : ''}
              </span>
            </li>
          ) : null}
          {cours.lieu ? (
            <li className="flex items-center gap-2">
              <MapPin className="text-primary size-4 shrink-0" aria-hidden="true" />
              <span>{cours.lieu}</span>
            </li>
          ) : null}
          {cours.discipline?.niveauRequis ? (
            <li className="flex items-center gap-2">
              <span className="text-muted-foreground">Niveau :</span>
              <span className="font-medium">{NIVEAU_LABEL[cours.discipline.niveauRequis]}</span>
            </li>
          ) : null}
          {typeof cours.placesRestantes === 'number' ? (
            <li className="flex items-center gap-2">
              <span className="text-muted-foreground">Places restantes :</span>
              <span className="font-medium">{cours.placesRestantes}</span>
            </li>
          ) : null}
        </ul>

        {/* Description */}
        {cours.description && cours.description.length > 0 ? (
          <div className="prose-rich mt-2">
            <PortableText value={cours.description} />
          </div>
        ) : null}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Fermer</Button>
          </DialogClose>
          {cours.statut !== 'complet' ? (
            <Button
              onClick={() => {
                onInscrire?.()
                onOpenChange(false)
              }}
            >
              S’inscrire
            </Button>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
