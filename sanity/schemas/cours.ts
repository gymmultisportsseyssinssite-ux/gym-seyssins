import { CalendarIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

const HOUR_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/

export const cours = defineType({
  name: 'cours',
  title: 'Cours',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'discipline',
      title: 'Discipline',
      type: 'reference',
      to: [{ type: 'discipline' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'professeur',
      title: 'Professeur',
      type: 'reference',
      to: [{ type: 'professeur' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'jour',
      title: 'Jour',
      type: 'string',
      options: {
        list: [
          { title: 'Lundi', value: 'lundi' },
          { title: 'Mardi', value: 'mardi' },
          { title: 'Mercredi', value: 'mercredi' },
          { title: 'Jeudi', value: 'jeudi' },
          { title: 'Vendredi', value: 'vendredi' },
          { title: 'Samedi', value: 'samedi' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heureDebut',
      title: 'Heure de début',
      type: 'string',
      description: 'Format 24h — ex. 18:30',
      validation: (Rule) =>
        Rule.required().regex(HOUR_REGEX, { name: 'heure' }).error('Format attendu : HH:MM'),
    }),
    defineField({
      name: 'heureFin',
      title: 'Heure de fin',
      type: 'string',
      description: 'Format 24h — ex. 19:30',
      validation: (Rule) =>
        Rule.required().regex(HOUR_REGEX, { name: 'heure' }).error('Format attendu : HH:MM'),
    }),
    defineField({
      name: 'lieu',
      title: 'Lieu',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'placesMax',
      title: 'Places max',
      type: 'number',
      validation: (Rule) => Rule.min(1).integer(),
    }),
    defineField({
      name: 'placesRestantes',
      title: 'Places restantes',
      type: 'number',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'statut',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: 'Ouvert', value: 'ouvert' },
          { title: 'Complet', value: 'complet' },
          { title: 'Liste d’attente', value: 'liste-attente' },
        ],
        layout: 'radio',
      },
      initialValue: 'ouvert',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
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
      title: 'Jour & heure',
      name: 'planning',
      by: [
        { field: 'jour', direction: 'asc' },
        { field: 'heureDebut', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      titre: 'titre',
      jour: 'jour',
      heureDebut: 'heureDebut',
      heureFin: 'heureFin',
      lieu: 'lieu',
    },
    prepare: ({ titre, jour, heureDebut, heureFin, lieu }) => ({
      title: titre ?? 'Cours',
      subtitle: [jour, heureDebut && heureFin ? `${heureDebut}–${heureFin}` : null, lieu]
        .filter(Boolean)
        .join(' · '),
    }),
  },
})
