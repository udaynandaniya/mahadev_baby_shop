// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
// import {
//   Package,
//   Download,
//   Eye,
//   Calendar,
//   MapPin,
//   Phone,
//   Mail,
//   Truck,
//   CheckCircle,
//   Clock,
//   XCircle,
//   RefreshCw,
//   FileText,
// } from "lucide-react"
// import { toast } from "react-hot-toast"
// import { AnimatedBackground } from "@/components/animated-background"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { InvoicePreview } from "@/components/invoice-preview"

// interface OrderItem {
//   productCode: string
//   categoryTypeModel: string
//   name: string
//   quantity: number
//   priceAtOrder: number
//   weightInGrams: number
// }

// interface DeliveryAddress {
//   street: string
//   area: string
//   state: string
//   district: string
//   subDistrict: string
//   village: string
//   pincode: string
// }

// interface Order {
//   _id: string
//   orderNumber: string
//   userEmail: string
//   customerName: string
//   customerPhone: string
//   deliveryAddress: DeliveryAddress
//   items: OrderItem[]
//   subtotal: number
//   deliveryCharge: number
//   totalAmount: number
//   status: "pending" | "accepted" | "dispatched" | "completed" | "rejected"
//   consignmentNumber?: string
//   orderDate: string
//   updatedAt: string
// }

// export default function MyOrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
//   const [showOrderDetails, setShowOrderDetails] = useState(false)
//   const [userEmail, setUserEmail] = useState("")

//   useEffect(() => {
//     // Get user email from localStorage or prompt
//     const email = localStorage.getItem("userEmail") || prompt("Enter your email to view orders:")
//     if (email) {
//       setUserEmail(email)
//       localStorage.setItem("userEmail", email)
//       fetchOrders(email)
//     } else {
//       setIsLoading(false)
//     }
//   }, [])

//   const fetchOrders = async (email: string) => {
//     try {
//       setIsLoading(true)
//       const response = await fetch(`/api/orders/user?email=${encodeURIComponent(email)}`)

//       if (!response.ok) {
//         throw new Error("Failed to fetch orders")
//       }

//       const data = await response.json()
//       setOrders(data.orders || [])
//     } catch (error) {
//       console.error("Error fetching orders:", error)
//       toast.error("Failed to load orders")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200"
//       case "accepted":
//         return "bg-blue-100 text-blue-800 border-blue-200"
//       case "dispatched":
//         return "bg-purple-100 text-purple-800 border-purple-200"
//       case "completed":
//         return "bg-green-100 text-green-800 border-green-200"
//       case "rejected":
//         return "bg-red-100 text-red-800 border-red-200"
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200"
//     }
//   }

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "pending":
//         return <Clock className="h-4 w-4" />
//       case "accepted":
//         return <CheckCircle className="h-4 w-4" />
//       case "dispatched":
//         return <Truck className="h-4 w-4" />
//       case "completed":
//         return <CheckCircle className="h-4 w-4" />
//       case "rejected":
//         return <XCircle className="h-4 w-4" />
//       default:
//         return <Package className="h-4 w-4" />
//     }
//   }

//   const downloadInvoice = async (order: Order) => {
//     try {
//       const response = await fetch("/api/invoice/generate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ orderId: order._id }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to generate invoice")
//       }

//       const blob = await response.blob()
//       const url = window.URL.createObjectURL(blob)
//       const a = document.createElement("a")
//       a.style.display = "none"
//       a.href = url
//       a.download = `Invoice-${order.orderNumber}.pdf`
//       document.body.appendChild(a)
//       a.click()
//       window.URL.revokeObjectURL(url)
//       document.body.removeChild(a)

//       toast.success("Invoice downloaded successfully!")
//     } catch (error) {
//       console.error("Error downloading invoice:", error)
//       toast.error("Failed to download invoice")
//     }
//   }

//   const viewOrderDetails = (order: Order) => {
//     setSelectedOrder(order)
//     setShowOrderDetails(true)
//   }

//   const refreshOrders = () => {
//     if (userEmail) {
//       fetchOrders(userEmail)
//     }
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

