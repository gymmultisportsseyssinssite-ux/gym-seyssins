import 'server-only'

import { sanityClient } from './client'
import { siteSettingsQuery } from './queries'
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
