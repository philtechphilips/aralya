"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SchoolCard from "@/components/SchoolCard";
import { schoolsData } from "@/utils/data";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

const SchoolDirectory = () => {
  const [displayedSchools, setDisplayedSchools] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);
  
  const schoolsPerPage = 6; // Load 6 schools at a time
  
  // Helper function to create URL-friendly slugs
  const createSlug = (schoolName: string) => {
    return schoolName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  };

  // Load initial schools
  useEffect(() => {
    const initialSchools = schoolsData.slice(0, schoolsPerPage);
    setDisplayedSchools(initialSchools);
    setCurrentPage(1);
  }, []);

  // Load more schools function
  const loadMoreSchools = () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const startIndex = currentPage * schoolsPerPage;
      const endIndex = startIndex + schoolsPerPage;
      const newSchools = schoolsData.slice(startIndex, endIndex);
      
      if (newSchools.length === 0) {
        setHasMore(false);
      } else {
        setDisplayedSchools(prev => [...prev, ...newSchools]);
        setCurrentPage(prev => prev + 1);
      }
      
      setIsLoading(false);
    }, 500);
  };

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreSchools();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [currentPage, hasMore, isLoading]);

  return (
    <>
      <section
        className="w-full h-fit bg-cover bg-center flex flex-col items-center pb-40 px-5 relative"
        style={{ backgroundImage: "url('/images/Hero.jpg')" }}
      >
        <div className="w-full h-full absolute top-0 left-0 bg-black/20 z-0"></div>
        <div className="w-full flex items-center justify-center md:px-10 pt-5 md:pt-0 relative z-10">
          <Navbar />
        </div>
        <div className="pt-13 flex flex-col items-center md:w-[930px] w-full px-0 md:px-0 mt-20 relative z-10">
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

      <section className="w-full md:px-10 px-5 py-25 bg-white">
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
          {displayedSchools.map((school, index) => (
            <SchoolCard
              key={`${school.school_name}-${index}`}
              imageSrc={school.logo_banner}
              imageAlt={school.school_name}
              schoolName={school.school_name}
              location={school.city}
              tags={school.curriculum_tags.split(", ")}
              priceRange={`${school.min_tuition} - ${school.max_tuition}`}
              schoolSlug={createSlug(school.school_name)}
            />
          ))}
        </div>
        
        {/* Loading indicator and intersection observer */}
        <div ref={observerRef} className="w-full flex justify-center py-8">
          {isLoading && (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#774BE5]"></div>
              <span className="text-[#774BE5] font-medium">Loading more schools...</span>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SchoolDirectory;
