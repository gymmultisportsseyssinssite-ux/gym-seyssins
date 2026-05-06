'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId, studioBasePath } from './sanity/env'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'

export default defineConfig({
  name: 'gym-seyssins',
  title: 'Gym Multisport Seyssins',
  basePath: studioBasePath,
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  document: {
    // Empêche la création de plusieurs documents siteSettings (singleton)
    actions: (input, context) =>
      context.schemaType === 'siteSettings'
        ? input.filter(({ action }) => !['duplicate', 'unpublish', 'delete'].includes(action ?? ''))
        : input,
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global'
        ? prev.filter((tpl) => tpl.templateId !== 'siteSettings')
        : prev,
  },
  studio: {
    components: {},
  },
})
