
// // //app/admin/products/toys/page.tsx
// // "use client"

// // import type React from "react"
// // import { useForm } from "react-hook-form"
// // import { zodResolver } from "@hookform/resolvers/zod"
// // import { useState, useEffect, useCallback } from "react"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Textarea } from "@/components/ui/textarea"
// // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// // import { Badge } from "@/components/ui/badge"
// // import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// // import { Plus, Edit, Trash2, Upload, X, Search, RefreshCw, ToyBrick } from "lucide-react"
// // import { AnimatedBackground } from "@/components/animated-background"
// // import { toast } from "react-hot-toast"
// // import Image from "next/image"
// // import { toySchema, type ToyFormData } from "@/lib/validations/product-schemas"
// // import { FormField } from "@/components/admin/form-field"
// // import { useProductValidation } from "@/hooks/use-product-validation"
// // import type { z } from "zod"

// // interface ToyItem {
// //   _id: string
// //   productCode: string
// //   name: string
// //   sellingPrice: number
// //   actualPrice: number
// //   inStock: number
// //   weightInGrams: number
// //   images: string[]
// //   description?: string
// //   createdAt: string
// //   updatedAt: string
// // }

// // export default function ToysManagement() {
// //   const { checkProductCodeUnique, clearValidationCache } = useProductValidation()
// //   const [formErrors, setFormErrors] = useState<Record<string, string>>({})
// //   const [isFormValid, setIsFormValid] = useState(false)
// //   const [toys, setToys] = useState<ToyItem[]>([])
// //   const [filteredToys, setFilteredToys] = useState<ToyItem[]>([])
// //   const [isLoading, setIsLoading] = useState(true)
// //   const [isDialogOpen, setIsDialogOpen] = useState(false)
// //   const [isEditing, setIsEditing] = useState(false)
// //   const [searchTerm, setSearchTerm] = useState("")
// //   const [selectedItem, setSelectedItem] = useState<ToyItem | null>(null)
// //   const [isUploading, setIsUploading] = useState(false)

// //   const [formData, setFormData] = useState<ToyFormData>({
// //     productCode: "",
// //     name: "",
// //     sellingPrice: 0,
// //     actualPrice: 0,
// //     inStock: 0,
// //     weightInGrams: 0,
// //     images: [],
// //     description: "",
// //   })

// //   const validateForm = useCallback(() => {
// //     try {
// //       toySchema.parse(formData)
// //       const hasErrors = Object.keys(formErrors).length > 0
// //       setIsFormValid(!hasErrors)
// //     } catch (error) {
// //       setIsFormValid(false)
// //     }
// //   }, [formData, formErrors])

// //   const form = useForm<z.infer<typeof toySchema>>({
// //     resolver: zodResolver(toySchema),
// //     defaultValues: {
// //       productCode: "",
// //       name: "",
// //       sellingPrice: 0,
// //       actualPrice: 0,
// //       inStock: 0,
// //       weightInGrams: 0,
// //       images: [],
// //       description: "",
// //     },
// //     mode: "onChange",
// //   })

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
// //     fetchToys()
// //   }, [])

// //   useEffect(() => {
// //     filterToys()
// //   }, [toys, searchTerm])

