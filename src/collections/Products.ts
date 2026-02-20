import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',

  admin: {
    useAsTitle: 'name',
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },

    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: true,
    },

    {
      name: 'description',
      type: 'textarea',
    },

    {
      name: 'variants',
      type: 'array',
      required: true,

      fields: [
        {
          name: 'unit',
          type: 'select',
          required: true,
          options: [
            { label: 'Gram', value: 'g' },
            { label: 'Kilogram', value: 'kg' },
            { label: 'Liter', value: 'ltr' },
            { label: 'Piece', value: 'pcs' },
          ],
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          admin: {
            description: 'Example: 1 kg, 500 g, 1 piece',
          },
        },
        {
          name: 'rate',
          type: 'number',
          required: true,
          admin: {
            description: 'Rate per unit (₹ per kg / piece)',
          },
        },
        {
          name: 'price',
          type: 'number',
          admin: {
            readOnly: true,
            description: 'Auto calculated: rate × quantity',
          },
        },
        {
          name: 'discount',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'tax',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'netPrice',
          type: 'number',
          admin: {
            readOnly: true,
            description: 'Final selling price',
          },
        },
        {
          name: 'stock',
          type: 'number',
          defaultValue: 0,
        },

      ],
    },
  ],

  hooks: {
    beforeChange: [
      ({ data }) => {

        if (data.variants && Array.isArray(data.variants)) {

          data.variants = data.variants.map((variant: any) => {

            const rate = variant.rate || 0
            const quantity = variant.quantity || 0
            const discount = variant.discount || 0
            const tax = variant.tax || 0

            const price = rate * quantity

            const netPrice = price - discount + tax

            return {
              ...variant,
              price,
              netPrice,
            }
          })
        }

        return data
      },
    ],
  },
}