import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { API_BASE } from "@/lib/api/config"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")
  const error = url.searchParams.get("error")

  if (error || !code) {
    return NextResponse.redirect(new URL("/login?error=oauth_denied", request.url))
  }

  const cookieStore = await cookies()
  const savedState = cookieStore.get("oauth_state")?.value

  if (!savedState || savedState !== state) {
    return NextResponse.redirect(new URL("/login?error=invalid_state", request.url))
  }

  try {
    const res = await fetch(`${API_BASE}/auth/google/callback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        redirect_uri: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`,
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error("FastAPI google callback error:", res.status, body)
      throw new Error(`FastAPI ${res.status}`)
    }

    const data = (await res.json()) as { token: string; email: string }

    const params = new URLSearchParams({ t: data.token, e: data.email })
    const response = NextResponse.redirect(
      new URL(`/auth/callback?${params.toString()}`, request.url)
    )
    response.cookies.delete("oauth_state")
    return response
  } catch (err) {
    console.error("Google OAuth callback failed:", err)
    return NextResponse.redirect(new URL("/login?error=auth_failed", request.url))
  }
}
