// // app/contexts/auth-provider.tsx
// "use client"

// import type React from "react"
// import { createContext, useContext, useEffect, useState } from "react"
// import { usePathname, useRouter } from "next/navigation"
// import type { DecodedToken } from "@/lib/auth"
// import { toast } from "react-hot-toast"

// interface AuthContextType {
//   isAuthenticated: boolean
//   user: DecodedToken | null
//   isLoading: boolean
//   login: (email: string, password: string) => Promise<boolean>
//   logout: () => Promise<void>
//   refreshAuth: () => Promise<void>
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<DecodedToken | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const pathname = usePathname()
//   const router = useRouter()

//   const login = async (email: string, password: string): Promise<boolean> => {
//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ email, password }),
//       })

//       const data = await res.json()

//       if (res.ok && data.success) {
//         setUser(data.user)

//         // ✅ Show personalized toast
//         toast.success(`Welcome back, ${data.user.name || "User"}!`)

//         // ✅ Refresh auth context
//         await refreshAuth()

//         // ✅ Redirect to home page
//         router.push("/")
//         router.refresh()

//         return true
//       } else {
//         toast.error(data.message || "Login failed")
//         return false
//       }
//     } catch (error) {
//       console.error("Login error:", error)
//       toast.error("Login failed. Please try again.")
//       return false
//     }
//   }

//   const logout = async () => {
//     try {
//       const res = await fetch("/api/auth/logout", {
//         method: "POST",
//         credentials: "include",
//       })

//       if (res.ok) {
//         setUser(null)
//         toast.success("Logged out successfully!")
//         router.push("/")
//         router.refresh()
//       } else {
//         toast.error("Logout failed.")
//       }
//     } catch (error) {
//       console.error("Logout error:", error)
//       toast.error("Error during logout.")
//     }
//   }

//   const checkAuth = async () => {
//     try {
//       const res = await fetch("/api/auth/me", {
//         method: "GET",
//         credentials: "include",
//       })

//       const data = await res.json()

//       if (res.ok && data.success && data.user) {
//         setUser(data.user)
//       } else {
//         setUser(null)
//       }
//     } catch (error) {
//       console.error("Auth check error:", error)
//       setUser(null)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const refreshAuth = async () => {
//     await checkAuth()
//   }

//   useEffect(() => {
//     checkAuth()
//   }, [pathname])

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated: !!user,
//         user,
//         isLoading,
//         login,
//         logout,
//         refreshAuth,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }


"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import type { DecodedToken } from "@/lib/auth"
import { toast } from "react-hot-toast"

interface AuthContextType {
  isAuthenticated: boolean
  user: DecodedToken | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  refreshAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DecodedToken | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  const router = useRouter()

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      })
      const data = await res.json()

      if (res.ok && data.success && data.user) {
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Auth check error:", error)
      setUser(null)
    } finally {
      setIsLoading(false)
      setIsInitialized(true)
    }
  }, [])

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        setIsLoading(true)
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        })
        const data = await res.json()

        if (res.ok && data.success) {
          setUser(data.user)
          toast.success(`Welcome back, ${data.user.name || "User"}!`)
          router.push("/")
          return true
        } else {
          toast.error(data.message || "Login failed")
          return false
        }
      } catch (error) {
        console.error("Login error:", error)
        toast.error("Login failed. Please try again.")
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [router],
  )

  const logout = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })

      if (res.ok) {
        setUser(null)
        toast.success("Logged out successfully!")
        router.push("/")
      } else {
        toast.error("Logout failed.")
      }
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Error during logout.")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const refreshAuth = useCallback(async () => {
    if (!isInitialized) return
    await checkAuth()
  }, [checkAuth, isInitialized])

  // Only run auth check once on mount
  useEffect(() => {
    if (!isInitialized) {
      checkAuth()
    }
  }, [checkAuth, isInitialized])

  const contextValue = {
    isAuthenticated: !!user,
    user,
    isLoading,
    login,
    logout,
    refreshAuth,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
