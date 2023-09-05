import { useEffect, Fragment } from 'react'
import { useLoaderData, Link, useLocation, useNavigation, useSearchParams, useMatches, useFetcher, useFetchers } from '@remix-run/react'
import { json } from 'react-router'
import {useKeenSlider} from 'keen-slider/react'
import cx from 'classnames'

import BlockContent from '@sanity/block-content-to-react'
import Serializer from '~/serializers/richText'

import { Menu } from '@headlessui/react'
import 'keen-slider/keen-slider.min.css'

import ProductComponentList from '~/components/ProductComponentList'

import { QUERY_PRODUCT } from '~/queries/sanity'

import {
  SHOPIFY_PRODUCT_QUERY
} from '~/queries/product'

import {
  Money,
  ShopPayButton
} from '@shopify/hydrogen-react'

// import {ProductOptions} from '~/components'

import {
  ProductForm
} from '~/components/product/ProductForm'


const seo = ({data}) => ({
  title: 'Product Page - Superhi Luggage Store',
  description: 'best place to internet',
});

export const handle = {
  seo
};

export const loader = async ({ params, context, request }) => {
  const { handle } = params
  const searchParams = new URL(request.url).searchParams
  const selectedOptions = []

  searchParams.forEach((value, name) => {
    selectedOptions.push({ name, value })
  })

  const { product } = await context.storefront.query(SHOPIFY_PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions
    }
  })

  if (!product?.id) {
    throw new Response(null, { status: 404 })
  }

  const sanityProduct = await context.sanity.fetch(QUERY_PRODUCT(handle))
  // console.log('sanity product', sanityProduct.store.variants)
  const selectedVariant = product.selectedVariant ?? product?.variants?.nodes[0]
  const sanityVariant = sanityProduct.store.variants.find(variant => {
    return variant.store.title === selectedVariant.title
  })

  return json({
    handle,
    product,
    sanityProduct,
    selectedVariant,
    sanityVariant,
    analytics: {
      pageType: 'product'
    }
  })
}

function PrintJson({data}) {
  return (
    <details className="outline outline-2 outline-blue-300 p-4 my-2">
      <summary>Product JSON</summary>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </details>
  )
}

