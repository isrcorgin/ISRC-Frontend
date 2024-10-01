import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import Navbar from "@/components/Layouts/Navbar";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stem Ambassador | Under Construction",
  description: "The STEM Ambassador page is under construction. Stay tuned for updates and get ready for exciting STEM content and resources!",
  keywords: "STEM Ambassador, STEM Education, ISRC, Upcoming STEM Resources, STEM Updates, Page Under Construction, STEM News, ISRC Updates, STEM Innovation",
  openGraph: {
    title: "Stem Ambassador | Under Construction",
    description: "The STEM Ambassador page is under construction. Stay tuned for updates and get ready for exciting STEM content and resources!",
    url: "https://www.isrc.org.in/stem-ambassador",
    images: [
      {
        url: 'https://raw.githubusercontent.com/Hanzala-Sarang/Test-project/main/poster.png',
        alt: "STEM Ambassador Page Under Construction",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
    siteName: "ISRC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stem Ambassador | Under Construction",
    description: "The STEM Ambassador page is under construction. Stay tuned for updates and get ready for exciting STEM content and resources!",
    images: [
      {
        url: 'https://raw.githubusercontent.com/Hanzala-Sarang/Test-project/main/poster.png',
        alt: "STEM Ambassador Page Under Construction",
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: 'https://www.isrc.org.in/stem-ambassador',
  },
};

export default function UnderConstruction() {
  return (
    <>
    <Navbar />

    <PageBanner
      pageTitle="Stem Ambassador"
      shortText=""
      homePageUrl="/"
      homePageText="Home"
      activePageText="Stem Ambassador"
      bgImg="/images/main-bg3.webp"
    />

    <div className="error-area">
        <div className="d-table">
          <div className="d-table-cell">
            <h1>
              <span>🚧</span>
            </h1>
            <h3>Oops! This Page is Under Construction</h3>
            <p>The STEM Ambassador page is not ready yet. We're working hard to get it up and running.</p>
            <Link href="/" className="btn btn-primary">
              Return to Home Page
            </Link>
          </div>
        </div>
      </div>

    <Footer />
  </>
  );
}
