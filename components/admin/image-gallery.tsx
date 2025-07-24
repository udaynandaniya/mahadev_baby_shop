// // "use client"

// // import type React from "react"

// // import { useState, useRef } from "react"
// // import { Button } from "@/components/ui/button"
// // import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// // import { Label } from "@/components/ui/label"
// // import { Badge } from "@/components/ui/badge"
// // import { ImageIcon, Plus, X, Upload, Eye, FolderOpen, Camera, Play, Loader2 } from "lucide-react"
// // import Image from "next/image"
// // import { toast } from "react-hot-toast"

// // interface ImageGalleryProps {
// //   images: string[]
// //   onImagesChange: (images: string[]) => void
// //   maxImages?: number
// //   acceptVideo?: boolean
// // }

// // interface SelectedImage {
// //   file: File
// //   preview: string
// //   type: "image" | "video"
// // }

// // export function ImageGallery({ images, onImagesChange, maxImages = 10, acceptVideo = false }: ImageGalleryProps) {
// //   const [isGalleryOpen, setIsGalleryOpen] = useState(false)
// //   const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([])
// //   const [previewImage, setPreviewImage] = useState<string | null>(null)
// //   const [isUploading, setIsUploading] = useState(false)
// //   const fileInputRef = useRef<HTMLInputElement>(null)

// //   const openGallery = () => {
// //     setIsGalleryOpen(true)
// //   }

// //   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const files = Array.from(e.target.files || [])
// //     if (files.length === 0) return

// //     const totalImages = selectedImages.length + images.length
// //     if (totalImages + files.length > maxImages) {
// //       toast.error(`Maximum ${maxImages} images allowed`)
// //       return
// //     }

// //     const newSelectedImages: SelectedImage[] = []

// //     files.forEach((file) => {
// //       const isVideo = file.type.startsWith("video/")
// //       const isImage = file.type.startsWith("image/")

// //       if (!isImage && !isVideo) {
// //         toast.error(`${file.name} is not a valid image or video file`)
// //         return
// //       }

// //       if (isVideo && !acceptVideo) {
// //         toast.error("Video files are not allowed")
// //         return
// //       }

// //       const preview = URL.createObjectURL(file)
// //       newSelectedImages.push({
// //         file,
// //         preview,
// //         type: isVideo ? "video" : "image",
// //       })
// //     })

// //     setSelectedImages((prev) => [...prev, ...newSelectedImages])

// //     // Reset file input
// //     if (fileInputRef.current) {
// //       fileInputRef.current.value = ""
// //     }
// //   }

// //   const removeSelectedImage = (index: number) => {
// //     setSelectedImages((prev) => {
// //       const newImages = [...prev]
// //       // Revoke object URL to prevent memory leaks
// //       URL.revokeObjectURL(newImages[index].preview)
// //       newImages.splice(index, 1)
// //       return newImages
// //     })
// //   }

// //   const removeUploadedImage = (index: number) => {
// //     const newImages = [...images]
// //     newImages.splice(index, 1)
// //     onImagesChange(newImages)
// //   }

// //   const uploadToCloudinary = async (file: File): Promise<string> => {
// //     const formData = new FormData()
// //     formData.append("file", file)
// //     formData.append("upload_preset", "mahadev_baby_shop")

// //     const resourceType = file.type.startsWith("video/") ? "video" : "image"

// //     const response = await fetch(
// //       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
// //       {
// //         method: "POST",
// //         body: formData,
// //       },
// //     )

// //     if (!response.ok) {
// //       throw new Error(`Failed to upload ${file.name}`)
// //     }

// //     const data = await response.json()
// //     return data.secure_url
// //   }

// //   const handleUploadSelected = async () => {
// //     if (selectedImages.length === 0) {
// //       toast.error("No images selected to upload")
// //       return
// //     }

