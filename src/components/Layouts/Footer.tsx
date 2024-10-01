"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FlagIcon } from "react-flag-kit";

const Footer: React.FC = () => {
  return (
    <>
      <footer className="footer-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="single-footer-widget">
                <h3 className="text-danger"> <i className="icofont-google-map"></i> Venue Location</h3>
                <span>
                  <i className="icofont-calendar " style={{ color: '#ffd700' }}></i>January, 2025
                </span>

                <p className="location">
                  <i className="icofont-google-map text-danger"></i> Mumbai <FlagIcon code="IN" size={15} />
                </p>
                <Link href="https://wa.me/919594402916" target="_blank" className="contact-authority">
                  <i className="icofont-whatsapp text-success"></i> +91 95944 02916
                </Link>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="single-footer-widget">
                <h3 className="text-danger" >About Us</h3>
                <p>
                Experience ISRC 2025 in Mumbai this December! Over 4,000 teams from 15 
                countries will compete in the International STEM and Robotics Championship,
                promoting hands-on learning and STEM principles. Celebrate knowledge and 
                innovation in this thrilling educational adventure. 🌐✨
                </p>

                <ul className="social-links">
                  <li>
                    <a
                      href="https://www.facebook.com/people/ISRC/61551801273199/?mibextid=ZbWKwL"
                      className="facebook"
                      target="_blank"
                    >
                      <i className="icofont-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://x.com/i/flow/login?redirect_after_login=%2Fisrc_org_in"
                      className="twitter"
                      target="_blank"
                    >
                      <i className="icofont-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/isrc-org-in/"
                      className="linkedin"
                      target="_blank"
                    >
                      <i className="icofont-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/isrc.org.in/"
                      className="instagram"
                      target="_blank"
                    >
                      <i className="icofont-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="copyright-area">
                <div className="logo">
                  <Link href="/">
                    <Image
                      src="/img/isrc-b.png"
                      alt="logo"
                      width={140}
                      height={58}
                    />
                  </Link>
                </div>

                <ul>
                  <li>
                    <Link href="/about-us">About</Link>
                  </li>
                
                  <li>
                    <Link href="/refund">Refund Policy</Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/terms-conditions">Terms & Conditions</Link>
                  </li>
                </ul>

                <p>
                  © ISRC All Rights Reserved.{" "}
                  <a
                    href="https://wa.me/9594402916"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Edu Momentum LLP
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
