import type { PortableTextBlock } from 'sanity'

import { slugifyHeading } from './format'

export type TocEntry = {
  id: string
  text: string
  style: 'h2' | 'h3'
}

type BlockChild = { _type: string; text?: string; marks?: string[] }
type Block = { _type: string; style?: string; children?: BlockChild[] }

function blockToText(block: Block): string {
  if (!block.children) return ''
  return block.children
    .filter((c) => c._type === 'span')
    .map((c) => c.text ?? '')
    .join('')
    .trim()
}

/**
 * Extrait les H2 (et H3 si demandé) d'un PortableText pour générer une TOC.
 */
export function extractToc(
  blocks: PortableTextBlock[] | null | undefined,
  opts: { includeH3?: boolean } = {},
): TocEntry[] {
  if (!blocks || !Array.isArray(blocks)) return []
  const out: TocEntry[] = []
  for (const b of blocks as unknown as Block[]) {
    if (b._type !== 'block') continue
    if (b.style === 'h2' || (opts.includeH3 && b.style === 'h3')) {
      const text = blockToText(b)
      if (text) {
        out.push({ id: slugifyHeading(text), text, style: b.style as 'h2' | 'h3' })
      }
    }
  }
  return out
}
