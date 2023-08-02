import { useEffect, useState } from 'react'
import { useLoaderData, useMatches, useFetcher, Link } from '@remix-run/react'
import { shallow } from 'zustand/shallow'
import useStore from '~/state/useStore'

export function ProductForm({
  variantId,
  product,
  selectedVariant,
  productAnalytics
}) {
  const [root] = useMatches();
  const [quantity, setQuantity] = useState(1)
  const selectedLocale = root?.data?.selectedLocale;
  const fetcher = useFetcher();
  const lines = [{merchandiseId: variantId, quantity: quantity}];
  const {toggleCart, isCartOpen, setSidebarWidth} = useStore(
    store => ({
      toggleCart: store.toggleCart,
      setSidebarWidth: store.setSidebarWidth,
      isCartOpen: store.isCartOpen
    }),
    shallow,
  )

  useEffect(() => {
    if (fetcher?.submission?.formData?.get('cartAction') === 'ADD_TO_CART' && fetcher.state === 'loading') {
      !isCartOpen && toggleCart()
    }
  }, [fetcher]);
  return selectedVariant.availableForSale ?
    <fetcher.Form className='flex w-full mt-4 text-20 justify-between' action="/cart" method="post">
      <input type="hidden" name="cartAction" value={'ADD_TO_CART'} />
      {/* <input type="hidden" name="analytics" value={JSON.stringify(analytics)} /> */}
      <input
        type="hidden"
        name="countryCode"
        value={selectedLocale?.country ?? 'US'}
      />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />
      <div className='flex justify-center border-2 rounded-[8px] w-1/2 items-center h-[60px]'>
        <button type='button' onClick={() => quantity > 1 && setQuantity(quantity-1)} className='site-theme p-2 px-4'>-</button>
        <input onChange={(e) => setQuantity(e.currentTarget.value)} defaultValue={quantity} min={1} max={100}  type='number' className='w-[80px] appearance-none text-mono-20 bg-transparent m-0 text-center border-none  h-[50px]' />
        <button type='button' onClick={() => setQuantity(quantity+1)} className='site-theme p-2 px-4'>+</button>
      </div>
      <button className="w-1/2 hover:bg-almost-black hover:text-white transition-colors duration-300 bg-primary-green text-black uppercase h-[60px] theme-add-button text-mono-20  px-6 text-center font-mono">
        <span className=''>add to bag</span>
      </button>
    </fetcher.Form>
  : (
    <div className='w-full mt-4'>
      <button disabled={true} className="w-full border-black opacity-60 transition-colors duration-300 bg-primary-green text-black uppercase h-[60px] theme-add-button text-mono-20  px-6 text-center font-mono">
        Sold out :(
      </button>
    </div>
  )
}