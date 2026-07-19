import type { ReactNode } from "react"
import type { User } from "@/types"

export interface AuthContextValue {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: { email: string; password: string }) => Promise<User>
  register: (details: { name: string; email: string; password: string }) => Promise<User>
  logout: () => void
}

export function AuthProvider(props: { children: ReactNode }): JSX.Element
export function useAuth(): AuthContextValue
