"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

const SchoolDetails = () => {
  const city = "Pasig";
  const [coords, setCoords] = useState<{ lat: string; lon: string } | null>(
    null
  );

  // Fetch city coordinates from OpenStreetMap
  useEffect(() => {
    async function fetchCoords() {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            city
          )}`
        );
        const data = await res.json();
        if (data.length > 0) {
          setCoords({ lat: data[0].lat, lon: data[0].lon });
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    }
    fetchCoords();
  }, [city]);

  // Build map URL once we have coordinates
  const mapSrc = coords
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lon},${coords.lat},${coords.lon},${coords.lat}&layer=mapnik&marker=${coords.lat},${coords.lon}`
    : "";

  return (
    <section className="w-full bg-[#F9FAFB] flex flex-col items-center pb-40 px-5">
      {/* Navbar */}
      <div className="w-full flex items-center justify-center md:px-10 pt-5 md:pt-0">
        <Navbar textColor="black" />
      </div>

      {/* Main Content */}
      <div className="pt-13 flex flex-col items-center md:w-[930px] w-full px-0 mt-28">
        {/* Header */}
        <div className="rounded-[16px] bg-white p-4 flex md:flex-row flex-col gap-4 md:items-center w-full">
          <div className="w-80 h-50">
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
            <div className="flex items-center my-1">
              <i className="ri-map-pin-line text-[#374151] text-lg"></i>
              <p className="text-base font-medium text-[#374151]">Pasig City</p>
            </div>
            <div className="bg-[#774BE5] rounded-lg px-4 py-2 w-fit">
              <p className="text-white font-semibold text-sm">
                ₱48,000 - ₱60,000
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="rounded-[16px] bg-white p-4 mt-6 flex gap-4 items-center w-full">
          <div className="flex flex-col gap-2 w-full">
            <h4 className="text-[#0E1C29] md:text-2xl text-base md:font-medium font-semibold">
              Contact School
            </h4>

            <div className="grid md:grid-cols-4 grid-cols-2 w-full gap-4">
              {["Call", "Message", "Facebook", "Email"].map((action) => (
                <Link
                  key={action}
                  href="/"
                  className="bg-[#774BE5] rounded-lg px-4 py-2"
                >
                  <p className="text-white text-center font-semibold text-sm">
                    {action}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Overview + Info */}
        <div className="flex md:flex-row flex-col items-start w-full gap-8 mt-11">
          {/* Overview */}
          <div className="rounded-2xl p-8 w-full bg-white">
            <div className="flex gap-2 items-center -ml-1">
              <i className="ri-book-open-line text-[#0E1C29] md:text-2xl text-xl mt-0.5 ml-1"></i>
              <p className="md:text-2xl text-lg text-[#0E1C29] font-semibold">
                Overview
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <p className="md:text-xl text-base text-[#0E1C29] font-semibold">
                Curriculum
              </p>
              <p className="text-[#0E1C29] font-normal text-sm">
                Traditional preschool with Mandarin classes
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <p className="md:text-xl text-base text-[#0E1C29] font-semibold">
                Programs
              </p>
              <p className="text-[#0E1C29] font-normal text-sm">
                Mandarin classes, PE, Arts and Crafts
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <p className="md:text-xl text-base text-[#0E1C29] font-semibold">
                Grade Levels
              </p>
              <p className="text-[#0E1C29] font-normal text-sm">
                Nursery, Pre-Kinder, Kinder
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <p className="md:text-xl text-base text-[#0E1C29] font-semibold">
                Special Programs
              </p>
              <p className="text-[#0E1C29] font-normal text-sm">
                Provides specialized programs, including one-on-one assistance,
                for students on the autism spectrum
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <p className="md:text-xl text-base text-[#0E1C29] font-semibold">
                Tuition Note
              </p>
              <p className="text-[#0E1C29] font-normal text-sm">
                ₱48,000-₱60,000 annually (inclusive of materials)
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <p className="md:text-xl text-base text-[#0E1C29] font-semibold">
                Class Size
              </p>
              <p className="text-[#0E1C29] font-normal text-sm">
                2:8 for Toddler classes; 2:12 for Nursery; 2:15 for Kinder 1 and
                Kinder 2
              </p>
            </div>
          </div>

          {/* School Info */}
          <div className="rounded-2xl p-8 w-full bg-white">
            <div className="flex gap-2 items-center -ml-1">
              <i className="ri-shield-line text-[#0E1C29] md:text-2xl text-xl mt-0.5 ml-1"></i>
              <p className="md:text-2xl text-lg text-[#0E1C29] font-semibold">
                School Information
              </p>
            </div>

            {[
              {
                icon: "ri-calendar-check-line",
                title: "After School Care",
                desc: "Yes - Extended hours until 5:00 PM",
              },
              {
                icon: "ri-bus-line",
                title: "Transportation",
                desc: "Not Available",
              },
              {
                icon: "ri-graduation-cap-line",
                title: "Scholarships",
                desc: "No",
              },
              {
                icon: "ri-shield-line",
                title: "Special Education",
                desc: "No",
              },
              {
                icon: "ri-award-line",
                title: "Accreditations",
                desc: "DepEd authorized",
              },
              {
                icon: "ri-book-open-line",
                title: "Admission Requirements",
                desc: "Age 3-6 years, registration required",
              },
            ].map((info) => (
              <div key={info.title} className="flex gap-4 mt-4">
                <i className={`${info.icon} text-[#774BE5] text-lg`}></i>
                <div>
                  <p className="md:text-xl text-base text-[#0E1C29] font-semibold">
                    {info.title}
                  </p>
                  <p className="text-[#0E1C29] font-normal text-sm">
                    {info.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="w-full mt-10 rounded-3xl">
          {coords ? (
            <iframe
              title={`Map of ${city}`}
              width="100%"
              height="450"
              loading="lazy"
              allowFullScreen
              src={mapSrc}
              style={{ border: 0 }}
              className="rounded-3xl"
            ></iframe>
          ) : (
            <p className="text-center text-gray-600">Loading map...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SchoolDetails;
