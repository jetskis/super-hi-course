import { Disclosure } from '@headlessui/react'

import BlockContent from '@sanity/block-content-to-react'
import Serializer from '~/serializers/richText'

export const Faqs = ({
  bgColor,
  title,
  faqList
}) => {
  return (
    <section style={{
      backgroundColor: bgColor
    }} className='p-4 800:px-8 800:py-20 1200:py-40 text-left'> 
      <div className='max-w-[1000px] mx-auto'>
        <h3 className='text-mono-100 my-2'>{title}</h3>
      </div>
      <div className='max-w-[1000px] mx-auto'>
        {faqList?.map(faq => (
          <div key={faq._id} className='w-full'>
            <Disclosure>
              {({ open }) => (
                /* Use the `open` state to conditionally change the direction of an icon. */
                <>
                  <Disclosure.Button className='py-4 inline-flex justify-between my-2 text-mono-36 border-b text-left'>
                    {faq.question}
                    <span>+</span>
                  </Disclosure.Button>
                  <Disclosure.Panel>
                    <BlockContent blocks={faq.answer} serializers={Serializer} /> 
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </section>
  )
}
