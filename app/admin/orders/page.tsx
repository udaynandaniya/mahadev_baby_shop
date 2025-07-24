// //C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\app\admin\orders\page.tsx

// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
// import {
//   Package,
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
//   Search,
//   Filter,
//   Edit,
//   Save,
//   X,
//   AlertTriangle,
//   User,
//   CalendarDays,
//   FileText,
// } from "lucide-react"
// import { toast } from "react-hot-toast"
// import { AnimatedBackground } from "@/components/animated-background"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Calendar as CalendarComponent } from "@/components/ui/calendar"
// import { format } from "date-fns"

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
//   isReadByAdmin: boolean
// }

// interface FilterState {
//   search: string
//   status: string
//   dateFrom: Date | undefined
//   dateTo: Date | undefined
//   minAmount: string
//   maxAmount: string
//   state: string
//   district: string
// }

// export default function AdminOrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([])
//   const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
//   const [showOrderDetails, setShowOrderDetails] = useState(false)
//   const [editingConsignment, setEditingConsignment] = useState<string | null>(null)
//   const [consignmentNumber, setConsignmentNumber] = useState("")
//   const [isUpdating, setIsUpdating] = useState(false)
//   const [isDownloading, setIsDownloading] = useState(false)

//   // Advanced filters
//   const [filters, setFilters] = useState<FilterState>({
//     search: "",
//     status: "all",
//     dateFrom: undefined,
//     dateTo: undefined,
//     minAmount: "",
//     maxAmount: "",
//     state: "all",
//     district: "all",
//   })

//   const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
//   const [uniqueStates, setUniqueStates] = useState<string[]>([])
//   const [uniqueDistricts, setUniqueDistricts] = useState<string[]>([])

//   // Real-time updates
//   useEffect(() => {
//     fetchOrders()
//     const interval = setInterval(fetchOrders, 30000) // Refresh every 30 seconds
//     return () => clearInterval(interval)
//   }, [])

//   // Extract unique states and districts for filters
//   useEffect(() => {
//     const states = [...new Set(orders.map((order) => order.deliveryAddress.state))].filter(Boolean).sort()
//     const districts = [...new Set(orders.map((order) => order.deliveryAddress.district))].filter(Boolean).sort()
//     setUniqueStates(states)
//     setUniqueDistricts(districts)
//   }, [orders])

//   // Apply filters
//   useEffect(() => {
//     let filtered = orders

//     // Search filter
//     if (filters.search) {
//       const searchTerm = filters.search.toLowerCase()
//       filtered = filtered.filter(
//         (order) =>
//           order.orderNumber.toLowerCase().includes(searchTerm) ||
//           order.customerName.toLowerCase().includes(searchTerm) ||
//           order.userEmail.toLowerCase().includes(searchTerm) ||
//           order.customerPhone.includes(searchTerm) ||
//           order.consignmentNumber?.toLowerCase().includes(searchTerm) ||
//           order.items.some(
//             (item) =>
//               item.name.toLowerCase().includes(searchTerm) || item.productCode.toLowerCase().includes(searchTerm),
//           ),
//       )
//     }

//     // Status filter
//     if (filters.status !== "all") {
//       filtered = filtered.filter((order) => order.status === filters.status)
//     }

//     // Date range filter
//     if (filters.dateFrom) {
//       filtered = filtered.filter((order) => new Date(order.orderDate) >= filters.dateFrom!)
//     }
//     if (filters.dateTo) {
//       const endDate = new Date(filters.dateTo)
//       endDate.setHours(23, 59, 59, 999) // Include the entire end date
//       filtered = filtered.filter((order) => new Date(order.orderDate) <= endDate)
//     }

//     // Amount range filter
//     if (filters.minAmount) {
//       filtered = filtered.filter((order) => order.totalAmount >= Number.parseFloat(filters.minAmount))
//     }
//     if (filters.maxAmount) {
//       filtered = filtered.filter((order) => order.totalAmount <= Number.parseFloat(filters.maxAmount))
//     }

//     // Location filters
//     if (filters.state !== "all") {
//       filtered = filtered.filter((order) => order.deliveryAddress.state === filters.state)
//     }
//     if (filters.district !== "all") {
//       filtered = filtered.filter((order) => order.deliveryAddress.district === filters.district)
//     }

//     setFilteredOrders(filtered)
//   }, [orders, filters])

//   const fetchOrders = async () => {
//     try {
//       setIsLoading(true)
//       const response = await fetch("/api/admin/orders", {
//         credentials: "include",
//       })

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

//   const updateOrderStatus = async (orderId: string, newStatus: string) => {
//     try {
//       setIsUpdating(true)
//       const response = await fetch("/api/admin/orders/update-status", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({ orderId, status: newStatus }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update order status")
//       }

//       await fetchOrders()
//       toast.success(`Order status updated to ${newStatus}`)
//     } catch (error) {
//       console.error("Error updating order status:", error)
//       toast.error("Failed to update order status")
//     } finally {
//       setIsUpdating(false)
//     }
//   }

//   const updateConsignmentNumber = async (orderId: string, consignmentNum: string) => {
//     try {
//       setIsUpdating(true)
//       const response = await fetch("/api/admin/orders/update-consignment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({ orderId, consignmentNumber: consignmentNum }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update consignment number")
//       }

//       await fetchOrders()
//       setEditingConsignment(null)
//       setConsignmentNumber("")
//       toast.success("Consignment number updated successfully")
//     } catch (error) {
//       console.error("Error updating consignment number:", error)
//       toast.error("Failed to update consignment number")
//     } finally {
//       setIsUpdating(false)
//     }
//   }

//   const markAsRead = async (orderId: string) => {
//     try {
//       await fetch("/api/admin/orders/mark-read", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({ orderId }),
//       })

//       // Update local state
//       setOrders((prev) => prev.map((order) => (order._id === orderId ? { ...order, isReadByAdmin: true } : order)))
//     } catch (error) {
//       console.error("Error marking order as read:", error)
//     }
//   }

