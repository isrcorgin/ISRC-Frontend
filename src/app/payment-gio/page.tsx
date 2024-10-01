// src/components/FixedPaymentPage.tsx

"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@/../public/img/isrc-b.png';

// Ensure that TypeScript recognizes your custom types
// If not already, import the type declarations
// import '@/types/razorpay'; // Adjust the path as necessary

const FixedPaymentPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState<boolean>(false);
  const router = useRouter();

  const amount = 100; // Fixed amount for payment

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          setRazorpayLoaded(true);
          resolve();
        };
        script.onerror = () => reject(new Error('Failed to load Razorpay script'));
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript().catch((error) => {
      console.error(error);
      alert('Failed to load payment system. Please try again later.');
    });
  }, []);

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      alert('Razorpay script not loaded yet. Please refresh the page.');
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      const parsedToken = JSON.parse(token) as string;

          // Check if the user has already paid
          const { data: paymentStatus } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio-event/canattempt`,
            {
              headers: { Authorization: `Bearer ${parsedToken}` },
            }
          );
          console.log(paymentStatus);
          
      if (paymentStatus.canAttempt) {
        alert("You've Already Made the Payment")
        router.push('/gio-event/paid-instruction');
        return;
      }
      

      // Initiate payment on the backend
      const { data: order } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio-event/gio-payment/create`,
        { amount },
        { headers: { Authorization: `Bearer ${parsedToken}` } }
      );

      // Define the payment options using your custom interface
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: order.data.amount,
        currency: order.data.currency,
        name: 'ISRC',
        description: 'Fixed Payment of 50 Rupees',
        order_id: order.data.id,
        handler: async (response) => {
          try {
            await axios.post(
              `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio-event/gio-payment/confirm`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                amount,
              },
              { headers: { Authorization: `Bearer ${parsedToken}` } }
            );

            router.push('/gio-event/paid-instruction');
          } catch (error: any) {
            console.error('Error sending payment info:', error.response?.data || error.message);
            alert('Failed to process payment. Please try again.');
          }
        },
        prefill: {
          name: '', // Optionally, prefill with user data
          email: '',
          contact: '',
        },
        theme: {
          color: '#3399cc',
        },
      };

      if (window.Razorpay) {
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        alert('Razorpay is not available. Please refresh the page.');
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
        alert(error.response?.data?.message || 'Payment initiation failed. Please try again.');
      } else {
        console.error('Unexpected error:', error);
        alert(error.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Fixed Payment of 50 Rupees</title>
      </Head>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-lg p-4 mb-5 bg-white rounded" style={{ maxWidth: '500px', width: '100%' }}>
          <div className="text-center mb-4">
            <Image src={logo} alt="Company Logo" width={150} height={50} />
          </div>
          <h5 className="card-title mb-4 text-center" style={{ fontSize: '1.5rem' }}>Fixed Payment</h5>
          <p className="text-center mb-4" style={{ fontSize: '1.1rem', color: '#666' }}>
            Your transaction is secure and protected. We use advanced encryption and security measures to keep your data safe.
          </p>
          <div className="mb-4 text-center">
            <label className="form-label" style={{ fontSize: '1.2rem', fontWeight: '500' }}>
              Amount (INR):
              <input
                type="number"
                value={amount.toFixed(2)}
                readOnly
                className="form-control text-center"
                style={{ fontSize: '2rem', fontWeight: '700', border: '2px solid #007bff' }}
              />
            </label>
          </div>
          <button
            onClick={handlePayment}
            disabled={isLoading}
            className="btn btn-primary w-100 py-3"
            style={{ fontSize: '1.2rem', borderRadius: '8px', transition: 'background-color 0.3s' }}
          >
            {isLoading ? 'Processing...' : 'Pay 100 Rupees'}
          </button>
        </div>
      </div>
    </>
  );
};

export default FixedPaymentPage;
