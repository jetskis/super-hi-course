// import BlockContent from '@sanity/block-content-to-react'
// import Serializer from '~/serializers/richText'

import {
  ProductForm
} from '~/components/product/ProductForm'

const ProductCard = ({
  product,
  shopify
}) => {
  const firstVariant = shopify?.variants?.nodes[0]
  console.log('first variant', firstVariant)
  return (
    <div className='col-span-1'>
      <div className='aspect-square bg-primary-green/60' />
      <h3 className='text-mono-48 my-2'>{product?.store.title}</h3>
      TEST
      <div className='my-2'>
        {/* <div className='flex my-4'>
          <span className='h-10 w-10 rounded-full block mr-2 bg-primary-green' />
          <span className='h-10 w-10 rounded-full block mr-2 bg-primary-green' />
          <span className='h-10 w-10 rounded-full block mr-2 bg-primary-green' />
        </div> */}
        <div>

          <ProductForm 
            product={product} 
            selectedVariant={firstVariant} 
            // productAnalytics={analytics} 
            variantId={firstVariant?.id} />
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


