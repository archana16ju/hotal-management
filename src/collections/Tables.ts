import type { CollectionConfig } from 'payload'

export const Tables: CollectionConfig = {
  slug: 'tables',

  fields: [
    {
      name: 'sections',
      type: 'array',
      label: 'Sections',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          required: true,
          label: 'Section Title',
        },
        {
          name: 'tableCount',
          type: 'number',
          required: true,
          label: 'Number of Tables',
        },
      ],
    },
  ],
}