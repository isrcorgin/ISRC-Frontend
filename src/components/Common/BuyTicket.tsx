"use client";

import React from "react";
import Link from "next/link"; 

const BuyTicket: React.FC = () => {
  return (
    <>
      <div 
        className="buy-tickets-area ptb-120"
        style={{
          backgroundImage: `url(/images/buy-tickets-bg.jpg)`
        }}
      >
        <div className="buy-tickets">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="section-title">
                  <span>Hurry Up!</span>
                  <h2>Register Your self Now</h2>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="buy-ticket-btn">
                  <Link href="/team-register/" className="btn btn-primary">
                    Register!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyTicket;
