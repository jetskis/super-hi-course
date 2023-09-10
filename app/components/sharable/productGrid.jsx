// import BlockContent from '@sanity/block-content-to-react'
// import Serializer from '~/serializers/richText'

export const ProductGrid = ({
  bgColor,
  products,
}) => {
  console.log('products', products)
  return (
    <section style={{
      backgroundColor: bgColor
    }} className='p-4 800:py-20'> 
    <div className='grid grid-cols-2 gap-4'>
    {products.map(item => {
      return (
        <div className='col-span-1'>
          <div className='aspect-square bg-primary-green/60' />
          <h3 className='text-mono-48 my-2'>{item.product?.store.title}</h3>
          <p>shopify: {item.shopify.title}</p>
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
          <div className='my-2'>
            {/* <div className='flex my-4'>
              <span className='h-10 w-10 rounded-full block mr-2 bg-primary-green' />
              <span className='h-10 w-10 rounded-full block mr-2 bg-primary-green' />
              <span className='h-10 w-10 rounded-full block mr-2 bg-primary-green' />
            </div> */}
            <div>
              {/* <button className='button primary small'>Add to Cart</button> */}
            </div>
          </div>
        </div>
      )
    })}
    
    </div>
    </section>
  )
}


