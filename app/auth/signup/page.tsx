// // // C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\app\auth\signup\page.tsx
// // "use client"

// // import type React from "react"

// // import { useState } from "react"
// // import { useRouter } from "next/navigation"
// // import Link from "next/link"
// // import {
// //   Eye,
// //   EyeOff,
// //   Baby,
// //   ArrowLeft,
// //   Mail,
// //   Phone,
// //   User,
// //   Lock,
// //   MapPin,
// //   Sparkles,
// //   Crown,
// //   Gift,
// //   Star,
// // } from "lucide-react"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Checkbox } from "@/components/ui/checkbox"
// // import LocationSelector from "@/components/location-selector"
// // import { ThemeToggle } from "@/components/theme-toggle"
// // import { AnimatedBackground } from "@/components/animated-background"
// // import { toast } from "react-hot-toast"


// // interface AddressData {
// //   street: string
// //   area: string
// //   state: string
// //   district: string
// //   subDistrict: string
// //   village: string
// //   pincode: string
// // }

// // export default function SignupPage() {
// //   const [step, setStep] = useState(1)
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     password: "",
// //     confirmPassword: "",
// //     address: {
// //       street: "",
// //       area: "",
// //       state: "",
// //       district: "",
// //       subDistrict: "",
// //       village: "",
// //       pincode: "",
// //     } as AddressData,
// //     terms: false,
// //   })
// //   const [otp, setOtp] = useState("")
// //   const [showPassword, setShowPassword] = useState(false)
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
// //   const [isLoading, setIsLoading] = useState(false)
// //   const router = useRouter()


// // const handleSendOTP = async (e: React.FormEvent) => {
// //   e.preventDefault()
// //   if (formData.password !== formData.confirmPassword) {
// //     toast.error("Passwords do not match")
// //     return
// //   }
// //   if (!formData.name || !formData.email || !formData.phone || !formData.password) {
// //     toast.error("Please fill in all required basic information.")
// //     return
// //   }

// //   setIsLoading(true)
// //   try {
// //     const response = await fetch("/api/auth/send-otp", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({
// //         email: formData.email,
// //         phone: formData.phone,
// //         name: formData.name,
// //       }),
// //     })
// //     const data = await response.json()

// //     if (response.ok && data.success) {
// //       toast.success("OTP sent to your email!")
// //       setStep(2)
// //     } else {
// //       toast.error(data.message || "Failed to send OTP")
// //     }
// //   } catch (error) {
// //     toast.error("Something went wrong")
// //   } finally {
// //     setIsLoading(false)
// //   }
// // }

// // const handleVerifyOTP = async (e: React.FormEvent) => {
// //   e.preventDefault()
// //   if (!otp) {
// //     toast.error("Please enter the OTP.")
// //     return
// //   }

// //   setIsLoading(true)
// //   try {
// //     const response = await fetch("/api/auth/verify-otp", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({
// //         email: formData.email,
// //         otp,
// //       }),
// //     })
// //     const data = await response.json()

// //     if (response.ok && data.success) {
// //       toast.success("Email verified!")
// //       setStep(3)
// //     } else {
// //       toast.error(data.message || "Invalid OTP")
// //     }
// //   } catch (error) {
// //     toast.error("Something went wrong")
// //   } finally {
// //     setIsLoading(false)
// //   }
// // }

// // const handleCompleteSignup = async (e: React.FormEvent) => {
// //   e.preventDefault()
// //   const { street, area, state, district, subDistrict, village, pincode } = formData.address
// //   if (!street || !area || !state || !district || !subDistrict || !village || !pincode) {
// //     toast.error("Please fill in all address details")
// //     return
// //   }
// //   // if (!formData.terms) {
// //   //   toast.error("Please accept the terms and conditions")
// //   //   return
// //   // }

// //   setIsLoading(true)
// //   try {
// //     const response = await fetch("/api/auth/signup", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({
// //         name: formData.name,
// //         email: formData.email,
// //         phone: formData.phone,
// //         password: formData.password,
// //         address: formData.address,
// //       }),
// //     })
// //     const data = await response.json()

// //     if (response.ok && data.success) {
// //       const isAdmin = formData.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
// //       toast.success(`Account created successfully! ${isAdmin ? "Admin privileges granted." : ""}`)
// //       router.push("/")
// //     } else {
// //       toast.error(data.message || "Signup failed.")
// //     }
// //   } catch (error) {
// //     toast.error("Something went wrong")
// //   } finally {
// //     setIsLoading(false)
// //   }
// // }

// //   const handleAddressChange = (address: AddressData) => {
// //     setFormData({ ...formData, address })
// //   }

// //   return (
// //     <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-gray-950 dark:via-purple-950/30 dark:to-blue-950/30">
// //       <AnimatedBackground />

// //       {/* Header Icons */}
// //       <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none overflow-hidden z-10">
// //         <div className="absolute top-2 left-10 text-pink-200/20 dark:text-pink-300/25 animate-bounce">
// //           <Baby className="h-4 w-4" />
// //         </div>
// //         <div className="absolute top-4 left-32 text-purple-200/20 dark:text-purple-300/25 animate-pulse">
// //           <Star className="h-3 w-3" />
// //         </div>
// //         <div
// //           className="absolute top-1 right-20 text-blue-200/20 dark:text-blue-300/25 animate-bounce"
// //           style={{ animationDelay: "1s" }}
// //         >
// //           <Gift className="h-5 w-5" />
// //         </div>
// //         <div
// //           className="absolute top-5 right-40 text-yellow-200/20 dark:text-yellow-300/25 animate-pulse"
// //           style={{ animationDelay: "2s" }}
// //         >
// //           <Crown className="h-4 w-4" />
// //         </div>
// //         <div
// //           className="absolute top-2 left-1/2 text-green-200/20 dark:text-green-300/25 animate-bounce"
// //           style={{ animationDelay: "0.5s" }}
// //         >
// //           <Sparkles className="h-3 w-3" />
// //         </div>
// //       </div>

