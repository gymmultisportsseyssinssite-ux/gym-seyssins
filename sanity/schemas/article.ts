import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required().min(5),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titre', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'datePublication',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateEvenement',
      title: 'Date de l’événement',
      type: 'datetime',
      description: 'Optionnel — uniquement si l’article concerne un événement daté.',
    }),
    defineField({
      name: 'imagePrincipale',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif',
          validation: (Rule) => Rule.required().min(3),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'chapo',
      title: 'Chapô',
      type: 'text',
      rows: 3,
      description: 'Résumé court (≤ 200 caractères) affiché sur les listes et cartes.',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'contenu',
      title: 'Contenu',
      type: 'blockContent',
    }),
    defineField({
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Actualité', value: 'actualité' },
          { title: 'Événement', value: 'événement' },
          { title: 'Communiqué', value: 'communiqué' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'À la une',
      type: 'boolean',
      description: 'Mettre en avant sur la page d’accueil.',
      initialValue: false,
    }),
    defineField({
      name: 'auteur',
      title: 'Auteur',
      type: 'reference',
      to: [{ type: 'professeur' }],
    }),
    defineField({
      name: 'galerieInline',
      title: 'Galerie de photos (en bas d’article)',
      description:
        'Photos additionnelles affichées en bas de l’article. Cliquer sur une photo ouvre la visionneuse plein écran. 3 photos minimum recommandées pour un bel effet.',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texte alternatif',
              description: 'Décrire la photo en quelques mots (accessibilité).',
              validation: (Rule) => Rule.required().min(3),
            },
            {
              name: 'legende',
              type: 'string',
              title: 'Légende (optionnelle)',
              description: 'Affichée sous la photo en visionneuse plein écran.',
            },
          ],
        },
      ],
      options: { layout: 'grid' },
    }),
  ],
  orderings: [
    {
      title: 'Plus récent',
      name: 'recent',
      by: [{ field: 'datePublication', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'titre',
      subtitle: 'categorie',
      media: 'imagePrincipale',
      featured: 'featured',
    },
    prepare: ({ title, subtitle, media, featured }) => ({
      title: featured ? `★ ${title}` : title,
      subtitle,
      media,
    }),
  },
})
