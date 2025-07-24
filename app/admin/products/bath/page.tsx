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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Plus,
  Edit,
  Trash2,
  Search,
  RefreshCw,
  Bath,
  AlertCircle,
  Filter,
  ChevronDown,
  ChevronUp,
  SortAsc,
  SortDesc,
  X,
} from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"
import { toast } from "react-hot-toast"
import Image from "next/image"
import { bathSchema, bathSchemaInfo, type BathFormData } from "@/lib/validations/bath-schema"
import { ImageGallery } from "@/components/admin/image-gallery"
import { HelpDialog } from "@/components/admin/help-dialog"

interface BathItem {
  _id: string
  productCode: string
  name: string
  type?: string
  sellingPrice: number
  actualPrice: number
  sizeInMl?: number
  inStock: number
  weightInGrams: number
  widthInCm?: number
  lengthInCm?: number
  images: string[]
  description?: string
  createdAt: string
  updatedAt: string
}

interface FilterState {
  search: string
  type: string[]
  priceRange: {
    min: number | null
    max: number | null
  }
  stockRange: {
    min: number | null
    max: number | null
  }
  weightRange: {
    min: number | null
    max: number | null
  }
  sizeRange: {
    min: number | null
    max: number | null
  }
  stockStatus: "all" | "in-stock" | "low-stock" | "out-of-stock"
  sortBy: "name" | "price" | "stock" | "weight" | "created"
  sortOrder: "asc" | "desc"
}

const typeOptions = ["soap", "shampoo", "towel", "diaper", "lotion", "oil", "powder", "wipes"]

