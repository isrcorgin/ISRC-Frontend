import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import VerifyForm from "@/components/Verify-form/verify-form";
import Footer from "@/components/Layouts/Footer";
import { Metadata } from "next";



export const metadata: Metadata = {
  title: 'Verify Certification - ISRC',
  description: 'Verify your certification issued by ISRC by entering the certificate code. Get instant access to your validated certificate.',
  openGraph: {
    images: [
      {
        url: 'https://raw.githubusercontent.com/Hanzala-Sarang/Test-project/main/poster.png',
        width: 1200,
        height: 630,
      },
    ],
    title: 'Verify Certification - ISRC',
    description: 'Enter your certificate code to verify your certification issued by ISRC and download your certificate.',
  },
  twitter: {
    images: [
      {
        url: 'https://raw.githubusercontent.com/Hanzala-Sarang/Test-project/main/poster.png',
        width: 1200,
        height: 630,
      },
    ],
    card: 'summary_large_image',
    title: 'Verify Certification - ISRC',
    description: 'Verify your ISRC-issued certificate by entering your certificate code and downloading your certificate instantly.',
  },
};



export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Verify Certificate"
        shortText=""
        homePageUrl="/"
        homePageText="Home"
        activePageText="Verify Certificate"
        bgImg="/images/main-bg2.webp"
      />

      <VerifyForm/>

      <Footer />
    </>
  );
}
