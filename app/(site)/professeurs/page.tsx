import type { Metadata } from 'next'

import { PageHero } from '@/components/shared/PageHero'
import { ProfesseursGrid } from '@/components/professeurs/ProfesseursGrid'
import { getAllProfesseurs } from '@/lib/sanity/fetch'
import type { ProfesseurWithCours } from '@/lib/sanity/types'

export const metadata: Metadata = {
  title: 'L’équipe pédagogique',
  description:
    'Rencontrez les professeurs de la Gym Multisport Seyssins, leurs spécialités et les cours qu’ils animent.',
}

export default async function ProfesseursPage() {
  const raw = (await getAllProfesseurs().catch(() => [])) ?? []
  const professeurs = raw as unknown as ProfesseurWithCours[]

  return (
    <>
      <PageHero
        eyebrow="Notre équipe"
        title="L’équipe pédagogique"
        subtitle="Des professeurs diplômés et passionnés, qui adaptent leurs cours à chaque adhérent."
        imageSrc="/images/professeurs-hero.jpg"
        imageAlt="Cours collectif de fitness"
      />
      <section className="bg-background">
        <div className="container-content py-16 md:py-20">
          <ProfesseursGrid professeurs={professeurs} />
        </div>
      </section>
    </>
  )
}
