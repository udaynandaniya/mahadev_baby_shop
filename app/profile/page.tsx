// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Separator } from "@/components/ui/separator"
// import { Badge } from "@/components/ui/badge"
// import {
//   User,
//   MapPin,
//   Mail,
//   Shield,
//   Trash2,
//   Save,
//   AlertTriangle,
//   CheckCircle,
//   XCircle,
//   Loader2,
//   ArrowLeft,
//   Eye,
//   EyeOff,
//   Phone,
//   Lock,
//   Clock,
//   ShoppingCart,
//   Settings,
// } from "lucide-react"
// import { toast } from "react-hot-toast"
// import { AnimatedBackground } from "@/components/animated-background"
// import LocationSelector from "@/components/location-selector"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { useAuth } from "@/app/contexts/auth-provider"
// import { z } from "zod"

// interface AddressData {
//   street: string
//   area: string
//   state: string
//   district: string
//   subDistrict: string
//   village: string
//   pincode: string
// }

// interface UserProfile {
//   _id: string
//   name: string
//   email: string
//   phone: string
//   address: AddressData
//   isVerified: boolean
//   isAdmin: boolean
//   createdAt: string
// }

// interface ValidationState {
//   name: { isValid: boolean; message: string; isChecking: boolean }
//   phone: { isValid: boolean; message: string; isChecking: boolean }
//   password: { isValid: boolean; message: string; isChecking: boolean }
//   address: { isValid: boolean; message: string; isChecking: boolean }
// }

// interface PendingOrder {
//   orderNumber: string
//   status: string
//   totalAmount: number
//   orderDate: string
// }

// // Zod schemas for validation
// const profileSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
//   password: z
//     .string()
//     .optional()
//     .refine((val) => !val || val.length >= 6, {
//       message: "Password must be at least 6 characters if provided",
//     }),
//   address: z.object({
//     street: z.string().min(5, "Street address must be at least 5 characters"),
//     area: z.string().min(2, "Area must be at least 2 characters"),
//     state: z.string().min(1, "Please select a state"),
//     district: z.string().min(1, "Please select a district"),
//     subDistrict: z.string().min(1, "Please select a sub-district"),
//     village: z.string().min(1, "Please select a village/city"),
//     pincode: z.string().regex(/^\d{6}$/, "Pincode must be exactly 6 digits"),
//   }),
// })

// export default function ProfilePage() {
//   const router = useRouter()
//   const { isAuthenticated, user: authUser, refreshAuth } = useAuth()
//   const [profile, setProfile] = useState<UserProfile | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [isUpdating, setIsUpdating] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)
//   const [isCheckingOrders, setIsCheckingOrders] = useState(false)
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false)
//   const [showFinalDeleteDialog, setShowFinalDeleteDialog] = useState(false)
//   const [showOrdersDialog, setShowOrdersDialog] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>([])
//   const [hasClickedUpdate, setHasClickedUpdate] = useState(false)
//   const [hasClickedDelete, setHasClickedDelete] = useState(false)

//   // Form data
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     password: "",
//     address: {
//       street: "",
//       area: "",
//       state: "",
//       district: "",
//       subDistrict: "",
//       village: "",
//       pincode: "",
//     } as AddressData,
//   })

//   // Validation state
//   const [validation, setValidation] = useState<ValidationState>({
//     name: { isValid: false, message: "", isChecking: false },
//     phone: { isValid: false, message: "", isChecking: false },
//     password: { isValid: true, message: "", isChecking: false },
//     address: { isValid: false, message: "", isChecking: false },
//   })

//   // Debounce hook
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

//   const debouncedPhone = useDebounce(formData.phone, 500)

//   // Redirect if not authenticated
//   useEffect(() => {
//     if (!isAuthenticated && !isLoading) {
//       toast.error("Please login to access your profile")
//       router.push("/auth/login")
//     }
//   }, [isAuthenticated, isLoading, router])

//   useEffect(() => {
//     if (isAuthenticated) {
//       loadProfile()
//     }
//   }, [isAuthenticated])

//   // Real-time name validation
//   useEffect(() => {
//     if (formData.name) {
//       try {
//         profileSchema.shape.name.parse(formData.name)
//         setValidation((prev) => ({
//           ...prev,
//           name: { isValid: true, message: "Name looks good!", isChecking: false },
//         }))
//       } catch (error) {
//         if (error instanceof z.ZodError) {
//           setValidation((prev) => ({
//             ...prev,
//             name: { isValid: false, message: error.errors[0].message, isChecking: false },
//           }))
//         }
//       }
//     } else {
//       setValidation((prev) => ({
//         ...prev,
//         name: { isValid: false, message: "", isChecking: false },
//       }))
//     }
//   }, [formData.name])

//   // Real-time phone validation with uniqueness check
//   useEffect(() => {
//     const validatePhone = async () => {
//       if (!debouncedPhone) {
//         setValidation((prev) => ({
//           ...prev,
//           phone: { isValid: false, message: "", isChecking: false },
//         }))
//         return
//       }

//       // First validate format with Zod
//       try {
//         profileSchema.shape.phone.parse(debouncedPhone)
//       } catch (error) {
//         if (error instanceof z.ZodError) {
//           setValidation((prev) => ({
//             ...prev,
//             phone: { isValid: false, message: error.errors[0].message, isChecking: false },
//           }))
//           return
//         }
//       }

