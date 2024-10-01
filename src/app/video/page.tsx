import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import YtVideo from "@/components/Ytvideo";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="ISRC Video"
        shortText=""
        homePageUrl="/"
        homePageText="Home"
        activePageText="ISRC Video"
        bgImg="/images/main-bg2.webp"
      />

      <YtVideo/>

      <Footer />
    </>
  );
}
