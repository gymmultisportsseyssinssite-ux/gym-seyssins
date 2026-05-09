import Image from 'next/image'

import { hasImageAsset, urlFor } from '@/lib/sanity/image'
import { cn } from '@/lib/utils'

type SanityImageProps = {
  value: {
    asset?: { _ref?: string; _id?: string; url?: string }
    alt?: string
    legende?: string
    hotspot?: { x: number; y: number }
  }
  width?: number
  height?: number
  sizes?: string
  className?: string
  priority?: boolean
  /**
   * Mode "fill" : l'image remplit tout le conteneur (object-cover).
   * Le conteneur parent doit avoir un `position: relative` et une taille définie.
   * Quand activé, `rounded-*` n'est pas appliqué — c'est au parent de gérer.
   */
  fill?: boolean
}

export function SanityImage({
  value,
  width = 1200,
  height,
  sizes = '(min-width: 1024px) 1024px, 100vw',
  className,
  priority = false,
  fill = false,
}: SanityImageProps) {
  if (!hasImageAsset(value)) return null

  const builder = urlFor(value as Parameters<typeof urlFor>[0]).width(width)
  const url = (height ? builder.height(height) : builder).url()

  const focal = value.hotspot
    ? `${(value.hotspot.x * 100).toFixed(2)}% ${(value.hotspot.y * 100).toFixed(2)}%`
    : '50% 50%'

  if (fill) {
    return (
      <Image
        src={url}
        alt={value.alt ?? ''}
        fill
        sizes={sizes}
        priority={priority}
        className={cn('object-cover', className)}
        style={{ objectPosition: focal }}
      />
    )
  }

  return (
    <figure className={cn('relative', className)}>
      <Image
        src={url}
        alt={value.alt ?? ''}
        width={width}
        height={height ?? Math.round(width * 0.66)}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full rounded-[var(--radius-lg)] object-cover"
        style={{ objectPosition: focal }}
      />
      {value.legende ? (
        <figcaption className="text-muted-foreground mt-3 text-sm italic">
          {value.legende}
        </figcaption>
      ) : null}
    </figure>
  )
}
