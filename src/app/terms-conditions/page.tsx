import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import { Metadata } from "next";

// Define metadata using the Metadata API
export const metadata: Metadata = {
  title: "Terms & Conditions | ISRC",
  description: "Review the terms and conditions for participating in the International STEM & Robotics Championship (ISRC). Ensure compliance with our guidelines for a smooth experience.",
  keywords: "Terms & Conditions, ISRC, Participation, Guidelines, Eligibility, Registration, Code of Conduct",
  openGraph: {
    title: "Terms & Conditions | ISRC",
    description: "Review the terms and conditions for participating in the International STEM & Robotics Championship (ISRC). Ensure compliance with our guidelines for a smooth experience.",
    url: "https://www.isrc.org.in/terms-conditions",
    images: [
      {
        url: 'https://raw.githubusercontent.com/Hanzala-Sarang/Test-project/main/poster.png',
        alt: "ISRC Terms & Conditions",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
    siteName: "ISRC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | ISRC",
    description: "Review the terms and conditions for participating in the International STEM & Robotics Championship (ISRC). Ensure compliance with our guidelines for a smooth experience.",
    images: [
      {
        url: 'https://raw.githubusercontent.com/Hanzala-Sarang/Test-project/main/poster.png',
        alt: "ISRC Terms & Conditions",
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: 'https://www.isrc.org.in/terms-conditions',
  },
};

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Terms & Conditions"
        shortText="Please review our terms and conditions for participation in ISRC."
        homePageUrl="/"
        homePageText="Home"
        activePageText="Terms & Conditions"
        bgImg="/images/main-bg2.webp"
      />

      <div className="ptb-120">
        <div className="container">
          <div className="main-textarea">
            

            <h5>1. Acceptance of Terms</h5>
            <p>By participating in the International STEM & Robotic Championship (ISRC), you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you should not participate in the ISRC.</p>

            <h5>2. Eligibility</h5>
            <p>Participation in the ISRC is open to students, teams, and individuals who meet the eligibility criteria outlined on our website. We reserve the right to disqualify any participant who does not meet these criteria.</p>

            <h5>3. Registration</h5>
            <p>Participants must complete the registration process as described on our website. All information provided must be accurate and complete. The ISRC reserves the right to reject any registration that is incomplete or incorrect.</p>

            <h5>4. Code of Conduct</h5>
            <p>Participants are expected to conduct themselves in a professional and respectful manner. Any behavior that disrupts the event, violates the rules, or is deemed inappropriate by the ISRC will result in disqualification.</p>

            <h5>5. Intellectual Property</h5>
            <p>All materials, including but not limited to content, logos, and images provided by ISRC, are the property of ISRC or its licensors. Participants may not use these materials without prior written consent.</p>

            <h5>6. Use of Data</h5>
            <p>By participating in the ISRC, you consent to the collection and use of your data for purposes related to the event, including but not limited to marketing, promotional activities, and administrative purposes.</p>

            <h5>7. Prizes and Awards</h5>
            <p>Details of prizes and awards will be provided as part of the competition rules. The ISRC reserves the right to modify or cancel prizes if necessary.</p>

            <h5>8. Liability</h5>
            <p>ISRC is not liable for any damages or losses incurred by participants as a result of their participation in the event. Participants agree to indemnify and hold ISRC harmless from any claims arising from their participation.</p>

            <h5>9. Changes to Terms</h5>
            <p>ISRC reserves the right to modify these Terms and Conditions at any time. Participants will be notified of any changes through our website or other communication channels.</p>

            <h5>10. Governing Law</h5>
            <p>These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in India.</p>

            <h5>11. Contact Information</h5>
            <p>For any questions or concerns regarding these Terms and Conditions, please contact us at:</p>
            <p>
              International STEM & Robotic Championship<br />
              Email: director@isrc.org.in<br />
              Phone: +91 95944 02916
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
