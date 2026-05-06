import type { SchemaTypeDefinition } from 'sanity'

import { blockContent } from './blocks/blockContent'
import { article } from './article'
import { cours } from './cours'
import { discipline } from './discipline'
import { documentTelechargeable } from './documentTelechargeable'
import { galeriePhoto } from './galeriePhoto'
import { professeur } from './professeur'
import { siteSettings } from './siteSettings'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Réutilisables
  blockContent,
  // Documents
  siteSettings,
  article,
  discipline,
  cours,
  professeur,
  documentTelechargeable,
  galeriePhoto,
]
