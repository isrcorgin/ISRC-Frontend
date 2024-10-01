import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FlagIcon } from 'react-flag-kit';
import { useSpeakers } from "@/context/CampusAmbassadorContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Speakers: React.FC = () => {
  const { speakersMembers } = useSpeakers();

  // Settings for the carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Auto-scroll every 3 seconds
    arrows: false,
    appendDots: (dots: React.ReactNode) => (
      <div style={{ position: 'absolute', bottom: '10px', width: '100%', textAlign: 'center' }}>
        <ul style={{ margin: '0', padding: '0', listStyle: 'none' }}>
          {dots}
        </ul>
      </div>
    ),
    responsive: [
      {
        breakpoint: 768, // Mobile breakpoint
        settings: {
          dots: false, // Hide dots on mobile
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      <div className="speakers-area-two ptb-120">
        <div className="container">
          <div className="section-title">
            <span>Teamwork Makes the Dream Work</span>
            <h2>
              Campus Ambassador <FlagIcon code="IN" size={40} />
            </h2>
            <div className="bar"></div>
            <Link href="/campus-ambassador/" className="btn btn-primary">
            View Ambassadors
            </Link>
          </div>

          <div className="row d-none d-lg-flex">
            {speakersMembers &&
              speakersMembers.slice(0, 3).map((value, i) => (
                <div className="col-lg-4 col-sm-6" key={i}>
                  <div className="single-speakers-box">
                    <div className="speakers-image">
                      <Image
                        src={value.image}
                        alt="speaker"
                        width={800}
                        height={800}
                      />
                    </div>

                    <div className="speakers-content">
                      <h3>{value.name}</h3>
                      <span>{value.designation}</span>

                      <ul className="social">
                        {value.socialLinks.map((link, i) => (
                          <li key={i}>
                            <a href={link.url} target="_blank">
                              <i className={link.iconName}></i>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="row d-lg-none" style={{ position: 'relative', paddingBottom: '50px' }}>
            <Slider {...settings}>
              {speakersMembers &&
                speakersMembers.slice(0, 3).map((value, i) => (
                  <div className="single-speakers-box" key={i}>
                    <div className="speakers-image">
                      <Image
                        src={value.image}
                        alt="speaker"
                        width={800}
                        height={800}
                      />
                    </div>

                    <div className="speakers-content">
                      <h3>{value.name}</h3>
                      <span>{value.designation}</span>

                      <ul className="social">
                        {value.socialLinks.map((link, i) => (
                          <li key={i}>
                            <a href={link.url} target="_blank">
                              <i className={link.iconName}></i>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Speakers;
