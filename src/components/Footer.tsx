import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <section className="w-full flex flex-col px-10 py-16 bg-[#774BE5]">
      <div className="w-full flex md:flex-col flex-col-reverse gap-10">
        <div className="flex items-center justify-between">
          <Image
            src="/images/logo-white.png"
            alt="logo"
            width={100}
            height={100}
          />
          <div className="flex items-center gap-2">
            <i className="ri-instagram-line text-white text-2xl"></i>
            <i className="ri-facebook-line text-white text-2xl"></i>
          </div>
        </div>

        <div className="flex flex-col">
          <ul className="flex md:flex-row flex-col gap-8">
            <li className="text-[#cfcfcf] font-medium hover:text-[#FFFFFF] transition-colors duration-500 ease-in-out delay-100">
              <Link href="/">Contact</Link>
            </li>
            <li className="text-[#cfcfcf] font-medium hover:text-[#FFFFFF] transition-colors duration-500 ease-in-out delay-100">
              <Link href="/privacy-policy">Privacy</Link>
            </li>
            <li className="text-[#cfcfcf] font-medium hover:text-[#FFFFFF] transition-colors duration-500 ease-in-out delay-100">
              <Link href="/terms-of-services">Terms</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full border-t border-white mt-8"></div>

      <div className="flex items-center justify-between mt-8">
        <p className="text-white font-normal text-sm">
          © {new Date().getFullYear()} Aralya.
        </p>
        <p className="text-white font-normal text-sm">
          {" "}
          hello.aralya@gmail.com
        </p>
      </div>
    </section>
  );
};

export default Footer;
