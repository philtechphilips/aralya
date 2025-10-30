"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SchoolCard from "@/components/SchoolCard";
import { SchoolCardSkeleton } from "@/components/SchoolCardSkeleton";
import { SchoolService } from "@/lib/schoolService";
import { School } from "@/lib/supabase";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Suspense,
} from "react";
import { useSearchParams } from "next/navigation";



// Component that uses useSearchParams - needs to be wrapped in Suspense
const SchoolDirectoryContent = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const cityQuery = searchParams.get("city") || "";

  const [displayedSchools, setDisplayedSchools] = useState<School[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [searchResults, setSearchResults] = useState<{ city: string; schoolCount: number }[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState("");
  const [cityFilter, setCityFilter] = useState(cityQuery);
  const [curriculumFilter, setCurriculumFilter] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
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

  // Enhanced search function for cities using Supabase
  const searchCities = async (query: string) => {
    if (query.trim().length === 0) {
      return [];
    }

    try {
      return await SchoolService.searchCities(query.trim());
    } catch (error) {
      console.error('Error searching cities:', error);
      return [];
    }
  };

  // Handle local search input changes
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setLocalSearchQuery(query);

    // When empty, show all cities
    if (query.trim().length === 0) {
      let allCities = await searchCities("");
      // Fallback: derive cities client-side if none returned
      if (!allCities || allCities.length === 0) {
        try {
          const allSchools = await SchoolService.getAllSchools();
          const cityToCount: Record<string, number> = {};
          allSchools.forEach((s) => {
            s.city.split(",").map((c) => c.trim()).forEach((c) => {
              if (!c) return;
              cityToCount[c] = (cityToCount[c] || 0) + 1;
            });
          });
          allCities = Object.entries(cityToCount)
            .map(([city, schoolCount]) => ({ city, schoolCount }))
            .sort((a, b) => a.city.localeCompare(b.city));
        } catch (err) {
          console.error('Fallback city derivation failed:', err);
        }
      }
      setSearchResults(allCities || []);
      setShowResults(true);
      return;
    }

    // Otherwise, filter by query
    const filtered = await searchCities(query);
    setSearchResults(filtered);
    setShowResults(true);
  };

  // Show all cities when input gains focus/clicked
  const handleSearchFocus = async () => {
    let allCities = await searchCities("");
    // Fallback: derive cities client-side if none returned
    if (!allCities || allCities.length === 0) {
      try {
        const allSchools = await SchoolService.getAllSchools();
        const cityToCount: Record<string, number> = {};
        allSchools.forEach((s) => {
          s.city.split(",").map((c) => c.trim()).forEach((c) => {
            if (!c) return;
            cityToCount[c] = (cityToCount[c] || 0) + 1;
          });
        });
        allCities = Object.entries(cityToCount)
          .map(([city, schoolCount]) => ({ city, schoolCount }))
          .sort((a, b) => a.city.localeCompare(b.city));
      } catch (err) {
        console.error('Fallback city derivation failed:', err);
      }
    }
    setSearchResults(allCities || []);
    setShowResults(true);
  };

  // Handle clicking on a city search result
  const handleCityClick = (city: string) => {
    window.location.href = `/directory?city=${encodeURIComponent(city)}`;
  };

  // Debug activeFilter changes
  useEffect(() => {
    console.log('activeFilter changed to:', activeFilter);
    console.log('Rendering mobile filters, activeFilter:', activeFilter, 'isMobile:', isMobile);
  }, [activeFilter, isMobile]);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile, activeFilter]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
      
      if (isMobile) {
        // On mobile, only close search results, never close filter panels
        console.log('Mobile detected - not closing filter panels');
        return;
      }
      
      // Desktop behavior - close filter dropdowns when clicking outside
      const target = event.target as Element;
      if (!target.closest(".filter-dropdown")) {
        console.log('Desktop - closing filter, activeFilter was:', activeFilter);
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
            const minPrice = parseFloat(school.min_tuition.replace(/[^\d.]/g, ""));
            const maxPrice = parseFloat(school.max_tuition.replace(/[^\d.]/g, ""));
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

      // Apply curriculum filter
      if (curriculumFilter) {
        filtered = filtered.filter((school) => {
          const curriculumTags = school.curriculum_tags.toLowerCase();
          return curriculumTags.includes(curriculumFilter.toLowerCase());
        });
      }

      return filtered;
    },
    [budgetFilter, cityFilter, curriculumFilter, isSchoolInCity],
  );

  // Filter schools based on search query and filters
  useEffect(() => {
    const loadFilteredSchools = async () => {
      try {
        let searchFiltered;
        if (searchQuery.trim().length > 0) {
          // If there's a search query, search for schools in that city
          searchFiltered = await SchoolService.getSchoolsByCity(searchQuery);
        } else {
          // Otherwise, get all schools
          searchFiltered = await SchoolService.getAllSchools();
        }
        const finalFiltered = applyFilters(searchFiltered);
        setFilteredSchools(finalFiltered);
      } catch (error) {
        console.error('Error loading filtered schools:', error);
        setFilteredSchools([]);
      } finally {
        setInitialLoading(false);
      }
    };

    loadFilteredSchools();
  }, [searchQuery, budgetFilter, cityFilter, curriculumFilter, applyFilters]);

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

  if (initialLoading) {
    return (
      <>
        <Navbar />
        <section className="w-full md:px-10 px-5 pt-25 bg-white">
          <h2 className="text-[#0E1C29] md:text-[56px] text-4xl font-normal text-center">
            Explore Preschools
          </h2>
          <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-5 mt-11">
            {Array.from({ length: 6 }).map((_, index) => (
              <SchoolCardSkeleton key={index} />
            ))}
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <section
        className="w-full h-fit bg-cover bg-center flex flex-col items-center pb-40 px-5 relative"
        style={{ backgroundImage: "url('/images/Hero.jpg')" }}
      >
        <div className="w-full h-full absolute top-0 left-0 bg-black/20 z-0"></div>
        <div className="w-full flex items-center justify-center md:px-10 pt-5 md:pt-0 relative z-[1000]">
          <Navbar />
        </div>
        <div className="pt-13 flex flex-col items-center md:w-[930px] w-full px-0 md:px-0 mt-20 relative z-0">
          <h1 className="md:text-[56px] text-[32px] font-regular text-white text-center leading-[120%]">
            Find Preschools
          </h1>
          <p className="text-gray-100 text-sm flex items-center gap-1"><span className="font-semibold">Now listing:</span> Taguig <i className="ri-checkbox-blank-circle-fill text-[6px] mt-1"></i> Makati <i className="ri-checkbox-blank-circle-fill text-[6px] mt-1"></i> Pasig <i className="ri-checkbox-blank-circle-fill text-[6px] mt-1"></i> Mandaluyong <i className="ri-checkbox-blank-circle-fill text-[6px] mt-1"></i> Quezon City <i className="ri-checkbox-blank-circle-fill text-[6px] mt-1"></i> Laguna</p>
          <p className="text-gray-100 text-sm font-normal mt-1">We&apos;re still adding more schools each week.</p>
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
                  onFocus={handleSearchFocus}
                  placeholder="Search schools around Metro Manila"
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
            {showResults && (
              <div className="absolute top-full left-5 right-5 mt-2 bg-white rounded-2xl border border-gray-200 z-10 max-h-80 overflow-auto">
                <div className="p-4">
                  <h5 className="text-sm font-semibold text-gray-600 mb-3">
                    Cities ({searchResults.length})
                  </h5>
                  {searchResults.length === 0 ? (
                    <div className="text-sm text-gray-500 p-2">No cities found</div>
                  ) : searchResults.map((cityData, index) => (
                    <div
                      key={`${cityData.city}-${index}`}
                      onClick={() => handleCityClick(cityData.city)}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="w-12 h-12 rounded-lg bg-[#774BE5]/10 flex items-center justify-center flex-shrink-0">
                        <i className="ri-map-pin-line text-[#774BE5] text-xl"></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h6 className="font-semibold text-[#0E1C29] text-sm truncate">
                          {cityData.city}
                        </h6>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {cityData.schoolCount} {cityData.schoolCount === 1 ? 'school' : 'schools'} available
                        </p>
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
        {(searchQuery || cityQuery) && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-[#0E1C29] mb-2">
              {cityQuery ? `Schools in ${cityQuery}` : `Search Results for "${searchQuery}"`}
            </h2>
            <p className="text-gray-600">
              Found {filteredSchools.length} school
              {filteredSchools.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        {/* Active Filter Chips */}
        {(budgetFilter || cityFilter || curriculumFilter) && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {budgetFilter && (
                <div className="flex items-center gap-2 bg-[#774BE5]/10 text-[#774BE5] px-3 py-2 rounded-full text-sm font-medium">
                  <i className="ri-money-dollar-circle-line"></i>
                  <span>
                    {[
                      { key: "under-100k", label: "Under ₱100k" },
                      { key: "100k-200k", label: "₱100k - ₱200k" },
                      { key: "200k-300k", label: "₱200k - ₱300k" },
                      { key: "300k-500k", label: "₱300k - ₱500k" },
                      { key: "over-500k", label: "Over ₱500k" },
                    ].find(opt => opt.key === budgetFilter)?.label}
                  </span>
                  <button
                    onClick={() => setBudgetFilter("")}
                    className="hover:bg-[#774BE5]/20 rounded-full p-1 transition-colors"
                  >
                    <i className="ri-close-line text-xs"></i>
                  </button>
                </div>
              )}
              {cityFilter && (
                <div className="flex items-center gap-2 bg-[#774BE5]/10 text-[#774BE5] px-3 py-2 rounded-full text-sm font-medium">
                  <i className="ri-map-pin-line"></i>
                  <span>{cityFilter}</span>
                  <button
                    onClick={() => setCityFilter("")}
                    className="hover:bg-[#774BE5]/20 rounded-full p-1 transition-colors"
                  >
                    <i className="ri-close-line text-xs"></i>
                  </button>
                </div>
              )}
              {curriculumFilter && (
                <div className="flex items-center gap-2 bg-[#774BE5]/10 text-[#774BE5] px-3 py-2 rounded-full text-sm font-medium">
                  <i className="ri-book-open-line"></i>
                  <span>{curriculumFilter}</span>
                  <button
                    onClick={() => setCurriculumFilter("")}
                    className="hover:bg-[#774BE5]/20 rounded-full p-1 transition-colors"
                  >
                    <i className="ri-close-line text-xs"></i>
                  </button>
                </div>
              )}
              <button
                onClick={() => {
                  setActiveFilter("all");
                  setBudgetFilter("");
                  setCityFilter("");
                  setCurriculumFilter("");
                  window.history.replaceState({}, '', '/directory');
                }}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium px-3 py-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                Clear all
              </button>
            </div>
          </div>
        )}

        {/* Desktop Filter Bar */}
        <div className="hidden md:flex items-center justify-between gap-2">
         <div className="hidden md:flex items-center gap-2">
         <button
            onClick={() => {
              setActiveFilter("all");
              setBudgetFilter("");
              setCityFilter("");
              setCurriculumFilter("");
              window.history.replaceState({}, '', '/directory');
            }}
            className={`min-w-20 p-4 rounded-[10px] text-sm font-semibold flex items-center justify-center gap-1 transition-all duration-200 ${
              activeFilter === "all"
                ? "bg-[#774BE5] text-white"
                : "bg-white text-black hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <i className="ri-grid-line"></i>
            All
          </button>

          <div className="relative filter-dropdown">
            <button
              onClick={() =>
                setActiveFilter(activeFilter === "budget" ? "all" : "budget")
              }
              className={`md:w-fit min-w-20 p-4 rounded-[10px] text-sm font-semibold flex items-center justify-center gap-1 transition-all duration-200 ${
                activeFilter === "budget"
                  ? "bg-[#774BE5] text-white"
                  : "bg-white text-black hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <i className="ri-money-dollar-circle-line"></i>
              Budget
              <i className="ri-arrow-down-s-line text-sm"></i>
            </button>

            {activeFilter === "budget" && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg border border-gray-200 min-w-48 animate-in slide-in-from-top-2 duration-200">
                <div className="p-2">
                  {[
                    { key: "under-100k", label: "Under ₱100k", icon: "ri-money-dollar-box-line" },
                    { key: "100k-200k", label: "₱100k - ₱200k", icon: "ri-money-dollar-box-line" },
                    { key: "200k-300k", label: "₱200k - ₱300k", icon: "ri-money-dollar-box-line" },
                    { key: "300k-500k", label: "₱300k - ₱500k", icon: "ri-money-dollar-box-line" },
                    { key: "over-500k", label: "Over ₱500k", icon: "ri-money-dollar-box-line" },
                  ].map((option) => (
                    <button
                      key={option.key}
                      onClick={() => {
                        setBudgetFilter(
                          budgetFilter === option.key ? "" : option.key,
                        );
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 flex items-center gap-2 transition-colors ${
                        budgetFilter === option.key
                          ? "bg-[#774BE5] hover:bg-[#774BE5]/80 text-white"
                          : "hover:text-[#774BE5] text-black"
                      }`}
                    >
                      <i className={option.icon}></i>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative filter-dropdown">
            <button
              onClick={() =>
                setActiveFilter(activeFilter === "city" ? "all" : "city")
              }
              className={`md:w-fit min-w-20 p-4 rounded-[10px] text-sm font-semibold flex items-center justify-center gap-1 transition-all duration-200 ${
                activeFilter === "city"
                  ? "bg-[#774BE5] text-white"
                  : "bg-white text-black hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <i className="ri-map-pin-line"></i>
              City
              <i className="ri-arrow-down-s-line text-sm"></i>
            </button>

            {activeFilter === "city" && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg border border-gray-200 min-w-48 animate-in slide-in-from-top-2 duration-200">
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
                      className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 flex items-center gap-2 transition-colors ${
                        cityFilter === city
                         ? "bg-[#774BE5] hover:bg-[#774BE5]/80 text-white"
                          : "hover:text-[#774BE5] text-black"
                      }`}
                    >
                      <i className="ri-map-pin-line"></i>
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative filter-dropdown z-[100]">
            <button
              onClick={() =>
                setActiveFilter(activeFilter === "curriculum" ? "all" : "curriculum")
              }
              className={`md:w-fit min-w-20 p-4 rounded-[10px] text-sm font-semibold flex items-center justify-center gap-1 transition-all duration-200 ${
                activeFilter === "curriculum"
                  ? "bg-[#774BE5] text-white"
                  : "bg-white text-black hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <i className="ri-book-open-line"></i>
              Curriculum
              <i className="ri-arrow-down-s-line text-sm"></i>
            </button>

            {activeFilter === "curriculum" && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg border border-gray-200 z-[9999] min-w-48 animate-in slide-in-from-top-2 duration-200">
                <div className="p-2">
                  {[
                    "DepEd",
                    "Montessori",
                    "Christian",
                    "Progressive",
                    "Waldorf",
                    "Reggio Emilia",
                    "IB",
                  ].map((curriculum) => (
                    <button
                      key={curriculum}
                      onClick={() => {
                        setCurriculumFilter(
                          curriculumFilter === curriculum ? "" : curriculum,
                        );
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 flex items-center gap-2 transition-colors ${
                        curriculumFilter === curriculum
                          ? "bg-[#774BE5] hover:bg-[#774BE5]/80 text-white"
                          : "hover:text-[#774BE5] text-black"
                      }`}
                    >
                      <i className="ri-book-open-line"></i>
                      {curriculum}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
         </div>

         <div>
           <h6 className="font-medium text-black text-sm">We&apos;re still adding more preschools across Metro Manila.</h6>
            <p className="text-black text-xs font-normal text-right">New Schools are added every week.</p>
         </div>
        </div>

        {/* Mobile Filter Section */}
        <div className="md:hidden mobile-filter-section">
          {/* Mobile Filter Header */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-[#0E1C29]">Filter Schools</h2>
              {[budgetFilter, cityFilter, curriculumFilter].filter(Boolean).length > 0 && (
                <button
                  onClick={() => {
                    setActiveFilter("all");
                    setBudgetFilter("");
                    setCityFilter("");
                    setCurriculumFilter("");
                    window.history.replaceState({}, '', '/directory');
                  }}
                  className="text-sm text-[#774BE5] font-medium hover:text-[#774BE5]/80 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
            
            {/* Quick Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Budget pill clicked, current activeFilter:', activeFilter);
                  const newFilter = activeFilter === "budget" ? "all" : "budget";
                  console.log('Setting activeFilter to:', newFilter);
                  setActiveFilter(newFilter);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
                  activeFilter === "budget" || budgetFilter
                    ? "bg-[#774BE5] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <i className="ri-money-dollar-circle-line"></i>
                Budget
                {budgetFilter && <span className="w-2 h-2 bg-white rounded-full"></span>}
              </button>
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('City pill clicked, current activeFilter:', activeFilter);
                  setActiveFilter(activeFilter === "city" ? "all" : "city");
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
                  activeFilter === "city" || cityFilter
                    ? "bg-[#774BE5] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <i className="ri-map-pin-line"></i>
                City
                {cityFilter && <span className="w-2 h-2 bg-white rounded-full"></span>}
              </button>
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Curriculum pill clicked, current activeFilter:', activeFilter);
                  setActiveFilter(activeFilter === "curriculum" ? "all" : "curriculum");
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
                  activeFilter === "curriculum" || curriculumFilter
                    ? "bg-[#774BE5] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <i className="ri-book-open-line"></i>
                Curriculum
                {curriculumFilter && <span className="w-2 h-2 bg-white rounded-full"></span>}
              </button>
            </div>
          </div>

          {/* Mobile Filter Panels */}
          {activeFilter === "budget" && (
            <div className="mb-6 bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-[#774BE5]/5 to-[#774BE5]/10 p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#0E1C29] flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#774BE5] rounded-lg flex items-center justify-center">
                      <i className="ri-money-dollar-circle-line text-white text-sm"></i>
                    </div>
                    Budget Range
                  </h3>
                  <button
                    onClick={() => setActiveFilter("all")}
                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <i className="ri-close-line text-gray-600 text-sm"></i>
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">Select your preferred tuition range</p>
              </div>
              <div className="p-4 space-y-2">
                {[
                  { key: "under-100k", label: "Under ₱100k"},
                  { key: "100k-200k", label: "₱100k - ₱200k"},
                  { key: "200k-300k", label: "₱200k - ₱300k"},
                  { key: "300k-500k", label: "₱300k - ₱500k" },
                  { key: "over-500k", label: "Over ₱500k"},
                ].map((option) => (
                    <button
                      key={option.key}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Budget filter clicked:', option.key);
                        setBudgetFilter(
                          budgetFilter === option.key ? "" : option.key,
                        );
                      }}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                        budgetFilter === option.key
                          ? "bg-[#774BE5] text-white transform scale-[1.02]"
                          : "bg-gray-50 hover:bg-gray-100 text-black border border-gray-200 hover:border-[#774BE5]/30"
                      }`}
                    >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{option.label}</div>
                      </div>
                      {budgetFilter === option.key && (
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                          <i className="ri-check-line text-white text-sm"></i>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeFilter === "city" && (
            <div className="mb-6 bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-[#774BE5]/5 to-[#774BE5]/10 p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#0E1C29] flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#774BE5] rounded-lg flex items-center justify-center">
                      <i className="ri-map-pin-line text-white text-sm"></i>
                    </div>
                    City Location
                  </h3>
                  <button
                    onClick={() => setActiveFilter("all")}
                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <i className="ri-close-line text-gray-600 text-sm"></i>
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">Choose your preferred city</p>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-2">
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
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('City filter clicked:', city);
                        setCityFilter(cityFilter === city ? "" : city);
                      }}
                      className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        cityFilter === city
                          ? "bg-[#774BE5] text-white transform scale-[1.02]"
                          : "bg-gray-50 hover:bg-gray-100 text-black border border-gray-200 hover:border-[#774BE5]/30"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <i className="ri-map-pin-line text-xs"></i>
                        <span className="truncate">{city}</span>
                        {cityFilter === city && (
                          <i className="ri-check-line ml-auto text-xs"></i>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeFilter === "curriculum" && (
            <div className="mb-6 bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-[#774BE5]/5 to-[#774BE5]/10 p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#0E1C29] flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#774BE5] rounded-lg flex items-center justify-center">
                      <i className="ri-book-open-line text-white text-sm"></i>
                    </div>
                    Curriculum Type
                  </h3>
                  <button
                    onClick={() => setActiveFilter("all")}
                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <i className="ri-close-line text-gray-600 text-sm"></i>
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">Select educational approach</p>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "DepEd",
                    "Montessori",
                    "Christian",
                    "Progressive",
                    "Waldorf",
                    "Reggio Emilia",
                    "IB",
                  ].map((curriculum) => (
                    <button
                      key={curriculum}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurriculumFilter(
                          curriculumFilter === curriculum ? "" : curriculum,
                        );
                      }}
                      className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        curriculumFilter === curriculum
                          ? "bg-[#774BE5] text-white transform scale-[1.02]"
                          : "bg-gray-50 hover:bg-gray-100 text-black border border-gray-200 hover:border-[#774BE5]/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">{curriculum}</span>
                        {curriculumFilter === curriculum && (
                          <i className="ri-check-line text-xs"></i>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Results Summary */}
        <div className="mt-8 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-[#0E1C29]">
                {filteredSchools.length} School{filteredSchools.length !== 1 ? 's' : ''} Found
              </h3>
              {(budgetFilter || cityFilter || curriculumFilter) && (
                <div className="w-2 h-2 bg-[#774BE5] rounded-full animate-pulse"></div>
              )}
            </div>
            <div className="text-sm text-gray-500">
              Showing {displayedSchools.length} of {filteredSchools.length}
            </div>
          </div>
        </div>

        {filteredSchools.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-[#774BE5]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-search-line text-[#774BE5] text-3xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-[#0E1C29] mb-2">No schools found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Try adjusting your filters or search criteria to find more schools.
            </p>
            <button
              onClick={() => {
                setActiveFilter("all");
                setBudgetFilter("");
                setCityFilter("");
                setCurriculumFilter("");
                setLocalSearchQuery("");
                window.history.replaceState({}, '', '/directory');
              }}
              className="bg-[#774BE5] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#774BE5]/90 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-5 z-0">
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
        )}

        {/* Loading indicator and intersection observer */}
        <div ref={observerRef}>
          {isLoading && (
            <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-5">
              {Array.from({ length: 3 }).map((_, index) => (
                <SchoolCardSkeleton key={index} />
              ))}
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
  <>
    <Navbar />
    <section className="w-full md:px-10 px-5 pt-25 bg-white">
      <h2 className="text-[#0E1C29] md:text-[56px] text-4xl font-normal text-center">
        Explore Preschools
      </h2>
      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-5 mt-11">
        {Array.from({ length: 6 }).map((_, index) => (
          <SchoolCardSkeleton key={index} />
        ))}
      </div>
    </section>
    <Footer />
  </>
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
