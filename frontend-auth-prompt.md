# FRONTEND: Next.js + Better Auth JWT Implementation

## GOAL
Implement Google/Apple OAuth using Better Auth with JWT sessions. Frontend handles auth UI/flow, backend verifies & manages users.

## STACK
- Next.js 14+ (App Router)
- Better Auth (JWT strategy)
- React
- TypeScript

## SETUP STEPS

### 1. Install Dependencies
```bash
npm install better-auth @better-auth/react
npm install -D @types/node
```

### 2. Environment Variables (.env.local)
```env
BETTER_AUTH_SECRET=<generate-with-openssl-rand-base64-32>
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
APPLE_CLIENT_ID=your_apple_client_id
APPLE_CLIENT_SECRET=your_apple_client_secret
NEXT_PUBLIC_FASTAPI_URL=http://localhost:8000
```

### 3. Server Auth Config (lib/auth.ts)
```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL!,
  secret: process.env.BETTER_AUTH_SECRET!,
  
  // JWT strategy - stateless
  session: {
    strategy: "jwt",
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // 5 min cache
    }
  },

  // OAuth providers
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      accessType: "offline", // get refresh token
      prompt: "select_account consent"
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
    }
  },

  // No database needed for JWT
  database: undefined,
  
  // Trust host for production
  trustedOrigins: [process.env.BETTER_AUTH_URL!]
})
```

### 4. Client Auth Setup (lib/auth-client.ts)
```typescript
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000"
})

export const { 
  signIn, 
  signOut, 
  useSession,
  signUp 
} = authClient
```

### 5. API Route Handler (app/api/auth/[...all]/route.ts)
```typescript
import { auth } from "@/lib/auth"

export const { GET, POST } = auth.handler
```

### 6. Session Provider (app/providers.tsx)
```typescript
"use client"

import { SessionProvider } from "better-auth/react"

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
```

### 7. Root Layout (app/layout.tsx)
```typescript
import { Providers } from "./providers"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

### 8. Login Component (components/auth/login-button.tsx)
```typescript
"use client"

import { authClient } from "@/lib/auth-client"

export function LoginButton() {
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({ 
      provider: "google",
      callbackURL: "/dashboard" // redirect after login
    })
  }

  const handleAppleLogin = async () => {
    await authClient.signIn.social({ 
      provider: "apple",
      callbackURL: "/dashboard"
    })
  }

  return (
    <div>
      <button onClick={handleGoogleLogin}>
        Login with Google
      </button>
      <button onClick={handleAppleLogin}>
        Login with Apple
      </button>
    </div>
  )
}
```

### 9. Protected Page Example (app/dashboard/page.tsx)
```typescript
"use client"

import { useSession } from "@/lib/auth-client"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"

export default function Dashboard() {
  const { data: session, isPending } = useSession()
  const [backendToken, setBackendToken] = useState<string | null>(null)

  useEffect(() => {
    if (!isPending && !session) {
      redirect("/login")
    }

    // Send Better Auth session to FastAPI backend
    if (session?.user) {
      exchangeTokenWithBackend(session)
    }
  }, [session, isPending])

  const exchangeTokenWithBackend = async (session: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
          provider: "google" // or "apple"
        })
      })

      const data = await response.json()
      setBackendToken(data.access_token)
      
      // Store in localStorage for API calls
      localStorage.setItem("fastapi_token", data.access_token)
    } catch (error) {
      console.error("Backend token exchange failed:", error)
    }
  }

  if (isPending) return <div>Loading...</div>

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
    </div>
  )
}
```

### 10. Logout Component
```typescript
"use client"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await authClient.signOut()
    localStorage.removeItem("fastapi_token") // clear backend token
    router.push("/")
  }

  return <button onClick={handleLogout}>Logout</button>
}
```

### 11. API Call Helper (lib/api.ts)
```typescript
// Helper to call FastAPI with JWT
export async function callFastAPI(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("fastapi_token")
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })

  if (response.status === 401) {
    // Token expired, redirect to login
    window.location.href = "/login"
    throw new Error("Unauthorized")
  }

  return response.json()
}

// Usage example
// const data = await callFastAPI("/api/users/me")
```

## FLOW SUMMARY

1. User clicks "Login with Google"
2. Better Auth redirects to Google OAuth
3. User logs in on Google
4. Google redirects back to /api/auth/callback/google
5. Better Auth verifies, creates JWT session cookie
6. Frontend gets session via useSession()
7. Frontend sends user info to FastAPI /auth/verify
8. FastAPI creates/updates user, returns own JWT
9. Frontend stores FastAPI JWT in localStorage
10. All API calls use FastAPI JWT in Authorization header

## CRITICAL POINTS

### Security
- NEVER expose BETTER_AUTH_SECRET or CLIENT_SECRET in frontend code
- Always use NEXT_PUBLIC_ prefix for frontend env vars
- Store FastAPI JWT in localStorage (httpOnly cookies better but needs CORS setup)
- Better Auth session cookie is httpOnly by default (secure)

### Production
- Set BETTER_AUTH_URL to production domain
- Update Google/Apple OAuth redirect URIs to production URLs
- Enable HTTPS (required for production OAuth)
- Set secure cookie flags in Better Auth config

### Google OAuth Setup
1. Go to Google Cloud Console
2. Create OAuth 2.0 Client ID
3. Add redirect URI: https://yourdomain.com/api/auth/callback/google
4. Copy Client ID & Secret to .env

### Apple OAuth Setup  
1. Go to Apple Developer
2. Create Services ID
3. Configure Sign in with Apple
4. Add redirect URI: https://yourdomain.com/api/auth/callback/apple
5. Generate client secret (expires every 6 months)

### Common Mistakes to Avoid
- ❌ Using database adapter with JWT strategy (not needed)
- ❌ Storing sensitive tokens in localStorage without encryption
- ❌ Not handling token expiry/refresh on FastAPI side
- ❌ Forgetting to clear both Better Auth + FastAPI tokens on logout
- ❌ Not validating redirect URIs match exactly in OAuth console
- ❌ Using http:// in production (must be https://)

### Middleware Protection (Optional)
```typescript
// middleware.ts
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth.middleware(async (request) => {
  const session = await auth.api.getSession({ 
    headers: request.headers 
  })
  
  if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
  
  return NextResponse.next()
})

export const config = {
  matcher: ["/dashboard/:path*"]
}
```

## TESTING CHECKLIST
- [ ] Google login works
- [ ] Apple login works  
- [ ] Session persists on page reload
- [ ] Logout clears both sessions
- [ ] Protected routes redirect when not logged in
- [ ] FastAPI token exchange works
- [ ] API calls with FastAPI JWT work
- [ ] Token expiry handled gracefully
- [ ] Redirect URIs match OAuth console exactly

## FOLDER STRUCTURE
```
app/
  api/auth/[...all]/route.ts    # Better Auth handler
  dashboard/page.tsx             # Protected page
  login/page.tsx                 # Login page
  layout.tsx                     # Root layout
  providers.tsx                  # Session provider
components/
  auth/
    login-button.tsx
    logout-button.tsx
lib/
  auth.ts                        # Server auth config
  auth-client.ts                 # Client auth
  api.ts                         # FastAPI helper
```

## DEBUGGING
- Check browser Network tab for auth callbacks
- Verify cookies set correctly (should see better-auth.session_token)
- Check FastAPI receives correct user data
- Enable Better Auth debug mode: `debug: true` in config
- Console.log session object to verify JWT structure
