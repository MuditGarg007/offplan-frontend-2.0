import { API_BASE } from "@/lib/api/config"

export const TOKEN_STORAGE_KEY = "token"
export const EMAIL_STORAGE_KEY = "email"
export const ROLE_STORAGE_KEY = "role"
export const AUTH_EVENT = "offplan-auth-changed"

export interface AuthTokenResponse {
  token: string
  email: string
}

export interface AuthUser {
  email: string
  role: string
}

export interface ApiError {
  detail?: string
}

export function getStoredToken() {
  if (typeof window === "undefined") return null
  return window.localStorage.getItem(TOKEN_STORAGE_KEY)
}

export function getStoredEmail() {
  if (typeof window === "undefined") return null
  return window.localStorage.getItem(EMAIL_STORAGE_KEY)
}

export function getStoredRole() {
  if (typeof window === "undefined") return null
  return window.localStorage.getItem(ROLE_STORAGE_KEY)
}

export function persistAuth(data: AuthTokenResponse, role?: string) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(TOKEN_STORAGE_KEY, data.token)
  window.localStorage.setItem(EMAIL_STORAGE_KEY, data.email)
  if (role) {
    window.localStorage.setItem(ROLE_STORAGE_KEY, role)
  }
  window.dispatchEvent(new Event(AUTH_EVENT))
}

export function clearStoredAuth() {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(TOKEN_STORAGE_KEY)
  window.localStorage.removeItem(EMAIL_STORAGE_KEY)
  window.localStorage.removeItem(ROLE_STORAGE_KEY)
  window.dispatchEvent(new Event(AUTH_EVENT))
}

export async function parseApiError(res: Response) {
  const error = (await res.json().catch(() => ({}))) as ApiError
  return error.detail ?? `HTTP ${res.status}`
}

export async function loginWithPassword(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    throw new Error(await parseApiError(res))
  }

  return (await res.json()) as AuthTokenResponse
}

export async function registerWithPassword(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    throw new Error(await parseApiError(res))
  }

  return (await res.json()) as AuthTokenResponse
}

export async function fetchCurrentUser(token: string) {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error(await parseApiError(res))
  }

  return (await res.json()) as AuthUser
}

export function isPasswordStrong(password: string) {
  return (
    password.length >= 12 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  )
}

export function getPasswordRequirementsMessage(password: string) {
  if (password.length < 12) return "Password must be at least 12 characters."
  if (!/[A-Z]/.test(password)) return "Password must include at least one uppercase letter."
  if (!/[a-z]/.test(password)) return "Password must include at least one lowercase letter."
  if (!/\d/.test(password)) return "Password must include at least one digit."
  if (!/[^A-Za-z0-9]/.test(password)) {
    return "Password must include at least one special character."
  }
  return null
}