//   const downloadOrdersReport = async () => {
//     try {
//       setIsDownloading(true)

//       // Prepare filter parameters
//       const filterParams = new URLSearchParams()
//       if (filters.status !== "all") filterParams.append("status", filters.status)
//       if (filters.dateFrom) filterParams.append("dateFrom", filters.dateFrom.toISOString())
//       if (filters.dateTo) filterParams.append("dateTo", filters.dateTo.toISOString())
//       if (filters.minAmount) filterParams.append("minAmount", filters.minAmount)
//       if (filters.maxAmount) filterParams.append("maxAmount", filters.maxAmount)
//       if (filters.state !== "all") filterParams.append("state", filters.state)
//       if (filters.district !== "all") filterParams.append("district", filters.district)
//       if (filters.search) filterParams.append("search", filters.search)

//       const response = await fetch(`/api/admin/orders/download-pdf?${filterParams.toString()}`, {
//         method: "GET",
//         credentials: "include",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to generate report")
//       }

//       const blob = await response.blob()
//       const url = window.URL.createObjectURL(blob)
//       const a = document.createElement("a")
//       a.style.display = "none"
//       a.href = url

//       // Generate filename with current date and filters
//       const dateStr = new Date().toISOString().split("T")[0]
//       const statusStr = filters.status !== "all" ? `_${filters.status}` : ""
//       const filename = `Orders_Report_${dateStr}${statusStr}.csv`

//       a.download = filename
//       document.body.appendChild(a)
//       a.click()
//       window.URL.revokeObjectURL(url)
//       document.body.removeChild(a)

//       toast.success("Orders report downloaded successfully!")
//     } catch (error) {
//       console.error("Error downloading report:", error)
//       toast.error("Failed to download orders report")
//     } finally {
//       setIsDownloading(false)
//     }
//   }

//   const clearFilters = () => {
//     setFilters({
//       search: "",
//       status: "all",
//       dateFrom: undefined,
//       dateTo: undefined,
//       minAmount: "",
//       maxAmount: "",
//       state: "all",
//       district: "all",
//     })
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

//   const viewOrderDetails = (order: Order) => {
//     setSelectedOrder(order)
//     setShowOrderDetails(true)
//     if (!order.isReadByAdmin) {
//       markAsRead(order._id)
//     }
//   }

//   const startEditingConsignment = (order: Order) => {
//     setEditingConsignment(order._id)
//     setConsignmentNumber(order.consignmentNumber || "")
//   }

//   const cancelEditingConsignment = () => {
//     setEditingConsignment(null)
//     setConsignmentNumber("")
//   }

//   const getUnreadCount = () => {
//     return orders.filter((order) => !order.isReadByAdmin).length
//   }

//   const getFilteredStats = () => {
//     const total = filteredOrders.length
//     const totalAmount = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0)
//     const statusCounts = filteredOrders.reduce(
//       (acc, order) => {
//         acc[order.status] = (acc[order.status] || 0) + 1
//         return acc
//       },
//       {} as Record<string, number>,
//     )

//     return { total, totalAmount, statusCounts }
//   }

//   const stats = getFilteredStats()

//   if (isLoading) {
//     return (
//       <div className="min-h-screen relative">
//         <AnimatedBackground />
//         <div className="relative z-10 flex items-center justify-center min-h-screen">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
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
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//               <div>
//                 <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 dark:from-orange-400 dark:via-red-400 dark:to-pink-400 bg-clip-text text-transparent flex items-center gap-2 md:gap-3">
//                   <Package className="h-6 w-6 md:h-8 md:w-8 text-orange-500" />
//                   Order Management
//                   {getUnreadCount() > 0 && (
//                     <Badge className="bg-red-500 text-white animate-pulse">{getUnreadCount()}</Badge>
//                   )}
//                 </h1>
//                 <p className="text-muted-foreground mt-2 text-sm md:text-base">
//                   Manage customer orders and track deliveries
//                 </p>
//               </div>
//               <div className="flex flex-col sm:flex-row gap-2">
//                 <Button
//                   variant="outline"
//                   onClick={fetchOrders}
//                   className="hover:bg-orange-50 dark:hover:bg-orange-900/20 bg-transparent"
//                 >
//                   <RefreshCw className="h-4 w-4 mr-2" />
//                   Refresh
//                 </Button>
//                 <Button
//                   onClick={downloadOrdersReport}
//                   disabled={isDownloading || filteredOrders.length === 0}
//                   className="bg-green-600 hover:bg-green-700"
//                 >
//                   {isDownloading ? (
//                     <>
//                       <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
//                       Generating...
//                     </>
//                   ) : (
//                     <>
//                       <FileText className="h-4 w-4 mr-2" />
//                       Download CSV ({filteredOrders.length})
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//             <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
//               <CardContent className="p-4">
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
//                   <p className="text-sm text-muted-foreground">Total Orders</p>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
//               <CardContent className="p-4">
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-green-600">₹{stats.totalAmount.toLocaleString()}</p>
//                   <p className="text-sm text-muted-foreground">Total Value</p>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
//               <CardContent className="p-4">
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-yellow-600">{stats.statusCounts.pending || 0}</p>
//                   <p className="text-sm text-muted-foreground">Pending</p>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
//               <CardContent className="p-4">
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-purple-600">{stats.statusCounts.dispatched || 0}</p>
//                   <p className="text-sm text-muted-foreground">Dispatched</p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Filters */}
//           <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg mb-6">
//             <CardContent className="p-4">
//               {/* Basic Filters */}
//               <div className="flex flex-col md:flex-row gap-4 mb-4">
//                 <div className="flex-1">
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <Input
//                       placeholder="Search orders, customers, products, consignment..."
//                       value={filters.search}
//                       onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
//                       className="pl-10"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Filter className="h-4 w-4 text-gray-400" />
//                   <Select
//                     value={filters.status}
//                     onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
//                   >
//                     <SelectTrigger className="w-40">
//                       <SelectValue placeholder="Filter by status" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Orders</SelectItem>
//                       <SelectItem value="pending">Pending</SelectItem>
//                       <SelectItem value="accepted">Accepted</SelectItem>
//                       <SelectItem value="dispatched">Dispatched</SelectItem>
//                       <SelectItem value="completed">Completed</SelectItem>
//                       <SelectItem value="rejected">Rejected</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <Button
//                     variant="outline"
//                     onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
//                     className="whitespace-nowrap"
//                   >
//                     <Filter className="h-4 w-4 mr-2" />
//                     {showAdvancedFilters ? "Hide" : "More"} Filters
//                   </Button>
//                 </div>
//               </div>