// //       <div className="flex items-center justify-center min-h-screen p-4 relative z-20">
// //         <div className="absolute top-4 md:top-6 left-4 md:left-6">
// //           <Link href="/">
// //             <Button
// //               variant="outline"
// //               size="sm"
// //               className="gap-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90"
// //             >
// //               <ArrowLeft className="w-4 h-4" />
// //               <span className="hidden sm:inline">Back to Home</span>
// //               <span className="sm:hidden">Back</span>
// //             </Button>
// //           </Link>
// //         </div>

// //         <div className="absolute top-4 md:top-6 right-4 md:right-6">
// //           <ThemeToggle />
// //         </div>

// //         <Card className="w-full max-w-md md:max-w-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-2xl shadow-pink-500/10 dark:shadow-purple-500/20">
// //           <CardHeader className="text-center pb-6">
// //             <div className="flex justify-center mb-4">
// //               <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-xl shadow-pink-500/25 dark:shadow-pink-500/40">
// //                 <Baby className="w-8 h-8 md:w-10 md:h-10 text-white" />
// //               </div>
// //             </div>
// //             <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
// //               Join Mahadev Baby Shop
// //             </CardTitle>
// //             <div className="flex items-center justify-center gap-2 mt-2">
// //               <div className="flex items-center gap-1">
// //                 {[1, 2, 3].map((i) => (
// //                   <div
// //                     key={i}
// //                     className={`w-2 h-2 rounded-full transition-all duration-300 ${
// //                       i <= step ? "bg-gradient-to-r from-pink-500 to-purple-500" : "bg-gray-300 dark:bg-gray-600"
// //                     }`}
// //                   />
// //                 ))}
// //               </div>
// //               <span className="text-sm text-muted-foreground ml-2">Step {step} of 3</span>
// //             </div>
// //             <p className="text-sm text-muted-foreground mt-2">
// //               {step === 1 ? "Basic Information" : step === 2 ? "Verify Your Email" : "Complete Your Profile"}
// //             </p>
// //           </CardHeader>

// //           <CardContent className="px-4 md:px-6">
// //             {/* Step 1: Basic Info */}
// //             {step === 1 && (
// //               <form onSubmit={handleSendOTP} className="space-y-4 md:space-y-5">
// //                 <div>
// //                   <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
// //                     Full Name <span className="text-red-500">*</span>
// //                   </Label>
// //                   <div className="relative mt-1">
// //                     <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
// //                     <Input
// //                       id="name"
// //                       className="pl-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500"
// //                       value={formData.name}
// //                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //                       placeholder="Enter your full name"
// //                       required
// //                     />
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
// //                     Email Address <span className="text-red-500">*</span>
// //                   </Label>
// //                   <div className="relative mt-1">
// //                     <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
// //                     <Input
// //                       id="email"
// //                       type="email"
// //                       className="pl-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500"
// //                       value={formData.email}
// //                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //                       placeholder="Enter your email"
// //                       required
// //                     />
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
// //                     Phone Number <span className="text-red-500">*</span>
// //                   </Label>
// //                   <div className="relative mt-1">
// //                     <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
// //                     <Input
// //                       id="phone"
// //                       type="tel"
// //                       className="pl-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500"
// //                       value={formData.phone}
// //                       onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
// //                       placeholder="Enter your phone number"
// //                       required
// //                     />
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
// //                     Password <span className="text-red-500">*</span>
// //                   </Label>
// //                   <div className="relative mt-1">
// //                     <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
// //                     <Input
// //                       id="password"
// //                       type={showPassword ? "text" : "password"}
// //                       className="pl-10 pr-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500"
// //                       value={formData.password}
// //                       onChange={(e) => setFormData({ ...formData, password: e.target.value })}
// //                       placeholder="Create a password"
// //                       required
// //                     />
// //                     <Button
// //                       type="button"
// //                       variant="ghost"
// //                       size="sm"
// //                       className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
// //                       onClick={() => setShowPassword(!showPassword)}
// //                     >
// //                       {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //                     </Button>
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
// //                     Confirm Password <span className="text-red-500">*</span>
// //                   </Label>
// //                   <div className="relative mt-1">
// //                     <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
// //                     <Input
// //                       id="confirmPassword"
// //                       type={showConfirmPassword ? "text" : "password"}
// //                       className="pl-10 pr-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500"
// //                       value={formData.confirmPassword}
// //                       onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
// //                       placeholder="Confirm your password"
// //                       required
// //                     />
// //                     <Button
// //                       type="button"
// //                       variant="ghost"
// //                       size="sm"
// //                       className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
// //                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //                     >
// //                       {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //                     </Button>
// //                   </div>
// //                 </div>

// //                 <Button
// //                   type="submit"
// //                   className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-6 text-base font-semibold"
// //                   disabled={isLoading}
// //                 >
// //                   {isLoading ? (
// //                     <div className="flex items-center gap-2">
// //                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// //                       Sending OTP...
// //                     </div>
// //                   ) : (
// //                     "Send Verification Code"
// //                   )}
// //                 </Button>
// //               </form>
// //             )}

// //             {/* Step 2: Verify OTP */}
// //             {step === 2 && (
// //               <form onSubmit={handleVerifyOTP} className="space-y-4 md:space-y-6">
// //                 <div className="text-center mb-6">
// //                   <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
// //                     <Mail className="w-8 h-8 text-white" />
// //                   </div>
// //                   <p className="text-sm text-muted-foreground">
// //                     We've sent a verification code to
// //                     <br />
// //                     <strong className="text-foreground">{formData.email}</strong>
// //                   </p>
// //                 </div>

// //                 <div>
// //                   <Label htmlFor="otp" className="text-sm font-medium text-gray-700 dark:text-gray-300">
// //                     Verification Code <span className="text-red-500">*</span>
// //                   </Label>
// //                   <Input
// //                     id="otp"
// //                     type="text"
// //                     maxLength={6}
// //                     className="text-center text-2xl tracking-widest mt-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500"
// //                     value={otp}
// //                     onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
// //                     placeholder="000000"
// //                     required
// //                   />
// //                 </div>

