import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { homeContent } from '@/content/home'

export function HomeHero() {
  const { hero } = homeContent

  return (
    <section
      aria-labelledby="hero-title"
      className="bg-background relative isolate overflow-hidden pt-24 md:pt-28 lg:pt-32"
    >
      {/* Filet décoratif vertical à gauche */}
      <div
        aria-hidden="true"
        className="from-foreground/0 via-foreground/8 to-foreground/0 pointer-events-none absolute top-32 bottom-32 left-6 hidden w-px bg-gradient-to-b lg:block"
      />

      {/* Halo radial chaud en arrière-plan */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-secondary)_20%,transparent),transparent)] blur-2xl"
      />

      <div className="container-content relative">
        {/* Eyebrow / pill saison */}
        <div className="hero-reveal hero-reveal-1 inline-flex items-center gap-2 rounded-full border border-[color:color-mix(in_oklab,var(--color-foreground)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--color-card)_70%,transparent)] px-3.5 py-1.5 backdrop-blur-sm">
          <span className="bg-secondary relative flex size-1.5 rounded-full">
            <span className="bg-secondary absolute inline-flex size-full animate-ping rounded-full opacity-75" />
          </span>
          <span className="text-foreground text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
            Saison 2025-26 · Inscriptions ouvertes
          </span>
        </div>

        {/* Grille principale */}
        <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          {/* Colonne titre + texte + CTA */}
          <div className="lg:col-span-7 xl:col-span-7">
            <h1
              id="hero-title"
              className="hero-reveal hero-reveal-2 font-display text-foreground text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.95] tracking-[-0.035em]"
            >
              Bouger ensemble
              <br />
              à{' '}
              <span className="relative inline-block">
                <span className="text-primary relative z-10">Seyssins.</span>
                <span
                  aria-hidden="true"
                  className="bg-secondary/30 absolute right-0 bottom-1.5 left-0 -z-0 h-[0.18em] -translate-y-[0.05em] [animation:hero-underline_900ms_ease-out_500ms_both] [transform-origin:left] [width:0]"
                />
              </span>
            </h1>

            <p className="hero-reveal hero-reveal-3 text-foreground/70 mt-8 max-w-xl text-lg leading-[1.6] md:text-xl">
              {hero.subtitle}
            </p>

            <div className="hero-reveal hero-reveal-4 mt-10 flex flex-wrap items-center gap-5">
              <Link
                href={hero.primaryCta.href}
                className="group bg-foreground text-background hover:bg-primary focus-visible:ring-ring focus-visible:ring-offset-background inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all hover:gap-4 focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                <span>{hero.primaryCta.label}</span>
                <span className="bg-background/15 group-hover:bg-background/25 relative flex size-7 items-center justify-center overflow-hidden rounded-full transition-colors">
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

              <Link
                href={hero.secondaryCta.href}
                className="group text-foreground hover:text-primary inline-flex items-center gap-2 text-sm font-semibold tracking-wide transition-colors"
              >
                <span className="relative">
                  {hero.secondaryCta.label}
                  <span
                    aria-hidden="true"
                    className="bg-foreground group-hover:bg-primary absolute right-0 -bottom-1 left-0 h-px origin-left scale-x-100 transition-transform group-hover:scale-x-0"
                  />
                  <span
                    aria-hidden="true"
                    className="bg-primary absolute right-0 -bottom-1 left-0 h-px origin-right scale-x-0 transition-transform delay-150 group-hover:origin-left group-hover:scale-x-100"
                  />
                </span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Colonne images — composition mosaïque */}
          <div className="hero-reveal hero-reveal-5 lg:col-span-5 xl:col-span-5">
            <div className="relative">
              {/* Image principale verticale */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] shadow-[0_40px_80px_-30px_rgba(15,20,25,0.4)]">
                <Image
                  src={hero.image.src}
                  alt={hero.image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover transition-transform duration-[1500ms] ease-out hover:scale-[1.05]"
                />
                {/* Overlay subtil bas pour profondeur */}
                <div
                  aria-hidden="true"
                  className="from-foreground/30 absolute inset-0 bg-gradient-to-t to-transparent"
                />
              </div>

              {/* Petite image décalée en bas-gauche */}
              <div className="border-background absolute -bottom-8 -left-6 aspect-[4/5] w-[42%] overflow-hidden rounded-[var(--radius-lg)] border-[6px] shadow-2xl md:-bottom-10 md:-left-10">
                <Image
                  src="/images/asso-2.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 18vw, 40vw"
                  className="object-cover"
                  aria-hidden="true"
                />
              </div>

              {/* Cercle pointillé décoratif */}
              <div
                aria-hidden="true"
                className="border-secondary/40 absolute -bottom-12 right-0 -z-10 size-32 rounded-full border-2 border-dashed md:size-40"
              />
            </div>
          </div>
        </div>

        {/* Indicateur de scroll discret */}
        <div className="hero-reveal hero-reveal-6 mt-20 flex justify-end md:mt-24">
          <div className="text-muted-foreground flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.2em] uppercase">
            <span>Découvrir</span>
            <span className="from-foreground/30 to-foreground/0 relative flex h-12 w-px bg-gradient-to-b">
              <span className="bg-foreground absolute top-0 left-1/2 size-1.5 -translate-x-1/2 rounded-full [animation:hero-scroll_2s_ease-in-out_infinite]" />
            </span>
          </div>
        </div>
      </div>

      {/* Espace bas avant la section suivante */}
      <div className="h-12 md:h-16" />

      {/* Animations locales */}
      <style>{`
        @keyframes hero-reveal {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-underline {
          to { width: 100%; }
        }
        @keyframes hero-scroll {
          0% { transform: translate(-50%, 0); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translate(-50%, 36px); opacity: 0; }
        }
        .hero-reveal {
          opacity: 0;
          animation: hero-reveal 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .hero-reveal-1 { animation-delay: 0ms; }
        .hero-reveal-2 { animation-delay: 120ms; }
        .hero-reveal-3 { animation-delay: 280ms; }
        .hero-reveal-4 { animation-delay: 420ms; }
        .hero-reveal-5 { animation-delay: 200ms; }
        .hero-reveal-6 { animation-delay: 600ms; }
        @media (prefers-reduced-motion: reduce) {
          .hero-reveal { opacity: 1 !important; animation: none !important; }
        }
      `}</style>
    </section>
  )
}
