import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import { Metadata } from "next";


// Updated metadata with canonical URL and keywords directly added
export const metadata: Metadata = {
  title: 'Privacy Policy - ISRC',
  description: 'Read the privacy policy of ISRC, covering data collection, usage, cookies, and data security measures.',
  keywords: 'ISRC Privacy Policy, ISRC data security, cookies policy, data collection, ISRC data usage',
  openGraph: {
    images: [
      {
        url: 'https://raw.githubusercontent.com/Hanzala-Sarang/Test-project/main/poster.png',
        width: 1200,
        height: 630,
      },
    ],
    title: 'Privacy Policy - ISRC',
    description: 'Read the privacy policy of ISRC, covering data collection, usage, cookies, and data security measures.',
    url: 'https://www.isrc.org.in/privacy-policy', // Canonical URL added here for Open Graph
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
    title: 'Privacy Policy - ISRC',
    description: 'Read the privacy policy of ISRC, covering data collection, usage, cookies, and data security measures.',
  },
  // Adding the canonical URL directly in the metadata object
  alternates: {
    canonical: 'https://www.isrc.org.in/privacy-policy',
  },
};


export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Privacy Policy"
        shortText=""
        homePageUrl="/"
        homePageText="Home"
        activePageText="Privacy Policy"
        bgImg="/images/main-bg2.webp"
      />

      <div className="ptb-120">
        <div className="container">
          <div className="main-textarea">
            <h4>Privacy Policy for ISRC</h4>
            <p>
              At ISRC, we prioritize the privacy of our stakeholders and the safeguarding of personal information. Our commitment to this is reflected in our concise privacy policy, governing the collection, utilization, and dissemination of personal data through our official website.
            </p>

            <p>
              This policy is exclusive to ISRC domain and doesn&apos;t extend to external websites linked from our pages. Given the dynamic nature of internet technology, we may periodically update this policy, with changes promptly reflected on the privacy policy page.
            </p>

            <p>
              Transparency is key in privacy matters. We urge you to review this document to understand the terms for providing personal information on our website. By continuing to use the ISRC website, you signify your acceptance of these terms.
            </p>

            <p>
              Our policy is crafted to ensure a secure online experience, fostering a trusted environment for STEM and robotics exploration. Your confidence is paramount. Updates to this privacy policy are made with your best interests in mind, maintaining the highest standards of privacy and data security.
            </p>

            <p>
              Thank you for entrusting us with your participation in the International STEM and Robotics Championship. We anticipate a shared journey of innovation, learning, and a steadfast commitment to privacy.
            </p>

            <h4>Information Collection and Use</h4>
            <p>
              While some sections of our website can be accessed without personal information, specific areas may require registration with particular details. Information collected by International STEM and Robotics Championship (ISRC) is strictly used for specified purposes outlined at collection and will not be sold, traded, rented, or shared with third parties, including commercial entities.
            </p>

            <p>
              ISRC may disclose collected information to its employees, agents, consultants, and others deemed necessary for proper information handling. In certain circumstances, disclosure to third parties, such as law enforcement officials and courts, may occur at the institute&apos;s discretion.
            </p>

            <p>
              At ISRC, we are unwavering in our commitment to maintaining the confidentiality and security of your data. Any disclosure is made with due consideration and adherence to applicable laws. We prioritize responsible information handling to ensure your privacy is upheld throughout your interaction with our platform.
            </p>

            <p>
              Thank you for entrusting ISRC with your participation. We anticipate your involvement in an environment that values innovation and diligently protects your personal information.
            </p>

            <h4>Cookies</h4>
            <p>
              At International STEM and Robotics Championship (ISRC), our website utilizes &quot;cookies&quot; to track usage and enhance services. These small data bits, transferred to users&apos; hard drives during logins or specific site access, serve purposes like authentication. Adjusting browser settings can block cookies, though this may limit access to certain site sections. Users retain control and can remove cookies through browser options.
            </p>

            <p>
              Crucially, data collected through cookies is anonymous, devoid of personally identifiable information like names or addresses. Our commitment to transparency and user control ensures an optimal online experience.
            </p>

            <p>
              Thank you for your trust in ISRC. Your participation in our environment, balancing technological innovation and user privacy, is sincerely appreciated.
            </p>

            <h4>Data Security</h4>
            <p>
              At International STEM and Robotics Championship (ISRC), we prioritize the utmost precautions to secure your data. While stringent measures enhance security, it&apos;s important to note our limited control over the internet&apos;s digital transmission medium. Therefore, any information transferred to us is at your own risk.
            </p>

            <p>
              Upon receiving your data, we are committed to its security, employing cutting-edge technology, regularly upgrading our digital infrastructure, and implementing restricted access protocols. All information is stored on ISRC secured servers.
            </p>

            <p>
              Despite our efforts, unforeseen circumstances may impact data security. While we can&apos;t provide absolute guarantees, rest assured we are dedicated to ongoing efforts and adapting to the latest advancements in digital security.
            </p>

            <p>
              Thank you for entrusting ISRC with your data. Your understanding of the technology-security balance is appreciated.
            </p>

            <h4>Online Forums and Information Use</h4>
            <p>
              The ISRC website features online forums where providing personal information is necessary for services like registrations, payments, and surveys. By submitting the form, you consent to ISRC storing and using the information for specified purposes.
            </p>

            <p>
              Your participation not only enriches engagement but also signifies agreement to responsible information use. We value your trust and are committed to handling your data with the utmost care and in line with our privacy policies.
            </p>

            <p>
              Thank you for your involvement in the International STEM and Robotics Championship. We appreciate your understanding and cooperation in maintaining a secure and seamless experience for all participants.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
