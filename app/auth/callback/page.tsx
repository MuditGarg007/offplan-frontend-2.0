"use client"

import { Suspense, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { persistAuth } from "@/lib/auth"

function AuthCallbackInner() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get("t")
    const email = searchParams.get("e")

    if (!token || !email) {
      router.replace("/login?error=no_token")
      return
    }

    persistAuth({ token, email })
    window.location.href = "/"
  }, [router, searchParams])

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-geist-sans), Arial, sans-serif",
      }}
    >
      <p style={{ color: "#666", fontSize: "14px" }}>Signing you in…</p>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }} />
    }>
      <AuthCallbackInner />
    </Suspense>
  )
}
