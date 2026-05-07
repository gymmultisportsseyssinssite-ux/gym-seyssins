import type { MetadataRoute } from 'next'

import { SITE } from '@/lib/constants'
import { getAllArticleSlugs, getAllGalerieSlugs } from '@/lib/sanity/fetch'

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: '/', changeFrequency: 'weekly', priority: 1.0 },
  { url: '/association', changeFrequency: 'monthly', priority: 0.8 },
  { url: '/cours', changeFrequency: 'weekly', priority: 0.9 },
  { url: '/professeurs', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/actualites', changeFrequency: 'weekly', priority: 0.8 },
  { url: '/galeries', changeFrequency: 'monthly', priority: 0.6 },
  { url: '/documents', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/infos-pratiques', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/contact', changeFrequency: 'yearly', priority: 0.6 },
  { url: '/mentions-legales', changeFrequency: 'yearly', priority: 0.2 },
  { url: '/politique-confidentialite', changeFrequency: 'yearly', priority: 0.2 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const [articleSlugs, galerieSlugs] = await Promise.all([
    getAllArticleSlugs().catch(() => []),
    getAllGalerieSlugs().catch(() => []),
  ])

  const articles = ((articleSlugs ?? []) as { slug: string }[])
    .filter((s) => Boolean(s?.slug))
    .map((s) => ({
      url: `${SITE.url}/actualites/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))

  const galeries = ((galerieSlugs ?? []) as { slug: string }[])
    .filter((s) => Boolean(s?.slug))
    .map((s) => ({
      url: `${SITE.url}/galeries/${s.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    }))

  return [
    ...STATIC_ROUTES.map((r) => ({
      ...r,
      url: `${SITE.url}${r.url}`,
      lastModified: now,
    })),
    ...articles,
    ...galeries,
  ]
}
