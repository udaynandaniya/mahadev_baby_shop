// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import {
//   BarChart3,
//   Package,
//   ShoppingCart,
//   Users,
//   TrendingUp,
//   TrendingDown,
//   AlertTriangle,
//   Eye,
//   RefreshCw,
//   Download,
//   Crown,
// } from "lucide-react"
// import { AnimatedBackground } from "@/components/animated-background"

// interface DashboardStats {
//   totalProducts: number
//   totalOrders: number
//   totalUsers: number
//   totalRevenue: number
//   pendingOrders: number
//   lowStockItems: number
//   recentOrders: any[]
//   lowStockProducts: any[]
// }

// export default function AdminDashboard() {
//   const [stats, setStats] = useState<DashboardStats>({
//     totalProducts: 0,
//     totalOrders: 0,
//     totalUsers: 0,
//     totalRevenue: 0,
//     pendingOrders: 0,
//     lowStockItems: 0,
//     recentOrders: [],
//     lowStockProducts: [],
//   })
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     fetchDashboardData()
//   }, [])

//   const fetchDashboardData = async () => {
//     try {
//       setIsLoading(true)
//       const response = await fetch("/api/admin/dashboard")
//       const data = await response.json()
//       setStats(data)
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const statCards = [
//     {
//       title: "Total Products",
//       value: stats.totalProducts,
//       icon: Package,
//       color: "from-blue-500 to-cyan-500",
//       change: "+12%",
//       changeType: "positive",
//     },
//     {
//       title: "Total Orders",
//       value: stats.totalOrders,
//       icon: ShoppingCart,
//       color: "from-green-500 to-emerald-500",
//       change: "+8%",
//       changeType: "positive",
//     },
//     {
//       title: "Total Users",
//       value: stats.totalUsers,
//       icon: Users,
//       color: "from-purple-500 to-violet-500",
//       change: "+15%",
//       changeType: "positive",
//     },
//     {
//       title: "Revenue",
//       value: `₹${stats.totalRevenue.toLocaleString()}`,
//       icon: BarChart3,
//       color: "from-pink-500 to-rose-500",
//       change: "+23%",
//       changeType: "positive",
//     },
//   ]

//   if (isLoading) {
//     return (
//       <div className="min-h-screen relative">
//         <AnimatedBackground />
//         <div className="relative z-10 flex items-center justify-center min-h-screen">
//           <div className="flex items-center gap-3 text-lg font-medium">
//             <RefreshCw className="h-6 w-6 animate-spin text-pink-500" />
//             Loading Dashboard...
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen relative">
//       <AnimatedBackground />

//       <div className="relative z-10 container mx-auto px-4 py-6 md:py-8 space-y-6 md:space-y-8">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
//               Admin Dashboard
//             </h1>
//             <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your store.</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <Button variant="outline" size="sm" onClick={fetchDashboardData} className="rounded-xl bg-transparent">
//               <RefreshCw className="h-4 w-4 mr-2" />
//               Refresh
//             </Button>
//             <Button
//               size="sm"
//               className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
//             >
//               <Download className="h-4 w-4 mr-2" />
//               Export
//             </Button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//           {statCards.map((card, index) => (
//             <Card
//               key={index}
//               className="relative overflow-hidden border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
//             >
//               <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-5`} />
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
//                 <div className={`p-2 rounded-lg bg-gradient-to-br ${card.color} shadow-lg`}>
//                   <card.icon className="h-4 w-4 text-white" />
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl md:text-3xl font-bold mb-1">{card.value}</div>
//                 <div className="flex items-center text-xs">
//                   {card.changeType === "positive" ? (
//                     <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
//                   ) : (
//                     <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
//                   )}
//                   <span className={card.changeType === "positive" ? "text-green-500" : "text-red-500"}>
//                     {card.change}
//                   </span>
//                   <span className="text-muted-foreground ml-1">from last month</span>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Quick Actions & Alerts */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Quick Actions */}
//           <Card className="lg:col-span-2 border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Crown className="h-5 w-5 text-yellow-500" />
//                 Quick Actions
//               </CardTitle>
//               <CardDescription>Manage your store efficiently with these shortcuts</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                 <Button
//                   variant="outline"
//                   className="h-20 flex-col gap-2 rounded-xl hover:bg-pink-50 dark:hover:bg-pink-950/50 bg-transparent"
//                   asChild
//                 >
//                   <a href="/admin/products/clothes">
//                     <Package className="h-6 w-6" />
//                     <span className="text-xs">Add Product</span>
//                   </a>
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="h-20 flex-col gap-2 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/50 bg-transparent"
//                   asChild
//                 >
//                   <a href="/admin/orders">
//                     <ShoppingCart className="h-6 w-6" />
//                     <span className="text-xs">View Orders</span>
//                   </a>
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="h-20 flex-col gap-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/50 bg-transparent"
//                   asChild
//                 >
//                   <a href="/admin/stock-manager">
//                     <BarChart3 className="h-6 w-6" />
//                     <span className="text-xs">Stock Manager</span>
//                   </a>
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="h-20 flex-col gap-2 rounded-xl hover:bg-green-50 dark:hover:bg-green-950/50 bg-transparent"
//                   asChild
//                 >
//                   <a href="/admin/slider">
//                     <Eye className="h-6 w-6" />
//                     <span className="text-xs">Manage Slider</span>
//                   </a>
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Alerts */}
//           <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <AlertTriangle className="h-5 w-5 text-orange-500" />
//                 Alerts
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
//                 <div>
//                   <p className="text-sm font-medium">Low Stock Items</p>
//                   <p className="text-xs text-muted-foreground">{stats.lowStockItems} items need restocking</p>
//                 </div>
//                 <Badge variant="destructive">{stats.lowStockItems}</Badge>
//               </div>

