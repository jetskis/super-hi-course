import {HomeIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'richText',
    }),
  ],
  preview: {
    select: {
      title: 'question',
    },
    prepare({ title }) {
      return {
        title,
      }
    },
  },
})