// //     setIsUploading(true)
// //     try {
// //       const uploadPromises = selectedImages.map((img) => uploadToCloudinary(img.file))
// //       const uploadedUrls = await Promise.all(uploadPromises)

// //       // Add uploaded URLs to existing images
// //       onImagesChange([...images, ...uploadedUrls])

// //       // Clear selected images and revoke object URLs
// //       selectedImages.forEach((img) => URL.revokeObjectURL(img.preview))
// //       setSelectedImages([])

// //       toast.success(`${uploadedUrls.length} image(s) uploaded successfully`)
// //       setIsGalleryOpen(false)
// //     } catch (error: any) {
// //       console.error("Error uploading images:", error)
// //       toast.error(error.message || "Failed to upload images")
// //     } finally {
// //       setIsUploading(false)
// //     }
// //   }

// //   const isVideo = (url: string) => {
// //     return url.includes(".mp4") || url.includes(".webm") || url.includes(".mov") || url.includes("video")
// //   }

// //   const totalImages = images.length + selectedImages.length

// //   return (
// //     <div className="space-y-4">
// //       {/* Header */}
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// //         <div>
// //           <Label className="text-base font-medium">
// //             Product Images ({images.length}/{maxImages})
// //           </Label>
// //           <p className="text-sm text-muted-foreground">Upload high-quality images of your product</p>
// //         </div>
// //         <Button
// //           type="button"
// //           onClick={openGallery}
// //           disabled={totalImages >= maxImages}
// //           className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
// //         >
// //           <Plus className="h-4 w-4 mr-2" />
// //           Add Images
// //         </Button>
// //       </div>

// //       {/* Uploaded Images Grid */}
// //       {images.length > 0 && (
// //         <div>
// //           <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
// //             <ImageIcon className="h-4 w-4" />
// //             Uploaded Images ({images.length})
// //           </h4>
// //           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
// //             {images.map((url, index) => (
// //               <div key={index} className="relative group">
// //                 <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 hover:border-blue-300 transition-colors">
// //                   {isVideo(url) ? (
// //                     <div className="relative w-full h-full">
// //                       <video src={url} className="w-full h-full object-cover" muted />
// //                       <div className="absolute inset-0 flex items-center justify-center bg-black/20">
// //                         <Play className="h-8 w-8 text-white" />
// //                       </div>
// //                     </div>
// //                   ) : (
// //                     <Image
// //                       src={url || "/placeholder.svg"}
// //                       alt={`Product image ${index + 1}`}
// //                       width={200}
// //                       height={200}
// //                       className="w-full h-full object-cover"
// //                     />
// //                   )}
// //                 </div>

// //                 {/* Action Buttons */}
// //                 <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
// //                   <Button
// //                     type="button"
// //                     size="sm"
// //                     variant="secondary"
// //                     onClick={() => setPreviewImage(url)}
// //                     className="h-6 w-6 p-0 bg-white/90 hover:bg-white"
// //                   >
// //                     <Eye className="h-3 w-3" />
// //                   </Button>
// //                   <Button
// //                     type="button"
// //                     size="sm"
// //                     variant="destructive"
// //                     onClick={() => removeUploadedImage(index)}
// //                     className="h-6 w-6 p-0"
// //                   >
// //                     <X className="h-3 w-3" />
// //                   </Button>
// //                 </div>

// //                 {/* Image Type Badge */}
// //                 <div className="absolute bottom-2 left-2">
// //                   <Badge variant="secondary" className="text-xs">
// //                     {isVideo(url) ? "Video" : "Image"}
// //                   </Badge>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}

// //       {/* Empty State */}
// //       {images.length === 0 && (
// //         <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
// //           <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// //           <p className="text-gray-500 font-medium">No images uploaded yet</p>
// //           <p className="text-sm text-gray-400 mb-4">Add images to showcase your product</p>
// //           <Button type="button" onClick={openGallery} variant="outline" className="rounded-xl bg-transparent">
// //             <FolderOpen className="h-4 w-4 mr-2" />
// //             Open Gallery
// //           </Button>
// //         </div>
// //       )}

