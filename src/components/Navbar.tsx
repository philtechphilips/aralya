"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface NavbarProps {
  textColor?: "white" | "black";
}

const Navbar = ({ textColor = "white" }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Check if we're on desktop
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Handle scroll event
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolling(scrollY > 40);
    };

    // Initial check
    checkDesktop();

    // Add event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkDesktop);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkDesktop);
    };
  }, []);

  return (
    <div
      className={`transition-all duration-500 ease-in-out fixed md:top-0 top-5 md:left-0 left-5 right-0 z-5000 md:px-10 px-5 py-5 ${
        isScrolling && isDesktop
          ? "bg-[#774BE5] w-[780px] rounded-2xl mx-auto md:top-10 z-5000"
          : "md:w-full w-[90%] md:bg-white/5 bg-[#774BE5] rounded-lg md:rounded-none"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <Link href="/" className="hidden md:block w-1/3">
          {isScrolling && isDesktop ? (
            <Image
              src="/images/logo-white.png"
              alt="logo"
              width={100}
              height={100}
            />
          ) : (
            <Image src="/images/Logo.png" alt="logo" width={100} height={100} />
          )}
        </Link>
        <div className="block md:hidden">
          <Image
            src="/images/logo-white.png"
            alt="logo"
            width={100}
            height={100}
          />
        </div>

        <ul
          className={`hidden md:flex items-center gap-20 font-semibold text-sm transition-all duration-500 ease-in-out ${
            isScrolling && isDesktop ? "" : "justify-items-start w-2/3"
          }`}
        >
          <li
            className={`transition-colors duration-500 ease-in-out delay-100 ${
              isScrolling && isDesktop
                ? "text-white hover:text-[#0E1C29]"
                : `text-${textColor} hover:text-[#774BE5]`
            }`}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={`transition-colors duration-500 ease-in-out delay-100 ${
              isScrolling && isDesktop
                ? "text-white hover:text-[#0E1C29]"
                : `text-${textColor} hover:text-[#774BE5]`
            }`}
          >
            <Link href="/directory">Browse</Link>
          </li>
          <li
            className={`transition-colors duration-500 ease-in-out delay-100 ${
              isScrolling && isDesktop
                ? "text-white hover:text-[#0E1C29]"
                : `text-${textColor} hover:text-[#774BE5]`
            }`}
          >
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
                isMenuOpen ? "rotate-45" : "rotate-0 -translate-y-2"
              }`}
            ></div>
            <div
              className={`w-8 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></div>
            <div
              className={`w-8 h-0.5 bg-white transition-all duration-300 ease-in-out absolute ${
                isMenuOpen ? "-rotate-45" : "rotate-0 translate-y-2"
              }`}
            ></div>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 my-12">
          <ul className="flex flex-col gap-10 font-semibold text-sm w-full">
            <li className="text-white hover:text-[#0E1C29] transition-colors duration-500 ease-in-out delay-100">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li className="text-white hover:text-[#0E1C29] transition-colors duration-500 ease-in-out delay-100">
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
            </li>
            <li className="text-white hover:text-[#0E1C29] transition-colors duration-500 ease-in-out delay-100">
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
