import BlockContent from '@sanity/block-content-to-react'
import Serializer from '~/serializers/richText'

export const Hero = ({
  bgColor,
  text,
  image
}) => {
  return (
    <section style={{
      backgroundColor: bgColor
    }} className='h-[calc(100vh-80px)] min-h-[600px]'> 
      <div className='grid h-full grid-cols-2 w-full'>
        <div className='col-span-1 flex items-end'>
          <div className='p-4 800:p-8 pb-6'>
            {text && (<BlockContent blocks={text} serializers={Serializer} />)}
          </div>
        </div>
        <div className='col-span-1 bg-white relative'>
          <img className='absolute top-0 left-0 w-full h-full object-cover' src={image?.url} />
        </div>
      </div>
    </section>
  )
}