import type { Metadata } from 'next'
import { Download, FileText, FileType2, HeartPulse, ScrollText } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getAllDocuments } from '@/lib/sanity/fetch'
import type { DocumentTelechargeable } from '@/lib/sanity/types'
import type { DocumentCategorie } from '@/lib/sanity/types'

export const metadata: Metadata = {
  title: 'Documents et formulaires',
  description:
    'Téléchargez la fiche d’inscription, le règlement intérieur et les documents médicaux de la Gym Multisport Seyssins.',
}

const CATEGORIES_ORDRE: { value: DocumentCategorie; label: string; icon: LucideIcon }[] = [
  { value: 'inscription', label: 'Inscriptions', icon: ScrollText },
  { value: 'règlement', label: 'Règlement intérieur', icon: FileText },
  { value: 'médical', label: 'Documents médicaux', icon: HeartPulse },
  { value: 'autre', label: 'Autres', icon: FileType2 },
]

function formatTaille(bytes: number | null): string | null {
  if (!bytes) return null
  if (bytes < 1024) return `${bytes} o`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`
}

type DocumentWithCat = DocumentTelechargeable & {
  categorie: DocumentCategorie
  _updatedAt?: string | null
}

export default async function DocumentsPage() {
  const raw = (await getAllDocuments().catch(() => [])) ?? []
  const docs = raw as unknown as DocumentWithCat[]

  // Groupage par catégorie
  const grouped = new Map<DocumentCategorie, DocumentWithCat[]>()
  for (const cat of CATEGORIES_ORDRE) grouped.set(cat.value, [])
  for (const d of docs) {
    if (d.categorie && grouped.has(d.categorie)) {
      grouped.get(d.categorie)!.push(d)
    }
  }

  const isEmpty = docs.length === 0

  return (
    <>
      <section className="bg-background relative isolate overflow-hidden pt-16 md:pt-18">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-secondary)_12%,transparent),transparent)] blur-2xl"
        />
        <div className="container-content relative pt-2 pb-10 md:pt-3 md:pb-14">
          <div className="mb-5 flex items-baseline gap-4 md:mb-6">
            <p className="text-primary shrink-0 text-xs font-semibold tracking-[0.3em] uppercase">
              — Espace pratique
            </p>
            <span
              aria-hidden="true"
              className="flex-1 border-t border-dashed border-[color:color-mix(in_oklab,var(--color-primary)_25%,transparent)]"
            />
          </div>
          <h1 className="font-display text-foreground max-w-3xl text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.025em]">
            Documents et formulaires
          </h1>
          <p className="text-foreground/70 mt-4 max-w-2xl text-base leading-[1.6] md:text-lg">
            Tous les documents nécessaires à votre adhésion et à la vie de l’association.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-content pb-20 md:pb-28">
          {isEmpty ? (
            <p className="border-border bg-muted/40 text-muted-foreground rounded-[var(--radius-lg)] border border-dashed p-16 text-center">
              Aucun document n’est disponible pour l’instant.
            </p>
          ) : (
            <div className="flex flex-col gap-12">
              {CATEGORIES_ORDRE.map((cat) => {
                const items = grouped.get(cat.value) ?? []
                if (items.length === 0) return null
                const Icon = cat.icon
                return (
                  <div key={cat.value}>
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full"
                      >
                        <Icon className="size-5" />
                      </span>
                      <h2 className="font-display text-foreground text-2xl">{cat.label}</h2>
                    </div>
                    <ul className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                      {items.map((d) => {
                        const taille = formatTaille(d.fichierTaille)
                        const ext = d.fichierExtension?.toUpperCase() ?? null
                        return (
                          <li key={d._id}>
                            <Card className="grid h-full grid-cols-[auto_1fr_auto] items-start gap-4 p-5">
                              <span
                                aria-hidden="true"
                                className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-md"
                              >
                                <FileText className="size-5" />
                              </span>
                              <div>
                                <h3 className="text-foreground font-semibold">{d.titre}</h3>
                                {d.description ? (
                                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                                    {d.description}
                                  </p>
                                ) : null}
                                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                                  {d.saison ? (
                                    <Badge
                                      variant="secondary"
                                      className="bg-muted text-muted-foreground"
                                    >
                                      Saison {d.saison}
                                    </Badge>
                                  ) : null}
                                  {ext ? (
                                    <span className="text-muted-foreground">
                                      {ext}
                                      {taille ? ` · ${taille}` : ''}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                              {d.fichierUrl ? (
                                <Button asChild size="sm" variant="secondary">
                                  <a href={d.fichierUrl} download data-track="download_document">
                                    <Download className="size-4" aria-hidden="true" />
                                    Télécharger
                                  </a>
                                </Button>
                              ) : null}
                            </Card>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
