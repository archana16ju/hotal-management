import type { CollectionConfig } from 'payload'
import { QRPrintGenerate } from '../components/QRPrintGenerate'
import QRDisplay from '../components/QRDisplay'

export const QrSettings: CollectionConfig = {
  slug: 'qr-settings',
  timestamps: true,

  admin: {
    group: 'Settings',
    useAsTitle: 'name',
    components: {
      edit: {
        beforeDocumentControls: [QRPrintGenerate as any],
      },
    },
  },

  access: {
    read: () => true,
    create: () => true,
    update: () => true,
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Settings Name',
    },

    {
      name: 'tablecollections',
      type: 'relationship',
      relationTo: 'tables',
      required: true,
      label: 'Tables Collection',
    },

    {
      name: 'qrConfig',
      type: 'group',
      label: 'QR Configuration',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
          label: 'Enable QR Generation',
        },
        {
          name: 'baseurl',
          type: 'text',
          required: true,
          label: 'Base URL',
        },
        {
          name: 'size',
          type: 'number',
          defaultValue: 300,
          min: 100,
          max: 600,
        },
        {
          name: 'logoImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo',
        },
      ],
    },

    {
      name: 'printconfig',
      type: 'group',
      label: 'Print Settings',
      fields: [
        {
          name: 'printsize',
          type: 'select',
          defaultValue: 'medium',
          options: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
        },
        {
          name: 'includeTableNumber',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'printTemplate',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'qrDisplay',
      type: 'ui',
      admin: {
        components: {
          Field: QRDisplay as any,
        },
      },
    },
     {
      name: 'generatedQRs',
      type: 'array',
      label: 'Generated QR Codes',
      admin: {
        readOnly: true,
        position: 'sidebar'
      },
      fields: [
        {
          name: 'tableId',
          type: 'text',
        },
        {
          name: 'tableName',
          type: 'text',
        },
        {
          name: 'qrUrl',
          type: 'text',
        },
        {
          name: 'qrBase64',
          type: 'text',
        },
        {
          name: 'printReady',
          type: 'checkbox',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Generating', value: 'generating' },
        { label: 'Ready to print', value: 'ready' },
      ],
    },
  ],
}