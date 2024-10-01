'use client';

import React from 'react';
import Head from 'next/head';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button'; // Ensure this component works without Tailwind CSS
const QuizDonePage = () => {
  const router = useRouter();

  const handleRetakeQuiz = () => {
    router.push('/gio-event'); // Ensure this route exists
  };

  const handleGiveReview = () => {
    window.open('https://maps.app.goo.gl/Xz3mNqFXbkYvszDW8', '_blank'); // Replace with your review link
  };

  return (
    <>
      <Head>
        <title>Quiz Completed</title>
      </Head>
      <div className="container">
        <div className="card">
          {/* Centering the logo */}
          <div className="logoContainer">
            <Image
              src="/img/isrc-b.png" // Adjust the path if necessary
              alt="Company Logo"
              width={200}
              height={80}
              style={{ objectFit: 'contain' }}
            />
          </div>

          <h2 className="title">Quiz Completed</h2>

          <p className="text">
            Thank you for completing the quiz! We have recorded your marks, and your ranking will be available soon.
          </p>

          <p className="text">
            You can attempt the quiz again anytime. <br />Rankings will be declared on <strong >14 October 2024, 5PM IST</strong>.
      
          </p>

          {/* Retake Quiz Button */}
          <div className="buttonContainer">
            <Button
              onClick={handleRetakeQuiz}
              aria-label="Retake Quiz"
              className="button retakeButton"
            >
              Retake Quiz
            </Button>
          </div>

          {/* New section for 'Give us a review' */}
          <div className="reviewSection">
            <h3 className="subTitle">Give Us a Review</h3>
            <p className="text">
              We value your feedback. Please let us know how we did!
            </p>
            <Button
              onClick={handleGiveReview}
              aria-label="Give us a review"
              className="button reviewButton"
            >
              Give Review
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Container styles */
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f3f4f6;
          padding: 16px;
        }

        /* Card styles */
        .card {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 32px;
          margin-bottom: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          max-width: 600px;
          width: 100%;
        }

        /* Logo container */
        .logoContainer {
          display: flex;
          justify-content: center;
          margin-bottom: 32px;
        }

        /* Title styles */
        .title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 24px;
          text-align: center;
          color: #ff2d55;
        }

        /* Subtitle styles */
        .subTitle {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 16px;
          text-align: center;
        }

        /* Text styles */
        .text {
          text-align: center;
          margin-bottom: 24px;
          color: #4b5563;
          font-size: 1.125rem;
        }

        /* Button container */
        .buttonContainer {
          text-align: center;
          margin-bottom: 40px; /* Extra space below the Retake Quiz button */
        }

        /* Button styles */
        .button {
          width: 100%;
          padding: 12px;
          font-size: 1.2rem;
          border-radius: 8px;
          color: #ffffff;
          cursor: pointer;
          border: none;
          transition: background-color 0.3s;
        }

        /* Retake Quiz button styles */
        .retakeButton {
          background-color: #ff2d55;
        }
        .retakeButton:hover {
          background-color: #ff1a47;
        }

        /* Give Review button styles */
        .reviewButton {
          background-color: #007bff;
        }
        .reviewButton:hover {
          background-color: #0056b3;
        }

        /* Review section */
        .reviewSection {
          text-align: center;
          margin-top: 40px;
        }
      `}</style>
    </>
  );
};

export default QuizDonePage;
