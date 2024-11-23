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
        pageTitle="Global STEM & Robotics Laureate Awards"
        shortText=""
        homePageUrl="/"
        homePageText="Home"
        activePageText="Awards"
        bgImg="/images/bannerawards.jpg"
      />
        <Form/>
     <Footer/>
    </>
  );
};

export default page;
