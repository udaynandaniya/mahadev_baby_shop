


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
