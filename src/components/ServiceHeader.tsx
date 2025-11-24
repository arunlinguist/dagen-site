import React from 'react'

type Props = {
  heading: string;
}

const ServiceHeader = ({heading}: Props) => {
  return (
    <div className='flex items-center gap-4'>
    <hr className='flex-1 border-gray-300' />
    <h2 className="text-center text-2xl font-bold text-slate-700 whitespace-nowrap">
      {heading}
    </h2>
    <hr className='flex-1 border-gray-300' />
  </div>
  )
}

export default ServiceHeader