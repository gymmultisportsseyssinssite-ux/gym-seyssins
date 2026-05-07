import { z } from 'zod'

export const SUJETS = ['information', 'inscription', 'cours', 'autre'] as const

export const contactSchema = z.object({
  prenom: z
    .string({ required_error: 'Prénom requis.' })
    .trim()
    .min(2, 'Au moins 2 caractères.')
    .max(80, 'Trop long.'),
  nom: z
    .string({ required_error: 'Nom requis.' })
    .trim()
    .min(2, 'Au moins 2 caractères.')
    .max(80, 'Trop long.'),
  email: z.string({ required_error: 'Email requis.' }).trim().email('Adresse email invalide.'),
  telephone: z.string().trim().max(40, 'Trop long.').optional().or(z.literal('')),
  sujet: z.enum(SUJETS, { required_error: 'Sujet requis.' }),
  message: z
    .string({ required_error: 'Message requis.' })
    .trim()
    .min(20, 'Au moins 20 caractères.')
    .max(2000, '2000 caractères maximum.'),
  rgpd: z.boolean().refine((v) => v === true, 'Vous devez accepter le traitement de vos données.'),
  // Honeypot — doit rester vide
  website: z.string().max(0).optional(),
})

export type ContactInput = z.infer<typeof contactSchema>

export const SUJET_LABEL: Record<(typeof SUJETS)[number], string> = {
  information: 'Demande d’information',
  inscription: 'Inscription',
  cours: 'Question sur un cours',
  autre: 'Autre',
}
