import type { Metadata } from 'next'

import { infosPratiquesContent } from '@/content/infos-pratiques'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FadeIn } from '@/components/shared/FadeIn'

export const metadata: Metadata = {
  title: 'Infos pratiques',
  description:
    'Accès, tarifs, calendrier de la saison et questions fréquentes pour rejoindre la Gym Multisport Seyssins.',
}

export default function InfosPratiquesPage() {
  const { hero, accessSection, tarifsSection, saisonSection, faq } = infosPratiquesContent

  return (
    <>
      {/* Hero éditorial compact */}
      <section className="bg-background relative isolate overflow-hidden pt-16 md:pt-18">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-secondary)_12%,transparent),transparent)] blur-2xl"
        />
        <div className="container-content relative pt-2 pb-10 md:pt-3 md:pb-14">
          <div className="mb-5 flex items-baseline gap-4 md:mb-6">
            <p className="text-primary shrink-0 text-xs font-semibold tracking-[0.3em] uppercase">
              — {hero.eyebrow}
            </p>
            <span
              aria-hidden="true"
              className="flex-1 border-t border-dashed border-[color:color-mix(in_oklab,var(--color-primary)_25%,transparent)]"
            />
          </div>
          <h1 className="font-display text-foreground max-w-3xl text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.025em]">
            {hero.title}
          </h1>
          <p className="text-foreground/70 mt-4 max-w-2xl text-base leading-[1.6] md:text-lg">
            {hero.subtitle}
          </p>
        </div>
      </section>

      <div className="container-content pb-20 md:pb-28">
        <div className="mx-auto max-w-[800px]">
          <Accordion type="multiple" className="flex flex-col gap-4">
            {/* Accès */}
            <FadeIn>
              <AccordionItem
                value="acces"
                className="border-border bg-card rounded-[var(--radius-lg)] border px-6"
              >
                <AccordionTrigger className="font-display py-6 text-xl">
                  {accessSection.title}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-6 pb-6">
                  {accessSection.sections.map((s) => (
                    <div key={s.title}>
                      <h3 className="text-foreground text-base font-semibold">{s.title}</h3>
                      <div className="text-muted-foreground mt-2 flex flex-col gap-3 text-base leading-relaxed">
                        {s.content.map((p) => (
                          <p key={p.slice(0, 30)}>{p}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </FadeIn>

            {/* Tarifs */}
            <FadeIn>
              <AccordionItem
                value="tarifs"
                className="border-border bg-card rounded-[var(--radius-lg)] border px-6"
              >
                <AccordionTrigger className="font-display py-6 text-xl">
                  {tarifsSection.title}
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {tarifsSection.intro}
                  </p>
                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-border border-b">
                          {tarifsSection.table.headers.map((h) => (
                            <th key={h} className="text-foreground py-3 pr-4 font-semibold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {tarifsSection.table.rows.map((row) => (
                          <tr key={row[0]} className="border-border border-b last:border-0">
                            {row.map((cell, i) => (
                              <td
                                key={`${row[0]}-${i}`}
                                className={
                                  i === 0
                                    ? 'text-foreground py-3 pr-4 font-medium'
                                    : 'text-muted-foreground py-3 pr-4'
                                }
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </FadeIn>

            {/* Saison */}
            <FadeIn>
              <AccordionItem
                value="saison"
                className="border-border bg-card rounded-[var(--radius-lg)] border px-6"
              >
                <AccordionTrigger className="font-display py-6 text-xl">
                  {saisonSection.title}
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <ol className="flex flex-col gap-5">
                    {saisonSection.dates.map((d) => (
                      <li key={d.label} className="grid gap-1 sm:grid-cols-[160px_1fr] sm:gap-6">
                        <div className="text-primary text-sm font-medium">{d.date}</div>
                        <div>
                          <p className="text-foreground font-semibold">{d.label}</p>
                          <p className="text-muted-foreground text-sm">{d.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </FadeIn>

            {/* FAQ */}
            <FadeIn>
              <AccordionItem
                value="faq"
                className="border-border bg-card rounded-[var(--radius-lg)] border px-6"
              >
                <AccordionTrigger className="font-display py-6 text-xl">
                  Questions fréquentes
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <Accordion type="single" collapsible className="flex flex-col gap-2">
                    {faq.map((q) => (
                      <AccordionItem
                        key={q.question}
                        value={q.question}
                        className="border-border/60 rounded-md border"
                      >
                        <AccordionTrigger className="px-4 py-3 text-base">
                          {q.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground px-4 pb-4 text-base leading-relaxed">
                          {q.reponse}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </FadeIn>
          </Accordion>
        </div>
      </div>
    </>
  )
}
