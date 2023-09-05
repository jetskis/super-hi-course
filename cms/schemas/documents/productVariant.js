import {CopyIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import ShopifyIcon from '../../components/icons/Shopify'
import ProductVariantHiddenInput from '../../components/inputs/ProductVariantHidden'
import ShopifyDocumentStatus from '../../components/media/ShopifyDocumentStatus'

export default defineType({
  name: 'productVariant',
  title: 'Product variant',
  type: 'document',
  icon: CopyIcon,
  groups: [
    {
      name: 'editorial',
      title: 'Editorial',
      default: true
    },
    {
      name: 'shopifySync',
      title: 'Shopify sync',
      icon: ShopifyIcon,
    },
  ],
  fields: [
    // Product variant hidden status
    defineField({
      name: 'hidden',
      type: 'string',
      components: {
        field: ProductVariantHiddenInput,
      },
      hidden: ({parent}) => {
        const isDeleted = parent?.store?.isDeleted

        return !isDeleted
      },
    }),
    // Title (proxy)
    defineField({
      title: 'Title',
      name: 'titleProxy',
      type: 'proxyString',
      options: {field: 'store.title'},
    }),
    defineField({
      title: 'Pattern',
      name: 'pattern',
      type: 'reference',
      to: { type: 'colorType' },
      group: 'editorial',
    }),
    defineField({
      title: 'Main Image',
      name: 'mainImage',
      type: 'image',
      group: 'editorial',
    }),
    // Shopify product variant
    defineField({
      name: 'store',
      title: 'Shopify',
      description: 'Variant data from Shopify (read-only)',
      type: 'shopifyProductVariant',
      group: 'shopifySync',
    }),
  ],
  preview: {
    select: {
      isDeleted: 'store.isDeleted',
      previewImageUrl: 'store.previewImageUrl',
      sku: 'store.sku',
      status: 'store.status',
      title: 'store.title',
    },
    prepare(selection) {
      const {isDeleted, previewImageUrl, sku, status, title} = selection

      return {
        media: (
          <ShopifyDocumentStatus
            isActive={status === 'active'}
            isDeleted={isDeleted}
            type="productVariant"
            url={previewImageUrl}
            title={title}
          />
        ),
        subtitle: sku,
        title,
      }
    },
  },
})
