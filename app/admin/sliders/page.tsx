// "use client"

// import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
// import { Checkbox } from "@/components/ui/checkbox"
// import {
//   Plus,
//   Edit,
//   Trash2,
//   Search,
//   RefreshCw,
//   Images,
//   AlertCircle,
//   Filter,
//   ChevronDown,
//   ChevronUp,
//   SortAsc,
//   SortDesc,
//   X,
// } from "lucide-react"
// import { AnimatedBackground } from "@/components/animated-background"
// import { toast } from "react-hot-toast"
// import Image from "next/image"
// import { sliderSchema, sliderSchemaInfo, type SliderFormData } from "@/lib/validations/slider-schema"
// import { ImageGallery } from "@/components/admin/image-gallery"
// import { HelpDialog } from "@/components/admin/help-dialog"

// interface SliderItem {
//   _id: string
//   imageUrl: string
//   groupName: string
//   order?: number
//   caption?: string
//   altText?: string
//   createdAt: string
//   updatedAt: string
// }

// interface FilterState {
//   search: string
//   groupName: string[]
//   sortBy: "groupName" | "order" | "created"
//   sortOrder: "asc" | "desc"
// }

// const groupOptions = ["toys", "clothes", "bath", "newborn", "home", "featured", "sale"]

// export default function SliderManagement() {
//   const [sliders, setSliders] = useState<SliderItem[]>([])
//   const [filteredSliders, setFilteredSliders] = useState<SliderItem[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [isEditing, setIsEditing] = useState(false)
//   const [selectedItem, setSelectedItem] = useState<SliderItem | null>(null)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [isFilterOpen, setIsFilterOpen] = useState(false)
//   const [selectedSliders, setSelectedSliders] = useState<string[]>([])
//   const [filters, setFilters] = useState<FilterState>({
//     search: "",
//     groupName: [],
//     sortBy: "created",
//     sortOrder: "desc",
//   })

//   const form = useForm<SliderFormData>({
//     resolver: zodResolver(sliderSchema),
//     defaultValues: {
//       imageUrl: "",
//       groupName: "",
//       order: 0,
//       caption: "",
//       altText: "",
//     },
//     mode: "onChange",
//   })

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue,
//     watch,
//   } = form

//   const watchedImageUrl = watch("imageUrl")

//   useEffect(() => {
//     fetchSliders()
//   }, [])

//   useEffect(() => {
//     applyFilters()
//   }, [sliders, filters])

//   const fetchSliders = async () => {
//     try {
//       setIsLoading(true)
//       const response = await fetch("/api/admin/sliders")
//       if (!response.ok) throw new Error("Failed to fetch")
//       const data = await response.json()
//       setSliders(data.data || [])
//     } catch (error) {
//       console.error("Error fetching sliders:", error)
//       toast.error("Failed to fetch sliders")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const applyFilters = () => {
//     let filtered = [...sliders]

//     // Search filter
//     if (filters.search) {
//       const searchLower = filters.search.toLowerCase()
//       filtered = filtered.filter(
//         (item) =>
//           item.groupName.toLowerCase().includes(searchLower) ||
//           item.caption?.toLowerCase().includes(searchLower) ||
//           item.altText?.toLowerCase().includes(searchLower),
//       )
//     }

//     // Group name filter
//     if (filters.groupName.length > 0) {
//       filtered = filtered.filter((item) => filters.groupName.includes(item.groupName))
//     }

//     // Sorting
//     filtered.sort((a, b) => {
//       let aValue: any, bValue: any
//       switch (filters.sortBy) {
//         case "groupName":
//           aValue = a.groupName.toLowerCase()
//           bValue = b.groupName.toLowerCase()
//           break
//         case "order":
//           aValue = a.order || 0
//           bValue = b.order || 0
//           break
//         case "created":
//           aValue = new Date(a.createdAt).getTime()
//           bValue = new Date(b.createdAt).getTime()
//           break
//         default:
//           return 0
//       }

