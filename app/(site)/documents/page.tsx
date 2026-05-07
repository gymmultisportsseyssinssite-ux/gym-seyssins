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
      <section className="bg-card">
        <div className="container-content py-12 md:py-16">
          <p className="text-primary text-sm font-medium tracking-wide uppercase">
            Espace pratique
          </p>
          <h1 className="font-display text-foreground mt-3 max-w-3xl text-[length:var(--text-4xl)]">
            Documents et formulaires
          </h1>
          <p className="text-muted-foreground mt-5 max-w-2xl text-lg">
            Tous les documents nécessaires à votre adhésion et à la vie de l’association.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-content py-16 md:py-20">
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
