// // "use client"

// // import type React from "react"

// // import { useState, useEffect, useCallback } from "react"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Textarea } from "@/components/ui/textarea"
// // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// // import { Badge } from "@/components/ui/badge"
// // import { Checkbox } from "@/components/ui/checkbox"
// // import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// // import { Plus, Edit, Trash2, Upload, X, Search, RefreshCw, Shirt } from "lucide-react"
// // import { AnimatedBackground } from "@/components/animated-background"
// // import { toast } from "react-hot-toast"
// // import Image from "next/image"
// // import { clothesSchema, type ClothesFormData } from "@/lib/validations/product-schemas"
// // import { FormField } from "@/components/admin/form-field"
// // import { useProductValidation } from "@/hooks/use-product-validation"
// // import { z } from "zod"

// // interface ClothesItem {
// //   _id: string
// //   name: string
// //   category: ("boy" | "girl")[]
// //   ageGroup: ("0-1" | "1-2" | "2-3" | "3-4" | "4-5" | "0-5")[]
// //   sellingPrice: number
// //   actualPrice?: number
// //   size: string
// //   inStock: number
// //   weightInGrams: number
// //   color?: string
// //   images: string[]
// //   productCode: string
// //   description?: string
// //   createdAt: string
// //   updatedAt: string
// // }

// // export default function ClothesManagement() {
// //   const { checkProductCodeUnique, clearValidationCache } = useProductValidation()
// //   const [formErrors, setFormErrors] = useState<Record<string, string>>({})
// //   const [isFormValid, setIsFormValid] = useState(false)

// //   const [clothes, setClothes] = useState<ClothesItem[]>([])
// //   const [filteredClothes, setFilteredClothes] = useState<ClothesItem[]>([])
// //   const [isLoading, setIsLoading] = useState(true)
// //   const [isDialogOpen, setIsDialogOpen] = useState(false)
// //   const [isEditing, setIsEditing] = useState(false)
// //   const [searchTerm, setSearchTerm] = useState("")
// //   const [selectedItem, setSelectedItem] = useState<ClothesItem | null>(null)
// //   const [isUploading, setIsUploading] = useState(false)

// //   const [formData, setFormData] = useState<ClothesFormData>({
// //     name: "",
// //     category: [],
// //     ageGroup: [],
// //     sellingPrice: 0,
// //     actualPrice: 0,
// //     size: "",
// //     inStock: 0,
// //     weightInGrams: 0,
// //     color: "",
// //     images: [],
// //     productCode: "",
// //     description: "",
// //   })

// //   const validateForm = useCallback(() => {
// //     try {
// //       clothesSchema.parse(formData)
// //       const hasErrors = Object.keys(formErrors).length > 0
// //       setIsFormValid(!hasErrors)
// //     } catch (error) {
// //       if (error instanceof z.ZodError) {
// //         const errors: Record<string, string> = {}
// //         error.errors.forEach((err) => {
// //           if (err.path.length > 0) {
// //             errors[err.path[0].toString()] = err.message
// //           }
// //         })
// //         setFormErrors(errors)
// //         setIsFormValid(false)
// //       }
// //     }
// //   }, [formData, formErrors])

// //   useEffect(() => {
// //     validateForm()
// //   }, [validateForm])

// //   const handleFieldValidation = useCallback((fieldName: string, isValid: boolean, error?: string) => {
// //     setFormErrors((prev) => {
// //       const newErrors = { ...prev }
// //       if (isValid) {
// //         delete newErrors[fieldName]
// //       } else if (error) {
// //         newErrors[fieldName] = error
// //       }
// //       return newErrors
// //     })
// //   }, [])

// //   useEffect(() => {
// //     fetchClothes()
// //   }, [])

// //   useEffect(() => {
// //     filterClothes()
// //   }, [clothes, searchTerm])