//   if (!userEmail) {
//     return (
//       <div className="min-h-screen relative">
//         <AnimatedBackground />
//         <div className="relative z-10 flex items-center justify-center min-h-screen">
//           <div className="text-center">
//             <h2 className="text-2xl font-bold text-gray-600 mb-4">Email Required</h2>
//             <p className="text-gray-500 mb-4">Please provide your email to view orders</p>
//             <Button onClick={() => window.location.reload()}>Enter Email</Button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen relative">
//       <AnimatedBackground />
//       <div className="relative z-10">
//         <div className="container mx-auto px-4 py-6">
//           {/* Header */}
//           <div className="mb-6 md:mb-8">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent flex items-center gap-2 md:gap-3">
//                   <Package className="h-6 w-6 md:h-8 md:w-8 text-pink-500" />
//                   My Orders
//                 </h1>
//                 <p className="text-muted-foreground mt-2 text-sm md:text-base">
//                   Track your orders and download invoices
//                 </p>
//               </div>
//               <Button
//                 variant="outline"
//                 onClick={refreshOrders}
//                 className="hover:bg-pink-50 dark:hover:bg-pink-900/20 bg-transparent"
//               >
//                 <RefreshCw className="h-4 w-4 mr-2" />
//                 Refresh
//               </Button>
//             </div>
//           </div>

//           {orders.length === 0 ? (
//             <div className="space-y-8">
//               <div className="text-center py-12">
//                 <Package className="h-24 w-24 text-gray-400 mx-auto mb-6" />
//                 <h2 className="text-2xl font-bold text-gray-600 mb-4">No Orders Found</h2>
//                 <p className="text-gray-500 mb-8">You haven't placed any orders yet.</p>
//                 <Button
//                   onClick={() => (window.location.href = "/products/clothes")}
//                   className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
//                 >
//                   Start Shopping
//                 </Button>
//               </div>