//       if (aValue < bValue) return filters.sortOrder === "asc" ? -1 : 1
//       if (aValue > bValue) return filters.sortOrder === "asc" ? 1 : -1
//       return 0
//     })

//     setFilteredSliders(filtered)
//   }

//   const updateFilter = (key: keyof FilterState, value: any) => {
//     setFilters((prev) => ({ ...prev, [key]: value }))
//   }

//   const clearFilters = () => {
//     setFilters({
//       search: "",
//       groupName: [],
//       sortBy: "created",
//       sortOrder: "desc",
//     })
//   }

//   const resetForm = () => {
//     reset()
//     setSelectedItem(null)
//     setIsEditing(false)
//   }

//   const openEditDialog = (item: SliderItem) => {
//     setSelectedItem(item)
//     reset({
//       imageUrl: item.imageUrl,
//       groupName: item.groupName,
//       order: item.order || 0,
//       caption: item.caption || "",
//       altText: item.altText || "",
//     })
//     setIsEditing(true)
//     setIsDialogOpen(true)
//   }

//   const onSubmit = async (data: SliderFormData) => {
//     setIsSubmitting(true)
//     try {
//       const url = isEditing ? `/api/admin/sliders/${selectedItem?._id}` : "/api/admin/sliders"
//       const method = isEditing ? "PUT" : "POST"

//       const response = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || "Failed to save")
//       }

//       toast.success(isEditing ? "Slider updated successfully" : "Slider created successfully")
//       fetchSliders()
//       setIsDialogOpen(false)
//       resetForm()
//     } catch (error: any) {
//       console.error("Error saving slider:", error)
//       toast.error(error.message || "Failed to save slider")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this slider? This will also remove the image from Cloudinary."))
//       return

//     try {
//       const response = await fetch(`/api/admin/sliders/${id}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) throw new Error("Failed to delete")

//       toast.success("Slider deleted successfully")
//       fetchSliders()
//     } catch (error) {
//       console.error("Error deleting slider:", error)
//       toast.error("Failed to delete slider")
//     }
//   }

//   const handleBulkDelete = async () => {
//     if (selectedSliders.length === 0) {
//       toast.error("Please select sliders to delete")
//       return
//     }

//     if (!confirm(`Are you sure you want to delete ${selectedSliders.length} selected sliders?`)) return

//     try {
//       const response = await fetch("/api/admin/sliders/bulk-delete", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ sliderIds: selectedSliders }),
//       })

//       if (!response.ok) throw new Error("Failed to delete")

//       toast.success(`${selectedSliders.length} sliders deleted successfully`)
//       setSelectedSliders([])
//       fetchSliders()
//     } catch (error) {
//       console.error("Error bulk deleting sliders:", error)
//       toast.error("Failed to delete sliders")
//     }
//   }

//   const toggleSliderSelection = (id: string) => {
//     setSelectedSliders((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
//   }

//   const toggleSelectAll = () => {
//     if (selectedSliders.length === filteredSliders.length) {
//       setSelectedSliders([])
//     } else {
//       setSelectedSliders(filteredSliders.map((slider) => slider._id))
//     }
//   }

//   const hasActiveFilters = () => {
//     return filters.search || filters.groupName.length > 0
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen relative">
//         <AnimatedBackground />
//         <div className="relative z-10 flex items-center justify-center min-h-screen">
//           <div className="flex items-center gap-3 text-lg font-medium">
//             <RefreshCw className="h-6 w-6 animate-spin text-purple-500" />
//             Loading Sliders...
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen relative">
//       <AnimatedBackground />
//       <div className="relative z-10 container mx-auto px-4 py-6 md:py-8 space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 dark:from-purple-400 dark:via-indigo-400 dark:to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
//               <Images className="h-8 w-8 text-purple-500" />
//               Slider Management
//             </h1>
//             <p className="text-muted-foreground mt-1">Manage website slider images and banners</p>
//           </div>
//           <div className="flex gap-2">
//             {selectedSliders.length > 0 && (
//               <Button onClick={handleBulkDelete} variant="destructive" size="sm" className="rounded-xl">
//                 <Trash2 className="h-4 w-4 mr-2" />
//                 Delete Selected ({selectedSliders.length})
//               </Button>
//             )}
//             <Button
//               onClick={() => {
//                 resetForm()
//                 setIsDialogOpen(true)
//               }}
//               className="rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
//             >
//               <Plus className="h-4 w-4 mr-2" />
//               Add New Slider
//             </Button>
//           </div>
//         </div>