//               {/* Advanced Filters */}
//               {showAdvancedFilters && (
//                 <div className="border-t pt-4 space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                     {/* Date Range */}
//                     <div className="space-y-2">
//                       <Label>Date From</Label>
//                       <Popover>
//                         <PopoverTrigger asChild>
//                           <Button
//                             variant="outline"
//                             className="w-full justify-start text-left font-normal bg-transparent"
//                           >
//                             <CalendarDays className="mr-2 h-4 w-4" />
//                             {filters.dateFrom ? format(filters.dateFrom, "PPP") : "Pick a date"}
//                           </Button>
//                         </PopoverTrigger>
//                         <PopoverContent className="w-auto p-0">
//                           <CalendarComponent
//                             mode="single"
//                             selected={filters.dateFrom}
//                             onSelect={(date) => setFilters((prev) => ({ ...prev, dateFrom: date }))}
//                             initialFocus
//                           />
//                         </PopoverContent>
//                       </Popover>
//                     </div>

//                     <div className="space-y-2">
//                       <Label>Date To</Label>
//                       <Popover>
//                         <PopoverTrigger asChild>
//                           <Button
//                             variant="outline"
//                             className="w-full justify-start text-left font-normal bg-transparent"
//                           >
//                             <CalendarDays className="mr-2 h-4 w-4" />
//                             {filters.dateTo ? format(filters.dateTo, "PPP") : "Pick a date"}
//                           </Button>
//                         </PopoverTrigger>
//                         <PopoverContent className="w-auto p-0">
//                           <CalendarComponent
//                             mode="single"
//                             selected={filters.dateTo}
//                             onSelect={(date) => setFilters((prev) => ({ ...prev, dateTo: date }))}
//                             initialFocus
//                           />
//                         </PopoverContent>
//                       </Popover>
//                     </div>

//                     {/* Amount Range */}
//                     <div className="space-y-2">
//                       <Label>Min Amount (₹)</Label>
//                       <Input
//                         type="number"
//                         placeholder="0"
//                         value={filters.minAmount}
//                         onChange={(e) => setFilters((prev) => ({ ...prev, minAmount: e.target.value }))}
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <Label>Max Amount (₹)</Label>
//                       <Input
//                         type="number"
//                         placeholder="999999"
//                         value={filters.maxAmount}
//                         onChange={(e) => setFilters((prev) => ({ ...prev, maxAmount: e.target.value }))}
//                       />
//                     </div>

//                     {/* Location Filters */}
//                     <div className="space-y-2">
//                       <Label>State</Label>
//                       <Select
//                         value={filters.state}
//                         onValueChange={(value) => setFilters((prev) => ({ ...prev, state: value }))}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="All States" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="all">All States</SelectItem>
//                           {uniqueStates.map((state) => (
//                             <SelectItem key={state} value={state}>
//                               {state}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div className="space-y-2">
//                       <Label>District</Label>
//                       <Select
//                         value={filters.district}
//                         onValueChange={(value) => setFilters((prev) => ({ ...prev, district: value }))}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="All Districts" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="all">All Districts</SelectItem>
//                           {uniqueDistricts.map((district) => (
//                             <SelectItem key={district} value={district}>
//                               {district}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>

