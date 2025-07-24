// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import Link from "next/link"
// import { Shirt, ToyBrick, Baby, Bath, Plus, Package, BarChart3, ArrowRight, Sparkles } from "lucide-react"
// import { AnimatedBackground } from "@/components/animated-background"
// import { useEffect, useState } from "react"

// interface ProductStats {
//   clothes: number
//   toys: number
//   newborn: number
//   bath: number
//   total: number
//   lowStock: number
// }

// export default function AdminProductsPage() {
//   const [stats, setStats] = useState<ProductStats>({
//     clothes: 0,
//     toys: 0,
//     newborn: 0,
//     bath: 0,
//     total: 0,
//     lowStock: 0,
//   })
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     fetchProductStats()
//   }, [])

//   const fetchProductStats = async () => {
//     try {
//       setIsLoading(true)
//       // Fetch stats from all product endpoints
//       const [clothesRes, toysRes, newbornRes, bathRes] = await Promise.all([
//         fetch("/api/admin/products/clothes"),
//         fetch("/api/admin/products/toys"),
//         fetch("/api/admin/products/newborn"),
//         fetch("/api/admin/products/bath"),
//       ])

//       const [clothes, toys, newborn, bath] = await Promise.all([
//         clothesRes.json(),
//         toysRes.json(),
//         newbornRes.json(),
//         bathRes.json(),
//       ])

//       const clothesCount = Array.isArray(clothes) ? clothes.length : 0
//       const toysCount = Array.isArray(toys) ? toys.length : 0
//       const newbornCount = Array.isArray(newborn) ? newborn.length : 0
//       const bathCount = Array.isArray(bath) ? bath.length : 0

//       // Calculate low stock items (items with stock <= 5)
//       const lowStockItems = [
//         ...(Array.isArray(clothes) ? clothes.filter((item) => item.inStock <= 5) : []),
//         ...(Array.isArray(toys) ? toys.filter((item) => item.inStock <= 5) : []),
//         ...(Array.isArray(newborn) ? newborn.filter((item) => item.inStock <= 5) : []),
//         ...(Array.isArray(bath) ? bath.filter((item) => item.inStock <= 5) : []),
//       ]

//       setStats({
//         clothes: clothesCount,
//         toys: toysCount,
//         newborn: newbornCount,
//         bath: bathCount,
//         total: clothesCount + toysCount + newbornCount + bathCount,
//         lowStock: lowStockItems.length,
//       })
//     } catch (error) {
//       console.error("Error fetching product stats:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const productCategories = [
//     {
//       title: "Clothes",
//       description: "Baby clothing and apparel",
//       icon: Shirt,
//       href: "/admin/products/clothes",
//       count: stats.clothes,
//       color: "from-blue-500 to-indigo-600",
//       bgColor: "from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50",
//       iconColor: "text-blue-600 dark:text-blue-400",
//     },
//     {
//       title: "Toys",
//       description: "Educational and fun toys",
//       icon: ToyBrick,
//       href: "/admin/products/toys",
//       count: stats.toys,
//       color: "from-purple-500 to-pink-600",
//       bgColor: "from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50",
//       iconColor: "text-purple-600 dark:text-purple-400",
//     },
//     {
//       title: "Newborn",
//       description: "Essential newborn items",
//       icon: Baby,
//       href: "/admin/products/newborn",
//       count: stats.newborn,
//       color: "from-pink-500 to-rose-600",
//       bgColor: "from-pink-50 to-rose-50 dark:from-pink-950/50 dark:to-rose-950/50",
//       iconColor: "text-pink-600 dark:text-pink-400",
//     },
//     {
//       title: "Bath Items",
//       description: "Baby bath and hygiene products",
//       icon: Bath,
//       href: "/admin/products/bath",
//       count: stats.bath,
//       color: "from-cyan-500 to-blue-600",
//       bgColor: "from-cyan-50 to-blue-50 dark:from-cyan-950/50 dark:to-blue-950/50",
//       iconColor: "text-cyan-600 dark:text-cyan-400",
//     },
//   ]

//   return (
//     <div className="min-h-screen relative">
//       <AnimatedBackground />

