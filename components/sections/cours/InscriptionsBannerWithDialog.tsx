'use client'

import { useState } from 'react'

import { InscriptionDialog } from '@/components/cours/InscriptionDialog'
import type { DocumentTelechargeable } from '@/lib/sanity/types'

import { InscriptionsBanner } from './InscriptionsBanner'

type Props = {
  inscriptionsOuvertes: boolean
  inscriptionsMessage?: string | null
  inscriptionDoc: DocumentTelechargeable | null
  certificatDoc: DocumentTelechargeable | null
}

export function InscriptionsBannerWithDialog({
  inscriptionsOuvertes,
  inscriptionsMessage,
  inscriptionDoc,
  certificatDoc,
}: Props) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <InscriptionsBanner
        inscriptionsOuvertes={inscriptionsOuvertes}
        inscriptionsMessage={inscriptionsMessage}
        onOpenInscription={() => setOpen(true)}
      />
      <InscriptionDialog
        open={open}
        onOpenChange={setOpen}
        inscriptionDoc={inscriptionDoc}
        certificatDoc={certificatDoc}
      />
    </>
  )
}