//               {/* Invoice Preview */}
//               <div>
//                 <h2 className="text-2xl font-bold text-center mb-6">Sample Professional Invoice</h2>
//                 <InvoicePreview />
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {orders.map((order) => (
//                 <Card key={order._id} className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
//                   <CardHeader className="pb-3">
//                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                       <div>
//                         <CardTitle className="text-lg md:text-xl">Order #{order.orderNumber}</CardTitle>
//                         <div className="flex items-center gap-2 mt-2">
//                           <Calendar className="h-4 w-4 text-muted-foreground" />
//                           <span className="text-sm text-muted-foreground">
//                             {new Date(order.orderDate).toLocaleDateString("en-IN", {
//                               year: "numeric",
//                               month: "long",
//                               day: "numeric",
//                             })}
//                           </span>
//                         </div>
//                       </div>
//                       <div className="flex flex-col md:items-end gap-2">
//                         <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
//                           {getStatusIcon(order.status)}
//                           {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                         </Badge>
//                         <span className="text-lg font-bold text-green-600">₹{order.totalAmount}</span>
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     {/* Order Items Summary */}
//                     <div>
//                       <h4 className="font-semibold mb-2">Items ({order.items.length})</h4>
//                       <div className="space-y-2">
//                         {order.items.slice(0, 2).map((item, index) => (
//                           <div key={index} className="flex justify-between text-sm">
//                             <span className="line-clamp-1">{item.name}</span>
//                             <span>
//                               Qty: {item.quantity} × ₹{item.priceAtOrder}
//                             </span>
//                           </div>
//                         ))}
//                         {order.items.length > 2 && (
//                           <p className="text-sm text-muted-foreground">+{order.items.length - 2} more items</p>
//                         )}
//                       </div>
//                     </div>

//                     <Separator />

//                     {/* Delivery Address */}
//                     <div>
//                       <h4 className="font-semibold mb-2 flex items-center gap-2">
//                         <MapPin className="h-4 w-4" />
//                         Delivery Address
//                       </h4>
//                       <p className="text-sm text-muted-foreground">
//                         {order.deliveryAddress.street}, {order.deliveryAddress.area}, {order.deliveryAddress.village},{" "}
//                         {order.deliveryAddress.district}, {order.deliveryAddress.state} -{" "}
//                         {order.deliveryAddress.pincode}
//                       </p>
//                     </div>

//                     {order.consignmentNumber && (
//                       <div>
//                         <h4 className="font-semibold mb-2 flex items-center gap-2">
//                           <Truck className="h-4 w-4" />
//                           Tracking Number
//                         </h4>
//                         <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
//                           {order.consignmentNumber}
//                         </p>
//                       </div>
//                     )}

//                     <Separator />

//                     {/* Action Buttons */}
//                     <div className="flex flex-col sm:flex-row gap-3">
//                       <Button variant="outline" onClick={() => viewOrderDetails(order)} className="flex-1">
//                         <Eye className="h-4 w-4 mr-2" />
//                         View Details
//                       </Button>

//                       {order.status === "completed" && (
//                         <Button
//                           onClick={() => downloadInvoice(order)}
//                           className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
//                         >
//                           <Download className="h-4 w-4 mr-2" />
//                           Download Professional Invoice
//                         </Button>
//                       )}

//                       {order.status !== "completed" && order.status !== "rejected" && (
//                         <Button variant="secondary" disabled className="flex-1">
//                           <FileText className="h-4 w-4 mr-2" />
//                           Invoice Available After Completion
//                         </Button>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Order Details Dialog */}
//       <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
//         <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className="flex items-center gap-2">
//               <Package className="h-5 w-5" />
//               Order Details - #{selectedOrder?.orderNumber}
//             </DialogTitle>
//             <DialogDescription>Complete details of your order</DialogDescription>
//           </DialogHeader>

//           {selectedOrder && (
//             <div className="space-y-6 mt-4">
//               {/* Customer Info */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <h4 className="font-semibold mb-2">Customer Information</h4>
//                   <div className="space-y-1 text-sm">
//                     <p>
//                       <strong>Name:</strong> {selectedOrder.customerName}
//                     </p>
//                     <p className="flex items-center gap-2">
//                       <Phone className="h-3 w-3" />
//                       {selectedOrder.customerPhone}
//                     </p>
//                     <p className="flex items-center gap-2">
//                       <Mail className="h-3 w-3" />
//                       {selectedOrder.userEmail}
//                     </p>
//                   </div>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold mb-2">Order Status</h4>
//                   <Badge className={`${getStatusColor(selectedOrder.status)} flex items-center gap-1 w-fit`}>
//                     {getStatusIcon(selectedOrder.status)}
//                     {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
//                   </Badge>
//                   {selectedOrder.consignmentNumber && (
//                     <div className="mt-2">
//                       <p className="text-sm">
//                         <strong>Tracking:</strong> {selectedOrder.consignmentNumber}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <Separator />

//               {/* Items */}
//               <div>
//                 <h4 className="font-semibold mb-3">Order Items</h4>
//                 <div className="space-y-3">
//                   {selectedOrder.items.map((item, index) => (
//                     <div
//                       key={index}
//                       className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
//                     >
//                       <div className="flex-1">
//                         <p className="font-medium">{item.name}</p>
//                         <p className="text-sm text-muted-foreground">Code: {item.productCode}</p>
//                         <p className="text-sm text-muted-foreground">Weight: {item.weightInGrams}g each</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-semibold">
//                           ₹{item.priceAtOrder} × {item.quantity}
//                         </p>
//                         <p className="text-sm text-green-600">₹{item.priceAtOrder * item.quantity}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <Separator />

//               {/* Delivery Address */}
//               <div>
//                 <h4 className="font-semibold mb-2 flex items-center gap-2">
//                   <MapPin className="h-4 w-4" />
//                   Delivery Address
//                 </h4>
//                 <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
//                   <p className="text-sm">
//                     {selectedOrder.deliveryAddress.street}
//                     <br />
//                     {selectedOrder.deliveryAddress.area}
//                     <br />
//                     {selectedOrder.deliveryAddress.village}, {selectedOrder.deliveryAddress.subDistrict}
//                     <br />
//                     {selectedOrder.deliveryAddress.district}, {selectedOrder.deliveryAddress.state} -{" "}
//                     {selectedOrder.deliveryAddress.pincode}
//                   </p>
//                 </div>
//               </div>

//               <Separator />

//               {/* Pricing */}
//               <div>
//                 <h4 className="font-semibold mb-3">Pricing Details</h4>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span>Subtotal</span>
//                     <span>₹{selectedOrder.subtotal}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Delivery Charge</span>
//                     <span>₹{selectedOrder.deliveryCharge}</span>
//                   </div>
//                   <Separator />
//                   <div className="flex justify-between font-bold text-lg">
//                     <span>Total Amount</span>
//                     <span className="text-green-600">₹{selectedOrder.totalAmount}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Download Invoice Button */}
//               {selectedOrder.status === "completed" && (
//                 <Button
//                   onClick={() => downloadInvoice(selectedOrder)}
//                   className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
//                 >
//                   <Download className="h-4 w-4 mr-2" />
//                   Download Professional Invoice
//                 </Button>
//               )}
//             </div>
//           )}
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
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Package,
  Download,
  Eye,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  FileText,
  LogIn,
  User,
} from "lucide-react"
import { toast } from "react-hot-toast"
import { AnimatedBackground } from "@/components/animated-background"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { InvoicePreview } from "@/components/invoice-preview"
import { useAuth } from "@/app/contexts/auth-provider"

interface OrderItem {
  productCode: string
  categoryTypeModel: string
  name: string
  quantity: number
  priceAtOrder: number
  weightInGrams: number
}

interface DeliveryAddress {
  street: string
  area: string
  state: string
  district: string
  subDistrict: string
  village: string
  pincode: string
}

interface Order {
  _id: string
  orderNumber: string
  userEmail: string
  customerName: string
  customerPhone: string
  deliveryAddress: DeliveryAddress
  items: OrderItem[]
  subtotal: number
  deliveryCharge: number
  totalAmount: number
  status: "pending" | "accepted" | "dispatched" | "completed" | "rejected"
  consignmentNumber?: string
  orderDate: string
  updatedAt: string
}

export default function MyOrdersPage() {
  const { isAuthenticated, user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        toast.error("Please login to view your orders")
        router.push("/auth/login")
        return
      }

      if (user?.email) {
        fetchOrders(user.email)
      }
    }
  }, [isAuthenticated, user, authLoading, router])

  const fetchOrders = async (email: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/orders/user?email=${encodeURIComponent(email)}`, {
        credentials: "include",
      })

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Session expired. Please login again.")
          router.push("/auth/login")
          return
        }
        throw new Error("Failed to fetch orders")
      }

      const data = await response.json()
      setOrders(data.orders || [])
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast.error("Failed to load orders")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "accepted":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "dispatched":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "accepted":
        return <CheckCircle className="h-4 w-4" />
      case "dispatched":
        return <Truck className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const downloadInvoice = async (order: Order) => {
    try {
      const response = await fetch("/api/invoice/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ orderId: order._id }),
      })

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Session expired. Please login again.")
          router.push("/auth/login")
          return
        }
        throw new Error("Failed to generate invoice")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = `Invoice-${order.orderNumber}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast.success("Invoice downloaded successfully!")
    } catch (error) {
      console.error("Error downloading invoice:", error)
      toast.error("Failed to download invoice")
    }
  }

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
  }

  const refreshOrders = () => {
    if (user?.email) {
      fetchOrders(user.email)
    }
  }

  // Show loading while checking authentication
  if (authLoading || (isLoading && isAuthenticated)) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your orders...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md mx-4">
            <LogIn className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-600 mb-4">Login Required</h2>
            <p className="text-gray-500 mb-8">Please login to view your orders and download invoices.</p>
            <Button
              onClick={() => router.push("/auth/login")}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              size="lg"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login to Continue
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent flex items-center gap-2 md:gap-3">
                  <Package className="h-6 w-6 md:h-8 md:w-8 text-pink-500" />
                  My Orders
                </h1>
                <div className="flex items-center gap-2 mt-2 text-sm md:text-base text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>Welcome, {user?.name || user?.email}</span>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={refreshOrders}
                className="hover:bg-pink-50 dark:hover:bg-pink-900/20 bg-transparent"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="space-y-8">
              <div className="text-center py-12">
                <Package className="h-24 w-24 text-gray-400 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-600 mb-4">No Orders Found</h2>
                <p className="text-gray-500 mb-8">You haven't placed any orders yet.</p>
                <Button
                  onClick={() => router.push("/products/clothes")}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  Start Shopping
                </Button>
              </div>

              {/* Invoice Preview */}
              <div>
                <h2 className="text-2xl font-bold text-center mb-6">Sample Professional Invoice</h2>
                <InvoicePreview />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order._id} className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg md:text-xl">Order #{order.orderNumber}</CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {new Date(order.orderDate).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end gap-2">
                        <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        <span className="text-lg font-bold text-green-600">₹{order.totalAmount}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Order Items Summary */}
                    <div>
                      <h4 className="font-semibold mb-2">Items ({order.items.length})</h4>
                      <div className="space-y-2">
                        {order.items.slice(0, 2).map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="line-clamp-1">{item.name}</span>
                            <span>
                              Qty: {item.quantity} × ₹{item.priceAtOrder}
                            </span>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-sm text-muted-foreground">+{order.items.length - 2} more items</p>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Delivery Address */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Delivery Address
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {order.deliveryAddress.street}, {order.deliveryAddress.area}, {order.deliveryAddress.village},{" "}
                        {order.deliveryAddress.district}, {order.deliveryAddress.state} -{" "}
                        {order.deliveryAddress.pincode}
                      </p>
                    </div>

                    {order.consignmentNumber && (
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Truck className="h-4 w-4" />
                          Tracking Number
                        </h4>
                        <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
                          {order.consignmentNumber}
                        </p>
                      </div>
                    )}

                    <Separator />

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="outline" onClick={() => viewOrderDetails(order)} className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>

                      {order.status === "completed" && (
                        <Button
                          onClick={() => downloadInvoice(order)}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Professional Invoice
                        </Button>
                      )}

                      {order.status !== "completed" && order.status !== "rejected" && (
                        <Button variant="secondary" disabled className="flex-1">
                          <FileText className="h-4 w-4 mr-2" />
                          Invoice Available After Completion
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Details - #{selectedOrder?.orderNumber}
            </DialogTitle>
            <DialogDescription>Complete details of your order</DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6 mt-4">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Customer Information</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Name:</strong> {selectedOrder.customerName}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      {selectedOrder.customerPhone}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      {selectedOrder.userEmail}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Order Status</h4>
                  <Badge className={`${getStatusColor(selectedOrder.status)} flex items-center gap-1 w-fit`}>
                    {getStatusIcon(selectedOrder.status)}
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </Badge>
                  {selectedOrder.consignmentNumber && (
                    <div className="mt-2">
                      <p className="text-sm">
                        <strong>Tracking:</strong> {selectedOrder.consignmentNumber}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Items */}
              <div>
                <h4 className="font-semibold mb-3">Order Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Code: {item.productCode}</p>
                        <p className="text-sm text-muted-foreground">Weight: {item.weightInGrams}g each</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ₹{item.priceAtOrder} × {item.quantity}
                        </p>
                        <p className="text-sm text-green-600">₹{item.priceAtOrder * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Delivery Address */}
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Delivery Address
                </h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-sm">
                    {selectedOrder.deliveryAddress.street}
                    <br />
                    {selectedOrder.deliveryAddress.area}
                    <br />
                    {selectedOrder.deliveryAddress.village}, {selectedOrder.deliveryAddress.subDistrict}
                    <br />
                    {selectedOrder.deliveryAddress.district}, {selectedOrder.deliveryAddress.state} -{" "}
                    {selectedOrder.deliveryAddress.pincode}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Pricing */}
              <div>
                <h4 className="font-semibold mb-3">Pricing Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{selectedOrder.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charge</span>
                    <span>₹{selectedOrder.deliveryCharge}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span className="text-green-600">₹{selectedOrder.totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Download Invoice Button */}
              {selectedOrder.status === "completed" && (
                <Button
                  onClick={() => downloadInvoice(selectedOrder)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Professional Invoice
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

