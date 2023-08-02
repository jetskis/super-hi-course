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
  name: 'module.standardText',
  title: 'Standard Text',
  type: 'object',
  icon: PackageIcon,
  groups: GROUPS,
  fields: [

    defineField({
      name: 'textAlign',
      title: 'Text Alignment',
      description: 'Default is center',
      type: 'string',
      group: 'editorial',
      initialValue: 'text-center',
      options: {
        layout: 'dropdown',
        list: ['text-left', 'text-center', 'text-right'],
      },
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'richText',
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
        title: 'Standard Text',
      }
    },
  },
})
