import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";

const SchoolDetails = () => {
  return (
    <>
      <section className="w-full h-100 bg-cover bg-center flex flex-col items-center pb-40 px-5">
        <div className="w-full flex items-center justify-center md:px-10 pt-5 md:pt-0">
          <Navbar textColor="black" />
        </div>
        <div className="pt-13 flex flex-col items-center md:w-[930px] bg-white w-full px-0 md:px-0 mt-20">
          <div className="shadow-xl p-4 flex gap-4 items-center w-full">
            <div className="w-30 h-18">
              <Image
                src="/images/Angioletto Preschool_logo_enhanced.png"
                alt="logo"
                width={400}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#0E1C29] md:text-4xl text-base md:font-medium font-semibold">
                Angioletto Preschool
              </h4>
              <div className="bg-[#774BE5] rounded-lg px-4 py-2 w-fit">
                <p className="text-white font-semibold text-sm">
                  ₱48,000 - ₱60,000
                </p>
              </div>
              <div className="flex md:flex-row flex-col items-center gap-2">
                <div className="flex md:flex-row flex-col md:items-center items-start gap-3">
                  <div className="flex items-center gap-1">
                    <i className="ri-star-s-fill text-yellow-500 text-lg"></i>
                    <i className="ri-star-s-fill text-yellow-500 text-lg"></i>
                    <i className="ri-star-s-fill text-yellow-500 text-lg"></i>
                    <i className="ri-star-s-fill text-yellow-500 text-lg"></i>
                    <i className="ri-star-s-fill text-yellow-500 text-lg"></i>
                  </div>
                  <div className="flex gap-2 items-center">
                    <p className="text-base font-semibold text-[#0E1C29]">
                      5.0
                    </p>
                    <p className="text-base font-medium text-[#374151]">
                      (5 reviews)
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <i className="ri-map-pin-line text-[#374151] text-lg"></i>
                <p className="text-base font-medium text-[#374151]">
                  Pasig City
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start w-full gap-8 mt-11">
            <div className="bg-[#774BE5] rounded-2xl p-8 w-1/2 shadow-2xl">
              <h6 className="text-white text-2xl font-medium text-center">
                Contact School
              </h6>

              <div className="flex items-start gap-2">
                <i className="ri-phone-line text-white text-lg"></i>
                <div className="flex flex-col gap-1">
                  <h6 className="text-xl text-white font-medium">Phone</h6>
                  <p className="text-sm text-white">02-347-6496</p>
                </div>
              </div>

              <div className="flex items-start gap-2 mt-4">
                <i className="ri-mail-line text-white text-lg"></i>
                <div className="flex flex-col gap-1">
                  <h6 className="text-xl text-white font-medium">Email</h6>
                  <p className="text-sm text-white">
                    angiolettopreschool@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex gap-2 text-[#0E1C29] bg-white items-center justify-center py-2 rounded-lg text-lg mt-5">
                <i className="ri-facebook-circle-line"></i>
                <p>Facebook Page</p>
              </div>
            </div>

        <div className="flex flex-col gap-8 w-1/2">
              <div className="bg-white rounded-2xl p-8 w-full shadow-2xl">
              <div className="flex gap-2 items-center">
                <i className="ri-book-open-line text-[#0E1C29] text-2xl mt-0.5"></i>
                <p className="text-2xl text-[#0E1C29] font-semibold">
                  Overview
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <p className="text-xl text-[#0E1C29] font-medium">Curriculum</p>
                <p className="text-[#0E1C29] font-normal text-sm">
                  Traditional preschool with Mandarin classes
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <p className="text-xl text-[#0E1C29] font-medium">Programs</p>
                <p className="text-[#0E1C29] font-normal text-sm">
                  Mandarin classes, PE, Arts and Crafts
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <p className="text-xl text-[#0E1C29] font-medium">
                  Grade Levels
                </p>
                <p className="text-[#0E1C29] font-normal text-sm">
                  Nursery, Pre-Kinder, Kinder
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <p className="text-xl text-[#0E1C29] font-medium">
                  Special Programs
                </p>
                <p className="text-[#0E1C29] font-normal text-sm">
                  Provides specialized programs, including one-on-one
                  assistance, for students on the autism spectrum
                </p>
              </div>
            </div>


                <div className="bg-white rounded-2xl p-8 w-full shadow-2xl">
              <div className="flex gap-2 items-center">
                <i className="ri-shield-line text-[#0E1C29] text-2xl mt-0.5"></i>
                <p className="text-2xl text-[#0E1C29] font-semibold">
                  School Information
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <p className="text-xl text-[#0E1C29] font-medium">After School Care</p>
                <p className="text-[#0E1C29] font-normal text-sm">
                  Yes - Extended hours until 5:00 PM
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <p className="text-xl text-[#0E1C29] font-medium">Transportation</p>
                <p className="text-[#0E1C29] font-normal text-sm">
                  Not Avaliable
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <p className="text-xl text-[#0E1C29] font-medium">
                  Scholarships
                </p>
                <p className="text-[#0E1C29] font-normal text-sm">
                  No
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <p className="text-xl text-[#0E1C29] font-medium">
                  Special Education
                </p>
                <p className="text-[#0E1C29] font-normal text-sm">
                 No
                </p>
              </div>

              
              <div className="flex flex-col gap-2 mt-4">
                <p className="text-xl text-[#0E1C29] font-medium">
                  Accreditations
                </p>
                <p className="text-[#0E1C29] font-normal text-sm">
                 DepEd authorized
                </p>
              </div>

                <div className="flex flex-col gap-2 mt-4">
                <p className="text-xl text-[#0E1C29] font-medium">
                  Admission Requirements
                </p>
                <p className="text-[#0E1C29] font-normal text-sm">
                 Age 3-6 years, registration required
                </p>
              </div>
            </div>
        </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SchoolDetails;

