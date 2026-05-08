"use client"

import * as React from "react"
import {
  clearStoredAuth,
  fetchCurrentUser,
  getStoredToken,
  persistAuth,
  registerWithPassword,
  type AuthUser,
  loginWithPassword,
} from "@/lib/auth"
import { createSession, PENDING_SESSION_KEY } from "@/lib/api/sessions"

interface AuthContextValue {
  user: AuthUser | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<AuthUser>
  register: (email: string, password: string) => Promise<AuthUser>
  logout: () => void
  refreshUser: () => Promise<AuthUser | null>
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

async function resolveAuthenticatedUser(token: string) {
  const user = await fetchCurrentUser(token)
  persistAuth({ token, email: user.email }, user.role)
  return user
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null)
  const [token, setToken] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  const syncFromStorage = React.useCallback(async () => {
    const storedToken = getStoredToken()

    if (!storedToken) {
      setToken(null)
      setUser(null)
      setIsLoading(false)
      return null
    }

    setToken(storedToken)

    try {
      const currentUser = await resolveAuthenticatedUser(storedToken)
      setUser(currentUser)
      return currentUser
    } catch {
      clearStoredAuth()
      setToken(null)
      setUser(null)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void syncFromStorage()
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [syncFromStorage])

  const claimPendingSession = React.useCallback(async (token: string) => {
    const pendingId = window.localStorage.getItem(PENDING_SESSION_KEY)
    if (!pendingId) return
    window.localStorage.removeItem(PENDING_SESSION_KEY)
    try {
      await createSession({ clientSessionId: pendingId, token })
    } catch {
      // claiming is best-effort; don't break login flow
    }
  }, [])

  const login = React.useCallback(async (email: string, password: string) => {
    const data = await loginWithPassword(email, password)
    persistAuth(data)
    setToken(data.token)
    const currentUser = await resolveAuthenticatedUser(data.token)
    setUser(currentUser)
    await claimPendingSession(data.token)
    return currentUser
  }, [claimPendingSession])

  const register = React.useCallback(async (email: string, password: string) => {
    const data = await registerWithPassword(email, password)
    persistAuth(data)
    setToken(data.token)
    const currentUser = await resolveAuthenticatedUser(data.token)
    setUser(currentUser)
    await claimPendingSession(data.token)
    return currentUser
  }, [claimPendingSession])

  const logout = React.useCallback(() => {
    clearStoredAuth()
    setToken(null)
    setUser(null)
  }, [])

  const refreshUser = React.useCallback(async () => {
    const storedToken = getStoredToken()

    if (!storedToken) {
      clearStoredAuth()
      setToken(null)
      setUser(null)
      return null
    }

    setToken(storedToken)

    try {
      const currentUser = await resolveAuthenticatedUser(storedToken)
      setUser(currentUser)
      return currentUser
    } catch {
      clearStoredAuth()
      setToken(null)
      setUser(null)
      return null
    }
  }, [])

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: Boolean(user && token),
    login,
    register,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.")
  }

  return context
}