//       // Skip uniqueness check if it's the same as current phone
//       if (profile && debouncedPhone === profile.phone) {
//         setValidation((prev) => ({
//           ...prev,
//           phone: { isValid: true, message: "Current phone number", isChecking: false },
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
//   }, [debouncedPhone, profile])

//   // Real-time password validation
//   useEffect(() => {
//     if (formData.password === "") {
//       setValidation((prev) => ({
//         ...prev,
//         password: { isValid: true, message: "Leave empty to keep current password", isChecking: false },
//       }))
//     } else {
//       try {
//         profileSchema.shape.password.parse(formData.password)
//         setValidation((prev) => ({
//           ...prev,
//           password: { isValid: true, message: "Password strength: Good", isChecking: false },
//         }))
//       } catch (error) {
//         if (error instanceof z.ZodError) {
//           setValidation((prev) => ({
//             ...prev,
//             password: { isValid: false, message: error.errors[0].message, isChecking: false },
//           }))
//         }
//       }
//     }
//   }, [formData.password])

//   // Real-time address validation
//   useEffect(() => {
//     try {
//       profileSchema.shape.address.parse(formData.address)
//       setValidation((prev) => ({
//         ...prev,
//         address: { isValid: true, message: "Address is complete", isChecking: false },
//       }))
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         setValidation((prev) => ({
//           ...prev,
//           address: { isValid: false, message: "Please complete all address fields", isChecking: false },
//         }))
//       }
//     }
//   }, [formData.address])

//   const loadProfile = async () => {
//     try {
//       setIsLoading(true)
//       const response = await fetch("/api/profile", {
//         credentials: "include",
//       })

//       if (!response.ok) {
//         if (response.status === 401) {
//           toast.error("Please login to access your profile")
//           router.push("/auth/login")
//           return
//         }
//         throw new Error("Failed to load profile")
//       }

//       const { data } = await response.json()
//       setProfile(data)

//       // Initialize form data
//       setFormData({
//         name: data.name || "",
//         phone: data.phone || "",
//         password: "",
//         address: data.address || {
//           street: "",
//           area: "",
//           state: "",
//           district: "",
//           subDistrict: "",
//           village: "",
//           pincode: "",
//         },
//       })
//     } catch (error) {
//       console.error("Error loading profile:", error)
//       toast.error("Failed to load profile")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const checkPendingOrders = async () => {
//     try {
//       setIsCheckingOrders(true)
//       const response = await fetch("/api/profile/check-orders", {
//         credentials: "include",
//       })
//       if (!response.ok) throw new Error("Failed to check orders")

//       const { data } = await response.json()
//       setPendingOrders(data.pendingOrders)
//       return data.canModifyAccount
//     } catch (error) {
//       console.error("Error checking orders:", error)
//       toast.error("Failed to check order status")
//       return false
//     } finally {
//       setIsCheckingOrders(false)
//     }
//   }

//   const handleInputChange = (field: string, value: string) => {
//     if (field === "phone") {
//       value = value.replace(/\D/g, "")
//     }

//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }))
//   }

//   const handleAddressChange = (address: AddressData) => {
//     setFormData((prev) => ({
//       ...prev,
//       address,
//     }))
//   }

//   const isFormValid = () => {
//     return (
//       validation.name.isValid && validation.phone.isValid && validation.password.isValid && validation.address.isValid
//     )
//   }

//   const handleUpdateProfile = async () => {
//     if (hasClickedUpdate) return // Prevent multiple clicks

//     if (!isFormValid()) {
//       toast.error("Please fix all validation errors before updating")
//       return
//     }

//     setHasClickedUpdate(true)
//     const canModify = await checkPendingOrders()

//     if (!canModify) {
//       setShowOrdersDialog(true)
//       setHasClickedUpdate(false)
//       return
//     }

//     setIsUpdating(true)
//     try {
//       const updateData = {
//         name: formData.name,
//         phone: formData.phone,
//         address: formData.address,
//         ...(formData.password && { password: formData.password }),
//       }

//       const response = await fetch("/api/profile", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(updateData),
//       })

//       const result = await response.json()

//       if (!response.ok) {
//         throw new Error(result.error || "Failed to update profile")
//       }

//       toast.success("Profile updated successfully!")
//       setFormData((prev) => ({ ...prev, password: "" }))
//       await loadProfile()
//       await refreshAuth() // Refresh auth context
//     } catch (error) {
//       console.error("Error updating profile:", error)
//       const errorMessage = error instanceof Error ? error.message : "Failed to update profile"
//       toast.error(errorMessage)
//     } finally {
//       setIsUpdating(false)
//       setHasClickedUpdate(false)
//     }
//   }

//   const handleDeleteAccount = async () => {
//     if (hasClickedDelete) return // Prevent multiple clicks

//     setHasClickedDelete(true)
//     const canModify = await checkPendingOrders()

//     if (!canModify) {
//       setShowOrdersDialog(true)
//       setHasClickedDelete(false)
//       return
//     }

//     setShowDeleteDialog(true)
//     setHasClickedDelete(false)
//   }

//   const handleConfirmDelete = () => {
//     setShowDeleteDialog(false)
//     setShowFinalDeleteDialog(true)
//   }

//   const handleFinalDeleteAccount = async () => {
//     setIsDeleting(true)
//     try {
//       const response = await fetch("/api/profile", {
//         method: "DELETE",
//         credentials: "include",
//       })

//       if (!response.ok) {
//         const result = await response.json()
//         throw new Error(result.error || "Failed to delete account")
//       }

//       // Clear all client-side data
//       localStorage.clear()
//       sessionStorage.clear()

//       // Clear cookies
//       document.cookie.split(";").forEach((c) => {
//         const eqPos = c.indexOf("=")
//         const name = eqPos > -1 ? c.substr(0, eqPos) : c
//         document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
//       })

//       toast.success("Account deleted successfully")

//       // Refresh auth context and redirect
//       await refreshAuth()
//       setTimeout(() => {
//         window.location.href = "/"
//       }, 2000)
//     } catch (error) {
//       console.error("Error deleting account:", error)
//       const errorMessage = error instanceof Error ? error.message : "Failed to delete account"
//       toast.error(errorMessage)
//     } finally {
//       setIsDeleting(false)
//       setShowFinalDeleteDialog(false)
//     }
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

//   const getInputClassName = (field: keyof ValidationState) => {
//     const fieldValidation = validation[field]
//     const baseClass = "bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50"

//     if (fieldValidation.isValid) {
//       return `${baseClass} border-green-400 dark:border-green-500 focus:border-green-500 dark:focus:border-green-400`
//     }
//     if (fieldValidation.message && !fieldValidation.isValid) {
//       return `${baseClass} border-red-400 dark:border-red-500 focus:border-red-500 dark:focus:border-red-400`
//     }
//     return `${baseClass} focus:border-pink-400 dark:focus:border-purple-500`
//   }

//   // Show loading while auth is being checked
//   if (!isAuthenticated && isLoading) {
//     return (
//       <div className="min-h-screen relative">
//         <AnimatedBackground />
//         <div className="relative z-10 flex items-center justify-center min-h-screen">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
//         </div>
//       </div>
//     )
//   }

//   // Redirect if not authenticated
//   if (!isAuthenticated) {
//     return null
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen relative">
//         <AnimatedBackground />
//         <div className="relative z-10 flex items-center justify-center min-h-screen">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
//         </div>
//       </div>
//     )
//   }

//   if (!profile) {
//     return (
//       <div className="min-h-screen relative">
//         <AnimatedBackground />
//         <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
//           <div className="text-center">
//             <h2 className="text-xl md:text-2xl font-bold text-gray-600 mb-4">Profile not found</h2>
//             <Button onClick={() => router.push("/")}>Go Home</Button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen relative">
//       <AnimatedBackground />

//       {/* Loading Overlay */}
//       {(isUpdating || isDeleting || isCheckingOrders) && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl text-center max-w-sm w-full mx-4">
//             <Loader2 className="h-12 w-12 animate-spin text-pink-500 mx-auto mb-4" />
//             <h3 className="text-lg font-semibold mb-2">
//               {isUpdating ? "Updating Profile" : isDeleting ? "Deleting Account" : "Checking Orders"}
//             </h3>
//             <p className="text-sm text-muted-foreground">Please wait...</p>
//           </div>
//         </div>
//       )}

//       <div className="relative z-10">
//         <div className="container mx-auto px-4 py-4 md:py-6">
//           {/* Header */}
//           <div className="mb-4 md:mb-8">
//             <Button
//               variant="ghost"
//               onClick={() => router.back()}
//               className="mb-4 hover:bg-pink-50 dark:hover:bg-pink-900/20"
//               disabled={isUpdating || isDeleting || isCheckingOrders}
//             >
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               <span className="hidden sm:inline">Back</span>
//             </Button>
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div>
//                 <h1 className="text-xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent flex items-center gap-2 md:gap-3">
//                   <User className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-pink-500" />
//                   My Profile
//                 </h1>
//                 <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">Manage your account settings</p>
//               </div>
//               <div className="flex items-center gap-2">
//                 {profile.isAdmin && (
//                   <Badge variant="secondary" className="text-xs">
//                     <Shield className="h-3 w-3 mr-1" />
//                     Admin
//                   </Badge>
//                 )}
//                 {profile.isVerified && (
//                   <Badge variant="default" className="text-xs">
//                     <CheckCircle className="h-3 w-3 mr-1" />
//                     Verified
//                   </Badge>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
//             {/* Profile Form */}
//             <div className="lg:col-span-2 space-y-4 md:space-y-6">
//               {/* Basic Information */}
//               <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
//                 <CardHeader className="pb-3 md:pb-4">
//                   <CardTitle className="flex items-center gap-2 text-base md:text-lg lg:text-xl">
//                     <User className="h-4 w-4 md:h-5 md:w-5" />
//                     Basic Information
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="name" className="text-sm font-medium">
//                         Full Name <span className="text-red-500">*</span>
//                       </Label>
//                       <div className="relative">
//                         <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                         <Input
//                           id="name"
//                           value={formData.name}
//                           onChange={(e) => handleInputChange("name", e.target.value)}
//                           placeholder="Enter your full name"
//                           className={`pl-10 pr-10 ${getInputClassName("name")}`}
//                           disabled={isUpdating || isDeleting || isCheckingOrders}
//                           required
//                         />
//                         <div className="absolute right-3 top-3">{getValidationIcon("name")}</div>
//                       </div>
//                       {validation.name.message && (
//                         <p className={`text-xs ${validation.name.isValid ? "text-green-600" : "text-red-600"}`}>
//                           {validation.name.message}
//                         </p>
//                       )}
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="phone" className="text-sm font-medium">
//                         Phone Number <span className="text-red-500">*</span>
//                       </Label>
//                       <div className="relative">
//                         <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                         <Input
//                           id="phone"
//                           value={formData.phone}
//                           onChange={(e) => handleInputChange("phone", e.target.value)}
//                           placeholder="Enter 10-digit phone number"
//                           maxLength={10}
//                           className={`pl-10 pr-10 ${getInputClassName("phone")}`}
//                           disabled={isUpdating || isDeleting || isCheckingOrders}
//                           required
//                         />
//                         <div className="absolute right-3 top-3">{getValidationIcon("phone")}</div>
//                       </div>
//                       {validation.phone.message && (
//                         <p className={`text-xs ${validation.phone.isValid ? "text-green-600" : "text-red-600"}`}>
//                           {validation.phone.message}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="email" className="text-sm font-medium">
//                       Email Address
//                     </Label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                       <Input
//                         id="email"
//                         type="email"
//                         value={profile.email}
//                         disabled
//                         className="pl-10 bg-gray-50 dark:bg-gray-800 cursor-not-allowed"
//                       />
//                     </div>
//                     <p className="text-xs text-muted-foreground">Email cannot be changed</p>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="password" className="text-sm font-medium">
//                       New Password (Optional)
//                     </Label>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                       <Input
//                         id="password"
//                         type={showPassword ? "text" : "password"}
//                         value={formData.password}
//                         onChange={(e) => handleInputChange("password", e.target.value)}
//                         placeholder="Leave empty to keep current password"
//                         className={`pl-10 pr-20 ${getInputClassName("password")}`}
//                         disabled={isUpdating || isDeleting || isCheckingOrders}
//                       />
//                       <div className="absolute right-10 top-3">{getValidationIcon("password")}</div>
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         size="sm"
//                         className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
//                         onClick={() => setShowPassword(!showPassword)}
//                         disabled={isUpdating || isDeleting || isCheckingOrders}
//                       >
//                         {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                       </Button>
//                     </div>
//                     {validation.password.message && (
//                       <p className={`text-xs ${validation.password.isValid ? "text-green-600" : "text-red-600"}`}>
//                         {validation.password.message}
//                       </p>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Address Information */}
//               <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
//                 <CardHeader className="pb-3 md:pb-4">
//                   <CardTitle className="flex items-center gap-2 text-base md:text-lg lg:text-xl">
//                     <MapPin className="h-4 w-4 md:h-5 md:w-5" />
//                     Address Information
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <LocationSelector
//                     value={formData.address}
//                     onChange={handleAddressChange}
//                     required={true}
//                     disabled={isUpdating || isDeleting || isCheckingOrders}
//                   />
//                   {validation.address.message && (
//                     <p className={`text-xs mt-2 ${validation.address.isValid ? "text-green-600" : "text-red-600"}`}>
//                       {validation.address.message}
//                     </p>
//                   )}
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Profile Summary & Actions */}
//             <div className="lg:col-span-1">
//               <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg lg:sticky lg:top-6">
//                 <CardHeader className="pb-3 md:pb-4">
//                   <CardTitle className="flex items-center gap-2 text-base md:text-lg lg:text-xl">
//                     <Settings className="h-4 w-4 md:h-5 md:w-5" />
//                     Account Summary
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-muted-foreground">Account Status</span>
//                       <Badge variant={profile.isVerified ? "default" : "secondary"} className="text-xs">
//                         {profile.isVerified ? "Verified" : "Unverified"}
//                       </Badge>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-muted-foreground">Account Type</span>
//                       <Badge variant={profile.isAdmin ? "destructive" : "outline"} className="text-xs">
//                         {profile.isAdmin ? "Admin" : "User"}
//                       </Badge>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-muted-foreground">Member Since</span>
//                       <span className="text-sm font-medium">{new Date(profile.createdAt).toLocaleDateString()}</span>
//                     </div>
//                   </div>

//                   <Separator />

//                   <div className="space-y-3">
//                     <Button
//                       onClick={handleUpdateProfile}
//                       disabled={!isFormValid() || isUpdating || isDeleting || isCheckingOrders || hasClickedUpdate}
//                       className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-sm md:text-base"
//                       size="lg"
//                     >
//                       {isUpdating ? (
//                         <>
//                           <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                           Updating...
//                         </>
//                       ) : (
//                         <>
//                           <Save className="h-4 w-4 mr-2" />
//                           Update Profile
//                         </>
//                       )}
//                     </Button>

//                     {!isFormValid() && !isUpdating && !isDeleting && !isCheckingOrders && (
//                       <p className="text-xs text-muted-foreground text-center">Please fix all validation errors</p>
//                     )}

//                     <Separator />

//                     <div className="space-y-2">
//                       <h4 className="text-sm font-medium text-red-600">Danger Zone</h4>
//                       <Button
//                         variant="destructive"
//                         onClick={handleDeleteAccount}
//                         disabled={isUpdating || isDeleting || isCheckingOrders || hasClickedDelete}
//                         className="w-full text-sm"
//                         size="sm"
//                       >
//                         <Trash2 className="h-4 w-4 mr-2" />
//                         Delete Account
//                       </Button>
//                       <p className="text-xs text-muted-foreground text-center">This action cannot be undone</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Orders Running Dialog */}
//       <Dialog open={showOrdersDialog} onOpenChange={setShowOrdersDialog}>
//         <DialogContent className="sm:max-w-md mx-4">
//           <DialogHeader>
//             <DialogTitle className="flex items-center gap-2 text-base md:text-lg">
//               <ShoppingCart className="h-5 w-5 text-orange-500" />
//               Orders in Progress
//             </DialogTitle>
//             <DialogDescription className="text-left text-sm">
//               You have active orders that prevent account modifications.
//             </DialogDescription>
//           </DialogHeader>

//           <Alert className="mt-4">
//             <Clock className="h-4 w-4" />
//             <AlertDescription className="text-sm">
//               <strong>Active Orders Found:</strong> You have {pendingOrders.length} order(s) that are currently being
//               processed.
//             </AlertDescription>
//           </Alert>

//           {pendingOrders.length > 0 && (
//             <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
//               {pendingOrders.map((order) => (
//                 <div key={order.orderNumber} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="text-sm font-medium">#{order.orderNumber}</p>
//                       <p className="text-xs text-muted-foreground">₹{order.totalAmount}</p>
//                     </div>
//                     <Badge variant={order.status === "pending" ? "secondary" : "default"} className="text-xs">
//                       {order.status.toUpperCase()}
//                     </Badge>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           <div className="flex gap-3 mt-4">
//             <Button variant="outline" onClick={() => setShowOrdersDialog(false)} className="flex-1 text-sm">
//               Understood
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={showDeleteDialog} onOpenChange={!isDeleting ? setShowDeleteDialog : undefined}>
//         <DialogContent className="sm:max-w-md mx-4">
//           <DialogHeader>
//             <DialogTitle className="flex items-center gap-2 text-base md:text-lg">
//               <AlertTriangle className="h-5 w-5 text-amber-500" />
//               Delete Account?
//             </DialogTitle>
//             <DialogDescription className="text-left text-sm">
//               Are you sure you want to delete your account? This will also delete all your orders and data.
//             </DialogDescription>
//           </DialogHeader>

//           <div className="flex gap-3 mt-4">
//             <Button
//               variant="outline"
//               onClick={() => setShowDeleteDialog(false)}
//               className="flex-1 text-sm"
//               disabled={isDeleting}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={handleConfirmDelete}
//               disabled={isDeleting}
//               className="flex-1 text-sm"
//             >
//               Continue
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Final Delete Confirmation Dialog */}
//       <Dialog open={showFinalDeleteDialog} onOpenChange={!isDeleting ? setShowFinalDeleteDialog : undefined}>
//         <DialogContent className="sm:max-w-md mx-4">
//           <DialogHeader>
//             <DialogTitle className="flex items-center gap-2 text-base md:text-lg">
//               <Trash2 className="h-5 w-5 text-red-500" />
//               Final Confirmation
//             </DialogTitle>
//             <DialogDescription className="text-left text-sm">
//               <strong>This action is irreversible!</strong> Your account, profile data, and all associated orders will
//               be permanently deleted.
//             </DialogDescription>
//           </DialogHeader>

//           <Alert className="mt-4">
//             <AlertTriangle className="h-4 w-4" />
//             <AlertDescription className="text-sm">
//               All your data including orders, profile information, and account history will be permanently removed from
//               our servers.
//             </AlertDescription>
//           </Alert>

//           <div className="flex gap-3 mt-4">
//             <Button
//               variant="outline"
//               onClick={() => setShowFinalDeleteDialog(false)}
//               disabled={isDeleting}
//               className="flex-1 text-sm"
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={handleFinalDeleteAccount}
//               disabled={isDeleting}
//               className="flex-1 text-sm"
//             >
//               {isDeleting ? (
//                 <>
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                   Deleting...
//                 </>
//               ) : (
//                 "Delete Forever"
//               )}
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  User,
  MapPin,
  Mail,
  Shield,
  Trash2,
  Save,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowLeft,
  Eye,
  EyeOff,
  Phone,
  Lock,
  Clock,
  ShoppingCart,
  Settings,
} from "lucide-react"
import { toast } from "react-hot-toast"
import { AnimatedBackground } from "@/components/animated-background"
import LocationSelector from "@/components/location-selector"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/app/contexts/auth-provider"
import { z } from "zod"

