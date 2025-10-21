"use client";

import Navbar from "@/components/Navbar";
import SchoolCard from "@/components/SchoolCard";
import { SchoolCardSkeleton } from "@/components/SchoolCardSkeleton";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import { SchoolService } from "@/lib/schoolService";
import { School } from "@/lib/supabase";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<School[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [featuredSchools, setFeaturedSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLFormElement>(null);

  // Load featured schools on component mount
  useEffect(() => {
    const loadFeaturedSchools = async () => {
      try {
        const schools = await SchoolService.getFeaturedSchools();
        setFeaturedSchools(schools);
      } catch (error) {
        console.error('Error loading featured schools:', error);
        // Fallback to empty array or show error message
        setFeaturedSchools([]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedSchools();
  }, []);

  // Helper function to create URL-friendly slugs
  const createSlug = (schoolName: string) => {
    return schoolName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single
      .trim();
  };

  // Enhanced search function using Supabase
  const searchSchools = async (query: string) => {
    if (query.trim().length === 0) return [];

    try {
      const results = await SchoolService.searchSchools(query.trim());
      return results.slice(0, 3); // Get top 3 results
    } catch (error) {
      console.error('Error searching schools:', error);
      return [];
    }
  };

  // Handle search input changes
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      setSearchLoading(true);
      setShowResults(true);
      // Search schools using Supabase
      const filtered = await searchSchools(query);
      setSearchResults(filtered);
      setSearchLoading(false);
    } else {
      setSearchResults([]);
      setShowResults(false);
      setSearchLoading(false);
    }
  };

  // Handle search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to directory with search query
      router.push(
        `/directory?search=${encodeURIComponent(searchQuery.trim())}`,
      );
    } else {
      // If no search query, go to directory
      router.push("/directory");
    }
  };

  // Handle clicking on a search result
  const handleResultClick = (school: School) => {
    const slug = createSlug(school.school_name);
    router.push(`/directory/${slug}`);
  };

  // Initialize AOS and handle click outside
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 500,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <>
        <section
          className="w-full min-h-screen bg-cover bg-center flex flex-col items-center pb-40 px-5"
          style={{ backgroundImage: "url('/images/Hero.jpg')" }}
        >
          <div className="w-full flex items-center justify-center md:px-10 pt-5 md:pt-0 z-20">
            <Navbar />
          </div>
          <div className="pt-13 flex flex-col items-center md:w-[930px] w-full px-0 md:px-0 mt-20 z-1">
            <h1 className="md:text-7xl text-[32px] font-semibold text-white text-center leading-[120%]">
              Find the Right Preschool for Your Little One{" "}
            </h1>
            <p className="mt-6 text-white text-sm md:px-50 px-5 text-center">
              Easily compare tuition, programs, and nearby locations from trusted
              preschools in Metro Manila — no sign-ups, no stress
            </p>
            <form
              onSubmit={handleSearch}
              className="bg-white w-full p-5 rounded-3xl mt-6 relative"
              ref={searchRef}
            >
              <h4 className="text-[#0F0F0F] md:text-2xl text-base font-medium">
                Search schools around Philippines
              </h4>
              <div className="flex flex-col md:flex-row md:mt-6 mt-3 gap-2.5 rounded-2xl">
                <div className="bg-[#f5f5f5] w-full md:w-[710px] p-4 md:rounded-[10px] rounded-full overflow-hidden flex items-center gap-5 relative">
                  <i className="ri-search-line text-[#0E1C29]/40 text-2xl"></i>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search by name, location, price, curriculum, programs..."
                    className="bg-transparent w-full text-sm md:text-base text-[#0E1C29] placeholder-[#999999] focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setSearchResults([]);
                        setShowResults(false);
                      }}
                      className="text-[#0E1C29]/40 hover:text-[#0E1C29]/60 transition-colors"
                    >
                      <i className="ri-close-line text-xl"></i>
                    </button>
                  )}
                </div>
                <Link
                  href="/directory"
                  className="bg-[#774BE5] md:w-fit w-full text-white p-4 rounded-[10px] text-sm font-semibold flex items-center justify-center gap-1 hover:bg-[#6B3FD6] transition-colors"
                >
                  View all schools
                  <i className="ri-arrow-right-fill text-white text-lg mt-0.5"></i>
                </Link>
              </div>
            </form>
          </div>
          <div className="w-full h-full absolute bg-black/20 z-0"></div>
        </section>

        <section className="w-full md:px-10 px-5 pt-25 bg-white">
          <h2 className="text-[#0E1C29] md:text-[56px] text-4xl font-normal text-center">
            Explore Preschools
          </h2>
          <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-5 mt-11">
            {Array.from({ length: 6 }).map((_, index) => (
              <SchoolCardSkeleton key={index} />
            ))}
          </div>
          <div className="mt-11 mb-25 flex items-center justify-center w-full">
            <div className="w-fit">
              <div className="bg-gray-200 rounded-[10px] flex items-center gap-2 px-6 py-3 animate-pulse">
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
                <div className="h-4 w-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </>
    );
  }

  return (
    <>
      <section
        className="w-full min-h-screen bg-cover bg-center flex flex-col items-center pb-40 px-5"
        style={{ backgroundImage: "url('/images/Hero.jpg')" }}
      >
        <div className="w-full flex items-center justify-center md:px-10 pt-5 md:pt-0 z-20">
          <Navbar />
        </div>
        <div className="pt-13 flex flex-col items-center md:w-[930px] w-full px-0 md:px-0 mt-20 z-1">
          <h1 className="md:text-7xl text-[32px] font-semibold text-white text-center leading-[120%]">
            Find the Right Preschool for Your Little One{" "}
          </h1>
          <p className="mt-6 text-white text-sm md:px-50 px-5 text-center">
            Easily compare tuition, programs, and nearby locations from trusted
            preschools in Metro Manila — no sign-ups, no stress
          </p>
          <form
            onSubmit={handleSearch}
            className="bg-white w-full p-5 rounded-3xl mt-6 relative"
            ref={searchRef}
          >
            <h4 className="text-[#0F0F0F] md:text-2xl text-base font-medium">
              Search schools around Philippines
            </h4>
            <div className="flex flex-col md:flex-row md:mt-6 mt-3 gap-2.5 rounded-2xl">
              <div className="bg-[#f5f5f5] w-full md:w-[710px] p-4 md:rounded-[10px] rounded-full overflow-hidden flex items-center gap-5 relative">
                <i className="ri-search-line text-[#0E1C29]/40 text-2xl"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search by name, location, price, curriculum, programs..."
                  className="bg-transparent w-full text-sm md:text-base text-[#0E1C29] placeholder-[#999999] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchResults([]);
                      setShowResults(false);
                    }}
                    className="text-[#0E1C29]/40 hover:text-[#0E1C29]/60 transition-colors"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                )}
              </div>
              <Link
                href="/directory"
                className="bg-[#774BE5] md:w-fit w-full text-white p-4 rounded-[10px] text-sm font-semibold flex items-center justify-center gap-1 hover:bg-[#6B3FD6] transition-colors"
              >
                View all schools
                <i className="ri-arrow-right-fill text-white text-lg mt-0.5"></i>
              </Link>
            </div>

            {/* Search Results Dropdown */}
            {showResults && (
              <div className="absolute top-full left-5 right-5 mt-2 bg-white rounded-2xl shadow-lg border border-gray-200 z-50">
                <div className="p-4">
                  {searchLoading ? (
                    <>
                      <div className="animate-pulse">
                        <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
                        {Array.from({ length: 3 }).map((_, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 mb-2"
                          >
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0"></div>
                            <div className="flex-1 space-y-2">
                              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                              <div className="flex gap-1">
                                <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                                <div className="h-5 bg-gray-200 rounded-full w-20"></div>
                              </div>
                            </div>
                            <div className="w-4 h-4 bg-gray-200 rounded"></div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : searchResults.length > 0 ? (
                    <>
                      <h5 className="text-sm font-semibold text-gray-600 mb-3">
                        Top {searchResults.length} result
                        {searchResults.length !== 1 ? "s" : ""}
                      </h5>
                      {searchResults.map((school, index) => (
                        <div
                          key={`${school.school_name}-${index}`}
                          onClick={() => handleResultClick(school)}
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={school.logo_banner}
                              alt={school.school_name}
                              width={48}
                              height={48}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h6 className="font-semibold text-[#0E1C29] text-sm truncate">
                              {school.school_name}
                            </h6>
                            <p className="text-xs text-gray-600 truncate">
                              {school.city} • {school.min_tuition} -{" "}
                              {school.max_tuition}
                            </p>
                            <div className="flex gap-1 mt-1">
                              {school.curriculum_tags
                                .split(", ")
                                .slice(0, 2)
                                .map((tag: string, tagIndex: number) => (
                                  <span
                                    key={tagIndex}
                                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                            </div>
                          </div>
                          <i className="ri-arrow-right-s-line text-gray-400"></i>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500 text-sm">No schools found</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="w-full h-full absolute bg-black/20 z-0"></div>
      </section>

      <section className="w-full md:px-10 px-5 pt-25 bg-white">
        <h2 className="text-[#0E1C29] md:text-[56px] text-4xl font-normal text-center">
          Explore Preschools
        </h2>
        <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-5 mt-11">
          {featuredSchools.map((school, index) => (
            <div key={`${school.school_name}-${index}`}>
              <SchoolCard
                imageSrc={school.logo_banner}
                imageAlt={school.school_name}
                schoolName={school.school_name}
                location={school.city}
                tags={school.curriculum_tags.split(", ")}
                priceRange={`${school.min_tuition} - ${school.max_tuition}`}
                schoolSlug={createSlug(school.school_name)}
              />
            </div>
          ))}
        </div>
        <div className="mt-11 mb-25 flex items-center justify-center w-full">
          <div className="w-fit">
            <Link
              href="/directory"
              className="bg-black hover:bg-[#774BE5] transition-all duration-500 ease-in-out rounded-[10px] text-white flex items-center gap-2 px-6 py-3"
            >
              <p className="text-base font-medium">View all schools</p>
              <i className="ri-arrow-right-fill text-lg"></i>
            </Link>
          </div>
        </div>
      </section>

      <div>
        <HowItWorksSection
          title="How Aralya Works"
          description="Find the right preschool in 3 quick steps"
          steps={[
            {
              iconSrc: "/images/map.svg",
              iconAlt: "map",
              stepNumber: 1,
              title: "Choose your city",
              description: "Start with BGC, QC, Makati, Pasig and more.",
            },
            {
              iconSrc: "/images/filter.svg",
              iconAlt: "filter",
              stepNumber: 2,
              title: "Filter by preferences",
              description:
                "Set your budget, curriculum, and schedule preferences.",
            },
            {
              iconSrc: "/images/about.jpg",
              iconAlt: "compare",
              stepNumber: 3,
              title: "Compare and contact",
              description: "Review schools and contact them directly.",
            },
          ]}
        />
      </div>

      <div>
        <FAQSection
          title="Questions? Answers!"
          description="Find quick answers to the most common questions about our platform"
          faqs={[
            {
              question: "Is Aralya free?",
              answer: "Yes-free for parents.",
            },
            {
              question: "Do I need to sign up?",
              answer: "No. No accounts, no forms.",
            },
            {
              question: "How do I contact a school?",
              answer:
                "On the school page, tap Call, Text, Message on FB, or Email.",
            },
            {
              question: "What can I filter by?",
              answer: "City, tuition range, curriculum, and schedule.",
            },
            {
              question: "How accurate are the details?",
              answer: "We confirm with schools and refresh weekly.",
            },
            {
              question: "Which cities are available now?",
              answer: "BGC, QC, Makati, Pasig, Taguig-more coming soon.",
            },
          ]}
        />
      </div>

      <div>
        <AboutSection
          title="About Aralya"
          description="Aralya helps Filipino parents find preschools fast. Compare schools by city, tuition, curriculum, and schedule, then contact the school in one tap-Call, Text, FB Message, or Email. No sign-up. Free for parents. We verify details with schools and refresh weekly so you can decide with confidence."
          featureTitle="What you'll find"
          features={[
            {
              icon: "ri-book-open-line",
              text: "Clear tuition ranges",
            },
            {
              icon: "ri-book-open-line",
              text: "Curriculum tags (Montessori, Progressive, Traditional, Reggio)",
            },
            {
              icon: "ri-book-open-line",
              text: "Schedules (AM/PM/Full-day)",
            },
            {
              icon: "ri-book-open-line",
              text: "City pages: BGC, QC, Makati, Pasig, Taguig - and growing",
            },
          ]}
          imageSrc="/images/about.jpg"
          imageAlt="About Aralya"
        />
      </div>

      <Footer />
    </>
  );
}
