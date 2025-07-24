"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Eye,
  Download,
  RefreshCw,
  ShoppingBag,
  Calendar,
  MapPin,
  Phone,
  Mail,
  FileText,
} from "lucide-react"
import { toast } from "react-hot-toast"
import { format } from "date-fns"
import Link from "next/link"
import { AnimatedBackground } from "@/components/animated-background"

interface OrderItem {
  productCode: string
  categoryTypeModel: "toy" | "clothes" | "bath" | "newborn"
  name: string
  quantity: number
  priceAtOrder: number
  weightInGrams: number
}

interface Order {
  _id: string
  orderNumber: string
  userEmail: string
  customerInfo: {
    name: string
    phone: string
  }
  deliveryAddress: {
    street: string
    area: string
    state: string
    district: string
    subDistrict: string
    village: string
    pincode: string
  }
  items: OrderItem[]
  pricing: {
    itemsTotal: number
    deliveryCharge: number
    totalWeight: number
    finalTotal: number
  }
  status: "pending" | "accepted" | "dispatched" | "completed" | "rejected"
  consignmentNumber?: string
  statusHistory: {
    status: string
    timestamp: string
    note?: string
  }[]
  createdAt: string
  updatedAt: string
}

const statusConfig = {
  pending: {
    color: "bg-yellow-500",
    textColor: "text-yellow-700",
    bgColor: "bg-yellow-50",
    icon: Clock,
    label: "Order Placed",
    description: "Your order has been placed and is being processed",
  },
  accepted: {
    color: "bg-blue-500",
    textColor: "text-blue-700",
    bgColor: "bg-blue-50",
    icon: CheckCircle,
    label: "Order Confirmed",
    description: "Your order has been confirmed and is being prepared",
  },
  dispatched: {
    color: "bg-purple-500",
    textColor: "text-purple-700",
    bgColor: "bg-purple-50",
    icon: Truck,
    label: "Order Shipped",
    description: "Your order is on the way to your delivery address",
  },
  completed: {
    color: "bg-green-500",
    textColor: "text-green-700",
    bgColor: "bg-green-50",
    icon: Package,
    label: "Order Delivered",
    description: "Your order has been successfully delivered",
  },
  rejected: {
    color: "bg-red-500",
    textColor: "text-red-700",
    bgColor: "bg-red-50",
    icon: XCircle,
    label: "Order Cancelled",
    description: "Your order has been cancelled",
  },
}

