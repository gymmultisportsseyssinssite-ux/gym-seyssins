'use client'

import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SanityImage } from '@/components/shared/SanityImage'
import type { ProfesseurWithCours } from '@/lib/sanity/types'

import { ProfesseurDetailDialog } from './ProfesseurDetailDialog'

function blocksToText(blocks: unknown): string {
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

export function ProfesseursGrid({ professeurs }: { professeurs: ProfesseurWithCours[] }) {
  const [selected, setSelected] = useState<ProfesseurWithCours | null>(null)
  const [open, setOpen] = useState(false)

  const ouvrir = (p: ProfesseurWithCours) => {
    setSelected(p)
    setOpen(true)
  }

  if (professeurs.length === 0) {
    return (
      <p className="border-border bg-muted/40 text-muted-foreground rounded-[var(--radius-lg)] border border-dashed p-10 text-center">
        L’équipe sera bientôt présentée ici.
      </p>
    )
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {professeurs.map((p) => {
          const fullName = [p.prenom, p.nom].filter(Boolean).join(' ')
          const bioText = blocksToText(p.bio)
          return (
            <li key={p._id}>
              <Card className="group h-full overflow-hidden p-0 transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="bg-muted relative aspect-[4/5] w-full overflow-hidden">
                  {p.photo ? (
                    <SanityImage
                      value={p.photo}
                      fill
                      width={600}
                      height={750}
                      sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                      className="transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="font-display text-muted-foreground flex size-full items-center justify-center text-5xl"
                    >
                      {(p.prenom?.[0] ?? '') + (p.nom?.[0] ?? '')}
                    </div>
                  )}
                </div>
                <CardContent className="p-5">
                  <h2 className="font-display text-foreground text-xl">{fullName}</h2>
                  {p.specialites && p.specialites.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p.specialites.map((s) => {
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
                  {bioText ? (
                    <p className="text-muted-foreground mt-3 line-clamp-2 text-sm leading-relaxed">
                      {bioText}
                    </p>
                  ) : null}
                  {p.cours.length > 0 ? (
                    <p className="text-muted-foreground mt-3 text-xs">
                      {p.cours.length} cours dispensé{p.cours.length > 1 ? 's' : ''}
                    </p>
                  ) : null}
                  <div className="mt-4">
                    <Button variant="link" className="px-0" onClick={() => ouvrir(p)}>
                      Lire la suite
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </li>
          )
        })}
      </ul>
      <ProfesseurDetailDialog professeur={selected} open={open} onOpenChange={setOpen} />
    </>
  )
}
