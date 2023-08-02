import { shallow } from 'zustand/shallow'
import useStore from '~/state/useStore'
import { useEffect } from 'react'
import { Link, useFetchers, Await, useMatches } from '@remix-run/react'

import {  CartHeader } from '~/components/Cart'

export function Header({ title, open }) {
  const [root] = useMatches()
  const cart = root.data?.cart
  // const cartOpen = root.data?.cartOpen

  return (
    <>
      <header
        role="banner"
        className={`h-[80px] fixed z-40 w-full top-0`}
      >
        <div className='w-full bg-primary-green text-black text-center p-2'>
          <span>Promo Bar</span>
        </div>
        <div className="grid px-4 800:px-8 grid-cols-4 gap-12 w-full justify-between items-center">
          <a className="font-600 col-span-1 800:text-48" href="/">
            Menu
          </a>
          <div className='col-span-2 text-center'>Luggo</div>
          <div className='col-span-1 text-right'>
            <CartHeader cart={cart} open={open} />
          </div>
        </div>
      </header>
    </>
  )
}