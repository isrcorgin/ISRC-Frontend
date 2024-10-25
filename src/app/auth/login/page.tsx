"use client";
import AuthContext from "@/context/AuthContext";
import { AuthContextType } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState, FormEvent } from "react";
import { Spinner } from "react-bootstrap";

export default function Page() {
  const { login } = useContext(AuthContext) as AuthContextType;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const emailVerified = await login(email, password);

      if (emailVerified) {
        // Set the reload flag in local storage
        localStorage.setItem('reload', 'true');
        // Redirect to homepage
        router.push('/');
      } else {
        setError("Please verify your email to complete login.");
      }
      
      setEmail("");
      setPassword("");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
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
              <h3>Welcome Back!</h3>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <div className="text-center mb-4">
                <p className="text-muted">
                  Registration Process <Link href="https://youtu.be/lO4j4W_TONE" style={{ color: '#FF2D55', textDecoration: 'underline' }}>video</Link>
                </p>
              </div>
              <form onSubmit={handleLogin}>
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

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Login"
                  )}
                </button>
                <p className="mt-3">
                  <Link href="/auth/resend-email-verification" className="btn btn-link">
                    Resend Email Verification
                  </Link>
                </p>
                <p className="mt-3" style={{display: "flex"}}>
                  <Link href="/auth/signup" className="btn btn-link">
                    Create a new account
                  </Link>
                  <Link href="/auth/forgot-password" className="btn btn-link float-end">
                    Forgot password?
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