// //                 <div className="flex flex-col sm:flex-row gap-3">
// //                   <Button
// //                     type="button"
// //                     variant="outline"
// //                     className="flex-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90"
// //                     onClick={() => setStep(1)}
// //                     disabled={isLoading}
// //                   >
// //                     <ArrowLeft className="mr-2 h-4 w-4" />
// //                     Back
// //                   </Button>
// //                   <Button
// //                     type="submit"
// //                     className="flex-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
// //                     disabled={isLoading}
// //                   >
// //                     {isLoading ? (
// //                       <div className="flex items-center gap-2">
// //                         <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// //                         Verifying...
// //                       </div>
// //                     ) : (
// //                       "Verify Email"
// //                     )}
// //                   </Button>
// //                 </div>
// //               </form>
// //             )}

// //             {/* Step 3: Address Details */}
// //             {step === 3 && (
// //               <form onSubmit={handleCompleteSignup} className="space-y-4 md:space-y-6">
// //                 <div className="text-center mb-6">
// //                   <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
// //                     <MapPin className="w-8 h-8 text-white" />
// //                   </div>
// //                   <h3 className="text-lg font-semibold">Complete Your Address</h3>
// //                   <p className="text-sm text-muted-foreground">Fill in your complete address details</p>
// //                 </div>

// //                 <LocationSelector value={formData.address} onChange={handleAddressChange} required />

// //                 {/* <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30 rounded-xl border border-pink-200/50 dark:border-purple-700/50">
// //                   <Checkbox
// //                     id="terms"
// //                     checked={formData.terms}
// //                     onCheckedChange={(checked) => setFormData({ ...formData, terms: !!checked })}
// //                     required
// //                     className="mt-1"
// //                   />
// //                   <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
// //                     I agree to the{" "}
// //                     <Link href="/terms" className="text-pink-600 dark:text-pink-400 hover:underline font-medium">
// //                       Terms and Conditions
// //                     </Link>{" "}
// //                     and{" "}
// //                     <Link href="/privacy" className="text-pink-600 dark:text-pink-400 hover:underline font-medium">
// //                       Privacy Policy
// //                     </Link>
// //                   </Label>
// //                 </div> */}

// //                 <div className="flex flex-col sm:flex-row gap-3">
// //                   <Button
// //                     type="button"
// //                     variant="outline"
// //                     className="flex-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90"
// //                     onClick={() => setStep(2)}
// //                     disabled={isLoading}
// //                   >
// //                     <ArrowLeft className="mr-2 h-4 w-4" />
// //                     Back
// //                   </Button>
// //                   <Button
// //                     type="submit"
// //                     className="flex-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
// //                     disabled={isLoading}
// //                   >
// //                     {isLoading ? (
// //                       <div className="flex items-center gap-2">
// //                         <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// //                         Creating Account...
// //                       </div>
// //                     ) : (
// //                       "Complete Registration"
// //                     )}
// //                   </Button>
// //                 </div>
// //               </form>
// //             )}

