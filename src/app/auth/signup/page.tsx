"use client";
import AuthContext from "@/context/AuthContext";
import { AuthContextType } from "@/context/AuthContext";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { Spinner } from "react-bootstrap";

export default function Page() {
  const { register } = useContext(AuthContext) as AuthContextType;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // Add error state
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Add success message state
  const [loading, setLoading] = useState<boolean>(false); // New state for loading

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the registration starts
    try {
      const message = await register(email, password); // Call the updated register function
      setEmail("");
      setPassword("");
      setError(null); // Clear any previous error
      setSuccessMessage(message); // Set success message from the backend
    } catch (error: any) {
      setError(error.message); // Set error message
      setSuccessMessage(null); // Clear any previous success message
    } finally {
      setLoading(false); // Set loading to false after the registration attempt
    }
  };

  return (
    <>
      <div
        className="signup-area"
        style={{
          backgroundImage: "url(/images/main-bg2.webp)",
        }}
      >
        <div className="d-table">
          <div className="d-table-cell">
            <div className="signup-form">
              <h3>Create your Account</h3>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading} // Disable the button when loading
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" /> // Show spinner when loading
                  ) : (
                    "Signup"
                  )}
                </button>

                <p>
                  Already a registered user? <Link href="/auth/login">Login!</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
