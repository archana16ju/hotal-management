import { CollectionConfig } from 'payload';

const Orders: CollectionConfig = {
  slug: 'orders',

  admin: {
    useAsTitle: 'invoiceNumber'
  },

  fields: [
    {
      name: 'products',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'priceAtOrder',
          type: 'number',
        },
        {
          name: 'quantity',
          type: 'number',
          defaultValue: 1,
        },
        {
          name: 'subtotal',
          type: 'number',
          admin: { readOnly: true },
        },
      ],
    },
    {
      name: 'kotNumber',
      type: 'number',
      required: true,
    },
    {
      name: 'tableNumber',
      type: 'number',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Ordered', value: 'ordered' },
        { label: 'Prepared', value: 'prepared' },
        { label: 'Delivered', value: 'delivered' },
      ],
      defaultValue: 'ordered',
    },
    {
      name: 'invoiceNumber',
      type: 'text',
      admin: { 
        readOnly: true,
        position: 'sidebar'
      },
    },
    {
      name: 'totalAmount',
      type: 'number',
      admin: { 
        readOnly: true,
        position: 'sidebar'
      },
    },
  ],

  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {

        if (operation === 'create' && !data.invoiceNumber) {
          const random = Math.floor(Math.random() * 9000) + 1000;
          const datePart = new Date().toISOString().split('T')[0].replace(/-/g, '');
          data.invoiceNumber = `INV-${datePart}-${random}`;
        }

        let total = 0;
        if (data.products && Array.isArray(data.products)) {
          for (const item of data.products) {
            if ((!item.priceAtOrder || item.priceAtOrder === 0) && item.product) {
              try {
                const productDoc = await req.payload.findByID({
                  collection: 'products',
                  id: item.product,
                });
                item.priceAtOrder = (productDoc as any)?.price || 0;
              } catch (error) {
                console.error('Error fetching product:', error);
                item.priceAtOrder = 0;
              }
            }
            item.subtotal = (item.priceAtOrder || 0) * (item.quantity || 1);
            total += item.subtotal;
          }
        }
        data.totalAmount = total;

        return data;
      },
    ],
  },
};

export default Orders;
