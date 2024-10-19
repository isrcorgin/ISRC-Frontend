"use client";

import React, { useContext, useEffect, useState } from "react";
import FsLightbox from "fslightbox-react";
import Link from "next/link";
import Image from "next/image";
import Countdown from "./Countdown";
import AuthContext, { AuthContextType } from "@/context/AuthContext";
import { FlagIcon } from "react-flag-kit";

const MainBanner: React.FC = () => {
  const [toggler, setToggler] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const { teamRegister } = useContext(AuthContext) as AuthContextType;


  useEffect(() => {
    // Function to read token from local storage
    const fetchTokenFromLocalStorage = () => {
      const storedToken = localStorage?.getItem('token');
      setToken(storedToken ? JSON.parse(storedToken) : null);
    };

    // Initial load of token
    fetchTokenFromLocalStorage();
    }, []);

  return (
    <>
      <FsLightbox
        toggler={toggler}
        sources={["https://youtu.be/lO4j4W_TONE"]}
      />

      <div 
        className="main-banner"
        style={{
          backgroundImage: `url(/images/main-bg1.webp)`
        }}
      >
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="main-banner-content">
                <p>
                  Are you <span>ready</span> to attend?
                </p>
                <h1>
                Conquering Challenges,<span> <br />Together </span> <br />at ISRC in <b>2</b>
                  <b>0</b>
                  <b>2</b>
                  <b>5</b>
                </h1>
                <ul>
                  <li>
                    <i className="icofont-compass"></i>Mumbai <FlagIcon code="IN" size={25} />
                  </li>
                  <li>
                    <i className="icofont-calendar"></i> January, 2025
                  </li>
                </ul>

                <div className="button-box">
                {token ? (
                teamRegister ? (

                      <Link href="/profile" className="btn btn-primary">
                        PROFILE
                      </Link>

                ) : (

                      <Link href="/team-register" className="btn btn-primary">
                        REGISTER
                      </Link>
                )
              ) : (
                  <Link href="/auth/login/" className="btn btn-primary">
                    LOGIN
                  </Link>
              )}
                  <div
                    onClick={() => setToggler(!toggler)}
                    className="video-btn d-sm-inline"
                  >
                    <i className="icofont-ui-play"></i> Watch Promo Video
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Countdown */}
      



        <Countdown endDate="November 15, 2024 17:00:00 GMT"  />
        {/* Shape Images */}
        <div className="shape1">
          <Image
            src="/images/shapes/1.png"
            alt="shape1"
            width={77}
            height={77}
          />
        </div>
        <div className="shape2 rotateme">
          <Image
            src="/images/shapes/2.png"
            alt="shape2"
            width={38}
            height={38}
          />
        </div>
        <div className="shape3 rotateme">
          <Image
            src="/images/shapes/3.png"
            alt="shape3"
            width={51}
            height={57}
          />
        </div>
        <div className="shape4">
          <Image
            src="/images/shapes/4.png"
            alt="shape4"
            width={29}
            height={29}
          />
        </div>
      </div>
    </>
  );
};

export default MainBanner;
