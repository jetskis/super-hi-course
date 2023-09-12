// import BlockContent from '@sanity/block-content-to-react'
// import Serializer from '~/serializers/richText'

import { useState } from 'react'
import cx from 'classnames'

import {
  ProductForm
} from '~/components/product/ProductForm'

const ProductCard = ({
  product,
  defaultVariant,
  shopify
}) => {
  const shopifyDefaultVariant = shopify.variants.nodes.find(item => {
    return item.id === defaultVariant.store.gid
  })
  const [activeVariant, setActiveVariant] = useState(shopifyDefaultVariant ? {
    sanity: defaultVariant,
    ...shopifyDefaultVariant
   } : {
    sanity: product.store.variants[0],
    ...shopify?.variants?.nodes[0]
   })
  console.log('active variant', activeVariant)
  return (
    <div className='col-span-1'>
      <div className='aspect-square bg-primary-green/60'>
        {activeVariant?.sanity?.mainImage?.asset?.url && (
          <img src={activeVariant?.sanity?.mainImage?.asset?.url} alt={activeVariant.sanity.title} />
        )}
      </div>
      <h3 className='text-mono-48 my-2'>{product?.store.title} ${activeVariant.sanity.store.price}</h3>
      <div className='my-2'>
        <div className='flex my-4'>
          {product?.store?.variants?.map((variant, i) => {
            return (
              <button
                key={variant.store.id}
                style={{
                  backgroundImage: variant.pattern?.colorType?.image ? `url(${variant.pattern?.colorType?.image?.url})` : 'none',
                  backgroundSize: 'cover',
                  backgroundColor: variant.pattern?.colorType?.color,
                }}
                onClick={() => {
                  const shopifyVariant = shopify.variants.nodes.find(item => {
                    return item.id === variant.store.gid
                  })
                  setActiveVariant({
                    sanity: variant,
                    ...shopifyVariant
                  })
                }}
                aria-label={`${variant.pattern.colorName}`}
                className={cx('block w-10 h-10 mr-2 rounded-full border-black', {
                  'opacity-100': activeVariant.id === variant.store.gid,
                  'opacity-50': activeVariant.id !== variant.store.gid,
                })}
              >
                <span className='absolute opacity-0'>{variant.pattern.colorName}</span>
              </button>
            )
          })}
        </div>
        <div>

          <ProductForm 
            product={product} 
            selectedVariant={activeVariant} 
            // productAnalytics={analytics} 
            qtySelector={false}
            variantId={activeVariant?.id} />
          {/* <button className='button primary small'>Add to Cart</button> */}
        </div>
      </div>
    </div>
  )
}

export const ProductGrid = ({
  bgColor,
  products,
}) => {
  return (
    <section style={{
      backgroundColor: bgColor
    }} className='p-4 800:py-20'> 
    <div className='grid grid-cols-2 gap-4'>
    {products.map(item => {
      return (
        <ProductCard 
          product={item.product} 
          shopify={item.shopify}
          defaultVariant={item.productVariant}
          key={item._key} />
      )
    })}
    
    </div>
    </section>
  )
}


