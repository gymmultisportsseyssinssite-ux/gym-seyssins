import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

import { dataset, projectId } from '@/sanity/env'

const builder = createImageUrlBuilder({ projectId, dataset })

// Type très permissif : on délègue la validation au builder Sanity.
// Évite les frictions entre nos types maison et le type strict `Image` de `sanity`.
type ImageLike = {
  asset?: { _ref?: string; _id?: string; url?: string; _type?: string } | null
  hotspot?: { x: number; y: number; height?: number; width?: number } | null
  crop?: { left: number; top: number; right: number; bottom: number } | null
  alt?: string
  legende?: string
  [key: string]: unknown
}

export function urlFor(source: ImageLike) {
  return builder
    .image(source as unknown as Image)
    .auto('format')
    .fit('max')
}
