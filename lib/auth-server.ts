import { betterAuth } from "better-auth"

// Better Auth is kept for future Apple OAuth support.
// Google OAuth is handled directly via /api/auth/google (no DB required).
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET?.trim() || "unused-placeholder-set-when-enabling-oauth-providers",

  session: {
    expiresIn: 60 * 60 * 24 * 30,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },

  socialProviders: {
    // Google is handled directly — see app/api/auth/google/route.ts
    // google: {
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // },

    // Apple sign-in — uncomment when APPLE_CLIENT_ID + APPLE_CLIENT_SECRET are set
    // apple: {
    //   clientId: process.env.APPLE_CLIENT_ID!,
    //   clientSecret: process.env.APPLE_CLIENT_SECRET!,
    // },
  },

  trustedOrigins: [process.env.BETTER_AUTH_URL ?? "http://localhost:3000"],
})
