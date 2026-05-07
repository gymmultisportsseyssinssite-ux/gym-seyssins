'use client'

import { useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CoursDetailDialog } from '@/components/cours/CoursDetailDialog'
import { InscriptionDialog } from '@/components/cours/InscriptionDialog'
import { PlanningGrille } from '@/components/cours/PlanningGrille'
import { PlanningListe } from '@/components/cours/PlanningListe'
import type { CoursWithDetails, DocumentTelechargeable } from '@/lib/sanity/types'

type Props = {
  cours: CoursWithDetails[]
  inscriptionDoc: DocumentTelechargeable | null
  certificatDoc: DocumentTelechargeable | null
}

export function PlanningSection({ cours, inscriptionDoc, certificatDoc }: Props) {
  const [selectedCours, setSelectedCours] = useState<CoursWithDetails | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [inscriptionOpen, setInscriptionOpen] = useState(false)

  const openDetail = (c: CoursWithDetails) => {
    setSelectedCours(c)
    setDetailOpen(true)
  }
  const openInscription = () => setInscriptionOpen(true)

  return (
    <section aria-labelledby="planning-title" className="bg-background">
      <div className="container-content py-16 md:py-20">
        <div className="mb-8 max-w-2xl">
          <p className="text-primary text-sm font-medium tracking-wide uppercase">Planning</p>
          <h2
            id="planning-title"
            className="font-display text-foreground mt-3 text-[length:var(--text-3xl)]"
          >
            Le planning de la semaine
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Choisissez la vue qui vous convient. Cliquez sur un cours pour voir le détail.
          </p>
        </div>

        <Tabs defaultValue="grille" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-2 md:max-w-sm">
            <TabsTrigger value="grille">Vue grille</TabsTrigger>
            <TabsTrigger value="liste">Vue liste</TabsTrigger>
          </TabsList>

          <TabsContent value="grille" className="focus-visible:outline-none">
            <PlanningGrille cours={cours} onSelectCours={openDetail} />
            {/* Légende */}
            <DisciplinesLegende cours={cours} />
          </TabsContent>

          <TabsContent value="liste" className="focus-visible:outline-none">
            <PlanningListe cours={cours} onSelectCours={openDetail} onInscrire={openInscription} />
          </TabsContent>
        </Tabs>
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
    <ul className="text-muted-foreground mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
      <li className="text-foreground font-medium">Légende :</li>
      {items.map((d) => (
        <li key={d.nom} className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="inline-block size-3 rounded-sm"
            style={{ backgroundColor: d.couleur }}
          />
          {d.nom}
        </li>
      ))}
    </ul>
  )
}
