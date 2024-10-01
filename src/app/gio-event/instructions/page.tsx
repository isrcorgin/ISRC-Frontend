// src/components/Instructions.tsx
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import Link from 'next/link';

const Instructions: React.FC = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4" style={{ color: '#0D1028' }}><strong>📚 GIO Mock Test Instructions</strong></h2>
      <div className="mb-4" style={{ backgroundColor: '#E3F2FD', padding: '20px', borderRadius: '10px' }}>
        <h3 style={{ color: '#0D1028', marginBottom: '15px' }}>1. 📝 Exam Overview:</h3>
        <ul style={{ listStyleType: 'none', paddingLeft: '0', fontSize: '16px', color: '#0D1028' }}>
          <li>• The mock test consists of 25 questions designed to help you prepare for the Global Innovation Olympiad (GIO).</li>
          <li>• This test is free of charge and is intended for practice purposes only.</li>
          <li>• Each question is formatted as a multiple-choice question (MCQ) with four options to choose from.</li>
        </ul>

        <h3 style={{ color: '#0D1028', marginTop: '20px', marginBottom: '15px' }}>2. ⚖️ Exam Rules:</h3>
        <ul style={{ listStyleType: 'none', paddingLeft: '0', fontSize: '16px', color: '#0D1028' }}>
          <li>• Marking Scheme: +4 marks for correct answers, -1 mark for incorrect answers. ❗</li>
          <li>• ⏰ Time Limit: You will have 45 seconds per question to complete your responses.</li>
          <li>• 📊 Score Tracking: Your highest score will be recorded and compared to your previous attempts.</li>
        </ul>

        <h3 style={{ color: '#0D1028', marginTop: '20px', marginBottom: '15px' }}>3. 🚫 Window Restrictions:</h3>
        <p style={{ fontSize: '16px', color: '#0D1028' }}>
          While this is a practice test, we encourage you to simulate the exam environment. Try to stay focused and avoid navigating away from the test screen.
        </p>

        <h3 style={{ color: '#0D1028', marginTop: '20px', marginBottom: '15px' }}>4. 👀 Monitoring:</h3>
        <p style={{ fontSize: '16px', color: '#0D1028' }}>
          Ensure that you are in a distraction-free environment to mimic the real testing conditions and maintain focus throughout the test.
        </p>

        <h3 style={{ color: '#0D1028', marginTop: '20px', marginBottom: '15px' }}>5. 🌐 Additional Notes:</h3>
        <ul style={{ listStyleType: 'none', paddingLeft: '0', fontSize: '16px', color: '#0D1028' }}>
          <li>• Ensure you have a stable internet connection.</li>
          <li>• Use a desktop or laptop for the best experience.</li>
          <li>• We recommend disabling pop-up blockers to avoid interruptions during the test.</li>
        </ul>

        <div className="text-center">
          <Link href="/gio-event/quiz" passHref>
            <Button variant="primary" style={{ marginTop: '20px' }}>
              Start Mock Test
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Instructions;
