"use client";

import React from "react";
import Image from "next/image";

// Define the types for the speaker data
interface Speaker {
  id: string;
  imageUrl: string;
  linkedInLink: string;
  name: string;
  place: string;
}

interface InternationalSpeakersProps {
  speakersMembers: Speaker[];
}

const InternationalSpeakers: React.FC<InternationalSpeakersProps> = ({ speakersMembers }) => {
  return (
    <>
      <div className="speakers-area-two ptb-120">
        <div className="container">
          <div className="section-title">
            <span>Teamwork Makes the Dream Work</span>
            <h2>International Campus Ambassador 🌍</h2>
            <div className="bar"></div>
            <div className="bg-title">Speakers</div>
            {/* <Link href="/speakers" className="btn btn-primary">
              View More Campus Ambassador
            </Link> */}
          </div>

          <div className="row">
            {speakersMembers.map((speaker) => (
              <div className="col-lg-4 col-sm-6" key={speaker.id}>
                <div className="single-speakers-box">
                  <div className="speakers-image">
                    <Image
                      src={speaker.imageUrl}
                      alt={speaker.name}
                      width={800}
                      height={800}
                    />
                  </div>

                  <div className="speakers-content">
                    <h3>{speaker.name}</h3>
                    <span>{speaker.place}</span>

                    <ul className="social">
                      <li>
                        <a href={speaker.linkedInLink} target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default InternationalSpeakers;
