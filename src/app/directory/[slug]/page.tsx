"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { SchoolService } from "@/lib/schoolService";
import { School } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { SkeletonLoader } from "@/components/SkeletonLoader";

const SchoolDetails = () => {
  const params = useParams();
  const slug = params.slug as string;

  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);
  

  // Load school data from Supabase
  useEffect(() => {
    const loadSchool = async () => {
      try {
        const schools = await SchoolService.getAllSchools();
        const foundSchool = schools.find((s) => {
          const schoolSlug = s.school_name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();
          return schoolSlug === slug;
        });
        setSchool(foundSchool || null);
      } catch (error) {
        console.error("Error loading school:", error);
        setSchool(null);
      } finally {
        setLoading(false);
      }
    };

    loadSchool();
  }, [slug]);
  

  // Show loading state
  if (loading) {
    return (
      <section className="w-full bg-[#F9FAFB] flex flex-col items-center pb-40 px-5">
        <div className="w-full flex items-center justify-center md:px-10 pt-5 md:pt-0">
          <Navbar textColor="black" />
        </div>
        <div className="pt-13 flex flex-col items-center md:w-[930px] w-full px-0 mt-28">
          {/* Header Skeleton */}
          <div className="rounded-[16px] bg-white p-4 flex md:flex-row flex-col gap-4 md:items-center w-full">
            <SkeletonLoader className="w-80 h-50" />
            <div className="flex flex-col gap-2">
              <SkeletonLoader className="h-8 w-64" />
              <div className="flex items-center my-1">
                <SkeletonLoader className="h-4 w-4 rounded-full mr-2" />
                <SkeletonLoader className="h-4 w-32" />
              </div>
              <SkeletonLoader className="h-8 w-32 rounded-lg" />
            </div>
          </div>

          {/* Contact Section Skeleton */}
          <div className="rounded-[16px] bg-white p-4 mt-6 flex gap-4 items-center w-full">
            <div className="flex flex-col gap-2 w-full">
              <SkeletonLoader className="h-6 w-32" />
              <div className="grid md:grid-cols-4 grid-cols-2 w-full gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonLoader key={index} className="h-10 rounded-lg" />
                ))}
              </div>
            </div>
          </div>

          {/* Overview + Info Skeleton */}
          <div className="flex md:flex-row flex-col items-start w-full gap-8 mt-11">
            {/* Overview Skeleton */}
            <div className="rounded-2xl p-8 w-full bg-white">
              <div className="flex gap-2 items-center -ml-1 mb-4">
                <SkeletonLoader className="h-6 w-6 rounded" />
                <SkeletonLoader className="h-6 w-24" />
              </div>
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-2 mt-4">
                  <SkeletonLoader className="h-5 w-32" />
                  <SkeletonLoader className="h-4 w-full" />
                </div>
              ))}
            </div>

            {/* School Info Skeleton */}
            <div className="rounded-2xl p-8 w-full bg-white">
              <div className="flex gap-2 items-center -ml-1 mb-4">
                <SkeletonLoader className="h-6 w-6 rounded" />
                <SkeletonLoader className="h-6 w-40" />
              </div>
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex gap-4 mt-4">
                  <SkeletonLoader className="h-5 w-5 rounded" />
                  <div className="flex-1">
                    <SkeletonLoader className="h-5 w-32 mb-2" />
                    <SkeletonLoader className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          
        </div>
      </section>
    );
  }

  // Show 404 if school not found
  if (!school) {
    return (
      <section className="w-full bg-[#F9FAFB] flex flex-col items-center pb-40 px-5">
        <div className="w-full flex items-center justify-center md:px-10 pt-5 md:pt-0">
          <Navbar textColor="black" />
        </div>
        <div className="pt-13 flex flex-col items-center md:w-[930px] w-full px-0 mt-28">
          <div className="rounded-[16px] bg-white p-8 text-center">
            <h1 className="text-4xl font-bold text-[#0E1C29] mb-4">
              School Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              The school you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/directory"
              className="bg-[#774BE5] text-white px-6 py-3 rounded-lg font-semibold"
            >
              Back to Directory
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#EFE8FF] flex flex-col items-center pb-40 px-5">
      {/* Navbar */}
      <div className="w-full flex items-center justify-center md:px-10 pt-5 md:pt-0">
        <Navbar textColor="black" />
      </div>

      {/* Main Content */}
      <div className="pt-13 flex flex-col items-center md:w-[930px] w-full px-0 mt-28">
        {/* Back to Directory Button */}
        <div className="w-full mb-4">
          <Link
            href="/directory"
            className="inline-flex items-center gap-2 text-[#774BE5] hover:text-[#6B3FD6] transition-colors font-medium"
          >
            <i className="ri-arrow-left-line text-lg"></i>
            Back to Directory
          </Link>
        </div>

        {/* Header */}
        <div className="rounded-[16px] bg-white p-4 flex md:flex-row flex-col gap-4 md:items-center w-full">
          <div className="w-80 h-50 bg-gray-200 border border-gray-200 rounded-[10px] overflow-hidden">
            <Image
              src={school?.logo_banner || "/images/Logo.png"}
              alt={school?.school_name || "School Logo"}
              width={400}
              height={200}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-[#0E1C29] md:text-4xl text-base md:font-medium font-semibold">
              {school?.school_name || "School Name"}
            </h4>
            <div className="flex items-center my-1">
              <i className="ri-map-pin-line text-[#374151] text-lg"></i>
              <p className="text-base font-medium text-[#374151]">
                {school?.city || "City"}
              </p>
            </div>
            {school?.website && (
            <div className="flex items-center my-1">
              <i className="ri-global-line text-[#774BE5] text-lg"></i>
              <a 
                href={school?.website || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-base font-medium text-[#774BE5] hover:underline"
              >
                Official website ↗
              </a>
            </div>
            )}
            <div className="bg-[#774BE5] rounded-lg px-4 py-2 w-fit">
              <p className="text-white font-semibold text-sm">
                {school?.min_tuition || "N/A"} - {school?.max_tuition || "N/A"}
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
              <Link
                href={`tel:${school?.contact_number || ""}`}
                className="bg-[#774BE5] rounded-lg px-4 py-2"
              >
                <p className="text-white text-center font-semibold text-sm">
                  Call
                </p>
              </Link>
              <Link
                href={`sms:${school?.contact_number || ""}`}
                className="bg-[#774BE5] rounded-lg px-4 py-2"
              >
                <p className="text-white text-center font-semibold text-sm">
                  Message
                </p>
              </Link>
              <Link
                href={school?.facebook || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#774BE5] rounded-lg px-4 py-2"
              >
                <p className="text-white text-center font-semibold text-sm">
                  Facebook
                </p>
              </Link>
              <Link
                href={`mailto:${school?.email || ""}`}
                className="bg-[#774BE5] rounded-lg px-4 py-2"
              >
                <p className="text-white text-center font-semibold text-sm">
                  Email
                </p>
              </Link>
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
                {school?.curriculum_type || "Not specified"}
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <p className="md:text-xl text-base text-[#0E1C29] font-semibold">
                Programs
              </p>
              <p className="text-[#0E1C29] font-normal text-sm">
                {school?.extra_programs_elective || "Not specified"}
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <p className="md:text-xl text-base text-[#0E1C29] font-semibold">
                Grade Levels
              </p>
              <p className="text-[#0E1C29] font-normal text-sm">
                {school?.preschool_levels_offered || "Not specified"}
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <p className="md:text-xl text-base text-[#0E1C29] font-semibold">
                Special Programs
              </p>
              <p className="text-[#0E1C29] font-normal text-sm">
                {school?.special_education_support || "Not specified"}
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <p className="md:text-xl text-base text-[#0E1C29] font-semibold">
                Tuition Note
              </p>
              <p className="text-[#0E1C29] font-normal text-sm">
                {school?.tuition_notes || "Not specified"}
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <p className="md:text-xl text-base text-[#0E1C29] font-semibold">
                Class Size
              </p>
              <p className="text-[#0E1C29] font-normal text-sm">
                {school?.class_size_notes || "Not specified"}
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
                desc: school?.after_school_cares || "Not specified",
              },
              {
                icon: "ri-bus-line",
                title: "Transportation",
                desc: school?.school_bus_note || "Not specified",
              },
              {
                icon: "ri-graduation-cap-line",
                title: "Scholarships",
                desc: school?.scholarships_discounts || "Not specified",
              },
              {
                icon: "ri-shield-line",
                title: "Special Education",
                desc: school?.special_education_support || "Not specified",
              },
              {
                icon: "ri-award-line",
                title: "Accreditations",
                desc: school?.accreditations_affiliations || "Not specified",
              },
              {
                icon: "ri-book-open-line",
                title: "Admission Requirements",
                desc: school?.admission_requirements || "Not specified",
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

        {/* Location (opens Google Maps) */}
        <div className="w-full mt-10 rounded-3xl bg-white p-6">
          <div className="flex gap-2 items-center -ml-1 mb-2">
            <i className="ri-map-pin-line text-[#0E1C29] md:text-2xl text-xl mt-0.5 ml-1"></i>
            <p className="md:text-2xl text-lg text-[#0E1C29] font-semibold">Location</p>
          </div>
          <p className="text-[#0E1C29] font-normal text-sm">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                school?.location && school.location.trim() !== ""
                  ? `${school.location}, Philippines`
                  : school?.city && school.city.trim() !== ""
                  ? `${school.city}, Philippines`
                  : "Philippines"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#774BE5] hover:underline"
            >
              {school?.location && school.location.trim() !== ""
                ? school.location
                : school?.city && school.city.trim() !== ""
                ? school.city
                : "Philippines"}
              {" "}↗
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SchoolDetails;
