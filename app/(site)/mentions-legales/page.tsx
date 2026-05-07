import type { Metadata } from 'next'

import { LegalPage } from '@/components/shared/LegalPage'
import { mentionsLegalesContent } from '@/content/mentions-legales'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description:
    'Mentions légales du site de la Gym Multisport Seyssins : éditeur, hébergeur, propriété intellectuelle.',
  robots: { index: true, follow: true },
}

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      title={mentionsLegalesContent.title}
      intro={mentionsLegalesContent.intro}
      sections={mentionsLegalesContent.sections}
    />
  )
}
