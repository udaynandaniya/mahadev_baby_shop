"use client"

import type React from "react"

import { useAuth } from "@/app/contexts/auth-provider"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import AdminHeader from "./admin-header"


interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      redirect("/auth/login")
    }
  }, [user, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  if (!user || !user.isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-950 dark:via-orange-950/30 dark:to-red-950/30">
      <AdminHeader />
      <main className="relative z-10">{children}</main>
    </div>
  )
}
