import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Register from "@/components/Registration/registration";
import Footer from "@/components/Layouts/Footer";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner 
        pageTitle="Register Your Team"
        shortText=""
        homePageUrl="/"
        homePageText="Home"
        activePageText="Register your Team"
        bgImg="/images/main-bg4.webp"
      />
      <Register />
      <Footer />
    </>
  );
}
