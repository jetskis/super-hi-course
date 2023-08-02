import {ImageIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.image',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    // Image
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    // Alt Text
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description: 'Image alt text',

    })
  ],
  preview: {
    select: {
      fileName: 'image.asset.originalFilename',
      image: 'image',
      altText: 'altText',
    },
    prepare(selection) {
      const {fileName, image, altText} = selection

      return {
        media: image,
        subtitle: altText,
        title: fileName,
      }
    },
  },
})