//         {/* Search and Filter Section */}
//         <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
//           <CardContent className="p-4 space-y-4">
//             {/* Search Bar */}
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search sliders by group name, caption, or alt text..."
//                 value={filters.search}
//                 onChange={(e) => updateFilter("search", e.target.value)}
//                 className="pl-10 rounded-xl"
//               />
//             </div>

//             {/* Filter Toggle */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div className="flex items-center gap-2">
//                 <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
//                   <CollapsibleTrigger asChild>
//                     <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
//                       <Filter className="h-4 w-4 mr-2" />
//                       Filters
//                       {hasActiveFilters() && (
//                         <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
//                           !
//                         </Badge>
//                       )}
//                       {isFilterOpen ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
//                     </Button>
//                   </CollapsibleTrigger>
//                   <CollapsibleContent className="mt-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/50">
//                       {/* Group Name Filter */}
//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium">Group Name</Label>
//                         <div className="space-y-2 max-h-32 overflow-y-auto">
//                           {groupOptions.map((group) => (
//                             <div key={group} className="flex items-center space-x-2">
//                               <Checkbox
//                                 id={`filter-group-${group}`}
//                                 checked={filters.groupName.includes(group)}
//                                 onCheckedChange={(checked) => {
//                                   if (checked) {
//                                     updateFilter("groupName", [...filters.groupName, group])
//                                   } else {
//                                     updateFilter(
//                                       "groupName",
//                                       filters.groupName.filter((g) => g !== group),
//                                     )
//                                   }
//                                 }}
//                               />
//                               <Label htmlFor={`filter-group-${group}`} className="text-sm capitalize">
//                                 {group}
//                               </Label>
//                             </div>
//                           ))}
//                         </div>
//                       </div>

//                       {/* Sort By */}
//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium">Sort By</Label>
//                         <div className="flex gap-2">
//                           <Select value={filters.sortBy} onValueChange={(value) => updateFilter("sortBy", value)}>
//                             <SelectTrigger className="text-sm">
//                               <SelectValue />
//                             </SelectTrigger>
//                             <SelectContent>
//                               <SelectItem value="groupName">Group Name</SelectItem>
//                               <SelectItem value="order">Display Order</SelectItem>
//                               <SelectItem value="created">Created Date</SelectItem>
//                             </SelectContent>
//                           </Select>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => updateFilter("sortOrder", filters.sortOrder === "asc" ? "desc" : "asc")}
//                             className="px-3"
//                           >
//                             {filters.sortOrder === "asc" ? (
//                               <SortAsc className="h-4 w-4" />
//                             ) : (
//                               <SortDesc className="h-4 w-4" />
//                             )}
//                           </Button>
//                         </div>
//                       </div>

//                       {/* Clear Filters */}
//                       <div className="flex items-end">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={clearFilters}
//                           disabled={!hasActiveFilters()}
//                           className="w-full bg-transparent"
//                         >
//                           <X className="h-4 w-4 mr-2" />
//                           Clear Filters
//                         </Button>
//                       </div>
//                     </div>
//                   </CollapsibleContent>
//                 </Collapsible>
//               </div>

