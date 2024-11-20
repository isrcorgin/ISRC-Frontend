"use client"
import Form from "@/components/Awards/Form";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import Navbar from "@/components/Layouts/Navbar";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <PageBanner
        pageTitle="Awards"
        shortText=""
        homePageUrl="/"
        homePageText="Home"
        activePageText="Awards"
        bgImg="/images/main-bg4.webp"
      />
        <Form/>
     <Footer/>
    </>
  );
};

export default page;
