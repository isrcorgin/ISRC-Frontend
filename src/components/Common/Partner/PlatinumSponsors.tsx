"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const PlatinumSponsors: React.FC = () => {
  return (
    <>
      <div className="partner-title platinum-sponsor" >
        <h3>Partners</h3>
      </div>

      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          400: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
        modules={[Autoplay]}
        className="platinum-partner-slides"
      >

     

        <SwiperSlide className="partner-item">
          <a href="#" target="_blank">
            <Image
              src="/images/technotran.png"
              alt="Partner Logo"
              width={200}
              height={60}
            />
            <Image
              src="/images/technotran.png"
              alt="Partner Logo"
              width={200}
              height={60}
            />
          </a>
        </SwiperSlide>

        <SwiperSlide className="partner-item">
          <a href="#" target="_blank">
            <Image
              src="/images/white.png"
              alt="Partner Logo"
              width={100}
              height={60}
            />
            <Image
              src="/images/white.png"
              alt="Partner Logo"
              width={100}
              height={60}
            />
          </a>
        </SwiperSlide>

        <SwiperSlide className="partner-item">
          <a href="#" target="_blank">
            <Image
              src="/images/robomonk.png"
              alt="Partner Logo"
              width={200}
              height={60}
            />
            <Image
              src="/images/robomonk.png"
              alt="Partner Logo"
              width={200}
              height={60}
            />
          </a>
        </SwiperSlide>
        <SwiperSlide className="partner-item">
          <a href="#" target="_blank">
            <Image
              src="/images/white.png"
              alt="Partner Logo"
              width={100}
              height={60}
            />
            <Image
              src="/images/white.png"
              alt="Partner Logo"
              width={100}
              height={60}
            />
          </a>
        </SwiperSlide>

        <SwiperSlide className="partner-item">
          <a href="#" target="_blank">
            <Image
              src="/images/dolphinlabs.png"
              alt="Partner Logo"
              width={200}
              height={60}
            />
            <Image
              src="/images/dolphinlabs.png"
              alt="Partner Logo"
              width={200}
              height={60}
            />
          </a>
        </SwiperSlide>

      </Swiper>
    </>
  );
};

export default PlatinumSponsors;
