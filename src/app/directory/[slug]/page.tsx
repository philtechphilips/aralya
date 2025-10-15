import Navbar from '@/components/Navbar'
import Image from 'next/image'
import React from 'react'

const SchoolDetails = () => {
  return (
    <>
          <section
        className="w-full h-100 bg-cover bg-center flex flex-col items-center pb-40 px-5"
      >
        <div className="w-full flex items-center justify-center md:px-10 pt-5 md:pt-0">
          <Navbar textColor="black" />
        </div>
        <div className="pt-13 flex flex-col items-center md:w-[930px] bg-white w-full px-0 md:px-0 mt-20">
          <div className='shadow-xl p-4 flex gap-4 items-center w-full'>
            <div className='w-30 h-18'>
                <Image src="/images/Angioletto Preschool_logo_enhanced.png" alt="logo" width={400} height={200} className='w-full h-full object-cover' />
            </div>
            <div className='flex flex-col gap-2'>
              <h4 className='text-[#0E1C29] text-4xl font-medium'>Angioletto Preschool</h4>
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-2'>
<div className='flex items-center gap-2'>
 <i className="ri-star-s-fill text-yellow-500 text-lg"></i>
 <i className="ri-star-s-fill text-yellow-500 text-lg"></i>
 <i className="ri-star-s-fill text-yellow-500 text-lg"></i> 
 <i className="ri-star-s-fill text-yellow-500 text-lg"></i>
 <i className="ri-star-s-fill text-yellow-500 text-lg"></i>
</div>
                  <div className='flex gap-2 items-center'>
              <p className='text-base font-medium text-[#0E1C29]'>5.0</p>
                <p className='text-base font-medium text-[#374151]'>(5 reviews)</p>
                  </div>
                </div>
                <i className='ri-map-pin-line text-[#374151] text-lg'></i>
                <p className='text-base font-medium text-[#374151]'>Pasig City</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SchoolDetails