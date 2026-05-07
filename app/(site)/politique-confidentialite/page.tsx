import type { Metadata } from 'next'

import { LegalPage } from '@/components/shared/LegalPage'
import { politiqueConfidentialiteContent } from '@/content/politique-confidentialite'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Politique de confidentialité du site de la Gym Multisport Seyssins : traitement de vos données personnelles.',
  robots: { index: true, follow: true },
}

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPage
      title={politiqueConfidentialiteContent.title}
      intro={politiqueConfidentialiteContent.intro}
      sections={politiqueConfidentialiteContent.sections}
    />
  )
}
