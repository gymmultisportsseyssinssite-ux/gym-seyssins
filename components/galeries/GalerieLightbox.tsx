'use client'

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

import { SanityImage } from '@/components/shared/SanityImage'
import { urlFor } from '@/lib/sanity/image'
import type { GaleriePhoto } from '@/lib/sanity/types'

type Props = {
  photos: GaleriePhoto[]
}

export function GalerieLightbox({ photos }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (photos.length === 0) {
    return (
      <p className="text-muted-foreground italic">
        Cette galerie ne contient pas encore de photos.
      </p>
    )
  }

  // Slides pour la lightbox (plus haute qualité)
  const slides = photos.map((p) => ({
    src: urlFor(p as unknown as Parameters<typeof urlFor>[0])
      .width(1800)
      .url(),
    alt: p.alt,
    title: p.legende,
    description: p.alt,
  }))

  return (
    <>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((p, i) => (
          <li key={`${i}-${p.asset?._ref ?? p.asset?._id ?? i}`}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="bg-muted focus-visible:ring-ring focus-visible:ring-offset-background group relative block aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-md)] focus-visible:ring-2 focus-visible:ring-offset-2"
              aria-label={`Voir la photo ${i + 1} sur ${photos.length}`}
            >
              <div className="size-full transition-transform duration-300 group-hover:scale-[1.04]">
                <SanityImage
                  value={p as unknown as Parameters<typeof SanityImage>[0]['value']}
                  width={800}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="size-full"
                />
              </div>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        open={openIndex !== null}
        index={openIndex ?? 0}
        close={() => setOpenIndex(null)}
        slides={slides}
        controller={{ closeOnBackdropClick: true }}
      />
    </>
  )
}
