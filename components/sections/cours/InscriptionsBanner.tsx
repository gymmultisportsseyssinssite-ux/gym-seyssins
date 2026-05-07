'use client'

import { Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
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
      <div className="bg-muted/50">
        <div className="container-content text-muted-foreground py-4 text-center text-sm">
          {inscriptionsContent.closedNote}
        </div>
      </div>
    )
  }

  return (
    <aside
      role="region"
      aria-label="Inscriptions ouvertes"
      className="bg-[color-mix(in_oklab,var(--color-secondary)_20%,var(--color-background))]"
    >
      <div className="container-content flex flex-col items-start gap-4 py-6 md:flex-row md:items-center md:justify-between md:py-5">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="bg-secondary text-secondary-foreground flex size-10 shrink-0 items-center justify-center rounded-full"
          >
            <Sparkles className="size-5" />
          </span>
          <div>
            <p className="font-display text-foreground text-lg font-semibold">
              Inscriptions ouvertes
            </p>
            {inscriptionsMessage ? (
              <p className="text-foreground/85 mt-0.5 text-sm">{inscriptionsMessage}</p>
            ) : null}
          </div>
        </div>
        <Button onClick={onOpenInscription} className="md:shrink-0">
          Comment s’inscrire ?
        </Button>
      </div>
    </aside>
  )
}
