"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SchoolCard from "@/components/SchoolCard";
import { schoolsData } from "@/utils/data";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Suspense,
} from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

interface School {
  school_name: string;
  min_tuition: string;
  max_tuition: string;
  tuition_notes: string;
  grade_levels_offered: string;
  class_size_notes: string;
  curriculum_type: string;
  class_schedule: string;
  extra_programs_elective: string;
  after_school_cares: string;
  admission_requirements: string;
  scholarships_discounts: string;
  special_education_support: string;
  language_used: string;
  school_bus_note: string;
  accreditations_affiliations: string;
  logo_banner: string;
  website: string;
  facebook: string;
  contact_number: string;
  email: string;
  city: string;
  preschool_levels_offered: string;
  curriculum_tags: string;
}

// Component that uses useSearchParams - needs to be wrapped in Suspense
const SchoolDirectoryContent = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [displayedSchools, setDisplayedSchools] = useState<School[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [searchResults, setSearchResults] = useState<School[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const observerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLFormElement>(null);

  const schoolsPerPage = 12; // Load 12 schools at a time

  // Helper function to normalize city names for better matching
  const normalizeCityName = (cityName: string): string => {
    return cityName.toLowerCase().trim();
  };

  // Helper function to check if a school is in a specific city
  const isSchoolInCity = (school: School, targetCity: string): boolean => {
    const cities = school.city
      .split(",")
      .map((city: string) => normalizeCityName(city));
    const normalizedTargetCity = normalizeCityName(targetCity);

    return cities.some((city: string) => {
      // Direct match
      if (city.includes(normalizedTargetCity)) return true;

      // Handle specific city name variations
      if (normalizedTargetCity === "pasig" && city.includes("pasig"))
        return true;
      if (normalizedTargetCity === "makati" && city.includes("makati"))
        return true;
      if (normalizedTargetCity === "taguig" && city.includes("taguig"))
        return true;
      if (normalizedTargetCity === "quezon" && city.includes("quezon"))
        return true;
      if (normalizedTargetCity === "san juan" && city.includes("san juan"))
        return true;
      if (normalizedTargetCity === "manila" && city.includes("manila"))
        return true;
      if (normalizedTargetCity === "las pinas" && city.includes("las pinas"))
        return true;
      if (normalizedTargetCity === "angeles" && city.includes("angeles"))
        return true;

      return false;
    });
  };

  // Helper function to create URL-friendly slugs
  const createSlug = (schoolName: string) => {
    return schoolName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single
      .trim();
  };

  // Enhanced search function
  const searchSchools = (query: string) => {
    if (query.trim().length === 0) return schoolsData;

    const searchTerm = query.toLowerCase().trim();

    return schoolsData.filter((school) => {
      // Search by school name
      const nameMatch = school.school_name.toLowerCase().includes(searchTerm);

      // Search by location/city
      const locationMatch = school.city.toLowerCase().includes(searchTerm);

      // Search by curriculum tags
      const curriculumMatch = school.curriculum_tags
        .toLowerCase()
        .includes(searchTerm);

      // Search by price range (extract numbers from query)
      const priceNumbers = searchTerm.match(/\d+/g);
      let priceMatch = false;
      if (priceNumbers) {
        const queryPrice = parseInt(priceNumbers[0]);
        const minPrice = parseInt(school.min_tuition.replace(/[^\d]/g, ""));
        const maxPrice = parseInt(school.max_tuition.replace(/[^\d]/g, ""));
        priceMatch = queryPrice >= minPrice && queryPrice <= maxPrice;
      }

      // Search by grade levels
      const gradeMatch =
        school.preschool_levels_offered.toLowerCase().includes(searchTerm) ||
        school.grade_levels_offered.toLowerCase().includes(searchTerm);

      // Search by special programs
      const programMatch =
        school.extra_programs_elective.toLowerCase().includes(searchTerm) ||
        school.special_education_support.toLowerCase().includes(searchTerm);

      // Search by language
      const languageMatch = school.language_used
        .toLowerCase()
        .includes(searchTerm);

      // Search by accreditation
      const accreditationMatch = school.accreditations_affiliations
        .toLowerCase()
        .includes(searchTerm);

      // Search by class size
      const classSizeMatch = school.class_size_notes
        .toLowerCase()
        .includes(searchTerm);

      // Search by schedule
      const scheduleMatch = school.class_schedule
        .toLowerCase()
        .includes(searchTerm);

      return (
        nameMatch ||
        locationMatch ||
        curriculumMatch ||
        priceMatch ||
        gradeMatch ||
        programMatch ||
        languageMatch ||
        accreditationMatch ||
        classSizeMatch ||
        scheduleMatch
      );
    });
  };

  // Handle local search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setLocalSearchQuery(query);

    if (query.trim().length > 0) {
      // Filter schools based on enhanced search
      const filtered = searchSchools(query).slice(0, 3); // Get top 3 results

      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  // Handle clicking on a search result
  const handleResultClick = (school: School) => {
    const slug = createSlug(school.school_name);
    window.location.href = `/directory/${slug}`;
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
      // Close filter dropdowns when clicking outside
      const target = event.target as Element;
      if (!target.closest(".filter-dropdown")) {
        setActiveFilter("all");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Apply filters to schools
  const applyFilters = useCallback(
    (schools: School[]) => {
      let filtered = schools;

      // Apply budget filter
      if (budgetFilter) {
        const budgetRanges = {
          "under-100k": { min: 0, max: 100000 },
          "100k-200k": { min: 100000, max: 200000 },
          "200k-300k": { min: 200000, max: 300000 },
          "300k-500k": { min: 300000, max: 500000 },
          "over-500k": { min: 500000, max: Infinity },
        };

        const range = budgetRanges[budgetFilter as keyof typeof budgetRanges];
        if (range) {
          filtered = filtered.filter((school) => {
            const minPrice = parseInt(school.min_tuition.replace(/[^\d]/g, ""));
            const maxPrice = parseInt(school.max_tuition.replace(/[^\d]/g, ""));
            return (
              (minPrice >= range.min && minPrice <= range.max) ||
              (maxPrice >= range.min && maxPrice <= range.max)
            );
          });
        }
      }

      // Apply city filter
      if (cityFilter) {
        filtered = filtered.filter((school) =>
          isSchoolInCity(school, cityFilter),
        );
      }

      return filtered;
    },
    [budgetFilter, cityFilter],
  );

  // Filter schools based on search query and filters
  useEffect(() => {
    const searchFiltered = searchSchools(searchQuery);
    const finalFiltered = applyFilters(searchFiltered);
    setFilteredSchools(finalFiltered);
  }, [searchQuery, budgetFilter, cityFilter, applyFilters]);

  // Load initial schools
  useEffect(() => {
    const initialSchools = filteredSchools.slice(0, schoolsPerPage);
    setDisplayedSchools(initialSchools);
    setCurrentPage(1);
    setHasMore(filteredSchools.length > schoolsPerPage);
  }, [filteredSchools]);

  // Load more schools function
  const loadMoreSchools = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const startIndex = currentPage * schoolsPerPage;
      const endIndex = startIndex + schoolsPerPage;
      const newSchools = filteredSchools.slice(startIndex, endIndex);

      if (newSchools.length === 0) {
        setHasMore(false);
      } else {
        setDisplayedSchools((prev) => [...prev, ...newSchools]);
        setCurrentPage((prev) => prev + 1);
      }

      setIsLoading(false);
    }, 500);
  }, [isLoading, hasMore, currentPage, filteredSchools, schoolsPerPage]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreSchools();
        }
      },
      { threshold: 0.1 },
    );

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [currentPage, hasMore, isLoading, loadMoreSchools]);

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
          <form
            className="bg-white w-full md:rounded-3xl rounded-full mt-6 relative"
            ref={searchRef}
          >
            <div className="flex flex-col md:flex-row gap-2.5 rounded-2xl">
              <div className="w-full p-4 md:rounded-[10px] rounded-full overflow-hidden flex items-center gap-5 relative">
                <i className="ri-search-line text-[#0E1C29]/40 text-2xl"></i>
                <input
                  type="text"
                  value={localSearchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search by name, location, price, curriculum, programs..."
                  className="bg-transparent w-full text-sm md:text-base text-[#0E1C29] placeholder-[#999999] focus:outline-none"
                />
                {localSearchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setLocalSearchQuery("");
                      setSearchResults([]);
                      setShowResults(false);
                    }}
                    className="text-[#0E1C29]/40 hover:text-[#0E1C29]/60 transition-colors"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                )}
              </div>
            </div>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-5 right-5 mt-2 bg-white rounded-2xl shadow-lg border border-gray-200 z-[9999]">
                <div className="p-4">
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
                </div>
              </div>
            )}
          </form>
        </div>
      </section>

      <section className="w-full md:px-10 px-5 py-25 bg-white">
        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-[#0E1C29] mb-2">
              Search Results for &quot;{searchQuery}&quot;
            </h2>
            <p className="text-gray-600">
              Found {filteredSchools.length} school
              {filteredSchools.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveFilter("all");
              setBudgetFilter("");
              setCityFilter("");
            }}
            className={`min-w-20 p-4 rounded-[10px] text-sm font-semibold flex items-center justify-center gap-1 ${
              activeFilter === "all"
                ? "bg-[#774BE5] text-white"
                : "bg-white text-black hover:bg-gray-50"
            }`}
          >
            All
          </button>

          <div className="relative filter-dropdown z-[10000]">
            <button
              onClick={() =>
                setActiveFilter(activeFilter === "budget" ? "all" : "budget")
              }
              className={`md:w-fit min-w-20 p-4 rounded-[10px] text-sm font-semibold flex items-center justify-center gap-1 ${
                activeFilter === "budget"
                  ? "bg-[#774BE5] text-white"
                  : "bg-white text-black hover:bg-gray-50"
              }`}
            >
              Budget
              <i className="ri-arrow-down-s-line text-sm"></i>
            </button>

            {activeFilter === "budget" && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200  min-w-48 z-[9999]">
                <div className="p-2">
                  {[
                    { key: "under-100k", label: "Under ₱100k" },
                    { key: "100k-200k", label: "₱100k - ₱200k" },
                    { key: "200k-300k", label: "₱200k - ₱300k" },
                    { key: "300k-500k", label: "₱300k - ₱500k" },
                    { key: "over-500k", label: "Over ₱500k" },
                  ].map((option) => (
                    <button
                      key={option.key}
                      onClick={() => {
                        setBudgetFilter(
                          budgetFilter === option.key ? "" : option.key,
                        );
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-50 ${
                        budgetFilter === option.key
                          ? "bg-[#774BE5] text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative filter-dropdown z-[10000]">
            <button
              onClick={() =>
                setActiveFilter(activeFilter === "city" ? "all" : "city")
              }
              className={`md:w-fit min-w-20 p-4 rounded-[10px] text-sm font-semibold flex items-center justify-center gap-1 ${
                activeFilter === "city"
                  ? "bg-[#774BE5] text-white"
                  : "bg-white text-black hover:bg-gray-50"
              }`}
            >
              City
              <i className="ri-arrow-down-s-line text-sm"></i>
            </button>

            {activeFilter === "city" && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-[9999] min-w-48">
                <div className="p-2">
                  {[
                    "Angeles City",
                    "Las Pinas City",
                    "Laguna",
                    "Makati City",
                    "Mandaluyong",
                    "Manila City",
                    "Pasay",
                    "Pasig City",
                    "Quezon City",
                    "San Juan City",
                    "Taguig City",
                  ].map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setCityFilter(cityFilter === city ? "" : city);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-50 ${
                        cityFilter === city
                          ? "bg-[#774BE5] text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-5 mt-11 z-0">
          {displayedSchools.map((school, index) => (
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

        {/* Loading indicator and intersection observer */}
        <div ref={observerRef} className="w-full flex justify-center py-8">
          {isLoading && (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#774BE5]"></div>
              <span className="text-[#774BE5] font-medium">
                Loading more schools...
              </span>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

// Loading component for Suspense fallback
const DirectoryLoading = () => (
  <div className="w-full min-h-screen bg-[#F9FAFB] flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#774BE5] mx-auto mb-4"></div>
      <p className="text-[#0E1C29] font-medium">Loading directory...</p>
    </div>
  </div>
);

// Main component with Suspense boundary
const SchoolDirectory = () => {
  return (
    <Suspense fallback={<DirectoryLoading />}>
      <SchoolDirectoryContent />
    </Suspense>
  );
};

export default SchoolDirectory;
