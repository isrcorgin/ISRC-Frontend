"use client"
import axios from "axios";
import Link from "next/link";
import { FormEvent, useState } from "react";



export default function Page() {

  const [email , setEmail ] = useState("");

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault()
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/forgot-password`, {email})
    alert(`Forgot Password Link has sent to the ${email} successfully`)

} catch (error) {
  alert("Error while sending Forgot Password link")
}

  }
  return (
    <>
      <div 
        className="login-area"
        style={{
          backgroundImage: `url(/images/main-bg1.webp)`
        }}
      >
        <div className="d-table">
          <div className="d-table-cell">
            <div className="login-form">
              <h3>Forgot password?</h3>

              <form onSubmit={handleResetPassword}>
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
                <button type="submit" className="btn btn-primary">
                  Reset Password
                </button>

                <p>
                  <Link href="/auth/signup" className="pull-left">
                    Create a new account
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
