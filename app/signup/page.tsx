"use client";

import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "@/components/auth-provider";
import { getPasswordRequirementsMessage } from "@/lib/auth";
import Link from "next/link";

function SignUpPageContent() {
  const router = useRouter();
  const { register, isAuthenticated, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, router]);

  const ACCENT_COLOR = "#C9A84C";
  const CARD_BG = "#F7F7F7";
  const BORDER_COLOR = "#EBEBEB";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", display: "flex", flexDirection: "column" }}>
      <Navbar onOpenAi={() => {}} />
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          fontFamily: "var(--font-geist-sans), Arial, sans-serif",
        }}
      >
        <style jsx global>{`
          .custom-input::placeholder {
            color: #717171 !important;
            opacity: 1;
          }
        `}</style>

        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: CARD_BG,
            borderRadius: "16px",
            padding: "40px 32px",
            border: `1px solid ${BORDER_COLOR}`,
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#1a1a1a",
                marginBottom: "8px",
                letterSpacing: "-0.02em",
              }}
            >
              Create Account
            </h1>
            <p style={{ fontSize: "14px", color: "#666" }}>
              Sign up to start exploring off-plan properties.
            </p>
          </div>

          <form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            onSubmit={async (e) => {
              e.preventDefault();
              setError(null);

              const passwordRuleMessage = getPasswordRequirementsMessage(password);
              if (passwordRuleMessage) {
                setError(passwordRuleMessage);
                return;
              }
              if (password !== confirmPassword) {
                setError("Passwords do not match.");
                return;
              }

              setIsSubmitting(true);
              try {
                await register(email.trim(), password);
                router.replace("/");
              } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#1a1a1a",
                  marginLeft: "4px",
                }}
              >
                Email
              </label>
              <div style={{ position: "relative" }}>
                <Mail
                  size={18}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#999",
                  }}
                />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="custom-input"
                  required
                  value={email}
                  onChange={(e) => {
                    setError(null);
                    setEmail(e.target.value);
                  }}
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 40px",
                    borderRadius: "10px",
                    border: `1px solid ${BORDER_COLOR}`,
                    backgroundColor: "#ffffff",
                    fontSize: "14px",
                    color: "#1a1a1a",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#1a1a1a",
                  marginLeft: "4px",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={18}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#999",
                  }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="custom-input"
                  required
                  value={password}
                  onChange={(e) => {
                    setError(null);
                    setPassword(e.target.value);
                  }}
                  autoComplete="new-password"
                  style={{
                    width: "100%",
                    padding: "12px 40px 12px 40px",
                    borderRadius: "10px",
                    border: `1px solid ${BORDER_COLOR}`,
                    backgroundColor: "#ffffff",
                    fontSize: "14px",
                    color: "#1a1a1a",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#999",
                    display: "flex",
                    alignItems: "center",
                    padding: "4px",
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#1a1a1a",
                  marginLeft: "4px",
                }}
              >
                Confirm Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={18}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#999",
                  }}
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="custom-input"
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setError(null);
                    setConfirmPassword(e.target.value);
                  }}
                  autoComplete="new-password"
                  style={{
                    width: "100%",
                    padding: "12px 40px 12px 40px",
                    borderRadius: "10px",
                    border: `1px solid ${BORDER_COLOR}`,
                    backgroundColor: "#ffffff",
                    fontSize: "14px",
                    color: "#1a1a1a",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#999",
                    display: "flex",
                    alignItems: "center",
                    padding: "4px",
                  }}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <p style={{ fontSize: "12px", color: "#666", lineHeight: "1.5" }}>
              Use at least 12 characters with uppercase, lowercase, a number, and a special character.
            </p>

            {error && (
              <p style={{
                borderRadius: "8px",
                border: `1px solid #f87171`,
                backgroundColor: "#fee2e2",
                padding: "12px",
                fontSize: "13px",
                color: "#dc2626"
              }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: isSubmitting ? "#999" : ACCENT_COLOR,
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                padding: "12px",
                fontSize: "15px",
                fontWeight: 600,
                cursor: isSubmitting ? "not-allowed" : "pointer",
                marginTop: "10px",
                transition: "background-color 0.2s",
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? "Please Wait" : "Create Account"}
            </button>
          </form>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              margin: "24px 0",
            }}
          >
            <div style={{ flex: 1, height: "1px", backgroundColor: BORDER_COLOR }}></div>
            <span style={{ fontSize: "12px", color: "#999", fontWeight: 500 }}>
              OR
            </span>
            <div style={{ flex: 1, height: "1px", backgroundColor: BORDER_COLOR }}></div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <button
              type="button"
              onClick={() => { window.location.href = "/api/auth/google" }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                backgroundColor: "#ffffff",
                color: "#1a1a1a",
                border: `1px solid ${BORDER_COLOR}`,
                borderRadius: "10px",
                padding: "11px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>

            {/* Apple sign-in — uncomment when APPLE_CLIENT_ID + APPLE_CLIENT_SECRET are set
            <button
              type="button"
              onClick={() =>
                authClient.signIn.social({ provider: "apple", callbackURL: "/auth/callback" })
              }
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                backgroundColor: "#000000",
                color: "#ffffff",
                border: "1px solid #000000",
                borderRadius: "10px",
                padding: "11px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <svg viewBox="0 0 384 512" width="16" height="16" fill="currentColor">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              Continue with Apple
            </button>
            */}
          </div>

          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <p style={{ fontSize: "14px", color: "#666" }}>
              Already have an account?{" "}
              <Link
                href="/login"
                style={{
                  color: ACCENT_COLOR,
                  fontWeight: 600,
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }} />}>
      <SignUpPageContent />
    </Suspense>
  );
}
