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

// =====================================================================
// Types métier — utilisés par les composants client (planning, modales)
// =====================================================================

export const JOURS_ORDRE: CoursJour[] = [
  'lundi',
  'mardi',
  'mercredi',
  'jeudi',
  'vendredi',
  'samedi',
]

export const JOUR_LABEL: Record<CoursJour, string> = {
  lundi: 'Lundi',
  mardi: 'Mardi',
  mercredi: 'Mercredi',
  jeudi: 'Jeudi',
  vendredi: 'Vendredi',
  samedi: 'Samedi',
}

export const NIVEAU_LABEL: Record<NiveauRequis, string> = {
  tous: 'Tous niveaux',
  débutant: 'Débutant',
  intermédiaire: 'Intermédiaire',
  avancé: 'Avancé',
}

export const CATEGORIE_ARTICLE_LABEL: Record<ArticleCategorie, string> = {
  actualité: 'Actualité',
  événement: 'Événement',
  communiqué: 'Communiqué',
}

export type DisciplineRef = {
  _id: string
  nom: string | null
  slug: string | null
  couleur: string | null
  niveauRequis: NiveauRequis | null
}

export type ProfesseurRef = {
  _id: string
  prenom: string | null
  nom: string | null
  photo?: SanityImage | null
}

export type CoursWithDetails = {
  _id: string
  titre: string | null
  jour: CoursJour | null
  heureDebut: string | null
  heureFin: string | null
  lieu: string | null
  placesMax: number | null
  placesRestantes: number | null
  statut: CoursStatut | null
  description: RichText | null
  ordre: number | null
  discipline: DisciplineRef | null
  professeur: ProfesseurRef | null
}

export type CoursLite = {
  _id: string
  titre: string | null
  jour: CoursJour | null
  heureDebut: string | null
  heureFin: string | null
  lieu: string | null
  professeur: { _id: string; prenom: string | null; nom: string | null } | null
}

export type DisciplineWithCours = {
  _id: string
  nom: string | null
  slug: string | null
  description: RichText | null
  couleur: string | null
  niveauRequis: NiveauRequis | null
  icone?: SanityImage | null
  cours: CoursLite[]
}

export type DocumentTelechargeable = {
  _id: string
  titre: string | null
  description: string | null
  saison: string | null
  fichierUrl: string | null
  fichierExtension: string | null
  fichierTaille: number | null
}

// =====================================================================
// Articles
// =====================================================================

export type ArticleAuthor = {
  _id: string
  prenom: string | null
  nom: string | null
  photo?: SanityImage | null
}

export type ArticleListItem = {
  _id: string
  titre: string | null
  slug: string | null
  datePublication: string | null
  dateEvenement: string | null
  chapo: string | null
  categorie: ArticleCategorie | null
  featured: boolean | null
  imagePrincipale: SanityImage | null
}

export type ArticleDetail = ArticleListItem & {
  contenu: RichText | null
  auteur: ArticleAuthor | null
  galerieInline?: SanityImage[] | null
}

export type ArticleBySlugResult = {
  article: ArticleDetail | null
  articlesLies: ArticleListItem[] | null
}

// =====================================================================
// Professeurs (avec cours détaillés)
// =====================================================================

export type ProfesseurCoursLite = {
  _id: string
  titre: string | null
  jour: CoursJour | null
  heureDebut: string | null
  heureFin: string | null
  lieu: string | null
  discipline: {
    _id: string
    nom: string | null
    slug: string | null
    couleur: string | null
  } | null
}

export type ProfesseurWithCours = {
  _id: string
  prenom: string | null
  nom: string | null
  photo?: SanityImage | null
  bio: RichText | null
  ordre: number | null
  specialites:
    | { _id: string; nom: string | null; slug: string | null; couleur: string | null }[]
    | null
  cours: ProfesseurCoursLite[]
}

// =====================================================================
// Galeries
// =====================================================================

export type GaleriePhoto = {
  _key?: string
  _type?: 'image'
  asset: { _ref?: string; _id?: string; url?: string }
  alt: string
  legende?: string
  hotspot?: { x: number; y: number; height?: number; width?: number }
}

export type GalerieListItem = {
  _id: string
  titre: string | null
  slug: string | null
  date: string | null
  description: string | null
  coverImage: SanityImage | null
  nombrePhotos: number | null
}

export type GalerieDetail = {
  _id: string
  titre: string | null
  slug: string | null
  date: string | null
  description: string | null
  coverImage: SanityImage | null
  photos: GaleriePhoto[] | null
  evenementLie: { _id: string; titre: string | null; slug: string | null } | null
}
