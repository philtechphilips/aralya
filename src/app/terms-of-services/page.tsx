import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React from "react";

const TermsOfServices = () => {
  return (
    <>
      <section className="w-full bg-cover bg-center min-h-screen flex flex-col items-center pb-40 px-5 bg-[#F9FAFB]">
        <div className="w-full flex items-center justify-center md:px-10 pt-5 md:pt-0">
          <Navbar textColor="black" />
        </div>

        <div className="pt-13 flex flex-col md:w-[930px]  w-full px-0 md:px-0 mt-20">
          <h3 className="text-4xl text-[#0E1C29]">Terms Of Services</h3>
          <p className="text-lg text-[#0E1C29] font-medium mt-4">
            Last updated on 23 Jan 2025
          </p>

          <div className="w-full h-0.25 bg-[#d3d3d3] mt-4 mb-4"></div>

          <p className="text-[#0E1C29] font-semibold">
          Welcome to Alter ("we" or "us"). This Terms Of Services is designed to help you understand how we collect, use, disclose, and safeguard your personal information when you use our website and related services.
          </p>

          <ul className="list-decimal list-inside mt-4 flex flex-col gap-6">
            <li className="text-[#0E1C29] font-semibold">
              Information We Collect
            </li>
            <li className="text-[#0E1C29] font-semibold">
              How We Use Your Information
            </li>
            <li className="text-[#0E1C29] font-semibold">
              Sharing Your Information
            </li>
            <li className="text-[#0E1C29] font-semibold">
              Cookies and Similar Technologies
            </li>
            <li className="text-[#0E1C29] font-semibold">Your Choices</li>
            <li className="text-[#0E1C29] font-semibold">Security</li>
            <li className="text-[#0E1C29] font-semibold">Children's Privacy</li>
            <li className="text-[#0E1C29] font-semibold">
              Changes to This Privacy Policy
            </li>
            <li className="text-[#0E1C29] font-semibold">Contact Us</li>
          </ul>

          <div className="w-full h-0.25 bg-[#d3d3d3] my-6"></div>

          <p className="text-[#0E1C29] font-semibold mb-6">
            1. Information We Collect
          </p>
          <ul className="list-disc list-inside mt-4 flex flex-col gap-6 text-[#0E1C29] font-semibold">
            <li>
              1.1 Personal Information
              <p className="mt-6">
                We may collect personal information, such as your name, email
                address, and other contact details when you voluntarily provide
                it to us, such as when you register for an account, subscribe to
                newsletters, or contact us through the website.
              </p>
            </li>

            <li>
              1.2 Usage Information
              <p className="mt-6">
                We may collect information about your use of the website,
                including your IP address, browser type, device information, and
                pages visited. This information helps us analyze trends,
                administer the site, and improve user experience.
              </p>
            </li>
          </ul>

          <div className="w-full h-0.25 bg-[#d3d3d3] mt-4 mb-4"></div>

          <p className="text-[#0E1C29] font-semibold mb-6">
            2. How We Use Your Information
          </p>

          <p className="text-[#0E1C29] font-semibold mb-6">
            We use the collected information for various purposes, including:
          </p>

          <ul className="list-disc list-inside mt-4 flex flex-col gap-6 text-[#0E1C29] font-semibold">
            <li>Providing and maintaining the website</li>

            <li>Communicating with you about your account and our services</li>

            <li>
              Sending newsletters, promotional materials, and other information
              you request
            </li>

            <li>Analyzing website usage and improving our services</li>
          </ul>

          <div className="w-full h-0.25 bg-[#d3d3d3] mt-4 mb-4"></div>

          <p className="text-[#0E1C29] font-semibold mb-6">
            3. Sharing Your Information
          </p>

          <p className="text-[#0E1C29] font-semibold mb-6">
            We do not sell, trade, or otherwise transfer your personal
            information to third parties without your consent, except as
            described in this Privacy Policy. We may share information with
            trusted third-party service providers who assist us in operating our
            website or conducting our business.
          </p>

          <div className="w-full h-0.25 bg-[#d3d3d3] mt-4 mb-4"></div>

          <p className="text-[#0E1C29] font-semibold mb-6">
            4. Cookies and Similar Technologies
          </p>

          <p className="text-[#0E1C29] font-semibold mb-6">
            We use cookies and similar technologies to enhance your experience
            on our website. You can control cookies through your browser
            settings, but disabling them may affect your ability to use certain
            features of the site.
          </p>

          <div className="w-full h-0.25 bg-[#d3d3d3] mt-4 mb-4"></div>

          <p className="text-[#0E1C29] font-semibold mb-6">5. Your Choices</p>

          <p className="text-[#0E1C29] font-semibold mb-6">
            You can manage your communication preferences by unsubscribing from
            newsletters or adjusting your account settings. You may also contact
            us to update or delete your personal information.
          </p>

          <div className="w-full h-0.25 bg-[#d3d3d3] mt-4 mb-4"></div>

          <p className="text-[#0E1C29] font-semibold mb-6">6. Security</p>

          <p className="text-[#0E1C29] font-semibold mb-6">
            We take reasonable measures to protect the security of your personal
            information. However, no method of transmission over the internet or
            electronic storage is completely secure. Therefore, we cannot
            guarantee absolute security.
          </p>

          <div className="w-full h-0.25 bg-[#d3d3d3] mt-4 mb-4"></div>

          <p className="text-[#0E1C29] font-semibold mb-6">
            7. Children's Privacy
          </p>

          <p className="text-[#0E1C29] font-semibold mb-6">
            Our website is not directed to individuals under the age of 18. If
            you become aware that a child has provided us with personal
            information, please contact us, and we will take steps to remove
            such information.
          </p>

          <div className="w-full h-0.25 bg-[#d3d3d3] mt-4 mb-4"></div>

          <p className="text-[#0E1C29] font-semibold mb-6">
            8. Changes to This Privacy Policy
          </p>

          <p className="text-[#0E1C29] font-semibold mb-6">
            We may update this Privacy Policy periodically. We will notify you
            of any changes by posting the new Privacy Policy on this page. Your
            continued use of the website after such modifications will
            constitute your acknowledgment of the modified Privacy Policy.
          </p>

          <div className="w-full h-0.25 bg-[#d3d3d3] mt-4 mb-4"></div>

          <p className="text-[#0E1C29] font-semibold mb-6">9. Contact Us</p>

          <p className="text-[#0E1C29] font-semibold mb-6">
            If you have any questions about this Privacy Policy, please contact
            us at alter@support.com
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TermsOfServices;