// //             <div className="mt-6 text-center">
// //               <p className="text-sm text-muted-foreground">
// //                 Already have an account?{" "}
// //                 <Link href="/auth/login" className="text-pink-600 dark:text-pink-400 hover:underline font-medium">
// //                   Sign in here
// //                 </Link>
// //               </p>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   )
// // }

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import {
//   Eye,
//   EyeOff,
//   Baby,
//   ArrowLeft,
//   Mail,
//   Phone,
//   User,
//   Lock,
//   MapPin,
//   Sparkles,
//   Crown,
//   Gift,
//   Star,
//   CheckCircle,
//   XCircle,
//   Loader2,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import LocationSelector from "@/components/location-selector"
// import { ThemeToggle } from "@/components/theme-toggle"
// import { AnimatedBackground } from "@/components/animated-background"
// import { toast } from "react-hot-toast"

// interface AddressData {
//   street: string
//   area: string
//   state: string
//   district: string
//   subDistrict: string
//   village: string
//   pincode: string
// }

// interface ValidationState {
//   name: { isValid: boolean; message: string; isChecking: boolean }
//   email: { isValid: boolean; message: string; isChecking: boolean }
//   phone: { isValid: boolean; message: string; isChecking: boolean }
//   password: { isValid: boolean; message: string; isChecking: boolean }
//   confirmPassword: { isValid: boolean; message: string; isChecking: boolean }
// }

// export default function SignupPage() {
//   const [step, setStep] = useState(1)
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     address: {
//       street: "",
//       area: "",
//       state: "",
//       district: "",
//       subDistrict: "",
//       village: "",
//       pincode: "",
//     } as AddressData,
//     terms: false,
//   })
//   const [otp, setOtp] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [validation, setValidation] = useState<ValidationState>({
//     name: { isValid: false, message: "", isChecking: false },
//     email: { isValid: false, message: "", isChecking: false },
//     phone: { isValid: false, message: "", isChecking: false },
//     password: { isValid: false, message: "", isChecking: false },
//     confirmPassword: { isValid: false, message: "", isChecking: false },
//   })
//   const router = useRouter()

//   // Debounce function for API calls
//   const useDebounce = (value: string, delay: number) => {
//     const [debouncedValue, setDebouncedValue] = useState(value)
//     useEffect(() => {
//       const handler = setTimeout(() => {
//         setDebouncedValue(value)
//       }, delay)
//       return () => {
//         clearTimeout(handler)
//       }
//     }, [value, delay])
//     return debouncedValue
//   }

//   const debouncedEmail = useDebounce(formData.email, 500)
//   const debouncedPhone = useDebounce(formData.phone, 500)

//   // Validate name
//   useEffect(() => {
//     if (formData.name) {
//       const isValid = formData.name.length >= 2
//       setValidation((prev) => ({
//         ...prev,
//         name: {
//           isValid,
//           message: isValid ? "Name looks good!" : "Name must be at least 2 characters",
//           isChecking: false,
//         },
//       }))
//     } else {
//       setValidation((prev) => ({
//         ...prev,
//         name: { isValid: false, message: "", isChecking: false },
//       }))
//     }
//   }, [formData.name])

//   // Validate email with backend check
//   useEffect(() => {
//     const validateEmail = async () => {
//       if (!debouncedEmail) {
//         setValidation((prev) => ({
//           ...prev,
//           email: { isValid: false, message: "", isChecking: false },
//         }))
//         return
//       }

//       // First check email format
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//       if (!emailRegex.test(debouncedEmail)) {
//         setValidation((prev) => ({
//           ...prev,
//           email: { isValid: false, message: "Invalid email format", isChecking: false },
//         }))
//         return
//       }

//       // Check uniqueness with backend
//       setValidation((prev) => ({
//         ...prev,
//         email: { ...prev.email, isChecking: true },
//       }))

//       try {
//         const response = await fetch("/api/auth/check-email", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email: debouncedEmail }),
//         })
//         const data = await response.json()

//         if (response.ok) {
//           if (data.exists && data.isVerified) {
//             setValidation((prev) => ({
//               ...prev,
//               email: { isValid: false, message: "Email already registered", isChecking: false },
//             }))
//           } else if (data.exists && !data.isVerified) {
//             setValidation((prev) => ({
//               ...prev,
//               email: {
//                 isValid: true,
//                 message: "Email available (previous registration incomplete)",
//                 isChecking: false,
//               },
//             }))
//           } else {
//             setValidation((prev) => ({
//               ...prev,
//               email: { isValid: true, message: "Email available!", isChecking: false },
//             }))
//           }
//         } else {
//           setValidation((prev) => ({
//             ...prev,
//             email: { isValid: false, message: "Error checking email", isChecking: false },
//           }))
//         }
//       } catch (error) {
//         setValidation((prev) => ({
//           ...prev,
//           email: { isValid: false, message: "Error checking email", isChecking: false },
//         }))
//       }
//     }

//     validateEmail()
//   }, [debouncedEmail])

//   // Validate phone with backend check
//   useEffect(() => {
//     const validatePhone = async () => {
//       if (!debouncedPhone) {
//         setValidation((prev) => ({
//           ...prev,
//           phone: { isValid: false, message: "", isChecking: false },
//         }))
//         return
//       }

//       // First check phone format
//       const phoneRegex = /^\+?\d{10,15}$/
//       if (!phoneRegex.test(debouncedPhone)) {
//         setValidation((prev) => ({
//           ...prev,
//           phone: { isValid: false, message: "Invalid phone number format", isChecking: false },
//         }))
//         return
//       }

//       // Check uniqueness with backend
//       setValidation((prev) => ({
//         ...prev,
//         phone: { ...prev.phone, isChecking: true },
//       }))

//       try {
//         const response = await fetch("/api/auth/check-phone", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ phone: debouncedPhone }),
//         })
//         const data = await response.json()

//         if (response.ok) {
//           if (data.exists && data.isVerified) {
//             setValidation((prev) => ({
//               ...prev,
//               phone: { isValid: false, message: "Phone number already registered", isChecking: false },
//             }))
//           } else if (data.exists && !data.isVerified) {
//             setValidation((prev) => ({
//               ...prev,
//               phone: {
//                 isValid: true,
//                 message: "Phone available (previous registration incomplete)",
//                 isChecking: false,
//               },
//             }))
//           } else {
//             setValidation((prev) => ({
//               ...prev,
//               phone: { isValid: true, message: "Phone number available!", isChecking: false },
//             }))
//           }
//         } else {
//           setValidation((prev) => ({
//             ...prev,
//             phone: { isValid: false, message: "Error checking phone", isChecking: false },
//           }))
//         }
//       } catch (error) {
//         setValidation((prev) => ({
//           ...prev,
//           phone: { isValid: false, message: "Error checking phone", isChecking: false },
//         }))
//       }
//     }

//     validatePhone()
//   }, [debouncedPhone])

//   // Validate password
//   useEffect(() => {
//     if (formData.password) {
//       const isValid = formData.password.length >= 6
//       setValidation((prev) => ({
//         ...prev,
//         password: {
//           isValid,
//           message: isValid ? "Password strength: Good" : "Password must be at least 6 characters",
//           isChecking: false,
//         },
//       }))
//     } else {
//       setValidation((prev) => ({
//         ...prev,
//         password: { isValid: false, message: "", isChecking: false },
//       }))
//     }
//   }, [formData.password])

//   // Validate confirm password
//   useEffect(() => {
//     if (formData.confirmPassword) {
//       const isValid = formData.password === formData.confirmPassword
//       setValidation((prev) => ({
//         ...prev,
//         confirmPassword: {
//           isValid,
//           message: isValid ? "Passwords match!" : "Passwords do not match",
//           isChecking: false,
//         },
//       }))
//     } else {
//       setValidation((prev) => ({
//         ...prev,
//         confirmPassword: { isValid: false, message: "", isChecking: false },
//       }))
//     }
//   }, [formData.password, formData.confirmPassword])

//   const handleSendOTP = async (e: React.FormEvent) => {
//     e.preventDefault()

//     // Check all validations
//     const allValid =
//       validation.name.isValid &&
//       validation.email.isValid &&
//       validation.phone.isValid &&
//       validation.password.isValid &&
//       validation.confirmPassword.isValid

//     if (!allValid) {
//       toast.error("Please fix all validation errors before proceeding")
//       return
//     }

//     setIsLoading(true)
//     try {
//       const response = await fetch("/api/auth/send-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: formData.email,
//           phone: formData.phone,
//           name: formData.name,
//         }),
//       })
//       const data = await response.json()
//       if (response.ok && data.success) {
//         toast.success("OTP sent to your email!")
//         setStep(2)
//       } else {
//         toast.error(data.message || "Failed to send OTP")
//       }
//     } catch (error) {
//       toast.error("Something went wrong")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleVerifyOTP = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!otp) {
//       toast.error("Please enter the OTP.")
//       return
//     }
//     setIsLoading(true)
//     try {
//       const response = await fetch("/api/auth/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: formData.email,
//           otp,
//         }),
//       })
//       const data = await response.json()
//       if (response.ok && data.success) {
//         toast.success("Email verified!")
//         setStep(3)
//       } else {
//         toast.error(data.message || "Invalid OTP")
//       }
//     } catch (error) {
//       toast.error("Something went wrong")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleCompleteSignup = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const { street, area, state, district, subDistrict, village, pincode } = formData.address
//     if (!street || !area || !state || !district || !subDistrict || !village || !pincode) {
//       toast.error("Please fill in all address details")
//       return
//     }

//     setIsLoading(true)
//     try {
//       const response = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//           password: formData.password,
//           address: formData.address,
//         }),
//       })
//       const data = await response.json()
//       if (response.ok && data.success) {
//         const isAdmin = formData.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
//         toast.success(`Account created successfully! ${isAdmin ? "Admin privileges granted." : ""}`)
//         router.push("/")
//       } else {
//         toast.error(data.message || "Signup failed.")
//       }
//     } catch (error) {
//       toast.error("Something went wrong")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleAddressChange = (address: AddressData) => {
//     setFormData({ ...formData, address })
//   }

//   const getValidationIcon = (field: keyof ValidationState) => {
//     const fieldValidation = validation[field]
//     if (fieldValidation.isChecking) {
//       return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
//     }
//     if (fieldValidation.isValid) {
//       return <CheckCircle className="w-4 h-4 text-green-500" />
//     }
//     if (fieldValidation.message && !fieldValidation.isValid) {
//       return <XCircle className="w-4 h-4 text-red-500" />
//     }
//     return null
//   }

//   const getInputClassName = (field: keyof ValidationState, baseClassName: string) => {
//     const fieldValidation = validation[field]
//     if (fieldValidation.isValid) {
//       return `${baseClassName} border-green-400 dark:border-green-500 focus:border-green-500 dark:focus:border-green-400`
//     }
//     if (fieldValidation.message && !fieldValidation.isValid) {
//       return `${baseClassName} border-red-400 dark:border-red-500 focus:border-red-500 dark:focus:border-red-400`
//     }
//     return baseClassName
//   }

//   return (
//     <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-gray-950 dark:via-purple-950/30 dark:to-blue-950/30">
//       <AnimatedBackground />

//       {/* Header Icons */}
//       <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none overflow-hidden z-10">
//         <div className="absolute top-2 left-10 text-pink-200/20 dark:text-pink-300/25 animate-bounce">
//           <Baby className="h-4 w-4" />
//         </div>
//         <div className="absolute top-4 left-32 text-purple-200/20 dark:text-purple-300/25 animate-pulse">
//           <Star className="h-3 w-3" />
//         </div>
//         <div
//           className="absolute top-1 right-20 text-blue-200/20 dark:text-blue-300/25 animate-bounce"
//           style={{ animationDelay: "1s" }}
//         >
//           <Gift className="h-5 w-5" />
//         </div>
//         <div
//           className="absolute top-5 right-40 text-yellow-200/20 dark:text-yellow-300/25 animate-pulse"
//           style={{ animationDelay: "2s" }}
//         >
//           <Crown className="h-4 w-4" />
//         </div>
//         <div
//           className="absolute top-2 left-1/2 text-green-200/20 dark:text-green-300/25 animate-bounce"
//           style={{ animationDelay: "0.5s" }}
//         >
//           <Sparkles className="h-3 w-3" />
//         </div>
//       </div>

//       <div className="flex items-center justify-center min-h-screen p-4 relative z-20">
//         <div className="absolute top-4 md:top-6 left-4 md:left-6">
//           <Link href="/">
//             <Button
//               variant="outline"
//               size="sm"
//               className="gap-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90"
//             >
//               <ArrowLeft className="w-4 h-4" />
//               <span className="hidden sm:inline">Back to Home</span>
//               <span className="sm:hidden">Back</span>
//             </Button>
//           </Link>
//         </div>

//         <div className="absolute top-4 md:top-6 right-4 md:right-6">
//           <ThemeToggle />
//         </div>

//         <Card className="w-full max-w-md md:max-w-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-2xl shadow-pink-500/10 dark:shadow-purple-500/20">
//           <CardHeader className="text-center pb-6">
//             <div className="flex justify-center mb-4">
//               <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-xl shadow-pink-500/25 dark:shadow-pink-500/40">
//                 <Baby className="w-8 h-8 md:w-10 md:h-10 text-white" />
//               </div>
//             </div>
//             <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
//               Join Mahadev Baby Shop
//             </CardTitle>
//             <div className="flex items-center justify-center gap-2 mt-2">
//               <div className="flex items-center gap-1">
//                 {[1, 2, 3].map((i) => (
//                   <div
//                     key={i}
//                     className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                       i <= step ? "bg-gradient-to-r from-pink-500 to-purple-500" : "bg-gray-300 dark:bg-gray-600"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-sm text-muted-foreground ml-2">Step {step} of 3</span>
//             </div>
//             <p className="text-sm text-muted-foreground mt-2">
//               {step === 1 ? "Basic Information" : step === 2 ? "Verify Your Email" : "Complete Your Profile"}
//             </p>
//           </CardHeader>

//           <CardContent className="px-4 md:px-6">
//             {/* Step 1: Basic Info */}
//             {step === 1 && (
//               <form onSubmit={handleSendOTP} className="space-y-4 md:space-y-5">
//                 <div>
//                   <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Full Name <span className="text-red-500">*</span>
//                   </Label>
//                   <div className="relative mt-1">
//                     <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                     <Input
//                       id="name"
//                       className={getInputClassName(
//                         "name",
//                         "pl-10 pr-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500",
//                       )}
//                       value={formData.name}
//                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                       placeholder="Enter your full name"
//                       required
//                     />
//                     <div className="absolute right-3 top-3">{getValidationIcon("name")}</div>
//                   </div>
//                   {validation.name.message && (
//                     <p
//                       className={`text-xs mt-1 ${validation.name.isValid ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
//                     >
//                       {validation.name.message}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Email Address <span className="text-red-500">*</span>
//                   </Label>
//                   <div className="relative mt-1">
//                     <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                     <Input
//                       id="email"
//                       type="email"
//                       className={getInputClassName(
//                         "email",
//                         "pl-10 pr-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500",
//                       )}
//                       value={formData.email}
//                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                       placeholder="Enter your email"
//                       required
//                     />
//                     <div className="absolute right-3 top-3">{getValidationIcon("email")}</div>
//                   </div>
//                   {validation.email.message && (
//                     <p
//                       className={`text-xs mt-1 ${validation.email.isValid ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
//                     >
//                       {validation.email.message}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Phone Number <span className="text-red-500">*</span>
//                   </Label>
//                   <div className="relative mt-1">
//                     <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                     <Input
//                       id="phone"
//                       type="tel"
//                       className={getInputClassName(
//                         "phone",
//                         "pl-10 pr-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500",
//                       )}
//                       value={formData.phone}
//                       onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                       placeholder="Enter your phone number"
//                       required
//                     />
//                     <div className="absolute right-3 top-3">{getValidationIcon("phone")}</div>
//                   </div>
//                   {validation.phone.message && (
//                     <p
//                       className={`text-xs mt-1 ${validation.phone.isValid ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
//                     >
//                       {validation.phone.message}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Password <span className="text-red-500">*</span>
//                   </Label>
//                   <div className="relative mt-1">
//                     <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                     <Input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       className={getInputClassName(
//                         "password",
//                         "pl-10 pr-20 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500",
//                       )}
//                       value={formData.password}
//                       onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                       placeholder="Create a password"
//                       required
//                     />
//                     <div className="absolute right-10 top-3">{getValidationIcon("password")}</div>
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                     </Button>
//                   </div>
//                   {validation.password.message && (
//                     <p
//                       className={`text-xs mt-1 ${validation.password.isValid ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
//                     >
//                       {validation.password.message}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Confirm Password <span className="text-red-500">*</span>
//                   </Label>
//                   <div className="relative mt-1">
//                     <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                     <Input
//                       id="confirmPassword"
//                       type={showConfirmPassword ? "text" : "password"}
//                       className={getInputClassName(
//                         "confirmPassword",
//                         "pl-10 pr-20 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500",
//                       )}
//                       value={formData.confirmPassword}
//                       onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
//                       placeholder="Confirm your password"
//                       required
//                     />
//                     <div className="absolute right-10 top-3">{getValidationIcon("confirmPassword")}</div>
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     >
//                       {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                     </Button>
//                   </div>
//                   {validation.confirmPassword.message && (
//                     <p
//                       className={`text-xs mt-1 ${validation.confirmPassword.isValid ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
//                     >
//                       {validation.confirmPassword.message}
//                     </p>
//                   )}
//                 </div>

//                 <Button
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-6 text-base font-semibold disabled:opacity-50"
//                   disabled={
//                     isLoading ||
//                     !validation.name.isValid ||
//                     !validation.email.isValid ||
//                     !validation.phone.isValid ||
//                     !validation.password.isValid ||
//                     !validation.confirmPassword.isValid
//                   }
//                 >
//                   {isLoading ? (
//                     <div className="flex items-center gap-2">
//                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       Sending OTP...
//                     </div>
//                   ) : (
//                     "Send Verification Code"
//                   )}
//                 </Button>
//               </form>
//             )}

//             {/* Step 2: Verify OTP */}
//             {step === 2 && (
//               <form onSubmit={handleVerifyOTP} className="space-y-4 md:space-y-6">
//                 <div className="text-center mb-6">
//                   <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Mail className="w-8 h-8 text-white" />
//                   </div>
//                   <p className="text-sm text-muted-foreground">
//                     We've sent a verification code to
//                     <br />
//                     <strong className="text-foreground">{formData.email}</strong>
//                   </p>
//                 </div>

//                 <div>
//                   <Label htmlFor="otp" className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Verification Code <span className="text-red-500">*</span>
//                   </Label>
//                   <Input
//                     id="otp"
//                     type="text"
//                     maxLength={6}
//                     className="text-center text-2xl tracking-widest mt-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
//                     placeholder="000000"
//                     required
//                   />
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     className="flex-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90"
//                     onClick={() => setStep(1)}
//                     disabled={isLoading}
//                   >
//                     <ArrowLeft className="mr-2 h-4 w-4" />
//                     Back
//                   </Button>
//                   <Button
//                     type="submit"
//                     className="flex-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? (
//                       <div className="flex items-center gap-2">
//                         <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                         Verifying...
//                       </div>
//                     ) : (
//                       "Verify Email"
//                     )}
//                   </Button>
//                 </div>
//               </form>
//             )}

//             {/* Step 3: Address Details */}
//             {step === 3 && (
//               <form onSubmit={handleCompleteSignup} className="space-y-4 md:space-y-6">
//                 <div className="text-center mb-6">
//                   <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <MapPin className="w-8 h-8 text-white" />
//                   </div>
//                   <h3 className="text-lg font-semibold">Complete Your Address</h3>
//                   <p className="text-sm text-muted-foreground">Fill in your complete address details</p>
//                 </div>

//                 <LocationSelector value={formData.address} onChange={handleAddressChange} required />

//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     className="flex-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90"
//                     onClick={() => setStep(2)}
//                     disabled={isLoading}
//                   >
//                     <ArrowLeft className="mr-2 h-4 w-4" />
//                     Back
//                   </Button>
//                   <Button
//                     type="submit"
//                     className="flex-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? (
//                       <div className="flex items-center gap-2">
//                         <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                         Creating Account...
//                       </div>
//                     ) : (
//                       "Complete Registration"
//                     )}
//                   </Button>
//                 </div>
//               </form>
//             )}

//             <div className="mt-6 text-center">
//               <p className="text-sm text-muted-foreground">
//                 Already have an account?{" "}
//                 <Link href="/auth/login" className="text-pink-600 dark:text-pink-400 hover:underline font-medium">
//                   Sign in here
//                 </Link>
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }


"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Eye,
  EyeOff,
  Baby,
  ArrowLeft,
  Mail,
  Phone,
  User,
  Lock,
  MapPin,
  Sparkles,
  Crown,
  Gift,
  Star,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LocationSelector from "@/components/location-selector"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedBackground } from "@/components/animated-background"
