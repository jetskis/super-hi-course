import React from 'react'
import Emoji from 'a11y-react-emoji'

const Icon = () => <Emoji style={{fontSize: '1.25em'}} symbol="🏡" />

export default {
  name: 'scheduledTheme',
  title: 'Scheduled Theme',
  icon: Icon,
  type: 'document',
  fields: [
    {
      name: 'themeTitle',
      type: 'string',
      title: 'Scheduled Theme Title',
      description: 'Only used in the CMS'
    },
    {
      name: 'deploymentDate',
      type: 'datetime',
      title: 'Deployment Date',
      description: 'Sanity will grab the first most/recent dated deployment, do not schedule 2 themes for the same day'
    },
    {
      name: 'theme',
      title: 'Production Theme',
      type: 'reference',
      to: { type: 'theme' },
      validation: Rule => Rule.required(),
    },
    // {
    //   name: 'wholesaleTheme',
    //   title: 'Wholesale Production Theme',
    //   type: 'reference',
    //   to: { type: 'theme' },
    //   validation: Rule => Rule.required(),
    // },
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
