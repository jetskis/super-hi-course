import React from 'react'
import Emoji from 'a11y-react-emoji'

const Icon = () => <Emoji style={{fontSize: '1.25em'}} symbol="🏡" />

export default {
  name: 'theme',
  title: 'Theme',
  icon: Icon,
  type: 'document',
  fields: [
    {
      name: 'themeTitle',
      type: 'string',
      title: 'Theme Title',
    },
    {
      name: 'homepage',
      title: 'Homepage',
      description: 'Select the page you want to be the homepage on the marketing site.',
      type: 'reference',
      to: [{type: 'page'}],
      validation: Rule => Rule.required(),
    },
    {
      name: 'headerMenu',
      title: 'Header Menu',
      description: 'Build complex menus from the menu area, assign them here to update the menu everywhere',
      type: 'reference',
      to: { type: 'header' },
			// validation: Rule => Rule.required()
    },
    {
      name: 'footerMenu',
      title: 'Footer Menu',
      description: 'Build complex menus from the module area, assign them here to update the menu everywhere',
      type: 'reference',
      to: { type: 'footer' },
			// validation: Rule => Rule.required()
    },
    {
      name: 'cart',
      title: 'Cart',
      description: 'Create custom carts in preparation for high volume experiences, or merchandise difference products across storefronts.',
      type: 'reference',
      to: { type: 'cart' },
			// validation: Rule => Rule.required()
    },
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
