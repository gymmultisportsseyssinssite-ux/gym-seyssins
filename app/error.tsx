'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[error.tsx]', error)
  }, [error])

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-xl text-center">
          <span
            aria-hidden="true"
            className="bg-destructive/10 text-destructive mx-auto flex size-20 items-center justify-center rounded-full"
          >
            <AlertTriangle className="size-9" />
          </span>
          <p className="text-muted-foreground mt-6 text-sm font-medium tracking-[0.2em] uppercase">
            Erreur inattendue
          </p>
          <h1 className="font-display text-foreground mt-3 text-[length:var(--text-3xl)]">
            Quelque chose s’est mal passé.
          </h1>
          <p className="text-muted-foreground mt-5 text-lg">
            Notre équipe a été informée. Vous pouvez réessayer ou revenir à l’accueil.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button onClick={reset} size="lg">
              Réessayer
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/">Retour à l’accueil</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
