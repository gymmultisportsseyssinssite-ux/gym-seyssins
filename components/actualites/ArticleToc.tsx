'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import type { TocEntry } from '@/lib/portable-text-utils'

type Props = {
  entries: TocEntry[]
}

export function ArticleToc({ entries }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (entries.length === 0 || typeof window === 'undefined') return

    const ids = entries.map((e) => e.id)
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Garde la dernière section vue dans le top quart
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: 0 },
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [entries])

  if (entries.length < 2) return null

  return (
    <nav aria-label="Sommaire de l’article" className="text-sm">
      <p className="text-muted-foreground mb-3 text-xs font-medium tracking-wide uppercase">
        Sommaire
      </p>
      <ul className="border-border flex flex-col gap-1 border-l">
        {entries.map((e) => (
          <li key={e.id}>
            <a
              href={`#${e.id}`}
              className={cn(
                '-ml-px block border-l-2 py-1 pl-4 leading-snug transition-colors',
                e.style === 'h3' ? 'pl-7 text-xs' : '',
                activeId === e.id
                  ? 'border-primary text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground border-transparent',
              )}
            >
              {e.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
