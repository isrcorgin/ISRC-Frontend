import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import FaqContent from "@/components/Faq/FaqContent";
import Footer from "@/components/Layouts/Footer";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Faq"
        shortText="Frequently Asked Question"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Faq"
        bgImg="/images/main-bg2.webp"
      />

      <FaqContent />

      <Footer />
    </>
  );
}
