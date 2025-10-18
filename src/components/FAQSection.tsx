"use client";
import { useState, useEffect, useRef } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  description: string;
  faqs: FAQItem[];
}

const FAQSection = ({ title, description, faqs }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full md:px-10 px-5 py-25 bg-white">
      <h2
        className={`text-[#0E1C29] md:text-[56px] text-4xl font-normal text-center transition-all duration-400 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-4 text-[#0E1C29] text-base text-center font-semibold transition-all duration-400 ease-out delay-150 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {description}
      </p>
      <div className="w-full grid grid-cols-1 gap-5 mt-11">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`w-full rounded-[10px] py-3 px-4 cursor-pointer ${
                isOpen ? "bg-[#0F0F0F]" : "bg-[#F0EFEF]"
              } ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{
                transitionDelay: `${300 + index * 80}ms`,
                transitionDuration: "700ms",
                transitionTimingFunction:
                  "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
              onClick={() => toggleFAQ(index)}
            >
              <div className="mb-2 w-full flex items-center justify-between">
                <p
                  className={`text-base font-semibold ${
                    isOpen ? "text-white" : "text-[#0E1C29]"
                  }`}
                >
                  {faq.question}
                </p>
                <i
                  className={`text-xl mt-0.25 transition-all duration-200 ease-in-out ${
                    isOpen ? "text-white rotate-180" : "text-[#0E1C29] rotate-0"
                  } ri-arrow-down-s-line`}
                ></i>
              </div>
              <div
                className={`overflow-hidden  ${
                  isOpen ? "max-h-96 mt-2" : "max-h-0 mt-0"
                }`}
              >
                <p className="text-sm font-normal text-white">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