//       <div className="relative z-10 container mx-auto px-4 py-6 md:py-8 space-y-6 md:space-y-8">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 dark:from-orange-400 dark:via-red-400 dark:to-pink-400 bg-clip-text text-transparent flex items-center gap-2">
//               <Package className="h-6 w-6 md:h-8 md:w-8 text-orange-500" />
//               <span className="text-xl md:text-3xl lg:text-4xl">Product Management</span>
//             </h1>
//             <p className="text-muted-foreground mt-1 text-sm md:text-base">
//               Manage your product inventory across all categories
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-2">
//             <Button
//               variant="outline"
//               className="rounded-xl border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-950/50 w-full sm:w-auto bg-transparent"
//               asChild
//             >
//               <Link href="/admin/stock-manager">
//                 <BarChart3 className="h-4 w-4 mr-2" />
//                 Stock Manager
//               </Link>
//             </Button>
//           </div>
//         </div>

//         {/* Stats Overview */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//           <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
//             <CardContent className="p-4 md:p-6">
//               <div className="text-center">
//                 <p className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">
//                   {isLoading ? "..." : stats.total}
//                 </p>
//                 <p className="text-xs md:text-sm text-muted-foreground">Total Products</p>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
//             <CardContent className="p-4 md:p-6">
//               <div className="text-center">
//                 <p className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">
//                   {isLoading ? "..." : stats.total - stats.lowStock}
//                 </p>
//                 <p className="text-xs md:text-sm text-muted-foreground">In Stock</p>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
//             <CardContent className="p-4 md:p-6">
//               <div className="text-center">
//                 <p className="text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400">
//                   {isLoading ? "..." : stats.lowStock}
//                 </p>
//                 <p className="text-xs md:text-sm text-muted-foreground">Low Stock</p>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
//             <CardContent className="p-4 md:p-6">
//               <div className="text-center">
//                 <p className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">4</p>
//                 <p className="text-xs md:text-sm text-muted-foreground">Categories</p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Product Categories Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//           {productCategories.map((category) => {
//             const IconComponent = category.icon
//             return (
//               <Card
//                 key={category.title}
//                 className="group border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
//               >
//                 <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-50`} />
//                 <CardHeader className="relative z-10 pb-4">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} shadow-lg`}>
//                         <IconComponent className="h-6 w-6 md:h-8 md:w-8 text-white" />
//                       </div>
//                       <div>
//                         <CardTitle className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
//                           {category.title}
//                         </CardTitle>
//                         <p className="text-sm text-muted-foreground">{category.description}</p>
//                       </div>
//                     </div>
//                     <Badge
//                       variant="secondary"
//                       className="text-lg md:text-xl font-bold px-3 py-1 bg-white/80 dark:bg-gray-800/80"
//                     >
//                       {isLoading ? "..." : category.count}
//                     </Badge>
//                   </div>
//                 </CardHeader>

//                 <CardContent className="relative z-10 pt-0">
//                   <div className="flex flex-col sm:flex-row gap-2">
//                     <Button
//                       className={`flex-1 rounded-xl bg-gradient-to-r ${category.color} hover:opacity-90 transition-all duration-300 group-hover:scale-105`}
//                       asChild
//                     >
//                       <Link href={category.href}>
//                         <Package className="h-4 w-4 mr-2" />
//                         Manage {category.title}
//                         <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
//                       </Link>
//                     </Button>

//                     <Button
//                       variant="outline"
//                       className="rounded-xl border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 bg-transparent"
//                       asChild
//                     >
//                       <Link href={`${category.href}?action=add`}>
//                         <Plus className="h-4 w-4" />
//                         <span className="hidden sm:inline ml-2">Add New</span>
//                       </Link>
//                     </Button>
//                   </div>

//                   {/* Quick Stats */}
//                   <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-muted-foreground">Quick Actions:</span>
//                       <div className="flex gap-2">
//                         <Link
//                           href={`${category.href}?filter=low-stock`}
//                           className={`${category.iconColor} hover:underline text-xs`}
//                         >
//                           View Low Stock
//                         </Link>
//                         <span className="text-gray-300 dark:text-gray-600">•</span>
//                         <Link
//                           href={`${category.href}?filter=out-of-stock`}
//                           className={`${category.iconColor} hover:underline text-xs`}
//                         >
//                           Out of Stock
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>

//                 {/* Decorative Elements */}
//                 <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
//                   <Sparkles className="h-8 w-8 md:h-12 md:w-12 text-gray-400" />
//                 </div>
//               </Card>
//             )
//           })}
//         </div>

//         {/* Quick Actions */}
//         <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
//               <BarChart3 className="h-5 w-5" />
//               Quick Actions
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               <Button
//                 variant="outline"
//                 className="rounded-xl h-auto p-4 flex flex-col items-center gap-2 hover:bg-orange-50 dark:hover:bg-orange-950/50 bg-transparent"
//                 asChild
//               >
//                 <Link href="/admin/stock-manager">
//                   <BarChart3 className="h-6 w-6 text-orange-500" />
//                   <span className="text-sm font-medium">Stock Manager</span>
//                   <span className="text-xs text-muted-foreground">Manage inventory</span>
//                 </Link>
//               </Button>

