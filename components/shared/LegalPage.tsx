type LegalSection = {
  readonly title: string
  readonly paragraphs: readonly string[]
}

type Props = {
  title: string
  intro: string
  sections: readonly LegalSection[]
}

export function LegalPage({ title, intro, sections }: Props) {
  return (
    <article className="bg-background">
      <div className="container-content py-16 md:py-24">
        <div className="mx-auto max-w-[720px]">
          <h1 className="font-display text-foreground text-[length:var(--text-4xl)]">{title}</h1>
          <p className="text-muted-foreground mt-5 text-lg">{intro}</p>

          <div className="mt-10 flex flex-col gap-8">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="font-display text-foreground text-2xl">{s.title}</h2>
                <div className="text-foreground/85 mt-3 flex flex-col gap-3 text-base leading-relaxed">
                  {s.paragraphs.map((p) => (
                    <p key={p.slice(0, 30)}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
