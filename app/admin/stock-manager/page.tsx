"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart3, Search, Plus, Minus, Edit, AlertTriangle, Package, RefreshCw, Download } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"
import { toast } from "react-hot-toast"

interface StockItem {
  _id: string
  productId: string
  productCode: string
  productType: "clothes" | "toy" | "bath" | "newborn"
  productName: string
  currentStock: number
  lastUpdated: string
  source: "offline" | "instagram" | "online"
  notes?: string
}

export default function StockManager() {
  const [stockItems, setStockItems] = useState<StockItem[]>([])
  const [filteredItems, setFilteredItems] = useState<StockItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStock, setFilterStock] = useState<string>("all")
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [stockUpdate, setStockUpdate] = useState({ quantity: 0, notes: "" })

  useEffect(() => {
    fetchStockData()
  }, [])

  useEffect(() => {
    filterStockItems()
  }, [stockItems, searchTerm, filterType, filterStock])

  const fetchStockData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/stock-manager")
      const data = await response.json()
      setStockItems(data)
    } catch (error) {
      console.error("Error fetching stock data:", error)
      toast.error("Failed to fetch stock data")
    } finally {
      setIsLoading(false)
    }
  }

  const filterStockItems = () => {
    let filtered = stockItems

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.productCode.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Type filter
    if (filterType !== "all") {
      filtered = filtered.filter((item) => item.productType === filterType)
    }

    // Stock level filter
    if (filterStock === "low") {
      filtered = filtered.filter((item) => item.currentStock < 5)
    } else if (filterStock === "out") {
      filtered = filtered.filter((item) => item.currentStock === 0)
    }

    setFilteredItems(filtered)
  }

  const updateStock = async (itemId: string, newStock: number, notes: string) => {
  try {
    const item = stockItems.find((i) => i._id === itemId)
    if (!item) {
      toast.error("Item not found for update")
      return
    }

    const response = await fetch("/api/admin/stock-manager", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemId,
        newStock,
        notes,
        productType: item.productType,
        productCode: item.productCode,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to update stock")
    }

    toast.success("Stock updated successfully")
    setIsEditDialogOpen(false)

    // Optionally update the local state without refetching
    setStockItems((prev) =>
      prev.map((i) =>
        i._id === itemId
          ? { ...i, currentStock: newStock, notes, lastUpdated: new Date().toISOString() }
          : i
      )
    )
  } catch (error) {
    console.error("Error updating stock:", error)
    toast.error("Error updating stock")
  }
}

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    } else if (stock < 5) {
      return (
        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
          Low Stock
        </Badge>
      )
    } else {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          In Stock
        </Badge>
      )
    }
  }

  const getTypeColor = (type: string) => {
    const colors = {
      clothes: "bg-blue-100 text-blue-800",
      toy: "bg-purple-100 text-purple-800",
      bath: "bg-cyan-100 text-cyan-800",
      newborn: "bg-pink-100 text-pink-800",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const exportLowStockReport = () => {
    const lowStockItems = stockItems.filter((item) => item.currentStock < 5)
    const csvContent = [
      ["Product Code", "Product Name", "Type", "Current Stock", "Last Updated"],
      ...lowStockItems.map((item) => [
        item.productCode,
        item.productName,
        item.productType,
        item.currentStock.toString(),
        new Date(item.lastUpdated).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `low-stock-report-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="flex items-center gap-3 text-lg font-medium">
            <RefreshCw className="h-6 w-6 animate-spin text-pink-500" />
            Loading Stock Data...
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
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Stock Manager
            </h1>
            <p className="text-muted-foreground mt-1">Monitor and manage inventory across all product categories</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchStockData} className="rounded-xl bg-transparent">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={exportLowStockReport} className="rounded-xl bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export Low Stock
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                  <p className="text-2xl font-bold">{stockItems.length}</p>
                </div>
                <Package className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Low Stock</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {stockItems.filter((item) => item.currentStock < 5).length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Out of Stock</p>
                  <p className="text-2xl font-bold text-red-600">
                    {stockItems.filter((item) => item.currentStock === 0).length}
                  </p>
                </div>
                <Package className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Well Stocked</p>
                  <p className="text-2xl font-bold text-green-600">
                    {stockItems.filter((item) => item.currentStock >= 5).length}
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by product name or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-xl"
                />
              </div>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-48 rounded-xl">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="clothes">Clothes</SelectItem>
                  <SelectItem value="toy">Toys</SelectItem>
                  <SelectItem value="bath">Bath Items</SelectItem>
                  <SelectItem value="newborn">Newborn</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStock} onValueChange={setFilterStock}>
                <SelectTrigger className="w-full sm:w-48 rounded-xl">
                  <SelectValue placeholder="Filter by stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stock Levels</SelectItem>
                  <SelectItem value="low">Low Stock (&lt; 5)</SelectItem>
                  <SelectItem value="out">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stock Table */}
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Stock Inventory ({filteredItems.length} items)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Code</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="font-medium">{item.productCode}</TableCell>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(item.productType)}>{item.productType}</Badge>
                      </TableCell>
                      <TableCell className="font-bold">{item.currentStock}</TableCell>
                      <TableCell>{getStockBadge(item.currentStock)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.source}</Badge>
                      </TableCell>
                      <TableCell>{new Date(item.lastUpdated).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedItem(item)
                            setStockUpdate({ quantity: item.currentStock, notes: item.notes || "" })
                            setIsEditDialogOpen(true)
                          }}
                          className="rounded-lg"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Stock Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Update Stock</DialogTitle>
              <DialogDescription>Update stock quantity for {selectedItem?.productName}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="quantity">Stock Quantity</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setStockUpdate((prev) => ({
                        ...prev,
                        quantity: Math.max(0, prev.quantity - 1),
                      }))
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    value={stockUpdate.quantity}
                    onChange={(e) =>
                      setStockUpdate((prev) => ({
                        ...prev,
                        quantity: Number.parseInt(e.target.value) || 0,
                      }))
                    }
                    className="text-center"
                    min="0"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setStockUpdate((prev) => ({
                        ...prev,
                        quantity: prev.quantity + 1,
                      }))
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={stockUpdate.notes}
                  onChange={(e) =>
                    setStockUpdate((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  placeholder="Add any notes about this stock update..."
                  className="mt-1"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => selectedItem && updateStock(selectedItem._id, stockUpdate.quantity, stockUpdate.notes)}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  Update Stock
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
