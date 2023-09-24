import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

const GROUPS = [
  {
    name: 'editorial',
    title: 'Editorial',
    default: true,
  },
  {
    name: 'extendedProducts',
    title: 'Extended products',
  },
  {
    name: 'seo',
    title: 'SEO',
  },
]

export default defineType({
  name: 'productLanding',
  title: 'Product Landing',
  type: 'document',
  icon: TagIcon,
  groups: GROUPS,
  fields: [

    // Title (proxy)
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'editorial',
    }),

    defineField({
      name: 'slug',
      ttile: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'editorial',
    }),

    defineField({
      name: 'productReference',
      type: 'reference',
      to: {type: 'product'},
      group: 'editorial',
    }),


    defineField({
      name: 'body',
      title: 'Body',
      type: 'richText',
      group: 'editorial',
    }),
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'productComponentList',
      group: 'editorial',
    }),

    defineField({
      name: 'associatedProducts',
      title: 'Associated products',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      group: 'extendedProducts',
    }),
 

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const { title } = selection

      return {
        // subtitle,
        title,
      }
    },
  },
})