//               {/* Stats */}
//               <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
//                 <span>Total: {sliders.length}</span>
//                 <span>Filtered: {filteredSliders.length}</span>
//                 {selectedSliders.length > 0 && <span>Selected: {selectedSliders.length}</span>}
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Sliders Grid */}
//         <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
//           <CardHeader>
//             <CardTitle className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Images className="h-5 w-5" />
//                 Slider Images ({filteredSliders.length} items)
//               </div>
//               {filteredSliders.length > 0 && (
//                 <div className="flex items-center gap-2">
//                   <Checkbox
//                     checked={selectedSliders.length === filteredSliders.length}
//                     onCheckedChange={toggleSelectAll}
//                   />
//                   <Label className="text-sm">Select All</Label>
//                 </div>
//               )}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {/* Grid View */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {filteredSliders.map((item) => (
//                 <Card key={item._id} className="overflow-hidden">
//                   <div className="relative">
//                     <div className="absolute top-2 left-2 z-10">
//                       <Checkbox
//                         checked={selectedSliders.includes(item._id)}
//                         onCheckedChange={() => toggleSliderSelection(item._id)}
//                         className="bg-white/80 border-white"
//                       />
//                     </div>
//                     <div className="absolute top-2 right-2 z-10 flex gap-1">
//                       <Button
//                         variant="secondary"
//                         size="sm"
//                         onClick={() => openEditDialog(item)}
//                         className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
//                       >
//                         <Edit className="h-3 w-3" />
//                       </Button>
//                       <Button
//                         variant="destructive"
//                         size="sm"
//                         onClick={() => handleDelete(item._id)}
//                         className="h-8 w-8 p-0 bg-red-500/80 hover:bg-red-500"
//                       >
//                         <Trash2 className="h-3 w-3" />
//                       </Button>
//                     </div>
//                     <div className="aspect-video relative">
//                       <Image
//                         src={item.imageUrl || "/placeholder.svg"}
//                         alt={item.altText || item.caption || "Slider image"}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>
//                   </div>
//                   <CardContent className="p-4">
//                     <div className="space-y-2">
//                       <div className="flex items-center justify-between">
//                         <Badge variant="outline" className="capitalize">
//                           {item.groupName}
//                         </Badge>
//                         {item.order !== undefined && (
//                           <Badge variant="secondary" className="text-xs">
//                             Order: {item.order}
//                           </Badge>
//                         )}
//                       </div>
//                       {item.caption && <p className="text-sm text-muted-foreground line-clamp-2">{item.caption}</p>}
//                       <p className="text-xs text-muted-foreground">
//                         Created: {new Date(item.createdAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>

