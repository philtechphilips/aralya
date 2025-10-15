import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SchoolCard from "@/components/SchoolCard";
import Link from "next/link";
import React from "react";

const SchoolDirectory = () => {
  return (
    <>
      <section
        className="w-full h-100 bg-cover bg-center flex flex-col items-center pb-40 px-5"
        style={{ backgroundImage: "url('/images/Hero.png')" }}
      >
        <div className="w-full flex items-center justify-center md:px-10 pt-5 md:pt-0">
          <Navbar />
        </div>
        <div className="pt-13 flex flex-col items-center md:w-[930px] w-full px-0 md:px-0 mt-20">
          <h1 className="md:text-[56px] text-[32px] font-regular text-white text-center leading-[120%]">
            Find Preschools
          </h1>
          <div className="bg-white w-full p-5 md:rounded-3xl rounded-full mt-6">
            <div className="flex flex-col md:flex-row  gap-2.5 rounded-2xl">
              <div className="w-full md:w-[710px] cursor-pointer md:rounded-[10px] rounded-full overflow-hidden flex items-center gap-5">
                <i className="ri-search-line text-[#0E1C29]/40 text-2xl"></i>
                <p className="text-[#999999] text-sm md:text-base">
                  Search by school name, location...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full md:px-10 px-5 py-25 bg-[#F9FAFB]">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="bg-[#774BE5] min-w-20 text-white p-4 rounded-[10px] text-sm font-semibold flex items-center justify-center gap-1"
          >
            All
          </Link>

          <Link
            href="/#"
            className="bg-white md:w-fit min-w-20 text-black p-4 rounded-[10px] text-sm font-semibold flex items-center justify-center gap-1"
          >
            Bugdet
          </Link>

          <Link
            href="/#"
            className="bg-white md:w-fit min-w-20 text-black p-4 rounded-[10px] text-sm font-semibold flex items-center justify-center gap-1"
          >
            City
          </Link>
        </div>
        <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-5 mt-11">
          <SchoolCard
            imageSrc="/images/Angioletto Preschool_logo_enhanced.png"
            imageAlt="Angioletto"
            schoolName="Angioletto Preschool"
            location="Pasig City"
            tags={["DepEd", "Christian"]}
            priceRange="₱368,770 - ₱450,000"
          />

          <SchoolCard
            imageSrc="/images/Assumption College San Lorenzo_logo_enhanced.png"
            imageAlt="Assumption College San Lorenzo"
            schoolName="Assumption College San Lorenzo"
            location="Makati City"
            tags={["DepEd", "Christian"]}
            priceRange="₱148,082 - ₱368,770"
          />

          <SchoolCard
            imageSrc="/images/British School Manila_logo.webp"
            imageAlt="British School Manila"
            schoolName="British School Manila"
            location="Taguig City"
            tags={["British", "IB"]}
            priceRange="₱161,000 - ₱400,000"
          />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SchoolDirectory;