interface AddressData {
  street: string
  area: string
  state: string
  district: string
  subDistrict: string
  village: string
  pincode: string
}

interface UserProfile {
  _id: string
  name: string
  email: string
  phone: string
  address: AddressData
  isVerified: boolean
  isAdmin: boolean
  createdAt: string
}

interface ValidationState {
  name: { isValid: boolean; message: string; isChecking: boolean }
  phone: { isValid: boolean; message: string; isChecking: boolean }
  password: { isValid: boolean; message: string; isChecking: boolean }
  address: { isValid: boolean; message: string; isChecking: boolean }
}

interface PendingOrder {
  orderNumber: string
  status: string
  totalAmount: number
  orderDate: string
}

// Zod schemas for validation
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 6, {
      message: "Password must be at least 6 characters if provided",
    }),
  address: z.object({
    street: z.string().min(5, "Street address must be at least 5 characters"),
    area: z.string().min(2, "Area must be at least 2 characters"),
    state: z.string().min(1, "Please select a state"),
    district: z.string().min(1, "Please select a district"),
    subDistrict: z.string().min(1, "Please select a sub-district"),
    village: z.string().min(1, "Please select a village/city"),
    pincode: z.string().regex(/^\d{6}$/, "Pincode must be exactly 6 digits"),
  }),
})

