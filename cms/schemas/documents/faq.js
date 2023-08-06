import {HomeIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'faq',
  type: 'document',
  title: 'FAQ',
  icon: HomeIcon,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // Title
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'editorial',
    }),

    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'richText',
      validation: (Rule) => Rule.required(),
      group: 'editorial',
    }),
  ],
  preview: {
    select: {
      title: 'question',
    },
    prepare({ title}) {
      return {
        subtitle: 'FAQ',
        title
      }
    },
  },
})
