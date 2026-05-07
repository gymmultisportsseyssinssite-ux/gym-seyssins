import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { JOUR_LABEL, NIVEAU_LABEL, type DisciplineWithCours } from '@/lib/sanity/types'

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

export function DisciplinesDetailees({ disciplines }: { disciplines: DisciplineWithCours[] }) {
  if (disciplines.length === 0) return null

  return (
    <section
      aria-labelledby="disciplines-title"
      className="bg-[color-mix(in_oklab,var(--color-secondary)_8%,var(--color-background))]"
    >
      <div className="container-content py-16 md:py-20">
        <div className="max-w-2xl">
          <p className="text-primary text-sm font-medium tracking-wide uppercase">
            Nos disciplines
          </p>
          <h2
            id="disciplines-title"
            className="font-display text-foreground mt-3 text-[length:var(--text-3xl)]"
          >
            Une activité pour chacun
          </h2>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {disciplines.map((d) => {
            const couleur = d.couleur ?? 'var(--color-primary)'
            const desc = blocksToText(d.description)

            return (
              <li key={d._id}>
                <Card className="relative h-full overflow-hidden p-6">
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 h-1 w-full"
                    style={{ backgroundColor: couleur }}
                  />
                  <div className="flex items-start gap-3">
                    <h3 className="font-display text-foreground flex-1 text-2xl">{d.nom}</h3>
                    {d.niveauRequis ? (
                      <Badge
                        variant="secondary"
                        className="border font-medium"
                        style={{
                          backgroundColor: `${couleur}1F`,
                          color: couleur,
                          borderColor: `${couleur}55`,
                        }}
                      >
                        {NIVEAU_LABEL[d.niveauRequis]}
                      </Badge>
                    ) : null}
                  </div>
                  {desc ? (
                    <p className="text-muted-foreground mt-3 text-base leading-relaxed">{desc}</p>
                  ) : null}
                  {d.cours.length > 0 ? (
                    <div className="border-border mt-5 border-t pt-4">
                      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        Créneaux
                      </p>
                      <ul className="mt-2 flex flex-col gap-1.5 text-sm">
                        {d.cours.map((c) => (
                          <li key={c._id} className="flex flex-wrap items-baseline gap-x-3">
                            <span className="text-foreground min-w-[80px] font-medium">
                              {c.jour ? JOUR_LABEL[c.jour] : ''}
                            </span>
                            <span className="text-muted-foreground">
                              {c.heureDebut}
                              {c.heureFin ? `–${c.heureFin}` : ''}
                              {c.professeur?.prenom
                                ? ` · ${c.professeur.prenom} ${c.professeur.nom ?? ''}`
                                : ''}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-muted-foreground mt-5 text-sm italic">Créneaux à venir.</p>
                  )}
                </Card>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
