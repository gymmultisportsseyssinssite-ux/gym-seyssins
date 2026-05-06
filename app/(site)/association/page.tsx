import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { associationContent } from '@/content/association'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FadeIn } from '@/components/shared/FadeIn'

export const metadata: Metadata = {
  title: 'L’association',
  description:
    'Découvrez l’histoire, les valeurs et l’équipe de la Gym Multisport Seyssins, association sportive ancrée à Seyssins depuis plus de 30 ans.',
}

export default function AssociationPage() {
  const { hero, histoire, valeurs, bureau, cta } = associationContent

  return (
    <>
      {/* Hero */}
      <section className="bg-card relative isolate overflow-hidden">
        <div className="container-content grid grid-cols-1 items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
          <div>
            <p className="text-primary text-sm font-medium tracking-wide uppercase">
              {hero.eyebrow}
            </p>
            <h1 className="font-display text-foreground mt-4 text-[length:var(--text-4xl)]">
              {hero.title}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-prose text-lg">{hero.subtitle}</p>
          </div>
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[var(--radius-lg)] shadow-md">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Histoire */}
      <FadeIn>
        <section aria-labelledby="histoire-title" className="bg-background">
          <div className="container-content py-16 md:py-24">
            <h2
              id="histoire-title"
              className="font-display text-foreground max-w-3xl text-[length:var(--text-3xl)]"
            >
              {histoire.title}
            </h2>
            <div className="text-foreground/90 mt-8 max-w-[720px] space-y-5 text-base leading-relaxed">
              {histoire.paragraphs.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Valeurs */}
      <FadeIn>
        <section
          aria-labelledby="valeurs-title"
          className="bg-[color-mix(in_oklab,var(--color-secondary)_15%,var(--color-background))]"
        >
          <div className="container-content py-16 md:py-24">
            <div className="max-w-2xl">
              <p className="text-primary text-sm font-medium tracking-wide uppercase">
                Nos valeurs
              </p>
              <h2
                id="valeurs-title"
                className="font-display text-foreground mt-3 text-[length:var(--text-3xl)]"
              >
                Ce qui nous rassemble
              </h2>
            </div>
            <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {valeurs.map((v) => (
                <li key={v.title}>
                  <Card className="bg-card h-full">
                    <CardContent className="flex flex-col items-start gap-4 p-6">
                      <div
                        aria-hidden="true"
                        className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full"
                      >
                        <v.icon className="size-6" />
                      </div>
                      <h3 className="font-display text-foreground text-xl">{v.title}</h3>
                      <p className="text-muted-foreground text-base leading-relaxed">
                        {v.description}
                      </p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </FadeIn>

      {/* Bureau */}
      <FadeIn>
        <section aria-labelledby="bureau-title" className="bg-background">
          <div className="container-content py-16 md:py-24">
            <div className="max-w-2xl">
              <p className="text-primary text-sm font-medium tracking-wide uppercase">Le bureau</p>
              <h2
                id="bureau-title"
                className="font-display text-foreground mt-3 text-[length:var(--text-3xl)]"
              >
                L’équipe au cœur de l’association
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                Le bureau est composé de quatre bénévoles élus chaque année en Assemblée générale.
              </p>
            </div>
            <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {bureau.map((m) => (
                <li key={m.nom}>
                  <Card className="bg-card h-full overflow-hidden">
                    <div className="bg-muted relative aspect-[4/5] w-full">
                      {m.photo ? (
                        <Image
                          src={m.photo}
                          alt={`${m.nom} — ${m.role}`}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          className="font-display text-muted-foreground flex size-full items-center justify-center text-4xl"
                        >
                          {m.nom
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-display text-foreground text-lg">{m.nom}</h3>
                      <p className="text-primary text-sm font-medium">{m.role}</p>
                      {m.bio ? (
                        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                          {m.bio}
                        </p>
                      ) : null}
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </FadeIn>

      {/* CTA */}
      <FadeIn>
        <section aria-labelledby="cta-title" className="bg-foreground text-background">
          <div className="container-content py-16 md:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2
                id="cta-title"
                className="font-display text-background text-[length:var(--text-3xl)]"
              >
                {cta.title}
              </h2>
              <p className="text-background/85 mt-4 text-lg">{cta.description}</p>
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href={cta.buttonHref}>{cta.buttonLabel}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  )
}
