import type { CollectionConfig } from 'payload'

export const Tables: CollectionConfig = {
  slug: 'tables',

  admin: {
    useAsTitle: 'tableNumber',
  },

  fields: [
    {
    name: 'title',
    type: 'select',
    required: true,
     options: [
    {
      label: 'Normal Table',
      value: 'normal-table',
    },
    {
      label: 'VIP Table',
      value: 'vip-table',
    },
    {
      label: 'Family Table',
      value: 'family-table',
    },
    {
      label: 'Outdoor Table',
      value: 'outdoor-table',
    },
    ],
    defaultValue: 'normal-table',
    },
    {
      name: 'tableNumber',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'capacity',
      type: 'number',
      defaultValue: 4,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Occupied', value: 'occupied' },
      ],
      defaultValue: 'available',
    },
    {
      name: 'addons',
      label: 'Add On Tables / Extras',
      type: 'array',
      fields: [
        {
          name: 'addonName',
          type: 'text',
          required: true,
        },
        {
          name: 'addonCapacity',
          type: 'number',
          defaultValue: 1,
        },
        {
          name: 'addonPrice',
          type: 'number',
        },
        {
          name: 'addonStatus',
          type: 'select',
          options: [
            { label: 'Available', value: 'available' },
            { label: 'Occupied', value: 'occupied' },
          ],
          defaultValue: 'available',
        },
      ],
    },
  ],
}