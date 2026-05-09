'use client'

import Link from 'next/link'
import { Download, FileText, MapPin, Mail } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { inscriptionsContent } from '@/content/inscriptions'
import { ASSO_ADDRESS } from '@/lib/constants'
import type { DocumentTelechargeable } from '@/lib/sanity/types'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  inscriptionDoc: DocumentTelechargeable | null
  certificatDoc: DocumentTelechargeable | null
}

export function InscriptionDialog({ open, onOpenChange, inscriptionDoc, certificatDoc }: Props) {
  const { steps, permanences } = inscriptionsContent

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Comment s’inscrire ?</DialogTitle>
          <DialogDescription>
            Trois étapes pour rejoindre la Gym Multisport Seyssins.
          </DialogDescription>
        </DialogHeader>

        <ol className="mt-2 flex flex-col gap-6">
          {steps.map((step) => (
            <li
              key={step.number}
              className="border-border bg-card grid grid-cols-[auto_1fr] gap-4 rounded-[var(--radius-lg)] border p-5"
            >
              <span
                aria-hidden="true"
                className="font-display bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-full text-lg font-semibold"
              >
                {step.number}
              </span>
              <div>
                <h3 className="text-foreground font-semibold">{step.title}</h3>
                <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Étape 1 — bouton de téléchargement du PDF inscription */}
                {step.number === 1 ? (
                  <div className="mt-4">
                    {inscriptionDoc?.fichierUrl ? (
                      <Button asChild size="sm">
                        <a href={inscriptionDoc.fichierUrl} download>
                          <Download className="size-4" aria-hidden="true" />
                          Télécharger le dossier
                          {inscriptionDoc.saison ? ` ${inscriptionDoc.saison}` : ''}
                        </a>
                      </Button>
                    ) : (
                      <p className="text-muted-foreground text-sm italic">
                        Le dossier sera disponible prochainement.
                      </p>
                    )}
                  </div>
                ) : null}

                {/* Étape 2 — lien vers le modèle de certificat médical */}
                {step.number === 2 && certificatDoc?.fichierUrl ? (
                  <div className="mt-4">
                    <Button asChild size="sm" variant="secondary">
                      <a href={certificatDoc.fichierUrl} download>
                        <FileText className="size-4" aria-hidden="true" />
                        Modèle de certificat médical
                      </a>
                    </Button>
                  </div>
                ) : null}

                {/* Étape 3 — adresse + permanences */}
                {step.number === 3 ? (
                  <div className="mt-4 space-y-3 text-sm">
                    <p className="flex items-start gap-2">
                      <MapPin className="text-primary mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      <span>
                        {ASSO_ADDRESS.venue}
                        <br />
                        {ASSO_ADDRESS.street}
                        <br />
                        {ASSO_ADDRESS.postalCode} {ASSO_ADDRESS.city}
                      </span>
                    </p>
                    <div>
                      <p className="text-foreground font-medium">Permanences de rentrée</p>
                      <ul className="text-muted-foreground mt-1 flex flex-col gap-1">
                        {permanences.map((p) => (
                          <li key={p}>· {p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>

        <DialogFooter className="flex-col gap-3 sm:flex-row sm:justify-between sm:gap-2">
          <Button asChild variant="link" className="self-start">
            <Link href="/contact" onClick={() => onOpenChange(false)}>
              <Mail className="size-4" aria-hidden="true" />
              Une question ? Contactez-nous
            </Link>
          </Button>
          <DialogClose asChild>
            <Button>J’ai compris</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
