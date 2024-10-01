import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Speakers from "@/components/HomeThree/Speakersall";
import Footer from "@/components/Layouts/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'ISRC Campus Ambassador Program | Join Our Community',
  description: 'Become a Campus Ambassador with ISRC and contribute to our global community. Engage with STEM enthusiasts, promote robotics, and gain exclusive opportunities for professional development.',
  keywords: 'ISRC Campus Ambassador, Campus Ambassador Program, STEM Ambassadors, Robotics Community Leaders, ISRC Community Engagement, STEM Outreach, Robotics Promotion, Campus Leadership Opportunities',
  openGraph: {
    title: 'ISRC Campus Ambassador Program | Join Our Community',
    description: 'Join the ISRC Campus Ambassador Program to engage with a global STEM community. Promote robotics, participate in exclusive events, and enhance your leadership skills.',
    url: 'https://www.isrc.org.in/campus-ambassador',
    images: [
      {
        url: 'https://raw.githubusercontent.com/Hanzala-Sarang/Test-project/main/poster.png',
        width: 1200,
        height: 630,
        alt: 'Campus Ambassador Program',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ISRC Campus Ambassador Program | Join Our Community',
    description: 'Become a Campus Ambassador with ISRC. Engage with the STEM community, promote robotics, and gain professional development opportunities.',
    images: [
      {
        url: 'https://raw.githubusercontent.com/Hanzala-Sarang/Test-project/main/poster.png',
        alt: 'Campus Ambassador Program',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://www.isrc.org.in/campus-ambassador',
  },
};

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Campus Ambassador"
        shortText=""
        homePageUrl="/"
        homePageText="Home"
        activePageText="Campus Ambassador"
        bgImg="/images/main-bg3.webp"
      />

      <Speakers />

      <Footer />
    </>
  );
}