export default function BathManagement() {
  const [bathItems, setBathItems] = useState<BathItem[]>([])
  const [filteredBathItems, setFilteredBathItems] = useState<BathItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedItem, setSelectedItem] = useState<BathItem | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    type: [],
    priceRange: { min: null, max: null },
    stockRange: { min: null, max: null },
    weightRange: { min: null, max: null },
    sizeRange: { min: null, max: null },
    stockStatus: "all",
    sortBy: "created",
    sortOrder: "desc",
  })

  const form = useForm<BathFormData>({
    resolver: zodResolver(bathSchema),
    defaultValues: {
      productCode: "",
      name: "",
      type: "",
      sellingPrice: 0,
      actualPrice: 0,
      sizeInMl: 0,
      inStock: 0,
      weightInGrams: 0,
      widthInCm: 0,
      lengthInCm: 0,
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
    fetchBathItems()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [bathItems, filters])

  const fetchBathItems = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/products/bath")
      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      setBathItems(data.data || [])
    } catch (error) {
      console.error("Error fetching bath items:", error)
      toast.error("Failed to fetch bath items")
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...bathItems]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchLower) ||
          item.productCode.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower) ||
          item.type?.toLowerCase().includes(searchLower),
      )
    }

    // Type filter
    if (filters.type.length > 0) {
      filtered = filtered.filter((item) => item.type && filters.type.includes(item.type))
    }

    // Price range filter
    if (filters.priceRange.min !== null) {
      filtered = filtered.filter((item) => item.sellingPrice >= filters.priceRange.min!)
    }
    if (filters.priceRange.max !== null) {
      filtered = filtered.filter((item) => item.sellingPrice <= filters.priceRange.max!)
    }

    // Stock range filter
    if (filters.stockRange.min !== null) {
      filtered = filtered.filter((item) => item.inStock >= filters.stockRange.min!)
    }
    if (filters.stockRange.max !== null) {
      filtered = filtered.filter((item) => item.inStock <= filters.stockRange.max!)
    }

    // Weight range filter
    if (filters.weightRange.min !== null) {
      filtered = filtered.filter((item) => item.weightInGrams >= filters.weightRange.min!)
    }
    if (filters.weightRange.max !== null) {
      filtered = filtered.filter((item) => item.weightInGrams <= filters.weightRange.max!)
    }

    // Size range filter
    if (filters.sizeRange.min !== null) {
      filtered = filtered.filter((item) => item.sizeInMl && item.sizeInMl >= filters.sizeRange.min!)
    }
    if (filters.sizeRange.max !== null) {
      filtered = filtered.filter((item) => item.sizeInMl && item.sizeInMl <= filters.sizeRange.max!)
    }

    // Stock status filter
    if (filters.stockStatus !== "all") {
      filtered = filtered.filter((item) => {
        switch (filters.stockStatus) {
          case "in-stock":
            return item.inStock > 10
          case "low-stock":
            return item.inStock > 0 && item.inStock <= 10
          case "out-of-stock":
            return item.inStock === 0
          default:
            return true
        }
      })
    }

    // Sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any
      switch (filters.sortBy) {
        case "name":
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case "price":
          aValue = a.sellingPrice
          bValue = b.sellingPrice
          break
        case "stock":
          aValue = a.inStock
          bValue = b.inStock
          break
        case "weight":
          aValue = a.weightInGrams
          bValue = b.weightInGrams
          break
        case "created":
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
          break
        default:
          return 0
      }

      if (aValue < bValue) return filters.sortOrder === "asc" ? -1 : 1
      if (aValue > bValue) return filters.sortOrder === "asc" ? 1 : -1
      return 0
    })

    setFilteredBathItems(filtered)
  }

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      type: [],
      priceRange: { min: null, max: null },
      stockRange: { min: null, max: null },
      weightRange: { min: null, max: null },
      sizeRange: { min: null, max: null },
      stockStatus: "all",
      sortBy: "created",
      sortOrder: "desc",
    })
  }

  const resetForm = () => {
    reset()
    setSelectedItem(null)
    setIsEditing(false)
  }

  const openEditDialog = (item: BathItem) => {
    setSelectedItem(item)
    reset({
      productCode: item.productCode,
      name: item.name,
      type: item.type || "",
      sellingPrice: item.sellingPrice,
      actualPrice: item.actualPrice,
      sizeInMl: item.sizeInMl || 0,
      inStock: item.inStock,
      weightInGrams: item.weightInGrams,
      widthInCm: item.widthInCm || 0,
      lengthInCm: item.lengthInCm || 0,
      images: item.images,
      description: item.description || "",
    })
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const checkProductCodeUnique = async (productCode: string, excludeId?: string): Promise<boolean> => {
    try {
      const params = new URLSearchParams({ productCode })
      if (excludeId) {
        params.append("excludeId", excludeId)
      }
      const response = await fetch(`/api/admin/products/check-unique?${params}`)
      if (!response.ok) throw new Error("Failed to check uniqueness")
      const data = await response.json()
      return data.isUnique
    } catch (error) {
      console.error("Error checking product code uniqueness:", error)
      return false
    }
  }

  const onSubmit = async (data: BathFormData) => {
    setIsSubmitting(true)
    try {
      if (!isEditing) {
        const isUnique = await checkProductCodeUnique(data.productCode)
        if (!isUnique) {
          toast.error("Product code already exists")
          return
        }
      }

      const url = isEditing ? `/api/admin/products/bath/${selectedItem?._id}` : "/api/admin/products/bath"
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

      toast.success(isEditing ? "Bath item updated successfully" : "Bath item created successfully")
      fetchBathItems()
      setIsDialogOpen(false)
      resetForm()
    } catch (error: any) {
      console.error("Error saving bath item:", error)
      toast.error(error.message || "Failed to save bath item")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string, productCode: string) => {
    if (!confirm("Are you sure you want to delete this bath item? This will also remove it from stock management."))
      return

    try {
      const response = await fetch(`/api/admin/products/bath/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast.success("Bath item deleted successfully")
      fetchBathItems()
    } catch (error) {
      console.error("Error deleting bath item:", error)
      toast.error("Failed to delete bath item")
    }
  }

  const getStockBadgeVariant = (stock: number) => {
    if (stock > 10) return "default"
    if (stock > 0) return "secondary"
    return "destructive"
  }

  const hasActiveFilters = () => {
    return (
      filters.search ||
      filters.type.length > 0 ||
      filters.priceRange.min !== null ||
      filters.priceRange.max !== null ||
      filters.stockRange.min !== null ||
      filters.stockRange.max !== null ||
      filters.weightRange.min !== null ||
      filters.weightRange.max !== null ||
      filters.sizeRange.min !== null ||
      filters.sizeRange.max !== null ||
      filters.stockStatus !== "all"
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="flex items-center gap-3 text-lg font-medium">
            <RefreshCw className="h-6 w-6 animate-spin text-blue-500" />
            Loading Bath Items...
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
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-400 bg-clip-text text-transparent flex items-center gap-2">
              <Bath className="h-8 w-8 text-blue-500" />
              Bath Items Management
            </h1>
            <p className="text-muted-foreground mt-1">Manage baby bath products inventory</p>
          </div>
          <Button
            onClick={() => {
              resetForm()
              setIsDialogOpen(true)
            }}
            className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Bath Item
          </Button>
        </div>

        {/* Search and Filter Section */}
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bath items by name, code, type, or description..."
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2">
                <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                      {hasActiveFilters() && (
                        <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                          !
                        </Badge>
                      )}
                      {isFilterOpen ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/50">
                      {/* Type Filter */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Type</Label>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {typeOptions.map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <Checkbox
                                id={`filter-type-${type}`}
                                checked={filters.type.includes(type)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    updateFilter("type", [...filters.type, type])
                                  } else {
                                    updateFilter(
                                      "type",
                                      filters.type.filter((t) => t !== type),
                                    )
                                  }
                                }}
                              />
                              <Label htmlFor={`filter-type-${type}`} className="text-sm capitalize">
                                {type}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Price Range */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Price Range (₹)</Label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={filters.priceRange.min || ""}
                            onChange={(e) =>
                              updateFilter("priceRange", {
                                ...filters.priceRange,
                                min: e.target.value ? Number(e.target.value) : null,
                              })
                            }
                            className="text-sm"
                          />
                          <Input
                            type="number"
                            placeholder="Max"
                            value={filters.priceRange.max || ""}
                            onChange={(e) =>
                              updateFilter("priceRange", {
                                ...filters.priceRange,
                                max: e.target.value ? Number(e.target.value) : null,
                              })
                            }
                            className="text-sm"
                          />
                        </div>
                      </div>

                      {/* Stock Range */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Stock Range</Label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={filters.stockRange.min || ""}
                            onChange={(e) =>
                              updateFilter("stockRange", {
                                ...filters.stockRange,
                                min: e.target.value ? Number(e.target.value) : null,
                              })
                            }
                            className="text-sm"
                          />
                          <Input
                            type="number"
                            placeholder="Max"
                            value={filters.stockRange.max || ""}
                            onChange={(e) =>
                              updateFilter("stockRange", {
                                ...filters.stockRange,
                                max: e.target.value ? Number(e.target.value) : null,
                              })
                            }
                            className="text-sm"
                          />
                        </div>
                      </div>

                      {/* Weight Range */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Weight Range (g)</Label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={filters.weightRange.min || ""}
                            onChange={(e) =>
                              updateFilter("weightRange", {
                                ...filters.weightRange,
                                min: e.target.value ? Number(e.target.value) : null,
                              })
                            }
                            className="text-sm"
                          />
                          <Input
                            type="number"
                            placeholder="Max"
                            value={filters.weightRange.max || ""}
                            onChange={(e) =>
                              updateFilter("weightRange", {
                                ...filters.weightRange,
                                max: e.target.value ? Number(e.target.value) : null,
                              })
                            }
                            className="text-sm"
                          />
                        </div>
                      </div>

                      {/* Size Range */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Size Range (ml)</Label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={filters.sizeRange.min || ""}
                            onChange={(e) =>
                              updateFilter("sizeRange", {
                                ...filters.sizeRange,
                                min: e.target.value ? Number(e.target.value) : null,
                              })
                            }
                            className="text-sm"
                          />
                          <Input
                            type="number"
                            placeholder="Max"
                            value={filters.sizeRange.max || ""}
                            onChange={(e) =>
                              updateFilter("sizeRange", {
                                ...filters.sizeRange,
                                max: e.target.value ? Number(e.target.value) : null,
                              })
                            }
                            className="text-sm"
                          />
                        </div>
                      </div>

                      {/* Stock Status */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Stock Status</Label>
                        <Select
                          value={filters.stockStatus}
                          onValueChange={(value) => updateFilter("stockStatus", value)}
                        >
                          <SelectTrigger className="text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Items</SelectItem>
                            <SelectItem value="in-stock">In Stock &gt;10</SelectItem>
                            <SelectItem value="low-stock">Low Stock 1-10</SelectItem>
                            <SelectItem value="out-of-stock">Out of Stock 0</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Sort By */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Sort By</Label>
                        <div className="flex gap-2">
                          <Select value={filters.sortBy} onValueChange={(value) => updateFilter("sortBy", value)}>
                            <SelectTrigger className="text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="name">Name</SelectItem>
                              <SelectItem value="price">Price</SelectItem>
                              <SelectItem value="stock">Stock</SelectItem>
                              <SelectItem value="weight">Weight</SelectItem>
                              <SelectItem value="created">Created Date</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateFilter("sortOrder", filters.sortOrder === "asc" ? "desc" : "asc")}
                            className="px-3"
                          >
                            {filters.sortOrder === "asc" ? (
                              <SortAsc className="h-4 w-4" />
                            ) : (
                              <SortDesc className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Clear Filters */}
                      <div className="flex items-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={clearFilters}
                          disabled={!hasActiveFilters()}
                          className="w-full bg-transparent"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Clear Filters
                        </Button>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>Total: {bathItems.length}</span>
                <span>Filtered: {filteredBathItems.length}</span>
                <span>In Stock: {bathItems.filter((b) => b.inStock > 0).length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bath Items Table */}
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bath className="h-5 w-5" />
              Bath Items Inventory ({filteredBathItems.length} items)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Mobile Cards View */}
            <div className="block md:hidden space-y-4">
              {filteredBathItems.map((item) => (
                <Card key={item._id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {item.images.length > 0 ? (
                        <Image
                          src={item.images[0] || "/placeholder.svg"}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-15 h-15 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Bath className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-sm truncate">{item.name}</h3>
                          <p className="text-xs text-muted-foreground font-mono">{item.productCode}</p>
                          {item.type && (
                            <Badge variant="outline" className="text-xs mt-1">
                              {item.type}
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-1 ml-2">
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
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Price: </span>
                          <span className="font-medium">₹{item.sellingPrice}</span>
                          {item.actualPrice > item.sellingPrice && (
                            <span className="text-muted-foreground line-through ml-1">₹{item.actualPrice}</span>
                          )}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Stock: </span>
                          <Badge variant={getStockBadgeVariant(item.inStock)} className="text-xs">
                            {item.inStock}
                          </Badge>
                        </div>
                        {item.sizeInMl && (
                          <div>
                            <span className="text-muted-foreground">Size: </span>
                            <span>{item.sizeInMl}ml</span>
                          </div>
                        )}
                        <div>
                          <span className="text-muted-foreground">Weight: </span>
                          <span>{item.weightInGrams}g</span>
                        </div>
                        {(item.widthInCm || item.lengthInCm) && (
                          <div className="col-span-2">
                            <span className="text-muted-foreground">Dimensions: </span>
                            <span>
                              {item.widthInCm}cm × {item.lengthInCm}cm
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Image</TableHead>
                    <TableHead className="min-w-32">Code</TableHead>
                    <TableHead className="min-w-40">Name</TableHead>
                    <TableHead className="min-w-24">Type</TableHead>
                    <TableHead className="min-w-20">Size</TableHead>
                    <TableHead className="min-w-24">Price</TableHead>
                    <TableHead className="min-w-20">Stock</TableHead>
                    <TableHead className="min-w-20">Weight</TableHead>
                    <TableHead className="min-w-32">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBathItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        {item.images.length > 0 ? (
                          <Image
                            src={item.images[0] || "/placeholder.svg"}
                            alt={item.name}
                             width={140}
                          height={320}
                            className="rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Bath className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium font-mono text-xs">{item.productCode}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          {item.sizeInMl && <p className="text-xs text-muted-foreground">{item.sizeInMl}ml</p>}
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.type && (
                          <Badge variant="outline" className="text-xs capitalize">
                            {item.type}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        {item.widthInCm && item.lengthInCm ? `${item.widthInCm}×${item.lengthInCm}cm` : "-"}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">₹{item.sellingPrice}</p>
                          {item.actualPrice > item.sellingPrice && (
                            <p className="text-xs text-muted-foreground line-through">₹{item.actualPrice}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStockBadgeVariant(item.inStock)}>{item.inStock}</Badge>
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

            {/* Empty State */}
            {filteredBathItems.length === 0 && (
              <div className="text-center py-8">
                <Bath className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No bath items found</p>
                <p className="text-sm text-gray-400">
                  {hasActiveFilters() ? "Try adjusting your filters" : "Add your first bath item to get started"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Bath Item" : "Add New Bath Item"}</DialogTitle>
              <DialogDescription>
                {isEditing ? "Update the bath item details" : "Fill in the details to add a new bath item"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Bath Item Name *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Enter bath item name"
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
                    placeholder="e.g., soap_baby_1.1"
                    className={errors.productCode ? "border-red-500" : ""}
                    disabled={isEditing}
                  />
                  {errors.productCode && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.productCode.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select onValueChange={(value) => setValue("type", value)} defaultValue={watch("type")}>
                    <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {typeOptions.map((type) => (
                        <SelectItem key={type} value={type} className="capitalize">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.type && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.type.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sizeInMl">Size (ml)</Label>
                  <Input
                    id="sizeInMl"
                    type="number"
                    {...register("sizeInMl", { valueAsNumber: true })}
                    placeholder="250"
                    className={errors.sizeInMl ? "border-red-500" : ""}
                  />
                  {errors.sizeInMl && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.sizeInMl.message}
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
                    placeholder="199"
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
                    placeholder="299"
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
                  <Label htmlFor="inStock">Stock Quantity *</Label>
                  <Input
                    id="inStock"
                    type="number"
                    {...register("inStock", { valueAsNumber: true })}
                    placeholder="50"
                    className={errors.inStock ? "border-red-500" : ""}
                  />
                  {errors.inStock && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.inStock.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weightInGrams">Weight (grams) *</Label>
                  <Input
                    id="weightInGrams"
                    type="number"
                    {...register("weightInGrams", { valueAsNumber: true })}
                    placeholder="300"
                    className={errors.weightInGrams ? "border-red-500" : ""}
                  />
                  {errors.weightInGrams && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.weightInGrams.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="widthInCm">Width (cm)</Label>
                  <Input
                    id="widthInCm"
                    type="number"
                    step="0.1"
                    {...register("widthInCm", { valueAsNumber: true })}
                    placeholder="30"
                    className={errors.widthInCm ? "border-red-500" : ""}
                  />
                  {errors.widthInCm && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.widthInCm.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lengthInCm">Length (cm)</Label>
                  <Input
                    id="lengthInCm"
                    type="number"
                    step="0.1"
                    {...register("lengthInCm", { valueAsNumber: true })}
                    placeholder="40"
                    className={errors.lengthInCm ? "border-red-500" : ""}
                  />
                  {errors.lengthInCm && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.lengthInCm.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Enter bath item description"
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
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      {isEditing ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>{isEditing ? "Update" : "Create"} Bath Item</>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Help Dialog */}
        <HelpDialog schemaInfo={bathSchemaInfo} />
      </div>
    </div>
  )
}
