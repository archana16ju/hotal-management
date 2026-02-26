import type { CollectionConfig } from 'payload'

export const Tables: CollectionConfig = {
  slug: 'tables',
    admin: {
    useAsTitle: 'title', 
  },
  fields: [
    {
      name: 'title',  
      type: 'text',
      required: true,
      label: 'Restaurant Name',
    },
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
          name: 'tablecount',
          type: 'number',
          required: true,
          label: 'Number of Tables',
        },
      ],
    },
  ],
}