export default function ProductHandle() {
  const { handle, product, sanityProduct, sanityVariant, selectedVariant, analytics } = useLoaderData()
  const { pathname, search }  = useLocation()
  const [ currentSearchParams ]  = useSearchParams()
  const navigation = useNavigation()
  
  const paramsWithDefaults = (() => {
    const defaultParams = new URLSearchParams(currentSearchParams);
    if (!selectedVariant) {
      return defaultParams;
    }
    for (const {name, value} of selectedVariant.selectedOptions) {
      if (!currentSearchParams.has(name)) {
        defaultParams.set(name, value);
      }
    }
    return defaultParams;
  })();


  const searchParams = navigation.location
  ? new URLSearchParams(navigation.location.search)
  : paramsWithDefaults;


  // FIXME: Render the product schema
  const schema = {
		'@context': 'https://schema.org/',
		'@type': 'Product',
		name: product.title,
		// image: product.images[0].url,
		description: product.hero,
		sku: product.sku,
		mpn: product.sku,
		brand: {
			'@type': 'Thing',
			name: 'Super Luggage',
		},
		offers: {
			'@type': 'Offer',
			url: `https://superluggage.co/products/${product.slug}`,
			priceCurrency: 'USD',
			// price: selectedVariant.price,
			itemCondition: 'https://schema.org/NewCondition',
			availability: 'https://schema.org/InStock',
			seller: {
				'@type': 'Organization',
				name: 'Super Luggage',
			},
		},
	};

  return (
    <div key={handle}>
			{/* <script type="application/ld+json">{`${JSON.stringify(schema)}`}</script> */}
      <div className='relative w-full p-4 grid grid-cols-12 mt-[100px]'>
        <div className='relative h-[calc(100vh-174px)] col-span-6 '>
          <div className=''>
            {sanityVariant?.mainImage && (<ImageSlider images={[sanityVariant.mainImage]} />)}
          </div>
          
        </div>
        <div className='col-span-5 col-start-7'>
            <h2 className='text-mono-64'>{product.title}</h2>
            <Money
              withoutTrailingZeros
              data={selectedVariant.price}
              className="text-xl font-600 text-32"
            />
            <div className='my-4'>
              {sanityProduct.body && (
                <BlockContent blocks={sanityProduct.body} serializers={Serializer} />
              )}
            </div>
            <div className='my-8'>
              {sanityProduct.associatedProducts && (
                <>
                  <h4 className='text-mono-14 mb-4'>Sizes:</h4>
                  <div className='flex gap-4'>
                    {sanityProduct.associatedProducts.map((product) => (
                      <Link key={product.store.slug} to={`/products/${product.store.slug}`} 
                        className={cx(
                          'p-4 px-8 bg-primary-green/90 rounded-[20px]',
                          {
                            'opacity-50': product.store.slug !== handle
                          }
                        )}>
                        {product.store.title}
                      </Link>
                    ))}
                    {/* <Link to='/products/40l-bag' className='p-4 px-8 bg-primary-green/90 rounded-[20px]'>40L Bag</Link>
                    <Link to='/products/60l-bag' className='p-4 px-8 bg-primary-green/50 rounded-[20px]'>60L Bag</Link> */}
                  </div>
                </>
              )}
              
            </div>
            <div className='w-full font-600 my-6 uppercase text-mono-20'>
              <h4 className='text-mono-14 mb-4'>Colors: <span className='font-600'>{selectedVariant.title}</span></h4>
              <div className='flex gap-4' onChange={(e) => alert(e.currentTarget.value)}>    
                {product.options.map(({ name, values }) => {
                  const currentOptionValue = searchParams.get(name)
                  return values.map((value) => {
                    const optionParams = new URLSearchParams(search);
                    const isSelected = currentOptionValue === value
                    const matchedPattern = sanityProduct.store.variants.find(variant => {
                      return variant.store.title == value
                    })
                    optionParams.set(name, value)
                    return (
                      /* Use the `active` state to conditionally style the active item. */
                        <Link
                          key={value}
                          preventScrollReset
                          style={{
                            backgroundImage: matchedPattern.pattern?.colorType?.image ? `url(${matchedPattern.pattern?.colorType?.image?.url})` : 'none',
                            backgroundSize: 'cover',
                            backgroundColor: matchedPattern.pattern?.colorType?.color,
                          }}
                          aria-label={`${name}: ${value}`}
                          to={`${pathname}?${optionParams.toString()}`}
                          className={`block w-10 h-10 rounded-full border-black ${
                            isSelected ? 'opacity-100 scale-[1.1]' : 'opacity-25'
                          }`}
                        >
                          <span className='absolute opacity-0'>{value}</span>
                        </Link>

                    )}
                  )
                })}
              </div>
              <ProductForm product={product} selectedVariant={selectedVariant} productAnalytics={analytics} variantId={selectedVariant?.id} />
            </div>
          </div>

        
      </div>
      {sanityProduct.modules && (<ProductComponentList components={sanityProduct.modules} />)}
    </div>
  )
}

const ImageSlider = ({ images }) => {
  const [sliderRef, slider] = useKeenSlider({
		loop: true,
		drag: true,
		slides: {
			perView: 1,
		},
    breakpoints: {
			'(min-width: 800px)': {
				slides: {
					perView: 1
				},
			}
    },
		slideChanged(slider) {
			// setActiveSlideIndex(slider.track.details.rel);
		},
	})
  return (
    <div ref={sliderRef} className="keen-slider h-full w-full">
      {images.map((image) => {
        return (
          <div key={image._id} className="keen-slider__slide">
            <img src={image.url} className='w-full h-full object-contain' />
          </div>
        )
      })}
    </div>
  )
}