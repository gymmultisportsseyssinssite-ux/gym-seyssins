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

// Vérifie qu'une image a un asset référencé. Évite les crashs au build
// quand un article publié avec une image manquante traîne en base.
export function hasImageAsset(source: ImageLike | null | undefined): source is ImageLike {
  if (!source) return false
  const asset = source.asset
  if (!asset) return false
  return Boolean(asset._ref || asset._id || asset.url)
}
