'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'

import { hasImageAsset, urlFor } from '@/lib/sanity/image'
import type { SanityImage } from '@/lib/sanity/types'

type Props = {
  images: SanityImage[]
}

export function ArticleGallery({ images }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const validImages = images.filter(hasImageAsset)
  if (validImages.length === 0) return null

  const slides = validImages.map((img) => ({
    src: urlFor(img).width(2000).url(),
    alt: img.alt,
    description: img.legende ?? undefined,
  }))

  return (
    <section
      aria-labelledby="article-gallery-title"
      className="border-border bg-card border-t"
    >
      <div className="container-content py-12 md:py-16">
        <div className="mb-8 flex items-baseline gap-4 md:mb-10">
          <p className="text-primary shrink-0 font-mono text-[0.7rem] font-semibold tracking-[0.3em] uppercase">
            — Galerie
          </p>
          <span
            aria-hidden="true"
            className="border-foreground/15 flex-1 border-t border-dashed"
          />
        </div>

        <h2
          id="article-gallery-title"
          className="font-display text-foreground text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] tracking-[-0.02em]"
        >
          En images
        </h2>

        <ul className="mt-8 grid grid-cols-2 gap-3 md:mt-10 md:grid-cols-3 md:gap-4">
          {validImages.map((img, i) => {
            const thumbUrl = urlFor(img).width(800).height(800).url()
            const focal = img.hotspot
              ? `${(img.hotspot.x * 100).toFixed(2)}% ${(img.hotspot.y * 100).toFixed(2)}%`
              : '50% 50%'
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  className="group focus-visible:ring-ring focus-visible:ring-offset-card relative block aspect-square w-full overflow-hidden rounded-[var(--radius-md)] focus-visible:ring-2 focus-visible:ring-offset-2"
                  aria-label={`Ouvrir « ${img.alt} » en plein écran`}
                >
                  <Image
                    src={thumbUrl}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    style={{ objectPosition: focal }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10"
                  />
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <Lightbox
        open={openIndex !== null}
        index={openIndex ?? 0}
        close={() => setOpenIndex(null)}
        slides={slides}
        plugins={[Captions]}
        captions={{ descriptionTextAlign: 'center', showToggle: false }}
        controller={{ closeOnBackdropClick: true }}
        styles={{
          container: { backgroundColor: 'rgba(15, 20, 25, 0.92)' },
        }}
      />
    </section>
  )
}