// //       {/* Gallery Dialog */}
// //       <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
// //         <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
// //           <DialogHeader>
// //             <DialogTitle className="flex items-center gap-2">
// //               <FolderOpen className="h-5 w-5" />
// //               Image Gallery
// //             </DialogTitle>
// //           </DialogHeader>

// //           <div className="flex-1 overflow-y-auto space-y-6">
// //             {/* File Input */}
// //             <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
// //               <input
// //                 ref={fileInputRef}
// //                 type="file"
// //                 multiple
// //                 accept={acceptVideo ? "image/*,video/*" : "image/*"}
// //                 onChange={handleFileSelect}
// //                 className="hidden"
// //               />
// //               <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// //               <p className="text-gray-600 font-medium mb-2">Choose images from your device</p>
// //               <p className="text-sm text-gray-500 mb-4">
// //                 {acceptVideo ? "Images and videos" : "Images only"} • Max {maxImages} files
// //               </p>
// //               <Button
// //                 type="button"
// //                 onClick={() => fileInputRef.current?.click()}
// //                 disabled={totalImages >= maxImages}
// //                 className="rounded-xl"
// //               >
// //                 <FolderOpen className="h-4 w-4 mr-2" />
// //                 Browse Files
// //               </Button>
// //             </div>

// //             {/* Selected Images Preview */}
// //             {selectedImages.length > 0 && (
// //               <div>
// //                 <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
// //                   <ImageIcon className="h-4 w-4" />
// //                   Selected Images ({selectedImages.length})
// //                 </h4>
// //                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
// //                   {selectedImages.map((item, index) => (
// //                     <div key={index} className="relative group">
// //                       <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-blue-200">
// //                         {item.type === "video" ? (
// //                           <div className="relative w-full h-full">
// //                             <video src={item.preview} className="w-full h-full object-cover" muted />
// //                             <div className="absolute inset-0 flex items-center justify-center bg-black/20">
// //                               <Play className="h-6 w-6 text-white" />
// //                             </div>
// //                           </div>
// //                         ) : (
// //                           <Image
// //                             src={item.preview || "/placeholder.svg"}
// //                             alt={`Selected ${index + 1}`}
// //                             width={150}
// //                             height={150}
// //                             className="w-full h-full object-cover"
// //                           />
// //                         )}
// //                       </div>

// //                       {/* Remove Button */}
// //                       <Button
// //                         type="button"
// //                         size="sm"
// //                         variant="destructive"
// //                         onClick={() => removeSelectedImage(index)}
// //                         className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
// //                       >
// //                         <X className="h-3 w-3" />
// //                       </Button>

// //                       {/* Preview Button */}
// //                       <Button
// //                         type="button"
// //                         size="sm"
// //                         variant="secondary"
// //                         onClick={() => setPreviewImage(item.preview)}
// //                         className="absolute bottom-2 right-2 h-6 w-6 p-0 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
// //                       >
// //                         <Eye className="h-3 w-3" />
// //                       </Button>

// //                       {/* File Info */}
// //                       <div className="absolute bottom-2 left-2">
// //                         <Badge variant="secondary" className="text-xs">
// //                           {item.type}
// //                         </Badge>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Gallery Actions */}
// //             <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t">
// //               <div className="text-sm text-muted-foreground">
// //                 {selectedImages.length} selected • {images.length} uploaded • {maxImages - totalImages} remaining
// //               </div>
// //               <div className="flex gap-2">
// //                 <Button type="button" variant="outline" onClick={() => setIsGalleryOpen(false)} disabled={isUploading}>
// //                   Cancel
// //                 </Button>
// //                 <Button
// //                   type="button"
// //                   onClick={handleUploadSelected}
// //                   disabled={selectedImages.length === 0 || isUploading}
// //                   className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
// //                 >
// //                   {isUploading ? (
// //                     <>
// //                       <Loader2 className="h-4 w-4 mr-2 animate-spin" />
// //                       Uploading...
// //                     </>
// //                   ) : (
// //                     <>
// //                       <Upload className="h-4 w-4 mr-2" />
// //                       Upload {selectedImages.length} Image{selectedImages.length !== 1 ? "s" : ""}
// //                     </>
// //                   )}
// //                 </Button>
// //               </div>
// //             </div>
// //           </div>
// //         </DialogContent>
// //       </Dialog>

