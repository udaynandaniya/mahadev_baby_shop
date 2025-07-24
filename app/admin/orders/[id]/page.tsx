"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  User,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  Printer,
  AlertTriangle,
} from "lucide-react"
import { toast } from "react-hot-toast"
import { format } from "date-fns"
import Image from "next/image"

interface OrderItem {
  _id: string
  productCode: string
  categoryTypeModel: "toy" | "clothes" | "bath" | "newborn"
  name: string
  quantity: number
  priceAtOrder: number
  weightInGrams: number
  images: string[]
}

interface Order {
  _id: string
  orderNumber: string
  userEmail: string
  customerName: string
  customerPhone: string
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
  subtotal: number
  deliveryCharge: number
  totalAmount: number
  status: "pending" | "accepted" | "dispatched" | "completed" | "rejected"
  consignmentNumber?: string
  adminNotes?: string
  statusHistory?: {
    status: string
    timestamp: string
    note?: string
  }[]
  orderDate: string
  updatedAt: string
}

const statusConfig = {
  pending: { color: "bg-yellow-500", icon: Clock, label: "Pending" },
  accepted: { color: "bg-blue-500", icon: CheckCircle, label: "Accepted" },
  dispatched: { color: "bg-purple-500", icon: Truck, label: "Dispatched" },
  completed: { color: "bg-green-500", icon: Package, label: "Completed" },
  rejected: { color: "bg-red-500", icon: XCircle, label: "Rejected" },
}

const statusFlow = ["pending", "accepted", "dispatched", "completed"]