export default function ProfilePage() {
  const router = useRouter()
  const { isAuthenticated, user: authUser, refreshAuth, logout } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isCheckingOrders, setIsCheckingOrders] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showFinalDeleteDialog, setShowFinalDeleteDialog] = useState(false)
  const [showOrdersDialog, setShowOrdersDialog] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>([])
  const [hasClickedUpdate, setHasClickedUpdate] = useState(false)
  const [hasClickedDelete, setHasClickedDelete] = useState(false)

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    address: {
      street: "",
      area: "",
      state: "",
      district: "",
      subDistrict: "",
      village: "",
      pincode: "",
    } as AddressData,
  })

  // Validation state
  const [validation, setValidation] = useState<ValidationState>({
    name: { isValid: false, message: "", isChecking: false },
    phone: { isValid: false, message: "", isChecking: false },
    password: { isValid: true, message: "", isChecking: false },
    address: { isValid: false, message: "", isChecking: false },
  })

  // Debounce hook
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

  const debouncedPhone = useDebounce(formData.phone, 500)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      toast.error("Please login to access your profile")
      router.push("/auth/login")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (isAuthenticated) {
      loadProfile()
    }
  }, [isAuthenticated])

  // Real-time name validation
  useEffect(() => {
    if (formData.name) {
      try {
        profileSchema.shape.name.parse(formData.name)
        setValidation((prev) => ({
          ...prev,
          name: { isValid: true, message: "Name looks good!", isChecking: false },
        }))
      } catch (error) {
        if (error instanceof z.ZodError) {
          setValidation((prev) => ({
            ...prev,
            name: { isValid: false, message: error.errors[0].message, isChecking: false },
          }))
        }
      }
    } else {
      setValidation((prev) => ({
        ...prev,
        name: { isValid: false, message: "", isChecking: false },
      }))
    }
  }, [formData.name])

  // Real-time phone validation with uniqueness check
  useEffect(() => {
    const validatePhone = async () => {
      if (!debouncedPhone) {
        setValidation((prev) => ({
          ...prev,
          phone: { isValid: false, message: "", isChecking: false },
        }))
        return
      }

      // First validate format with Zod
      try {
        profileSchema.shape.phone.parse(debouncedPhone)
      } catch (error) {
        if (error instanceof z.ZodError) {
          setValidation((prev) => ({
            ...prev,
            phone: { isValid: false, message: error.errors[0].message, isChecking: false },
          }))
          return
        }
      }

      // Skip uniqueness check if it's the same as current phone
      if (profile && debouncedPhone === profile.phone) {
        setValidation((prev) => ({
          ...prev,
          phone: { isValid: true, message: "Current phone number", isChecking: false },
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
  }, [debouncedPhone, profile])

  // Real-time password validation
  useEffect(() => {
    if (formData.password === "") {
      setValidation((prev) => ({
        ...prev,
        password: { isValid: true, message: "Leave empty to keep current password", isChecking: false },
      }))
    } else {
      try {
        profileSchema.shape.password.parse(formData.password)
        setValidation((prev) => ({
          ...prev,
          password: { isValid: true, message: "Password strength: Good", isChecking: false },
        }))
      } catch (error) {
        if (error instanceof z.ZodError) {
          setValidation((prev) => ({
            ...prev,
            password: { isValid: false, message: error.errors[0].message, isChecking: false },
          }))
        }
      }
    }
  }, [formData.password])

  // Real-time address validation
  useEffect(() => {
    try {
      profileSchema.shape.address.parse(formData.address)
      setValidation((prev) => ({
        ...prev,
        address: { isValid: true, message: "Address is complete", isChecking: false },
      }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidation((prev) => ({
          ...prev,
          address: { isValid: false, message: "Please complete all address fields", isChecking: false },
        }))
      }
    }
  }, [formData.address])

  const loadProfile = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/profile", {
        credentials: "include",
      })

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Please login to access your profile")
          router.push("/auth/login")
          return
        }
        throw new Error("Failed to load profile")
      }

      const { data } = await response.json()
      setProfile(data)

      // Initialize form data
      setFormData({
        name: data.name || "",
        phone: data.phone || "",
        password: "",
        address: data.address || {
          street: "",
          area: "",
          state: "",
          district: "",
          subDistrict: "",
          village: "",
          pincode: "",
        },
      })
    } catch (error) {
      console.error("Error loading profile:", error)
      toast.error("Failed to load profile")
    } finally {
      setIsLoading(false)
    }
  }

  const checkPendingOrders = async () => {
    try {
      setIsCheckingOrders(true)
      const response = await fetch("/api/profile/check-orders", {
        credentials: "include",
      })
      if (!response.ok) throw new Error("Failed to check orders")

      const { data } = await response.json()
      setPendingOrders(data.pendingOrders)
      return data.canModifyAccount
    } catch (error) {
      console.error("Error checking orders:", error)
      toast.error("Failed to check order status")
      return false
    } finally {
      setIsCheckingOrders(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    if (field === "phone") {
      value = value.replace(/\D/g, "")
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddressChange = (address: AddressData) => {
    setFormData((prev) => ({
      ...prev,
      address,
    }))
  }

  const isFormValid = () => {
    return (
      validation.name.isValid && validation.phone.isValid && validation.password.isValid && validation.address.isValid
    )
  }

  const handleUpdateProfile = async () => {
    if (hasClickedUpdate) return // Prevent multiple clicks

    if (!isFormValid()) {
      toast.error("Please fix all validation errors before updating")
      return
    }

    setHasClickedUpdate(true)
    const canModify = await checkPendingOrders()

    if (!canModify) {
      setShowOrdersDialog(true)
      setHasClickedUpdate(false)
      return
    }

    setIsUpdating(true)
    try {
      const updateData = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        ...(formData.password && { password: formData.password }),
      }

      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updateData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to update profile")
      }

      toast.success("Profile updated successfully!")
      setFormData((prev) => ({ ...prev, password: "" }))
      await loadProfile()
      await refreshAuth() // Refresh auth context
    } catch (error) {
      console.error("Error updating profile:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to update profile"
      toast.error(errorMessage)
    } finally {
      setIsUpdating(false)
      setHasClickedUpdate(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (hasClickedDelete) return // Prevent multiple clicks

    setHasClickedDelete(true)
    const canModify = await checkPendingOrders()

    if (!canModify) {
      setShowOrdersDialog(true)
      setHasClickedDelete(false)
      return
    }

    setShowDeleteDialog(true)
    setHasClickedDelete(false)
  }

  const handleConfirmDelete = () => {
    setShowDeleteDialog(false)
    setShowFinalDeleteDialog(true)
  }

  const handleFinalDeleteAccount = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch("/api/profile", {
        method: "DELETE",
        credentials: "include",
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || "Failed to delete account")
      }

      toast.success("Account deleted successfully")

      // Clear client-side storage
      localStorage.clear()
      sessionStorage.clear()

      // Use the auth context logout function to ensure proper cleanup
      await logout()

      // Hard redirect to ensure clean state
      setTimeout(() => {
        window.location.replace("/")
      }, 1500)
    } catch (error) {
      console.error("Error deleting account:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to delete account"
      toast.error(errorMessage)
    } finally {
      setIsDeleting(false)
      setShowFinalDeleteDialog(false)
    }
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

  const getInputClassName = (field: keyof ValidationState) => {
    const fieldValidation = validation[field]
    const baseClass = "bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50"

    if (fieldValidation.isValid) {
      return `${baseClass} border-green-400 dark:border-green-500 focus:border-green-500 dark:focus:border-green-400`
    }
    if (fieldValidation.message && !fieldValidation.isValid) {
      return `${baseClass} border-red-400 dark:border-red-500 focus:border-red-500 dark:focus:border-red-400`
    }
    return `${baseClass} focus:border-pink-400 dark:focus:border-purple-500`
  }

  // Show loading while auth is being checked
  if (!isAuthenticated && isLoading) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold text-gray-600 mb-4">Profile not found</h2>
            <Button onClick={() => router.push("/")}>Go Home</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      {/* Loading Overlay */}
      {(isUpdating || isDeleting || isCheckingOrders) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl text-center max-w-sm w-full mx-4">
            <Loader2 className="h-12 w-12 animate-spin text-pink-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {isUpdating ? "Updating Profile" : isDeleting ? "Deleting Account" : "Checking Orders"}
            </h3>
            <p className="text-sm text-muted-foreground">Please wait...</p>
          </div>
        </div>
      )}

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-4 md:py-6">
          {/* Header */}
          <div className="mb-4 md:mb-8">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-4 hover:bg-pink-50 dark:hover:bg-pink-900/20"
              disabled={isUpdating || isDeleting || isCheckingOrders}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent flex items-center gap-2 md:gap-3">
                  <User className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-pink-500" />
                  My Profile
                </h1>
                <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">Manage your account settings</p>
              </div>
              <div className="flex items-center gap-2">
                {profile.isAdmin && (
                  <Badge variant="secondary" className="text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    Admin
                  </Badge>
                )}
                {profile.isVerified && (
                  <Badge variant="default" className="text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {/* Profile Form */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {/* Basic Information */}
              <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
                <CardHeader className="pb-3 md:pb-4">
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg lg:text-xl">
                    <User className="h-4 w-4 md:h-5 md:w-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Enter your full name"
                          className={`pl-10 pr-10 ${getInputClassName("name")}`}
                          disabled={isUpdating || isDeleting || isCheckingOrders}
                          required
                        />
                        <div className="absolute right-3 top-3">{getValidationIcon("name")}</div>
                      </div>
                      {validation.name.message && (
                        <p className={`text-xs ${validation.name.isValid ? "text-green-600" : "text-red-600"}`}>
                          {validation.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="Enter 10-digit phone number"
                          maxLength={10}
                          className={`pl-10 pr-10 ${getInputClassName("phone")}`}
                          disabled={isUpdating || isDeleting || isCheckingOrders}
                          required
                        />
                        <div className="absolute right-3 top-3">{getValidationIcon("phone")}</div>
                      </div>
                      {validation.phone.message && (
                        <p className={`text-xs ${validation.phone.isValid ? "text-green-600" : "text-red-600"}`}>
                          {validation.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        disabled
                        className="pl-10 bg-gray-50 dark:bg-gray-800 cursor-not-allowed"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      New Password (Optional)
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Leave empty to keep current password"
                        className={`pl-10 pr-20 ${getInputClassName("password")}`}
                        disabled={isUpdating || isDeleting || isCheckingOrders}
                      />
                      <div className="absolute right-10 top-3">{getValidationIcon("password")}</div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isUpdating || isDeleting || isCheckingOrders}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    {validation.password.message && (
                      <p className={`text-xs ${validation.password.isValid ? "text-green-600" : "text-red-600"}`}>
                        {validation.password.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Address Information */}
              <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
                <CardHeader className="pb-3 md:pb-4">
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg lg:text-xl">
                    <MapPin className="h-4 w-4 md:h-5 md:w-5" />
                    Address Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <LocationSelector
                    value={formData.address}
                    onChange={handleAddressChange}
                    required={true}
                    disabled={isUpdating || isDeleting || isCheckingOrders}
                  />
                  {validation.address.message && (
                    <p className={`text-xs mt-2 ${validation.address.isValid ? "text-green-600" : "text-red-600"}`}>
                      {validation.address.message}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Profile Summary & Actions */}
            <div className="lg:col-span-1">
              <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg lg:sticky lg:top-6">
                <CardHeader className="pb-3 md:pb-4">
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg lg:text-xl">
                    <Settings className="h-4 w-4 md:h-5 md:w-5" />
                    Account Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Account Status</span>
                      <Badge variant={profile.isVerified ? "default" : "secondary"} className="text-xs">
                        {profile.isVerified ? "Verified" : "Unverified"}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Account Type</span>
                      <Badge variant={profile.isAdmin ? "destructive" : "outline"} className="text-xs">
                        {profile.isAdmin ? "Admin" : "User"}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Member Since</span>
                      <span className="text-sm font-medium">{new Date(profile.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Button
                      onClick={handleUpdateProfile}
                      disabled={!isFormValid() || isUpdating || isDeleting || isCheckingOrders || hasClickedUpdate}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-sm md:text-base"
                      size="lg"
                    >
                      {isUpdating ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Update Profile
                        </>
                      )}
                    </Button>

                    {!isFormValid() && !isUpdating && !isDeleting && !isCheckingOrders && (
                      <p className="text-xs text-muted-foreground text-center">Please fix all validation errors</p>
                    )}

                    <Separator />

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-red-600">Danger Zone</h4>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteAccount}
                        disabled={isUpdating || isDeleting || isCheckingOrders || hasClickedDelete}
                        className="w-full text-sm"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">This action cannot be undone</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Running Dialog */}
      <Dialog open={showOrdersDialog} onOpenChange={setShowOrdersDialog}>
        <DialogContent className="sm:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base md:text-lg">
              <ShoppingCart className="h-5 w-5 text-orange-500" />
              Orders in Progress
            </DialogTitle>
            <DialogDescription className="text-left text-sm">
              You have active orders that prevent account modifications.
            </DialogDescription>
          </DialogHeader>

          <Alert className="mt-4">
            <Clock className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Active Orders Found:</strong> You have {pendingOrders.length} order(s) that are currently being
              processed.
            </AlertDescription>
          </Alert>

          {pendingOrders.length > 0 && (
            <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
              {pendingOrders.map((order) => (
                <div key={order.orderNumber} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium">#{order.orderNumber}</p>
                      <p className="text-xs text-muted-foreground">₹{order.totalAmount}</p>
                    </div>
                    <Badge variant={order.status === "pending" ? "secondary" : "default"} className="text-xs">
                      {order.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3 mt-4">
            <Button variant="outline" onClick={() => setShowOrdersDialog(false)} className="flex-1 text-sm">
              Understood
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={!isDeleting ? setShowDeleteDialog : undefined}>
        <DialogContent className="sm:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base md:text-lg">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Delete Account?
            </DialogTitle>
            <DialogDescription className="text-left text-sm">
              Are you sure you want to delete your account? This will also delete all your orders and data.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              className="flex-1 text-sm"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="flex-1 text-sm"
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Final Delete Confirmation Dialog */}
      <Dialog open={showFinalDeleteDialog} onOpenChange={!isDeleting ? setShowFinalDeleteDialog : undefined}>
        <DialogContent className="sm:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base md:text-lg">
              <Trash2 className="h-5 w-5 text-red-500" />
              Final Confirmation
            </DialogTitle>
            <DialogDescription className="text-left text-sm">
              <strong>This action is irreversible!</strong> Your account, profile data, and all associated orders will
              be permanently deleted.
            </DialogDescription>
          </DialogHeader>

          <Alert className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              All your data including orders, profile information, and account history will be permanently removed from
              our servers.
            </AlertDescription>
          </Alert>

          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowFinalDeleteDialog(false)}
              disabled={isDeleting}
              className="flex-1 text-sm"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleFinalDeleteAccount}
              disabled={isDeleting}
              className="flex-1 text-sm"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Forever"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