// //   const fetchClothes = async () => {
// //     try {
// //       setIsLoading(true)
// //       const response = await fetch("/api/admin/products/clothes")
// //       const data = await response.json()
// //       setClothes(data)
// //     } catch (error) {
// //       console.error("Error fetching clothes:", error)
// //       toast.error("Failed to fetch clothes")
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const filterClothes = () => {
// //     if (!searchTerm) {
// //       setFilteredClothes(clothes)
// //       return
// //     }

// //     const filtered = clothes.filter(
// //       (item) =>
// //         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         item.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         item.category.some((cat) => cat.toLowerCase().includes(searchTerm.toLowerCase())),
// //     )
// //     setFilteredClothes(filtered)
// //   }

// //   const uploadToCloudinary = async (file: File): Promise<string> => {
// //     const formData = new FormData()
// //     formData.append("file", file)
// //     formData.append("upload_preset", "mahadev_baby_shop")

// //     const response = await fetch(
// //       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
// //       {
// //         method: "POST",
// //         body: formData,
// //       },
// //     )

// //     const data = await response.json()
// //     return data.secure_url
// //   }

// //   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const files = Array.from(e.target.files || [])
// //     if (files.length === 0) return

// //     setIsUploading(true)
// //     try {
// //       const uploadPromises = files.map(uploadToCloudinary)
// //       const imageUrls = await Promise.all(uploadPromises)

// //       setFormData((prev) => ({
// //         ...prev,
// //         images: [...prev.images, ...imageUrls],
// //       }))
// //       toast.success("Images uploaded successfully")
// //     } catch (error) {
// //       console.error("Error uploading images:", error)
// //       toast.error("Failed to upload images")
// //     } finally {
// //       setIsUploading(false)
// //     }
// //   }

// //   const removeImage = (index: number) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       images: prev.images.filter((_, i) => i !== index),
// //     }))
// //   }

// //   const handleCategoryChange = (category: "boy" | "girl", checked: boolean) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       category: checked ? [...prev.category, category] : prev.category.filter((c) => c !== category),
// //     }))
// //   }

// //   const handleAgeGroupChange = (ageGroup: "0-1" | "1-2" | "2-3" | "3-4" | "4-5" | "0-5", checked: boolean) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       ageGroup: checked ? [...prev.ageGroup, ageGroup] : prev.ageGroup.filter((a) => a !== ageGroup),
// //     }))
// //   }

// //   const resetForm = () => {
// //     setFormData({
// //       name: "",
// //       category: [],
// //       ageGroup: [],
// //       sellingPrice: 0,
// //       actualPrice: 0,
// //       size: "",
// //       inStock: 0,
// //       weightInGrams: 0,
// //       color: "",
// //       images: [],
// //       productCode: "",
// //       description: "",
// //     })
// //     setSelectedItem(null)
// //     setIsEditing(false)
// //   }

// //   const openEditDialog = (item: ClothesItem) => {
// //     setSelectedItem(item)
// //     setFormData({
// //       name: item.name,
// //       category: item.category,
// //       ageGroup: item.ageGroup,
// //       sellingPrice: item.sellingPrice,
// //       actualPrice: item.actualPrice || 0,
// //       size: item.size,
// //       inStock: item.inStock,
// //       weightInGrams: item.weightInGrams,
// //       color: item.color || "",
// //       images: item.images,
// //       productCode: item.productCode,
// //       description: item.description || "",
// //     })
// //     setIsEditing(true)
// //     setIsDialogOpen(true)
// //   }

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()

// //     try {
// //       // Validate with Zod schema
// //       clothesSchema.parse(formData)

// //       if (!isFormValid) {
// //         toast.error("Please fix all validation errors before submitting")
// //         return
// //       }

// //       const url = isEditing ? `/api/admin/products/clothes/${selectedItem?._id}` : "/api/admin/products/clothes"
// //       const method = isEditing ? "PUT" : "POST"

// //       const response = await fetch(url, {
// //         method,
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(formData),
// //       })

// //       if (response.ok) {
// //         toast.success(isEditing ? "Clothes item updated successfully" : "Clothes item created successfully")
// //         fetchClothes()
// //         setIsDialogOpen(false)
// //         resetForm()
// //         clearValidationCache()
// //       } else {
// //         const errorData = await response.json()
// //         toast.error(errorData.error || "Failed to save clothes item")
// //       }
// //     } catch (error) {
// //       if (error instanceof z.ZodError) {
// //         const firstError = error.errors[0]
// //         toast.error(firstError.message)
// //       } else {
// //         console.error("Error saving clothes item:", error)
// //         toast.error("Failed to save clothes item")
// //       }
// //     }
// //   }

// //   const handleDelete = async (id: string) => {
// //     if (!confirm("Are you sure you want to delete this item?")) return

// //     try {
// //       const response = await fetch(`/api/admin/products/clothes/${id}`, {
// //         method: "DELETE",
// //       })

// //       if (response.ok) {
// //         toast.success("Clothes item deleted successfully")
// //         fetchClothes()
// //       } else {
// //         toast.error("Failed to delete clothes item")
// //       }
// //     } catch (error) {
// //       console.error("Error deleting clothes item:", error)
// //       toast.error("Failed to delete clothes item")
// //     }
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen relative">
// //         <AnimatedBackground />
// //         <div className="relative z-10 flex items-center justify-center min-h-screen">
// //           <div className="flex items-center gap-3 text-lg font-medium">
// //             <RefreshCw className="h-6 w-6 animate-spin text-pink-500" />
// //             Loading Clothes...
// //           </div>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="min-h-screen relative">
// //       <AnimatedBackground />

// //       <div className="relative z-10 container mx-auto px-4 py-6 md:py-8 space-y-6">
// //         {/* Header */}
// //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// //           <div>
// //             <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
// //               <Shirt className="h-8 w-8 text-blue-500" />
// //               Clothes Management
// //             </h1>
// //             <p className="text-muted-foreground mt-1">Manage baby clothes inventory</p>
// //           </div>
// //           <Button
// //             onClick={() => {
// //               resetForm()
// //               setIsDialogOpen(true)
// //             }}
// //             className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
// //           >
// //             <Plus className="h-4 w-4 mr-2" />
// //             Add New Clothes
// //           </Button>
// //         </div>

// //         {/* Search and Stats */}
// //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
// //           <Card className="lg:col-span-3 border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
// //             <CardContent className="p-4">
// //               <div className="relative">
// //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
// //                 <Input
// //                   placeholder="Search clothes by name, code, or category..."
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                   className="pl-10 rounded-xl"
// //                 />
// //               </div>
// //             </CardContent>
// //           </Card>

// //           <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
// //             <CardContent className="p-4">
// //               <div className="text-center">
// //                 <p className="text-2xl font-bold text-blue-600">{clothes.length}</p>
// //                 <p className="text-sm text-muted-foreground">Total Items</p>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         {/* Clothes Table */}
// //         <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
// //           <CardHeader>
// //             <CardTitle className="flex items-center gap-2">
// //               <Shirt className="h-5 w-5" />
// //               Clothes Inventory ({filteredClothes.length} items)
// //             </CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="overflow-x-auto">
// //               <Table>
// //                 <TableHeader>
// //                   <TableRow>
// //                     <TableHead>Image</TableHead>
// //                     <TableHead>Product Code</TableHead>
// //                     <TableHead>Name</TableHead>
// //                     <TableHead>Category</TableHead>
// //                     <TableHead>Age Group</TableHead>
// //                     <TableHead>Size</TableHead>
// //                     <TableHead>Price</TableHead>
// //                     <TableHead>Stock</TableHead>
// //                     <TableHead>Actions</TableHead>
// //                   </TableRow>
// //                 </TableHeader>
// //                 <TableBody>
// //                   {filteredClothes.map((item) => (
// //                     <TableRow key={item._id}>
// //                       <TableCell>
// //                         {item.images.length > 0 ? (
// //                           <Image
// //                             src={item.images[0] || "/placeholder.svg"}
// //                             alt={item.name}
// //                             width={50}
// //                             height={50}
// //                             className="rounded-lg object-cover"
// //                           />
// //                         ) : (
// //                           <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
// //                             <Shirt className="h-6 w-6 text-gray-400" />
// //                           </div>
// //                         )}
// //                       </TableCell>
// //                       <TableCell className="font-medium">{item.productCode}</TableCell>
// //                       <TableCell>{item.name}</TableCell>
// //                       <TableCell>
// //                         <div className="flex gap-1">
// //                           {item.category.map((cat) => (
// //                             <Badge key={cat} variant="outline" className="text-xs">
// //                               {cat}
// //                             </Badge>
// //                           ))}
// //                         </div>
// //                       </TableCell>
// //                       <TableCell>
// //                         <div className="flex flex-wrap gap-1">
// //                           {item.ageGroup.map((age) => (
// //                             <Badge key={age} variant="secondary" className="text-xs">
// //                               {age}
// //                             </Badge>
// //                           ))}
// //                         </div>
// //                       </TableCell>
// //                       <TableCell>{item.size}</TableCell>
// //                       <TableCell>
// //                         <div>
// //                           <p className="font-medium">₹{item.sellingPrice}</p>
// //                           {item.actualPrice && item.actualPrice > item.sellingPrice && (
// //                             <p className="text-xs text-muted-foreground line-through">₹{item.actualPrice}</p>
// //                           )}
// //                         </div>
// //                       </TableCell>
// //                       <TableCell>
// //                         <Badge variant={item.inStock > 5 ? "default" : item.inStock > 0 ? "secondary" : "destructive"}>
// //                           {item.inStock}
// //                         </Badge>
// //                       </TableCell>
// //                       <TableCell>
// //                         <div className="flex gap-2">
// //                           <Button variant="outline" size="sm" onClick={() => openEditDialog(item)}>
// //                             <Edit className="h-4 w-4" />
// //                           </Button>
// //                           <Button variant="outline" size="sm" onClick={() => handleDelete(item._id)}>
// //                             <Trash2 className="h-4 w-4" />
// //                           </Button>
// //                         </div>
// //                       </TableCell>
// //                     </TableRow>
// //                   ))}
// //                 </TableBody>
// //               </Table>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* Add/Edit Dialog */}
// //         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
// //           <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
// //             <DialogHeader>
// //               <DialogTitle>{isEditing ? "Edit Clothes Item" : "Add New Clothes Item"}</DialogTitle>
// //               <DialogDescription>
// //                 {isEditing ? "Update the clothes item details" : "Fill in the details to add a new clothes item"}
// //               </DialogDescription>
// //             </DialogHeader>

// //             <form onSubmit={handleSubmit} className="space-y-6">
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <FormField
// //                   label="Product Name"
// //                   name="name"
// //                   value={formData.name}
// //                   onChange={(value) => setFormData((prev) => ({ ...prev, name: value as string }))}
// //                   onValidation={(isValid, error) => handleFieldValidation("name", isValid, error)}
// //                   placeholder="Enter product name"
// //                   required
// //                   validation={(value) => {
// //                     if (!value || (value as string).length < 1) {
// //                       return { isValid: false, error: "Product name is required" }
// //                     }
// //                     if ((value as string).length > 100) {
// //                       return { isValid: false, error: "Product name must be less than 100 characters" }
// //                     }
// //                     return { isValid: true }
// //                   }}
// //                 />

// //                 <FormField
// //                   label="Product Code"
// //                   name="productCode"
// //                   value={formData.productCode}
// //                   onChange={(value) => setFormData((prev) => ({ ...prev, productCode: value as string }))}
// //                   onValidation={(isValid, error) => handleFieldValidation("productCode", isValid, error)}
// //                   placeholder="Enter unique product code"
// //                   required
// //                   validation={(value) => {
// //                     if (!value || (value as string).length < 1) {
// //                       return { isValid: false, error: "Product code is required" }
// //                     }
// //                     if ((value as string).length > 20) {
// //                       return { isValid: false, error: "Product code must be less than 20 characters" }
// //                     }
// //                     return { isValid: true }
// //                   }}
// //                   checkUnique={(value) => checkProductCodeUnique(value, "clothes", selectedItem?._id)}
// //                 />
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div>
// //                   <Label>Category *</Label>
// //                   <div className="flex gap-4 mt-2">
// //                     <div className="flex items-center space-x-2">
// //                       <Checkbox
// //                         id="boy"
// //                         checked={formData.category.includes("boy")}
// //                         onCheckedChange={(checked) => handleCategoryChange("boy", checked as boolean)}
// //                       />
// //                       <Label htmlFor="boy">Boy</Label>
// //                     </div>
// //                     <div className="flex items-center space-x-2">
// //                       <Checkbox
// //                         id="girl"
// //                         checked={formData.category.includes("girl")}
// //                         onCheckedChange={(checked) => handleCategoryChange("girl", checked as boolean)}
// //                       />
// //                       <Label htmlFor="girl">Girl</Label>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <Label htmlFor="size">Size *</Label>
// //                   <Input
// //                     id="size"
// //                     value={formData.size}
// //                     onChange={(e) => setFormData((prev) => ({ ...prev, size: e.target.value }))}
// //                     placeholder="Enter size (e.g., S, M, L, XL)"
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               <div>
// //                 <Label>Age Group *</Label>
// //                 <div className="flex flex-wrap gap-4 mt-2">
// //                   {["0-1", "1-2", "2-3", "3-4", "4-5", "0-5"].map((age) => (
// //                     <div key={age} className="flex items-center space-x-2">
// //                       <Checkbox
// //                         id={age}
// //                         checked={formData.ageGroup.includes(age as any)}
// //                         onCheckedChange={(checked) => handleAgeGroupChange(age as any, checked as boolean)}
// //                       />
// //                       <Label htmlFor={age}>{age} years</Label>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                 <div>
// //                   <Label htmlFor="sellingPrice">Selling Price *</Label>
// //                   <Input
// //                     id="sellingPrice"
// //                     type="number"
// //                     value={formData.sellingPrice}
// //                     onChange={(e) => setFormData((prev) => ({ ...prev, sellingPrice: Number(e.target.value) }))}
// //                     placeholder="Enter selling price"
// //                     required
// //                   />
// //                 </div>

// //                 <div>
// //                   <Label htmlFor="actualPrice">Actual Price (MRP)</Label>
// //                   <Input
// //                     id="actualPrice"
// //                     type="number"
// //                     value={formData.actualPrice}
// //                     onChange={(e) => setFormData((prev) => ({ ...prev, actualPrice: Number(e.target.value) }))}
// //                     placeholder="Enter actual price"
// //                   />
// //                 </div>

// //                 <div>
// //                   <Label htmlFor="color">Color</Label>
// //                   <Input
// //                     id="color"
// //                     value={formData.color}
// //                     onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))}
// //                     placeholder="Enter color"
// //                   />
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div>
// //                   <Label htmlFor="inStock">Stock Quantity *</Label>
// //                   <Input
// //                     id="inStock"
// //                     type="number"
// //                     value={formData.inStock}
// //                     onChange={(e) => setFormData((prev) => ({ ...prev, inStock: Number(e.target.value) }))}
// //                     placeholder="Enter stock quantity"
// //                     required
// //                   />
// //                 </div>

// //                 <div>
// //                   <Label htmlFor="weightInGrams">Weight (grams) *</Label>
// //                   <Input
// //                     id="weightInGrams"
// //                     type="number"
// //                     value={formData.weightInGrams}
// //                     onChange={(e) => setFormData((prev) => ({ ...prev, weightInGrams: Number(e.target.value) }))}
// //                     placeholder="Enter weight in grams"
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               <div>
// //                 <Label htmlFor="description">Description</Label>
// //                 <Textarea
// //                   id="description"
// //                   value={formData.description}
// //                   onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
// //                   placeholder="Enter product description"
// //                   rows={3}
// //                 />
// //               </div>

// //               <div>
// //                 <Label>Product Images</Label>
// //                 <div className="mt-2">
// //                   <div className="flex items-center gap-4 mb-4">
// //                     <Button
// //                       type="button"
// //                       variant="outline"
// //                       onClick={() => document.getElementById("image-upload")?.click()}
// //                       disabled={isUploading}
// //                       className="rounded-xl"
// //                     >
// //                       <Upload className="h-4 w-4 mr-2" />
// //                       {isUploading ? "Uploading..." : "Upload Images"}
// //                     </Button>
// //                     <input
// //                       id="image-upload"
// //                       type="file"
// //                       multiple
// //                       accept="image/*"
// //                       onChange={handleImageUpload}
// //                       className="hidden"
// //                     />
// //                   </div>

// //                   {formData.images.length > 0 && (
// //                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //                       {formData.images.map((image, index) => (
// //                         <div key={index} className="relative">
// //                           <Image
// //                             src={image || "/placeholder.svg"}
// //                             alt={`Product image ${index + 1}`}
// //                             width={150}
// //                             height={150}
// //                             className="rounded-lg object-cover w-full h-32"
// //                           />
// //                           <Button
// //                             type="button"
// //                             variant="destructive"
// //                             size="sm"
// //                             onClick={() => removeImage(index)}
// //                             className="absolute top-2 right-2 h-6 w-6 p-0"
// //                           >
// //                             <X className="h-4 w-4" />
// //                           </Button>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>

// //               <div className="flex justify-end gap-2">
// //                 <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
// //                   Cancel
// //                 </Button>
// //                 <Button
// //                   type="submit"
// //                   disabled={!isFormValid || isUploading}
// //                   className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:opacity-50"
// //                 >
// //                   {isEditing ? "Update" : "Create"} Clothes Item
// //                 </Button>
// //               </div>
// //             </form>
// //           </DialogContent>
// //         </Dialog>
// //       </div>
// //     </div>
// //   )
// // }



// "use client"

// import type React from "react"

// import { useState, useEffect, useCallback } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Plus, Search, RefreshCw, Shirt, Filter, SortAsc } from "lucide-react"
// import { AnimatedBackground } from "@/components/animated-background"
// import { toast } from "react-hot-toast"
// import { clothesSchema, type ClothesFormData } from "@/lib/validations/product-schemas"
// import { FormField } from "@/components/admin/form-field"
// import { useProductValidation } from "@/hooks/use-product-validation"
// import { ProductCard } from "@/components/admin/product-card"
// import { ImagePreview } from "@/components/admin/image-preview"
// import { z } from "zod"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// interface ClothesItem {
//   _id: string
//   name: string
//   category: ("boy" | "girl")[]
//   ageGroup: ("0-1" | "1-2" | "2-3" | "3-4" | "4-5" | "0-5")[]
//   sellingPrice: number
//   actualPrice?: number
//   size: string
//   inStock: number
//   weightInGrams: number
//   color?: string
//   images: string[]
//   productCode: string
//   description?: string
//   createdAt: string
//   updatedAt: string
// }

// export default function ClothesManagement() {
//   const { checkProductCodeUnique, clearValidationCache } = useProductValidation()
//   const [formErrors, setFormErrors] = useState<Record<string, string>>({})
//   const [isFormValid, setIsFormValid] = useState(false)

//   const [clothes, setClothes] = useState<ClothesItem[]>([])
//   const [filteredClothes, setFilteredClothes] = useState<ClothesItem[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [isEditing, setIsEditing] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedItem, setSelectedItem] = useState<ClothesItem | null>(null)
//   const [isUploading, setIsUploading] = useState(false)
//   const [sortBy, setSortBy] = useState("newest")
//   const [filterBy, setFilterBy] = useState("all")

//   const [formData, setFormData] = useState<ClothesFormData>({
//     name: "",
//     category: [],
//     ageGroup: [],
//     sellingPrice: 0,
//     actualPrice: 0,
//     size: "",
//     inStock: 0,
//     weightInGrams: 0,
//     color: "",
//     images: [],
//     productCode: "",
//     description: "",
//   })

//   const validateForm = useCallback(() => {
//     try {
//       clothesSchema.parse(formData)
//       const hasErrors = Object.keys(formErrors).length > 0
//       setIsFormValid(!hasErrors)
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const errors: Record<string, string> = {}
//         error.errors.forEach((err) => {
//           if (err.path.length > 0) {
//             errors[err.path[0].toString()] = err.message
//           }
//         })
//         setFormErrors(errors)
//         setIsFormValid(false)
//       }
//     }
//   }, [formData, formErrors])

//   useEffect(() => {
//     validateForm()
//   }, [validateForm])

//   const handleFieldValidation = useCallback((fieldName: string, isValid: boolean, error?: string) => {
//     setFormErrors((prev) => {
//       const newErrors = { ...prev }
//       if (isValid) {
//         delete newErrors[fieldName]
//       } else if (error) {
//         newErrors[fieldName] = error
//       }
//       return newErrors
//     })
//   }, [])

//   useEffect(() => {
//     fetchClothes()
//   }, [])

//   useEffect(() => {
//     filterAndSortClothes()
//   }, [clothes, searchTerm, sortBy, filterBy])

//   const fetchClothes = async () => {
//     try {
//       setIsLoading(true)
//       const response = await fetch("/api/admin/products/clothes")
//       const data = await response.json()
//       setClothes(data)
//     } catch (error) {
//       console.error("Error fetching clothes:", error)
//       toast.error("Failed to fetch clothes")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const filterAndSortClothes = () => {
//     let filtered = [...clothes]

//     // Apply search filter
//     if (searchTerm) {
//       filtered = filtered.filter(
//         (item) =>
//           item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.category.some((cat) => cat.toLowerCase().includes(searchTerm.toLowerCase())),
//       )
//     }

//     // Apply stock filter
//     switch (filterBy) {
//       case "in-stock":
//         filtered = filtered.filter((item) => item.inStock > 5)
//         break
//       case "low-stock":
//         filtered = filtered.filter((item) => item.inStock > 0 && item.inStock <= 5)
//         break
//       case "out-of-stock":
//         filtered = filtered.filter((item) => item.inStock === 0)
//         break
//     }

//     // Apply sorting
//     switch (sortBy) {
//       case "newest":
//         filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
//         break
//       case "oldest":
//         filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
//         break
//       case "price-low":
//         filtered.sort((a, b) => a.sellingPrice - b.sellingPrice)
//         break
//       case "price-high":
//         filtered.sort((a, b) => b.sellingPrice - a.sellingPrice)
//         break
//       case "stock-low":
//         filtered.sort((a, b) => a.inStock - b.inStock)
//         break
//       case "stock-high":
//         filtered.sort((a, b) => b.inStock - a.inStock)
//         break
//       case "name":
//         filtered.sort((a, b) => a.name.localeCompare(b.name))
//         break
//     }

//     setFilteredClothes(filtered)
//   }

//   const uploadToCloudinary = async (file: File): Promise<string> => {
//     const formData = new FormData()
//     formData.append("file", file)
//     formData.append("upload_preset", "mahadev_baby_shop")

//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//       {
//         method: "POST",
//         body: formData,
//       },
//     )

//     const data = await response.json()
//     return data.secure_url
//   }

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || [])
//     if (files.length === 0) return

