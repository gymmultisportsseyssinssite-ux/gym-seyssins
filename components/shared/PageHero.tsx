import Image from 'next/image'

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  imageSrc: string
  imageAlt: string
  /** Numéro de section éditorial. Optionnel — la home les utilise, les sous-pages peuvent s'en passer. */
  sectionNumber?: string
}

export function PageHero({ eyebrow, title, subtitle, imageSrc, imageAlt }: Props) {
  return (
    <section className="bg-background relative isolate overflow-hidden pt-16 md:pt-18">
      {/* Halo radial chaud — atténué */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-secondary)_12%,transparent),transparent)] blur-2xl"
      />

      <div className="container-content relative pt-2 pb-10 md:pt-3 md:pb-14">
        {/* Eyebrow + filet pointillé */}
        {eyebrow ? (
          <div className="mb-5 flex items-baseline gap-4 md:mb-6">
            <p className="text-primary shrink-0 text-xs font-semibold tracking-[0.3em] uppercase">
              — {eyebrow}
            </p>
            <span
              aria-hidden="true"
              className="border-t border-dashed border-[color:color-mix(in_oklab,var(--color-primary)_25%,transparent)] flex-1"
            />
          </div>
        ) : null}

        {/* Layout compact : titre/subtitle gauche + petite image à droite */}
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-8">
            <h1 className="font-display text-foreground text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.025em]">
              {title}
            </h1>
            {subtitle ? (
              <p className="text-foreground/70 mt-4 max-w-2xl text-base leading-[1.6] md:text-lg">
                {subtitle}
              </p>
            ) : null}
          </div>

          <div className="md:col-span-4">
            <div className="relative ml-auto w-full max-w-[280px] md:max-w-none">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-md)] shadow-[0_20px_40px_-20px_rgba(15,20,25,0.25)]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(min-width: 768px) 28vw, 280px"
                  className="object-cover transition-transform duration-[1500ms] ease-out hover:scale-[1.05]"
                />
              </div>
              {/* Cercle décoratif — plus discret */}
              <div
                aria-hidden="true"
                className="border-secondary/30 absolute -top-3 -left-3 -z-10 size-14 rounded-full border-2 border-dashed md:-top-4 md:-left-4 md:size-20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
