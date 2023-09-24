import React from 'react'
import {defineField, defineType} from 'sanity'
import {PackageIcon} from '@sanity/icons'


export default defineType({
  name: 'module.reusableModule',
  title: 'Reusable Module',
  type: 'object',
  icon: PackageIcon,
  fields: [

    defineField({
      name: 'module',
      title: 'Reusable Module',
      type: 'reference',
      to: { type: 'reusableModule'},
    }),
  ],
  preview: {
    select: {},
    prepare(selection) {
      return {
        title: 'Reusable Module',
      }
    },
  },
})