//     setIsUploading(true)
//     try {
//       const uploadPromises = files.map(uploadToCloudinary)
//       const imageUrls = await Promise.all(uploadPromises)

//       setFormData((prev) => ({
//         ...prev,
//         images: [...prev.images, ...imageUrls],
//       }))
//       toast.success("Images uploaded successfully")
//     } catch (error) {
//       console.error("Error uploading images:", error)
//       toast.error("Failed to upload images")
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   const removeImage = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index),
//     }))
//   }

//   const handleCategoryChange = (category: "boy" | "girl", checked: boolean) => {
//     setFormData((prev) => ({
//       ...prev,
//       category: checked ? [...prev.category, category] : prev.category.filter((c) => c !== category),
//     }))
//   }

//   const handleAgeGroupChange = (ageGroup: "0-1" | "1-2" | "2-3" | "3-4" | "4-5" | "0-5", checked: boolean) => {
//     setFormData((prev) => ({
//       ...prev,
//       ageGroup: checked ? [...prev.ageGroup, ageGroup] : prev.ageGroup.filter((a) => a !== ageGroup),
//     }))
//   }

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       category: [],
//       ageGroup: [],
//       sellingPrice: 0,
//       actualPrice: 0,
//       size: "",
//       inStock: 0,
//       weightInGrams: 0,
//       color: "",
//       images: [],
//       productCode: "",
//       description: "",
//     })
//     setSelectedItem(null)
//     setIsEditing(false)
//     setFormErrors({})
//     clearValidationCache()
//   }

