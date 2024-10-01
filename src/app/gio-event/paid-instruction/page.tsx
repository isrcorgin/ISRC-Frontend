"use client";

// src/components/Instructions.tsx
import React, { useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import Link from "next/link";

const Instructions: React.FC = () => {
  const [showPopup, setShowPopup] = useState(true); // State to control popup visibility

  const handleClosePopup = () => setShowPopup(false); // Function to close popup

  return (
    <Container className="mt-5">
      {/* Popup Modal */}
      <Modal show={showPopup} onHide={handleClosePopup}>
        <Modal.Header closeButton>
          <Modal.Title>congratulations!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Welcome to the ISRC Global Innovator Test! We're excited to support
            you on your journey toward a brighter future by taking this test.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePopup}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <h2 className="text-center mb-4" style={{ color: "#0D1028" }}>
        💼 GIO Paid Exam Instructions
      </h2>
      <div
        className="mb-4"
        style={{
          backgroundColor: "#E3F2FD",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h3 style={{ color: "#0D1028", marginBottom: "15px" }}>
          1. 📝 Exam Overview:
        </h3>
        <ul
          style={{
            listStyleType: "none",
            paddingLeft: "0",
            fontSize: "16px",
            color: "#0D1028",
          }}
        >
          <li>
            • The paid exam has 100 questions to help you show off your
            knowledge for the Global Innovative Olympiad (GIO).
          </li>
          <li>• The fee for the exam is ₹100 per test.</li>
          <li>
            • Each question is formatted as a multiple-choice question (MCQ)
            with four options to choose from.
          </li>
        </ul>

        <h3
          style={{ color: "#0D1028", marginTop: "20px", marginBottom: "15px" }}
        >
          2. ⚖️ Exam Rules:
        </h3>
        <ul
          style={{
            listStyleType: "none",
            paddingLeft: "0",
            fontSize: "16px",
            color: "#0D1028",
          }}
        >
          <li>
            • Negative Marking: Similar to the mock test, there will be negative
            marking. Be careful with your selections! ❗
          </li>
          <li>
            • ⏰ Time Limit: You will have 45 seconds per question to complete
            your responses.
          </li>
          <li>
            • 📊 Score Tracking: Only the highest score will be considered for
            ranking.
          </li>
          <li>
            • 🏆 Top Participants: After the exam is over, the top 1% of
            participants will be highlighted in the ranking list.
          </li>
        </ul>

        <h3
          style={{ color: "#0D1028", marginTop: "20px", marginBottom: "15px" }}
        >
          3. 🚫 Window Restrictions:
        </h3>
        <ul
          style={{
            listStyleType: "none",
            paddingLeft: "0",
            fontSize: "16px",
            color: "#0D1028",
          }}
        >
          <li>
            • Once the GIO test begins, you are not allowed to switch windows or
            minimize the window.
          </li>
          <li>
            • If you switch windows twice, you will receive a warning.
          </li>
          <li>
            • A third window switch will lead to immediate disqualification from the test.
          </li>
        </ul>

        <h3
          style={{ color: "#0D1028", marginTop: "20px", marginBottom: "15px" }}
        >
          4. 👀 Monitoring:
        </h3>
        <p style={{ fontSize: "16px", color: "#0D1028" }}>
          Ensure that you are in a distraction-free environment to mimic the
          real testing conditions and maintain focus throughout the test.
        </p>

        <h3
          style={{ color: "#0D1028", marginTop: "20px", marginBottom: "15px" }}
        >
          5. 🏅 Certification:
        </h3>
        <p style={{ fontSize: "16px", color: "#0D1028" }}>
          Participants who qualify will receive a certificate and a medal, both
          verified by ISRC.
        </p>

        <h3
          style={{ color: "#0D1028", marginTop: "20px", marginBottom: "15px" }}
        >
          6. 🌐 Additional Notes:
        </h3>
        <ul
          style={{
            listStyleType: "none",
            paddingLeft: "0",
            fontSize: "16px",
            color: "#0D1028",
          }}
        >
          <li>• Ensure you have a stable internet connection.</li>
          <li>• Use a desktop or laptop for the best experience.</li>
          <li>
            • We recommend disabling pop-up blockers to avoid interruptions
            during the test.
          </li>
        </ul>

        <div className="text-center">
          <Link href="/gio-event/paid-quiz" passHref>
            <Button
              variant="primary"
              style={{ marginTop: "20px", padding: "10px 20px" }}
            >
              Start Test
            </Button>
          </Link>
          <br />
          <Link href="/gio-event" passHref>
            <Button
              variant="secondary"
              style={{ marginTop: "20px", padding: "10px 20px" }}
            >
              Later
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Instructions;
