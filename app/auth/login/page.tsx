
"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Baby, ArrowLeft, Mail, Lock, Sparkles, Crown, Gift, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedBackground } from "@/components/animated-background"

import { toast } from "react-hot-toast"
import { useAuth } from "@/app/contexts/auth-provider"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.")
      return
    }
    setIsLoading(true)
    try {
      const success = await login(formData.email, formData.password)
      if (success) {
        router.push("/")
      }
    } catch (error) {
      toast.error("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-gray-950 dark:via-purple-950/30 dark:to-blue-950/30">
      <AnimatedBackground />

      {/* Header Icons */}
      <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none overflow-hidden z-10">
        <div className="absolute top-2 left-10 text-pink-200/20 dark:text-pink-300/25 animate-bounce">
          <Baby className="h-4 w-4" />
        </div>
        <div className="absolute top-4 left-32 text-purple-200/20 dark:text-purple-300/25 animate-pulse">
          <Star className="h-3 w-3" />
        </div>
        <div
          className="absolute top-1 right-20 text-blue-200/20 dark:text-blue-300/25 animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          <Gift className="h-5 w-5" />
        </div>
        <div
          className="absolute top-5 right-40 text-yellow-200/20 dark:text-yellow-300/25 animate-pulse"
          style={{ animationDelay: "2s" }}
        >
          <Crown className="h-4 w-4" />
        </div>
        <div
          className="absolute top-2 left-1/2 text-green-200/20 dark:text-green-300/25 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          <Sparkles className="h-3 w-3" />
        </div>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4 relative z-20">
        <div className="absolute top-4 md:top-6 left-4 md:left-6">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
        </div>

        <div className="absolute top-4 md:top-6 right-4 md:right-6">
          <ThemeToggle />
        </div>

        <Card className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-2xl shadow-pink-500/10 dark:shadow-purple-500/20">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-xl shadow-pink-500/25 dark:shadow-pink-500/40">
                <Baby className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">Sign in to your Mahadev Baby Shop account</p>
          </CardHeader>

          <CardContent className="px-4 md:px-6">
            <form onSubmit={handleLogin} className="space-y-4 md:space-y-5">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="pl-10 pr-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-6 text-base font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-pink-600 dark:text-pink-400 hover:underline font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