//   const openEditDialog = (item: ClothesItem) => {
//     setSelectedItem(item)
//     setFormData({
//       name: item.name,
//       category: item.category,
//       ageGroup: item.ageGroup,
//       sellingPrice: item.sellingPrice,
//       actualPrice: item.actualPrice || 0,
//       size: item.size,
//       inStock: item.inStock,
//       weightInGrams: item.weightInGrams,
//       color: item.color || "",
//       images: item.images,
//       productCode: item.productCode,
//       description: item.description || "",
//     })
//     setIsEditing(true)
//     setIsDialogOpen(true)
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     try {
//       clothesSchema.parse(formData)

//       if (!isFormValid) {
//         toast.error("Please fix all validation errors before submitting")
//         return
//       }

//       const url = isEditing ? `/api/admin/products/clothes/${selectedItem?._id}` : "/api/admin/products/clothes"
//       const method = isEditing ? "PUT" : "POST"

//       const response = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       })

//       if (response.ok) {
//         toast.success(isEditing ? "Clothes item updated successfully" : "Clothes item created successfully")
//         fetchClothes()
//         setIsDialogOpen(false)
//         resetForm()
//       } else {
//         const errorData = await response.json()
//         toast.error(errorData.error || "Failed to save clothes item")
//       }
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const firstError = error.errors[0]
//         toast.error(firstError.message)
//       } else {
//         console.error("Error saving clothes item:", error)
//         toast.error("Failed to save clothes item")
//       }
//     }
//   }

//   const handleDelete = async (id: string) => {
//     try {
//       const response = await fetch(`/api/admin/products/clothes/${id}`, {
//         method: "DELETE",
//       })

//       if (response.ok) {
//         toast.success("Clothes item deleted successfully")
//         fetchClothes()
//       } else {
//         toast.error("Failed to delete clothes item")
//       }
//     } catch (error) {
//       console.error("Error deleting clothes item:", error)
//       toast.error("Failed to delete clothes item")
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen relative">
//         <AnimatedBackground />
//         <div className="relative z-10 flex items-center justify-center min-h-screen">
//           <div className="flex items-center gap-3 text-lg font-medium">
//             <RefreshCw className="h-6 w-6 animate-spin text-pink-500" />
//             Loading Clothes...
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
//             <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
//               <Shirt className="h-6 w-6 md:h-8 md:w-8 text-blue-500" />
//               <span className="text-xl md:text-3xl lg:text-4xl">Clothes Management</span>
//             </h1>
//             <p className="text-muted-foreground mt-1 text-sm md:text-base">
//               Manage baby clothes inventory ({filteredClothes.length} items)
//             </p>
//           </div>
//           <Button
//             onClick={() => {
//               resetForm()
//               setIsDialogOpen(true)
//             }}
//             className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 w-full sm:w-auto"
//           >
//             <Plus className="h-4 w-4 mr-2" />
//             Add New Clothes
//           </Button>
//         </div>

//         {/* Filters and Search */}
//         <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
//           <CardContent className="p-4 md:p-6">
//             <div className="flex flex-col lg:flex-row gap-4">
//               {/* Search */}
//               <div className="flex-1">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     placeholder="Search clothes by name, code, or category..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 rounded-xl"
//                   />
//                 </div>
//               </div>

//               {/* Filters */}
//               <div className="flex flex-col sm:flex-row gap-2">
//                 <Select value={filterBy} onValueChange={setFilterBy}>
//                   <SelectTrigger className="w-full sm:w-40 rounded-xl">
//                     <Filter className="h-4 w-4 mr-2" />
//                     <SelectValue placeholder="Filter by" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Items</SelectItem>
//                     <SelectItem value="in-stock">In Stock</SelectItem>
//                     <SelectItem value="low-stock">Low Stock</SelectItem>
//                     <SelectItem value="out-of-stock">Out of Stock</SelectItem>
//                   </SelectContent>
//                 </Select>

//                 <Select value={sortBy} onValueChange={setSortBy}>
//                   <SelectTrigger className="w-full sm:w-40 rounded-xl">
//                     <SortAsc className="h-4 w-4 mr-2" />
//                     <SelectValue placeholder="Sort by" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="newest">Newest First</SelectItem>
//                     <SelectItem value="oldest">Oldest First</SelectItem>
//                     <SelectItem value="name">Name A-Z</SelectItem>
//                     <SelectItem value="price-low">Price Low-High</SelectItem>
//                     <SelectItem value="price-high">Price High-Low</SelectItem>
//                     <SelectItem value="stock-low">Stock Low-High</SelectItem>
//                     <SelectItem value="stock-high">Stock High-Low</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Products Grid */}
//         {filteredClothes.length === 0 ? (
//           <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
//             <CardContent className="p-12 text-center">
//               <Shirt className="h-16 w-16 mx-auto text-gray-400 mb-4" />
//               <h3 className="text-lg font-semibold mb-2">No clothes found</h3>
//               <p className="text-muted-foreground mb-4">
//                 {searchTerm || filterBy !== "all"
//                   ? "Try adjusting your search or filters"
//                   : "Get started by adding your first clothes item"}
//               </p>
//               <Button
//                 onClick={() => {
//                   resetForm()
//                   setIsDialogOpen(true)
//                 }}
//                 className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500"
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add First Clothes Item
//               </Button>
//             </CardContent>
//           </Card>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
//             {filteredClothes.map((item) => (
//               <ProductCard
//                 key={item._id}
//                 product={item}
//                 onEdit={openEditDialog}
//                 onDelete={handleDelete}
//                 type="clothes"
//               />
//             ))}
//           </div>
//         )}

//         {/* Add/Edit Dialog */}
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
//             <DialogHeader>
//               <DialogTitle className="text-lg md:text-xl">
//                 {isEditing ? "Edit Clothes Item" : "Add New Clothes Item"}
//               </DialogTitle>
//               <DialogDescription className="text-sm">
//                 {isEditing ? "Update the clothes item details" : "Fill in the details to add a new clothes item"}
//               </DialogDescription>
//             </DialogHeader>

//             <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <FormField
//                   label="Product Name"
//                   name="name"
//                   value={formData.name}
//                   onChange={(value) => setFormData((prev) => ({ ...prev, name: value as string }))}
//                   onValidation={(isValid, error) => handleFieldValidation("name", isValid, error)}
//                   placeholder="Enter product name"
//                   required
//                   validation={(value) => {
//                     if (!value || (value as string).length < 1) {
//                       return { isValid: false, error: "Product name is required" }
//                     }
//                     if ((value as string).length > 100) {
//                       return { isValid: false, error: "Product name must be less than 100 characters" }
//                     }
//                     return { isValid: true }
//                   }}
//                 />

//                 <FormField
//                   label="Product Code"
//                   name="productCode"
//                   value={formData.productCode}
//                   onChange={(value) => setFormData((prev) => ({ ...prev, productCode: value as string }))}
//                   onValidation={(isValid, error) => handleFieldValidation("productCode", isValid, error)}
//                   placeholder="Enter unique product code"
//                   required
//                   validation={(value) => {
//                     if (!value || (value as string).length < 1) {
//                       return { isValid: false, error: "Product code is required" }
//                     }
//                     if ((value as string).length > 20) {
//                       return { isValid: false, error: "Product code must be less than 20 characters" }
//                     }
//                     return { isValid: true }
//                   }}
//                   checkUnique={(value) => checkProductCodeUnique(value, "clothes", selectedItem?._id)}
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label className="text-sm font-medium">
//                     Category <span className="text-red-500">*</span>
//                   </Label>
//                   <div className="flex gap-4 mt-2">
//                     <div className="flex items-center space-x-2">
//                       <Checkbox
//                         id="boy"
//                         checked={formData.category.includes("boy")}
//                         onCheckedChange={(checked) => handleCategoryChange("boy", checked as boolean)}
//                       />
//                       <Label htmlFor="boy" className="text-sm">
//                         Boy
//                       </Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox
//                         id="girl"
//                         checked={formData.category.includes("girl")}
//                         onCheckedChange={(checked) => handleCategoryChange("girl", checked as boolean)}
//                       />
//                       <Label htmlFor="girl" className="text-sm">
//                         Girl
//                       </Label>
//                     </div>
//                   </div>
//                   {formData.category.length === 0 && (
//                     <p className="text-sm text-red-500 mt-1">At least one category is required</p>
//                   )}
//                 </div>

//                 <FormField
//                   label="Size"
//                   name="size"
//                   value={formData.size}
//                   onChange={(value) => setFormData((prev) => ({ ...prev, size: value as string }))}
//                   placeholder="Enter size (e.g., S, M, L, XL)"
//                   required
//                 />
//               </div>

//               <div>
//                 <Label className="text-sm font-medium">
//                   Age Group <span className="text-red-500">*</span>
//                 </Label>
//                 <div className="flex flex-wrap gap-4 mt-2">
//                   {["0-1", "1-2", "2-3", "3-4", "4-5", "0-5"].map((age) => (
//                     <div key={age} className="flex items-center space-x-2">
//                       <Checkbox
//                         id={age}
//                         checked={formData.ageGroup.includes(age as any)}
//                         onCheckedChange={(checked) => handleAgeGroupChange(age as any, checked as boolean)}
//                       />
//                       <Label htmlFor={age} className="text-sm">
//                         {age} years
//                       </Label>
//                     </div>
//                   ))}
//                 </div>
//                 {formData.ageGroup.length === 0 && (
//                   <p className="text-sm text-red-500 mt-1">At least one age group is required</p>
//                 )}
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <FormField
//                   label="Selling Price"
//                   name="sellingPrice"
//                   type="number"
//                   value={formData.sellingPrice}
//                   onChange={(value) => setFormData((prev) => ({ ...prev, sellingPrice: value as number }))}
//                   onValidation={(isValid, error) => handleFieldValidation("sellingPrice", isValid, error)}
//                   placeholder="Enter selling price"
//                   required
//                   validation={(value) => {
//                     if (typeof value !== "number" || value < 0) {
//                       return { isValid: false, error: "Selling price must be positive" }
//                     }
//                     return { isValid: true }
//                   }}
//                 />

//                 <FormField
//                   label="Actual Price (MRP)"
//                   name="actualPrice"
//                   type="number"
//                   value={formData.actualPrice || 0}
//                   onChange={(value) => setFormData((prev) => ({ ...prev, actualPrice: value as number }))}
//                   placeholder="Enter actual price"
//                 />

//                 <FormField
//                   label="Color"
//                   name="color"
//                   value={formData.color || ""}
//                   onChange={(value) => setFormData((prev) => ({ ...prev, color: value as string }))}
//                   placeholder="Enter color"
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <FormField
//                   label="Stock Quantity"
//                   name="inStock"
//                   type="number"
//                   value={formData.inStock}
//                   onChange={(value) => setFormData((prev) => ({ ...prev, inStock: value as number }))}
//                   onValidation={(isValid, error) => handleFieldValidation("inStock", isValid, error)}
//                   placeholder="Enter stock quantity"
//                   required
//                   validation={(value) => {
//                     if (typeof value !== "number" || value < 0) {
//                       return { isValid: false, error: "Stock quantity must be positive" }
//                     }
//                     return { isValid: true }
//                   }}
//                 />

//                 <FormField
//                   label="Weight (grams)"
//                   name="weightInGrams"
//                   type="number"
//                   value={formData.weightInGrams}
//                   onChange={(value) => setFormData((prev) => ({ ...prev, weightInGrams: value as number }))}
//                   onValidation={(isValid, error) => handleFieldValidation("weightInGrams", isValid, error)}
//                   placeholder="Enter weight in grams"
//                   required
//                   validation={(value) => {
//                     if (typeof value !== "number" || value < 0) {
//                       return { isValid: false, error: "Weight must be positive" }
//                     }
//                     return { isValid: true }
//                   }}
//                 />
//               </div>

//               <FormField
//                 label="Description"
//                 name="description"
//                 type="textarea"
//                 value={formData.description || ""}
//                 onChange={(value) => setFormData((prev) => ({ ...prev, description: value as string }))}
//                 placeholder="Enter product description"
//                 rows={3}
//               />

//               <div>
//                 <Label className="text-sm font-medium">Product Images</Label>
//                 <div className="mt-2">
//                   <div className="flex items-center gap-4 mb-4">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       onClick={() => document.getElementById("image-upload")?.click()}
//                       disabled={isUploading}
//                       className="rounded-xl w-full sm:w-auto"
//                     >
//                       <Plus className="h-4 w-4 mr-2" />
//                       {isUploading ? "Uploading..." : "Upload Images"}
//                     </Button>
//                     <input
//                       id="image-upload"
//                       type="file"
//                       multiple
//                       accept="image/*"
//                       onChange={handleImageUpload}
//                       className="hidden"
//                     />
//                   </div>

//                   <ImagePreview images={formData.images} onRemove={removeImage} />
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row justify-end gap-2">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => setIsDialogOpen(false)}
//                   className="w-full sm:w-auto"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   disabled={!isFormValid || isUploading}
//                   className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 disabled:opacity-50 w-full sm:w-auto"
//                 >
//                   {isEditing ? "Update" : "Create"} Clothes Item
//                 </Button>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Plus,
  Edit,
  Trash2,
  Search,
  RefreshCw,
  Shirt,
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
import { clothesSchema, clothesSchemaInfo, type ClothesFormData } from "@/lib/validations/clothes-schema"
import { ImageGallery } from "@/components/admin/image-gallery"
import { HelpDialog } from "@/components/admin/help-dialog"

interface ClothesItem {
  _id: string
  productCode: string
  name: string
  category: ("boy" | "girl")[]
  ageGroup: ("0-1" | "1-2" | "2-3" | "3-4" | "4-5" | "0-5")[]
  sellingPrice: number
  actualPrice?: number
  size: string
  inStock: number
  weightInGrams: number
  color?: string
  images: string[]
  description?: string
  createdAt: string
  updatedAt: string
}

interface FilterState {
  search: string
  category: string[]
  ageGroup: string[]
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
  stockStatus: "all" | "in-stock" | "low-stock" | "out-of-stock"
  sortBy: "name" | "price" | "stock" | "weight" | "created"
  sortOrder: "asc" | "desc"
}

const categoryOptions = ["boy", "girl"]
const ageGroupOptions = ["0-1", "1-2", "2-3", "3-4", "4-5", "0-5"]

export default function ClothesManagement() {
  const [clothes, setClothes] = useState<ClothesItem[]>([])
  const [filteredClothes, setFilteredClothes] = useState<ClothesItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ClothesItem | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: [],
    ageGroup: [],
    priceRange: { min: null, max: null },
    stockRange: { min: null, max: null },
    weightRange: { min: null, max: null },
    stockStatus: "all",
    sortBy: "created",
    sortOrder: "desc",
  })

  const form = useForm<ClothesFormData>({
    resolver: zodResolver(clothesSchema),
    defaultValues: {
      productCode: "",
      name: "",
      category: [],
      ageGroup: [],
      sellingPrice: 0,
      actualPrice: 0,
      size: "",
      inStock: 0,
      weightInGrams: 0,
      color: "",
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
  const watchedCategory = watch("category")
  const watchedAgeGroup = watch("ageGroup")

  useEffect(() => {
    fetchClothes()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [clothes, filters])

  const fetchClothes = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/products/clothes")
      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      setClothes(data.data || [])
    } catch (error) {
      console.error("Error fetching clothes:", error)
      toast.error("Failed to fetch clothes")
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...clothes]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchLower) ||
          item.productCode.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower) ||
          item.color?.toLowerCase().includes(searchLower) ||
          item.size.toLowerCase().includes(searchLower),
      )
    }

    // Category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter((item) =>
        filters.category.some((cat) => item.category.includes(cat as "boy" | "girl")),
      )
    }

    // Age group filter
    if (filters.ageGroup.length > 0) {
      filtered = filtered.filter((item) => filters.ageGroup.some((age) => item.ageGroup.includes(age as any)))
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

    setFilteredClothes(filtered)
  }

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      category: [],
      ageGroup: [],
      priceRange: { min: null, max: null },
      stockRange: { min: null, max: null },
      weightRange: { min: null, max: null },
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

  const openEditDialog = (item: ClothesItem) => {
    setSelectedItem(item)
    reset({
      productCode: item.productCode,
      name: item.name,
      category: item.category,
      ageGroup: item.ageGroup,
      sellingPrice: item.sellingPrice,
      actualPrice: item.actualPrice || 0,
      size: item.size,
      inStock: item.inStock,
      weightInGrams: item.weightInGrams,
      color: item.color || "",
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

  const onSubmit = async (data: ClothesFormData) => {
    setIsSubmitting(true)
    try {
      if (!isEditing) {
        const isUnique = await checkProductCodeUnique(data.productCode)
        if (!isUnique) {
          toast.error("Product code already exists")
          return
        }
      }

      const url = isEditing ? `/api/admin/products/clothes/${selectedItem?._id}` : "/api/admin/products/clothes"
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

      toast.success(isEditing ? "Clothes item updated successfully" : "Clothes item created successfully")
      fetchClothes()
      setIsDialogOpen(false)
      resetForm()
    } catch (error: any) {
      console.error("Error saving clothes:", error)
      toast.error(error.message || "Failed to save clothes item")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string, productCode: string) => {
    if (!confirm("Are you sure you want to delete this clothes item? This will also remove it from stock management."))
      return

    try {
      const response = await fetch(`/api/admin/products/clothes/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast.success("Clothes item deleted successfully")
      fetchClothes()
    } catch (error) {
      console.error("Error deleting clothes:", error)
      toast.error("Failed to delete clothes item")
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
      filters.category.length > 0 ||
      filters.ageGroup.length > 0 ||
      filters.priceRange.min !== null ||
      filters.priceRange.max !== null ||
      filters.stockRange.min !== null ||
      filters.stockRange.max !== null ||
      filters.weightRange.min !== null ||
      filters.weightRange.max !== null ||
      filters.stockStatus !== "all"
    )
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    const currentCategories = watchedCategory || []
    if (checked) {
      setValue("category", [...currentCategories, category as "boy" | "girl"])
    } else {
      setValue(
        "category",
        currentCategories.filter((c) => c !== category),
      )
    }
  }

  const handleAgeGroupChange = (ageGroup: string, checked: boolean) => {
    const currentAgeGroups = watchedAgeGroup || []
    if (checked) {
      setValue("ageGroup", [...currentAgeGroups, ageGroup as any])
    } else {
      setValue(
        "ageGroup",
        currentAgeGroups.filter((a) => a !== ageGroup),
      )
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="flex items-center gap-3 text-lg font-medium">
            <RefreshCw className="h-6 w-6 animate-spin text-pink-500" />
            Loading Clothes...
          </div>
        </div>
      </div>
    )
  }

  // return (
  //   <div className="min-h-screen relative">
  //     <AnimatedBackground />
  //     <div className="relative z-10 container mx-auto px-4 py-6 md:py-8 space-y-6">
  //       {/* Header */}
  //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  //         <div>
  //           <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
  //             <Shirt className="h-8 w-8 text-purple-500" />
  //             Clothes Management
  //           </h1>
  //           <p className="text-muted-foreground mt-1">Manage baby clothes inventory</p>
  //         </div>
  //         <Button
  //           onClick={() => {
  //             resetForm()
  //             setIsDialogOpen(true)
  //           }}
  //           className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
  //         >
  //           <Plus className="h-4 w-4 mr-2" />
  //           Add New Clothes
  //         </Button>
  //       </div>

  //       {/* Search and Filter Section */}
  //       <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
  //         <CardContent className="p-4 space-y-4">
  //           {/* Search Bar */}
  //           <div className="relative">
  //             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  //             <Input
  //               placeholder="Search clothes by name, code, color, size, or description..."
  //               value={filters.search}
  //               onChange={(e) => updateFilter("search", e.target.value)}
  //               className="pl-10 rounded-xl"
  //             />
  //           </div>

  //           {/* Filter Toggle */}
  //           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  //             <div className="flex items-center gap-2">
  //               <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
  //                 <CollapsibleTrigger asChild>
  //                   <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
  //                     <Filter className="h-4 w-4 mr-2" />
  //                     Filters
  //                     {hasActiveFilters() && (
  //                       <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
  //                         !
  //                       </Badge>
  //                     )}
  //                     {isFilterOpen ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
  //                   </Button>
  //                 </CollapsibleTrigger>

  //                 <CollapsibleContent className="mt-4">
  //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/50">
  //                     {/* Category Filter */}
  //                     <div className="space-y-2">
  //                       <Label className="text-sm font-medium">Category</Label>
  //                       <div className="space-y-2">
  //                         {categoryOptions.map((category) => (
  //                           <div key={category} className="flex items-center space-x-2">
  //                             <Checkbox
  //                               id={`filter-category-${category}`}
  //                               checked={filters.category.includes(category)}
  //                               onCheckedChange={(checked) => {
  //                                 if (checked) {
  //                                   updateFilter("category", [...filters.category, category])
  //                                 } else {
  //                                   updateFilter(
  //                                     "category",
  //                                     filters.category.filter((c) => c !== category),
  //                                   )
  //                                 }
  //                               }}
  //                             />
  //                             <Label htmlFor={`filter-category-${category}`} className="text-sm capitalize">
  //                               {category}
  //                             </Label>
  //                           </div>
  //                         ))}
  //                       </div>
  //                     </div>

  //                     {/* Age Group Filter */}
  //                     <div className="space-y-2">
  //                       <Label className="text-sm font-medium">Age Group</Label>
  //                       <div className="space-y-2 max-h-32 overflow-y-auto">
  //                         {ageGroupOptions.map((age) => (
  //                           <div key={age} className="flex items-center space-x-2">
  //                             <Checkbox
  //                               id={`filter-age-${age}`}
  //                               checked={filters.ageGroup.includes(age)}
  //                               onCheckedChange={(checked) => {
  //                                 if (checked) {
  //                                   updateFilter("ageGroup", [...filters.ageGroup, age])
  //                                 } else {
  //                                   updateFilter(
  //                                     "ageGroup",
  //                                     filters.ageGroup.filter((a) => a !== age),
  //                                   )
  //                                 }
  //                               }}
  //                             />
  //                             <Label htmlFor={`filter-age-${age}`} className="text-sm">
  //                               {age} years
  //                             </Label>
  //                           </div>
  //                         ))}
  //                       </div>
  //                     </div>

  //                     {/* Price Range */}
  //                     <div className="space-y-2">
  //                       <Label className="text-sm font-medium">Price Range (₹)</Label>
  //                       <div className="flex gap-2">
  //                         <Input
  //                           type="number"
  //                           placeholder="Min"
  //                           value={filters.priceRange.min || ""}
  //                           onChange={(e) =>
  //                             updateFilter("priceRange", {
  //                               ...filters.priceRange,
  //                               min: e.target.value ? Number(e.target.value) : null,
  //                             })
  //                           }
  //                           className="text-sm"
  //                         />
  //                         <Input
  //                           type="number"
  //                           placeholder="Max"
  //                           value={filters.priceRange.max || ""}
  //                           onChange={(e) =>
  //                             updateFilter("priceRange", {
  //                               ...filters.priceRange,
  //                               max: e.target.value ? Number(e.target.value) : null,
  //                             })
  //                           }
  //                           className="text-sm"
  //                         />
  //                       </div>
  //                     </div>

  //                     {/* Stock Range */}
  //                     <div className="space-y-2">
  //                       <Label className="text-sm font-medium">Stock Range</Label>
  //                       <div className="flex gap-2">
  //                         <Input
  //                           type="number"
  //                           placeholder="Min"
  //                           value={filters.stockRange.min || ""}
  //                           onChange={(e) =>
  //                             updateFilter("stockRange", {
  //                               ...filters.stockRange,
  //                               min: e.target.value ? Number(e.target.value) : null,
  //                             })
  //                           }
  //                           className="text-sm"
  //                         />
  //                         <Input
  //                           type="number"
  //                           placeholder="Max"
  //                           value={filters.stockRange.max || ""}
  //                           onChange={(e) =>
  //                             updateFilter("stockRange", {
  //                               ...filters.stockRange,
  //                               max: e.target.value ? Number(e.target.value) : null,
  //                             })
  //                           }
  //                           className="text-sm"
  //                         />
  //                       </div>
  //                     </div>

  //                     {/* Weight Range */}
  //                     <div className="space-y-2">
  //                       <Label className="text-sm font-medium">Weight Range (g)</Label>
  //                       <div className="flex gap-2">
  //                         <Input
  //                           type="number"
  //                           placeholder="Min"
  //                           value={filters.weightRange.min || ""}
  //                           onChange={(e) =>
  //                             updateFilter("weightRange", {
  //                               ...filters.weightRange,
  //                               min: e.target.value ? Number(e.target.value) : null,
  //                             })
  //                           }
  //                           className="text-sm"
  //                         />
  //                         <Input
  //                           type="number"
  //                           placeholder="Max"
  //                           value={filters.weightRange.max || ""}
  //                           onChange={(e) =>
  //                             updateFilter("weightRange", {
  //                               ...filters.weightRange,
  //                               max: e.target.value ? Number(e.target.value) : null,
  //                             })
  //                           }
  //                           className="text-sm"
  //                         />
  //                       </div>
  //                     </div>

  //                     {/* Stock Status */}
  //                     <div className="space-y-2">
  //                       <Label className="text-sm font-medium">Stock Status</Label>
  //                       <Select
  //                         value={filters.stockStatus}
  //                         onValueChange={(value) => updateFilter("stockStatus", value)}
  //                       >
  //                         <SelectTrigger className="text-sm">
  //                           <SelectValue />
  //                         </SelectTrigger>
  //                         <SelectContent>
  //                           <SelectItem value="all">All Items</SelectItem>
  //                           <SelectItem value="in-stock">In Stock &gt;10</SelectItem>
  //                           <SelectItem value="low-stock">Low Stock 1-10</SelectItem>
  //                           <SelectItem value="out-of-stock">Out of Stock 0</SelectItem>
  //                         </SelectContent>
  //                       </Select>
  //                     </div>

  //                     {/* Sort By */}
  //                     <div className="space-y-2">
  //                       <Label className="text-sm font-medium">Sort By</Label>
  //                       <div className="flex gap-2">
  //                         <Select value={filters.sortBy} onValueChange={(value) => updateFilter("sortBy", value)}>
  //                           <SelectTrigger className="text-sm">
  //                             <SelectValue />
  //                           </SelectTrigger>
  //                           <SelectContent>
  //                             <SelectItem value="name">Name</SelectItem>
  //                             <SelectItem value="price">Price</SelectItem>
  //                             <SelectItem value="stock">Stock</SelectItem>
  //                             <SelectItem value="weight">Weight</SelectItem>
  //                             <SelectItem value="created">Created Date</SelectItem>
  //                           </SelectContent>
  //                         </Select>
  //                         <Button
  //                           variant="outline"
  //                           size="sm"
  //                           onClick={() => updateFilter("sortOrder", filters.sortOrder === "asc" ? "desc" : "asc")}
  //                           className="px-3"
  //                         >
  //                           {filters.sortOrder === "asc" ? (
  //                             <SortAsc className="h-4 w-4" />
  //                           ) : (
  //                             <SortDesc className="h-4 w-4" />
  //                           )}
  //                         </Button>
  //                       </div>
  //                     </div>

  //                     {/* Clear Filters */}
  //                     <div className="flex items-end">
  //                       <Button
  //                         variant="outline"
  //                         size="sm"
  //                         onClick={clearFilters}
  //                         disabled={!hasActiveFilters()}
  //                         className="w-full bg-transparent"
  //                       >
  //                         <X className="h-4 w-4 mr-2" />
  //                         Clear Filters
  //                       </Button>
  //                     </div>
  //                   </div>
  //                 </CollapsibleContent>
  //               </Collapsible>
  //             </div>

  //             {/* Stats */}
  //             <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
  //               <span>Total: {clothes.length}</span>
  //               <span>Filtered: {filteredClothes.length}</span>
  //               <span>In Stock: {clothes.filter((c) => c.inStock > 0).length}</span>
  //             </div>
  //           </div>
  //         </CardContent>
  //       </Card>

  //       {/* Clothes Table */}
  //       <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
  //         <CardHeader>
  //           <CardTitle className="flex items-center gap-2">
  //             <Shirt className="h-5 w-5" />
  //             Clothes Inventory ({filteredClothes.length} items)
  //           </CardTitle>
  //         </CardHeader>
  //         <CardContent>
  //           {/* Mobile Cards View */}
  //           <div className="block md:hidden space-y-4">
  //             {filteredClothes.map((item) => (
  //               <Card key={item._id} className="p-4">
  //                 <div className="flex items-start gap-3">
  //                   <div className="flex-shrink-0">
  //                     {item.images.length > 0 ? (
  //                       <Image
  //                         src={item.images[0] || "/placeholder.svg"}
  //                         alt={item.name}
  //                         width={60}
  //                         height={60}
  //                         className="rounded-lg object-cover"
  //                       />
  //                     ) : (
  //                       <div className="w-15 h-15 bg-gray-200 rounded-lg flex items-center justify-center">
  //                         <Shirt className="h-8 w-8 text-gray-400" />
  //                       </div>
  //                     )}
  //                   </div>
  //                   <div className="flex-1 min-w-0">
  //                     <div className="flex items-start justify-between">
  //                       <div>
  //                         <h3 className="font-medium text-sm truncate">{item.name}</h3>
  //                         <p className="text-xs text-muted-foreground font-mono">{item.productCode}</p>
  //                         <div className="flex flex-wrap gap-1 mt-1">
  //                           {item.category.map((cat) => (
  //                             <Badge key={cat} variant="outline" className="text-xs">
  //                               {cat}
  //                             </Badge>
  //                           ))}
  //                         </div>
  //                       </div>
  //                       <div className="flex gap-1 ml-2">
  //                         <Button
  //                           variant="outline"
  //                           size="sm"
  //                           onClick={() => openEditDialog(item)}
  //                           className="h-8 w-8 p-0"
  //                         >
  //                           <Edit className="h-3 w-3" />
  //                         </Button>
  //                         <Button
  //                           variant="outline"
  //                           size="sm"
  //                           onClick={() => handleDelete(item._id, item.productCode)}
  //                           className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
  //                         >
  //                           <Trash2 className="h-3 w-3" />
  //                         </Button>
  //                       </div>
  //                     </div>
  //                     <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
  //                       <div>
  //                         <span className="text-muted-foreground">Price: </span>
  //                         <span className="font-medium">₹{item.sellingPrice}</span>
  //                         {item.actualPrice && item.actualPrice > item.sellingPrice && (
  //                           <span className="text-muted-foreground line-through ml-1">₹{item.actualPrice}</span>
  //                         )}
  //                       </div>
  //                       <div>
  //                         <span className="text-muted-foreground">Stock: </span>
  //                         <Badge variant={getStockBadgeVariant(item.inStock)} className="text-xs">
  //                           {item.inStock}
  //                         </Badge>
  //                       </div>
  //                       <div>
  //                         <span className="text-muted-foreground">Size: </span>
  //                         <span>{item.size}</span>
  //                       </div>
  //                       <div>
  //                         <span className="text-muted-foreground">Weight: </span>
  //                         <span>{item.weightInGrams}g</span>
  //                       </div>
  //                       {item.color && (
  //                         <div className="col-span-2">
  //                           <span className="text-muted-foreground">Color: </span>
  //                           <span>{item.color}</span>
  //                         </div>
  //                       )}
  //                     </div>
  //                   </div>
  //                 </div>
  //               </Card>
  //             ))}
  //           </div>

  //           {/* Desktop Table View */}
  //           <div className="hidden md:block overflow-x-auto">
  //             <Table>
  //               <TableHeader>
  //                 <TableRow>
  //                   <TableHead className="w-40">Image</TableHead>
  //                   <TableHead className="min-w-32">Code</TableHead>
  //                   <TableHead className="min-w-40">Name</TableHead>
  //                   <TableHead className="min-w-24">Category</TableHead>
  //                   <TableHead className="min-w-20">Size</TableHead>
  //                   <TableHead className="min-w-24">Price</TableHead>
  //                   <TableHead className="min-w-20">Stock</TableHead>
  //                   <TableHead className="min-w-20">Weight</TableHead>
  //                   <TableHead className="min-w-32">Actions</TableHead>
  //                 </TableRow>
  //               </TableHeader>
  //               <TableBody>
  //                 {filteredClothes.map((item) => (
  //                   <TableRow key={item._id}>
  //                     <TableCell>
  //                       {item.images.length > 0 ? (
  //                         <Image
  //                           src={item.images[0] || "/placeholder.svg"}
  //                           alt={item.name}
  //                           width={50}
  //                           height={50}
  //                           className="rounded-lg object-cover"
  //                         />
  //                       ) : (
  //                         <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
  //                           <Shirt className="h-6 w-6 text-gray-400" />
  //                         </div>
  //                       )}
  //                     </TableCell>
  //                     <TableCell className="font-medium font-mono text-xs">{item.productCode}</TableCell>
  //                     <TableCell>
  //                       <div>
  //                         <p className="font-medium">{item.name}</p>
  //                         {item.color && <p className="text-xs text-muted-foreground">{item.color}</p>}
  //                       </div>
  //                     </TableCell>
  //                     <TableCell>
  //                       <div className="flex flex-wrap gap-1">
  //                         {item.category.map((cat) => (
  //                           <Badge key={cat} variant="outline" className="text-xs">
  //                             {cat}
  //                           </Badge>
  //                         ))}
  //                       </div>
  //                     </TableCell>
  //                     <TableCell className="text-sm">{item.size}</TableCell>
  //                     <TableCell>
  //                       <div>
  //                         <p className="font-medium">₹{item.sellingPrice}</p>
  //                         {item.actualPrice && item.actualPrice > item.sellingPrice && (
  //                           <p className="text-xs text-muted-foreground line-through">₹{item.actualPrice}</p>
  //                         )}
  //                       </div>
  //                     </TableCell>
  //                     <TableCell>
  //                       <Badge variant={getStockBadgeVariant(item.inStock)}>{item.inStock}</Badge>
  //                     </TableCell>
  //                     <TableCell className="text-sm">{item.weightInGrams}g</TableCell>
  //                     <TableCell>
  //                       <div className="flex gap-1">
  //                         <Button
  //                           variant="outline"
  //                           size="sm"
  //                           onClick={() => openEditDialog(item)}
  //                           className="h-8 w-8 p-0"
  //                         >
  //                           <Edit className="h-3 w-3" />
  //                         </Button>
  //                         <Button
  //                           variant="outline"
  //                           size="sm"
  //                           onClick={() => handleDelete(item._id, item.productCode)}
  //                           className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
  //                         >
  //                           <Trash2 className="h-3 w-3" />
  //                         </Button>
  //                       </div>
  //                     </TableCell>
  //                   </TableRow>
  //                 ))}
  //               </TableBody>
  //             </Table>
  //           </div>

  //           {/* Empty State */}
  //           {filteredClothes.length === 0 && (
  //             <div className="text-center py-8">
  //               <Shirt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
  //               <p className="text-gray-500 font-medium">No clothes found</p>
  //               <p className="text-sm text-gray-400">
  //                 {hasActiveFilters() ? "Try adjusting your filters" : "Add your first clothes item to get started"}
  //               </p>
  //             </div>
  //           )}
  //         </CardContent>
  //       </Card>

  //       {/* Add/Edit Dialog */}
  //       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
  //         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
  //           <DialogHeader>
  //             <DialogTitle>{isEditing ? "Edit Clothes" : "Add New Clothes"}</DialogTitle>
  //             <DialogDescription>
  //               {isEditing ? "Update the clothes details" : "Fill in the details to add a new clothes item"}
  //             </DialogDescription>
  //           </DialogHeader>

  //           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //               <div className="space-y-2">
  //                 <Label htmlFor="name">Clothes Name *</Label>
  //                 <Input
  //                   id="name"
  //                   {...register("name")}
  //                   placeholder="Enter clothes name"
  //                   className={errors.name ? "border-red-500" : ""}
  //                 />
  //                 {errors.name && (
  //                   <p className="text-sm text-red-500 flex items-center gap-1">
  //                     <AlertCircle className="h-3 w-3" />
  //                     {errors.name.message}
  //                   </p>
  //                 )}
  //               </div>

  //               <div className="space-y-2">
  //                 <Label htmlFor="productCode">Product Code *</Label>
  //                 <Input
  //                   id="productCode"
  //                   {...register("productCode")}
  //                   placeholder="e.g., shirt_boy_1.1"
  //                   className={errors.productCode ? "border-red-500" : ""}
  //                   disabled={isEditing}
  //                 />
  //                 {errors.productCode && (
  //                   <p className="text-sm text-red-500 flex items-center gap-1">
  //                     <AlertCircle className="h-3 w-3" />
  //                     {errors.productCode.message}
  //                   </p>
  //                 )}
  //               </div>
  //             </div>

  //             {/* Category Selection */}
  //             <div className="space-y-2">
  //               <Label>Category *</Label>
  //               <div className="flex gap-4">
  //                 {categoryOptions.map((category) => (
  //                   <div key={category} className="flex items-center space-x-2">
  //                     <Checkbox
  //                       id={`category-${category}`}
  //                       checked={watchedCategory?.includes(category as "boy" | "girl") || false}
  //                       onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
  //                     />
  //                     <Label htmlFor={`category-${category}`} className="capitalize">
  //                       {category}
  //                     </Label>
  //                   </div>
  //                 ))}
  //               </div>
  //               {errors.category && (
  //                 <p className="text-sm text-red-500 flex items-center gap-1">
  //                   <AlertCircle className="h-3 w-3" />
  //                   {errors.category.message}
  //                 </p>
  //               )}
  //             </div>

  //             {/* Age Group Selection */}
  //             <div className="space-y-2">
  //               <Label>Age Group *</Label>
  //               <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
  //                 {ageGroupOptions.map((age) => (
  //                   <div key={age} className="flex items-center space-x-2">
  //                     <Checkbox
  //                       id={`age-${age}`}
  //                       checked={watchedAgeGroup?.includes(age as any) || false}
  //                       onCheckedChange={(checked) => handleAgeGroupChange(age, checked as boolean)}
  //                     />
  //                     <Label htmlFor={`age-${age}`} className="text-sm">
  //                       {age} years
  //                     </Label>
  //                   </div>
  //                 ))}
  //               </div>
  //               {errors.ageGroup && (
  //                 <p className="text-sm text-red-500 flex items-center gap-1">
  //                   <AlertCircle className="h-3 w-3" />
  //                   {errors.ageGroup.message}
  //                 </p>
  //               )}
  //             </div>

  //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  //               <div className="space-y-2">
  //                 <Label htmlFor="size">Size *</Label>
  //                 <Input
  //                   id="size"
  //                   {...register("size")}
  //                   placeholder="e.g., 6-12 months"
  //                   className={errors.size ? "border-red-500" : ""}
  //                 />
  //                 {errors.size && (
  //                   <p className="text-sm text-red-500 flex items-center gap-1">
  //                     <AlertCircle className="h-3 w-3" />
  //                     {errors.size.message}
  //                   </p>
  //                 )}
  //               </div>

  //               <div className="space-y-2">
  //                 <Label htmlFor="color">Color</Label>
  //                 <Input
  //                   id="color"
  //                   {...register("color")}
  //                   placeholder="e.g., Blue"
  //                   className={errors.color ? "border-red-500" : ""}
  //                 />
  //                 {errors.color && (
  //                   <p className="text-sm text-red-500 flex items-center gap-1">
  //                     <AlertCircle className="h-3 w-3" />
  //                     {errors.color.message}
  //                   </p>
  //                 )}
  //               </div>

  //               <div className="space-y-2">
  //                 <Label htmlFor="weightInGrams">Weight (grams) *</Label>
  //                 <Input
  //                   id="weightInGrams"
  //                   type="number"
  //                   {...register("weightInGrams", { valueAsNumber: true })}
  //                   placeholder="150"
  //                   className={errors.weightInGrams ? "border-red-500" : ""}
  //                 />
  //                 {errors.weightInGrams && (
  //                   <p className="text-sm text-red-500 flex items-center gap-1">
  //                     <AlertCircle className="h-3 w-3" />
  //                     {errors.weightInGrams.message}
  //                   </p>
  //                 )}
  //               </div>
  //             </div>

  //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  //               <div className="space-y-2">
  //                 <Label htmlFor="sellingPrice">Selling Price (₹) *</Label>
  //                 <Input
  //                   id="sellingPrice"
  //                   type="number"
  //                   step="0.01"
  //                   {...register("sellingPrice", { valueAsNumber: true })}
  //                   placeholder="299"
  //                   className={errors.sellingPrice ? "border-red-500" : ""}
  //                 />
  //                 {errors.sellingPrice && (
  //                   <p className="text-sm text-red-500 flex items-center gap-1">
  //                     <AlertCircle className="h-3 w-3" />
  //                     {errors.sellingPrice.message}
  //                   </p>
  //                 )}
  //               </div>

  //               <div className="space-y-2">
  //                 <Label htmlFor="actualPrice">Actual Price (₹)</Label>
  //                 <Input
  //                   id="actualPrice"
  //                   type="number"
  //                   step="0.01"
  //                   {...register("actualPrice", { valueAsNumber: true })}
  //                   placeholder="399"
  //                   className={errors.actualPrice ? "border-red-500" : ""}
  //                 />
  //                 {errors.actualPrice && (
  //                   <p className="text-sm text-red-500 flex items-center gap-1">
  //                     <AlertCircle className="h-3 w-3" />
  //                     {errors.actualPrice.message}
  //                   </p>
  //                 )}
  //               </div>

  //               <div className="space-y-2">
  //                 <Label htmlFor="inStock">Stock Quantity *</Label>
  //                 <Input
  //                   id="inStock"
  //                   type="number"
  //                   {...register("inStock", { valueAsNumber: true })}
  //                   placeholder="25"
  //                   className={errors.inStock ? "border-red-500" : ""}
  //                 />
  //                 {errors.inStock && (
  //                   <p className="text-sm text-red-500 flex items-center gap-1">
  //                     <AlertCircle className="h-3 w-3" />
  //                     {errors.inStock.message}
  //                   </p>
  //                 )}
  //               </div>
  //             </div>

  //             <div className="space-y-2">
  //               <Label htmlFor="description">Description</Label>
  //               <Textarea
  //                 id="description"
  //                 {...register("description")}
  //                 placeholder="Enter clothes description"
  //                 rows={3}
  //                 className={errors.description ? "border-red-500" : ""}
  //               />
  //               {errors.description && (
  //                 <p className="text-sm text-red-500 flex items-center gap-1">
  //                   <AlertCircle className="h-3 w-3" />
  //                   {errors.description.message}
  //                 </p>
  //               )}
  //             </div>

  //             <div className="space-y-2">
  //               <ImageGallery
  //                 images={watchedImages || []}
  //                 onImagesChange={(images) => setValue("images", images)}
  //                 maxImages={10}
  //                 acceptVideo={false}
  //               />
  //               {errors.images && (
  //                 <p className="text-sm text-red-500 flex items-center gap-1">
  //                   <AlertCircle className="h-3 w-3" />
  //                   {errors.images.message}
  //                 </p>
  //               )}
  //             </div>

  //             <div className="flex flex-col sm:flex-row justify-end gap-2">
  //               <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
  //                 Cancel
  //               </Button>
  //               <Button
  //                 type="submit"
  //                 disabled={isSubmitting}
  //                 className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
  //               >
  //                 {isSubmitting ? (
  //                   <>
  //                     <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
  //                     {isEditing ? "Updating..." : "Creating..."}
  //                   </>
  //                 ) : (
  //                   <>{isEditing ? "Update" : "Create"} Clothes</>
  //                 )}
  //               </Button>
  //             </div>
  //           </form>
  //         </DialogContent>
  //       </Dialog>

  //       {/* Help Dialog */}
  //       <HelpDialog schemaInfo={clothesSchemaInfo} />
  //     </div>
  //   </div>
  // )


  
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10 container mx-auto px-4 py-6 md:py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
              <Shirt className="h-8 w-8 text-purple-500" />
              Clothes Management
            </h1>
            <p className="text-muted-foreground mt-1">Manage baby clothes inventory</p>
          </div>
          <Button
            onClick={() => {
              resetForm()
              setIsDialogOpen(true)
            }}
            className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Clothes
          </Button>
        </div>

        {/* Search and Filter Section */}
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clothes by name, code, color, size, or description..."
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
                      {/* Category Filter */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Category</Label>
                        <div className="space-y-2">
                          {categoryOptions.map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                              <Checkbox
                                id={`filter-category-${category}`}
                                checked={filters.category.includes(category)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    updateFilter("category", [...filters.category, category])
                                  } else {
                                    updateFilter(
                                      "category",
                                      filters.category.filter((c) => c !== category),
                                    )
                                  }
                                }}
                              />
                              <Label htmlFor={`filter-category-${category}`} className="text-sm capitalize">
                                {category}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Age Group Filter */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Age Group</Label>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {ageGroupOptions.map((age) => (
                            <div key={age} className="flex items-center space-x-2">
                              <Checkbox
                                id={`filter-age-${age}`}
                                checked={filters.ageGroup.includes(age)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    updateFilter("ageGroup", [...filters.ageGroup, age])
                                  } else {
                                    updateFilter(
                                      "ageGroup",
                                      filters.ageGroup.filter((a) => a !== age),
                                    )
                                  }
                                }}
                              />
                              <Label htmlFor={`filter-age-${age}`} className="text-sm">
                                {age} years
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
                <span>Total: {clothes.length}</span>
                <span>Filtered: {filteredClothes.length}</span>
                <span>In Stock: {clothes.filter((c) => c.inStock > 0).length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clothes Table */}
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shirt className="h-5 w-5" />
              Clothes Inventory ({filteredClothes.length} items)
            </CardTitle>
          </CardHeader>
          <CardContent>
           


              <div className="block md:hidden space-y-4">
              {filteredClothes.map((item) => (
                <Card key={item._id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {item.images.length > 0 ? (
                        <Image
                          src={item.images[0] || "/placeholder.svg"}
                          alt={item.name}
                          width={140}
                          height={320}
                          className="rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-15 h-15 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Shirt className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-sm truncate">{item.name}</h3>
                          <p className="text-xs text-muted-foreground font-mono">{item.productCode}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.category.map((cat) => (
                              <Badge key={cat} variant="outline" className="text-xs">
                                {cat}
                              </Badge>
                            ))}
                          </div>
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
                          {item.actualPrice && item.actualPrice > item.sellingPrice && (
                            <span className="text-muted-foreground line-through ml-1">₹{item.actualPrice}</span>
                          )}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Stock: </span>
                          <Badge variant={getStockBadgeVariant(item.inStock)} className="text-xs">
                            {item.inStock}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Size: </span>
                          <span>{item.size}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Weight: </span>
                          <span>{item.weightInGrams}g</span>
                        </div>
                        {item.color && (
                          <div className="col-span-2">
                            <span className="text-muted-foreground">Color: </span>
                            <span>{item.color}</span>
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
                    <TableHead className="w-40">Image</TableHead>
                    <TableHead className="min-w-32">Code</TableHead>
                    <TableHead className="min-w-40">Name</TableHead>
                    <TableHead className="min-w-24">Category</TableHead>
                    <TableHead className="min-w-20">Size</TableHead>
                    <TableHead className="min-w-24">Price</TableHead>
                    <TableHead className="min-w-20">Stock</TableHead>
                    <TableHead className="min-w-20">Weight</TableHead>
                    <TableHead className="min-w-32">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClothes.map((item) => (
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
                            <Shirt className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium font-mono text-xs">{item.productCode}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          {item.color && <p className="text-xs text-muted-foreground">{item.color}</p>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {item.category.map((cat) => (
                            <Badge key={cat} variant="outline" className="text-xs">
                              {cat}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{item.size}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">₹{item.sellingPrice}</p>
                          {item.actualPrice && item.actualPrice > item.sellingPrice && (
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
            {filteredClothes.length === 0 && (
              <div className="text-center py-8">
                <Shirt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No clothes found</p>
                <p className="text-sm text-gray-400">
                  {hasActiveFilters() ? "Try adjusting your filters" : "Add your first clothes item to get started"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Clothes" : "Add New Clothes"}</DialogTitle>
              <DialogDescription>
                {isEditing ? "Update the clothes details" : "Fill in the details to add a new clothes item"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Clothes Name *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Enter clothes name"
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
                    placeholder="e.g., shirt_boy_1.1"
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

              {/* Category Selection */}
              <div className="space-y-2">
                <Label>Category *</Label>
                <div className="flex gap-4">
                  {categoryOptions.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={watchedCategory?.includes(category as "boy" | "girl") || false}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                      />
                      <Label htmlFor={`category-${category}`} className="capitalize">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.category && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Age Group Selection */}
              <div className="space-y-2">
                <Label>Age Group *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {ageGroupOptions.map((age) => (
                    <div key={age} className="flex items-center space-x-2">
                      <Checkbox
                        id={`age-${age}`}
                        checked={watchedAgeGroup?.includes(age as any) || false}
                        onCheckedChange={(checked) => handleAgeGroupChange(age, checked as boolean)}
                      />
                      <Label htmlFor={`age-${age}`} className="text-sm">
                        {age} years
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.ageGroup && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.ageGroup.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="size">Size *</Label>
                  <Input
                    id="size"
                    {...register("size")}
                    placeholder="e.g., 6-12 months"
                    className={errors.size ? "border-red-500" : ""}
                  />
                  {errors.size && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.size.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    {...register("color")}
                    placeholder="e.g., Blue"
                    className={errors.color ? "border-red-500" : ""}
                  />
                  {errors.color && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.color.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weightInGrams">Weight (grams) *</Label>
                  <Input
                    id="weightInGrams"
                    type="number"
                    {...register("weightInGrams", { valueAsNumber: true })}
                    placeholder="150"
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Enter clothes description"
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
                    <>{isEditing ? "Update" : "Create"} Clothes</>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Help Dialog */}
        <HelpDialog schemaInfo={clothesSchemaInfo} />
      </div>
    </div>
  )
}
