import React from 'react'
import spinner from '../public/spinner.gif'
import Image from 'next/image'

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
        
        <Image className='w-[200px] m-auto block mx-100px' src={spinner} alt='loading..' />
    </div>
    
  )
}

export default Spinner