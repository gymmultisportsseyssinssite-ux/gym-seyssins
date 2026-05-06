import { DownloadIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const documentTelechargeable = defineType({
  name: 'documentTelechargeable',
  title: 'Document téléchargeable',
  type: 'document',
  icon: DownloadIcon,
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'fichier',
      title: 'Fichier',
      type: 'file',
      options: { accept: '.pdf,.doc,.docx' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Inscription', value: 'inscription' },
          { title: 'Règlement', value: 'règlement' },
          { title: 'Médical', value: 'médical' },
          { title: 'Autre', value: 'autre' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'saison',
      title: 'Saison',
      type: 'string',
      description: 'Optionnel — ex. 2026-2027',
    }),
    defineField({
      name: 'ordre',
      title: 'Ordre d’affichage',
      type: 'number',
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: 'Catégorie & ordre',
      name: 'categorieOrdre',
      by: [
        { field: 'categorie', direction: 'asc' },
        { field: 'ordre', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'titre', subtitle: 'categorie' },
  },
})
