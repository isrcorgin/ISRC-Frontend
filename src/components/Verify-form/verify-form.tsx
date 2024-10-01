// components/ContactForm.js
"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';  // Correct import for App Router
import { FormEvent } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyForm = () => {
  const [authCodeinput, setAuthCodeinput] = useState("");
  const router = useRouter(); // Ensure this is used within a Next.js page or context

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const enteredAuthCode = authCodeinput.toUpperCase();
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/verify-certificate`, { authCode: enteredAuthCode });

      // Redirect to the new certificate page
      router.push(`/certificate/${enteredAuthCode}`);
    } catch (error) {
      console.error("Error verifying certificate:", error);
      toast.error("Certificate verification failed. Please check the auth code and try again.");
    }
  };

  return (
    <div className="contact-area ptb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-12">
            <div className="card shadow-lg border-0 transition-transform hover:scale-105">
              <div className="card-body p-5 text-center">
                <h3 className="card-title mb-4">Certificate Verification</h3>
                <p className="card-text mb-4">
                  Please enter the unique certificate number to verify its authenticity.
                </p>
                <form id="verificationForm" onSubmit={handleVerify}>
                  <div className="form-group mb-4">
                    <label htmlFor="certificateNumber" className="form-label sr-only">Certificate Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="certificateNumber"
                      id="certificateNumber"
                      placeholder="e.g., 12345-ABC"
                      required
                      value={authCodeinput}
                      onChange={(e) => setAuthCodeinput(e.target.value)}
                      style={{textTransform: "uppercase"}}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Verify Certificate</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default VerifyForm;
