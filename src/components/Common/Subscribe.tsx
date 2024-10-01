"use client";

import React from "react"; 

const Subscribe: React.FC = () => {
  const handleSupportClick = () => {
    window.open("https://wa.me/919594402916", "_blank");
  };

  return (
    <>
      <div className="subscribe-area">
        <div className="container">
          <div className="subscribe-inner">
            <h2>Need Support?</h2>
            <p>If you have any questions or need assistance, please contact us via WhatsApp.</p>

            <div className="support-area">
              <button
                className="btn btn-primary" /* Using Bootstrap primary button class */
                onClick={handleSupportClick}
              >
                Contact Support on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscribe;