// //       {/* Image Preview Dialog */}
// //       <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
// //         <DialogContent className="max-w-4xl max-h-[90vh] p-0">
// //           <div className="relative">
// //             {previewImage && (
// //               <>
// //                 {isVideo(previewImage) ? (
// //                   <video src={previewImage} controls className="w-full h-auto max-h-[80vh] object-contain" />
// //                 ) : (
// //                   <Image
// //                     src={previewImage || "/placeholder.svg"}
// //                     alt="Preview"
// //                     width={800}
// //                     height={600}
// //                     className="w-full h-auto max-h-[80vh] object-contain"
// //                   />
// //                 )}
// //                 <Button
// //                   variant="secondary"
// //                   size="sm"
// //                   onClick={() => setPreviewImage(null)}
// //                   className="absolute top-4 right-4 rounded-full"
// //                 >
// //                   <X className="h-4 w-4" />
// //                 </Button>
// //               </>
// //             )}
// //           </div>
// //         </DialogContent>
// //       </Dialog>
// //     </div>
// //   )
// // }

// "use client"

// import type React from "react"

// import { useState, useRef } from "react"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { Badge } from "@/components/ui/badge"
// import { ImageIcon, Plus, X, Upload, Eye, FolderOpen, Camera, Play, Loader2 } from "lucide-react"
// import Image from "next/image"
// import { toast } from "react-hot-toast"

// interface ImageGalleryProps {
//   images: string[]
//   onImagesChange: (images: string[]) => void
//   maxImages?: number
//   acceptVideo?: boolean
// }

// interface SelectedImage {
//   file: File
//   preview: string
//   type: "image" | "video"
// }

// export function ImageGallery({ images, onImagesChange, maxImages = 10, acceptVideo = false }: ImageGalleryProps) {
//   const [isGalleryOpen, setIsGalleryOpen] = useState(false)
//   const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([])
//   const [previewImage, setPreviewImage] = useState<string | null>(null)
//   const [isUploading, setIsUploading] = useState(false)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const openGallery = () => {
//     setIsGalleryOpen(true)
//   }

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || [])
//     if (files.length === 0) return

//     const totalImages = selectedImages.length + images.length
//     if (totalImages + files.length > maxImages) {
//       toast.error(`Maximum ${maxImages} images allowed`)
//       return
//     }

//     const newSelectedImages: SelectedImage[] = []

//     files.forEach((file) => {
//       const isVideo = file.type.startsWith("video/")
//       const isImage = file.type.startsWith("image/")

//       if (!isImage && !isVideo) {
//         toast.error(`${file.name} is not a valid image or video file`)
//         return
//       }

//       if (isVideo && !acceptVideo) {
//         toast.error("Video files are not allowed")
//         return
//       }

//       const preview = URL.createObjectURL(file)
//       newSelectedImages.push({
//         file,
//         preview,
//         type: isVideo ? "video" : "image",
//       })
//     })

//     setSelectedImages((prev) => [...prev, ...newSelectedImages])

//     // Reset file input
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""
//     }
//   }

//   const removeSelectedImage = (index: number) => {
//     setSelectedImages((prev) => {
//       const newImages = [...prev]
//       // Revoke object URL to prevent memory leaks
//       URL.revokeObjectURL(newImages[index].preview)
//       newImages.splice(index, 1)
//       return newImages
//     })
//   }

