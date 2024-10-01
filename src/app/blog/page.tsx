import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import WithRightSidebar from "@/components/Blog/WithLeftSidebar";
import Footer from "@/components/Layouts/Footer";
import { Metadata } from "next";

// Define metadata using the Metadata API
export const metadata: Metadata = {
  title: "ISRC Blog | Insights & Updates on STEM & Robotics",
  description: "Explore the latest insights, articles, and updates from the International STEM & Robotics Championship (ISRC). Stay informed about STEM innovations, robotics news, and event highlights through our blog.",
  keywords: "ISRC Blog, STEM Insights, Robotics News, ISRC Updates, Robotics Articles, STEM Innovations, Latest STEM News, ISRC Event Highlights, Robotics Community Updates",
  openGraph: {
    images: [
      {
        url: "https://raw.githubusercontent.com/Hanzala-Sarang/Test-project/main/poster.png",
        alt: "ISRC Blog",
        width: 1200,
        height: 630,
      },
    ],
    title: "ISRC Blog | Insights & Updates on STEM & Robotics",
    description: "Stay up-to-date with the latest insights and news from ISRC. Discover articles on STEM innovations, robotics developments, and event updates.",
    url: "https://www.isrc.org.in/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ISRC Blog | Insights & Updates on STEM & Robotics",
    description: "Get the latest insights, articles, and updates from ISRC. Explore STEM innovations, robotics news, and event highlights on our blog.",
    images: [
      {
        url: "https://raw.githubusercontent.com/Hanzala-Sarang/Test-project/main/poster.png",
        alt: "ISRC Blog",
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://www.isrc.org.in/blog',
  },
};

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="ISRC Blog"
        shortText=""
        homePageUrl="/"
        homePageText="Home"
        activePageText="ISRC Blog"
        bgImg="/images/main-bg2.webp"
      />

      <WithRightSidebar />

      <Footer />
    </>
  );
}
