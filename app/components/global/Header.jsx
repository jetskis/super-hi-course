import { shallow } from 'zustand/shallow'
import useStore from '~/state/useStore'
import { useEffect } from 'react'
import { Link, useFetchers, Await, useMatches } from '@remix-run/react'

import {  CartHeader } from '~/components/Cart'

import { Menu } from '@headlessui/react'

function HeaderMenu({
  menu
}) {
  return (
    <div className='relative'>
      <Menu>
        <Menu.Button className='font-600 col-span-1 800:text-48'>Menu</Menu.Button>
        <Menu.Items className='absolute top-[30px] left-0 bg-white p-2 rounded-[4px]'>
          {menu?.map(item => {
            switch(item._type) {
              case 'link':
                return (
                  <a href={item.url} key={item._key} target={item.openInNewWindow ? '_blank': ''}>
                    {item.title}
                  </a> 
                )
              case 'productLink':
                return (
                  <Menu.Item key={item._key}>
                    <Link className='block pb-1' to={item.slug}>
                      {item.title ? item.title : item.productName ? item.productName : 'Unnamed Link'}
                    </Link>
                  </Menu.Item>
                )
              default: 
                return (<span />)
            }
          })}
        </Menu.Items>
      </Menu>
    </div>
  )
}

export function Header({ promo, menu, open }) {
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
          <span>{promo}</span>
        </div>
        <div className="grid px-4 800:px-8 grid-cols-4 gap-12 w-full justify-between items-center">
          {/* <a className="font-600 col-span-1 800:text-48" href="/">
            Menu
          </a> */}
          <HeaderMenu menu={menu} />
          <a href="/" className='col-span-2 text-center'>Luggo</a>
          <div className='col-span-1 text-right'>
            <CartHeader cart={cart} open={open} />
          </div>
        </div>
      </header>
    </>
  )
}