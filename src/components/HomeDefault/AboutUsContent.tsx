import React from "react";
import Link from "next/link";
import Image from "next/image";

const AboutUsContent: React.FC = () => {
  return (
    <section className="about-area ptb-120 bg-image">
      <div className="container">
        <div className="row h-100 align-items-center">
          <article className="col-lg-6">
            <header className="about-content">
              <span>Join The Event</span>
              <h3>
                Join the <b>Global</b> Innovation Spectacle!
              </h3>
              <p>
                Welcome to the International STEM and Robotics Championship (ISRC)! Join the global stage where over 4,000 teams from 15 countries compete in Innovation and Robotics categories. Whether you’re in grades 5-8, grades 9-12, or a college freshman, ISRC offers a unique platform to showcase your skills.
              </p>
              <ul>
                <li><b>STEM Excellence:</b> Aligning with government initiatives to promote STEM education. Learn more about our <Link href="/about-us#stem-excellence" style={{ color: '#FF2D55', textDecoration: 'none' }}>STEM Excellence initiatives</Link>.</li>
                <li><b>Global Community:</b> Connect with peers, mentors, and industry leaders. Discover our <Link href="/about-us#global-community" style={{ color: '#FF2D55', textDecoration: 'none' }}>global community</Link>.</li>
                <li><b>Three Rounds:</b> Online quizzes, hands-on competitions, and a thrilling finale. Read about our <Link href="/event" style={{ color: '#FF2D55', textDecoration: 'none' }}>event structure</Link>.</li>
                <li><b>Prizes:</b> Win prestigious awards and recognition. Check out the <Link href="/event#prizes" style={{ color: '#FF2D55', textDecoration: 'none' }}>prizes we offer</Link>.</li>
                <li><b>Professional Development:</b> Aiming to train 10 million teachers in STEM by 2030. Learn about our <Link href="/about-us#professional-development" style={{ color: '#FF2D55', textDecoration: 'none' }}>professional development programs</Link>.</li>
                <li><b>Partnership Opportunities:</b> <Link href="#partners" style={{ color: '#FF2D55', textDecoration: 'none' }}>Partner with us</Link> to promote STEM globally.</li>
              </ul>
            </header>
          </article>

          <aside className="col-lg-6">
            <div className="about-image">
              <Image
                src="/img/home1.jpg"
                className="about-img1"
                width={750}
                height={500}
                alt="Robotics Competitions"
              />
              <Image
                src="/img/home2.jpg"
                className="about-img2"
                alt="STEM Robotics Competitions"
                width={309}
                height={424}
              />
              <Image
                src="/images/shapes/5.png"
                className="shape-img"
                alt="Robotics Competitions STEM"
                width={111}
                height={111}
              />

              <Link href="/about-us"  className="btn btn-primary">
                Explore More About Us
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default AboutUsContent;
