import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const professeur = defineType({
  name: 'professeur',
  title: 'Professeur',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'prenom',
      title: 'Prénom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nom',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
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
    }),
    defineField({
      name: 'bio',
      title: 'Biographie',
      type: 'blockContent',
    }),
    defineField({
      name: 'specialites',
      title: 'Spécialités',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'discipline' }] }],
    }),
    defineField({
      name: 'ordre',
      title: 'Ordre d’affichage',
      type: 'number',
      description: 'Plus le nombre est petit, plus le professeur apparaît en premier.',
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: 'Ordre d’affichage',
      name: 'ordreAsc',
      by: [
        { field: 'ordre', direction: 'asc' },
        { field: 'nom', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      prenom: 'prenom',
      nom: 'nom',
      media: 'photo',
    },
    prepare: ({ prenom, nom, media }) => ({
      title: `${prenom ?? ''} ${nom ?? ''}`.trim() || 'Professeur',
      media,
    }),
  },
})
