import Image from 'next/image'

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  imageSrc: string
  imageAlt: string
}

export function PageHero({ eyebrow, title, subtitle, imageSrc, imageAlt }: Props) {
  return (
    <section className="bg-foreground relative isolate overflow-hidden">
      <div className="relative aspect-[3/2] w-full md:aspect-[21/8]">
        <Image src={imageSrc} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
        <div
          aria-hidden="true"
          className="from-foreground/30 via-foreground/45 to-foreground/75 md:from-foreground/75 md:via-foreground/40 absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r md:to-transparent"
        />
        <div className="container-content absolute inset-0 flex items-end pb-10 md:items-center md:pb-0">
          <div className="text-background max-w-[680px]">
            {eyebrow ? (
              <p className="text-sm font-medium tracking-[0.2em] text-[color:color-mix(in_oklab,var(--color-secondary)_70%,white_30%)] uppercase">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="font-display text-background mt-4 text-[length:var(--text-4xl)] leading-[1.05]">
              {title}
            </h1>
            {subtitle ? (
              <p className="text-background/90 mt-5 max-w-[540px] text-lg md:text-xl">{subtitle}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