//                   <div className="flex justify-end">
//                     <Button variant="outline" onClick={clearFilters}>
//                       Clear All Filters
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Orders List */}
//           {filteredOrders.length === 0 ? (
//             <div className="text-center py-12">
//               <Package className="h-24 w-24 text-gray-400 mx-auto mb-6" />
//               <h2 className="text-2xl font-bold text-gray-600 mb-4">No Orders Found</h2>
//               <p className="text-gray-500">
//                 {Object.values(filters).some((f) => f && f !== "all")
//                   ? "Try adjusting your filters"
//                   : "No orders have been placed yet"}
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {filteredOrders.map((order) => (
//                 <Card
//                   key={order._id}
//                   className={`border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg transition-all hover:shadow-xl ${
//                     !order.isReadByAdmin ? "ring-2 ring-orange-200 dark:ring-orange-800" : ""
//                   }`}
//                 >
//                   <CardHeader className="pb-3">
//                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                       <div className="flex items-start gap-3">
//                         {!order.isReadByAdmin && (
//                           <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse mt-2"></div>
//                         )}
//                         <div>
//                           <CardTitle className="text-lg md:text-xl flex items-center gap-2">
//                             Order #{order.orderNumber}
//                             {!order.isReadByAdmin && <Badge className="bg-red-500 text-white text-xs">NEW</Badge>}
//                           </CardTitle>
//                           <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2 text-sm text-muted-foreground">
//                             <div className="flex items-center gap-2">
//                               <Calendar className="h-4 w-4" />
//                               <span>
//                                 {new Date(order.orderDate).toLocaleDateString("en-IN", {
//                                   year: "numeric",
//                                   month: "short",
//                                   day: "numeric",
//                                   hour: "2-digit",
//                                   minute: "2-digit",
//                                 })}
//                               </span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                               <User className="h-4 w-4" />
//                               <span>{order.customerName}</span>
//                             </div>
//                             {order.consignmentNumber && (
//                               <div className="flex items-center gap-2">
//                                 <Truck className="h-4 w-4" />
//                                 <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
//                                   {order.consignmentNumber}
//                                 </span>
//                               </div>
//                             )}
//                           </div>
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
//                     {/* Order Summary */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <h4 className="font-semibold mb-2">Customer Details</h4>
//                         <div className="space-y-1 text-sm">
//                           <p className="flex items-center gap-2">
//                             <Phone className="h-3 w-3" />
//                             {order.customerPhone}
//                           </p>
//                           <p className="flex items-center gap-2">
//                             <Mail className="h-3 w-3" />
//                             {order.userEmail}
//                           </p>
//                           <p className="flex items-center gap-2">
//                             <MapPin className="h-3 w-3" />
//                             {order.deliveryAddress.village}, {order.deliveryAddress.district},{" "}
//                             {order.deliveryAddress.state}
//                           </p>
//                         </div>
//                       </div>
//                       <div>
//                         <h4 className="font-semibold mb-2">Order Items ({order.items.length})</h4>
//                         <div className="space-y-1 text-sm">
//                           {order.items.slice(0, 2).map((item, index) => (
//                             <p key={index}>
//                               {item.name} (Qty: {item.quantity}) - {item.productCode}
//                             </p>
//                           ))}
//                           {order.items.length > 2 && (
//                             <p className="text-muted-foreground">+{order.items.length - 2} more items</p>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Consignment Number Section */}
//                     {(order.status === "accepted" || order.status === "dispatched" || order.status === "completed") && (
//                       <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
//                         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
//                           <div className="flex items-center gap-2">
//                             <Truck className="h-4 w-4 text-blue-600" />
//                             <span className="font-medium">Consignment Number</span>
//                           </div>
//                           {editingConsignment === order._id ? (
//                             <div className="flex items-center gap-2">
//                               <Input
//                                 value={consignmentNumber}
//                                 onChange={(e) => setConsignmentNumber(e.target.value)}
//                                 placeholder="Enter consignment number"
//                                 className="w-full sm:w-48"
//                                 disabled={isUpdating}
//                               />
//                               <Button
//                                 size="sm"
//                                 onClick={() => updateConsignmentNumber(order._id, consignmentNumber)}
//                                 disabled={!consignmentNumber.trim() || isUpdating}
//                               >
//                                 <Save className="h-3 w-3" />
//                               </Button>
//                               <Button size="sm" variant="outline" onClick={cancelEditingConsignment}>
//                                 <X className="h-3 w-3" />
//                               </Button>
//                             </div>
//                           ) : (
//                             <div className="flex items-center gap-2">
//                               {order.consignmentNumber ? (
//                                 <span className="font-mono text-sm bg-white dark:bg-gray-800 px-2 py-1 rounded">
//                                   {order.consignmentNumber}
//                                 </span>
//                               ) : (
//                                 <span className="text-muted-foreground text-sm">Not assigned</span>
//                               )}
//                               <Button size="sm" variant="outline" onClick={() => startEditingConsignment(order)}>
//                                 <Edit className="h-3 w-3" />
//                               </Button>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     <Separator />

//                     {/* Action Buttons */}
//                     <div className="flex flex-col sm:flex-row gap-3">
//                       <Button variant="outline" onClick={() => viewOrderDetails(order)} className="flex-1">
//                         <Eye className="h-4 w-4 mr-2" />
//                         View Details
//                       </Button>

//                       {/* Status Update Buttons */}
//                       {order.status === "pending" && (
//                         <div className="flex gap-2">
//                           <Button
//                             onClick={() => updateOrderStatus(order._id, "accepted")}
//                             disabled={isUpdating}
//                             className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
//                           >
//                             <CheckCircle className="h-4 w-4 mr-2" />
//                             Accept
//                           </Button>
//                           <Button
//                             onClick={() => updateOrderStatus(order._id, "rejected")}
//                             disabled={isUpdating}
//                             variant="destructive"
//                             className="flex-1 sm:flex-none"
//                           >
//                             <XCircle className="h-4 w-4 mr-2" />
//                             Reject
//                           </Button>
//                         </div>
//                       )}

//                       {order.status === "accepted" && (
//                         <Button
//                           onClick={() => updateOrderStatus(order._id, "dispatched")}
//                           disabled={isUpdating || !order.consignmentNumber}
//                           className="bg-purple-600 hover:bg-purple-700 flex-1 sm:flex-none"
//                         >
//                           <Truck className="h-4 w-4 mr-2" />
//                           Mark as Dispatched
//                         </Button>
//                       )}

//                       {order.status === "dispatched" && (
//                         <Button
//                           onClick={() => updateOrderStatus(order._id, "completed")}
//                           disabled={isUpdating}
//                           className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
//                         >
//                           <CheckCircle className="h-4 w-4 mr-2" />
//                           Mark as Completed
//                         </Button>
//                       )}
//                     </div>

//                     {/* Warnings */}
//                     {order.status === "accepted" && !order.consignmentNumber && (
//                       <Alert>
//                         <AlertTriangle className="h-4 w-4" />
//                         <AlertDescription>
//                           Please add a consignment number before marking this order as dispatched.
//                         </AlertDescription>
//                       </Alert>
//                     )}
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Order Details Dialog */}
//       <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
//         <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className="flex items-center gap-2">
//               <Package className="h-5 w-5" />
//               Order Details - #{selectedOrder?.orderNumber}
//             </DialogTitle>
//             <DialogDescription>Complete order information and management</DialogDescription>
//           </DialogHeader>

//           {selectedOrder && (
//             <div className="space-y-6 mt-4">
//               {/* Order Status and Actions */}
//               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
//                 <div>
//                   <Badge className={`${getStatusColor(selectedOrder.status)} flex items-center gap-1 w-fit`}>
//                     {getStatusIcon(selectedOrder.status)}
//                     {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
//                   </Badge>
//                   <p className="text-sm text-muted-foreground mt-1">
//                     Last updated: {new Date(selectedOrder.updatedAt).toLocaleString("en-IN")}
//                   </p>
//                 </div>
//                 <div className="flex gap-2">
//                   {selectedOrder.status === "pending" && (
//                     <>
//                       <Button
//                         onClick={() => {
//                           updateOrderStatus(selectedOrder._id, "accepted")
//                           setShowOrderDetails(false)
//                         }}
//                         disabled={isUpdating}
//                         size="sm"
//                         className="bg-green-600 hover:bg-green-700"
//                       >
//                         Accept Order
//                       </Button>
//                       <Button
//                         onClick={() => {
//                           updateOrderStatus(selectedOrder._id, "rejected")
//                           setShowOrderDetails(false)
//                         }}
//                         disabled={isUpdating}
//                         size="sm"
//                         variant="destructive"
//                       >
//                         Reject Order
//                       </Button>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Customer and Delivery Info */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className="font-semibold mb-3">Customer Information</h4>
//                   <div className="space-y-2 text-sm">
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
//                   <h4 className="font-semibold mb-3 flex items-center gap-2">
//                     <MapPin className="h-4 w-4" />
//                     Delivery Address
//                   </h4>
//                   <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-sm">
//                     <p>{selectedOrder.deliveryAddress.street}</p>
//                     <p>{selectedOrder.deliveryAddress.area}</p>
//                     <p>
//                       {selectedOrder.deliveryAddress.village}, {selectedOrder.deliveryAddress.subDistrict}
//                     </p>
//                     <p>
//                       {selectedOrder.deliveryAddress.district}, {selectedOrder.deliveryAddress.state} -{" "}
//                       {selectedOrder.deliveryAddress.pincode}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <Separator />

//               {/* Order Items */}
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

//               {/* Pricing Details */}
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

//               {/* Consignment Number Management */}
//               {(selectedOrder.status === "accepted" ||
//                 selectedOrder.status === "dispatched" ||
//                 selectedOrder.status === "completed") && (
//                 <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
//                   <h4 className="font-semibold mb-3 flex items-center gap-2">
//                     <Truck className="h-4 w-4" />
//                     Consignment Tracking
//                   </h4>
//                   <div className="space-y-3">
//                     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
//                       <Label>Consignment Number</Label>
//                       {editingConsignment === selectedOrder._id ? (
//                         <div className="flex items-center gap-2">
//                           <Input
//                             value={consignmentNumber}
//                             onChange={(e) => setConsignmentNumber(e.target.value)}
//                             placeholder="Enter consignment number"
//                             className="w-full sm:w-64"
//                           />
//                           <Button
//                             size="sm"
//                             onClick={() => updateConsignmentNumber(selectedOrder._id, consignmentNumber)}
//                             disabled={!consignmentNumber.trim() || isUpdating}
//                           >
//                             <Save className="h-3 w-3" />
//                           </Button>
//                           <Button size="sm" variant="outline" onClick={cancelEditingConsignment}>
//                             <X className="h-3 w-3" />
//                           </Button>
//                         </div>
//                       ) : (
//                         <div className="flex items-center gap-2">
//                           {selectedOrder.consignmentNumber ? (
//                             <span className="font-mono bg-white dark:bg-gray-800 px-3 py-1 rounded">
//                               {selectedOrder.consignmentNumber}
//                             </span>
//                           ) : (
//                             <span className="text-muted-foreground">Not assigned</span>
//                           )}
//                           <Button size="sm" variant="outline" onClick={() => startEditingConsignment(selectedOrder)}>
//                             <Edit className="h-3 w-3" />
//                           </Button>
//                         </div>
//                       )}
//                     </div>
//                     {selectedOrder.status === "accepted" && !selectedOrder.consignmentNumber && (
//                       <Alert>
//                         <AlertTriangle className="h-4 w-4" />
//                         <AlertDescription>
//                           Please add a consignment number before marking this order as dispatched.
//                         </AlertDescription>
//                       </Alert>
//                     )}
//                   </div>
//                 </div>
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Package,
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
  Search,
  Filter,
  Edit,
  Save,
  X,
  AlertTriangle,
  User,
  CalendarDays,
  FileText,
  Trash2,
} from "lucide-react"
import { toast } from "react-hot-toast"
import { AnimatedBackground } from "@/components/animated-background"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

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
  isReadByAdmin: boolean
}

