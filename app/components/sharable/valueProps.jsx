import BlockContent from '@sanity/block-content-to-react'
import Serializer from '~/serializers/richText'

export const ValueProps = ({
  bgColor,
  values,
}) => {
  return (
    <section style={{
      backgroundColor: bgColor
    }} className='p-4 text-center 800:py-20'> 
      <div className='grid grid-cols-3 gap-4 max-w-[900px] mx-auto'>
        {values?.map(value => (
          <div key={value._key} className='col-span-1'>
            <BlockContent blocks={value.text} serializers={Serializer} />
          </div>
        ))}
      </div>
    </section>
  )
}

