import { defineArrayMember, defineType } from 'sanity'

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Contenu enrichi',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      title: 'Bloc',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Titre 2', value: 'h2' },
        { title: 'Titre 3', value: 'h3' },
        { title: 'Citation', value: 'blockquote' },
        { title: 'Légende', value: 'caption' },
      ],
      lists: [
        { title: 'Puces', value: 'bullet' },
        { title: 'Numérotée', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Gras', value: 'strong' },
          { title: 'Italique', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Lien',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (Rule) =>
                  Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
              },
              {
                name: 'targetBlank',
                type: 'boolean',
                title: 'Ouvrir dans un nouvel onglet',
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif',
          description: 'Décrit l’image pour l’accessibilité (obligatoire).',
          validation: (Rule) => Rule.required().min(3),
        },
        {
          name: 'legende',
          type: 'string',
          title: 'Légende',
        },
      ],
    }),
    defineArrayMember({
      name: 'separator',
      type: 'object',
      title: 'Séparateur décoratif',
      fields: [
        {
          name: 'style',
          type: 'string',
          title: 'Style',
          options: {
            list: [
              { title: 'Ligne fine', value: 'line' },
              { title: 'Ornement', value: 'ornament' },
            ],
            layout: 'radio',
          },
          initialValue: 'line',
        },
      ],
      preview: {
        prepare: () => ({ title: '— Séparateur —' }),
      },
    }),
  ],
})
