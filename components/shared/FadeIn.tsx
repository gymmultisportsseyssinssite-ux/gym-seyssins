'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

type FadeInProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: keyof React.JSX.IntrinsicElements
}

export function FadeIn({ children, className, delay = 0, as = 'div' }: FadeInProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setVisible(true)
      return
    }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' },
    )
    observer.observe(node)

    // Fallback: si l'observer n'a pas tiré après 800ms (élément déjà dans la vue
    // mais pas observé pour une raison X), on force l'affichage.
    const fallback = window.setTimeout(() => setVisible(true), 800)

    return () => {
      observer.disconnect()
      window.clearTimeout(fallback)
    }
  }, [])

  const Tag = as as React.ElementType

  return (
    <Tag
      ref={ref}
      className={cn(
        'transition-[opacity,transform] duration-[600ms] ease-out',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
        className,
      )}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
