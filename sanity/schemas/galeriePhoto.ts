import { ImagesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const galeriePhoto = defineType({
  name: 'galeriePhoto',
  title: 'Galerie photo',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titre', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'evenementLie',
      title: 'Événement lié',
      type: 'reference',
      to: [{ type: 'article' }],
      description: 'Article associé à cette galerie (optionnel).',
    }),
    defineField({
      name: 'coverImage',
      title: 'Image de couverture',
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
      name: 'photos',
      title: 'Photos',
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
              validation: (Rule) => Rule.required().min(3),
            },
            {
              name: 'legende',
              type: 'string',
              title: 'Légende',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(50),
    }),
  ],
  orderings: [
    {
      title: 'Plus récente',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'titre',
      subtitle: 'date',
      media: 'coverImage',
    },
  },
})
