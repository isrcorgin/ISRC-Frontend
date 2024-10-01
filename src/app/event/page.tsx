import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import EventSchedulesThree from "@/components/Schedule/EventSchedulesThree";
import EventList from "@/components/Eventlist/eventlist"
import InnovationTopics from "@/components/Eventlist/innovation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Event - ISRC',
  description: 'Explore our upcoming events, schedules, and innovation topics at ISRC.',
  keywords: 'ISRC Events, Robotics Competitions, STEM Event Schedules, Innovation Topics in Robotics, Top Robotics Events, ISRC Schedule, Leading STEM Events, Robotics Championship Highlights',

  openGraph: {
    images: [
      {
        //images
        url: 'https://raw.githubusercontent.com/Hanzala-Sarang/Test-project/main/poster.png',
        width: 1200,
        height: 630,
      },
    ],
    title: 'Event - ISRC',
    description: 'Explore our upcoming events, schedules, and innovation topics at ISRC.',

  },
  twitter: {
    images: [
      {
        //images
        url: 'https://raw.githubusercontent.com/Hanzala-Sarang/Test-project/main/poster.png',
        width: 1200,
        height: 630,
      },
    ],
    card: 'summary_large_image',
    title: 'Event - ISRC',
    description: 'Explore our upcoming events, schedules, and innovation topics at ISRC.',
  },
  alternates: {
    canonical: 'https://www.isrc.org.in/event',
  },

};
export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="EVENT"
        shortText=""
        homePageUrl="/"
        homePageText="Home"
        activePageText="Event"
        bgImg="/images/main-bg1.webp"
      />

      <EventSchedulesThree />
      <EventList/>
      <InnovationTopics />
      <Footer />
    </>
  );
}