interface FilterState {
  search: string
  status: string
  dateFrom: Date | undefined
  dateTo: Date | undefined
  minAmount: string
  maxAmount: string
  state: string
  district: string
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null)
  const [editingConsignment, setEditingConsignment] = useState<string | null>(null)
  const [consignmentNumber, setConsignmentNumber] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Advanced filters
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: "all",
    dateFrom: undefined,
    dateTo: undefined,
    minAmount: "",
    maxAmount: "",
    state: "all",
    district: "all",
  })

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [uniqueStates, setUniqueStates] = useState<string[]>([])
  const [uniqueDistricts, setUniqueDistricts] = useState<string[]>([])

  // Real-time updates
  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  // Extract unique states and districts for filters
  useEffect(() => {
    const states = [...new Set(orders.map((order) => order.deliveryAddress.state))].filter(Boolean).sort()
    const districts = [...new Set(orders.map((order) => order.deliveryAddress.district))].filter(Boolean).sort()
    setUniqueStates(states)
    setUniqueDistricts(districts)
  }, [orders])

  // Apply filters
  useEffect(() => {
    let filtered = orders

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchTerm) ||
          order.customerName.toLowerCase().includes(searchTerm) ||
          order.userEmail.toLowerCase().includes(searchTerm) ||
          order.customerPhone.includes(searchTerm) ||
          order.consignmentNumber?.toLowerCase().includes(searchTerm) ||
          order.items.some(
            (item) =>
              item.name.toLowerCase().includes(searchTerm) || item.productCode.toLowerCase().includes(searchTerm),
          ),
      )
    }

    // Status filter
    if (filters.status !== "all") {
      filtered = filtered.filter((order) => order.status === filters.status)
    }

    // Date range filter
    if (filters.dateFrom) {
      filtered = filtered.filter((order) => new Date(order.orderDate) >= filters.dateFrom!)
    }
    if (filters.dateTo) {
      const endDate = new Date(filters.dateTo)
      endDate.setHours(23, 59, 59, 999) // Include the entire end date
      filtered = filtered.filter((order) => new Date(order.orderDate) <= endDate)
    }

    // Amount range filter
    if (filters.minAmount) {
      filtered = filtered.filter((order) => order.totalAmount >= Number.parseFloat(filters.minAmount))
    }
    if (filters.maxAmount) {
      filtered = filtered.filter((order) => order.totalAmount <= Number.parseFloat(filters.maxAmount))
    }

    // Location filters
    if (filters.state !== "all") {
      filtered = filtered.filter((order) => order.deliveryAddress.state === filters.state)
    }
    if (filters.district !== "all") {
      filtered = filtered.filter((order) => order.deliveryAddress.district === filters.district)
    }

    setFilteredOrders(filtered)
  }, [orders, filters])

  const fetchOrders = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/orders", {
        credentials: "include",
      })

      if (!response.ok) {
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

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      setIsUpdating(true)
      const response = await fetch("/api/admin/orders/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ orderId, status: newStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update order status")
      }

      await fetchOrders()
      toast.success(`Order status updated to ${newStatus}`)
    } catch (error) {
      console.error("Error updating order status:", error)
      toast.error("Failed to update order status")
    } finally {
      setIsUpdating(false)
    }
  }

  const updateConsignmentNumber = async (orderId: string, consignmentNum: string) => {
    try {
      setIsUpdating(true)
      const response = await fetch("/api/admin/orders/update-consignment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ orderId, consignmentNumber: consignmentNum }),
      })

      if (!response.ok) {
        throw new Error("Failed to update consignment number")
      }

      await fetchOrders()
      setEditingConsignment(null)
      setConsignmentNumber("")
      toast.success("Consignment number updated successfully")
    } catch (error) {
      console.error("Error updating consignment number:", error)
      toast.error("Failed to update consignment number")
    } finally {
      setIsUpdating(false)
    }
  }

  const deleteOrder = async (order: Order) => {
    try {
      setIsDeleting(true)
      const response = await fetch("/api/admin/orders/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ orderId: order._id }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete order")
      }

      const result = await response.json()
      await fetchOrders()
      setShowDeleteConfirm(false)
      setOrderToDelete(null)
      toast.success(result.message || "Order deleted successfully")
    } catch (error) {
      console.error("Error deleting order:", error)
      toast.error(error instanceof Error ? error.message : "Failed to delete order")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteClick = (order: Order) => {
    setOrderToDelete(order)
    setShowDeleteConfirm(true)
  }

  const markAsRead = async (orderId: string) => {
    try {
      await fetch("/api/admin/orders/mark-read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ orderId }),
      })

      // Update local state
      setOrders((prev) => prev.map((order) => (order._id === orderId ? { ...order, isReadByAdmin: true } : order)))
    } catch (error) {
      console.error("Error marking order as read:", error)
    }
  }

  const downloadOrdersReport = async () => {
    try {
      setIsDownloading(true)

      // Prepare filter parameters
      const filterParams = new URLSearchParams()
      if (filters.status !== "all") filterParams.append("status", filters.status)
      if (filters.dateFrom) filterParams.append("dateFrom", filters.dateFrom.toISOString())
      if (filters.dateTo) filterParams.append("dateTo", filters.dateTo.toISOString())
      if (filters.minAmount) filterParams.append("minAmount", filters.minAmount)
      if (filters.maxAmount) filterParams.append("maxAmount", filters.maxAmount)
      if (filters.state !== "all") filterParams.append("state", filters.state)
      if (filters.district !== "all") filterParams.append("district", filters.district)
      if (filters.search) filterParams.append("search", filters.search)

      const response = await fetch(`/api/admin/orders/download-pdf?${filterParams.toString()}`, {
        method: "GET",
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to generate report")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      // Open in new tab instead of downloading
      const newWindow = window.open(url, "_blank")
      if (newWindow) {
        newWindow.focus()
      } else {
        // Fallback: create download link
        const a = document.createElement("a")
        a.style.display = "none"
        a.href = url
        const dateStr = new Date().toISOString().split("T")[0]
        const statusStr = filters.status !== "all" ? `_${filters.status}` : ""
        const filename = `Orders_Report_${dateStr}${statusStr}.html`
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }

      window.URL.revokeObjectURL(url)
      toast.success("Orders report opened! Use browser's print function to save as PDF.")
    } catch (error) {
      console.error("Error downloading report:", error)
      toast.error("Failed to generate orders report")
    } finally {
      setIsDownloading(false)
    }
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "all",
      dateFrom: undefined,
      dateTo: undefined,
      minAmount: "",
      maxAmount: "",
      state: "all",
      district: "all",
    })
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

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
    if (!order.isReadByAdmin) {
      markAsRead(order._id)
    }
  }

  const startEditingConsignment = (order: Order) => {
    setEditingConsignment(order._id)
    setConsignmentNumber(order.consignmentNumber || "")
  }

  const cancelEditingConsignment = () => {
    setEditingConsignment(null)
    setConsignmentNumber("")
  }

  const getUnreadCount = () => {
    return orders.filter((order) => !order.isReadByAdmin).length
  }

  const getFilteredStats = () => {
    const total = filteredOrders.length
    const totalAmount = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0)
    const statusCounts = filteredOrders.reduce(
      (acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return { total, totalAmount, statusCounts }
  }

  const stats = getFilteredStats()

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 dark:from-orange-400 dark:via-red-400 dark:to-pink-400 bg-clip-text text-transparent flex items-center gap-2 md:gap-3">
                  <Package className="h-6 w-6 md:h-8 md:w-8 text-orange-500" />
                  Order Management
                  {getUnreadCount() > 0 && (
                    <Badge className="bg-red-500 text-white animate-pulse">{getUnreadCount()}</Badge>
                  )}
                </h1>
                <p className="text-muted-foreground mt-2 text-sm md:text-base">
                  Manage customer orders and track deliveries
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={fetchOrders}
                  className="hover:bg-orange-50 dark:hover:bg-orange-900/20 bg-transparent"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button
                  onClick={downloadOrdersReport}
                  disabled={isDownloading || filteredOrders.length === 0}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isDownloading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report ({filteredOrders.length})
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">₹{stats.totalAmount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">{stats.statusCounts.pending || 0}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{stats.statusCounts.dispatched || 0}</p>
                  <p className="text-sm text-muted-foreground">Dispatched</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg mb-6">
            <CardContent className="p-4">
              {/* Basic Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search orders, customers, products, consignment..."
                      value={filters.search}
                      onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <Select
                    value={filters.status}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="dispatched">Dispatched</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="whitespace-nowrap"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {showAdvancedFilters ? "Hide" : "More"} Filters
                  </Button>
                </div>
              </div>

              {/* Advanced Filters */}
              {showAdvancedFilters && (
                <div className="border-t pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Date Range */}
                    <div className="space-y-2">
                      <Label>Date From</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-transparent"
                          >
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {filters.dateFrom ? format(filters.dateFrom, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={filters.dateFrom}
                            onSelect={(date) => setFilters((prev) => ({ ...prev, dateFrom: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>Date To</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-transparent"
                          >
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {filters.dateTo ? format(filters.dateTo, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={filters.dateTo}
                            onSelect={(date) => setFilters((prev) => ({ ...prev, dateTo: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Amount Range */}
                    <div className="space-y-2">
                      <Label>Min Amount (₹)</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={filters.minAmount}
                        onChange={(e) => setFilters((prev) => ({ ...prev, minAmount: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Max Amount (₹)</Label>
                      <Input
                        type="number"
                        placeholder="999999"
                        value={filters.maxAmount}
                        onChange={(e) => setFilters((prev) => ({ ...prev, maxAmount: e.target.value }))}
                      />
                    </div>

                    {/* Location Filters */}
                    <div className="space-y-2">
                      <Label>State</Label>
                      <Select
                        value={filters.state}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, state: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All States" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All States</SelectItem>
                          {uniqueStates.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>District</Label>
                      <Select
                        value={filters.district}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, district: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Districts" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Districts</SelectItem>
                          {uniqueDistricts.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="outline" onClick={clearFilters}>
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-24 w-24 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-600 mb-4">No Orders Found</h2>
              <p className="text-gray-500">
                {Object.values(filters).some((f) => f && f !== "all")
                  ? "Try adjusting your filters"
                  : "No orders have been placed yet"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card
                  key={order._id}
                  className={`border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg transition-all hover:shadow-xl ${
                    !order.isReadByAdmin ? "ring-2 ring-orange-200 dark:ring-orange-800" : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        {!order.isReadByAdmin && (
                          <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse mt-2"></div>
                        )}
                        <div>
                          <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                            Order #{order.orderNumber}
                            {!order.isReadByAdmin && <Badge className="bg-red-500 text-white text-xs">NEW</Badge>}
                          </CardTitle>
                          <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(order.orderDate).toLocaleDateString("en-IN", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              <span>{order.customerName}</span>
                            </div>
                            {order.consignmentNumber && (
                              <div className="flex items-center gap-2">
                                <Truck className="h-4 w-4" />
                                <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                  {order.consignmentNumber}
                                </span>
                              </div>
                            )}
                          </div>
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
                    {/* Order Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Customer Details</h4>
                        <div className="space-y-1 text-sm">
                          <p className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            {order.customerPhone}
                          </p>
                          <p className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            {order.userEmail}
                          </p>
                          <p className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            {order.deliveryAddress.village}, {order.deliveryAddress.district},{" "}
                            {order.deliveryAddress.state}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Order Items ({order.items.length})</h4>
                        <div className="space-y-1 text-sm">
                          {order.items.slice(0, 2).map((item, index) => (
                            <p key={index}>
                              {item.name} (Qty: {item.quantity}) - {item.productCode}
                            </p>
                          ))}
                          {order.items.length > 2 && (
                            <p className="text-muted-foreground">+{order.items.length - 2} more items</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Consignment Number Section */}
                    {(order.status === "accepted" || order.status === "dispatched" || order.status === "completed") && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">Consignment Number</span>
                          </div>
                          {editingConsignment === order._id ? (
                            <div className="flex items-center gap-2">
                              <Input
                                value={consignmentNumber}
                                onChange={(e) => setConsignmentNumber(e.target.value)}
                                placeholder="Enter consignment number"
                                className="w-full sm:w-48"
                                disabled={isUpdating}
                              />
                              <Button
                                size="sm"
                                onClick={() => updateConsignmentNumber(order._id, consignmentNumber)}
                                disabled={!consignmentNumber.trim() || isUpdating}
                              >
                                <Save className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={cancelEditingConsignment}>
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              {order.consignmentNumber ? (
                                <span className="font-mono text-sm bg-white dark:bg-gray-800 px-2 py-1 rounded">
                                  {order.consignmentNumber}
                                </span>
                              ) : (
                                <span className="text-muted-foreground text-sm">Not assigned</span>
                              )}
                              <Button size="sm" variant="outline" onClick={() => startEditingConsignment(order)}>
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <Separator />

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="outline" onClick={() => viewOrderDetails(order)} className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>

                      {/* Status Update Buttons */}
                      {order.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => updateOrderStatus(order._id, "accepted")}
                            disabled={isUpdating}
                            className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Accept
                          </Button>
                          <Button
                            onClick={() => updateOrderStatus(order._id, "rejected")}
                            disabled={isUpdating}
                            variant="destructive"
                            className="flex-1 sm:flex-none"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      )}

                      {order.status === "accepted" && (
                        <Button
                          onClick={() => updateOrderStatus(order._id, "dispatched")}
                          disabled={isUpdating || !order.consignmentNumber}
                          className="bg-purple-600 hover:bg-purple-700 flex-1 sm:flex-none"
                        >
                          <Truck className="h-4 w-4 mr-2" />
                          Mark as Dispatched
                        </Button>
                      )}

                      {order.status === "dispatched" && (
                        <Button
                          onClick={() => updateOrderStatus(order._id, "completed")}
                          disabled={isUpdating}
                          className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark as Completed
                        </Button>
                      )}

                      {/* Delete Button for Rejected and Completed Orders */}
                      {(order.status === "rejected" || order.status === "completed") && (
                        <Button
                          onClick={() => handleDeleteClick(order)}
                          disabled={isDeleting}
                          variant="destructive"
                          size="sm"
                          className="flex-shrink-0"
                        >
                          <Trash2 className="h-3 w-3 mr-2" />
                          Delete
                        </Button>
                      )}
                    </div>

                    {/* Warnings */}
                    {order.status === "accepted" && !order.consignmentNumber && (
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Please add a consignment number before marking this order as dispatched.
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Delete Warning for Rejected/Completed Orders */}
                    {(order.status === "rejected" || order.status === "completed") && (
                      <Alert className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                          <strong>Storage Management:</strong> This {order.status} order can be permanently deleted to
                          free up storage space.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Details - #{selectedOrder?.orderNumber}
            </DialogTitle>
            <DialogDescription>Complete order information and management</DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6 mt-4">
              {/* Order Status and Actions */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <Badge className={`${getStatusColor(selectedOrder.status)} flex items-center gap-1 w-fit`}>
                    {getStatusIcon(selectedOrder.status)}
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    Last updated: {new Date(selectedOrder.updatedAt).toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="flex gap-2">
                  {selectedOrder.status === "pending" && (
                    <>
                      <Button
                        onClick={() => {
                          updateOrderStatus(selectedOrder._id, "accepted")
                          setShowOrderDetails(false)
                        }}
                        disabled={isUpdating}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Accept Order
                      </Button>
                      <Button
                        onClick={() => {
                          updateOrderStatus(selectedOrder._id, "rejected")
                          setShowOrderDetails(false)
                        }}
                        disabled={isUpdating}
                        size="sm"
                        variant="destructive"
                      >
                        Reject Order
                      </Button>
                    </>
                  )}
                  {/* Delete Button in Dialog */}
                  {(selectedOrder.status === "rejected" || selectedOrder.status === "completed") && (
                    <Button
                      onClick={() => {
                        handleDeleteClick(selectedOrder)
                        setShowOrderDetails(false)
                      }}
                      disabled={isDeleting}
                      size="sm"
                      variant="destructive"
                    >
                      <Trash2 className="h-3 w-3 mr-2" />
                      Delete Order
                    </Button>
                  )}
                </div>
              </div>

              {/* Customer and Delivery Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Customer Information</h4>
                  <div className="space-y-2 text-sm">
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
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Delivery Address
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-sm">
                    <p>{selectedOrder.deliveryAddress.street}</p>
                    <p>{selectedOrder.deliveryAddress.area}</p>
                    <p>
                      {selectedOrder.deliveryAddress.village}, {selectedOrder.deliveryAddress.subDistrict}
                    </p>
                    <p>
                      {selectedOrder.deliveryAddress.district}, {selectedOrder.deliveryAddress.state} -{" "}
                      {selectedOrder.deliveryAddress.pincode}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Order Items */}
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

              {/* Pricing Details */}
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

              {/* Consignment Number Management */}
              {(selectedOrder.status === "accepted" ||
                selectedOrder.status === "dispatched" ||
                selectedOrder.status === "completed") && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Consignment Tracking
                  </h4>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <Label>Consignment Number</Label>
                      {editingConsignment === selectedOrder._id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            value={consignmentNumber}
                            onChange={(e) => setConsignmentNumber(e.target.value)}
                            placeholder="Enter consignment number"
                            className="w-full sm:w-64"
                          />
                          <Button
                            size="sm"
                            onClick={() => updateConsignmentNumber(selectedOrder._id, consignmentNumber)}
                            disabled={!consignmentNumber.trim() || isUpdating}
                          >
                            <Save className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={cancelEditingConsignment}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          {selectedOrder.consignmentNumber ? (
                            <span className="font-mono bg-white dark:bg-gray-800 px-3 py-1 rounded">
                              {selectedOrder.consignmentNumber}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">Not assigned</span>
                          )}
                          <Button size="sm" variant="outline" onClick={() => startEditingConsignment(selectedOrder)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                    {selectedOrder.status === "accepted" && !selectedOrder.consignmentNumber && (
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Please add a consignment number before marking this order as dispatched.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              Delete Order Permanently
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. The order will be permanently removed from the database.
            </DialogDescription>
          </DialogHeader>

          {orderToDelete && (
            <div className="space-y-4 mt-4">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Order to be deleted:</h4>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Order #:</strong> {orderToDelete.orderNumber}
                  </p>
                  <p>
                    <strong>Customer:</strong> {orderToDelete.customerName}
                  </p>
                  <p>
                    <strong>Status:</strong> {orderToDelete.status}
                  </p>
                  <p>
                    <strong>Amount:</strong> ₹{orderToDelete.totalAmount}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(orderToDelete.orderDate).toLocaleDateString("en-IN")}
                  </p>
                </div>
              </div>

              <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800 dark:text-red-200">
                  <strong>Warning:</strong> This will permanently delete all order data including customer information,
                  items, and transaction history. This action cannot be undone.
                </AlertDescription>
              </Alert>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDeleteConfirm(false)
                    setOrderToDelete(null)
                  }}
                  disabled={isDeleting}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => deleteOrder(orderToDelete)}
                  disabled={isDeleting}
                  variant="destructive"
                  className="flex-1"
                >
                  {isDeleting ? (
                    <>
                      <RefreshCw className="h-3 w-3 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-3 w-3 mr-2" />
                      Delete Permanently
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

