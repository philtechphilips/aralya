"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full md:bg-white/1 bg-[#774BE5] md:px-10 px-5 py-5 rounded-lg md:rounded-none fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between w-full">
        <div className="hidden md:block w-1/3">
          <Image src="/images/Logo.png" alt="logo" width={100} height={100} />
        </div>
        <div className="block md:hidden">
          <Image
            src="/images/logo-white.png"
            alt="logo"
            width={100}
            height={100}
          />
        </div>

        <ul className="hidden md:flex items-center justify-items-start gap-20 font-semibold text-sm w-2/3">
          <li className="text-white hover:text-[#0E1C29] transition-colors duration-500 ease-in-out delay-100">
            <Link href="/">Home</Link>
          </li>
          <li className="text-white hover:text-[#0E1C29] transition-colors duration-500 ease-in-out delay-100">
            <Link href="/about">About</Link>
          </li>
          <li className="text-white hover:text-[#0E1C29] transition-colors duration-500 ease-in-out delay-100">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        <button 
          onClick={toggleMenu}
          className="block md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="w-8 h-8 flex flex-col justify-center items-center relative">
            <div 
              className={`w-8 h-0.5 bg-white transition-all duration-300 ease-in-out absolute ${
                isMenuOpen ? 'rotate-45' : 'rotate-0 -translate-y-2'
              }`}
            ></div>
            <div 
              className={`w-8 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></div>
            <div 
              className={`w-8 h-0.5 bg-white transition-all duration-300 ease-in-out absolute ${
                isMenuOpen ? '-rotate-45' : 'rotate-0 translate-y-2'
              }`}
            ></div>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 my-12">
          <ul className="flex flex-col gap-10 font-semibold text-sm w-full">
            <li className="text-white hover:text-[#0E1C29] transition-colors duration-500 ease-in-out delay-100">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>
            <li className="text-white hover:text-[#0E1C29] transition-colors duration-500 ease-in-out delay-100">
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            </li>
            <li className="text-white hover:text-[#0E1C29] transition-colors duration-500 ease-in-out delay-100">
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
