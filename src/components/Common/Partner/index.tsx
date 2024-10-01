"use client";

import React from "react"; 
import PlatinumSponsors from "./PlatinumSponsors";
const Partner: React.FC = () => {
  return (
    <>
      <div className="partner-area pb-5" id="partners">
        <div className="container">
          <div className="section-title">
            <span>Check Who Makes This Event Possible!</span>
            <h2>
              Our Event <b>Partner</b>
            </h2>

            <a href="https://wa.me/9594430295" className="btn btn-primary">
              Become a Partner
            </a>

            <div className="bar"></div>
          </div>

          <PlatinumSponsors />

        </div>
      </div>
    </>
  );
};

export default Partner;
