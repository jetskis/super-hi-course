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
  name: 'module.valueProps',
  title: 'Value Props',
  type: 'object',
  icon: PackageIcon,
  groups: GROUPS,
  fields: [
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      group: 'editorial',
      validation: Rule => Rule.required().min(1).max(3),
      of: [{
        type: 'object',
        name: 'value',
        title: 'Value',
        fields: [
          defineField({
            name: 'text',
            title: 'Text',
            type: 'richText',
          }),
        ],
        preview: {
          select: {
            text: 'text'
          },
          prepare(selection) {
            const { text } = selection

            const block = (text || []).find(block => block._type === 'block')
            return {
              title: block.children[0]?.text || 'Value',
            }
          }
        }
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
        title: 'Value Props',
      }
    },
  },
})