import { toast } from "react-hot-toast"
import { useAuth } from "@/app/contexts/auth-provider"

interface AddressData {
  street: string
  area: string
  state: string
  district: string
  subDistrict: string
  village: string
  pincode: string
}

interface ValidationState {
  name: { isValid: boolean; message: string; isChecking: boolean }
  email: { isValid: boolean; message: string; isChecking: boolean }
  phone: { isValid: boolean; message: string; isChecking: boolean }
  password: { isValid: boolean; message: string; isChecking: boolean }
  confirmPassword: { isValid: boolean; message: string; isChecking: boolean }
}

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: {
      street: "",
      area: "",
      state: "",
      district: "",
      subDistrict: "",
      village: "",
      pincode: "",
    } as AddressData,
    terms: false,
  })
  const [otp, setOtp] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [validation, setValidation] = useState<ValidationState>({
    name: { isValid: false, message: "", isChecking: false },
    email: { isValid: false, message: "", isChecking: false },
    phone: { isValid: false, message: "", isChecking: false },
    password: { isValid: false, message: "", isChecking: false },
    confirmPassword: { isValid: false, message: "", isChecking: false },
  })
  const router = useRouter()
  const { refreshAuth } = useAuth()

  // Debounce function for API calls
  const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)
      return () => {
        clearTimeout(handler)
      }
    }, [value, delay])
    return debouncedValue
  }

  const debouncedEmail = useDebounce(formData.email, 500)
  const debouncedPhone = useDebounce(formData.phone, 500)

  // Validate name
  useEffect(() => {
    if (formData.name) {
      const isValid = formData.name.length >= 2
      setValidation((prev) => ({
        ...prev,
        name: {
          isValid,
          message: isValid ? "Name looks good!" : "Name must be at least 2 characters",
          isChecking: false,
        },
      }))
    } else {
      setValidation((prev) => ({
        ...prev,
        name: { isValid: false, message: "", isChecking: false },
      }))
    }
  }, [formData.name])

  // Validate email with backend check
  useEffect(() => {
    const validateEmail = async () => {
      if (!debouncedEmail) {
        setValidation((prev) => ({
          ...prev,
          email: { isValid: false, message: "", isChecking: false },
        }))
        return
      }

      // First check email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(debouncedEmail)) {
        setValidation((prev) => ({
          ...prev,
          email: { isValid: false, message: "Invalid email format", isChecking: false },
        }))
        return
      }

      // Check uniqueness with backend
      setValidation((prev) => ({
        ...prev,
        email: { ...prev.email, isChecking: true },
      }))

      try {
        const response = await fetch("/api/auth/check-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: debouncedEmail }),
        })
        const data = await response.json()

        if (response.ok) {
          if (data.exists && data.isVerified) {
            setValidation((prev) => ({
              ...prev,
              email: { isValid: false, message: "Email already registered", isChecking: false },
            }))
          } else if (data.exists && !data.isVerified) {
            setValidation((prev) => ({
              ...prev,
              email: {
                isValid: true,
                message: "Email available (previous registration incomplete)",
                isChecking: false,
              },
            }))
          } else {
            setValidation((prev) => ({
              ...prev,
              email: { isValid: true, message: "Email available!", isChecking: false },
            }))
          }
        } else {
          setValidation((prev) => ({
            ...prev,
            email: { isValid: false, message: "Error checking email", isChecking: false },
          }))
        }
      } catch (error) {
        setValidation((prev) => ({
          ...prev,
          email: { isValid: false, message: "Error checking email", isChecking: false },
        }))
      }
    }

    validateEmail()
  }, [debouncedEmail])

  // Validate phone with backend check
  useEffect(() => {
    const validatePhone = async () => {
      if (!debouncedPhone) {
        setValidation((prev) => ({
          ...prev,
          phone: { isValid: false, message: "", isChecking: false },
        }))
        return
      }

      // First check phone format
      const phoneRegex = /^\+?\d{10,15}$/
      if (!phoneRegex.test(debouncedPhone)) {
        setValidation((prev) => ({
          ...prev,
          phone: { isValid: false, message: "Invalid phone number format", isChecking: false },
        }))
        return
      }

      // Check uniqueness with backend
      setValidation((prev) => ({
        ...prev,
        phone: { ...prev.phone, isChecking: true },
      }))

      try {
        const response = await fetch("/api/auth/check-phone", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: debouncedPhone }),
        })
        const data = await response.json()

        if (response.ok) {
          if (data.exists && data.isVerified) {
            setValidation((prev) => ({
              ...prev,
              phone: { isValid: false, message: "Phone number already registered", isChecking: false },
            }))
          } else if (data.exists && !data.isVerified) {
            setValidation((prev) => ({
              ...prev,
              phone: {
                isValid: true,
                message: "Phone available (previous registration incomplete)",
                isChecking: false,
              },
            }))
          } else {
            setValidation((prev) => ({
              ...prev,
              phone: { isValid: true, message: "Phone number available!", isChecking: false },
            }))
          }
        } else {
          setValidation((prev) => ({
            ...prev,
            phone: { isValid: false, message: "Error checking phone", isChecking: false },
          }))
        }
      } catch (error) {
        setValidation((prev) => ({
          ...prev,
          phone: { isValid: false, message: "Error checking phone", isChecking: false },
        }))
      }
    }

    validatePhone()
  }, [debouncedPhone])

  // Validate password
  useEffect(() => {
    if (formData.password) {
      const isValid = formData.password.length >= 6
      setValidation((prev) => ({
        ...prev,
        password: {
          isValid,
          message: isValid ? "Password strength: Good" : "Password must be at least 6 characters",
          isChecking: false,
        },
      }))
    } else {
      setValidation((prev) => ({
        ...prev,
        password: { isValid: false, message: "", isChecking: false },
      }))
    }
  }, [formData.password])

  // Validate confirm password
  useEffect(() => {
    if (formData.confirmPassword) {
      const isValid = formData.password === formData.confirmPassword
      setValidation((prev) => ({
        ...prev,
        confirmPassword: {
          isValid,
          message: isValid ? "Passwords match!" : "Passwords do not match",
          isChecking: false,
        },
      }))
    } else {
      setValidation((prev) => ({
        ...prev,
        confirmPassword: { isValid: false, message: "", isChecking: false },
      }))
    }
  }, [formData.password, formData.confirmPassword])

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check all validations
    const allValid =
      validation.name.isValid &&
      validation.email.isValid &&
      validation.phone.isValid &&
      validation.password.isValid &&
      validation.confirmPassword.isValid

    if (!allValid) {
      toast.error("Please fix all validation errors before proceeding")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
          name: formData.name,
        }),
      })
      const data = await response.json()
      if (response.ok && data.success) {
        toast.success("OTP sent to your email!")
        setStep(2)
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
      toast.error("Please enter the OTP.")
      return
    }
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp,
        }),
      })
      const data = await response.json()
      if (response.ok && data.success) {
        toast.success("Email verified!")
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

  const handleCompleteSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const { street, area, state, district, subDistrict, village, pincode } = formData.address
    if (!street || !area || !state || !district || !subDistrict || !village || !pincode) {
      toast.error("Please fill in all address details")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          address: formData.address,
        }),
      })
      const data = await response.json()
      if (response.ok && data.success) {
        const isAdmin = formData.email === process.env.ADMIN_EMAIL
        toast.success(`Account created successfully! ${isAdmin ? "Admin privileges granted." : ""}`)

        // Refresh auth state to pick up the new session
        await refreshAuth()

        router.push("/")
      } else {
        toast.error(data.message || "Signup failed.")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddressChange = (address: AddressData) => {
    setFormData({ ...formData, address })
  }

  const getValidationIcon = (field: keyof ValidationState) => {
    const fieldValidation = validation[field]
    if (fieldValidation.isChecking) {
      return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
    }
    if (fieldValidation.isValid) {
      return <CheckCircle className="w-4 h-4 text-green-500" />
    }
    if (fieldValidation.message && !fieldValidation.isValid) {
      return <XCircle className="w-4 h-4 text-red-500" />
    }
    return null
  }

  const getInputClassName = (field: keyof ValidationState, baseClassName: string) => {
    const fieldValidation = validation[field]
    if (fieldValidation.isValid) {
      return `${baseClassName} border-green-400 dark:border-green-500 focus:border-green-500 dark:focus:border-green-400`
    }
    if (fieldValidation.message && !fieldValidation.isValid) {
      return `${baseClassName} border-red-400 dark:border-red-500 focus:border-red-500 dark:focus:border-red-400`
    }
    return baseClassName
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

        <Card className="w-full max-w-md md:max-w-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-2xl shadow-pink-500/10 dark:shadow-purple-500/20">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-xl shadow-pink-500/25 dark:shadow-pink-500/40">
                <Baby className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Join Mahadev Baby Shop
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
              {step === 1 ? "Basic Information" : step === 2 ? "Verify Your Email" : "Complete Your Profile"}
            </p>
          </CardHeader>

          <CardContent className="px-4 md:px-6">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <form onSubmit={handleSendOTP} className="space-y-4 md:space-y-5">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="name"
                      className={getInputClassName(
                        "name",
                        "pl-10 pr-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500",
                      )}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      required
                    />
                    <div className="absolute right-3 top-3">{getValidationIcon("name")}</div>
                  </div>
                  {validation.name.message && (
                    <p
                      className={`text-xs mt-1 ${validation.name.isValid ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {validation.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      className={getInputClassName(
                        "email",
                        "pl-10 pr-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500",
                      )}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                      required
                    />
                    <div className="absolute right-3 top-3">{getValidationIcon("email")}</div>
                  </div>
                  {validation.email.message && (
                    <p
                      className={`text-xs mt-1 ${validation.email.isValid ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {validation.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      className={getInputClassName(
                        "phone",
                        "pl-10 pr-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500",
                      )}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter your phone number"
                      required
                    />
                    <div className="absolute right-3 top-3">{getValidationIcon("phone")}</div>
                  </div>
                  {validation.phone.message && (
                    <p
                      className={`text-xs mt-1 ${validation.phone.isValid ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {validation.phone.message}
                    </p>
                  )}
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
                      className={getInputClassName(
                        "password",
                        "pl-10 pr-20 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500",
                      )}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Create a password"
                      required
                    />
                    <div className="absolute right-10 top-3">{getValidationIcon("password")}</div>
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
                  {validation.password.message && (
                    <p
                      className={`text-xs mt-1 ${validation.password.isValid ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {validation.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className={getInputClassName(
                        "confirmPassword",
                        "pl-10 pr-20 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500",
                      )}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Confirm your password"
                      required
                    />
                    <div className="absolute right-10 top-3">{getValidationIcon("confirmPassword")}</div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {validation.confirmPassword.message && (
                    <p
                      className={`text-xs mt-1 ${validation.confirmPassword.isValid ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {validation.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-6 text-base font-semibold disabled:opacity-50"
                  disabled={
                    isLoading ||
                    !validation.name.isValid ||
                    !validation.email.isValid ||
                    !validation.phone.isValid ||
                    !validation.password.isValid ||
                    !validation.confirmPassword.isValid
                  }
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending OTP...
                    </div>
                  ) : (
                    "Send Verification Code"
                  )}
                </Button>
              </form>
            )}

            {/* Step 2: Verify OTP */}
            {step === 2 && (
              <form onSubmit={handleVerifyOTP} className="space-y-4 md:space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We've sent a verification code to
                    <br />
                    <strong className="text-foreground">{formData.email}</strong>
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

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90"
                    onClick={() => setStep(1)}
                    disabled={isLoading}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Verifying...
                      </div>
                    ) : (
                      "Verify Email"
                    )}
                  </Button>
                </div>
              </form>
            )}

            {/* Step 3: Address Details */}
            {step === 3 && (
              <form onSubmit={handleCompleteSignup} className="space-y-4 md:space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Complete Your Address</h3>
                  <p className="text-sm text-muted-foreground">Fill in your complete address details</p>
                </div>

                <LocationSelector value={formData.address} onChange={handleAddressChange} required />

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90"
                    onClick={() => setStep(2)}
                    disabled={isLoading}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating Account...
                      </div>
                    ) : (
                      "Complete Registration"
                    )}
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
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
