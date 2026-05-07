import 'server-only'

import { sanityClient } from './client'
import {
  allArticleSlugsQuery,
  allArticlesPaginatedAscQuery,
  allArticlesPaginatedDescQuery,
  allArticlesQuery,
  allCoursWithDetailsQuery,
  allDisciplinesQuery,
  allGalerieSlugsQuery,
  allGaleriesQuery,
  allProfesseursWithCoursDetailsQuery,
  articleBySlugQuery,
  certificatMedicalDocumentQuery,
  disciplinesWithCoursListQuery,
  featuredArticlesQuery,
  galerieBySlugQuery,
  inscriptionDocumentLatestQuery,
  siteSettingsQuery,
} from './queries'
import { readToken } from '@/sanity/env'

type SiteSettings = {
  contactEmail?: string
  contactPhone?: string
  inscriptionsOuvertes?: boolean
  inscriptionsMessage?: string
  saisonCourante?: string
} | null

const serverClient = sanityClient.withConfig({
  token: readToken,
  useCdn: false,
})

export async function getSiteSettings(): Promise<SiteSettings> {
  return serverClient.fetch(
    siteSettingsQuery,
    {},
    { next: { revalidate: 60, tags: ['siteSettings'] } },
  )
}

export async function getDisciplines() {
  return serverClient.fetch(
    allDisciplinesQuery,
    {},
    { next: { revalidate: 300, tags: ['discipline'] } },
  )
}

export async function getDisciplinesWithCours() {
  return serverClient.fetch(
    disciplinesWithCoursListQuery,
    {},
    { next: { revalidate: 300, tags: ['discipline', 'cours'] } },
  )
}

export async function getAllCours() {
  return serverClient.fetch(
    allCoursWithDetailsQuery,
    {},
    { next: { revalidate: 300, tags: ['cours'] } },
  )
}

export async function getInscriptionDocument() {
  return serverClient.fetch(
    inscriptionDocumentLatestQuery,
    {},
    { next: { revalidate: 300, tags: ['documentTelechargeable'] } },
  )
}

export async function getCertificatMedicalDocument() {
  return serverClient.fetch(
    certificatMedicalDocumentQuery,
    {},
    { next: { revalidate: 300, tags: ['documentTelechargeable'] } },
  )
}

export async function getFeaturedArticles() {
  return serverClient.fetch(
    featuredArticlesQuery,
    {},
    { next: { revalidate: 300, tags: ['article'] } },
  )
}

export async function getAllArticles() {
  return serverClient.fetch(allArticlesQuery, {}, { next: { revalidate: 300, tags: ['article'] } })
}

export async function getArticlesPaginated(opts: {
  start: number
  end: number
  categorie: string | null
  sort: 'desc' | 'asc'
}) {
  const query = opts.sort === 'asc' ? allArticlesPaginatedAscQuery : allArticlesPaginatedDescQuery
  return serverClient.fetch(
    query,
    { start: opts.start, end: opts.end, categorie: opts.categorie },
    { next: { revalidate: 300, tags: ['article'] } },
  )
}

export async function getAllArticleSlugs() {
  return serverClient.fetch(
    allArticleSlugsQuery,
    {},
    { next: { revalidate: 600, tags: ['article'] } },
  )
}

export async function getArticleBySlug(slug: string) {
  return serverClient.fetch(
    articleBySlugQuery,
    { slug },
    { next: { revalidate: 300, tags: ['article', `article:${slug}`] } },
  )
}

export async function getAllProfesseurs() {
  return serverClient.fetch(
    allProfesseursWithCoursDetailsQuery,
    {},
    { next: { revalidate: 300, tags: ['professeur', 'cours'] } },
  )
}

export async function getAllGaleries() {
  return serverClient.fetch(
    allGaleriesQuery,
    {},
    { next: { revalidate: 300, tags: ['galeriePhoto'] } },
  )
}

export async function getAllGalerieSlugs() {
  return serverClient.fetch(
    allGalerieSlugsQuery,
    {},
    { next: { revalidate: 600, tags: ['galeriePhoto'] } },
  )
}

export async function getGalerieBySlug(slug: string) {
  return serverClient.fetch(
    galerieBySlugQuery,
    { slug },
    { next: { revalidate: 300, tags: ['galeriePhoto', `galeriePhoto:${slug}`] } },
  )
}