//   const removeUploadedImage = (index: number) => {
//     const newImages = [...images]
//     newImages.splice(index, 1)
//     onImagesChange(newImages)
//   }

//   const uploadToCloudinary = async (file: File): Promise<string> => {
//     const formData = new FormData()
//     formData.append("file", file)
//     formData.append("upload_preset", "mahadev_baby_shop")

//     const resourceType = file.type.startsWith("video/") ? "video" : "image"

//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
//       {
//         method: "POST",
//         body: formData,
//       },
//     )

//     if (!response.ok) {
//       throw new Error(`Failed to upload ${file.name}`)
//     }

//     const data = await response.json()
//     return data.secure_url
//   }

//   const handleUploadSelected = async () => {
//     if (selectedImages.length === 0) {
//       toast.error("No images selected to upload")
//       return
//     }

//     setIsUploading(true)
//     try {
//       const uploadPromises = selectedImages.map((img) => uploadToCloudinary(img.file))
//       const uploadedUrls = await Promise.all(uploadPromises)

//       // Add uploaded URLs to existing images
//       onImagesChange([...images, ...uploadedUrls])

//       // Clear selected images and revoke object URLs
//       selectedImages.forEach((img) => URL.revokeObjectURL(img.preview))
//       setSelectedImages([])

//       toast.success(`${uploadedUrls.length} image(s) uploaded successfully`)
//       setIsGalleryOpen(false)
//     } catch (error: any) {
//       console.error("Error uploading images:", error)
//       toast.error(error.message || "Failed to upload images")
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   const isVideo = (url: string) => {
//     return url.includes(".mp4") || url.includes(".webm") || url.includes(".mov") || url.includes("video")
//   }

//   const totalImages = images.length + selectedImages.length

//   return (
//     <div className="space-y-4">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <Label className="text-base font-medium">
//             Product Images ({images.length}/{maxImages})
//           </Label>
//           <p className="text-sm text-muted-foreground">Upload high-quality images of your product</p>
//         </div>
//         <Button
//           type="button"
//           onClick={openGallery}
//           disabled={totalImages >= maxImages}
//           className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
//         >
//           <Plus className="h-4 w-4 mr-2" />
//           Add Images
//         </Button>
//       </div>

//       {/* Uploaded Images Grid */}
//       {images.length > 0 && (
//         <div>
//           <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
//             <ImageIcon className="h-4 w-4" />
//             Uploaded Images ({images.length})
//           </h4>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
//             {images.map((url, index) => (
//               <div key={index} className="relative group">
//                 <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 hover:border-blue-300 transition-colors">
//                   {isVideo(url) ? (
//                     <div className="relative w-full h-full">
//                       <video src={url} className="w-full h-full object-cover" muted />
//                       <div className="absolute inset-0 flex items-center justify-center bg-black/20">
//                         <Play className="h-8 w-8 text-white" />
//                       </div>
//                     </div>
//                   ) : (
//                     <Image
//                       src={url || "/placeholder.svg"}
//                       alt={`Product image ${index + 1}`}
//                       width={200}
//                       height={200}
//                       className="w-full h-full object-cover"
//                     />
//                   )}
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <Button
//                     type="button"
//                     size="sm"
//                     variant="secondary"
//                     onClick={() => setPreviewImage(url)}
//                     className="h-6 w-6 p-0 bg-white/90 hover:bg-white"
//                   >
//                     <Eye className="h-3 w-3" />
//                   </Button>
//                   <Button
//                     type="button"
//                     size="sm"
//                     variant="destructive"
//                     onClick={() => removeUploadedImage(index)}
//                     className="h-6 w-6 p-0"
//                   >
//                     <X className="h-3 w-3" />
//                   </Button>
//                 </div>

//                 {/* Image Type Badge */}
//                 <div className="absolute bottom-2 left-2">
//                   <Badge variant="secondary" className="text-xs">
//                     {isVideo(url) ? "Video" : "Image"}
//                   </Badge>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Empty State */}
//       {images.length === 0 && (
//         <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
//           <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//           <p className="text-gray-500 font-medium">No images uploaded yet</p>
//           <p className="text-sm text-gray-400 mb-4">Add images to showcase your product</p>
//           <Button type="button" onClick={openGallery} variant="outline" className="rounded-xl bg-transparent">
//             <FolderOpen className="h-4 w-4 mr-2" />
//             Open Gallery
//           </Button>
//         </div>
//       )}

//       {/* Gallery Dialog */}
//       <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
//         <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
//           <DialogHeader>
//             <DialogTitle className="flex items-center gap-2">
//               <FolderOpen className="h-5 w-5" />
//               Image Gallery
//             </DialogTitle>
//           </DialogHeader>

//           <div className="flex-1 overflow-y-auto space-y-6">
//             {/* File Input */}
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 multiple
//                 accept={acceptVideo ? "image/*,video/*" : "image/*"}
//                 onChange={handleFileSelect}
//                 className="hidden"
//               />
//               <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-600 font-medium mb-2">Choose images from your device</p>
//               <p className="text-sm text-gray-500 mb-4">
//                 {acceptVideo ? "Images and videos" : "Images only"} • Max {maxImages} files
//               </p>
//               <Button
//                 type="button"
//                 onClick={() => fileInputRef.current?.click()}
//                 disabled={totalImages >= maxImages}
//                 className="rounded-xl"
//               >
//                 <FolderOpen className="h-4 w-4 mr-2" />
//                 Browse Files
//               </Button>
//             </div>

//             {/* Selected Images Preview */}
//             {selectedImages.length > 0 && (
//               <div>
//                 <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
//                   <ImageIcon className="h-4 w-4" />
//                   Selected Images ({selectedImages.length})
//                 </h4>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//                   {selectedImages.map((item, index) => (
//                     <div key={index} className="relative group">
//                       <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-blue-200">
//                         {item.type === "video" ? (
//                           <div className="relative w-full h-full">
//                             <video src={item.preview} className="w-full h-full object-cover" muted />
//                             <div className="absolute inset-0 flex items-center justify-center bg-black/20">
//                               <Play className="h-6 w-6 text-white" />
//                             </div>
//                           </div>
//                         ) : (
//                           <Image
//                             src={item.preview || "/placeholder.svg"}
//                             alt={`Selected ${index + 1}`}
//                             width={150}
//                             height={150}
//                             className="w-full h-full object-cover"
//                           />
//                         )}
//                       </div>

//                       {/* Remove Button */}
//                       <Button
//                         type="button"
//                         size="sm"
//                         variant="destructive"
//                         onClick={() => removeSelectedImage(index)}
//                         className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                       >
//                         <X className="h-3 w-3" />
//                       </Button>

//                       {/* Preview Button */}
//                       <Button
//                         type="button"
//                         size="sm"
//                         variant="secondary"
//                         onClick={() => setPreviewImage(item.preview)}
//                         className="absolute bottom-2 right-2 h-6 w-6 p-0 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
//                       >
//                         <Eye className="h-3 w-3" />
//                       </Button>

//                       {/* File Info */}
//                       <div className="absolute bottom-2 left-2">
//                         <Badge variant="secondary" className="text-xs">
//                           {item.type}
//                         </Badge>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Gallery Actions */}
//             <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t">
//               <div className="text-sm text-muted-foreground">
//                 {selectedImages.length} selected • {images.length} uploaded • {maxImages - totalImages} remaining
//               </div>
//               <div className="flex gap-2">
//                 <Button type="button" variant="outline" onClick={() => setIsGalleryOpen(false)} disabled={isUploading}>
//                   Cancel
//                 </Button>
//                 <Button
//                   type="button"
//                   onClick={handleUploadSelected}
//                   disabled={selectedImages.length === 0 || isUploading}
//                   className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
//                 >
//                   {isUploading ? (
//                     <>
//                       <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                       Uploading...
//                     </>
//                   ) : (
//                     <>
//                       <Upload className="h-4 w-4 mr-2" />
//                       Upload {selectedImages.length} Image{selectedImages.length !== 1 ? "s" : ""}
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Image Preview Dialog */}
//       <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
//         <DialogContent className="max-w-4xl max-h-[90vh] p-0">
//           <div className="relative">
//             {previewImage && (
//               <>
//                 {isVideo(previewImage) ? (
//                   <video src={previewImage} controls className="w-full h-auto max-h-[80vh] object-contain" />
//                 ) : (
//                   <Image
//                     src={previewImage || "/placeholder.svg"}
//                     alt="Preview"
//                     width={800}
//                     height={600}
//                     className="w-full h-auto max-h-[80vh] object-contain"
//                   />
//                 )}
//                 <Button
//                   variant="secondary"
//                   size="sm"
//                   onClick={() => setPreviewImage(null)}
//                   className="absolute top-4 right-4 rounded-full"
//                 >
//                   <X className="h-4 w-4" />
//                 </Button>
//               </>
//             )}
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, Plus, X, Upload, Eye, FolderOpen, Camera, Play, Loader2 } from "lucide-react"
import Image from "next/image"
import { toast } from "react-hot-toast"

