import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Réglages du site',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'contactEmail',
      title: 'Email de contact',
      type: 'string',
      validation: (Rule) => Rule.required().email().error('Adresse email invalide'),
    }),
    defineField({
      name: 'contactPhone',
      title: 'Téléphone',
      type: 'string',
    }),
    defineField({
      name: 'inscriptionsOuvertes',
      title: 'Inscriptions ouvertes',
      type: 'boolean',
      description:
        'Active une bannière sur le site et le bouton « S’inscrire ». Désactiver hors période d’inscription.',
      initialValue: false,
    }),
    defineField({
      name: 'inscriptionsMessage',
      title: 'Message d’inscription',
      type: 'string',
      description: 'Affiché uniquement si « Inscriptions ouvertes » est activé.',
      hidden: ({ document }) => !document?.inscriptionsOuvertes,
    }),
    defineField({
      name: 'saisonCourante',
      title: 'Saison courante',
      type: 'string',
      description: 'Format : 2026-2027',
      validation: (Rule) =>
        Rule.regex(/^\d{4}-\d{4}$/, { name: 'saison', invert: false }).error(
          'Format attendu : AAAA-AAAA (ex. 2026-2027)',
        ),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Réglages du site' }),
  },
})
