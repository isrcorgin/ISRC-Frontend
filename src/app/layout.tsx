import "../../styles/bootstrap.min.css";
import "../../styles/icofont.min.css";
import "../../styles/animate.min.css";
import 'react-accessible-accordion/dist/fancy-example.css';
import 'react-tabs/style/react-tabs.css';
import "swiper/css";
import "swiper/css/bundle";
import 'react-toastify/dist/ReactToastify.css';

// Global Styles
import "../../styles/style.css";
import "../../styles/responsive.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import GoTop from "@/components/Layouts/GoTop";
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from "@/context/AuthContext"; // Import the AuthProvider
import { SpeakersProvider } from "@/context/CampusAmbassadorContext";
import Script from "next/script";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

// Define metadata using the Metadata API
export const metadata: Metadata = {
  title: "ISRC - International STEM & Robotics Championship",
  description: "ISRC: Join ISRC the global stage at the International STEM & Robotics Championship (ISRC). Over 4,000 teams from 15 countries compete in top Innovation and Robotics categories. Experience STEM excellence, connect with a global community, and explore premier professional development opportunities.",
  keywords: "International STEM & Robotics Championship,STEM & Robotics Championship, ISRC Robotics Competition, top 10 robotics companies in the world by revenue ,Global Robotics Events,global robotics competition,global robotics competition 2024	,global robotics competition, Leading STEM Competitions, STEM Innovation Showcase, first robotics excellence in engineering award	,center of robotics excellence core	,STEM Education Opportunities, Robotics Championship 2024, Top Robotics Events, Global STEM Community",
  openGraph: {
    title: "International STEM & Robotics Championship (ISRC)",
    description: "Join the premier global stage at ISRC, where top innovation and robotics meet. Compete, connect, and excel in the most significant STEM event of the year.",
    url: "https://www.isrc.org.in/",
    images: [
      {
        url: 'https://raw.githubusercontent.com/Hanzala-Sarang/Test-project/main/poster.png',
        width: 1200,
        height: 630,
      },
    ],
    siteName: "ISRC",
  },
  twitter: {
    card: "summary_large_image",
    title: "International STEM & Robotics Championship (ISRC)",
    description: "Join the leading global stage at ISRC, where over 4,000 teams from 15 countries compete in the most prestigious STEM and robotics categories.",
    images: [
      {
        url: 'https://raw.githubusercontent.com/Hanzala-Sarang/Test-project/main/poster.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: 'https://www.isrc.org.in/',
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-Q2ZJNQJ1MP"></Script>

              <Script id = "google-analytics">

                {
                  `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-Q2ZJNQJ1MP');

                  `
                }

              </Script>
    </head>
      <body className={poppins.className}>
        <AuthProvider> {/* Wrap your application with AuthProvider */}
          <SpeakersProvider>
          {children}
          </SpeakersProvider>
        </AuthProvider>
        <GoTop />
        <ToastContainer /> {/* Add toast notifications */}
      </body>
    </html>
  );
}
