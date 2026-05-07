import { PortableText as PortableTextRoot, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from 'sanity'

import { slugifyHeading } from '@/lib/format'

import { SanityImage } from './SanityImage'

function childrenToString(children: React.ReactNode): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(childrenToString).join('')
  if (children && typeof children === 'object' && 'props' in children) {
    return childrenToString((children as { props: { children: React.ReactNode } }).props.children)
  }
  return ''
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-foreground/90 text-base leading-relaxed">{children}</p>
    ),
    h2: ({ children }) => {
      const id = slugifyHeading(childrenToString(children))
      return (
        <h2
          id={id}
          className="font-display text-foreground mt-12 mb-4 scroll-mt-24 text-[length:var(--text-2xl)]"
        >
          {children}
        </h2>
      )
    },
    h3: ({ children }) => {
      const id = slugifyHeading(childrenToString(children))
      return (
        <h3 id={id} className="font-display text-foreground mt-8 mb-3 scroll-mt-24 text-xl">
          {children}
        </h3>
      )
    },
    blockquote: ({ children }) => (
      <blockquote className="border-primary bg-card/60 text-foreground/90 before:font-display before:text-primary my-8 border-l-4 px-6 py-5 text-lg italic before:mr-2 before:text-3xl before:leading-none before:content-['“']">
        {children}
      </blockquote>
    ),
    caption: ({ children }) => (
      <p className="text-muted-foreground mt-2 text-sm italic">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="text-foreground/90 my-4 flex flex-col gap-2 [&>li]:relative [&>li]:pl-6">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="text-foreground/90 marker:text-primary my-4 flex list-decimal flex-col gap-2 pl-6 marker:font-medium">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="before:bg-primary before:absolute before:top-2.5 before:left-0 before:size-2 before:rounded-full">
        {children}
      </li>
    ),
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href: string = value?.href ?? '#'
      const isExternal = /^https?:\/\//.test(href)
      const target = value?.targetBlank || isExternal ? '_blank' : undefined
      return (
        <a
          href={href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-primary font-medium underline-offset-4 hover:underline"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => (
      <SanityImage value={value} className="my-8" sizes="(min-width: 768px) 720px, 100vw" />
    ),
    separator: ({ value }: { value: { style?: 'line' | 'ornament' } }) =>
      value?.style === 'ornament' ? (
        <div
          aria-hidden="true"
          className="text-primary my-12 flex items-center justify-center gap-2"
        >
          <span>•</span>
          <span>•</span>
          <span>•</span>
        </div>
      ) : (
        <hr className="border-border my-12 border-t" aria-hidden="true" />
      ),
  },
}

export function PortableText({ value }: { value: PortableTextBlock[] | null | undefined }) {
  if (!value || value.length === 0) return null
  return <PortableTextRoot value={value} components={components} />
}
