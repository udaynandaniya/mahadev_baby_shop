// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Package, Users, ShoppingCart, TrendingUp, Mail, MessageSquare, QrCode } from "lucide-react"
// import { AdminHeader } from "@/components/admin/admin-header"
// import { ProductManagement } from "@/components/admin/product-management"
// import { UserManagement } from "@/components/admin/user-management"
// import { OrderManagement } from "@/components/admin/order-management"
// import { QueryManagement } from "@/components/admin/query-management"
// import { EmailMarketing } from "@/components/admin/email-marketing"
// import { QRScanner } from "@/components/admin/qr-scanner"
// import { useAuth } from "@/hooks/use-auth"
// import { useRouter } from "next/navigation"

// export default function AdminDashboard() {
//   const { user } = useAuth()
//   const router = useRouter()
//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     totalUsers: 0,
//     totalOrders: 0,
//     totalRevenue: 0,
//     pendingQueries: 0,
//   })

//   useEffect(() => {
//     if (!user?.isAdmin) {
//       router.push("/login")
//       return
//     }

//     // Fetch admin stats
//     const fetchStats = async () => {
//       try {
//         // Mock data - replace with actual API calls
//         setStats({
//           totalProducts: 156,
//           totalUsers: 1247,
//           totalOrders: 89,
//           totalRevenue: 125000,
//           pendingQueries: 12,
//         })
//       } catch (error) {
//         console.error("Error fetching stats:", error)
//       }
//     }

//     fetchStats()
//   }, [user, router])

//   if (!user?.isAdmin) {
//     return null
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <AdminHeader />

//       <main className="container py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
//           <p className="text-gray-600 dark:text-gray-300">
//             Welcome back, {user.name}! Here's what's happening at Mahadev Baby Shop.
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Products</CardTitle>
//               <Package className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stats.totalProducts}</div>
//               <p className="text-xs text-muted-foreground">+12 from last month</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Users</CardTitle>
//               <Users className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stats.totalUsers}</div>
//               <p className="text-xs text-muted-foreground">+23 from last month</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
//               <ShoppingCart className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stats.totalOrders}</div>
//               <p className="text-xs text-muted-foreground">+5 from yesterday</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Revenue</CardTitle>
//               <TrendingUp className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
//               <p className="text-xs text-muted-foreground">+8% from last month</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Pending Queries</CardTitle>
//               <MessageSquare className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stats.pendingQueries}</div>
//               <p className="text-xs text-muted-foreground">
//                 {stats.pendingQueries > 0 ? "Needs attention" : "All caught up!"}
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Main Content Tabs */}
//         <Tabs defaultValue="products" className="space-y-6">
//           <TabsList className="grid w-full grid-cols-6">
//             <TabsTrigger value="products" className="flex items-center gap-2">
//               <Package className="h-4 w-4" />
//               Products
//             </TabsTrigger>
//             <TabsTrigger value="orders" className="flex items-center gap-2">
//               <ShoppingCart className="h-4 w-4" />
//               Orders
//             </TabsTrigger>
//             <TabsTrigger value="users" className="flex items-center gap-2">
//               <Users className="h-4 w-4" />
//               Users
//             </TabsTrigger>
//             <TabsTrigger value="queries" className="flex items-center gap-2">
//               <MessageSquare className="h-4 w-4" />
//               Queries
//               {stats.pendingQueries > 0 && (
//                 <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 text-xs">
//                   {stats.pendingQueries}
//                 </Badge>
//               )}
//             </TabsTrigger>
//             <TabsTrigger value="marketing" className="flex items-center gap-2">
//               <Mail className="h-4 w-4" />
//               Marketing
//             </TabsTrigger>
//             <TabsTrigger value="scanner" className="flex items-center gap-2">
//               <QrCode className="h-4 w-4" />
//               QR Scanner
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="products">
//             <ProductManagement />
//           </TabsContent>

//           <TabsContent value="orders">
//             <OrderManagement />
//           </TabsContent>

//           <TabsContent value="users">
//             <UserManagement />
//           </TabsContent>

//           <TabsContent value="queries">
//             <QueryManagement />
//           </TabsContent>

//           <TabsContent value="marketing">
//             <EmailMarketing />
//           </TabsContent>

//           <TabsContent value="scanner">
//             <QRScanner />
//           </TabsContent>
//         </Tabs>
//       </main>
//     </div>
//   )
// }
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "../contexts/auth-provider"

export default function AdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()

  // Optional: Redirect if a non-admin user tries to access
  useEffect(() => {
    if (!user && typeof window !== "undefined") {
      const localEmail = localStorage.getItem("admin-email")
      if (localEmail !== "admin@123") {
        router.replace("/")
      }
    }
  }, [user])

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-pink-600 mb-6">Admin Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Card className="rounded-2xl shadow-md bg-white hover:shadow-lg transition">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
              <p className="text-2xl font-bold text-pink-500 mt-2">128</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md bg-white hover:shadow-lg transition">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-700">Users</h2>
              <p className="text-2xl font-bold text-pink-500 mt-2">58</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md bg-white hover:shadow-lg transition">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-700">Revenue</h2>
              <p className="text-2xl font-bold text-pink-500 mt-2">₹ 23,000</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10">
          <Button className="bg-pink-500 hover:bg-pink-600 text-white">Manage Products</Button>
        </div>
      </div>
    </main>
  )
}
