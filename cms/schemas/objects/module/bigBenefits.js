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
  name: 'module.bigBenefits',
  title: 'Big Benefits',
  type: 'object',
  icon: PackageIcon,
  groups: GROUPS,
  fields: [
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      group: 'editorial',
      of: [{
        type: 'string',
      }]
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
        title: 'Big Benefits',
      }
    },
  },
})