export default function UserOrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState("")
  const [downloadingInvoice, setDownloadingInvoice] = useState<string | null>(null)

  useEffect(() => {
    // Get user email from localStorage or session
    const email = localStorage.getItem("userEmail") || ""
    if (!email) {
      // Redirect to login if no email found
      router.push("/login")
      return
    }
    setUserEmail(email)
    fetchOrders(email)
  }, [router])

  const fetchOrders = async (email: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/orders?userEmail=${encodeURIComponent(email)}`)
      if (!response.ok) throw new Error("Failed to fetch orders")

      const data = await response.json()
      setOrders(data.data || [])
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast.error("Failed to load your orders")
    } finally {
      setIsLoading(false)
    }
  }

  const downloadInvoice = async (orderNumber: string) => {
    try {
      setDownloadingInvoice(orderNumber)

      const response = await fetch(`/api/orders/${orderNumber}/invoice`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate invoice")
      }

      // Get the PDF blob
      const blob = await response.blob()

      // Create download link
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `invoice-${orderNumber}.pdf`
      document.body.appendChild(a)
      a.click()

      // Cleanup
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast.success("Invoice downloaded successfully!")
    } catch (error) {
      console.error("Error downloading invoice:", error)
      toast.error(error instanceof Error ? error.message : "Failed to download invoice")
    } finally {
      setDownloadingInvoice(null)
    }
  }

  const getStatusProgress = (status: string) => {
    const statusOrder = ["pending", "accepted", "dispatched", "completed"]
    const currentIndex = statusOrder.indexOf(status)
    return ((currentIndex + 1) / statusOrder.length) * 100
  }

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="flex items-center gap-3 text-lg font-medium">
            <RefreshCw className="h-6 w-6 animate-spin text-blue-500" />
            Loading Your Orders...
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
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent flex items-center gap-3">
              <Package className="h-8 w-8 text-blue-500" />
              My Orders
            </h1>
            <p className="text-muted-foreground mt-2">Track and manage your orders from Mahadev Baby Shop</p>
          </div>

          {/* Orders List */}
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">No orders yet</h3>
              <p className="text-gray-500 mb-8">
                You haven't placed any orders yet. Start shopping to see your orders here!
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Link href="/products/clothes">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Start Shopping
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const statusInfo = statusConfig[order.status]
                const StatusIcon = statusInfo.icon
                const progress = getStatusProgress(order.status)

                return (
                  <Card
                    key={order._id}
                    className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                            Order #{order.orderNumber}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              Placed on {format(new Date(order.createdAt), "MMM dd, yyyy 'at' hh:mm a")}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Badge className={`${statusInfo.color} text-white px-3 py-1`}>
                            <StatusIcon className="h-4 w-4 mr-2" />
                            {statusInfo.label}
                          </Badge>

                          {/* Download Invoice Button - Only for completed orders */}
                          {order.status === "completed" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => downloadInvoice(order.orderNumber)}
                              disabled={downloadingInvoice === order.orderNumber}
                              className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                            >
                              {downloadingInvoice === order.orderNumber ? (
                                <>
                                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                  Generating...
                                </>
                              ) : (
                                <>
                                  <Download className="h-4 w-4 mr-2" />
                                  Invoice
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Status Progress Bar */}
                      {order.status !== "rejected" && (
                        <div className="mt-4">
                          <div className="flex justify-between text-xs text-muted-foreground mb-2">
                            <span>Order Progress</span>
                            <span>{Math.round(progress)}% Complete</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ${
                                order.status === "completed" ? "bg-green-500" : "bg-blue-500"
                              }`}
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Status Description */}
                      <div className={`p-4 rounded-lg ${statusInfo.bgColor}`}>
                        <div className="flex items-center gap-3">
                          <StatusIcon className={`h-5 w-5 ${statusInfo.textColor}`} />
                          <div>
                            <p className={`font-medium ${statusInfo.textColor}`}>{statusInfo.label}</p>
                            <p className="text-sm text-muted-foreground">{statusInfo.description}</p>
                          </div>
                        </div>

                        {order.consignmentNumber && order.status === "dispatched" && (
                          <div className="mt-3 p-3 bg-white/50 rounded-md">
                            <div className="flex items-center gap-2">
                              <Truck className="h-4 w-4 text-purple-600" />
                              <span className="font-medium text-sm">Tracking Number:</span>
                              <span className="font-mono text-sm bg-purple-100 px-2 py-1 rounded">
                                {order.consignmentNumber}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Order Items */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          Items Ordered ({order.items.length})
                        </h4>
                        <div className="space-y-3">
                          {order.items.slice(0, 3).map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                            >
                              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                <Package className="h-6 w-6 text-gray-400" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span>Code: {item.productCode}</span>
                                  <span>Qty: {item.quantity}</span>
                                  <span>₹{item.priceAtOrder}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">₹{(item.quantity * item.priceAtOrder).toFixed(2)}</p>
                              </div>
                            </div>
                          ))}

                          {order.items.length > 3 && (
                            <div className="text-center">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View {order.items.length - 3} more items
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Delivery Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Delivery Address
                          </h4>
                          <div className="text-sm space-y-1 text-muted-foreground">
                            <p>{order.deliveryAddress.street}</p>
                            <p>{order.deliveryAddress.area}</p>
                            <p>
                              {order.deliveryAddress.village}, {order.deliveryAddress.subDistrict}
                            </p>
                            <p>
                              {order.deliveryAddress.district}, {order.deliveryAddress.state}
                            </p>
                            <p className="font-medium">PIN: {order.deliveryAddress.pincode}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Contact Information
                          </h4>
                          <div className="text-sm space-y-2 text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3" />
                              <span>{order.customerInfo.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-3 w-3" />
                              <span>{order.userEmail}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Order Summary */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-4 text-sm">
                            <span>Items Total: ₹{order.pricing.itemsTotal.toFixed(2)}</span>
                            <span>Delivery: ₹{order.pricing.deliveryCharge.toFixed(2)}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Total Weight: {Math.ceil(order.pricing.totalWeight / 1000)}kg
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">₹{order.pricing.finalTotal.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">Total Amount</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={() => router.push(`/orders/${order.orderNumber}`)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>

                        {order.status === "completed" && (
                          <Button
                            onClick={() => downloadInvoice(order.orderNumber)}
                            disabled={downloadingInvoice === order.orderNumber}
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                          >
                            {downloadingInvoice === order.orderNumber ? (
                              <>
                                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                Generating Invoice...
                              </>
                            ) : (
                              <>
                                <FileText className="h-4 w-4 mr-2" />
                                Download Invoice
                              </>
                            )}
                          </Button>
                        )}

                        {order.status === "dispatched" && order.consignmentNumber && (
                          <Button variant="outline" className="flex-1 bg-transparent">
                            <Truck className="h-4 w-4 mr-2" />
                            Track Package
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