interface ImageGalleryProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
  acceptVideo?: boolean
}

interface SelectedImage {
  file: File
  preview: string
  type: "image" | "video"
}

export function ImageGallery({ images, onImagesChange, maxImages = 10, acceptVideo = false }: ImageGalleryProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([])
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const openGallery = () => {
    setIsGalleryOpen(true)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const totalImages = selectedImages.length + images.length
    if (totalImages + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`)
      return
    }

    const newSelectedImages: SelectedImage[] = []

    files.forEach((file) => {
      const isVideo = file.type.startsWith("video/")
      const isImage = file.type.startsWith("image/")

      if (!isImage && !isVideo) {
        toast.error(`${file.name} is not a valid image or video file`)
        return
      }

      if (isVideo && !acceptVideo) {
        toast.error("Video files are not allowed")
        return
      }

      const preview = URL.createObjectURL(file)
      newSelectedImages.push({
        file,
        preview,
        type: isVideo ? "video" : "image",
      })
    })

    setSelectedImages((prev) => [...prev, ...newSelectedImages])

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeSelectedImage = (index: number) => {
    setSelectedImages((prev) => {
      const newImages = [...prev]
      // Revoke object URL to prevent memory leaks
      URL.revokeObjectURL(newImages[index].preview)
      newImages.splice(index, 1)
      return newImages
    })
  }

  const removeUploadedImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    onImagesChange(newImages)
  }

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "mahadev_baby_shop")

    const resourceType = file.type.startsWith("video/") ? "video" : "image"

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
      {
        method: "POST",
        body: formData,
      },
    )

    if (!response.ok) {
      throw new Error(`Failed to upload... ${file.name}`)
    }

    const data = await response.json()
    return data.secure_url
  }

  const handleUploadSelected = async () => {
    if (selectedImages.length === 0) {
      toast.error("No images selected to upload")
      return
    }

    setIsUploading(true)
    try {
      const uploadPromises = selectedImages.map((img) => uploadToCloudinary(img.file))
      const uploadedUrls = await Promise.all(uploadPromises)

      // Add uploaded URLs to existing images
      onImagesChange([...images, ...uploadedUrls])

      // Clear selected images and revoke object URLs
      selectedImages.forEach((img) => URL.revokeObjectURL(img.preview))
      setSelectedImages([])

      toast.success(`${uploadedUrls.length} image(s) uploaded successfully`)
      setIsGalleryOpen(false)
    } catch (error: any) {
      console.error("Error uploading images:", error)
      toast.error(error.message || "Failed to upload images")
    } finally {
      setIsUploading(false)
    }
  }

  const isVideo = (url: string) => {
    return url.includes(".mp4") || url.includes(".webm") || url.includes(".mov") || url.includes("video")
  }

  const totalImages = images.length + selectedImages.length

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Label className="text-base font-medium">
            Product Images ({images.length}/{maxImages})
          </Label>
          <p className="text-sm text-muted-foreground">Upload high-quality images of your product</p>
        </div>
        <Button
          type="button"
          onClick={openGallery}
          disabled={totalImages >= maxImages}
          className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Images
        </Button>
      </div>

      {/* Uploaded Images Grid */}
      {images.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Uploaded Images ({images.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {images.map((url, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 hover:border-blue-300 transition-colors">
                  {isVideo(url) ? (
                    <div className="relative w-full h-full">
                      <video src={url} className="w-full h-full object-cover" muted />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={url || "/placeholder.svg"}
                      alt={`Product image ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => setPreviewImage(url)}
                    className="h-6 w-6 p-0 bg-white/90 hover:bg-white"
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => removeUploadedImage(index)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>

                {/* Image Type Badge */}
                <div className="absolute bottom-2 left-2">
                  <Badge variant="secondary" className="text-xs">
                    {isVideo(url) ? "Video" : "Image"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No images uploaded yet</p>
          <p className="text-sm text-gray-400 mb-4">Add images to showcase your product</p>
          <Button type="button" onClick={openGallery} variant="outline" className="rounded-xl bg-transparent">
            <FolderOpen className="h-4 w-4 mr-2" />
            Open Gallery
          </Button>
        </div>
      )}

      {/* Gallery Dialog */}
      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Image Gallery
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-6">
            {/* File Input */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={acceptVideo ? "image/*,video/*" : "image/*"}
                onChange={handleFileSelect}
                className="hidden"
              />
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium mb-2">Choose images from your device</p>
              <p className="text-sm text-gray-500 mb-4">
                {acceptVideo ? "Images and videos" : "Images only"} • Max {maxImages} files
              </p>
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={totalImages >= maxImages}
                className="rounded-xl"
              >
                <FolderOpen className="h-4 w-4 mr-2" />
                Browse Files
              </Button>
            </div>

            {/* Selected Images Preview */}
            {selectedImages.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Selected Images ({selectedImages.length})
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {selectedImages.map((item, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-blue-200">
                        {item.type === "video" ? (
                          <div className="relative w-full h-full">
                            <video src={item.preview} className="w-full h-full object-cover" muted />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <Play className="h-6 w-6 text-white" />
                            </div>
                          </div>
                        ) : (
                          <Image
                            src={item.preview || "/placeholder.svg"}
                            alt={`Selected ${index + 1}`}
                            width={150}
                            height={150}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Remove Button */}
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={() => removeSelectedImage(index)}
                        className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </Button>

                      {/* Preview Button */}
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() => setPreviewImage(item.preview)}
                        className="absolute bottom-2 right-2 h-6 w-6 p-0 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>

                      {/* File Info */}
                      <div className="absolute bottom-2 left-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                {selectedImages.length} selected • {images.length} uploaded • {maxImages - totalImages} remaining
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setIsGalleryOpen(false)} disabled={isUploading}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleUploadSelected}
                  disabled={selectedImages.length === 0 || isUploading}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload {selectedImages.length} Image{selectedImages.length !== 1 ? "s" : ""}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Preview Dialog */}
      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <div className="relative">
            {previewImage && (
              <>
                {isVideo(previewImage) ? (
                  <video src={previewImage} controls className="w-full h-auto max-h-[80vh] object-contain" />
                ) : (
                  <Image
                    src={previewImage || "/placeholder.svg"}
                    alt="Preview"
                    width={800}
                    height={600}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                )}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPreviewImage(null)}
                  className="absolute top-4 right-4 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