//               <Button
//                 variant="outline"
//                 className="rounded-xl h-auto p-4 flex flex-col items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-950/50 bg-transparent"
//                 asChild
//               >
//                 <Link href="/admin/products?filter=low-stock">
//                   <Package className="h-6 w-6 text-blue-500" />
//                   <span className="text-sm font-medium">Low Stock Alert</span>
//                   <span className="text-xs text-muted-foreground">{stats.lowStock} items</span>
//                 </Link>
//               </Button>

//               <Button
//                 variant="outline"
//                 className="rounded-xl h-auto p-4 flex flex-col items-center gap-2 hover:bg-green-50 dark:hover:bg-green-950/50 bg-transparent"
//                 asChild
//               >
//                 <Link href="/admin/products?action=bulk-add">
//                   <Plus className="h-6 w-6 text-green-500" />
//                   <span className="text-sm font-medium">Bulk Add</span>
//                   <span className="text-xs text-muted-foreground">Add multiple items</span>
//                 </Link>
//               </Button>

//               <Button
//                 variant="outline"
//                 className="rounded-xl h-auto p-4 flex flex-col items-center gap-2 hover:bg-purple-50 dark:hover:bg-purple-950/50 bg-transparent"
//                 asChild
//               >
//                 <Link href="/admin/products?action=export">
//                   <BarChart3 className="h-6 w-6 text-purple-500" />
//                   <span className="text-sm font-medium">Export Data</span>
//                   <span className="text-xs text-muted-foreground">Download reports</span>
//                 </Link>
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Search, RefreshCw, ToyBrick, AlertCircle } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"
import { toast } from "react-hot-toast"
import Image from "next/image"
import { toySchema, toySchemaInfo, type ToyFormData } from "@/lib/validations/toy-schema"
import { ImageGallery } from "@/components/admin/image-gallery"
import { HelpDialog } from "@/components/admin/help-dialog"
import { checkProductCodeUnique } from "@/lib/utils/stock-sync"

interface ToyItem {
  _id: string
  productCode: string
  name: string
  sellingPrice: number
  actualPrice: number
  inStock: number
  weightInGrams: number
  images: string[]
  description?: string
  createdAt: string
  updatedAt: string
}

