"use client";
import Navbar from "@/components/Layouts/Navbar";
import MainBanner from "@/components/HomeDefault/MainBanner";
import AboutUsContent from "@/components/HomeDefault/AboutUsContent";
import Speakers from "@/components/HomeThree/Speakers";
import HomeInternationalSpeakers from "@/components/HomeThree/HomeInternationalSpeaker";
import Partner from "@/components/Common/Partner";
import BuyTicket from "@/components/Common/BuyTicket";
import Subscribe from "@/components/Common/Subscribe";
import Footer from "@/components/Layouts/Footer";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if there's a reload flag in local storage
    const shouldReload = localStorage.getItem('reload');
    if (shouldReload === 'true') {
      // Clear the reload flag
      localStorage.removeItem('reload');
      // Reload the page
      window.location.reload();
    }
  }, []);

  return (
    <>
      <Navbar />
      <MainBanner />
      <AboutUsContent />
      <Speakers />
      <HomeInternationalSpeakers />
      <Partner />
      <BuyTicket />
      <Subscribe />
      <Footer />
    </>
  );
}
