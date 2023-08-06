import React from 'react'
import {defineField, defineType} from 'sanity'
import {PackageIcon} from '@sanity/icons'

import {COLORS} from '../../../constants'

const GROUPS = [
  {
    name: 'theme',
    title: 'Theme',
  },
  {
    default: true,
    name: 'editorial',
    title: 'Editorial',
  },
]

export default defineType({
  name: 'module.faqs',
  title: 'FAQs',
  type: 'object',
  icon: PackageIcon,
  groups: GROUPS,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'editorial',
    }),
    defineField({
      name: 'faqList',
      title: 'FAQs',
      type: 'array',
      of: [
        {type: 'reference', to: [{ type: 'faq' }]}
      ],
      group: 'editorial',
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'bgColor',
      title: 'Background Color',
      type: 'color',
      group: 'theme',
      options: {
        colorList: COLORS,
      },
    }),
  ],
  preview: {
    select: {},
    prepare(selection) {
      return {
        title: 'FAQs',
      }
    },
  },
})
