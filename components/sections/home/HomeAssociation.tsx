import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { homeContent } from '@/content/home'
import { FadeIn } from '@/components/shared/FadeIn'

export function HomeAssociation() {
  const { association } = homeContent

  return (
    <section
      aria-labelledby="home-asso-title"
      className="bg-card relative isolate overflow-hidden"
    >
      {/* Filet décoratif vertical à gauche */}
      <div
        aria-hidden="true"
        className="from-primary/0 via-primary/15 to-primary/0 pointer-events-none absolute top-24 bottom-24 left-6 hidden w-px bg-gradient-to-b lg:block"
      />

      <div className="container-content relative py-12 md:py-16 lg:py-20">
        {/* Header éditorial : numéro de section + eyebrow */}
        <FadeIn className="mb-12 flex items-baseline gap-6 md:mb-16">
          <span
            aria-hidden="true"
            className="font-display text-primary/15 text-[5rem] leading-none font-light tracking-tighter md:text-[7rem]"
          >
            01
          </span>
          <div className="flex-1 border-t border-dashed border-[color:color-mix(in_oklab,var(--color-primary)_25%,transparent)] pt-3">
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
              {association.eyebrow}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Colonne images — composition éditoriale */}
          <FadeIn className="lg:col-span-5 xl:col-span-6">
            <div className="relative">
              {/* Image principale */}
              <div className="border-foreground/5 relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] border shadow-[0_30px_60px_-20px_rgba(15,20,25,0.25)]">
                <Image
                  src={association.images[0].src}
                  alt={association.images[0].alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.04]"
                />
                {/* Petit tag éditorial collé à l'image */}
                <div className="bg-card absolute top-4 left-4 flex items-center gap-2 rounded-full px-3 py-1.5 shadow-md">
                  <span className="bg-secondary relative flex size-2 rounded-full">
                    <span className="bg-secondary absolute inline-flex size-full animate-ping rounded-full opacity-75" />
                  </span>
                  <span className="text-foreground text-[0.7rem] font-semibold tracking-wider uppercase">
                    Saison 2025-26
                  </span>
                </div>
              </div>

              {/* Image secondaire en chevauchement, position décalée */}
              <div className="border-card absolute -right-2 -bottom-10 aspect-square w-[45%] overflow-hidden rounded-[var(--radius-lg)] border-[6px] shadow-xl md:-right-6 md:-bottom-14 md:w-[42%]">
                <Image
                  src={association.images[1].src}
                  alt={association.images[1].alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="object-cover grayscale-[40%] transition-all duration-700 hover:grayscale-0"
                />
              </div>

              {/* Petit pattern décoratif derrière */}
              <div
                aria-hidden="true"
                className="border-secondary/30 absolute -top-4 -left-4 -z-10 size-24 rounded-full border-2 border-dashed md:-top-6 md:-left-6 md:size-32"
              />
            </div>
          </FadeIn>

          {/* Colonne texte */}
          <div className="lg:col-span-7 xl:col-span-6">
            <FadeIn delay={120}>
              <h2
                id="home-asso-title"
                className="font-display text-foreground text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em]"
              >
                Une <em className="text-primary font-display not-italic italic">famille</em>{' '}
                sportive
                <br className="hidden md:block" /> ancrée à Seyssins.
              </h2>
            </FadeIn>

            <FadeIn delay={220} className="mt-8 flex flex-col gap-5">
              {association.paragraphs.map((p, i) => (
                <p
                  key={p.slice(0, 30)}
                  className="text-foreground/75 text-[1.0625rem] leading-[1.7]"
                >
                  {i === 0 ? (
                    <>
                      <span className="font-display text-foreground float-left mt-1 mr-2 text-5xl leading-none font-medium md:text-6xl">
                        {p.charAt(0)}
                      </span>
                      {p.slice(1)}
                    </>
                  ) : (
                    p
                  )}
                </p>
              ))}
            </FadeIn>

            <FadeIn delay={320} className="mt-10">
              <Link
                href={association.cta.href}
                className="group focus-visible:ring-ring focus-visible:ring-offset-card border-foreground/15 hover:border-primary hover:bg-primary inline-flex items-center gap-3 rounded-full border px-6 py-3 text-sm font-semibold tracking-wide transition-all hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                <span>{association.cta.label}</span>
                <span className="bg-foreground/5 group-hover:bg-white/15 relative flex size-6 items-center justify-center overflow-hidden rounded-full transition-colors">
                  <ArrowUpRight
                    className="absolute size-3.5 transition-transform duration-300 group-hover:translate-x-3.5 group-hover:-translate-y-3.5"
                    aria-hidden="true"
                  />
                  <ArrowUpRight
                    className="absolute size-3.5 -translate-x-3.5 translate-y-3.5 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </FadeIn>
          </div>
        </div>

      </div>
    </section>
  )
}
