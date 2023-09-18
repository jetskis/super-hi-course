import React from 'react'
import Emoji from 'a11y-react-emoji'

import {defineField} from 'sanity'

const Icon = () => <Emoji style={{fontSize: '1.25em'}} symbol="🏡" />

export default {
  name: 'theme',
  title: 'Theme',
  icon: Icon,
  type: 'document',
  groups: [
    {
      name: 'theme',
      default: true,
      title: 'Theme',
    },
    {
      name: 'promo',
      title: 'Promo',
    }
  ],
  fields: [
    {
      name: 'themeTitle',
      type: 'string',
      title: 'Theme Title',
      group: 'theme',
    },
    {
      name: 'launchDate',
      type: 'date',
      title: 'Launch Date',
      description: 'Select the date you want to launch the site.',
      group: 'theme',
    },
    {
      name: 'homepage',
      title: 'Homepage',
      description: 'Select the page you want to be the homepage on the marketing site.',
      type: 'reference',
      to: [{type: 'home'}],
      validation: Rule => Rule.required(),
      group: 'theme',
    },
    {
      name: 'headerMenu',
      title: 'Header Menu',
      description: 'Build complex menus from the menu area, assign them here to update the menu everywhere',
      type: 'reference',
      to: { type: 'header' },
      group: 'theme',
			// validation: Rule => Rule.required()
    },
    {
      name: 'footerMenu',
      title: 'Footer Menu',
      description: 'Build complex menus from the module area, assign them here to update the menu everywhere',
      type: 'reference',
      to: { type: 'footer' },
      group: 'theme',
			// validation: Rule => Rule.required()
    },
    {
      name: 'cart',
      title: 'Cart',
      description: 'Create custom carts in preparation for high volume experiences, or merchandise difference products across storefronts.',
      type: 'reference',
      to: { type: 'cart' },
      group: 'theme',
			// validation: Rule => Rule.required()
    },
    defineField({
      name: 'promo',
      title: 'Promo',
      description: 'globally display promo content',
      type: 'string',
      group: 'promo',
    })
  ],
  preview: {
    select: {
      title: 'themeTitle'
    },
    prepare: (selection) => {
      return {
        ...selection
      }
    },
  },
}
