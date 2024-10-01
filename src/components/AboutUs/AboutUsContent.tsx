"use client";

import React from "react";

const EventInfo: React.FC = () => {
  return (
    <div className="event-info">
      <div className="container">
        <div className="text-center mb-5">
          <h1>Welcome to ISRC 2025</h1>
          <p className="lead">
            A prestigious event uniting over 4,000 teams from 15 countries in Mumbai this January 2025. ISRC 2025 is a global platform for students to showcase their skills in STEM and robotics through hands-on learning and practical education.
          </p>
        </div>

        <div className="col-lg-12 mb-4">
          <div className="impact-card">
            <center className="white1">
              <h3>Vision</h3>
              <p>
                Vision to Empower 10 million Educators Globally for STEM and Practical-Based Education
              </p>
            </center>
          </div>
        </div>

        <div className="col-lg-12 mb-4">
          <div className="impact-card">
            <center className="white1">
              <h3>Join Us</h3>
              <p>
                Be a part of this remarkable event and contribute to the global STEM movement. We look forward to welcoming you to ISRC 2025 in Mumbai!
              </p>
            </center>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 mb-4">
            <div className="mission-card">
              <center className="white1">
                <h3>Our Mission</h3>
                <p>
                  Our mission extends beyond competition to foster a global community dedicated to STEM. Guided by our motto, "Learn While Competing," we turn challenges into opportunities for growth.
                </p>
              </center>
            </div>
          </div>

          <div className="col-lg-6 mb-4">
            <div className="highlights-card">
              <center className="white1">
                <h3>Event Highlights</h3>
                <p >
                  Join us in Mumbai for ISRC 2025, where education becomes an exciting journey in STEM and robotics. Experience the energy, innovation, and collaboration as we bring together bright minds from around the world.
                </p>
              </center>
            </div>
          </div>

          <div className="col-lg-12 mb-4">
            <div className="impact-card">
              <center className="white1">
                <h3>Global Impact</h3>
                <p>
                  ISRC aims to create a lasting impact on students and the global STEM community by promoting excellence in education and practical skills.
                </p>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
