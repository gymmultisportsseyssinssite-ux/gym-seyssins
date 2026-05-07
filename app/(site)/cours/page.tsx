import type { Metadata } from 'next'

import { CoursHero } from '@/components/sections/cours/CoursHero'
import { DisciplinesDetailees } from '@/components/sections/cours/DisciplinesDetailees'
import { InscriptionsBannerWithDialog } from '@/components/sections/cours/InscriptionsBannerWithDialog'
import { PlanningSection } from '@/components/sections/cours/PlanningSection'
import { FadeIn } from '@/components/shared/FadeIn'
import {
  getAllCours,
  getCertificatMedicalDocument,
  getDisciplinesWithCours,
  getInscriptionDocument,
  getSiteSettings,
} from '@/lib/sanity/fetch'
import type {
  CoursWithDetails,
  DisciplineWithCours,
  DocumentTelechargeable,
} from '@/lib/sanity/types'

export const metadata: Metadata = {
  title: 'Nos cours',
  description:
    'Planning hebdomadaire de la Gym Multisport Seyssins : disciplines, créneaux, professeurs et inscription.',
}

export default async function CoursPage() {
  const [settings, disciplinesRaw, coursRaw, inscriptionDoc, certificatDoc] = await Promise.all([
    getSiteSettings().catch(() => null),
    getDisciplinesWithCours().catch(() => []),
    getAllCours().catch(() => []),
    getInscriptionDocument().catch(() => null),
    getCertificatMedicalDocument().catch(() => null),
  ])

  const disciplines = (disciplinesRaw ?? []) as unknown as DisciplineWithCours[]
  const cours = (coursRaw ?? []) as unknown as CoursWithDetails[]
  const inscription = inscriptionDoc as DocumentTelechargeable | null
  const certificat = certificatDoc as DocumentTelechargeable | null

  return (
    <>
      <CoursHero />
      <InscriptionsBannerWithDialog
        inscriptionsOuvertes={settings?.inscriptionsOuvertes ?? false}
        inscriptionsMessage={settings?.inscriptionsMessage ?? null}
        inscriptionDoc={inscription}
        certificatDoc={certificat}
      />
      <FadeIn>
        <DisciplinesDetailees disciplines={disciplines} />
      </FadeIn>
      <FadeIn>
        <PlanningSection cours={cours} inscriptionDoc={inscription} certificatDoc={certificat} />
      </FadeIn>
    </>
  )
}
