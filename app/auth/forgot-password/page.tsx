"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Baby, ArrowLeft, Mail, Lock, Sparkles, Crown, Gift, Star, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedBackground } from "@/components/animated-background"
import { toast } from "react-hot-toast"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1) // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)
  const router = useRouter()

  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendTimer <= 0) return
    const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
    return () => clearTimeout(timer)
  }, [resendTimer])

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error("Please enter your email address")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/forgot-password/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()

      if (response.ok && data.success) {
        toast.success("OTP sent to your email!")
        setStep(2)
        setResendTimer(60) // 60 seconds countdown
      } else {
        toast.error(data.message || "Failed to send OTP")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp) {
      toast.error("Please enter the OTP")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/forgot-password/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      })
      const data = await response.json()

      if (response.ok && data.success) {
        toast.success("OTP verified successfully!")
        setStep(3)
      } else {
        toast.error(data.message || "Invalid OTP")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields")
      return
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long")
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/forgot-password/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      })
      const data = await response.json()

      if (response.ok && data.success) {
        toast.success("Password reset successfully!")
        setTimeout(() => router.push("/auth/login"), 2000)
      } else {
        toast.error(data.message || "Failed to reset password")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    if (resendTimer > 0) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/forgot-password/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()

      if (response.ok && data.success) {
        toast.success("New OTP sent to your email!")
        setResendTimer(60)
      } else {
        toast.error(data.message || "Failed to resend OTP")
      }
    } catch (error) {
      toast.error("Something went wrong")
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
          <Link href="/auth/login">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Login</span>
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
              Reset Password
            </CardTitle>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i <= step ? "bg-gradient-to-r from-pink-500 to-purple-500" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-2">Step {step} of 3</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {step === 1 ? "Enter your email address" : step === 2 ? "Verify your email" : "Set new password"}
            </p>
          </CardHeader>

          <CardContent className="px-4 md:px-6">
            {/* Step 1: Email */}
            {step === 1 && (
              <form onSubmit={handleSendOTP} className="space-y-4 md:space-y-5">
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your registered email"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-6 text-base font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending OTP...
                    </div>
                  ) : (
                    "Send Reset Code"
                  )}
                </Button>
              </form>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <form onSubmit={handleVerifyOTP} className="space-y-4 md:space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We've sent a verification code to
                    <br />
                    <strong className="text-foreground">{email}</strong>
                  </p>
                </div>

                <div>
                  <Label htmlFor="otp" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Verification Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    maxLength={6}
                    className="text-center text-2xl tracking-widest mt-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="000000"
                    required
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Verifying...
                      </div>
                    ) : (
                      "Verify Code"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90"
                    onClick={handleResendOTP}
                    disabled={resendTimer > 0 || isLoading}
                  >
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => setStep(1)}
                    disabled={isLoading}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Change Email
                  </Button>
                </div>
              </form>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <form onSubmit={handleResetPassword} className="space-y-4 md:space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Set New Password</h3>
                  <p className="text-sm text-muted-foreground">Choose a strong password for your account</p>
                </div>

                <div>
                  <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    New Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="newPassword"
                      type="password"
                      className="pl-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      className="pl-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Resetting Password...
                      </div>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => setStep(2)}
                    disabled={isLoading}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Verification
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link href="/auth/login" className="text-pink-600 dark:text-pink-400 hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
