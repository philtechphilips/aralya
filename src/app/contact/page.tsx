import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React from "react";

const Contact = () => {
  return (
    <>
      <section className="w-full bg-cover bg-center min-h-screen flex flex-col items-center pb-40 px-5 bg-[#F9FAFB]">
        <div className="w-full flex items-center justify-center md:px-10 pt-5 md:pt-0">
          <Navbar textColor="black" />
        </div>

        <div className="pt-13 flex flex-col items-center md:w-[930px]  w-full px-0 md:px-0 mt-20">
          <h3 className="md:text-[56px] text-4xl text-[#0E1C29] text-center">Contact Aralya </h3>

          <div className="w-full flex flex-col items-center bg-white mt-8 p-8 rounded-2xl">
            <div className="flex w-fit p-1 justify-center mb-4 bg-[#F6FBFF] shadow rounded">
              <i className="ri-customer-service-line text-[#0E1C29] text-3xl"></i>
            </div>
            <h6 className="text-3xl font-medium text-[#0E1C29] text-center">
              Help us keep school details accurate
            </h6>
            <p className="text-sm mt-3 text-[#0E1C29] text-center">
              Message us on Facebook for site questions, to report a correction,
              or to suggest a school
            </p>

            <div className="w-full flex justify-center mt-8">
              <Link
                href="/"
                className="bg-[#774BE5] min-w-20 text-white p-4 rounded-[10px] text-sm font-semibold flex items-center justify-center gap-1"
              >
                Message Aralya on Facebook
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;