// //   const fetchToys = async () => {
// //     try {
// //       setIsLoading(true)
// //       const response = await fetch("/api/admin/products/toys")
// //       const data = await response.json()
// //       setToys(data)
// //     } catch (error) {
// //       console.error("Error fetching toys:", error)
// //       toast.error("Failed to fetch toys")
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const filterToys = () => {
// //     if (!searchTerm) {
// //       setFilteredToys(toys)
// //       return
// //     }

// //     const filtered = toys.filter(
// //       (item) =>
// //         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         item.productCode.toLowerCase().includes(searchTerm.toLowerCase()),
// //     )
// //     setFilteredToys(filtered)
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

// //   const resetForm = () => {
// //     setFormData({
// //       productCode: "",
// //       name: "",
// //       sellingPrice: 0,
// //       actualPrice: 0,
// //       inStock: 0,
// //       weightInGrams: 0,
// //       images: [],
// //       description: "",
// //     })
// //     setSelectedItem(null)
// //     setIsEditing(false)
// //     clearValidationCache()
// //     setFormErrors({})
// //     setIsFormValid(false)
// //   }

// //   const openEditDialog = (item: ToyItem) => {
// //     setSelectedItem(item)
// //     setFormData({
// //       productCode: item.productCode,
// //       name: item.name,
// //       sellingPrice: item.sellingPrice,
// //       actualPrice: item.actualPrice,
// //       inStock: item.inStock,
// //       weightInGrams: item.weightInGrams,
// //       images: item.images,
// //       description: item.description || "",
// //     })
// //     setIsEditing(true)
// //     setIsDialogOpen(true)
// //   }

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()

// //     // if (!isFormValid) {
// //     //   toast.error("Please fix the errors in the form.")
// //     //   return
// //     // }

// //     try {
// //       const url = isEditing ? `/api/admin/products/toys/${selectedItem?._id}` : "/api/admin/products/toys"
// //       const method = isEditing ? "PUT" : "POST"



// //       const response = await fetch(url, {
// //         method,
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(formData),
// //       })

// //       console.log("\nin fronteddn We are going to change in toys..",formData)

// //       if (response.ok) {
// //         toast.success(isEditing ? "Toy updated successfully" : "Toy created successfully")
// //         fetchToys()
// //         setIsDialogOpen(false)
// //         resetForm()
// //       } else {
// //         const errorData = await response.json()
// //         toast.error(errorData?.message || "Failed to save toy")
// //       }
// //     } catch (error) {
// //       console.error("Error saving toy:", error)
// //       toast.error("Failed to save toy")
// //     }
// //   }

// //   const handleDelete = async (id: string) => {
// //     if (!confirm("Are you sure you want to delete this toy?")) return

// //     try {
// //       const response = await fetch(`/api/admin/products/toys/${id}`, {
// //         method: "DELETE",
// //       })

// //       if (response.ok) {
// //         toast.success("Toy deleted successfully")
// //         fetchToys()
// //       } else {
// //         toast.error("Failed to delete toy")
// //       }
// //     } catch (error) {
// //       console.error("Error deleting toy:", error)
// //       toast.error("Failed to delete toy")
// //     }
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen relative">
// //         <AnimatedBackground />
// //         <div className="relative z-10 flex items-center justify-center min-h-screen">
// //           <div className="flex items-center gap-3 text-lg font-medium">
// //             <RefreshCw className="h-6 w-6 animate-spin text-pink-500" />
// //             Loading Toys...
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
// //               <ToyBrick className="h-8 w-8 text-purple-500" />
// //               Toys Management
// //             </h1>
// //             <p className="text-muted-foreground mt-1">Manage baby toys inventory</p>
// //           </div>
// //           <Button
// //             onClick={() => {
// //               resetForm()
// //               setIsDialogOpen(true)
// //             }}
// //             className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
// //           >
// //             <Plus className="h-4 w-4 mr-2" />
// //             Add New Toy
// //           </Button>
// //         </div>

// //         {/* Search and Stats */}
// //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
// //           <Card className="lg:col-span-3 border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
// //             <CardContent className="p-4">
// //               <div className="relative">
// //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
// //                 <Input
// //                   placeholder="Search toys by name or code..."
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
// //                 <p className="text-2xl font-bold text-purple-600">{toys.length}</p>
// //                 <p className="text-sm text-muted-foreground">Total Toys</p>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         {/* Toys Table */}
// //         <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
// //           <CardHeader>
// //             <CardTitle className="flex items-center gap-2">
// //               <ToyBrick className="h-5 w-5" />
// //               Toys Inventory ({filteredToys.length} items)
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
// //                     <TableHead>Price</TableHead>
// //                     <TableHead>Stock</TableHead>
// //                     <TableHead>Weight</TableHead>
// //                     <TableHead>Actions</TableHead>
// //                   </TableRow>
// //                 </TableHeader>
// //                 <TableBody>
// //                   {filteredToys.map((item) => (
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
// //                             <ToyBrick className="h-6 w-6 text-gray-400" />
// //                           </div>
// //                         )}
// //                       </TableCell>
// //                       <TableCell className="font-medium">{item.productCode}</TableCell>
// //                       <TableCell>{item.name}</TableCell>
// //                       <TableCell>
// //                         <div>
// //                           <p className="font-medium">₹{item.sellingPrice}</p>
// //                           {item.actualPrice > item.sellingPrice && (
// //                             <p className="text-xs text-muted-foreground line-through">₹{item.actualPrice}</p>
// //                           )}
// //                         </div>
// //                       </TableCell>
// //                       <TableCell>
// //                         <Badge variant={item.inStock > 5 ? "default" : item.inStock > 0 ? "secondary" : "destructive"}>
// //                           {item.inStock}
// //                         </Badge>
// //                       </TableCell>
// //                       <TableCell>{item.weightInGrams}g</TableCell>
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
// //           <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
// //             <DialogHeader>
// //               <DialogTitle>{isEditing ? "Edit Toy" : "Add New Toy"}</DialogTitle>
// //               <DialogDescription>
// //                 {isEditing ? "Update the toy details" : "Fill in the details to add a new toy"}
// //               </DialogDescription>
// //             </DialogHeader>

// //             <form onSubmit={handleSubmit} className="space-y-6">
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <FormField
// //                   control={form.control}
// //                   name="name"
// //                   label="Toy Name"
// //                   placeholder="Enter toy name"
// //                   error={formErrors["name"]}
// //                   onValidation={handleFieldValidation}
// //                   rules={{
// //                     required: "Toy name is required",
// //                   }}
// //                 />

// //                 <FormField
// //                   control={form.control}
// //                   name="productCode"
// //                   label="Product Code"
// //                   placeholder="Enter unique product code"
// //                   error={formErrors["productCode"]}
// //                   onValidation={async (fieldName, isValid, error) => {
// //                     handleFieldValidation(fieldName, isValid, error)
// //                     if (isValid && formData.productCode) {
// //                       const isUnique = await checkProductCodeUnique(formData.productCode, selectedItem?._id)
// //                       if (!isUnique) {
// //                         handleFieldValidation(fieldName, false, "Product code already exists")
// //                       }
// //                     }
// //                   }}
// //                   rules={{
// //                     required: "Product code is required",
// //                   }}
// //                 />
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                 <FormField
// //                   control={form.control}
// //                   name="sellingPrice"
// //                   label="Selling Price"
// //                   placeholder="Enter selling price"
// //                   type="number"
// //                   error={formErrors["sellingPrice"]}
// //                   onValidation={handleFieldValidation}
// //                   rules={{
// //                     required: "Selling price is required",
// //                     valueAsNumber: true,
// //                     min: {
// //                       value: 0,
// //                       message: "Selling price cannot be negative",
// //                     },
// //                   }}
// //                 />

// //                 <FormField
// //                   control={form.control}
// //                   name="actualPrice"
// //                   label="Actual Price (MRP)"
// //                   placeholder="Enter actual price"
// //                   type="number"
// //                   error={formErrors["actualPrice"]}
// //                   onValidation={handleFieldValidation}
// //                   rules={{
// //                     required: "Actual price is required",
// //                     valueAsNumber: true,
// //                     min: {
// //                       value: 0,
// //                       message: "Actual price cannot be negative",
// //                     },
// //                   }}
// //                 />

// //                 <FormField
// //                   control={form.control}
// //                   name="weightInGrams"
// //                   label="Weight (grams)"
// //                   placeholder="Enter weight"
// //                   type="number"
// //                   error={formErrors["weightInGrams"]}
// //                   onValidation={handleFieldValidation}
// //                   rules={{
// //                     required: "Weight is required",
// //                     valueAsNumber: true,
// //                     min: {
// //                       value: 0,
// //                       message: "Weight cannot be negative",
// //                     },
// //                   }}
// //                 />
// //               </div>

// //               <FormField
// //                 control={form.control}
// //                 name="inStock"
// //                 label="Stock Quantity"
// //                 placeholder="Enter stock quantity"
// //                 type="number"
// //                 error={formErrors["inStock"]}
// //                 onValidation={handleFieldValidation}
// //                 rules={{
// //                   required: "Stock quantity is required",
// //                   valueAsNumber: true,
// //                   min: {
// //                     value: 0,
// //                     message: "Stock quantity cannot be negative",
// //                   },
// //                 }}
// //               />

// //               <div>
// //                 <Label htmlFor="description">Description</Label>
// //                 <Textarea
// //                   id="description"
// //                   value={formData.description}
// //                   onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
// //                   placeholder="Enter toy description"
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
// //                   className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
// //                 >
// //                   {isEditing ? "Update" : "Create"} Toy
// //                 </Button>
// //               </div>
// //             </form>
// //           </DialogContent>
// //         </Dialog>
// //       </div>
// //     </div>
// //   )
// // }




// // // "use client"

// // // import type React from "react"
// // // import { useForm } from "react-hook-form"
// // // import { zodResolver } from "@hookform/resolvers/zod"
// // // import { useState, useEffect, useCallback } from "react"
// // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // // import { Button } from "@/components/ui/button"
// // // import { Input } from "@/components/ui/input"
// // // import { Label } from "@/components/ui/label"
// // // import { Textarea } from "@/components/ui/textarea"
// // // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// // // import { Badge } from "@/components/ui/badge"
// // // import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// // // import { Plus, Edit, Trash2, Upload, X, Search, RefreshCw, ToyBrick } from "lucide-react"
// // // import { AnimatedBackground } from "@/components/animated-background"
// // // import { toast } from "react-hot-toast"
// // // import Image from "next/image"
// // // import { toySchema, type ToyFormData } from "@/lib/validations/product-schemas"
// // // import { FormField } from "@/components/admin/form-field"
// // // import { useProductValidation } from "@/hooks/use-product-validation"
// // // import type { z } from "zod"

// // // interface ToyItem {
// // //   _id: string
// // //   productCode: string
// // //   name: string
// // //   sellingPrice: number
// // //   actualPrice: number
// // //   inStock: number
// // //   weightInGrams: number
// // //   images: string[]
// // //   description?: string
// // //   createdAt: string
// // //   updatedAt: string
// // // }

// // // export default function ToysManagement() {
// // //   const { checkProductCodeUnique, clearValidationCache } = useProductValidation()
// // //   const [formErrors, setFormErrors] = useState<Record<string, string>>({})
// // //   const [isFormValid, setIsFormValid] = useState(false)
// // //   const [toys, setToys] = useState<ToyItem[]>([])
// // //   const [filteredToys, setFilteredToys] = useState<ToyItem[]>([])
// // //   const [isLoading, setIsLoading] = useState(true)
// // //   const [isDialogOpen, setIsDialogOpen] = useState(false)
// // //   const [isEditing, setIsEditing] = useState(false)
// // //   const [searchTerm, setSearchTerm] = useState("")
// // //   const [selectedItem, setSelectedItem] = useState<ToyItem | null>(null)
// // //   const [isUploading, setIsUploading] = useState(false)

// // //   const [formData, setFormData] = useState<ToyFormData>({
// // //     productCode: "",
// // //     name: "",
// // //     sellingPrice: 0,
// // //     actualPrice: 0,
// // //     inStock: 0,
// // //     weightInGrams: 0,
// // //     images: [],
// // //     description: "",
// // //   })

// // //   const validateForm = useCallback(() => {
// // //     try {
// // //       toySchema.parse(formData)
// // //       const hasErrors = Object.keys(formErrors).length > 0
// // //       setIsFormValid(!hasErrors)
// // //     } catch (error) {
// // //       setIsFormValid(false)
// // //     }
// // //   }, [formData, formErrors])

// // //   const form = useForm<z.infer<typeof toySchema>>({
// // //     resolver: zodResolver(toySchema),
// // //     defaultValues: {
// // //       productCode: "",
// // //       name: "",
// // //       sellingPrice: 0,
// // //       actualPrice: 0,
// // //       inStock: 0,
// // //       weightInGrams: 0,
// // //       images: [],
// // //       description: "",
// // //     },
// // //     mode: "onChange",
// // //   })

// // //   useEffect(() => {
// // //     validateForm()
// // //   }, [validateForm])

// // //   const handleFieldValidation = useCallback((fieldName: string, isValid: boolean, error?: string) => {
// // //     setFormErrors((prev) => {
// // //       const newErrors = { ...prev }
// // //       if (isValid) {
// // //         delete newErrors[fieldName]
// // //       } else if (error) {
// // //         newErrors[fieldName] = error
// // //       }
// // //       return newErrors
// // //     })
// // //   }, [])

// // //   useEffect(() => {
// // //     fetchToys()
// // //   }, [])

// // //   useEffect(() => {
// // //     filterToys()
// // //   }, [toys, searchTerm])

// // //   const fetchToys = async () => {
// // //     try {
// // //       setIsLoading(true)
// // //       const response = await fetch("/api/admin/products/toys")
// // //       const data = await response.json()
// // //       setToys(data)
// // //     } catch (error) {
// // //       console.error("Error fetching toys:", error)
// // //       toast.error("Failed to fetch toys")
// // //     } finally {
// // //       setIsLoading(false)
// // //     }
// // //   }

// // //   const filterToys = () => {
// // //     if (!searchTerm) {
// // //       setFilteredToys(toys)
// // //       return
// // //     }

// // //     const filtered = toys.filter(
// // //       (item) =>
// // //         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //         item.productCode.toLowerCase().includes(searchTerm.toLowerCase()),
// // //     )
// // //     setFilteredToys(filtered)
// // //   }

// // //   const uploadToCloudinary = async (file: File): Promise<string> => {
// // //     const formData = new FormData()
// // //     formData.append("file", file)
// // //     formData.append("upload_preset", "mahadev_baby_shop")

// // //     const response = await fetch(
// // //       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
// // //       {
// // //         method: "POST",
// // //         body: formData,
// // //       },
// // //     )

// // //     const data = await response.json()
// // //     return data.secure_url
// // //   }

// // //   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const files = Array.from(e.target.files || [])
// // //     if (files.length === 0) return

// // //     setIsUploading(true)
// // //     try {
// // //       const uploadPromises = files.map(uploadToCloudinary)
// // //       const imageUrls = await Promise.all(uploadPromises)

// // //       setFormData((prev) => ({
// // //         ...prev,
// // //         images: [...prev.images, ...imageUrls],
// // //       }))
// // //       toast.success("Images uploaded successfully")
// // //     } catch (error) {
// // //       console.error("Error uploading images:", error)
// // //       toast.error("Failed to upload images")
// // //     } finally {
// // //       setIsUploading(false)
// // //     }
// // //   }

// // //   const removeImage = (index: number) => {
// // //     setFormData((prev) => ({
// // //       ...prev,
// // //       images: prev.images.filter((_, i) => i !== index),
// // //     }))
// // //   }

// // //   const resetForm = () => {
// // //     setFormData({
// // //       productCode: "",
// // //       name: "",
// // //       sellingPrice: 0,
// // //       actualPrice: 0,
// // //       inStock: 0,
// // //       weightInGrams: 0,
// // //       images: [],
// // //       description: "",
// // //     })
// // //     setSelectedItem(null)
// // //     setIsEditing(false)
// // //     clearValidationCache()
// // //     setFormErrors({})
// // //     setIsFormValid(false)
// // //   }

// // //   const openEditDialog = (item: ToyItem) => {
// // //     setSelectedItem(item)
// // //     setFormData({
// // //       productCode: item.productCode,
// // //       name: item.name,
// // //       sellingPrice: item.sellingPrice,
// // //       actualPrice: item.actualPrice,
// // //       inStock: item.inStock,
// // //       weightInGrams: item.weightInGrams,
// // //       images: item.images,
// // //       description: item.description || "",
// // //     })
// // //     setIsEditing(true)
// // //     setIsDialogOpen(true)
// // //   }

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault()

// // //     // if (!isFormValid) {
// // //     //   toast.error("Please fix the errors in the form.")
// // //     //   return
// // //     // }

// // //     try {
// // //       const url = isEditing ? `/api/admin/products/toys/${selectedItem?._id}` : "/api/admin/products/toys"
// // //       const method = isEditing ? "PUT" : "POST"



// // //       const response = await fetch(url, {
// // //         method,
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(formData),
// // //       })

// // //       console.log("\nin fronteddn We are going to change in toys..",formData)

// // //       if (response.ok) {
// // //         toast.success(isEditing ? "Toy updated successfully" : "Toy created successfully")
// // //         fetchToys()
// // //         setIsDialogOpen(false)
// // //         resetForm()
// // //       } else {
// // //         const errorData = await response.json()
// // //         toast.error(errorData?.message || "Failed to save toy")
// // //       }
// // //     } catch (error) {
// // //       console.error("Error saving toy:", error)
// // //       toast.error("Failed to save toy")
// // //     }
// // //   }

// // //   const handleDelete = async (id: string) => {
// // //     if (!confirm("Are you sure you want to delete this toy?")) return

// // //     try {
// // //       const response = await fetch(`/api/admin/products/toys/${id}`, {
// // //         method: "DELETE",
// // //       })

// // //       if (response.ok) {
// // //         toast.success("Toy deleted successfully")
// // //         fetchToys()
// // //       } else {
// // //         toast.error("Failed to delete toy")
// // //       }
// // //     } catch (error) {
// // //       console.error("Error deleting toy:", error)
// // //       toast.error("Failed to delete toy")
// // //     }
// // //   }

// // //   if (isLoading) {
// // //     return (
// // //       <div className="min-h-screen relative">
// // //         <AnimatedBackground />
// // //         <div className="relative z-10 flex items-center justify-center min-h-screen">
// // //           <div className="flex items-center gap-3 text-lg font-medium">
// // //             <RefreshCw className="h-6 w-6 animate-spin text-pink-500" />
// // //             Loading Toys...
// // //           </div>
// // //         </div>
// // //       </div>
// // //     )
// // //   }

// // //   return (
// // //     <div className="min-h-screen relative">
// // //       <AnimatedBackground />

// // //       <div className="relative z-10 container mx-auto px-4 py-6 md:py-8 space-y-6">
// // //         {/* Header */}
// // //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // //           <div>
// // //             <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
// // //               <ToyBrick className="h-8 w-8 text-purple-500" />
// // //               Toys Management
// // //             </h1>
// // //             <p className="text-muted-foreground mt-1">Manage baby toys inventory</p>
// // //           </div>
// // //           <Button
// // //             onClick={() => {
// // //               resetForm()
// // //               setIsDialogOpen(true)
// // //             }}
// // //             className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
// // //           >
// // //             <Plus className="h-4 w-4 mr-2" />
// // //             Add New Toy
// // //           </Button>
// // //         </div>

// // //         {/* Search and Stats */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
// // //           <Card className="lg:col-span-3 border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
// // //             <CardContent className="p-4">
// // //               <div className="relative">
// // //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
// // //                 <Input
// // //                   placeholder="Search toys by name or code..."
// // //                   value={searchTerm}
// // //                   onChange={(e) => setSearchTerm(e.target.value)}
// // //                   className="pl-10 rounded-xl"
// // //                 />
// // //               </div>
// // //             </CardContent>
// // //           </Card>

// // //           <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
// // //             <CardContent className="p-4">
// // //               <div className="text-center">
// // //                 <p className="text-2xl font-bold text-purple-600">{toys.length}</p>
// // //                 <p className="text-sm text-muted-foreground">Total Toys</p>
// // //               </div>
// // //             </CardContent>
// // //           </Card>
// // //         </div>

// // //         {/* Toys Table */}
// // //         <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
// // //           <CardHeader>
// // //             <CardTitle className="flex items-center gap-2">
// // //               <ToyBrick className="h-5 w-5" />
// // //               Toys Inventory ({filteredToys.length} items)
// // //             </CardTitle>
// // //           </CardHeader>
// // //           <CardContent>
// // //             <div className="overflow-x-auto">
// // //               <Table>
// // //                 <TableHeader>
// // //                   <TableRow>
// // //                     <TableHead>Image</TableHead>
// // //                     <TableHead>Product Code</TableHead>
// // //                     <TableHead>Name</TableHead>
// // //                     <TableHead>Price</TableHead>
// // //                     <TableHead>Stock</TableHead>
// // //                     <TableHead>Weight</TableHead>
// // //                     <TableHead>Actions</TableHead>
// // //                   </TableRow>
// // //                 </TableHeader>
// // //                 <TableBody>
// // //                   {filteredToys.map((item) => (
// // //                     <TableRow key={item._id}>
// // //                       <TableCell>
// // //                         {item.images.length > 0 ? (
// // //                           <Image
// // //                             src={item.images[0] || "/placeholder.svg"}
// // //                             alt={item.name}
// // //                             width={50}
// // //                             height={50}
// // //                             className="rounded-lg object-cover"
// // //                           />
// // //                         ) : (
// // //                           <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
// // //                             <ToyBrick className="h-6 w-6 text-gray-400" />
// // //                           </div>
// // //                         )}
// // //                       </TableCell>
// // //                       <TableCell className="font-medium">{item.productCode}</TableCell>
// // //                       <TableCell>{item.name}</TableCell>
// // //                       <TableCell>
// // //                         <div>
// // //                           <p className="font-medium">₹{item.sellingPrice}</p>
// // //                           {item.actualPrice > item.sellingPrice && (
// // //                             <p className="text-xs text-muted-foreground line-through">₹{item.actualPrice}</p>
// // //                           )}
// // //                         </div>
// // //                       </TableCell>
// // //                       <TableCell>
// // //                         <Badge variant={item.inStock > 5 ? "default" : item.inStock > 0 ? "secondary" : "destructive"}>
// // //                           {item.inStock}
// // //                         </Badge>
// // //                       </TableCell>
// // //                       <TableCell>{item.weightInGrams}g</TableCell>
// // //                       <TableCell>
// // //                         <div className="flex gap-2">
// // //                           <Button variant="outline" size="sm" onClick={() => openEditDialog(item)}>
// // //                             <Edit className="h-4 w-4" />
// // //                           </Button>
// // //                           <Button variant="outline" size="sm" onClick={() => handleDelete(item._id)}>
// // //                             <Trash2 className="h-4 w-4" />
// // //                           </Button>
// // //                         </div>
// // //                       </TableCell>
// // //                     </TableRow>
// // //                   ))}
// // //                 </TableBody>
// // //               </Table>
// // //             </div>
// // //           </CardContent>
// // //         </Card>

// // //         {/* Add/Edit Dialog */}
// // //         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
// // //           <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
// // //             <DialogHeader>
// // //               <DialogTitle>{isEditing ? "Edit Toy" : "Add New Toy"}</DialogTitle>
// // //               <DialogDescription>
// // //                 {isEditing ? "Update the toy details" : "Fill in the details to add a new toy"}
// // //               </DialogDescription>
// // //             </DialogHeader>

// // //            <form onSubmit={handleSubmit} className="space-y-6">
// // //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //     <FormField
// // //       name="name"
// // //       label="Toy Name"
// // //       placeholder="Enter toy name"
// // //       value={formData.name}
// // //       onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
// // //       error={formErrors["name"]}
// // //       onValidation={handleFieldValidation}
// // //     />

// // //     <FormField
// // //       name="productCode"
// // //       label="Product Code"
// // //       placeholder="Enter unique product code"
// // //       value={formData.productCode}
// // //       onChange={(value) => setFormData((prev) => ({ ...prev, productCode: value }))}
// // //       error={formErrors["productCode"]}
// // //       onValidation={async (fieldName, isValid, error) => {
// // //         handleFieldValidation(fieldName, isValid, error)
// // //         if (isValid && formData.productCode) {
// // //           const isUnique = await checkProductCodeUnique(formData.productCode, selectedItem?._id)
// // //           if (!isUnique) {
// // //             handleFieldValidation(fieldName, false, "Product code already exists")
// // //           }
// // //         }
// // //       }}
// // //     />
// // //   </div>

// // //   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //     <FormField
// // //       name="sellingPrice"
// // //       label="Selling Price"
// // //       type="number"
// // //       placeholder="Enter selling price"
// // //       value={formData.sellingPrice}
// // //       onChange={(value) => setFormData((prev) => ({ ...prev, sellingPrice: value }))}
// // //       error={formErrors["sellingPrice"]}
// // //       onValidation={handleFieldValidation}
// // //     />

// // //     <FormField
// // //       name="actualPrice"
// // //       label="Actual Price (MRP)"
// // //       type="number"
// // //       placeholder="Enter actual price"
// // //       value={formData.actualPrice}
// // //       onChange={(value) => setFormData((prev) => ({ ...prev, actualPrice: value }))}
// // //       error={formErrors["actualPrice"]}
// // //       onValidation={handleFieldValidation}
// // //     />

// // //     <FormField
// // //       name="weightInGrams"
// // //       label="Weight (grams)"
// // //       type="number"
// // //       placeholder="Enter weight"
// // //       value={formData.weightInGrams}
// // //       onChange={(value) => setFormData((prev) => ({ ...prev, weightInGrams: value }))}
// // //       error={formErrors["weightInGrams"]}
// // //       onValidation={handleFieldValidation}
// // //     />
// // //   </div>

// // //   <FormField
// // //     name="inStock"
// // //     label="Stock Quantity"
// // //     type="number"
// // //     placeholder="Enter stock quantity"
// // //     value={formData.inStock}
// // //     onChange={(value) => setFormData((prev) => ({ ...prev, inStock: value }))}
// // //     error={formErrors["inStock"]}
// // //     onValidation={handleFieldValidation}
// // //   />

// // //   <div>
// // //     <Label htmlFor="description">Description</Label>
// // //     <Textarea
// // //       id="description"
// // //       value={formData.description}
// // //       onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
// // //       placeholder="Enter toy description"
// // //       rows={3}
// // //     />
// // //   </div>

// // //               <div>
// // //                 <Label>Product Images</Label>
// // //                 <div className="mt-2">
// // //                   <div className="flex items-center gap-4 mb-4">
// // //                     <Button
// // //                       type="button"
// // //                       variant="outline"
// // //                       onClick={() => document.getElementById("image-upload")?.click()}
// // //                       disabled={isUploading}
// // //                       className="rounded-xl"
// // //                     >
// // //                       <Upload className="h-4 w-4 mr-2" />
// // //                       {isUploading ? "Uploading..." : "Upload Images"}
// // //                     </Button>
// // //                     <input
// // //                       id="image-upload"
// // //                       type="file"
// // //                       multiple
// // //                       accept="image/*"
// // //                       onChange={handleImageUpload}
// // //                       className="hidden"
// // //                     />
// // //                   </div>

// // //                   {formData.images.length > 0 && (
// // //                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// // //                       {formData.images.map((image, index) => (
// // //                         <div key={index} className="relative">
// // //                           <Image
// // //                             src={image || "/placeholder.svg"}
// // //                             alt={`Product image ${index + 1}`}
// // //                             width={150}
// // //                             height={150}
// // //                             className="rounded-lg object-cover w-full h-32"
// // //                           />
// // //                           <Button
// // //                             type="button"
// // //                             variant="destructive"
// // //                             size="sm"
// // //                             onClick={() => removeImage(index)}
// // //                             className="absolute top-2 right-2 h-6 w-6 p-0"
// // //                           >
// // //                             <X className="h-4 w-4" />
// // //                           </Button>
// // //                         </div>
// // //                       ))}
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </div>

// // //               <div className="flex justify-end gap-2">
// // //                 <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
// // //                   Cancel
// // //                 </Button>
// // //                 <Button
// // //                   type="submit"
// // //                   className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
// // //                 >
// // //                   {isEditing ? "Update" : "Create"} Toy
// // //                 </Button>
// // //               </div>
// // //             </form>
// // //           </DialogContent>
// // //         </Dialog>
// // //       </div>
// // //     </div>
// // //   )
// // // }









// // //C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\app\admin\products\toys\page.tsx
// // "use client"

// // import { useState, useEffect } from "react"
// // import { useForm } from "react-hook-form"
// // import { zodResolver } from "@hookform/resolvers/zod"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Textarea } from "@/components/ui/textarea"
// // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// // import { Badge } from "@/components/ui/badge"
// // import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// // import { Plus, Edit, Trash2, Search, RefreshCw, ToyBrick, AlertCircle } from "lucide-react"
// // import { AnimatedBackground } from "@/components/animated-background"
// // import { toast } from "react-hot-toast"
// // import Image from "next/image"
// // // import { toySchema, toySchemaInfo, type ToyFormData } from "@/lib/validations/toy-schema"
// // // import { ImageGallery } from "@/components/admin/image-gallery"
// // // import { HelpDialog } from "@/components/admin/help-dialog"
// // // import { checkProductCodeUnique } from "@/lib/utils/stock-sync"

// // import { toySchema, type ToyFormData } from "@/lib/validations/toy-schema"
// // import { ImageGallery } from "@/components/admin/image-gallery"
// // import { HelpDialog } from "@/components/admin/help-dialog"
// // import { checkProductCodeUnique } from "@/lib/utils/stock-sync"



// // interface ToyItem {
// //   _id: string
// //   productCode: string
// //   name: string
// //   sellingPrice: number
// //   actualPrice: number
// //   inStock: number
// //   weightInGrams: number
// //   images: string[]
// //   description?: string
// //   createdAt: string
// //   updatedAt: string
// // }

// // export default function ToysManagement() {
// //   const [toys, setToys] = useState<ToyItem[]>([])
// //   const [filteredToys, setFilteredToys] = useState<ToyItem[]>([])
// //   const [isLoading, setIsLoading] = useState(true)
// //   const [isDialogOpen, setIsDialogOpen] = useState(false)
// //   const [isEditing, setIsEditing] = useState(false)
// //   const [searchTerm, setSearchTerm] = useState("")
// //   const [selectedItem, setSelectedItem] = useState<ToyItem | null>(null)
// //   const [isSubmitting, setIsSubmitting] = useState(false)

// //   const form = useForm<ToyFormData>({
// //     resolver: zodResolver(toySchema),
// //     defaultValues: {
// //       productCode: "",
// //       name: "",
// //       sellingPrice: 0,
// //       actualPrice: 0,
// //       inStock: 0,
// //       weightInGrams: 0,
// //       images: [],
// //       description: "",
// //     },
// //     mode: "onChange",
// //   })

// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //     reset,
// //     setValue,
// //     watch,
// //   } = form
// //   const watchedImages = watch("images")

// //   useEffect(() => {
// //     fetchToys()
// //   }, [])

// //   useEffect(() => {
// //     filterToys()
// //   }, [toys, searchTerm])

// //   const fetchToys = async () => {
// //     try {
// //       setIsLoading(true)
// //       const response = await fetch("/api/admin/products/toys")
// //       if (!response.ok) throw new Error("Failed to fetch")
// //       const data = await response.json()
// //       setToys(data.data || [])
// //     } catch (error) {
// //       console.error("Error fetching toys:", error)
// //       toast.error("Failed to fetch toys")
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const filterToys = () => {
// //     if (!searchTerm) {
// //       setFilteredToys(toys)
// //       return
// //     }
// //     const filtered = toys.filter(
// //       (item) =>
// //         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         item.productCode.toLowerCase().includes(searchTerm.toLowerCase()),
// //     )
// //     setFilteredToys(filtered)
// //   }

// //   const resetForm = () => {
// //     reset()
// //     setSelectedItem(null)
// //     setIsEditing(false)
// //   }

// //   const openEditDialog = (item: ToyItem) => {
// //     setSelectedItem(item)
// //     reset({
// //       productCode: item.productCode,
// //       name: item.name,
// //       sellingPrice: item.sellingPrice,
// //       actualPrice: item.actualPrice,
// //       inStock: item.inStock,
// //       weightInGrams: item.weightInGrams,
// //       images: item.images,
// //       description: item.description || "",
// //     })
// //     setIsEditing(true)
// //     setIsDialogOpen(true)
// //   }

// //   const onSubmit = async (data: ToyFormData) => {
// //     setIsSubmitting(true)
// //     try {
// //       // Check product code uniqueness for new products
// //       if (!isEditing) {
// //         const isUnique = await checkProductCodeUnique(data.productCode)
// //         if (!isUnique) {
// //           toast.error("Product code already exists")
// //           return
// //         }
// //       }

// //       const url = isEditing ? `/api/admin/products/toys/${selectedItem?._id}` : "/api/admin/products/toys"
// //       const method = isEditing ? "PUT" : "POST"

// //       const response = await fetch(url, {
// //         method,
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(data),
// //       })

// //       if (!response.ok) {
// //         const errorData = await response.json()
// //         throw new Error(errorData.message || "Failed to save")
// //       }

// //       toast.success(isEditing ? "Toy updated successfully" : "Toy created successfully")
// //       fetchToys()
// //       setIsDialogOpen(false)
// //       resetForm()
// //     } catch (error: any) {
// //       console.error("Error saving toy:", error)
// //       toast.error(error.message || "Failed to save toy")
// //     } finally {
// //       setIsSubmitting(false)
// //     }
// //   }

// //   const handleDelete = async (id: string, productCode: string) => {
// //     if (!confirm("Are you sure you want to delete this toy? This will also remove it from stock management.")) return

// //     try {
// //       const response = await fetch(`/api/admin/products/toys/${id}`, {
// //         method: "DELETE",
// //       })

// //       if (!response.ok) throw new Error("Failed to delete")

// //       toast.success("Toy deleted successfully")
// //       fetchToys()
// //     } catch (error) {
// //       console.error("Error deleting toy:", error)
// //       toast.error("Failed to delete toy")
// //     }
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen relative">
// //         <AnimatedBackground />
// //         <div className="relative z-10 flex items-center justify-center min-h-screen">
// //           <div className="flex items-center gap-3 text-lg font-medium">
// //             <RefreshCw className="h-6 w-6 animate-spin text-pink-500" />
// //             Loading Toys...
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
// //               <ToyBrick className="h-8 w-8 text-purple-500" />
// //               Toys Management
// //             </h1>
// //             <p className="text-muted-foreground mt-1">Manage baby toys inventory</p>
// //           </div>
// //           <Button
// //             onClick={() => {
// //               resetForm()
// //               setIsDialogOpen(true)
// //             }}
// //             className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
// //           >
// //             <Plus className="h-4 w-4 mr-2" />
// //             Add New Toy
// //           </Button>
// //         </div>

// //         {/* Search and Stats */}
// //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
// //           <Card className="lg:col-span-3 border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
// //             <CardContent className="p-4">
// //               <div className="relative">
// //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
// //                 <Input
// //                   placeholder="Search toys by name or code..."
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
// //                 <p className="text-2xl font-bold text-purple-600">{toys.length}</p>
// //                 <p className="text-sm text-muted-foreground">Total Toys</p>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         {/* Toys Table */}
// //         <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
// //           <CardHeader>
// //             <CardTitle className="flex items-center gap-2">
// //               <ToyBrick className="h-5 w-5" />
// //               Toys Inventory ({filteredToys.length} items)
// //             </CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="overflow-x-auto">
// //               <Table>
// //                 <TableHeader>
// //                   <TableRow>
// //                     <TableHead className="w-20">Image</TableHead>
// //                     <TableHead className="min-w-32">Code</TableHead>
// //                     <TableHead className="min-w-40">Name</TableHead>
// //                     <TableHead className="min-w-24">Price</TableHead>
// //                     <TableHead className="min-w-20">Stock</TableHead>
// //                     <TableHead className="min-w-20">Weight</TableHead>
// //                     <TableHead className="min-w-32">Actions</TableHead>
// //                   </TableRow>
// //                 </TableHeader>
// //                 <TableBody>
// //                   {filteredToys.map((item) => (
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
// //                             <ToyBrick className="h-6 w-6 text-gray-400" />
// //                           </div>
// //                         )}
// //                       </TableCell>
// //                       <TableCell className="font-medium font-mono text-xs">{item.productCode}</TableCell>
// //                       <TableCell className="font-medium">{item.name}</TableCell>
// //                       <TableCell>
// //                         <div>
// //                           <p className="font-medium">₹{item.sellingPrice}</p>
// //                           {item.actualPrice > item.sellingPrice && (
// //                             <p className="text-xs text-muted-foreground line-through">₹{item.actualPrice}</p>
// //                           )}
// //                         </div>
// //                       </TableCell>
// //                       <TableCell>
// //                         <Badge variant={item.inStock > 10 ? "default" : item.inStock > 0 ? "secondary" : "destructive"}>
// //                           {item.inStock}
// //                         </Badge>
// //                       </TableCell>
// //                       <TableCell className="text-sm">{item.weightInGrams}g</TableCell>
// //                       <TableCell>
// //                         <div className="flex gap-1">
// //                           <Button
// //                             variant="outline"
// //                             size="sm"
// //                             onClick={() => openEditDialog(item)}
// //                             className="h-8 w-8 p-0"
// //                           >
// //                             <Edit className="h-3 w-3" />
// //                           </Button>
// //                           <Button
// //                             variant="outline"
// //                             size="sm"
// //                             onClick={() => handleDelete(item._id, item.productCode)}
// //                             className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
// //                           >
// //                             <Trash2 className="h-3 w-3" />
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
// //               <DialogTitle>{isEditing ? "Edit Toy" : "Add New Toy"}</DialogTitle>
// //               <DialogDescription>
// //                 {isEditing ? "Update the toy details" : "Fill in the details to add a new toy"}
// //               </DialogDescription>
// //             </DialogHeader>

// //             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div className="space-y-2">
// //                   <Label htmlFor="name">Toy Name *</Label>
// //                   <Input
// //                     id="name"
// //                     {...register("name")}
// //                     placeholder="Enter toy name"
// //                     className={errors.name ? "border-red-500" : ""}
// //                   />
// //                   {errors.name && (
// //                     <p className="text-sm text-red-500 flex items-center gap-1">
// //                       <AlertCircle className="h-3 w-3" />
// //                       {errors.name.message}
// //                     </p>
// //                   )}
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label htmlFor="productCode">Product Code *</Label>
// //                   <Input
// //                     id="productCode"
// //                     {...register("productCode")}
// //                     placeholder="e.g., toycar1.1"
// //                     className={errors.productCode ? "border-red-500" : ""}
// //                     disabled={isEditing} // Can't change product code during edit
// //                   />
// //                   {errors.productCode && (
// //                     <p className="text-sm text-red-500 flex items-center gap-1">
// //                       <AlertCircle className="h-3 w-3" />
// //                       {errors.productCode.message}
// //                     </p>
// //                   )}
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                 <div className="space-y-2">
// //                   <Label htmlFor="sellingPrice">Selling Price (₹) *</Label>
// //                   <Input
// //                     id="sellingPrice"
// //                     type="number"
// //                     step="0.01"
// //                     {...register("sellingPrice", { valueAsNumber: true })}
// //                     placeholder="299"
// //                     className={errors.sellingPrice ? "border-red-500" : ""}
// //                   />
// //                   {errors.sellingPrice && (
// //                     <p className="text-sm text-red-500 flex items-center gap-1">
// //                       <AlertCircle className="h-3 w-3" />
// //                       {errors.sellingPrice.message}
// //                     </p>
// //                   )}
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label htmlFor="actualPrice">Actual Price (₹) *</Label>
// //                   <Input
// //                     id="actualPrice"
// //                     type="number"
// //                     step="0.01"
// //                     {...register("actualPrice", { valueAsNumber: true })}
// //                     placeholder="399"
// //                     className={errors.actualPrice ? "border-red-500" : ""}
// //                   />
// //                   {errors.actualPrice && (
// //                     <p className="text-sm text-red-500 flex items-center gap-1">
// //                       <AlertCircle className="h-3 w-3" />
// //                       {errors.actualPrice.message}
// //                     </p>
// //                   )}
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label htmlFor="weightInGrams">Weight (grams) *</Label>
// //                   <Input
// //                     id="weightInGrams"
// //                     type="number"
// //                     {...register("weightInGrams", { valueAsNumber: true })}
// //                     placeholder="250"
// //                     className={errors.weightInGrams ? "border-red-500" : ""}
// //                   />
// //                   {errors.weightInGrams && (
// //                     <p className="text-sm text-red-500 flex items-center gap-1">
// //                       <AlertCircle className="h-3 w-3" />
// //                       {errors.weightInGrams.message}
// //                     </p>
// //                   )}
// //                 </div>
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="inStock">Stock Quantity *</Label>
// //                 <Input
// //                   id="inStock"
// //                   type="number"
// //                   {...register("inStock", { valueAsNumber: true })}
// //                   placeholder="25"
// //                   className={errors.inStock ? "border-red-500" : ""}
// //                 />
// //                 {errors.inStock && (
// //                   <p className="text-sm text-red-500 flex items-center gap-1">
// //                     <AlertCircle className="h-3 w-3" />
// //                     {errors.inStock.message}
// //                   </p>
// //                 )}
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="description">Description</Label>
// //                 <Textarea
// //                   id="description"
// //                   {...register("description")}
// //                   placeholder="Enter toy description"
// //                   rows={3}
// //                   className={errors.description ? "border-red-500" : ""}
// //                 />
// //                 {errors.description && (
// //                   <p className="text-sm text-red-500 flex items-center gap-1">
// //                     <AlertCircle className="h-3 w-3" />
// //                     {errors.description.message}
// //                   </p>
// //                 )}
// //               </div>

// //               <div className="space-y-2">
// //                 <ImageGallery
// //                   images={watchedImages || []}
// //                   onImagesChange={(images) => setValue("images", images)}
// //                   maxImages={10}
// //                   acceptVideo={false}
// //                 />
// //                 {errors.images && (
// //                   <p className="text-sm text-red-500 flex items-center gap-1">
// //                     <AlertCircle className="h-3 w-3" />
// //                     {errors.images.message}
// //                   </p>
// //                 )}
// //               </div>

// //               <div className="flex flex-col sm:flex-row justify-end gap-2">
// //                 <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
// //                   Cancel
// //                 </Button>
// //                 <Button
// //                   type="submit"
// //                   disabled={isSubmitting}
// //                   className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
// //                 >
// //                   {isSubmitting ? (
// //                     <>
// //                       <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
// //                       {isEditing ? "Updating..." : "Creating..."}
// //                     </>
// //                   ) : (
// //                     <>{isEditing ? "Update" : "Create"} Toy</>
// //                   )}
// //                 </Button>
// //               </div>
// //             </form>
// //           </DialogContent>
// //         </Dialog>

// //         {/* Help Dialog */}
// //         {/* <HelpDialog schemaInfo={toySchemaInfo} /> */}
// //       </div>
// //     </div>
// //   )
// // }



// // //C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\app\admin\products\toys\page.tsx
// // "use client"

// // import { useState, useEffect } from "react"
// // import { useForm } from "react-hook-form"
// // import { zodResolver } from "@hookform/resolvers/zod"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Textarea } from "@/components/ui/textarea"
// // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// // import { Badge } from "@/components/ui/badge"
// // import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// // import { Plus, Edit, Trash2, Search, RefreshCw, ToyBrick, AlertCircle } from "lucide-react"
// // import { AnimatedBackground } from "@/components/animated-background"
// // import { toast } from "react-hot-toast"
// // import Image from "next/image"
// // import { toySchema, toySchemaInfo, type ToyFormData } from "@/lib/validations/toy-schema"
// // import { ImageGallery } from "@/components/admin/image-gallery"
// // import { HelpDialog } from "@/components/admin/help-dialog"
// // import { checkProductCodeUnique } from "@/lib/utils/stock-sync"

// // interface ToyItem {
// //   _id: string
// //   productCode: string
// //   name: string
// //   sellingPrice: number
// //   actualPrice: number
// //   inStock: number
// //   weightInGrams: number
// //   images: string[]
// //   description?: string
// //   createdAt: string
// //   updatedAt: string
// // }

// // export default function ToysManagement() {
// //   const [toys, setToys] = useState<ToyItem[]>([])
// //   const [filteredToys, setFilteredToys] = useState<ToyItem[]>([])
// //   const [isLoading, setIsLoading] = useState(true)
// //   const [isDialogOpen, setIsDialogOpen] = useState(false)
// //   const [isEditing, setIsEditing] = useState(false)
// //   const [searchTerm, setSearchTerm] = useState("")
// //   const [selectedItem, setSelectedItem] = useState<ToyItem | null>(null)
// //   const [isSubmitting, setIsSubmitting] = useState(false)

// //   const form = useForm<ToyFormData>({
// //     resolver: zodResolver(toySchema),
// //     defaultValues: {
// //       productCode: "",
// //       name: "",
// //       sellingPrice: 0,
// //       actualPrice: 0,
// //       inStock: 0,
// //       weightInGrams: 0,
// //       images: [],
// //       description: "",
// //     },
// //     mode: "onChange",
// //   })

// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //     reset,
// //     setValue,
// //     watch,
// //   } = form
// //   const watchedImages = watch("images")

// //   useEffect(() => {
// //     fetchToys()
// //   }, [])

// //   useEffect(() => {
// //     filterToys()
// //   }, [toys, searchTerm])

// //   const fetchToys = async () => {
// //     try {
// //       setIsLoading(true)
// //       const response = await fetch("/api/admin/products/toys")
// //       if (!response.ok) throw new Error("Failed to fetch")
// //       const data = await response.json()
// //       setToys(data.data || [])
// //     } catch (error) {
// //       console.error("Error fetching toys:", error)
// //       toast.error("Failed to fetch toys")
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const filterToys = () => {
// //     if (!searchTerm) {
// //       setFilteredToys(toys)
// //       return
// //     }
// //     const filtered = toys.filter(
// //       (item) =>
// //         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         item.productCode.toLowerCase().includes(searchTerm.toLowerCase()),
// //     )
// //     setFilteredToys(filtered)
// //   }

// //   const resetForm = () => {
// //     reset()
// //     setSelectedItem(null)
// //     setIsEditing(false)
// //   }

// //   const openEditDialog = (item: ToyItem) => {
// //     setSelectedItem(item)
// //     reset({
// //       productCode: item.productCode,
// //       name: item.name,
// //       sellingPrice: item.sellingPrice,
// //       actualPrice: item.actualPrice,
// //       inStock: item.inStock,
// //       weightInGrams: item.weightInGrams,
// //       images: item.images,
// //       description: item.description || "",
// //     })
// //     setIsEditing(true)
// //     setIsDialogOpen(true)
// //   }

// //   const onSubmit = async (data: ToyFormData) => {
// //     setIsSubmitting(true)
// //     try {
// //       // Check product code uniqueness for new products
// //       if (!isEditing) {
// //         const isUnique = await checkProductCodeUnique(data.productCode)
// //         if (!isUnique) {
// //           toast.error("Product code already exists")
// //           return
// //         }
// //       }

// //       const url = isEditing ? `/api/admin/products/toys/${selectedItem?._id}` : "/api/admin/products/toys"
// //       const method = isEditing ? "PUT" : "POST"

// //       const response = await fetch(url, {
// //         method,
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(data),
// //       })

// //       if (!response.ok) {
// //         const errorData = await response.json()
// //         throw new Error(errorData.message || "Failed to save")
// //       }

// //       toast.success(isEditing ? "Toy updated successfully" : "Toy created successfully")
// //       fetchToys()
// //       setIsDialogOpen(false)
// //       resetForm()
// //     } catch (error: any) {
// //       console.error("Error saving toy:", error)
// //       toast.error(error.message || "Failed to save toy")
// //     } finally {
// //       setIsSubmitting(false)
// //     }
// //   }

// //   const handleDelete = async (id: string, productCode: string) => {
// //     if (!confirm("Are you sure you want to delete this toy? This will also remove it from stock management.")) return

// //     try {
// //       const response = await fetch(`/api/admin/products/toys/${id}`, {
// //         method: "DELETE",
// //       })

// //       if (!response.ok) throw new Error("Failed to delete")

// //       toast.success("Toy deleted successfully")
// //       fetchToys()
// //     } catch (error) {
// //       console.error("Error deleting toy:", error)
// //       toast.error("Failed to delete toy")
// //     }
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen relative">
// //         <AnimatedBackground />
// //         <div className="relative z-10 flex items-center justify-center min-h-screen">
// //           <div className="flex items-center gap-3 text-lg font-medium">
// //             <RefreshCw className="h-6 w-6 animate-spin text-pink-500" />
// //             Loading Toys...
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
// //               <ToyBrick className="h-8 w-8 text-purple-500" />
// //               Toys Management
// //             </h1>
// //             <p className="text-muted-foreground mt-1">Manage baby toys inventory</p>
// //           </div>
// //           <Button
// //             onClick={() => {
// //               resetForm()
// //               setIsDialogOpen(true)
// //             }}
// //             className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
// //           >
// //             <Plus className="h-4 w-4 mr-2" />
// //             Add New Toy
// //           </Button>
// //         </div>

// //         {/* Search and Stats */}
// //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
// //           <Card className="lg:col-span-3 border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
// //             <CardContent className="p-4">
// //               <div className="relative">
// //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
// //                 <Input
// //                   placeholder="Search toys by name or code..."
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
// //                 <p className="text-2xl font-bold text-purple-600">{toys.length}</p>
// //                 <p className="text-sm text-muted-foreground">Total Toys</p>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         {/* Toys Table */}
// //         <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
// //           <CardHeader>
// //             <CardTitle className="flex items-center gap-2">
// //               <ToyBrick className="h-5 w-5" />
// //               Toys Inventory ({filteredToys.length} items)
// //             </CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="overflow-x-auto">
// //               <Table>
// //                 <TableHeader>
// //                   <TableRow>
// //                     <TableHead className="w-20">Image</TableHead>
// //                     <TableHead className="min-w-32">Code</TableHead>
// //                     <TableHead className="min-w-40">Name</TableHead>
// //                     <TableHead className="min-w-24">Price</TableHead>
// //                     <TableHead className="min-w-20">Stock</TableHead>
// //                     <TableHead className="min-w-20">Weight</TableHead>
// //                     <TableHead className="min-w-32">Actions</TableHead>
// //                   </TableRow>
// //                 </TableHeader>
// //                 <TableBody>
// //                   {filteredToys.map((item) => (
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
// //                             <ToyBrick className="h-6 w-6 text-gray-400" />
// //                           </div>
// //                         )}
// //                       </TableCell>
// //                       <TableCell className="font-medium font-mono text-xs">{item.productCode}</TableCell>
// //                       <TableCell className="font-medium">{item.name}</TableCell>
// //                       <TableCell>
// //                         <div>
// //                           <p className="font-medium">₹{item.sellingPrice}</p>
// //                           {item.actualPrice > item.sellingPrice && (
// //                             <p className="text-xs text-muted-foreground line-through">₹{item.actualPrice}</p>
// //                           )}
// //                         </div>
// //                       </TableCell>
// //                       <TableCell>
// //                         <Badge variant={item.inStock > 10 ? "default" : item.inStock > 0 ? "secondary" : "destructive"}>
// //                           {item.inStock}
// //                         </Badge>
// //                       </TableCell>
// //                       <TableCell className="text-sm">{item.weightInGrams}g</TableCell>
// //                       <TableCell>
// //                         <div className="flex gap-1">
// //                           <Button
// //                             variant="outline"
// //                             size="sm"
// //                             onClick={() => openEditDialog(item)}
// //                             className="h-8 w-8 p-0"
// //                           >
// //                             <Edit className="h-3 w-3" />
// //                           </Button>
// //                           <Button
// //                             variant="outline"
// //                             size="sm"
// //                             onClick={() => handleDelete(item._id, item.productCode)}
// //                             className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
// //                           >
// //                             <Trash2 className="h-3 w-3" />
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
// //               <DialogTitle>{isEditing ? "Edit Toy" : "Add New Toy"}</DialogTitle>
// //               <DialogDescription>
// //                 {isEditing ? "Update the toy details" : "Fill in the details to add a new toy"}
// //               </DialogDescription>
// //             </DialogHeader>

// //             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div className="space-y-2">
// //                   <Label htmlFor="name">Toy Name *</Label>
// //                   <Input
// //                     id="name"
// //                     {...register("name")}
// //                     placeholder="Enter toy name"
// //                     className={errors.name ? "border-red-500" : ""}
// //                   />
// //                   {errors.name && (
// //                     <p className="text-sm text-red-500 flex items-center gap-1">
// //                       <AlertCircle className="h-3 w-3" />
// //                       {errors.name.message}
// //                     </p>
// //                   )}
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label htmlFor="productCode">Product Code *</Label>
// //                   <Input
// //                     id="productCode"
// //                     {...register("productCode")}
// //                     placeholder="e.g., toycar1.1"
// //                     className={errors.productCode ? "border-red-500" : ""}
// //                     disabled={isEditing} // Can't change product code during edit
// //                   />
// //                   {errors.productCode && (
// //                     <p className="text-sm text-red-500 flex items-center gap-1">
// //                       <AlertCircle className="h-3 w-3" />
// //                       {errors.productCode.message}
// //                     </p>
// //                   )}
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                 <div className="space-y-2">
// //                   <Label htmlFor="sellingPrice">Selling Price (₹) *</Label>
// //                   <Input
// //                     id="sellingPrice"
// //                     type="number"
// //                     step="0.01"
// //                     {...register("sellingPrice", { valueAsNumber: true })}
// //                     placeholder="299"
// //                     className={errors.sellingPrice ? "border-red-500" : ""}
// //                   />
// //                   {errors.sellingPrice && (
// //                     <p className="text-sm text-red-500 flex items-center gap-1">
// //                       <AlertCircle className="h-3 w-3" />
// //                       {errors.sellingPrice.message}
// //                     </p>
// //                   )}
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label htmlFor="actualPrice">Actual Price (₹) *</Label>
// //                   <Input
// //                     id="actualPrice"
// //                     type="number"
// //                     step="0.01"
// //                     {...register("actualPrice", { valueAsNumber: true })}
// //                     placeholder="399"
// //                     className={errors.actualPrice ? "border-red-500" : ""}
// //                   />
// //                   {errors.actualPrice && (
// //                     <p className="text-sm text-red-500 flex items-center gap-1">
// //                       <AlertCircle className="h-3 w-3" />
// //                       {errors.actualPrice.message}
// //                     </p>
// //                   )}
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label htmlFor="weightInGrams">Weight (grams) *</Label>
// //                   <Input
// //                     id="weightInGrams"
// //                     type="number"
// //                     {...register("weightInGrams", { valueAsNumber: true })}
// //                     placeholder="250"
// //                     className={errors.weightInGrams ? "border-red-500" : ""}
// //                   />
// //                   {errors.weightInGrams && (
// //                     <p className="text-sm text-red-500 flex items-center gap-1">
// //                       <AlertCircle className="h-3 w-3" />
// //                       {errors.weightInGrams.message}
// //                     </p>
// //                   )}
// //                 </div>
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="inStock">Stock Quantity *</Label>
// //                 <Input
// //                   id="inStock"
// //                   type="number"
// //                   {...register("inStock", { valueAsNumber: true })}
// //                   placeholder="25"
// //                   className={errors.inStock ? "border-red-500" : ""}
// //                 />
// //                 {errors.inStock && (
// //                   <p className="text-sm text-red-500 flex items-center gap-1">
// //                     <AlertCircle className="h-3 w-3" />
// //                     {errors.inStock.message}
// //                   </p>
// //                 )}
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="description">Description</Label>
// //                 <Textarea
// //                   id="description"
// //                   {...register("description")}
// //                   placeholder="Enter toy description"
// //                   rows={3}
// //                   className={errors.description ? "border-red-500" : ""}
// //                 />
// //                 {errors.description && (
// //                   <p className="text-sm text-red-500 flex items-center gap-1">
// //                     <AlertCircle className="h-3 w-3" />
// //                     {errors.description.message}
// //                   </p>
// //                 )}
// //               </div>

// //               <div className="space-y-2">
// //                 <ImageGallery
// //                   images={watchedImages || []}
// //                   onImagesChange={(images) => setValue("images", images)}
// //                   maxImages={10}
// //                   acceptVideo={false}
// //                 />
// //                 {errors.images && (
// //                   <p className="text-sm text-red-500 flex items-center gap-1">
// //                     <AlertCircle className="h-3 w-3" />
// //                     {errors.images.message}
// //                   </p>
// //                 )}
// //               </div>

// //               <div className="flex flex-col sm:flex-row justify-end gap-2">
// //                 <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
// //                   Cancel
// //                 </Button>
// //                 <Button
// //                   type="submit"
// //                   disabled={isSubmitting}
// //                   className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
// //                 >
// //                   {isSubmitting ? (
// //                     <>
// //                       <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
// //                       {isEditing ? "Updating..." : "Creating..."}
// //                     </>
// //                   ) : (
// //                     <>{isEditing ? "Update" : "Create"} Toy</>
// //                   )}
// //                 </Button>
// //               </div>
// //             </form>
// //           </DialogContent>
// //         </Dialog>

// //         {/* Help Dialog */}
// //         <HelpDialog schemaInfo={toySchemaInfo} />
// //       </div>
// //     </div>
// //   )
// // }







// // "use client"

// // import { useState, useEffect } from "react"
// // import { useForm } from "react-hook-form"
// // import { zodResolver } from "@hookform/resolvers/zod"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Textarea } from "@/components/ui/textarea"
// // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// // import { Badge } from "@/components/ui/badge"
// // import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// // import { Plus, Edit, Trash2, Search, RefreshCw, ToyBrick, AlertCircle } from "lucide-react"
// // import { AnimatedBackground } from "@/components/animated-background"
// // import { toast } from "react-hot-toast"
// // import Image from "next/image"
// // import { toySchema, toySchemaInfo, type ToyFormData } from "@/lib/validations/toy-schema"
// // import { ImageGallery } from "@/components/admin/image-gallery"
// // import { HelpDialog } from "@/components/admin/help-dialog"
// // import { checkProductCodeUnique } from "@/lib/utils/stock-sync"

// // interface ToyItem {
// //   _id: string
// //   productCode: string
// //   name: string
// //   sellingPrice: number
// //   actualPrice: number
// //   inStock: number
// //   weightInGrams: number
// //   images: string[]
// //   description?: string
// //   createdAt: string
// //   updatedAt: string
// // }

// // export default function ToysManagement() {
// //   const [toys, setToys] = useState<ToyItem[]>([])
// //   const [filteredToys, setFilteredToys] = useState<ToyItem[]>([])
// //   const [isLoading, setIsLoading] = useState(true)
// //   const [isDialogOpen, setIsDialogOpen] = useState(false)
// //   const [isEditing, setIsEditing] = useState(false)
// //   const [searchTerm, setSearchTerm] = useState("")
// //   const [selectedItem, setSelectedItem] = useState<ToyItem | null>(null)
// //   const [isSubmitting, setIsSubmitting] = useState(false)

// //   const form = useForm<ToyFormData>({
// //     resolver: zodResolver(toySchema),
// //     defaultValues: {
// //       productCode: "",
// //       name: "",
// //       sellingPrice: 0,
// //       actualPrice: 0,
// //       inStock: 0,
// //       weightInGrams: 0,
// //       images: [],
// //       description: "",
// //     },
// //     mode: "onChange",
// //   })

// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //     reset,
// //     setValue,
// //     watch,
// //   } = form
// //   const watchedImages = watch("images")

// //   useEffect(() => {
// //     fetchToys()
// //   }, [])

// //   useEffect(() => {
// //     filterToys()
// //   }, [toys, searchTerm])

// //   const fetchToys = async () => {
// //     try {
// //       setIsLoading(true)
// //       const response = await fetch("/api/admin/products/toys")
// //       if (!response.ok) throw new Error("Failed to fetch")
// //       const data = await response.json()
// //       setToys(data.data || [])
// //     } catch (error) {
// //       console.error("Error fetching toys:", error)
// //       toast.error("Failed to fetch toys")
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const filterToys = () => {
// //     if (!searchTerm) {
// //       setFilteredToys(toys)
// //       return
// //     }
// //     const filtered = toys.filter(
// //       (item) =>
// //         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         item.productCode.toLowerCase().includes(searchTerm.toLowerCase()),
// //     )
// //     setFilteredToys(filtered)
// //   }

// //   const resetForm = () => {
// //     reset()
// //     setSelectedItem(null)
// //     setIsEditing(false)
// //   }

// //   const openEditDialog = (item: ToyItem) => {
// //     setSelectedItem(item)
// //     reset({
// //       productCode: item.productCode,
// //       name: item.name,
// //       sellingPrice: item.sellingPrice,
// //       actualPrice: item.actualPrice,
// //       inStock: item.inStock,
// //       weightInGrams: item.weightInGrams,
// //       images: item.images,
// //       description: item.description || "",
// //     })
// //     setIsEditing(true)
// //     setIsDialogOpen(true)
// //   }

// //   const onSubmit = async (data: ToyFormData) => {
// //     setIsSubmitting(true)
// //     try {
// //       // Check product code uniqueness for new products
// //       if (!isEditing) {
// //         const isUnique = await checkProductCodeUnique(data.productCode)
// //         if (!isUnique) {
// //           toast.error("Product code already exists")
// //           return
// //         }
// //       }

// //       const url = isEditing ? `/api/admin/products/toys/${selectedItem?._id}` : "/api/admin/products/toys"
// //       const method = isEditing ? "PUT" : "POST"

// //       const response = await fetch(url, {
// //         method,
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(data),
// //       })

// //       if (!response.ok) {
// //         const errorData = await response.json()
// //         throw new Error(errorData.message || "Failed to save")
// //       }

// //       toast.success(isEditing ? "Toy updated successfully" : "Toy created successfully")
// //       fetchToys()
// //       setIsDialogOpen(false)
// //       resetForm()
// //     } catch (error: any) {
// //       console.error("Error saving toy:", error)
// //       toast.error(error.message || "Failed to save toy")
// //     } finally {
// //       setIsSubmitting(false)
// //     }
// //   }

// //   const handleDelete = async (id: string, productCode: string) => {
// //     if (!confirm("Are you sure you want to delete this toy? This will also remove it from stock management.")) return

// //     try {
// //       const response = await fetch(`/api/admin/products/toys/${id}`, {
// //         method: "DELETE",
// //       })

// //       if (!response.ok) throw new Error("Failed to delete")

// //       toast.success("Toy deleted successfully")
// //       fetchToys()
// //     } catch (error) {
// //       console.error("Error deleting toy:", error)
// //       toast.error("Failed to delete toy")
// //     }
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen relative">
// //         <AnimatedBackground />
// //         <div className="relative z-10 flex items-center justify-center min-h-screen">
// //           <div className="flex items-center gap-3 text-lg font-medium">
// //             <RefreshCw className="h-6 w-6 animate-spin text-pink-500" />
// //             Loading Toys...
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
// //               <ToyBrick className="h-8 w-8 text-purple-500" />
// //               Toys Management
// //             </h1>
// //             <p className="text-muted-foreground mt-1">Manage baby toys inventory</p>
// //           </div>
// //           <Button
// //             onClick={() => {
// //               resetForm()
// //               setIsDialogOpen(true)
// //             }}
// //             className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
// //           >
// //             <Plus className="h-4 w-4 mr-2" />
// //             Add New Toy
// //           </Button>
// //         </div>

// //         {/* Search and Stats */}
// //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
// //           <Card className="lg:col-span-3 border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
// //             <CardContent className="p-4">
// //               <div className="relative">
// //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
// //                 <Input
// //                   placeholder="Search toys by name or code..."
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
// //                 <p className="text-2xl font-bold text-purple-600">{toys.length}</p>
// //                 <p className="text-sm text-muted-foreground">Total Toys</p>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         {/* Toys Table */}
// //         <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
// //           <CardHeader>
// //             <CardTitle className="flex items-center gap-2">
// //               <ToyBrick className="h-5 w-5" />
// //               Toys Inventory ({filteredToys.length} items)
// //             </CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="overflow-x-auto">
// //               <Table>
// //                 <TableHeader>
// //                   <TableRow>
// //                     <TableHead className="w-20">Image</TableHead>
// //                     <TableHead className="min-w-32">Code</TableHead>
// //                     <TableHead className="min-w-40">Name</TableHead>
// //                     <TableHead className="min-w-24">Price</TableHead>
// //                     <TableHead className="min-w-20">Stock</TableHead>
// //                     <TableHead className="min-w-20">Weight</TableHead>
// //                     <TableHead className="min-w-32">Actions</TableHead>
// //                   </TableRow>
// //                 </TableHeader>
// //                 <TableBody>
// //                   {filteredToys.map((item) => (
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
// //                             <ToyBrick className="h-6 w-6 text-gray-400" />
// //                           </div>
// //                         )}
// //                       </TableCell>
// //                       <TableCell className="font-medium font-mono text-xs">{item.productCode}</TableCell>
// //                       <TableCell className="font-medium">{item.name}</TableCell>
// //                       <TableCell>
// //                         <div>
// //                           <p className="font-medium">₹{item.sellingPrice}</p>
// //                           {item.actualPrice > item.sellingPrice && (
// //                             <p className="text-xs text-muted-foreground line-through">₹{item.actualPrice}</p>
// //                           )}
// //                         </div>
// //                       </TableCell>
// //                       <TableCell>
// //                         <Badge variant={item.inStock > 10 ? "default" : item.inStock > 0 ? "secondary" : "destructive"}>
// //                           {item.inStock}
// //                         </Badge>
// //                       </TableCell>
// //                       <TableCell className="text-sm">{item.weightInGrams}g</TableCell>
// //                       <TableCell>
// //                         <div className="flex gap-1">
// //                           <Button
// //                             variant="outline"
// //                             size="sm"
// //                             onClick={() => openEditDialog(item)}
// //                             className="h-8 w-8 p-0"
// //                           >
// //                             <Edit className="h-3 w-3" />
// //                           </Button>
// //                           <Button
// //                             variant="outline"
// //                             size="sm"
// //                             onClick={() => handleDelete(item._id, item.productCode)}
// //                             className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
// //                           >
// //                             <Trash2 className="h-3 w-3" />
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
// //               <DialogTitle>{isEditing ? "Edit Toy" : "Add New Toy"}</DialogTitle>
// //               <DialogDescription>
// //                 {isEditing ? "Update the toy details" : "Fill in the details to add a new toy"}
// //               </DialogDescription>
// //             </DialogHeader>

// //             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div className="space-y-2">
// //                   <Label htmlFor="name">Toy Name *</Label>
// //                   <Input
// //                     id="name"
// //                     {...register("name")}
// //                     placeholder="Enter toy name"
// //                     className={errors.name ? "border-red-500" : ""}
// //                   />
// //                   {errors.name && (
// //                     <p className="text-sm text-red-500 flex items-center gap-1">
// //                       <AlertCircle className="h-3 w-3" />
// //                       {errors.name.message}
// //                     </p>
// //                   )}
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label htmlFor="productCode">Product Code *</Label>
// //                   <Input
// //                     id="productCode"
// //                     {...register("productCode")}
// //                     placeholder="e.g., toycar1.1"
// //                     className={errors.productCode ? "border-red-500" : ""}
// //                     disabled={isEditing} // Can't change product code during edit
// //                   />
// //                   {errors.productCode && (
// //                     <p className="text-sm text-red-500 flex items-center gap-1">
// //                       <AlertCircle className="h-3 w-3" />
// //                       {errors.productCode.message}
// //                     </p>
// //                   )}
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                 <div className="space-y-2">
// //                   <Label htmlFor="sellingPrice">Selling Price (₹) *</Label>
// //                   <Input
// //                     id="sellingPrice"
// //                     type="number"
// //                     step="0.01"
// //                     {...register("sellingPrice", { valueAsNumber: true })}
// //                     placeholder="299"
// //                     className={errors.sellingPrice ? "border-red-500" : ""}
// //                   />
// //                   {errors.sellingPrice && (
// //                     <p className="text-sm text-red-500 flex items-center gap-1">
// //                       <AlertCircle className="h-3 w-3" />
// //                       {errors.sellingPrice.message}
// //                     </p>
// //                   )}
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label htmlFor="actualPrice">Actual Price (₹) *</Label>
// //                   <Input
// //                     id="actualPrice"
// //                     type="number"
// //                     step="0.01"
// //                     {...register("actualPrice", { valueAsNumber: true })}
// //                     placeholder="399"
// //                     className={errors.actualPrice ? "border-red-500" : ""}
// //                   />
// //                   {errors.actualPrice && (
// //                     <p className="text-sm text-red-500 flex items-center gap-1">
// //                       <AlertCircle className="h-3 w-3" />
// //                       {errors.actualPrice.message}
// //                     </p>
// //                   )}
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label htmlFor="weightInGrams">Weight (grams) *</Label>
// //                   <Input
// //                     id="weightInGrams"
// //                     type="number"
// //                     {...register("weightInGrams", { valueAsNumber: true })}
// //                     placeholder="250"
// //                     className={errors.weightInGrams ? "border-red-500" : ""}
// //                   />
// //                   {errors.weightInGrams && (
// //                     <p className="text-sm text-red-500 flex items-center gap-1">
// //                       <AlertCircle className="h-3 w-3" />
// //                       {errors.weightInGrams.message}
// //                     </p>
// //                   )}
// //                 </div>
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="inStock">Stock Quantity *</Label>
// //                 <Input
// //                   id="inStock"
// //                   type="number"
// //                   {...register("inStock", { valueAsNumber: true })}
// //                   placeholder="25"
// //                   className={errors.inStock ? "border-red-500" : ""}
// //                 />
// //                 {errors.inStock && (
// //                   <p className="text-sm text-red-500 flex items-center gap-1">
// //                     <AlertCircle className="h-3 w-3" />
// //                     {errors.inStock.message}
// //                   </p>
// //                 )}
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="description">Description</Label>
// //                 <Textarea
// //                   id="description"
// //                   {...register("description")}
// //                   placeholder="Enter toy description"
// //                   rows={3}
// //                   className={errors.description ? "border-red-500" : ""}
// //                 />
// //                 {errors.description && (
// //                   <p className="text-sm text-red-500 flex items-center gap-1">
// //                     <AlertCircle className="h-3 w-3" />
// //                     {errors.description.message}
// //                   </p>
// //                 )}
// //               </div>

// //               <div className="space-y-2">
// //                 <ImageGallery
// //                   images={watchedImages || []}
// //                   onImagesChange={(images) => setValue("images", images)}
// //                   maxImages={10}
// //                   acceptVideo={false}
// //                 />
// //                 {errors.images && (
// //                   <p className="text-sm text-red-500 flex items-center gap-1">
// //                     <AlertCircle className="h-3 w-3" />
// //                     {errors.images.message}
// //                   </p>
// //                 )}
// //               </div>

// //               <div className="flex flex-col sm:flex-row justify-end gap-2">
// //                 <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
// //                   Cancel
// //                 </Button>
// //                 <Button
// //                   type="submit"
// //                   disabled={isSubmitting}
// //                   className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
// //                 >
// //                   {isSubmitting ? (
// //                     <>
// //                       <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
// //                       {isEditing ? "Updating..." : "Creating..."}
// //                     </>
// //                   ) : (
// //                     <>{isEditing ? "Update" : "Create"} Toy</>
// //                   )}
// //                 </Button>
// //               </div>
// //             </form>
// //           </DialogContent>
// //         </Dialog>

// //         {/* Help Dialog */}
// //         <HelpDialog schemaInfo={toySchemaInfo} />
// //       </div>
// //     </div>
// //   )
// // }


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
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Plus, Edit, Trash2, Search, RefreshCw, ToyBrick, AlertCircle } from "lucide-react"
// import { AnimatedBackground } from "@/components/animated-background"
// import { toast } from "react-hot-toast"
// import Image from "next/image"
// import { toySchema, toySchemaInfo, type ToyFormData } from "@/lib/validations/toy-schema"
// import { ImageGallery } from "@/components/admin/image-gallery"
// import { HelpDialog } from "@/components/admin/help-dialog"

// interface ToyItem {
//   _id: string
//   productCode: string
//   name: string
//   sellingPrice: number
//   actualPrice: number
//   inStock: number
//   weightInGrams: number
//   images: string[]
//   description?: string
//   createdAt: string
//   updatedAt: string
// }

// export default function ToysManagement() {
//   const [toys, setToys] = useState<ToyItem[]>([])
//   const [filteredToys, setFilteredToys] = useState<ToyItem[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [isEditing, setIsEditing] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedItem, setSelectedItem] = useState<ToyItem | null>(null)
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const form = useForm<ToyFormData>({
//     resolver: zodResolver(toySchema),
//     defaultValues: {
//       productCode: "",
//       name: "",
//       sellingPrice: 0,
//       actualPrice: 0,
//       inStock: 0,
//       weightInGrams: 0,
//       images: [],
//       description: "",
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
//   const watchedImages = watch("images")

//   useEffect(() => {
//     fetchToys()
//   }, [])

//   useEffect(() => {
//     filterToys()
//   }, [toys, searchTerm])

//   const fetchToys = async () => {
//     try {
//       setIsLoading(true)
//       const response = await fetch("/api/admin/products/toys")
//       if (!response.ok) throw new Error("Failed to fetch")
//       const data = await response.json()
//       setToys(data.data || [])
//     } catch (error) {
//       console.error("Error fetching toys:", error)
//       toast.error("Failed to fetch toys")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const filterToys = () => {
//     if (!searchTerm) {
//       setFilteredToys(toys)
//       return
//     }
//     const filtered = toys.filter(
//       (item) =>
//         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.productCode.toLowerCase().includes(searchTerm.toLowerCase()),
//     )
//     setFilteredToys(filtered)
//   }

//   const resetForm = () => {
//     reset()
//     setSelectedItem(null)
//     setIsEditing(false)
//   }

//   const openEditDialog = (item: ToyItem) => {
//     setSelectedItem(item)
//     reset({
//       productCode: item.productCode,
//       name: item.name,
//       sellingPrice: item.sellingPrice,
//       actualPrice: item.actualPrice,
//       inStock: item.inStock,
//       weightInGrams: item.weightInGrams,
//       images: item.images,
//       description: item.description || "",
//     })
//     setIsEditing(true)
//     setIsDialogOpen(true)
//   }

//   // Client-side function to check product code uniqueness via API
//   const checkProductCodeUnique = async (productCode: string, excludeId?: string): Promise<boolean> => {
//     try {
//       const params = new URLSearchParams({ productCode })
//       if (excludeId) {
//         params.append("excludeId", excludeId)
//       }

//       const response = await fetch(`/api/admin/products/check-unique?${params}`)
//       if (!response.ok) throw new Error("Failed to check uniqueness")

//       const data = await response.json()
//       return data.isUnique
//     } catch (error) {
//       console.error("Error checking product code uniqueness:", error)
//       return false
//     }
//   }

//   const onSubmit = async (data: ToyFormData) => {
//     setIsSubmitting(true)
//     try {
//       // Check product code uniqueness for new products
//       if (!isEditing) {
//         const isUnique = await checkProductCodeUnique(data.productCode)
//         if (!isUnique) {
//           toast.error("Product code already exists")
//           return
//         }
//       }

//       const url = isEditing ? `/api/admin/products/toys/${selectedItem?._id}` : "/api/admin/products/toys"
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

//       toast.success(isEditing ? "Toy updated successfully" : "Toy created successfully")
//       fetchToys()
//       setIsDialogOpen(false)
//       resetForm()
//     } catch (error: any) {
//       console.error("Error saving toy:", error)
//       toast.error(error.message || "Failed to save toy")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleDelete = async (id: string, productCode: string) => {
//     if (!confirm("Are you sure you want to delete this toy? This will also remove it from stock management.")) return

//     try {
//       const response = await fetch(`/api/admin/products/toys/${id}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) throw new Error("Failed to delete")

//       toast.success("Toy deleted successfully")
//       fetchToys()
//     } catch (error) {
//       console.error("Error deleting toy:", error)
//       toast.error("Failed to delete toy")
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen relative">
//         <AnimatedBackground />
//         <div className="relative z-10 flex items-center justify-center min-h-screen">
//           <div className="flex items-center gap-3 text-lg font-medium">
//             <RefreshCw className="h-6 w-6 animate-spin text-pink-500" />
//             Loading Toys...
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
//             <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
//               <ToyBrick className="h-8 w-8 text-purple-500" />
//               Toys Management
//             </h1>
//             <p className="text-muted-foreground mt-1">Manage baby toys inventory</p>
//           </div>
//           <Button
//             onClick={() => {
//               resetForm()
//               setIsDialogOpen(true)
//             }}
//             className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
//           >
//             <Plus className="h-4 w-4 mr-2" />
//             Add New Toy
//           </Button>
//         </div>

//         {/* Search and Stats */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
//           <Card className="lg:col-span-3 border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
//             <CardContent className="p-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search toys by name or code..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 rounded-xl"
//                 />
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
//             <CardContent className="p-4">
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-purple-600">{toys.length}</p>
//                 <p className="text-sm text-muted-foreground">Total Toys</p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Toys Table */}
//         <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <ToyBrick className="h-5 w-5" />
//               Toys Inventory ({filteredToys.length} items)
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead className="w-20">Image</TableHead>
//                     <TableHead className="min-w-32">Code</TableHead>
//                     <TableHead className="min-w-40">Name</TableHead>
//                     <TableHead className="min-w-24">Price</TableHead>
//                     <TableHead className="min-w-20">Stock</TableHead>
//                     <TableHead className="min-w-20">Weight</TableHead>
//                     <TableHead className="min-w-32">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredToys.map((item) => (
//                     <TableRow key={item._id}>
//                       <TableCell>
//                         {item.images.length > 0 ? (
//                           <Image
//                             src={item.images[0] || "/placeholder.svg"}
//                             alt={item.name}
//                             width={50}
//                             height={50}
//                             className="rounded-lg object-cover"
//                           />
//                         ) : (
//                           <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
//                             <ToyBrick className="h-6 w-6 text-gray-400" />
//                           </div>
//                         )}
//                       </TableCell>
//                       <TableCell className="font-medium font-mono text-xs">{item.productCode}</TableCell>
//                       <TableCell className="font-medium">{item.name}</TableCell>
//                       <TableCell>
//                         <div>
//                           <p className="font-medium">₹{item.sellingPrice}</p>
//                           {item.actualPrice > item.sellingPrice && (
//                             <p className="text-xs text-muted-foreground line-through">₹{item.actualPrice}</p>
//                           )}
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <Badge variant={item.inStock > 10 ? "default" : item.inStock > 0 ? "secondary" : "destructive"}>
//                           {item.inStock}
//                         </Badge>
//                       </TableCell>
//                       <TableCell className="text-sm">{item.weightInGrams}g</TableCell>
//                       <TableCell>
//                         <div className="flex gap-1">
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => openEditDialog(item)}
//                             className="h-8 w-8 p-0"
//                           >
//                             <Edit className="h-3 w-3" />
//                           </Button>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => handleDelete(item._id, item.productCode)}
//                             className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
//                           >
//                             <Trash2 className="h-3 w-3" />
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Add/Edit Dialog */}
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//             <DialogHeader>
//               <DialogTitle>{isEditing ? "Edit Toy" : "Add New Toy"}</DialogTitle>
//               <DialogDescription>
//                 {isEditing ? "Update the toy details" : "Fill in the details to add a new toy"}
//               </DialogDescription>
//             </DialogHeader>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Toy Name *</Label>
//                   <Input
//                     id="name"
//                     {...register("name")}
//                     placeholder="Enter toy name"
//                     className={errors.name ? "border-red-500" : ""}
//                   />
//                   {errors.name && (
//                     <p className="text-sm text-red-500 flex items-center gap-1">
//                       <AlertCircle className="h-3 w-3" />
//                       {errors.name.message}
//                     </p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="productCode">Product Code *</Label>
//                   <Input
//                     id="productCode"
//                     {...register("productCode")}
//                     placeholder="e.g., toycar1.1"
//                     className={errors.productCode ? "border-red-500" : ""}
//                     disabled={isEditing}
//                   />
//                   {errors.productCode && (
//                     <p className="text-sm text-red-500 flex items-center gap-1">
//                       <AlertCircle className="h-3 w-3" />
//                       {errors.productCode.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="sellingPrice">Selling Price (₹) *</Label>
//                   <Input
//                     id="sellingPrice"
//                     type="number"
//                     step="0.01"
//                     {...register("sellingPrice", { valueAsNumber: true })}
//                     placeholder="299"
//                     className={errors.sellingPrice ? "border-red-500" : ""}
//                   />
//                   {errors.sellingPrice && (
//                     <p className="text-sm text-red-500 flex items-center gap-1">
//                       <AlertCircle className="h-3 w-3" />
//                       {errors.sellingPrice.message}
//                     </p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="actualPrice">Actual Price (₹) *</Label>
//                   <Input
//                     id="actualPrice"
//                     type="number"
//                     step="0.01"
//                     {...register("actualPrice", { valueAsNumber: true })}
//                     placeholder="399"
//                     className={errors.actualPrice ? "border-red-500" : ""}
//                   />
//                   {errors.actualPrice && (
//                     <p className="text-sm text-red-500 flex items-center gap-1">
//                       <AlertCircle className="h-3 w-3" />
//                       {errors.actualPrice.message}
//                     </p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="weightInGrams">Weight (grams) *</Label>
//                   <Input
//                     id="weightInGrams"
//                     type="number"
//                     {...register("weightInGrams", { valueAsNumber: true })}
//                     placeholder="250"
//                     className={errors.weightInGrams ? "border-red-500" : ""}
//                   />
//                   {errors.weightInGrams && (
//                     <p className="text-sm text-red-500 flex items-center gap-1">
//                       <AlertCircle className="h-3 w-3" />
//                       {errors.weightInGrams.message}
//                     </p>
//                   )}
//                 </div>
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

//               <div className="space-y-2">
//                 <Label htmlFor="description">Description</Label>
//                 <Textarea
//                   id="description"
//                   {...register("description")}
//                   placeholder="Enter toy description"
//                   rows={3}
//                   className={errors.description ? "border-red-500" : ""}
//                 />
//                 {errors.description && (
//                   <p className="text-sm text-red-500 flex items-center gap-1">
//                     <AlertCircle className="h-3 w-3" />
//                     {errors.description.message}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <ImageGallery
//                   images={watchedImages || []}
//                   onImagesChange={(images) => setValue("images", images)}
//                   maxImages={10}
//                   acceptVideo={false}
//                 />
//                 {errors.images && (
//                   <p className="text-sm text-red-500 flex items-center gap-1">
//                     <AlertCircle className="h-3 w-3" />
//                     {errors.images.message}
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
//                   className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
//                       {isEditing ? "Updating..." : "Creating..."}
//                     </>
//                   ) : (
//                     <>{isEditing ? "Update" : "Create"} Toy</>
//                   )}
//                 </Button>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>

//         {/* Help Dialog */}
//         <HelpDialog schemaInfo={toySchemaInfo} />
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
import {
  Plus,
  Edit,
  Trash2,
  Search,
  RefreshCw,
  ToyBrick,
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
import { toySchema, toySchemaInfo, type ToyFormData } from "@/lib/validations/toy-schema"
import { ImageGallery } from "@/components/admin/image-gallery"
import { HelpDialog } from "@/components/admin/help-dialog"

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

interface FilterState {
  search: string
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

export default function ToysManagement() {
  const [toys, setToys] = useState<ToyItem[]>([])
  const [filteredToys, setFilteredToys] = useState<ToyItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ToyItem | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    priceRange: { min: null, max: null },
    stockRange: { min: null, max: null },
    weightRange: { min: null, max: null },
    stockStatus: "all",
    sortBy: "created",
    sortOrder: "desc",
  })

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
    applyFilters()
  }, [toys, filters])

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

  const applyFilters = () => {
    let filtered = [...toys]

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

    setFilteredToys(filtered)
  }

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
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

  const onSubmit = async (data: ToyFormData) => {
    setIsSubmitting(true)
    try {
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

  const getStockBadgeVariant = (stock: number) => {
    if (stock > 10) return "default"
    if (stock > 0) return "secondary"
    return "destructive"
  }

  const hasActiveFilters = () => {
    return (
      filters.search ||
      filters.priceRange.min !== null ||
      filters.priceRange.max !== null ||
      filters.stockRange.min !== null ||
      filters.stockRange.max !== null ||
      filters.weightRange.min !== null ||
      filters.weightRange.max !== null ||
      filters.stockStatus !== "all"
    )
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

        {/* Search and Filter Section */}
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search toys by name, code, or description..."
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
                <span>Total: {toys.length}</span>
                <span>Filtered: {filteredToys.length}</span>
                <span>In Stock: {toys.filter((t) => t.inStock > 0).length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Toys Table */}
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ToyBrick className="h-5 w-5" />
              Toys Inventory ({filteredToys.length} items)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Mobile Cards View */}
            <div className="block md:hidden space-y-4">
              {filteredToys.map((item) => (
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
                          <ToyBrick className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-sm truncate">{item.name}</h3>
                          <p className="text-xs text-muted-foreground font-mono">{item.productCode}</p>
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
                        <div>
                          <span className="text-muted-foreground">Weight: </span>
                          <span>{item.weightInGrams}g</span>
                        </div>
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
            {filteredToys.length === 0 && (
              <div className="text-center py-8">
                <ToyBrick className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No toys found</p>
                <p className="text-sm text-gray-400">
                  {hasActiveFilters() ? "Try adjusting your filters" : "Add your first toy to get started"}
                </p>
              </div>
            )}
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
