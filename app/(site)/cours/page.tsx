import type { Metadata } from 'next'

import { DisciplinesDetailees } from '@/components/sections/cours/DisciplinesDetailees'
import { PlanningSection } from '@/components/sections/cours/PlanningSection'
import { FadeIn } from '@/components/shared/FadeIn'
import {
  getAllCours,
  getCertificatMedicalDocument,
  getDisciplinesWithCours,
  getInscriptionDocument,
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
  const [disciplinesRaw, coursRaw, inscriptionDoc, certificatDoc] = await Promise.all([
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
      <FadeIn>
        <DisciplinesDetailees disciplines={disciplines} />
      </FadeIn>
      <FadeIn>
        <PlanningSection cours={cours} inscriptionDoc={inscription} certificatDoc={certificat} />
      </FadeIn>
    </>
  )
}
