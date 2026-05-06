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

export const CONTACT = {
  email: 'contact@gym-seyssin.fr',
} as const
