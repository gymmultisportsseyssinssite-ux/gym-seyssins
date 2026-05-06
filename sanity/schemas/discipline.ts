import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const discipline = defineType({
  name: 'discipline',
  title: 'Discipline',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'nom',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'nom', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'couleur',
      title: 'Couleur',
      type: 'string',
      description: 'Code hexadécimal — ex. #C66B4F',
      validation: (Rule) =>
        Rule.required()
          .regex(/^#[0-9A-Fa-f]{6}$/, {
            name: 'hex',
            invert: false,
          })
          .error('Format attendu : #RRGGBB'),
    }),
    defineField({
      name: 'icone',
      title: 'Icône',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif',
        },
      ],
    }),
    defineField({
      name: 'niveauRequis',
      title: 'Niveau requis',
      type: 'string',
      options: {
        list: [
          { title: 'Tous niveaux', value: 'tous' },
          { title: 'Débutant', value: 'débutant' },
          { title: 'Intermédiaire', value: 'intermédiaire' },
          { title: 'Avancé', value: 'avancé' },
        ],
        layout: 'radio',
      },
      initialValue: 'tous',
    }),
  ],
  preview: {
    select: { title: 'nom', subtitle: 'niveauRequis', media: 'icone' },
  },
})
