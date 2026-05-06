import Image from 'next/image'
import Link from 'next/link'

import { homeContent } from '@/content/home'
import { Button } from '@/components/ui/button'

export function HomeAssociation() {
  const { association } = homeContent

  return (
    <section aria-labelledby="home-asso-title" className="bg-card">
      <div className="container-content py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Composition asymétrique 2 images */}
          <div className="relative aspect-[5/4] w-full">
            <div className="absolute top-0 left-0 h-[70%] w-[60%] overflow-hidden rounded-[var(--radius-lg)] shadow-md">
              <Image
                src={association.images[0].src}
                alt={association.images[0].alt}
                fill
                sizes="(min-width: 1024px) 30vw, 60vw"
                className="object-cover"
              />
            </div>
            <div className="border-background absolute right-0 bottom-0 h-[60%] w-[55%] overflow-hidden rounded-[var(--radius-lg)] border-4 shadow-lg">
              <Image
                src={association.images[1].src}
                alt={association.images[1].alt}
                fill
                sizes="(min-width: 1024px) 28vw, 55vw"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <p className="text-primary text-sm font-medium tracking-wide uppercase">
              {association.eyebrow}
            </p>
            <h2
              id="home-asso-title"
              className="font-display text-foreground mt-3 text-[length:var(--text-3xl)]"
            >
              {association.title}
            </h2>
            <div className="text-foreground/85 mt-6 flex flex-col gap-4 text-base leading-relaxed">
              {association.paragraphs.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
            <div className="mt-8">
              <Button asChild variant="secondary" size="default">
                <Link href={association.cta.href}>{association.cta.label}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
