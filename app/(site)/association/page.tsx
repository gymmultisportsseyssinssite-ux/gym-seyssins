import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { associationContent } from '@/content/association'
import { FadeIn } from '@/components/shared/FadeIn'
import { PageHero } from '@/components/shared/PageHero'

export const metadata: Metadata = {
  title: 'L’association',
  description:
    'Découvrez l’histoire, les valeurs et l’équipe de la Gym Multisport Seyssins, association sportive ancrée à Seyssins depuis plus de 30 ans.',
}

export default function AssociationPage() {
  const { hero, histoire, valeurs, bureau, cta } = associationContent

  return (
    <>
      <PageHero
        sectionNumber="01"
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        imageSrc={hero.image.src}
        imageAlt={hero.image.alt}
      />

      {/* Histoire — layout éditorial avec drop cap */}
      <FadeIn>
        <section aria-labelledby="histoire-title" className="bg-card relative isolate">
          <div className="container-content py-20 md:py-28">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
                  — Histoire
                </p>
                <h2
                  id="histoire-title"
                  className="font-display text-foreground mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.025em]"
                >
                  {histoire.title}
                </h2>
              </div>
              <div className="lg:col-span-8">
                <div className="text-foreground/75 flex max-w-[58ch] flex-col gap-5 text-[1.0625rem] leading-[1.7]">
                  {histoire.paragraphs.map((p, i) => (
                    <p key={p.slice(0, 30)}>
                      {i === 0 ? (
                        <>
                          <span className="font-display text-foreground float-left mt-1 mr-2 text-5xl leading-none font-bold md:text-6xl">
                            {p.charAt(0)}
                          </span>
                          {p.slice(1)}
                        </>
                      ) : (
                        p
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Valeurs */}
      <FadeIn>
        <section aria-labelledby="valeurs-title" className="bg-background relative isolate overflow-hidden">
          <div className="container-content py-20 md:py-28">
            <div className="mb-10 flex items-baseline gap-4 md:mb-14">
              <p className="text-primary shrink-0 text-xs font-semibold tracking-[0.3em] uppercase">
                — Nos valeurs
              </p>
              <span
                aria-hidden="true"
                className="flex-1 border-t border-dashed border-[color:color-mix(in_oklab,var(--color-primary)_25%,transparent)]"
              />
            </div>

            <div className="max-w-2xl">
              <h2
                id="valeurs-title"
                className="font-display text-foreground text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.025em]"
              >
                Ce qui nous rassemble
              </h2>
            </div>

            <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {valeurs.map((v) => (
                <li
                  key={v.title}
                  className="group bg-card hover:border-primary/30 relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[color:color-mix(in_oklab,var(--color-foreground)_8%,transparent)] p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(15,20,25,0.15)]"
                >
                  <div
                    aria-hidden="true"
                    className="border-primary/35 bg-primary/8 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex size-11 shrink-0 items-center justify-center rounded-full border-2 transition-all group-hover:scale-110"
                  >
                    <v.icon className="size-5" />
                  </div>
                  <h3 className="font-display text-foreground mt-6 text-xl font-bold tracking-tight">
                    {v.title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="bg-primary mt-3 block h-[3px] w-10 origin-left rounded-full transition-all duration-500 group-hover:w-full"
                  />
                  <p className="text-foreground/70 mt-4 text-[0.95rem] leading-[1.6]">
                    {v.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </FadeIn>

      {/* Bureau */}
      <FadeIn>
        <section aria-labelledby="bureau-title" className="bg-card relative isolate">
          <div className="container-content py-20 md:py-28">
            <div className="mb-10 flex items-baseline gap-4 md:mb-14">
              <p className="text-primary shrink-0 text-xs font-semibold tracking-[0.3em] uppercase">
                — Le bureau
              </p>
              <span
                aria-hidden="true"
                className="flex-1 border-t border-dashed border-[color:color-mix(in_oklab,var(--color-primary)_25%,transparent)]"
              />
            </div>

            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <h2
                  id="bureau-title"
                  className="font-display text-foreground text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.025em]"
                >
                  L’équipe au cœur de l’association
                </h2>
                <p className="text-foreground/70 mt-5 text-lg leading-[1.6]">
                  Quatre bénévoles élus chaque année en Assemblée générale.
                </p>
              </div>
            </div>

            <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {bureau.map((m) => (
                <li key={m.nom} className="group">
                  <div className="bg-muted relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] shadow-[0_20px_40px_-20px_rgba(15,20,25,0.2)]">
                    {m.photo ? (
                      <Image
                        src={m.photo}
                        alt={`${m.nom} — ${m.role}`}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="font-display text-muted-foreground flex size-full items-center justify-center text-4xl font-bold"
                      >
                        {m.nom
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                    )}
                    <div
                      aria-hidden="true"
                      className="from-foreground/40 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </div>
                  <div className="mt-5">
                    <p className="text-primary font-mono text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
                      {m.role}
                    </p>
                    <h3 className="font-display text-foreground mt-1.5 text-lg font-bold tracking-tight">
                      {m.nom}
                    </h3>
                    {m.bio ? (
                      <p className="text-foreground/65 mt-3 text-[0.9rem] leading-[1.55]">
                        {m.bio}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </FadeIn>

      {/* CTA final */}
      <FadeIn>
        <section
          aria-labelledby="cta-title"
          className="bg-foreground text-background relative isolate overflow-hidden"
        >
          {/* Halo radial chaud */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -right-32 -z-10 h-[600px] w-[600px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-secondary)_25%,transparent),transparent)] blur-2xl"
          />
          {/* Cercle pointillé décoratif */}
          <div
            aria-hidden="true"
            className="border-secondary/30 pointer-events-none absolute top-12 left-12 -z-10 size-32 rounded-full border-2 border-dashed md:size-48"
          />

          <div className="container-content py-20 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-secondary text-xs font-semibold tracking-[0.3em] uppercase">
                — Rejoignez-nous
              </p>
              <h2
                id="cta-title"
                className="font-display text-background mt-5 text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-[-0.03em]"
              >
                {cta.title}
              </h2>
              <p className="text-background/80 mt-6 text-lg leading-[1.6]">{cta.description}</p>
              <div className="mt-10 flex justify-center">
                <Link
                  href={cta.buttonHref}
                  className="group bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all hover:gap-4"
                >
                  <span>{cta.buttonLabel}</span>
                  <span className="bg-foreground/8 group-hover:bg-background/20 relative flex size-7 items-center justify-center overflow-hidden rounded-full transition-colors">
                    <ArrowRight
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-7"
                      aria-hidden="true"
                    />
                    <ArrowRight
                      className="absolute size-3.5 -translate-x-7 transition-transform duration-300 group-hover:translate-x-0"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  )
}
