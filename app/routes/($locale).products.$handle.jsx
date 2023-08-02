import { useEffect, Fragment } from 'react'
import { useLoaderData, Link, useLocation, useNavigation, useSearchParams, useMatches, useFetcher, useFetchers } from '@remix-run/react'
import { json } from 'react-router'
import {useKeenSlider} from 'keen-slider/react'

import { Menu } from '@headlessui/react'
import 'keen-slider/keen-slider.min.css'

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

  const selectedVariant = product.selectedVariant ?? product?.variants?.nodes[0]

  return json({
    handle,
    product,
    selectedVariant,
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
  const { handle, product, selectedVariant, analytics } = useLoaderData()
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
            {product.media?.nodes?.length > 1 && (<ImageSlider images={product.media?.nodes} />)}
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
              <p className='text-mono-18'>Equipped with smooth-rolling wheels and a retractable telescopic handle, the bag effortlessly glides along various surfaces, providing easy maneuverability through crowded airports, busy streets, or rugged terrain. The handle can be adjusted to different heights, allowing you to find the most comfortable position for pulling the bag.</p>
            </div>
            <div className='my-8'>
              <h4 className='text-mono-14 mb-4'>Sizes:</h4>
              <div className='flex gap-4'>
                <Link to='/products/40l-bag' className='p-4 px-8 bg-primary-green/90 rounded-[20px]'>40L Bag</Link>
                <Link to='/products/60l-bag' className='p-4 px-8 bg-primary-green/50 rounded-[20px]'>60L Bag</Link>
              </div>
            </div>
            <div className='w-full font-600 my-6 uppercase text-mono-20'>
              <div className='flex gap-4' onChange={(e) => alert(e.currentTarget.value)}>    
                {product.options.map(({ name, values }) => {
                  const currentOptionValue = searchParams.get(name)
                  return values.map((value) => {
                    const optionParams = new URLSearchParams(search);
                    const isSelected = currentOptionValue === value
                    optionParams.set(name, value)
                    return (
                      /* Use the `active` state to conditionally style the active item. */
                        <Link
                          key={value}
                          preventScrollReset
                          aria-label={`${name}: ${value}`}
                          to={`${pathname}?${optionParams.toString()}`}
                          className={`block w-10 h-10 rounded-full border-black ${
                            isSelected ? 'bg-black' : 'bg-primary-green'
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
      {/* VALUE PROPS */}
      <section className='p-4 text-center 800:py-20'>
        <div className='grid grid-cols-3 gap-4 max-w-[900px] mx-auto'>
          <div className='col-span-1'>
            <h4 className='text-mono-22 mb-5'>Free Shipping</h4>
            <p>All orders of $89 or more qualify for free shipping. No promotional code needed.</p>
          </div>
          <div className='col-span-1'>
            <h4 className='text-mono-22 mb-5'>Lifetime Guarantee</h4>
            <p>Free replacement for any quality issues you experience with our bags.</p>
          </div>
          <div className='col-span-1'>
            <h4 className='text-mono-22 mb-5'>Free Returns </h4>
            <p>If you don’t love your order, return it within 30 days & shipping is on us.</p>
          </div>
        </div>
      </section>
      {/* BENEFITS */}
      <section className='p-4 800:px-8 800:py-20 bg-primary-green/10'>
        <div className='max-w-[90%] mx-auto'>
          <div className='flex my-8 800:my-20 text-left'>
            <div className='max-w-[70%]'>
              <h3 className='text-mono-64'>Global entry level comforts</h3>
            </div>
          </div>
          <div className='flex my-8 800:my-20 w-full  justify-end text-right'>
            <div className='max-w-[70%]'>
              <h3 className='text-mono-64'>TSA Approved</h3>
            </div>
          </div>
          <div className='flex my-8 800:my-20 w-full text-left'>
            <div className='max-w-[70%]'>
              <h3 className='text-mono-64'>Smooth Wheels</h3>
            </div>
          </div>
          <div className='flex my-8 800:my-20 w-full justify-end text-right'>
            <div className='max-w-[70%]'>
              <h3 className='text-mono-64'>Lightweight &amp; Stylish</h3>
            </div>
          </div>
        </div>
      </section>
      {/* IMAGE or VIDEO */}
      <section>
        <div className='aspect-video w-full bg-primary-green/60' />
      </section>
      {/* FAQ */}
      <section className='p-4 800:px-8 800:py-20 1200:py-40 text-left'>
        <div className='max-w-[1000px] mx-auto'>
          <h3 className='text-mono-100 my-2'>FAQ</h3>
          <button className='py-4 inline-flex justify-between my-2 text-mono-36 border-b text-left'>
            <span>Can you buy this even if you don't have upcoming travel plans?</span>
            <span>+</span>
          </button>
          <button className='py-4 inline-flex justify-between my-2 text-mono-36 border-b text-left'>
            <span>Can you buy this even if you don't have upcoming travel plans?</span>
            <span>+</span>
          </button>
          <button className='py-4 inline-flex justify-between my-2 text-mono-36 border-b text-left'>
            <span>Can you buy this even if you don't have upcoming travel plans?</span>
            <span>+</span>
          </button>
        </div>
      </section>
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
      {images.map(({ image }) => {
        return (
          <div key={image.id} className="keen-slider__slide">
            <img src={image.url} className='w-full h-full object-contain' />
          </div>
        )
      })}
    </div>
  )
}