// context/AuthContext.js
// Auth state and provider live here, per team convention — nowhere else.

import { createContext, useContext, useEffect, useState, useCallback, createElement } from "react"
import * as api from "@/services/api"

const AUTH_STORAGE_KEY = "taskflow.auth"

const AuthContext = createContext(undefined)

function readStoredAuth() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeStoredAuth(auth) {
  if (auth) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth))
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Rehydrate on load
  useEffect(() => {
    const stored = readStoredAuth()
    if (stored?.token) {
      setToken(stored.token)
      setUser(stored.user ?? null)
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async ({ email, password }) => {
    const { token: newToken, user: newUser } = await api.loginUser({ email, password })
    setToken(newToken)
    setUser(newUser)
    writeStoredAuth({ token: newToken, user: newUser })
    return newUser
  }, [])

  const register = useCallback(async ({ name, email, password }) => {
    const { token: newToken, user: newUser } = await api.registerUser({ name, email, password })
    setToken(newToken)
    setUser(newUser)
    writeStoredAuth({ token: newToken, user: newUser })
    return newUser
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    writeStoredAuth(null)
  }, [])

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    isLoading,
    login,
    register,
    logout,
  }

  return createElement(AuthContext.Provider, { value }, children)
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return ctx
}
