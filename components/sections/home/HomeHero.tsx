import Image from 'next/image'
import Link from 'next/link'

import { homeContent } from '@/content/home'
import { Button } from '@/components/ui/button'

export function HomeHero() {
  const { hero } = homeContent

  return (
    <section
      aria-labelledby="hero-title"
      className="bg-foreground relative isolate overflow-hidden"
    >
      <div className="relative aspect-[4/5] w-full md:aspect-[21/9]">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="from-foreground/30 via-foreground/40 to-foreground/70 md:from-foreground/70 md:via-foreground/40 absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r md:to-transparent"
        />

        <div className="container-content absolute inset-0 flex items-end pb-12 md:items-center md:pb-0">
          <div className="text-background max-w-[800px]">
            <p className="text-sm font-medium tracking-[0.2em] text-[color:color-mix(in_oklab,var(--color-primary)_70%,white_30%)] uppercase">
              {hero.eyebrow}
            </p>
            <h1
              id="hero-title"
              className="font-display text-background mt-4 text-[length:var(--text-4xl)] leading-[1.05]"
            >
              {hero.title}
            </h1>
            <p className="text-background/90 mt-6 max-w-[600px] text-lg md:text-xl">
              {hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={hero.primaryCta.href}>{hero.primaryCta.label}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="border-background text-background hover:bg-background hover:text-foreground"
              >
                <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
