"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { SessionProvider, useSession } from "next-auth/react"

interface User {
  id: string
  name: string
  email: string
  image: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
})

export const useAuth = () => useContext(AuthContext)

function AuthProviderInner({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.email || "",
        name: session.user.name || "",
        email: session.user.email || "",
        image: session.user.image || "",
      })
    } else {
      setUser(null)
    }
  }, [session])

  return (
    <AuthContext.Provider value={{ user, isLoading: status === "loading" }}>
      {children}
    </AuthContext.Provider>
  )
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProviderInner>{children}</AuthProviderInner>
    </SessionProvider>
  )
} 