"use client"; // Correct directive

import PaidTest from '@/components/exams/PaidTest';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Loading from "@/app/loading"; // Importing the Loading component

const Page = () => {
  const [canAttempt, setCanAttempt] = useState(false); // To track if the user can attempt the quiz
  const [loading, setLoading] = useState(true); // To track loading state
  const router = useRouter(); // Use the useRouter hook instead of directly importing Router


  useEffect(() => {
    const checkUserEligibility = async () => {
      try {
        const storedToken = localStorage.getItem('token'); // Replace this with your token management logic
        if (!storedToken) {
          router.push('/auth/login'); // Redirect to login if token is not found
          return;
        }

        const token = JSON.parse(storedToken); // Corrected this line to use storedToken directly
        
        // Fetch user payment and attempt status from the server
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio-event/canattempt`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Authorization header with token
            },
          }
        );
        console.log("Juned khan", data);
        
        // Check if the user has paid and can attempt
        if (data.canAttempt) {
          setCanAttempt(true); // User is eligible
        } else {
          router.push('/payment-gio'); // Redirect to payment page if not eligible
        }
      } catch (error) {
        console.error('Error checking eligibility:', error);
        router.push('/error'); // Redirect to an error page if necessary
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    checkUserEligibility();
  }, [router]); // Added router as a dependency

  if (loading) {
    return <Loading />;  // Use the Loading component while checking eligibility
  }

  // Render the Test component if the user is eligible, otherwise redirect happens
  return canAttempt ? <PaidTest token={''} /> : null;
};

export default Page;
