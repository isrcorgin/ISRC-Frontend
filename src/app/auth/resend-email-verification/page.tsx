"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import axios from "axios";

export default function ResendEmailVerification() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null); // Add error state
  const [success, setSuccess] = useState<string | null>(null); // Add success state

  const handleResendVerification = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    setSuccess(null); // Clear any previous success messages

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/resend-verification`, { email, password });
      setSuccess(response.data.message); // Set success message
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message); // Set error message
      } else {
        setError("An unexpected error occurred"); // Handle unexpected errors
      }
    }
  };

  return (
    <>
      <div
        className="login-area"
        style={{
          backgroundImage: `url(/images/main-bg1.webp)`,
        }}
      >
        <div className="d-table">
          <div className="d-table-cell">
            <div className="login-form">
              <h3>Resend Email Verification</h3>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success" role="alert">
                  {success}
                </div>
              )}

              <form onSubmit={handleResendVerification}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Resend Verification
                </button>

                <p className="mt-3">
                  <Link href="/auth/login" className="btn btn-link">
                    Back to Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