export default function ToysManagement() {
  const [toys, setToys] = useState<ToyItem[]>([])
  const [filteredToys, setFilteredToys] = useState<ToyItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItem, setSelectedItem] = useState<ToyItem | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ToyFormData>({
    resolver: zodResolver(toySchema),
    defaultValues: {
      productCode: "",
      name: "",
      sellingPrice: 0,
      actualPrice: 0,
      inStock: 0,
      weightInGrams: 0,
      images: [],
      description: "",
    },
    mode: "onChange",
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = form
  const watchedImages = watch("images")

  useEffect(() => {
    fetchToys()
  }, [])

  useEffect(() => {
    filterToys()
  }, [toys, searchTerm])

  const fetchToys = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/products/toys")
      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      setToys(data.data || [])
    } catch (error) {
      console.error("Error fetching toys:", error)
      toast.error("Failed to fetch toys")
    } finally {
      setIsLoading(false)
    }
  }

  const filterToys = () => {
    if (!searchTerm) {
      setFilteredToys(toys)
      return
    }
    const filtered = toys.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.productCode.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredToys(filtered)
  }

  const resetForm = () => {
    reset()
    setSelectedItem(null)
    setIsEditing(false)
  }

  const openEditDialog = (item: ToyItem) => {
    setSelectedItem(item)
    reset({
      productCode: item.productCode,
      name: item.name,
      sellingPrice: item.sellingPrice,
      actualPrice: item.actualPrice,
      inStock: item.inStock,
      weightInGrams: item.weightInGrams,
      images: item.images,
      description: item.description || "",
    })
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const onSubmit = async (data: ToyFormData) => {
    setIsSubmitting(true)
    try {
      // Check product code uniqueness for new products
      if (!isEditing) {
        const isUnique = await checkProductCodeUnique(data.productCode)
        if (!isUnique) {
          toast.error("Product code already exists")
          return
        }
      }

      const url = isEditing ? `/api/admin/products/toys/${selectedItem?._id}` : "/api/admin/products/toys"
      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to save")
      }

      toast.success(isEditing ? "Toy updated successfully" : "Toy created successfully")
      fetchToys()
      setIsDialogOpen(false)
      resetForm()
    } catch (error: any) {
      console.error("Error saving toy:", error)
      toast.error(error.message || "Failed to save toy")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string, productCode: string) => {
    if (!confirm("Are you sure you want to delete this toy? This will also remove it from stock management.")) return

    try {
      const response = await fetch(`/api/admin/products/toys/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast.success("Toy deleted successfully")
      fetchToys()
    } catch (error) {
      console.error("Error deleting toy:", error)
      toast.error("Failed to delete toy")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="flex items-center gap-3 text-lg font-medium">
            <RefreshCw className="h-6 w-6 animate-spin text-pink-500" />
            Loading Toys...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10 container mx-auto px-4 py-6 md:py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
              <ToyBrick className="h-8 w-8 text-purple-500" />
              Toys Management
            </h1>
            <p className="text-muted-foreground mt-1">Manage baby toys inventory</p>
          </div>
          <Button
            onClick={() => {
              resetForm()
              setIsDialogOpen(true)
            }}
            className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Toy
          </Button>
        </div>

        {/* Search and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <Card className="lg:col-span-3 border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search toys by name or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-xl"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{toys.length}</p>
                <p className="text-sm text-muted-foreground">Total Toys</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Toys Table */}
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ToyBrick className="h-5 w-5" />
              Toys Inventory ({filteredToys.length} items)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Image</TableHead>
                    <TableHead className="min-w-32">Code</TableHead>
                    <TableHead className="min-w-40">Name</TableHead>
                    <TableHead className="min-w-24">Price</TableHead>
                    <TableHead className="min-w-20">Stock</TableHead>
                    <TableHead className="min-w-20">Weight</TableHead>
                    <TableHead className="min-w-32">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredToys.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        {item.images.length > 0 ? (
                          <Image
                            src={item.images[0] || "/placeholder.svg"}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <ToyBrick className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium font-mono text-xs">{item.productCode}</TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">₹{item.sellingPrice}</p>
                          {item.actualPrice > item.sellingPrice && (
                            <p className="text-xs text-muted-foreground line-through">₹{item.actualPrice}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.inStock > 10 ? "default" : item.inStock > 0 ? "secondary" : "destructive"}>
                          {item.inStock}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{item.weightInGrams}g</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(item)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(item._id, item.productCode)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Toy" : "Add New Toy"}</DialogTitle>
              <DialogDescription>
                {isEditing ? "Update the toy details" : "Fill in the details to add a new toy"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Toy Name *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Enter toy name"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productCode">Product Code *</Label>
                  <Input
                    id="productCode"
                    {...register("productCode")}
                    placeholder="e.g., toycar1.1"
                    className={errors.productCode ? "border-red-500" : ""}
                    disabled={isEditing} // Can't change product code during edit
                  />
                  {errors.productCode && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.productCode.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sellingPrice">Selling Price (₹) *</Label>
                  <Input
                    id="sellingPrice"
                    type="number"
                    step="0.01"
                    {...register("sellingPrice", { valueAsNumber: true })}
                    placeholder="299"
                    className={errors.sellingPrice ? "border-red-500" : ""}
                  />
                  {errors.sellingPrice && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.sellingPrice.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="actualPrice">Actual Price (₹) *</Label>
                  <Input
                    id="actualPrice"
                    type="number"
                    step="0.01"
                    {...register("actualPrice", { valueAsNumber: true })}
                    placeholder="399"
                    className={errors.actualPrice ? "border-red-500" : ""}
                  />
                  {errors.actualPrice && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.actualPrice.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weightInGrams">Weight (grams) *</Label>
                  <Input
                    id="weightInGrams"
                    type="number"
                    {...register("weightInGrams", { valueAsNumber: true })}
                    placeholder="250"
                    className={errors.weightInGrams ? "border-red-500" : ""}
                  />
                  {errors.weightInGrams && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.weightInGrams.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="inStock">Stock Quantity *</Label>
                <Input
                  id="inStock"
                  type="number"
                  {...register("inStock", { valueAsNumber: true })}
                  placeholder="25"
                  className={errors.inStock ? "border-red-500" : ""}
                />
                {errors.inStock && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.inStock.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Enter toy description"
                  rows={3}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <ImageGallery
                  images={watchedImages || []}
                  onImagesChange={(images) => setValue("images", images)}
                  maxImages={10}
                  acceptVideo={false}
                />
                {errors.images && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.images.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      {isEditing ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>{isEditing ? "Update" : "Create"} Toy</>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Help Dialog */}
        <HelpDialog schemaInfo={toySchemaInfo} />
      </div>
    </div>
  )
}
