import React from 'react'

type Props = {
  image: string;
  title: string;
  description: string;
  id?: string; 
}

const ServiceCard = ({ image, title, description, id }: Props) => {
  const serviceUrl = id ? `/services/${id}` : '#';
  
  return (
    <a 
      href={serviceUrl}
      className="rounded-sm shadow p-2 bg-linear-to-r from-cyan-500 to-blue-500 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.5rem)] xl:w-64 max-w-md block hover:shadow-lg transition-all duration-500 hover:scale-105"
    >  
        <img src={image} alt={title} className="h-20 w-20 mx-auto mt-4" />
        <h3 className="text-lg font-bold text-white text-center my-4">{title}</h3>
      <p className="text-gray-200 text-center text-xs leading-relaxed">{description}</p>
      <div className="mx-auto block my-2 bg-white text-cyan-500 px-4 py-2 rounded-md text-xs font-bold mt-4 text-center w-fit">Learn More</div>
    </a>
  )
}

export default ServiceCard