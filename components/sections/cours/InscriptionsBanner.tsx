'use client'

import { ArrowRight } from 'lucide-react'

import { inscriptionsContent } from '@/content/inscriptions'

type Props = {
  inscriptionsOuvertes: boolean
  inscriptionsMessage?: string | null
  onOpenInscription: () => void
}

export function InscriptionsBanner({
  inscriptionsOuvertes,
  inscriptionsMessage,
  onOpenInscription,
}: Props) {
  if (!inscriptionsOuvertes) {
    return (
      <div className="bg-muted/40 border-y border-[color:color-mix(in_oklab,var(--color-foreground)_8%,transparent)]">
        <div className="container-content text-muted-foreground py-4 text-center font-mono text-[0.75rem] tracking-wider uppercase">
          {inscriptionsContent.closedNote}
        </div>
      </div>
    )
  }

  return (
    <aside
      role="region"
      aria-label="Inscriptions ouvertes"
      className="bg-[color-mix(in_oklab,var(--color-secondary)_12%,var(--color-background))] border-y border-[color:color-mix(in_oklab,var(--color-secondary)_25%,transparent)]"
    >
      <div className="container-content flex flex-col items-start gap-5 py-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <span className="bg-secondary relative flex size-2 shrink-0 rounded-full">
            <span
              aria-hidden="true"
              className="bg-secondary absolute inline-flex size-full animate-ping rounded-full opacity-75"
            />
          </span>
          <div>
            <p className="text-foreground font-mono text-[0.7rem] font-semibold tracking-[0.2em] uppercase">
              Inscriptions ouvertes — Saison 2025-26
            </p>
            {inscriptionsMessage ? (
              <p className="text-foreground/80 mt-1.5 text-[0.95rem]">{inscriptionsMessage}</p>
            ) : null}
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenInscription}
          className="group bg-foreground text-background hover:bg-primary inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all hover:gap-4"
        >
          <span>Comment s’inscrire&nbsp;?</span>
          <span className="bg-background/15 group-hover:bg-background/25 relative flex size-6 items-center justify-center overflow-hidden rounded-full transition-colors">
            <ArrowRight
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-6"
              aria-hidden="true"
            />
            <ArrowRight
              className="absolute size-3.5 -translate-x-6 transition-transform duration-300 group-hover:translate-x-0"
              aria-hidden="true"
            />
          </span>
        </button>
      </div>
    </aside>
  )
}
