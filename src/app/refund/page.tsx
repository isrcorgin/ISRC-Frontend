import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";

export default function RefundPolicy() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Refund Policy"
        shortText="Learn about our refund policy for ISRC events and activities."
        homePageUrl="/"
        homePageText="Home"
        activePageText="Refund Policy"
        bgImg="/images/main-bg2.webp"
      />

      <div className="ptb-120">
        <div className="container">
          <div className="main-textarea">
            <h4>Refund Policy</h4>
            <p>At ISRC, we maintain a strict no-refund policy once the registration is completed. This policy applies to all our events and activities. We believe in providing clear and comprehensive information about our offerings so that participants can make informed decisions before committing to registration.</p>
            <p>If you encounter any issues or have a pending payment, please do not hesitate to contact us at <a href="mailto:director@isrc.org.in">director@isrc.org.in</a>. Our team is here to assist you with any payment-related concerns and ensure a smooth experience.</p>
            <p>Thank you for your understanding and support. We appreciate your participation in the International STEM and Robotics Championship and look forward to a rewarding and enriching event for all involved.</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
