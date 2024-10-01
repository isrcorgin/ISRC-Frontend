"use client";

import React from "react";
import ContactInfo from "./ContactInfo";

const ContactForm: React.FC = () => {
  // Handle button click
  const handleClick = () => {
    const phoneNumber = "9594402916";
    const textMessage = encodeURIComponent(
      "Hello, I need assistance with registration."
    );
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${textMessage}`;

    // Redirect to WhatsApp
    window.location.href = whatsappURL;
  };

  return (
    <div className="contact-area ptb-120">
      <div className="container">
        {/* ContactInfo */}
        <ContactInfo />
        <br /><br />
        <center>
          <h1>Contact Us</h1>
        </center>
        <div className="row h-100 justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card border-0 shadow-lg hover-shadow">
              <div className="card-body text-center">
                <h3 className="card-title">Need Assistance with Registration?</h3>
                <p className="card-text">
                  For any registration-related help or inquiries, please contact us via WhatsApp by clicking the button below. Our team is ready to assist you.
                </p>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleClick}
                >
                  <i className="icofont-whatsapp"></i> Contact Us on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
