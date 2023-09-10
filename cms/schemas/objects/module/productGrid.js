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
  name: 'module.productGrid',
  title: 'Product Grid',
  type: 'object',
  icon: PackageIcon,
  groups: GROUPS,
  fields: [
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      group: 'editorial',
      validation: Rule => Rule.required().min(1).max(3),
      of: [{
        type: 'object',
        name: 'productWithVariant',
        title: 'Product With Variant',
        fields: [
          defineField({
            name: 'product',
            title: 'Product',
            type: 'reference',
            to: { type: 'product' }
          }),
          defineField({
            name: 'productVariant',
            title: 'Product Variant',
            type: 'reference',
            to: { type: 'productVariant' },
            options: {
              filter: ({ parent }) => {
                const productId = parent?.product?._ref
                return {
                  filter: '_id in *[_id == $shopifyProductId][0].store.variants[]._ref',
                  params: {
                    shopifyProductId: productId
                  }
                }
              }
            }
          })
        ],
        preview: {
          select: {
            product: 'product'
          },
          prepare(selection) {
            const { product } = selection

            return {
              title: 'Product With Variant',
              subtitle: product.title
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
        title: 'Product Grid',
      }
    },
  },
})
