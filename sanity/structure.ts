import {
  CalendarIcon,
  CogIcon,
  DocumentTextIcon,
  DownloadIcon,
  ImagesIcon,
  TagIcon,
  UsersIcon,
} from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      // 📰 Actualités
      S.listItem()
        .title('Actualités')
        .icon(DocumentTextIcon)
        .schemaType('article')
        .child(S.documentTypeList('article').title('Actualités')),

      // 📅 Cours et planning
      S.listItem()
        .title('Cours et planning')
        .icon(CalendarIcon)
        .child(
          S.list()
            .title('Cours et planning')
            .items([
              S.listItem()
                .title('Cours')
                .icon(CalendarIcon)
                .schemaType('cours')
                .child(S.documentTypeList('cours').title('Cours')),
              S.listItem()
                .title('Disciplines')
                .icon(TagIcon)
                .schemaType('discipline')
                .child(S.documentTypeList('discipline').title('Disciplines')),
            ]),
        ),

      // 👥 Équipe
      S.listItem()
        .title('Équipe')
        .icon(UsersIcon)
        .schemaType('professeur')
        .child(S.documentTypeList('professeur').title('Équipe')),

      // 🖼️ Galeries photo
      S.listItem()
        .title('Galeries photo')
        .icon(ImagesIcon)
        .schemaType('galeriePhoto')
        .child(S.documentTypeList('galeriePhoto').title('Galeries photo')),

      // 📄 Documents téléchargeables
      S.listItem()
        .title('Documents téléchargeables')
        .icon(DownloadIcon)
        .schemaType('documentTelechargeable')
        .child(S.documentTypeList('documentTelechargeable').title('Documents téléchargeables')),

      S.divider(),

      // ⚙️ Réglages (singleton)
      S.listItem()
        .title('Réglages du site')
        .icon(CogIcon)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Réglages du site'),
        ),
    ])
