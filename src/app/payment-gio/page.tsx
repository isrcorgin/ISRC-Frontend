"use client";
import React, { useState } from 'react';
import PaymentComponent from '@/components/gio-payment/PaymentComponent';
import InternationalPayment from '@/components/gio-payment/InternationalPayment';

const HomePage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<
    'choose' | 'india' | 'south-africa' | 'oman' | 'dubai' | 'uae' | 'qatar' | 'kuwait' | 'uk' | 'usa'
  >('choose');

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value as
      | 'india'
      | 'south-africa'
      | 'oman'
      | 'dubai'
      | 'uae'
      | 'qatar'
      | 'kuwait'
      | 'uk'
      | 'usa'
    );
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Select Payment Method</h1>
      <select
        value={paymentMethod}
        onChange={handlePaymentMethodChange}
        className="border border-blue-500 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="choose" disabled>Choose an option</option>
        <option value="india">India</option>
        <option value="south-africa">South Africa</option>
        <option value="oman">Oman</option>
        <option value="dubai">Dubai</option>
        <option value="uae">UAE</option>
        <option value="qatar">Qatar</option>
        <option value="kuwait">Kuwait</option>
        <option value="uk">UK</option>
        <option value="usa">USA</option>
      </select>

      <div className="w-full">
        {paymentMethod === 'india' && <PaymentComponent />}
        {(paymentMethod !== 'india' && paymentMethod !== 'choose') && <InternationalPayment />}
      </div>
    </div>
  );
};

export default HomePage;
