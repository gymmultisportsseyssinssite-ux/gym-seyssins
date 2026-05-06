// Types partagés côté front. Les types générés à partir des schémas
// (typegen) seront placés dans `types/sanity.ts` et pourront être
// réexportés ici si besoin.

import type { PortableTextBlock } from 'sanity'

export type SanityImage = {
  _type: 'image'
  asset: { _ref?: string; _id?: string; url?: string }
  alt: string
  legende?: string
  hotspot?: { x: number; y: number; height: number; width: number }
}

export type SanitySlug = string

export type ArticleCategorie = 'actualité' | 'événement' | 'communiqué'

export type CoursStatut = 'ouvert' | 'complet' | 'liste-attente'

export type CoursJour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi'

export type DocumentCategorie = 'inscription' | 'règlement' | 'médical' | 'autre'

export type NiveauRequis = 'tous' | 'débutant' | 'intermédiaire' | 'avancé'

export type RichText = PortableTextBlock[]
