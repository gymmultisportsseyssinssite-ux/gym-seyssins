import Link from 'next/link'
import { Compass } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-xl text-center">
          <span
            aria-hidden="true"
            className="bg-primary/10 text-primary mx-auto flex size-20 items-center justify-center rounded-full"
          >
            <Compass className="size-9" />
          </span>
          <p className="text-primary mt-6 text-sm font-medium tracking-[0.2em] uppercase">
            Erreur 404
          </p>
          <h1 className="font-display text-foreground mt-3 text-[length:var(--text-3xl)]">
            Oups ! Cette page n’existe pas.
          </h1>
          <p className="text-muted-foreground mt-5 text-lg">
            Le lien que vous avez suivi est peut-être erroné, ou la page a été déplacée. Pas de
            souci, on vous remet sur la bonne voie.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/">Retour à l’accueil</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/cours">Voir nos cours</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
