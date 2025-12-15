import { CollectionConfig } from 'payload'

export const Experience: CollectionConfig = {
  slug: 'experience',
  admin: {
    useAsTitle: 'role',
    defaultColumns: ['role', 'company', 'startDate', 'endDate'],
  },
  access: {
    read: () => true, // Public read access
    create: ({ req: { user } }) => !!user, // Only authenticated users can create
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Role/Position',
    },
    {
      name: 'company',
      type: 'text',
      required: true,
      label: 'Company Name',
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      label: 'Job Description',
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      label: 'Start Date',
      admin: {
        date: {
          pickerAppearance: 'monthOnly',
        },
      },
    },
    {
      name: 'isPresent',
      type: 'checkbox',
      label: 'Currently Working Here',
      defaultValue: false,
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'End Date',
      admin: {
        date: {
          pickerAppearance: 'monthOnly',
        },
        condition: (data) => !data.isPresent,
      },
    },
  ],
}