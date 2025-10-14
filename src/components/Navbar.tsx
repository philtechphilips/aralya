import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full bg-white/1 flex items-center justify-between px-10 py-5'>
        <Image src="/images/Logo.png" alt='logo' width={100} height={100} />

        <ul className='flex items-center justify-between gap-20 font-semibold text-sm'>
            <li className='text-white hover:text-[#0E1C29] transition-colors duration-500 ease-in-out delay-100'>
                <Link href="/">Home</Link>
            </li>
            <li className='text-white hover:text-[#0E1C29] transition-colors duration-500 ease-in-out delay-100'>
                <Link href="/about">About</Link>
            </li>
            <li className='text-white hover:text-[#0E1C29] transition-colors duration-500 ease-in-out delay-100'>
                <Link href="/contact">Contact</Link>
            </li>
        </ul>

        <div></div>
    </div>
  )
}

export default Navbar