export default function OrderDetailPage() {
  const router = useRouter()
  const params = useParams()
  const orderId = params.id as string

  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isPrinting, setIsPrinting] = useState(false)

  // Form state
  const [newStatus, setNewStatus] = useState<string>("")
  const [consignmentNumber, setConsignmentNumber] = useState<string>("")
  const [adminNote, setAdminNote] = useState<string>("")

  useEffect(() => {
    if (orderId) {
      fetchOrder()
    }
  }, [orderId])

  const fetchOrder = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admin/orders/${orderId}`)
      if (!response.ok) throw new Error("Failed to fetch order")

      const data = await response.json()
      setOrder(data.data)

      // Initialize form state
      if (data.data) {
        setNewStatus(data.data.status)
        setConsignmentNumber(data.data.consignmentNumber || "")
        setAdminNote("")
      }
    } catch (error) {
      console.error("Error fetching order:", error)
      toast.error("Failed to load order details")
    } finally {
      setIsLoading(false)
    }
  }

  const updateOrder = async () => {
    try {
      setIsUpdating(true)

      const payload: any = {
        status: newStatus,
        adminNote,
      }

      if (consignmentNumber.trim()) {
        payload.consignmentNumber = consignmentNumber
      }

      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error("Failed to update order")

      await fetchOrder()
      toast.success("Order updated successfully")
      setAdminNote("")
    } catch (error) {
      console.error("Error updating order:", error)
      toast.error("Failed to update order")
    } finally {
      setIsUpdating(false)
    }
  }

  const printOrder = () => {
    setIsPrinting(true)

    // Create a printable version
    const printWindow = window.open("", "_blank")
    if (!printWindow) {
      toast.error("Pop-up blocked. Please allow pop-ups for this site.")
      setIsPrinting(false)
      return
    }

    // Generate HTML content for printing
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Order #${order?.orderNumber}</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
          }
          .order-info {
            margin-bottom: 20px;
          }
          .customer-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          }
          .info-box {
            width: 48%;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          .totals {
            margin-top: 20px;
            text-align: right;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
          @media print {
            body {
              padding: 0;
              margin: 0;
            }
            button {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Mahadev Baby Shop</h1>
          <h2>Order Invoice</h2>
        </div>
        
        <div class="order-info">
          <p><strong>Order Number:</strong> #${order?.orderNumber}</p>
          <p><strong>Order Date:</strong> ${format(new Date(order?.orderDate || ""), "MMM dd, yyyy 'at' hh:mm a")}</p>
          <p><strong>Status:</strong> ${order?.status.toUpperCase()}</p>
          ${order?.consignmentNumber ? `<p><strong>Tracking Number:</strong> ${order.consignmentNumber}</p>` : ""}
        </div>
        
        <div class="customer-info">
          <div class="info-box">
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> ${order?.customerName}</p>
            <p><strong>Phone:</strong> ${order?.customerPhone}</p>
            <p><strong>Email:</strong> ${order?.userEmail}</p>
          </div>
          
          <div class="info-box">
            <h3>Shipping Address</h3>
            <p>${order?.deliveryAddress.street}, ${order?.deliveryAddress.area}</p>
            <p>${order?.deliveryAddress.village}, ${order?.deliveryAddress.subDistrict}</p>
            <p>${order?.deliveryAddress.district}, ${order?.deliveryAddress.state} - ${order?.deliveryAddress.pincode}</p>
          </div>
        </div>
        
        <h3>Order Items</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${order?.items
              .map(
                (item) => `
              <tr>
                <td>${item.name}</td>
                <td>${item.categoryTypeModel}</td>
                <td>${item.quantity}</td>
                <td>₹${item.priceAtOrder.toFixed(2)}</td>
                <td>₹${(item.quantity * item.priceAtOrder).toFixed(2)}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
        
        <div class="totals">
          <p><strong>Subtotal:</strong> ₹${order?.subtotal.toFixed(2)}</p>
          <p><strong>Delivery Charge:</strong> ₹${order?.deliveryCharge.toFixed(2)}</p>
          <p><strong>Total Amount:</strong> ₹${order?.totalAmount.toFixed(2)}</p>
        </div>
        
        <div class="footer">
          <p>Thank you for shopping with Mahadev Baby Shop!</p>
          <p>For any queries, please contact us at support@mahadevbaby.com</p>
        </div>
        
        <button onclick="window.print(); window.close();" style="padding: 10px 20px; margin: 20px auto; display: block;">
          Print Invoice
        </button>
      </body>
      </html>
    `

    printWindow.document.write(printContent)
    printWindow.document.close()

    // Auto-print when loaded
    printWindow.onload = () => {
      printWindow.print()
      setIsPrinting(false)
    }
  }

  const getNextStatus = (currentStatus: string) => {
    const currentIndex = statusFlow.indexOf(currentStatus)
    if (currentIndex < statusFlow.length - 1) {
      return statusFlow[currentIndex + 1]
    }
    return currentStatus
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-lg font-medium">
          <RefreshCw className="h-6 w-6 animate-spin text-blue-500" />
          Loading Order Details...
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Button>

        <div className="text-center py-12">
          <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Order not found</h3>
          <p className="text-gray-500 mb-6">The order you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push("/admin/orders")}>View All Orders</Button>
        </div>
      </div>
    )
  }

  const statusInfo = statusConfig[order.status]
  const StatusIcon = statusInfo.icon
  const nextStatus = getNextStatus(order.status)
  const canUpdateToNextStatus = order.status !== "completed" && order.status !== "rejected"
  const needsConsignmentNumber = newStatus === "dispatched" && !consignmentNumber

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => router.back()} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Order #{order.orderNumber}</h1>
            <p className="text-muted-foreground">
              Placed on {format(new Date(order.orderDate), "MMM dd, yyyy 'at' hh:mm a")}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={printOrder} disabled={isPrinting}>
            {isPrinting ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Printer className="h-4 w-4 mr-2" />}
            Print Invoice
          </Button>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-2">
        <Badge className={`${statusInfo.color} text-white px-3 py-1 text-sm`}>
          <StatusIcon className="h-4 w-4 mr-2" />
          {statusInfo.label}
        </Badge>
        {order.consignmentNumber && (
          <Badge variant="outline" className="px-3 py-1 text-sm">
            <Truck className="h-4 w-4 mr-2" />
            Tracking: {order.consignmentNumber}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer and Shipping Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold text-lg">{order.customerName}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {order.customerPhone}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {order.userEmail}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p>{order.deliveryAddress.street},</p>
                <p>{order.deliveryAddress.area},</p>
                <p>
                  {order.deliveryAddress.village}, {order.deliveryAddress.subDistrict},
                </p>
                <p>
                  {order.deliveryAddress.district}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Order Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Update Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status Update */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="dispatched">Dispatched</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Consignment Number */}
              {(newStatus === "dispatched" || order.status === "dispatched") && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tracking Number</label>
                  <Input
                    placeholder="Enter tracking/consignment number"
                    value={consignmentNumber}
                    onChange={(e) => setConsignmentNumber(e.target.value)}
                    className={needsConsignmentNumber ? "border-red-500" : ""}
                  />
                  {needsConsignmentNumber && (
                    <p className="text-xs text-red-500">Tracking number is required for dispatched orders</p>
                  )}
                </div>
              )}

              {/* Admin Notes */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Add Note (Optional)</label>
                <Textarea
                  placeholder="Add notes about this update"
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                {canUpdateToNextStatus && order.status !== newStatus && (
                  <Button
                    onClick={updateOrder}
                    disabled={isUpdating || (newStatus === "dispatched" && !consignmentNumber)}
                    className="flex-1"
                  >
                    {isUpdating ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Order"
                    )}
                  </Button>
                )}

                {order.status !== "rejected" && order.status !== newStatus && newStatus !== "rejected" && (
                  <Button
                    variant="outline"
                    onClick={() => setNewStatus(order.status)}
                    disabled={isUpdating}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items ({order.items.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 py-3">
                    <div className="w-16 h-16 relative flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                      {item.images && item.images[0] ? (
                        <Image
                          src={item.images[0] || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          <Package className="h-8 w-8" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className="capitalize">
                              {item.categoryTypeModel}
                            </Badge>
                            <span>×{item.quantity}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">₹{item.priceAtOrder}</div>
                          <div className="text-sm text-muted-foreground">
                            Total: ₹{(item.quantity * item.priceAtOrder).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Charge</span>
                  <span>₹{order.deliveryCharge.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-green-600">₹{order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status History */}
          {order.statusHistory && order.statusHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Status History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.statusHistory.map((history, index) => {
                    const historyStatusInfo = statusConfig[history.status as keyof typeof statusConfig]
                    const HistoryIcon = historyStatusInfo?.icon || Clock

                    return (
                      <div key={index} className="flex gap-4">
                        <div
                          className={`${historyStatusInfo?.color || "bg-gray-500"} p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0`}
                        >
                          <HistoryIcon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <p className="font-medium">
                              Status changed to{" "}
                              <span className="font-semibold">{historyStatusInfo?.label || history.status}</span>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(history.timestamp), "MMM dd, yyyy 'at' hh:mm a")}
                            </p>
                          </div>
                          {history.note && <p className="text-sm mt-1">{history.note}</p>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