//               <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
//                 <div>
//                   <p className="text-sm font-medium">Pending Orders</p>
//                   <p className="text-xs text-muted-foreground">Orders awaiting processing</p>
//                 </div>
//                 <Badge className="bg-blue-500">{stats.pendingOrders}</Badge>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Recent Orders & Low Stock */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Recent Orders */}
//           <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <ShoppingCart className="h-5 w-5 text-green-500" />
//                 Recent Orders
//               </CardTitle>
//               <CardDescription>Latest customer orders</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3">
//                 {stats.recentOrders.length > 0 ? (
//                   stats.recentOrders.slice(0, 5).map((order, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
//                     >
//                       <div>
//                         <p className="text-sm font-medium">{order.customerName}</p>
//                         <p className="text-xs text-muted-foreground">{order.productName}</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-sm font-medium">₹{order.amount}</p>
//                         <Badge variant={order.status === "pending" ? "secondary" : "default"} className="text-xs">
//                           {order.status}
//                         </Badge>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-center text-muted-foreground py-8">No recent orders</p>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Low Stock Products */}
//           <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <AlertTriangle className="h-5 w-5 text-orange-500" />
//                 Low Stock Alert
//               </CardTitle>
//               <CardDescription>Products running low on inventory</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3">
//                 {stats.lowStockProducts.length > 0 ? (
//                   stats.lowStockProducts.slice(0, 5).map((product, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg"
//                     >
//                       <div>
//                         <p className="text-sm font-medium">{product.name}</p>
//                         <p className="text-xs text-muted-foreground">{product.productCode}</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-sm font-medium">{product.currentStock} left</p>
//                         <Progress value={(product.currentStock / 10) * 100} className="w-16 h-2 mt-1" />
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-center text-muted-foreground py-8">All products well stocked</p>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }


//C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\app\admin\dashboard\page.tsx
"use client"

import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, Package, ShoppingCart, TrendingUp, DollarSign, Eye, Plus, ArrowUpRight } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

interface DashboardStats {
  totalProducts: number
  totalOrders: number
  totalUsers: number
  totalRevenue: number
  recentOrders: Array<{
    id: string
    customer: string
    amount: number
    status: string
    date: string
  }>
  topProducts: Array<{
    id: string
    name: string
    sales: number
    revenue: number
  }>
  monthlyStats: {
    ordersGrowth: number
    revenueGrowth: number
    usersGrowth: number
  }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/admin/dashboard")
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    // <AdminLayout>
      <div className="container mx-auto px-4 py-6 md:py-8 space-y-6 md:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 dark:from-orange-400 dark:via-red-400 dark:to-pink-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your store.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
              <Eye className="h-4 w-4 mr-2" />
              View Store
            </Button>
            <Button
              size="sm"
              className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200/50 dark:border-blue-800/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Products</CardTitle>
              <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats?.totalProducts || 0}</div>
              <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border-green-200/50 dark:border-green-800/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900 dark:text-green-100">{stats?.totalOrders || 0}</div>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />+{stats?.monthlyStats?.ordersGrowth || 0}% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 border-purple-200/50 dark:border-purple-800/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Total Users</CardTitle>
              <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{stats?.totalUsers || 0}</div>
              <p className="text-xs text-purple-600 dark:text-purple-400 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />+{stats?.monthlyStats?.usersGrowth || 0}% from last month
              </p>
            </CardContent>
          </Card>

        
        </div>

     
        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50 border-orange-200/50 dark:border-orange-800/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-orange-900 dark:text-orange-100">Quick Actions</CardTitle>
            <CardDescription className="text-orange-700 dark:text-orange-300">
              Manage your store efficiently
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent" asChild>
                <Link href="/admin/products/clothes">
                  <Package className="h-6 w-6" />
                  <span className="text-sm">Add Product</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent" asChild>
                <Link href="/admin/orders">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="text-sm">View Orders</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent" asChild>
                <Link href="/admin/users">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Manage Users</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent" asChild>
                <Link href="/admin/stock-manager">
                  <BarChart3 className="h-6 w-6" />
                  <span className="text-sm">Stock Manager</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    // </AdminLayout>
  )
}
