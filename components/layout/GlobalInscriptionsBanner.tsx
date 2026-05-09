import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { inscriptionsContent } from '@/content/inscriptions'

type Props = {
  inscriptionsOuvertes: boolean
  inscriptionsMessage?: string | null
}

export function GlobalInscriptionsBanner({ inscriptionsOuvertes, inscriptionsMessage }: Props) {
  if (!inscriptionsOuvertes) {
    return (
      <div className="bg-muted/40 border-b border-[color:color-mix(in_oklab,var(--color-foreground)_8%,transparent)]">
        <div className="container-content text-muted-foreground py-3 text-center font-mono text-[0.72rem] tracking-wider uppercase">
          {inscriptionsContent.closedNote}
        </div>
      </div>
    )
  }

  return (
    <aside
      role="region"
      aria-label="Inscriptions ouvertes"
      className="bg-[color-mix(in_oklab,var(--color-secondary)_12%,var(--color-background))] border-b border-[color:color-mix(in_oklab,var(--color-secondary)_25%,transparent)]"
    >
      <div className="container-content flex flex-col items-start gap-3 py-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-secondary relative flex size-2 shrink-0 rounded-full">
            <span
              aria-hidden="true"
              className="bg-secondary absolute inline-flex size-full animate-ping rounded-full opacity-75"
            />
          </span>
          <p className="text-foreground font-mono text-[0.7rem] font-semibold tracking-[0.2em] uppercase">
            Inscriptions ouvertes
            {inscriptionsMessage ? (
              <span className="text-foreground/70 ml-3 font-sans text-[0.85rem] normal-case tracking-normal">
                {inscriptionsMessage}
              </span>
            ) : null}
          </p>
        </div>
        <Link
          href="/cours#inscription"
          className="group text-foreground hover:text-primary inline-flex items-center gap-2 text-xs font-semibold tracking-wide transition-colors"
        >
          <span>Comment s’inscrire</span>
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </aside>
  )
}
