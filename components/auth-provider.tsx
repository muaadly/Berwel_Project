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
      // First, create or get the user from the database
      const createOrGetUser = async () => {
        try {
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: session.user?.email || "",
              name: session.user?.name || "",
              image: session.user?.image || ""
            }),
          })
          
          if (response.ok) {
            const userData = await response.json()
            setUser({
              id: userData.id, // Use the actual database ID
              name: userData.name,
              email: userData.email,
              image: userData.image,
            })
          } else {
            // Fallback to email if API fails
            setUser({
              id: session.user?.email || "",
              name: session.user?.name || "",
              email: session.user?.email || "",
              image: session.user?.image || "",
            })
          }
        } catch (error) {
          console.error('Error creating/getting user:', error)
          // Fallback to email if API fails
          setUser({
            id: session.user?.email || "",
            name: session.user?.name || "",
            email: session.user?.email || "",
            image: session.user?.image || "",
          })
        }
      }
      
      createOrGetUser()
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