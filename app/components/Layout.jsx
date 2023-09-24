// 'use client'
import {Drawer} from '~/components/Drawer';

import { Link, useFetchers, Await, useMatches } from '@remix-run/react'

import { shallow } from 'zustand/shallow'
import useStore from '~/state/useStore'

// import {CartLineItems, CartActions, CartSummary} from '~/components/Cart';
import { CartDrawer } from '~/components/Cart'
import { Footer } from '~/components/global/Footer'
import { Header } from '~/components/global/Header'

export function Layout({children, data}) {
  const fetchers = useFetchers()
  const [root] = useMatches()
  const cart = root.data?.cart

  const {
    promo,
    footerMenu,
    headerMenu,
  } = data

  const {isCartOpen, toggleCart} = useStore(
    store => ({
      isCartOpen: store.isCartOpen,
      toggleCart: store.toggleCart,
    }),
    shallow,
  )

  // Grab all the fetchers that are adding to cart
  const addToCartFetchers = [];
  for (const fetcher of fetchers) {
    if (fetcher?.submission?.formData?.get('cartAction') === 'ADD_TO_CART') {
      addToCartFetchers.push(fetcher);
    }
  }

  return (
    <div className="flex flex-col min-h-screen antialiased font-mono">
      <Header promo={promo} menu={headerMenu?.menu} open={toggleCart} />
      <main
        role="main"
        id="mainContent"
        className="flex-grow"
      >
        {children}
      </main>
      <Drawer open={isCartOpen || false} onClose={() => {
        toggleCart()
      }}>
        <CartDrawer cart={cart} close={toggleCart} />
      </Drawer>
      <Footer menu={footerMenu?.menu} tagline={footerMenu?.tagline} />
    </div>
  );
}