//             {/* Empty State */}
//             {filteredSliders.length === 0 && (
//               <div className="text-center py-12">
//                 <Images className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-500 font-medium">No sliders found</p>
//                 <p className="text-sm text-gray-400">
//                   {hasActiveFilters() ? "Try adjusting your filters" : "Add your first slider to get started"}
//                 </p>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* Add/Edit Dialog */}
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//             <DialogHeader>
//               <DialogTitle>{isEditing ? "Edit Slider" : "Add New Slider"}</DialogTitle>
//               <DialogDescription>
//                 {isEditing ? "Update the slider details" : "Fill in the details to add a new slider"}
//               </DialogDescription>
//             </DialogHeader>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               <div className="space-y-2">
//                 <Label>Slider Image *</Label>
//                 <ImageGallery
//                   images={
//                     watch("imageUrl")
//                       ? Array.isArray(watch("imageUrl"))
//                         ? watch("imageUrl")
//                         : [watch("imageUrl")]
//                       : []
//                   }
//                   onImagesChange={(images) => setValue("imageUrl", images.length > 0 ? images[0] : "")}
//                   maxImages={10}
//                   acceptVideo={false}
//                 />
//                 {errors.imageUrl && (
//                   <p className="text-sm text-red-500 flex items-center gap-1">
//                     <AlertCircle className="h-3 w-3" />
//                     {errors.imageUrl.message}
//                   </p>
//                 )}
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="groupName">Group Name *</Label>
//                   <Select onValueChange={(value) => setValue("groupName", value)} defaultValue={watch("groupName")}>
//                     <SelectTrigger className={errors.groupName ? "border-red-500" : ""}>
//                       <SelectValue placeholder="Select group" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {groupOptions.map((group) => (
//                         <SelectItem key={group} value={group} className="capitalize">
//                           {group}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   {errors.groupName && (
//                     <p className="text-sm text-red-500 flex items-center gap-1">
//                       <AlertCircle className="h-3 w-3" />
//                       {errors.groupName.message}
//                     </p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="order">Display Order</Label>
//                   <Input
//                     id="order"
//                     type="number"
//                     {...register("order", { valueAsNumber: true })}
//                     placeholder="0"
//                     className={errors.order ? "border-red-500" : ""}
//                   />
//                   {errors.order && (
//                     <p className="text-sm text-red-500 flex items-center gap-1">
//                       <AlertCircle className="h-3 w-3" />
//                       {errors.order.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="caption">Caption</Label>
//                 <Textarea
//                   id="caption"
//                   {...register("caption")}
//                   placeholder="Enter caption for overlay text"
//                   rows={3}
//                   className={errors.caption ? "border-red-500" : ""}
//                 />
//                 {errors.caption && (
//                   <p className="text-sm text-red-500 flex items-center gap-1">
//                     <AlertCircle className="h-3 w-3" />
//                     {errors.caption.message}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="altText">Alt Text</Label>
//                 <Input
//                   id="altText"
//                   {...register("altText")}
//                   placeholder="Enter alt text for accessibility"
//                   className={errors.altText ? "border-red-500" : ""}
//                 />
//                 {errors.altText && (
//                   <p className="text-sm text-red-500 flex items-center gap-1">
//                     <AlertCircle className="h-3 w-3" />
//                     {errors.altText.message}
//                   </p>
//                 )}
//               </div>

//               <div className="flex flex-col sm:flex-row justify-end gap-2">
//                 <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
//                       {isEditing ? "Updating..." : "Creating..."}
//                     </>
//                   ) : (
//                     <>{isEditing ? "Update" : "Create"} Slider</>
//                   )}
//                 </Button>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>

//         {/* Help Dialog */}
//         <HelpDialog schemaInfo={sliderSchemaInfo} />
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Plus,
  Edit,
  Trash2,
  Search,
  RefreshCw,
  Images,
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
import { sliderSchema, sliderSchemaInfo, type SliderFormData } from "@/lib/validations/slider-schema"
import { ImageGallery } from "@/components/admin/image-gallery"
import { HelpDialog } from "@/components/admin/help-dialog"

interface SliderItem {
  _id: string
  images: string[]
  groupName: string
  order?: number
  caption?: string
  altText?: string
  createdAt: string
  updatedAt: string
}

interface FilterState {
  search: string
  groupName: string[]
  sortBy: "groupName" | "order" | "created"
  sortOrder: "asc" | "desc"
}

const groupOptions = ["toys", "clothes", "bath", "newborn", "home", "featured", "sale"]

