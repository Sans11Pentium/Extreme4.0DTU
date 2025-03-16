"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type UserRole = "landlord" | "tenant" | "legal" | null

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  profileComplete: boolean
}

interface UserContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string) => {
    // This would be an API call in a real application
    // For demo purposes, we'll simulate different user roles

    let mockUser: User

    if (email.includes("landlord")) {
      mockUser = {
        id: "1",
        name: "John Doe",
        email,
        role: "landlord",
        profileComplete: true,
      }
    } else if (email.includes("tenant")) {
      mockUser = {
        id: "2",
        name: "Jane Smith",
        email,
        role: "tenant",
        profileComplete: true,
      }
    } else if (email.includes("legal")) {
      mockUser = {
        id: "3",
        name: "Robert Law",
        email,
        role: "legal",
        profileComplete: true,
      }
    } else {
      mockUser = {
        id: "4",
        name: "New User",
        email,
        role: "landlord",
        profileComplete: false,
      }
    }

    setUser(mockUser)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

