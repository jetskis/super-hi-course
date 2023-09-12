import {defer} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {Await, useLoaderData, useFetcher, Link} from '@remix-run/react';
import { AnalyticsPageType } from '@shopify/hydrogen';
import { flattenConnection } from '@shopify/hydrogen-react'

import { QUERY_HOME } from '~/queries/sanity'

import {
  SHOPIFY_PRODUCTS_QUERY
} from '~/queries/product'


import PageComponentList from '~/components/PageComponentList'

export async function loader({context}) {

  const sanityPage = await context.sanity.fetch(QUERY_HOME)
  // console.log('sanity page', sanityPage)

  const productIds = []
  sanityPage?.modules?.forEach(module => {
    if (module._type === 'module.productGrid') {
      module.products?.forEach(({ product }) => {
        productIds.push(product.store.gid)
      })
    }
  })

  const shopifyProducts = await context.storefront.query(SHOPIFY_PRODUCTS_QUERY, {
    variables: {
      ids: [...new Set(productIds)],
    }
  })

  const sanityModules = sanityPage?.modules.map(module => {
    if (module._type === 'module.productGrid') {
      // Do something
      const products = module.products.map(item => {
        const shopifyProduct = shopifyProducts.nodes.find(({ id }) => {
          return id === item.product?.store.gid
        })
        return {
          ...item,
          'shopify': shopifyProduct,
        }
      })
      return {
        ...module,
        products
      }
    } else {
      return module
    }
  })

  return {
    sanityPage,
    sanityModules
  }
}

const seo = ({data}) => ({
  title: 'Superhi Luggage Store',
  description: 'best place to internet',
});

export const handle = {
  seo
};

export default function Homepage() {

  const fetcher = useFetcher();
  const { sanityPage, sanityModules } = useLoaderData()

  return (
    <div className='relative'>
      <>
        <div>
          <PageComponentList components={sanityModules} />
        </div>
        {/* Let's make sure to remove the 80px from the sticky top */}
        <div className='min-h-[calc(100vh-120px)] w-screen'>

          {/* COLUMN MODULES */}
          <section className='p-4 800:px-8 800:py-20 '>
            <div className='grid grid-cols-2 gap-4 my-10 800:my-20 py-1'>
              <div className='col-span-1'>
                <div className='aspect-square bg-primary-green/60' />
              </div>
              <div className='col-span-1 p-3'>
                <h3 className='text-mono-64 my-2'>Our Story</h3>
                <p className='text-mono-26'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4 my-10 800:my-20 py-1 800:grid-flow-dense rtl'>
              <div className='col-span-1'>
                <div className='aspect-square bg-primary-green/60' />
              </div>
              <div className='col-span-1 ltr p-3'>
                <h3 className='text-mono-64 my-2'>Our commitment</h3>
                <p className='text-mono-26'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>
          </section>
          {/* IMAGE or VIDEO */}
          <section>
            <div className='aspect-video w-full bg-primary-green/60' />
          </section>
        </div>
      </>
    </div>
  );
}
