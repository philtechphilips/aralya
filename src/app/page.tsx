import Navbar from "@/components/Navbar";
import SchoolCard from "@/components/SchoolCard";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import { schoolsData } from "@/utils/data";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home() {
  // Get the first 3 schools for the homepage
  const featuredSchools = schoolsData.slice(0, 3);
  
  // Helper function to create URL-friendly slugs
  const createSlug = (schoolName: string) => {
    return schoolName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  };

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
          <div className="bg-white w-full p-5 rounded-3xl mt-6">
            <h4 className="text-[#0F0F0F] md:text-2xl text-base font-medium">
              Serach schools around Philipines
            </h4>
            <div className="flex flex-col md:flex-row md:mt-6 mt-3 gap-2.5 rounded-2xl">
              <div className="bg-[#f5f5f5] w-full md:w-[710px] cursor-pointer p-4 md:rounded-[10px] rounded-full overflow-hidden flex items-center gap-5">
                <i className="ri-search-line text-[#0E1C29]/40 text-2xl"></i>
                <p className="text-[#999999] text-sm md:text-base">
                  Search by school name, loc...
                </p>
              </div>
              <Link
                href="/"
                className="bg-[#774BE5] md:w-fit w-full text-white p-4 rounded-[10px] text-sm font-semibold flex items-center justify-center gap-1"
              >
                View all schools
                <i className="ri-arrow-right-fill text-white text-lg mt-0.5"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full h-full absolute bg-black/20 z-0"></div>
      </section>

      <section className="w-full md:px-10 px-5 py-25 bg-white">
        <h2 className="text-[#0E1C29] md:text-[56px] text-4xl font-normal text-center">
          Explore Preschools
        </h2>
        <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-5 mt-11">
          {featuredSchools.map((school, index) => (
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

      <Footer />
    </>
  );
}

