import React from 'react'
import Emoji from 'a11y-react-emoji'

const Icon = () => <Emoji style={{fontSize: '1.25em'}} symbol="🎨" />

export default {
  name: 'colorFam',
  title: 'Color Fam',
  type: 'document',

  fields: [
    {
      name: 'colorName',
      title: 'Color Name',
      type: 'string',
    },
    {
      name: 'colorFam',
      title: 'Colorway Family',
      type: 'array',
      of: [
        {
          name: 'color',
          title: 'Color',
          type: 'color',
        },
        {type: 'module.image', title: 'Pattern'},
      ],
      validation: Rule => Rule.required().min(1).max(2),
    },
  ],
  preview: {
    select: {
      title: 'colorName',
      color: 'colorFam',
      image: 'colorFam.0.asset.url',
    },
    prepare: selection => {
      let subtitle = 'Pattern'
      if (selection.color && selection.color[0]._type === 'color') {
        subtitle = 'Color'
      }
      return {
        ...selection,
        subtitle,
        media: () => {
          if (selection.color && selection.color[0]._type === 'color') {
            return (
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: selection.color[0].hex,
                }}
              />
            )
          } else if (
            selection.color &&
            selection.color[0]._type === 'imageAlt'
          ) {
            return (
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: `url(${
                    selection.image && selection.image.url
                  })`,
                }}
              />
            )
          }
        },
      }
    },
  },
}
