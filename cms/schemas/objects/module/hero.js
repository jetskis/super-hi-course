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
  name: 'module.hero',
  title: 'Hero',
  type: 'object',
  icon: PackageIcon,
  groups: GROUPS,
  fields: [

    defineField({
      name: 'text',
      title: 'Text',
      type: 'richText',
      group: 'editorial'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'editorial'
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
        title: 'Hero',
      }
    },
  },
})
