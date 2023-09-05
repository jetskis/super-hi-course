import cx from 'classnames'

export const BigBenefits = ({
  bgColor,
  values,
}) => {
  return (
    <section style={{
      backgroundColor: bgColor
    }} className='p-4 800:px-8 800:py-20'> 
      <div className='max-w-[90%] mx-auto'>
        {values?.map((value, index) => (
          <div key={value} className={cx(
            'flex my-8 800:my-20 text-left',
            {
              'justify-end text-right': index % 2 === 0
            }
            )}>
            <h3 className='text-mono-64'>{value}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}