export default function SliderManagement() {
  const [sliders, setSliders] = useState<SliderItem[]>([])
  const [filteredSliders, setFilteredSliders] = useState<SliderItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedItem, setSelectedItem] = useState<SliderItem | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedSliders, setSelectedSliders] = useState<string[]>([])
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    groupName: [],
    sortBy: "created",
    sortOrder: "desc",
  })

  const form = useForm<SliderFormData>({
    resolver: zodResolver(sliderSchema),
    defaultValues: {
      images: [],
      groupName: "",
      order: 0,
      caption: "",
      altText: "",
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
    fetchSliders()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [sliders, filters])

  const fetchSliders = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/sliders")
      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      setSliders(data.data || [])
    } catch (error) {
      console.error("Error fetching sliders:", error)
      toast.error("Failed to fetch sliders")
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...sliders]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.groupName.toLowerCase().includes(searchLower) ||
          item.caption?.toLowerCase().includes(searchLower) ||
          item.altText?.toLowerCase().includes(searchLower),
      )
    }

    // Group name filter
    if (filters.groupName.length > 0) {
      filtered = filtered.filter((item) => filters.groupName.includes(item.groupName))
    }

    // Sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any
      switch (filters.sortBy) {
        case "groupName":
          aValue = a.groupName.toLowerCase()
          bValue = b.groupName.toLowerCase()
          break
        case "order":
          aValue = a.order || 0
          bValue = b.order || 0
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

    setFilteredSliders(filtered)
  }

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      groupName: [],
      sortBy: "created",
      sortOrder: "desc",
    })
  }

  const resetForm = () => {
    reset()
    setSelectedItem(null)
    setIsEditing(false)
  }

  const openEditDialog = (item: SliderItem) => {
    setSelectedItem(item)
    reset({
      images: item.images || [],
      groupName: item.groupName,
      order: item.order || 0,
      caption: item.caption || "",
      altText: item.altText || "",
    })
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const onSubmit = async (data: SliderFormData) => {
    setIsSubmitting(true)
    try {
      const url = isEditing ? `/api/admin/sliders/${selectedItem?._id}` : "/api/admin/sliders"
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

      toast.success(isEditing ? "Slider updated successfully" : "Slider created successfully")
      fetchSliders()
      setIsDialogOpen(false)
      resetForm()
    } catch (error: any) {
      console.error("Error saving slider:", error)
      toast.error(error.message || "Failed to save slider")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slider? This will also remove all images from Cloudinary."))
      return

    try {
      const response = await fetch(`/api/admin/sliders/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast.success("Slider deleted successfully")
      fetchSliders()
    } catch (error) {
      console.error("Error deleting slider:", error)
      toast.error("Failed to delete slider")
    }
  }

  const handleBulkDelete = async () => {
    if (selectedSliders.length === 0) {
      toast.error("Please select sliders to delete")
      return
    }

    if (!confirm(`Are you sure you want to delete ${selectedSliders.length} selected sliders?`)) return

    try {
      const response = await fetch("/api/admin/sliders/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sliderIds: selectedSliders }),
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast.success(`${selectedSliders.length} sliders deleted successfully`)
      setSelectedSliders([])
      fetchSliders()
    } catch (error) {
      console.error("Error bulk deleting sliders:", error)
      toast.error("Failed to delete sliders")
    }
  }

  const toggleSliderSelection = (id: string) => {
    setSelectedSliders((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    if (selectedSliders.length === filteredSliders.length) {
      setSelectedSliders([])
    } else {
      setSelectedSliders(filteredSliders.map((slider) => slider._id))
    }
  }

  const hasActiveFilters = () => {
    return filters.search || filters.groupName.length > 0
  }

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="flex items-center gap-3 text-lg font-medium">
            <RefreshCw className="h-6 w-6 animate-spin text-purple-500" />
            Loading Sliders...
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
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 dark:from-purple-400 dark:via-indigo-400 dark:to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
              <Images className="h-8 w-8 text-purple-500" />
              Slider Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage website slider images and banners (up to 10 images per slider)
            </p>
          </div>
          <div className="flex gap-2">
            {selectedSliders.length > 0 && (
              <Button onClick={handleBulkDelete} variant="destructive" size="sm" className="rounded-xl">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected ({selectedSliders.length})
              </Button>
            )}
            <Button
              onClick={() => {
                resetForm()
                setIsDialogOpen(true)
              }}
              className="rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Slider
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
                placeholder="Search sliders by group name, caption, or alt text..."
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
                      {/* Group Name Filter */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Group Name</Label>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {groupOptions.map((group) => (
                            <div key={group} className="flex items-center space-x-2">
                              <Checkbox
                                id={`filter-group-${group}`}
                                checked={filters.groupName.includes(group)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    updateFilter("groupName", [...filters.groupName, group])
                                  } else {
                                    updateFilter(
                                      "groupName",
                                      filters.groupName.filter((g) => g !== group),
                                    )
                                  }
                                }}
                              />
                              <Label htmlFor={`filter-group-${group}`} className="text-sm capitalize">
                                {group}
                              </Label>
                            </div>
                          ))}
                        </div>
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
                              <SelectItem value="groupName">Group Name</SelectItem>
                              <SelectItem value="order">Display Order</SelectItem>
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
                <span>Total: {sliders.length}</span>
                <span>Filtered: {filteredSliders.length}</span>
                {selectedSliders.length > 0 && <span>Selected: {selectedSliders.length}</span>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sliders Grid */}
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Images className="h-5 w-5" />
                Slider Collections ({filteredSliders.length} items)
              </div>
              {filteredSliders.length > 0 && (
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedSliders.length === filteredSliders.length}
                    onCheckedChange={toggleSelectAll}
                  />
                  <Label className="text-sm">Select All</Label>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Grid View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSliders.map((item) => (
                <Card key={item._id} className="overflow-hidden">
                  <div className="relative">
                    <div className="absolute top-2 left-2 z-10">
                      <Checkbox
                        checked={selectedSliders.includes(item._id)}
                        onCheckedChange={() => toggleSliderSelection(item._id)}
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
                    <div className="aspect-video relative">
                      <Image
                        src={item.images[0] || "/placeholder.svg"}
                        alt={item.altText || item.caption || "Slider image"}
                        fill
                        className="object-cover"
                      />
                      {/* Image Count Badge */}
                      {item.images.length > 1 && (
                        <div className="absolute bottom-2 left-2">
                          <Badge variant="secondary" className="text-xs bg-black/60 text-white">
                            +{item.images.length - 1} more
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="capitalize">
                          {item.groupName}
                        </Badge>
                        {item.order !== undefined && (
                          <Badge variant="secondary" className="text-xs">
                            Order: {item.order}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {item.images.length} image{item.images.length !== 1 ? "s" : ""}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {item.caption && <p className="text-sm text-muted-foreground line-clamp-2">{item.caption}</p>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredSliders.length === 0 && (
              <div className="text-center py-12">
                <Images className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No sliders found</p>
                <p className="text-sm text-gray-400">
                  {hasActiveFilters() ? "Try adjusting your filters" : "Add your first slider to get started"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Slider Collection" : "Add New Slider Collection"}</DialogTitle>
              <DialogDescription>
                {isEditing
                  ? "Update the slider details and images"
                  : "Create a new slider collection with up to 10 images"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label>Slider Images * (Max 10 images)</Label>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="groupName">Group Name *</Label>
                  <Select onValueChange={(value) => setValue("groupName", value)} defaultValue={watch("groupName")}>
                    <SelectTrigger className={errors.groupName ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select group" />
                    </SelectTrigger>
                    <SelectContent>
                      {groupOptions.map((group) => (
                        <SelectItem key={group} value={group} className="capitalize">
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.groupName && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.groupName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    {...register("order", { valueAsNumber: true })}
                    placeholder="0"
                    className={errors.order ? "border-red-500" : ""}
                  />
                  {errors.order && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.order.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="caption">Caption</Label>
                <Textarea
                  id="caption"
                  {...register("caption")}
                  placeholder="Enter caption for overlay text"
                  rows={3}
                  className={errors.caption ? "border-red-500" : ""}
                />
                {errors.caption && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.caption.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="altText">Alt Text</Label>
                <Input
                  id="altText"
                  {...register("altText")}
                  placeholder="Enter alt text for accessibility"
                  className={errors.altText ? "border-red-500" : ""}
                />
                {errors.altText && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.altText.message}
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
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      {isEditing ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>{isEditing ? "Update" : "Create"} Slider Collection</>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Help Dialog */}
        <HelpDialog schemaInfo={sliderSchemaInfo} />
      </div>
    </div>
  )
}
