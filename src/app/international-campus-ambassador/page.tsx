"use client";

import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import InternationalSpeakers from "@/components/HomeThree/InternationalSpeakers";
import { useSpeakers } from "@/context/CampusAmbassadorContext";

// Define the Speaker type
interface Speaker {
  id: string;
  imageUrl: string;
  linkedInLink: string;
  name: string;
  place: string;
}

export default function Page() {
  const { internationalSpeakersMembers } = useSpeakers();

  // Transform the SpeakersMember data to match the Speaker type
  const transformedSpeakersMembers: Speaker[] = internationalSpeakersMembers.map((member, index) => ({
    id: index.toString(), // You can assign a unique ID here, or if you have one, use that.
    imageUrl: member.image,
    linkedInLink: member.socialLinks.find(link => link.iconName === "icofont-linkedin")?.url || "",
    name: member.name,
    place: member.designation,
  }));

  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="International Campus Ambassador"
        shortText=""
        homePageUrl="/"
        homePageText="Home"
        activePageText="International Campus Ambassador"
        bgImg="/images/main-bg3.webp"
      />

      <InternationalSpeakers speakersMembers={transformedSpeakersMembers} />

      <Footer />
    </>
  );
}
