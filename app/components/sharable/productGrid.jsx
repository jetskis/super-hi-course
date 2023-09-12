// import BlockContent from '@sanity/block-content-to-react'
// import Serializer from '~/serializers/richText'

import { useState } from 'react'
import cx from 'classnames'

import {
  ProductForm
} from '~/components/product/ProductForm'

const ProductCard = ({
  product,
  shopify
}) => {
  const [activeVariant, setActiveVariant] = useState(shopify?.variants?.nodes[0])
  console.log('first variant', product.store.variants[0], activeVariant)
  return (
    <div className='col-span-1'>
      <div className='aspect-square bg-primary-green/60' />
      <h3 className='text-mono-48 my-2'>{product?.store.title}</h3>
      TEST
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
                onClick={() => setActiveVariant(shopify.variants.nodes[i])}
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
          key={item._key} />
      )
    })}
    
    </div>
    </section>
  )
}


