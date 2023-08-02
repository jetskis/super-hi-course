import React from 'react'
import Emoji from 'a11y-react-emoji'

const Icon = () => <Emoji style={{fontSize: '1.25em'}} symbol="🎨" />

export default {
  name: 'colorType',
  title: 'Color Type',
  type: 'document',

  __experimental_actions: [/*'create',*/ 'update', 'delete'],
  icon: Icon,
   
  groups: [
    {name: 'main', title: 'Main', default: true},
    {name: 'similar', title: 'Similar Products'},
  ],
  fields: [
    {
      name: 'colorName',
      title: 'Color Name',
      type: 'string',
      group: 'main'
    },
    {
      name: 'colorType',
      title: 'Colorway Type',
      type: 'array',
      of: [
        {
          name: 'color', title: 'Color', type: 'color'
        },
        {
          type: 'module.image',
          title: 'Pattern',
          icon: null,
        }
      ],
      validation: Rule => Rule.required().min(1).max(2),
      group: 'main'
    }
  ],
  preview: {
    select: {
      title: 'colorName',
      color: 'colorType',
      image: 'colorType.0.asset.url'
    },
    prepare: (selection) => {
      let subtitle = 'Pattern'
      if (selection.color && selection.color[0]._type === 'color') {
        subtitle = 'Color'
      }
      return {
        ...selection,
        subtitle,
        media: () => {
          if (selection.color && selection.color[0]._type === 'color') {
            return <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', backgroundColor: selection.color[0].hex }} />
          } else if (selection.color && selection.color[0]._type === 'imageAlt') {
            return <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: `url(${selection.image})` }} />
          }
        }
      }
    },
  },
}
