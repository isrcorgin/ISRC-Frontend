"use client";
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Head from 'next/head';
import AuthContext, { AuthContextType } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '../../../public/img/isrc-b.png';

interface Order {
  id: string;
  amount: number;
  currency: string;
}
interface RazorpayOrderResponse {
  data: Order
}

interface RazorpayPaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

const initializeRazorpay = (): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};


const PaymentPage: React.FC = () => {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState<boolean>(false);
  const [loadingAmount, setLoadingAmount] = useState<boolean>(true);
  const [amountError, setAmountError] = useState<string | null>(null);

  const { teamTotalPrice } = useContext(AuthContext) as AuthContextType;
  const router = useRouter();

  useEffect(() => {
    const loadRazorpayScript = async () => {
      const loaded = await initializeRazorpay();
      setRazorpayLoaded(loaded);
      if (!loaded) {
        console.error('Failed to load Razorpay script');
      }
    };

    loadRazorpayScript();
  }, []);

  useEffect(() => {
    const fetchAmountDue = async () => {
      setLoadingAmount(true);
      setAmountError(null);

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const parsedToken = JSON.parse(token) as string;

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/user-profile`, {
          headers: {
            Authorization: `Bearer ${parsedToken}`,
          },
        });

        const { amountDue } = response.data.user;
        console.log('Amount due:', amountDue);

        if (amountDue !== undefined) {
          setAmount(amountDue);
        } else {
          throw new Error('Amount due is undefined');
        }
      } catch (error) {
        console.error('Error fetching amount due:', error);
        setAmountError('Failed to fetch amount. Please try again later.');
      } finally {
        setLoadingAmount(false);
      }
    };

    fetchAmountDue();
  }, []);

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      alert('Razorpay script not loaded yet');
      return;
    }

    if (amount === null) {
      alert('Amount not found');
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      const parsedToken = JSON.parse(token) as string;

      const { data: order } = await axios.post<RazorpayOrderResponse>(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/payment`, { amount });
      console.log('Order data:', order.data);

      if (!order.data.id || !order.data.amount || !order.data.currency) {
        throw new Error('Invalid order data');
      }

      setOrderId(order.data.id);

      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: order.data.amount,
        currency: order.data.currency,
        name: 'ISRC',
        description: 'Team Registration Payment',
        order_id: order.data.id,
        handler: async (response: RazorpayPaymentResponse) => {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
          console.log('Payment response:', response);

          try {
            if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
              throw new Error('Missing payment response parameters');
            }

            await axios.post(
              `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/verify`,
              { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount },
              { headers: { 'Authorization': `Bearer ${parsedToken}` } }
            );
            // Clear browser history and redirect to homepage
            window.history.replaceState(null, '', '/');
            window.location.reload();
            router.push('/profile');
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed');
          }
        },
        theme: {
          color: '#3399cc'
        }
      };

      if (window.Razorpay) {
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        console.error('Razorpay is not defined on window');
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Payment initiation failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingAmount) {
    return (
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <p>Loading payment information...</p>
        </div>
      </div>
    );
  }

  if (amountError) {
    return (
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <p className="text-danger">{amountError}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Secure Payment</title>
      </Head>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-lg p-4 mb-5 bg-white rounded" style={{ maxWidth: '500px', width: '100%' }}>
          <div className="text-center mb-4">
            <Image src={logo} alt="Company Logo" width={150} height={50} />
          </div>
          <h5 className="card-title mb-4 text-center" style={{ fontSize: '1.5rem' }}>Secure Payment</h5>

          <p className="text-center mb-4" style={{ fontSize: '1.1rem', color: '#666' }}>
            Your transaction is secure and protected. We use advanced encryption and security measures to keep your data safe.
          </p>
          <div className="mb-4 text-center">
            <label className="form-label" style={{ fontSize: '1.2rem', fontWeight: '500' }}>
              Amount (INR):
              <input
                type="number"
                value={amount !== null ? amount.toFixed(2) : 'Error'}
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
            {isLoading ? 'Processing...' : 'Pay with Razorpay'}
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
