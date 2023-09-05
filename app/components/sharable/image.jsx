import cx from 'classnames'

export const Image = ({
  image
}) => {
  return (
    <section>
      <img src={image.url} className='w-full object-cover' />
    </section>
  )
}
