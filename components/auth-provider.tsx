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
            // Don't set user if API fails - this will prevent likes/comments from working
            // but it's better than using incorrect user ID format
            setUser(null)
          }
        } catch (error) {
          console.error('Error creating/getting user:', error)
          // Don't set user if API fails - this will prevent likes/comments from working
          // but it's better than using incorrect user ID format
          setUser(null)
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