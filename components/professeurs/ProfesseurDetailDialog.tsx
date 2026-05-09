'use client'

import Link from 'next/link'
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
import { JOUR_LABEL, type ProfesseurWithCours } from '@/lib/sanity/types'

type Props = {
  professeur: ProfesseurWithCours | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProfesseurDetailDialog({ professeur, open, onOpenChange }: Props) {
  if (!professeur) return null
  const fullName = [professeur.prenom, professeur.nom].filter(Boolean).join(' ')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-4">
            {professeur.photo ? (
              <div className="relative size-16 shrink-0 overflow-hidden rounded-full">
                <SanityImage value={professeur.photo} fill width={128} height={128} sizes="64px" />
              </div>
            ) : (
              <div className="bg-primary/10 text-primary flex size-16 shrink-0 items-center justify-center rounded-full font-semibold">
                {(professeur.prenom?.[0] ?? '') + (professeur.nom?.[0] ?? '')}
              </div>
            )}
            <div>
              <DialogTitle className="font-display text-2xl">{fullName}</DialogTitle>
              <DialogDescription className="sr-only">Fiche professeur</DialogDescription>
              {professeur.specialites && professeur.specialites.length > 0 ? (
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {professeur.specialites.map((s) => {
                    const couleur = s.couleur ?? 'var(--color-primary)'
                    return (
                      <Badge
                        key={s._id}
                        className="border font-medium"
                        style={{
                          backgroundColor: `${couleur}1F`,
                          color: couleur,
                          borderColor: `${couleur}55`,
                        }}
                      >
                        {s.nom}
                      </Badge>
                    )
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </DialogHeader>

        {/* Bio */}
        {professeur.bio && professeur.bio.length > 0 ? (
          <div className="prose-rich">
            <PortableText value={professeur.bio} />
          </div>
        ) : (
          <p className="text-muted-foreground italic">Biographie à venir.</p>
        )}

        {/* Cours dispensés */}
        {professeur.cours.length > 0 ? (
          <div>
            <h3 className="font-display text-foreground text-lg">Cours dispensés</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {professeur.cours.map((c) => {
                const couleur = c.discipline?.couleur ?? 'var(--color-primary)'
                return (
                  <li
                    key={c._id}
                    className="border-border bg-card/60 flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-md border p-3 text-sm"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block size-3 shrink-0 rounded-sm"
                      style={{ backgroundColor: couleur }}
                    />
                    <span className="text-foreground font-semibold">{c.titre}</span>
                    {c.jour ? (
                      <span className="text-muted-foreground inline-flex items-center gap-1">
                        <Clock className="size-3.5" aria-hidden="true" />
                        {JOUR_LABEL[c.jour]}
                        {c.heureDebut && c.heureFin ? ` · ${c.heureDebut}–${c.heureFin}` : ''}
                      </span>
                    ) : null}
                    {c.lieu ? (
                      <span className="text-muted-foreground inline-flex items-center gap-1">
                        <MapPin className="size-3.5" aria-hidden="true" />
                        {c.lieu}
                      </span>
                    ) : null}
                  </li>
                )
              })}
            </ul>
          </div>
        ) : null}

        <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
          <Button asChild variant="link" className="self-start">
            <Link href="/cours" onClick={() => onOpenChange(false)}>
              Voir le planning complet
            </Link>
          </Button>
          <DialogClose asChild>
            <Button variant="ghost">Fermer</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
