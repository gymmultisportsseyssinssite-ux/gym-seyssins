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
      className="bg-background relative isolate overflow-hidden"
    >
      <div className="container-content relative py-20 md:py-28">
        {/* Header éditorial harmonisé */}
        <div className="mb-10 flex items-baseline gap-4 md:mb-14">
          <p className="text-primary shrink-0 text-xs font-semibold tracking-[0.3em] uppercase">
            — Nos disciplines
          </p>
          <span
            aria-hidden="true"
            className="flex-1 border-t border-dashed border-[color:color-mix(in_oklab,var(--color-primary)_25%,transparent)]"
          />
        </div>

        <div className="max-w-2xl">
          <h2
            id="disciplines-title"
            className="font-display text-foreground text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.025em]"
          >
            Une activité pour chacun
          </h2>
          <p className="text-foreground/70 mt-5 text-lg leading-[1.6]">
            Découvrez le détail de chaque discipline : description, niveau requis et créneaux
            hebdomadaires.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {disciplines.map((d, i) => {
            const couleur = d.couleur ?? 'var(--color-primary)'
            const desc = blocksToText(d.description)
            const num = String(i + 1).padStart(2, '0')

            return (
              <li key={d._id} style={{ ['--c' as string]: couleur }}>
                <div className="group focus-visible:ring-ring focus-visible:ring-offset-background relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[color:color-mix(in_oklab,var(--color-foreground)_8%,transparent)] bg-[color-mix(in_oklab,var(--c)_4%,var(--color-card))] p-7 transition-all duration-500 hover:border-[color:color-mix(in_oklab,var(--c)_40%,transparent)] hover:shadow-[0_30px_60px_-20px_color-mix(in_oklab,var(--c)_30%,transparent)]">
                  {/* Header : numéro + niveau */}
                  <div className="flex items-start justify-between">
                    <span
                      aria-hidden="true"
                      className="font-display text-foreground/15 text-3xl leading-none font-bold tracking-tight transition-colors group-hover:text-[color:color-mix(in_oklab,var(--c)_60%,transparent)]"
                    >
                      {num}
                    </span>
                    {d.niveauRequis ? (
                      <span
                        className="inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.7rem] font-medium tracking-wider uppercase"
                        style={{
                          backgroundColor: `color-mix(in oklab, ${couleur} 8%, transparent)`,
                          color: couleur,
                          borderColor: `color-mix(in oklab, ${couleur} 35%, transparent)`,
                        }}
                      >
                        {NIVEAU_LABEL[d.niveauRequis]}
                      </span>
                    ) : null}
                  </div>

                  {/* Titre + trait animé */}
                  <div className="mt-8">
                    <h3 className="font-display text-foreground text-2xl font-bold tracking-tight">
                      {d.nom}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-3 block h-[3px] w-10 origin-left rounded-full transition-all duration-500 group-hover:w-full"
                      style={{ backgroundColor: couleur }}
                    />
                  </div>

                  {/* Description */}
                  {desc ? (
                    <p className="text-foreground/70 mt-4 text-[0.95rem] leading-[1.6]">{desc}</p>
                  ) : null}

                  {/* Créneaux */}
                  <div className="mt-6 border-t border-dashed border-[color:color-mix(in_oklab,var(--color-foreground)_12%,transparent)] pt-5">
                    <p className="text-muted-foreground font-mono text-[0.7rem] font-semibold tracking-[0.2em] uppercase">
                      Créneaux
                    </p>
                    {d.cours.length > 0 ? (
                      <ul className="mt-3 flex flex-col gap-2 text-sm">
                        {d.cours.map((c) => (
                          <li
                            key={c._id}
                            className="grid grid-cols-[72px_1fr] items-baseline gap-3"
                          >
                            <span className="text-foreground font-semibold">
                              {c.jour ? JOUR_LABEL[c.jour] : ''}
                            </span>
                            <span className="flex flex-col gap-0.5">
                              <span className="text-foreground/80 font-mono text-[0.85rem]">
                                {c.heureDebut}
                                {c.heureFin ? `–${c.heureFin}` : ''}
                              </span>
                              {c.professeur?.prenom ? (
                                <span className="text-muted-foreground text-[0.8rem]">
                                  {c.professeur.prenom} {c.professeur.nom ?? ''}
                                </span>
                              ) : null}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground/80 mt-2 text-[0.85rem] italic">
                        Créneaux à venir.
                      </p>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
