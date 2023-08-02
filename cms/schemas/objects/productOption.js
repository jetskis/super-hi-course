import {SunIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  title: 'Product option',
  name: 'productOption',
  type: 'object',
  icon: SunIcon,
  readOnly: true,
  fields: [
    // Name
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      name: 'position',
      title: 'Position',
      type: 'number',
      readOnly: true,
    },
    // Values
    {
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [{type: 'productVariantOptionValue'}],
      readOnly: true,
    },
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare(selection) {
      const {name} = selection

      return {
        title: name,
      }
    },
  },
})
