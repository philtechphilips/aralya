import Navbar from "@/components/Navbar";
import SchoolCard from "@/components/SchoolCard";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section
        className="w-full min-h-screen bg-cover bg-center flex flex-col items-center pb-40"
        style={{ backgroundImage: "url('/images/Hero.png')" }}
      >
        <Navbar />
        <div className="pt-13 flex flex-col items-center w-[930px]">
          <h1 className="text-7xl font-semibold text-white text-center leading-[120%]">
            Find the Right Preschool for Your Little One{" "}
          </h1>
          <p className="mt-6 text-white text-sm px-50 text-center">
            Easily compare tuition, programs, and nearby locations from trusted
            preschools in Metro Manila — no sign-ups, no stress
          </p>
          <div className="bg-white w-full p-5 rounded-3xl mt-6">
            <h4 className="text-[#0F0F0F] text-2xl font-medium">
              Serach schools around Philipines
            </h4>
            <div className="flex mt-6 gap-2.5 rounded-2xl">
              <div className="bg-[#f5f5f5] w-[710px] cursor-pointer p-4 rounded-[10px] flex items-center gap-5">
                <i className="ri-search-line text-[#0E1C29]/40 text-2xl"></i>
                <p className="text-[#999999]">
                  Search by school name, location...
                </p>
              </div>
              <Link
                href="/"
                className="bg-[#774BE5] w-fit text-white p-4 rounded-[10px] text-sm font-semibold flex items-center gap-1"
              >
                View all schools
                <i className="ri-arrow-right-fill text-white text-lg mt-0.5"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-10 py-25 bg-white">
        <h2 className="text-[#000000] text-[56px] font-normal text-center">
          Explore Preschools
        </h2>
        <div className="w-full grid grid-cols-3 gap-5 mt-11">
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
        <div className="mt-11 mb-25 flex items-center justify-center w-full">
         <div className="w-fit">
           <Link href="/" className="bg-black rounded-[10px] text-white flex items-center gap-2 px-6 py-3">
            <p className="text-base font-medium">View all schools</p>
            <i className="ri-arrow-right-fill text-lg"></i>
          </Link>
         </div>
        </div>
      </section>
    </>
  );
}

