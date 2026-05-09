export const SITE = {
  name: 'Gym Multisport Seyssins',
  shortName: 'Gym Seyssins',
  description:
    'Association de gymnastique multisport à Seyssins (Isère). Activités physiques adaptées, conviviales et accessibles à toutes et tous.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  locale: 'fr-FR',
  city: 'Seyssins',
  department: 'Isère',
} as const

export const SITE_NAME = SITE.name
export const SITE_TAGLINE = 'Le sport au cœur de la convivialité'

export const ASSO_ADDRESS = {
  venue: 'Centre Sportif Yves Brouzet',
  street: '1 rue Joseph Moutin',
  postalCode: '38180',
  city: 'Seyssins',
} as const

export const CONTACT = {
  email: 'contact@gym-seyssin.fr',
} as const

export type NavItem = {
  label: string
  href: string
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Accueil', href: '/' },
  { label: "L'association", href: '/association' },
  { label: 'Cours', href: '/cours' },
  { label: 'Professeurs', href: '/professeurs' },
  { label: 'Actualités', href: '/actualites' },
  { label: 'Contact', href: '/contact' },
] as const

export const SOCIAL_LINKS = {
  facebook: '#',
  instagram: '#',
} as const
