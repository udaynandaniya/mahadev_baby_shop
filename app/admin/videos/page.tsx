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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Plus,
  Edit,
  Trash2,
  Search,
  RefreshCw,
  Video,
  AlertCircle,
  SortAsc,
  SortDesc,
  X,
  Play,
  DollarSign,
} from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"
import { toast } from "react-hot-toast"
import { videoSchema, videoSchemaInfo, type VideoFormData } from "@/lib/validations/video-schema"
import { ImageGallery } from "@/components/admin/image-gallery"
import { HelpDialog } from "@/components/admin/help-dialog"

interface VideoItem {
  _id: string
  name: string
  productCode: string
  videoUrl: string
  sellingPrice: number
  actualPrice?: number
  description?: string
  createdAt: string
  updatedAt: string
}

interface FilterState {
  search: string
  priceRange: {
    min: number | null
    max: number | null
  }
  sortBy: "name" | "price" | "created" | "productCode"
  sortOrder: "asc" | "desc"
}

export default function VideoManagement() {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [filteredVideos, setFilteredVideos] = useState<VideoItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedItem, setSelectedItem] = useState<VideoItem | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedVideos, setSelectedVideos] = useState<string[]>([])
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    priceRange: { min: null, max: null },
    sortBy: "created",
    sortOrder: "desc",
  })

  const form = useForm<VideoFormData>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      name: "",
      productCode: "",
      videoUrl: "",
      sellingPrice: 0,
      actualPrice: 0,
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

  const watchedVideoUrl = watch("videoUrl")

  useEffect(() => {
    fetchVideos()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [videos, filters])

  const fetchVideos = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/videos")
      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      setVideos(data.data || [])
    } catch (error) {
      console.error("Error fetching videos:", error)
      toast.error("Failed to fetch videos")
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...videos]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchLower) ||
          item.productCode.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower),
      )
    }

    // Price range filter
    if (filters.priceRange.min !== null) {
      filtered = filtered.filter((item) => item.sellingPrice >= filters.priceRange.min!)
    }
    if (filters.priceRange.max !== null) {
      filtered = filtered.filter((item) => item.sellingPrice <= filters.priceRange.max!)
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
        case "productCode":
          aValue = a.productCode.toLowerCase()
          bValue = b.productCode.toLowerCase()
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

    setFilteredVideos(filtered)
  }

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      priceRange: { min: null, max: null },
      sortBy: "created",
      sortOrder: "desc",
    })
  }

  const resetForm = () => {
    reset()
    setSelectedItem(null)
    setIsEditing(false)
  }

  const openEditDialog = (item: VideoItem) => {
    setSelectedItem(item)
    reset({
      name: item.name,
      productCode: item.productCode,
      videoUrl: item.videoUrl,
      sellingPrice: item.sellingPrice,
      actualPrice: item.actualPrice || 0,
      description: item.description || "",
    })
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const onSubmit = async (data: VideoFormData) => {
    setIsSubmitting(true)
    try {
      const url = isEditing ? `/api/admin/videos/${selectedItem?._id}` : "/api/admin/videos"
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

      toast.success(isEditing ? "Video updated successfully" : "Video created successfully")
      fetchVideos()
      setIsDialogOpen(false)
      resetForm()
    } catch (error: any) {
      console.error("Error saving video:", error)
      toast.error(error.message || "Failed to save video")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video? This will also remove the video file from storage."))
      return

    try {
      const response = await fetch(`/api/admin/videos/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast.success("Video deleted successfully")
      fetchVideos()
    } catch (error) {
      console.error("Error deleting video:", error)
      toast.error("Failed to delete video")
    }
  }

  const handleBulkDelete = async () => {
    if (selectedVideos.length === 0) {
      toast.error("Please select videos to delete")
      return
    }

    if (!confirm(`Are you sure you want to delete ${selectedVideos.length} selected videos?`)) return

    try {
      const response = await fetch("/api/admin/videos/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoIds: selectedVideos }),
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast.success(`${selectedVideos.length} videos deleted successfully`)
      setSelectedVideos([])
      fetchVideos()
    } catch (error) {
      console.error("Error bulk deleting videos:", error)
      toast.error("Failed to delete videos")
    }
  }

  const toggleVideoSelection = (id: string) => {
    setSelectedVideos((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    if (selectedVideos.length === filteredVideos.length) {
      setSelectedVideos([])
    } else {
      setSelectedVideos(filteredVideos.map((video) => video._id))
    }
  }

  const hasActiveFilters = () => {
    return filters.search || filters.priceRange.min !== null || filters.priceRange.max !== null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="flex items-center gap-3 text-lg font-medium">
            <RefreshCw className="h-6 w-6 animate-spin text-red-500" />
            Loading Videos...
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
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 dark:from-red-400 dark:via-orange-400 dark:to-yellow-400 bg-clip-text text-transparent flex items-center gap-2">
              <Video className="h-8 w-8 text-red-500" />
              Video Management
            </h1>
            <p className="text-muted-foreground mt-1">Manage product demonstration videos</p>
          </div>
          <div className="flex gap-2">
            {selectedVideos.length > 0 && (
              <Button onClick={handleBulkDelete} variant="destructive" size="sm" className="rounded-xl">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected ({selectedVideos.length})
              </Button>
            )}
            <Button
              onClick={() => {
                resetForm()
                setIsDialogOpen(true)
              }}
              className="rounded-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Video
            </Button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search videos by name, product code, or description..."
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>

            {/* Filters and Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-wrap gap-4">
                {/* Price Range */}
                <div className="flex gap-2 items-center">
                  <Label className="text-sm font-medium whitespace-nowrap">Price Range (₹):</Label>
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
                    className="w-20 text-sm"
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
                    className="w-20 text-sm"
                  />
                </div>

                {/* Sort By */}
                <div className="flex gap-2 items-center">
                  <Label className="text-sm font-medium whitespace-nowrap">Sort By:</Label>
                  <Select value={filters.sortBy} onValueChange={(value) => updateFilter("sortBy", value)}>
                    <SelectTrigger className="w-32 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="productCode">Code</SelectItem>
                      <SelectItem value="created">Created Date</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateFilter("sortOrder", filters.sortOrder === "asc" ? "desc" : "asc")}
                    className="px-3"
                  >
                    {filters.sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                  </Button>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  disabled={!hasActiveFilters()}
                  className="bg-transparent"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>Total: {videos.length}</span>
                <span>Filtered: {filteredVideos.length}</span>
                {selectedVideos.length > 0 && <span>Selected: {selectedVideos.length}</span>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Videos Grid */}
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Product Videos ({filteredVideos.length} items)
              </div>
              {filteredVideos.length > 0 && (
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedVideos.length === filteredVideos.length}
                    onCheckedChange={toggleSelectAll}
                  />
                  <Label className="text-sm">Select All</Label>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Grid View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((item) => (
                <Card key={item._id} className="overflow-hidden">
                  <div className="relative">
                    <div className="absolute top-2 left-2 z-10">
                      <Checkbox
                        checked={selectedVideos.includes(item._id)}
                        onCheckedChange={() => toggleVideoSelection(item._id)}
                        className="bg-white/80 border-white"
                      />
                    </div>
                    <div className="absolute top-2 right-2 z-10 flex gap-1">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => openEditDialog(item)}
                        className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item._id)}
                        className="h-8 w-8 p-0 bg-red-500/80 hover:bg-red-500"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="aspect-video relative bg-gray-100">
                      {item.videoUrl ? (
                        <video
                          src={item.videoUrl}
                          className="w-full h-full object-cover"
                          controls={false}
                          muted
                          preload="metadata"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Video className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Play className="h-12 w-12 text-white/80" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                        <div className="flex items-center gap-1 text-green-600">
                          <DollarSign className="h-3 w-3" />
                          <span className="text-sm font-medium">₹{item.sellingPrice}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground font-mono">{item.productCode}</p>
                      {item.actualPrice && item.actualPrice > item.sellingPrice && (
                        <p className="text-xs text-muted-foreground line-through">₹{item.actualPrice}</p>
                      )}
                      {item.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Created: {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredVideos.length === 0 && (
              <div className="text-center py-12">
                <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No videos found</p>
                <p className="text-sm text-gray-400">
                  {hasActiveFilters() ? "Try adjusting your filters" : "Add your first video to get started"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Video" : "Add New Video"}</DialogTitle>
              <DialogDescription>
                {isEditing ? "Update the video details" : "Fill in the details to add a new video"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Video Name *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Enter video name"
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
                    placeholder="e.g., video_toy_demo_1.1"
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

              <div className="space-y-2">
                <Label>Product Video *</Label>
                <ImageGallery
                  images={watchedVideoUrl ? [watchedVideoUrl] : []}
                  onImagesChange={(images) => setValue("videoUrl", images[0] || "")}
                  maxImages={1}
                  acceptVideo={true}
                />
                {errors.videoUrl && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.videoUrl.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Label htmlFor="actualPrice">Actual Price (₹)</Label>
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Enter video description"
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

              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      {isEditing ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>{isEditing ? "Update" : "Create"} Video</>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Help Dialog */}
        <HelpDialog schemaInfo={videoSchemaInfo} />
      </div>
    </div>
  )
}
