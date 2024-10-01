import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import ContactForm from "@/components/ContactUs/ContactForm";
import Footer from "@/components/Layouts/Footer";
import About from "@/components/AboutUs/AboutUsContent"
import { Metadata } from "next";

// Metadata function with TypeScript type
export const metadata: Metadata = {
  title: "About Us | ISRC",
  description: "ISRC is, A prestigious International STEM & Robotics Championship (ISRC) event uniting over 4,000 teams from 15 countries in Mumbai this January 2025. ISRC 2025 is a global platform for students to showcase their skills in STEM and robotics through hands-on learning and practical education.",
  keywords: "ISRC, About Us, STEM, Robotics, International Competition, Global Event,STEM robotics championship,international Robotic competetion, Mumbai 2025, Hands-on Learning, Practical Education, Robotics Championship",
  
  icons: {
    icon: "/favicon.ico", // Set your favicon here
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://raw.githubusercontent.com/Hanzala-Sarang/Test-project/main/poster.png",
        width: 1200,
        height: 630,
        alt: "About Us Background Image",
      },
    ],
    url: "https://www.isrc.org.in/about-us",
    title: "About Us | ISRC",
    description: "A prestigious event uniting over 4,000 teams from 15 countries in Mumbai this January 2025. ISRC 2025 is a global platform for students to showcase their skills in STEM and robotics through hands-on learning and practical education.",

  },
  twitter: {
    card: "summary_large_image",
    site: "@isrc.org.in",
    title: "About Us | ISRC",
    description: "Learn more about our company, mission, and values.",

  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.isrc.org.in/about-us',
  },
};

export default function Page() {
  return (
    <>
      <Navbar />
      <PageBanner
        pageTitle="About Us"
        shortText=""
        homePageUrl="/"
        homePageText="Home"
        activePageText="About Us"
        bgImg="/images/main-bg4.webp"
        />
        <About/>

      <ContactForm />

      <Footer />
    </>
  );
}
