import 'server-only'

import { sanityClient } from './client'
import {
  allArticlesQuery,
  allDisciplinesQuery,
  featuredArticlesQuery,
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
