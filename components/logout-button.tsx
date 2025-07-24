"use client"

import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/app/contexts/auth-provider"

export default function LogoutButton() {
  const { logout } = useAuth()

  return (
    <Button
      onClick={logout}
      variant="outline"
      size="sm"
      className="gap-2 bg-transparent hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20 dark:hover:text-red-400"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </Button>
  )
}
