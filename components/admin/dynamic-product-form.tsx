"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, FileText, Scan, X, ImageIcon, Package } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

interface ProductFormData {
  name: string
  description: string
  price: string
  originalPrice: string
  category: string
  subcategory: string
  brand: string
  ageGroup: string
  size: string[]
  color: string[]
  material: string
  weight: string
  dimensions: string
  stock: string
  minStock: string
  sku: string
  barcode: string
  tags: string[]
  images: File[]
  documents: File[]
  isActive: boolean
  isFeatured: boolean
  seoTitle: string
  seoDescription: string
  metaKeywords: string[]
}

interface ScannedData {
  barcode?: string
  productName?: string
  price?: string
  category?: string
  brand?: string
  description?: string
}

export function DynamicProductForm() {
  const [activeTab, setActiveTab] = useState("form")
  const [isScanning, setIsScanning] = useState(false)
  const [scannedData, setScannedData] = useState<ScannedData | null>(null)
  const [isProcessingFile, setIsProcessingFile] = useState(false)
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    subcategory: "",
    brand: "",
    ageGroup: "",
    size: [],
    color: [],
    material: "",
    weight: "",
    dimensions: "",
    stock: "",
    minStock: "",
    sku: "",
    barcode: "",
    tags: [],
    images: [],
    documents: [],
    isActive: true,
    isFeatured: false,
    seoTitle: "",
    seoDescription: "",
    metaKeywords: [],
  })

  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // QR Code Scanning Functions
  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsScanning(true)

        // Simulate QR code detection (replace with actual QR scanner library)
        setTimeout(() => {
          const mockScannedData: ScannedData = {
            barcode: "1234567890123",
            productName: "Baby Cotton Romper",
            price: "899",
            category: "Rompers",
            brand: "BabyLove",
          }
          handleScannedData(mockScannedData)
        }, 3000)
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      })
    }
  }

  const stopScanning = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setIsScanning(false)
  }

  const handleScannedData = (data: ScannedData) => {
    setScannedData(data)
    setFormData((prev) => ({
      ...prev,
      name: data.productName || prev.name,
      price: data.price || prev.price,
      category: data.category || prev.category,
      brand: data.brand || prev.brand,
      barcode: data.barcode || prev.barcode,
      description: data.description || prev.description,
    }))
    stopScanning()
    setActiveTab("form")

    toast({
      title: "QR Code Scanned",
      description: "Product data has been automatically filled",
    })
  }

  // File Processing Functions
  const handleFileUpload = async (files: FileList) => {
    setIsProcessingFile(true)

    try {
      for (const file of Array.from(files)) {
        if (file.type === "application/pdf") {
          await processPDFFile(file)
        } else if (file.type.includes("text") || file.name.endsWith(".csv")) {
          await processTextFile(file)
        } else if (file.type.startsWith("image/")) {
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, file],
          }))
        }
      }

      toast({
        title: "Files Processed",
        description: "Product information extracted from uploaded files",
      })
    } catch (error) {
      toast({
        title: "File Processing Error",
        description: "Unable to process some files",
        variant: "destructive",
      })
    } finally {
      setIsProcessingFile(false)
    }
  }

  const processPDFFile = async (file: File) => {
    // Simulate PDF processing (replace with actual PDF parser)
    const mockPDFData = {
      name: "Premium Baby Onesie Set",
      description: "Soft cotton onesie perfect for newborns and infants",
      price: "1299",
      category: "Onesies",
      brand: "ComfortBaby",
      material: "100% Cotton",
      ageGroup: "0-12 months",
    }

    setFormData((prev) => ({
      ...prev,
      ...mockPDFData,
      documents: [...prev.documents, file],
    }))
  }

  const processTextFile = async (file: File) => {
    const text = await file.text()

    // Simple CSV parsing (replace with proper CSV parser)
    if (file.name.endsWith(".csv")) {
      const lines = text.split("\n")
      const headers = lines[0].split(",")
      const data = lines[1].split(",")

      const productData: any = {}
      headers.forEach((header, index) => {
        productData[header.trim().toLowerCase()] = data[index]?.trim()
      })

      setFormData((prev) => ({
        ...prev,
        name: productData.name || productData.product_name || prev.name,
        price: productData.price || prev.price,
        category: productData.category || prev.category,
        description: productData.description || prev.description,
        brand: productData.brand || prev.brand,
        stock: productData.stock || productData.quantity || prev.stock,
      }))
    }
  }

  // Form Handling Functions
  const updateFormField = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addArrayItem = (field: "size" | "color" | "tags" | "metaKeywords", value: string) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }))
    }
  }

  const removeArrayItem = (field: "size" | "color" | "tags" | "metaKeywords", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const generateSKU = () => {
    const sku = `${formData.category.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`
    updateFormField("sku", sku)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Create FormData for file uploads
      const submitData = new FormData()

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "images" || key === "documents") {
          ;(value as File[]).forEach((file) => {
            submitData.append(key, file)
          })
        } else if (Array.isArray(value)) {
          submitData.append(key, JSON.stringify(value))
        } else {
          submitData.append(key, value.toString())
        }
      })

      // Submit to API (replace with actual API call)

      toast({
        title: "Product Added",
        description: "Product has been successfully added to inventory",
      })

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        originalPrice: "",
        category: "",
        subcategory: "",
        brand: "",
        ageGroup: "",
        size: [],
        color: [],
        material: "",
        weight: "",
        dimensions: "",
        stock: "",
        minStock: "",
        sku: "",
        barcode: "",
        tags: [],
        images: [],
        documents: [],
        isActive: true,
        isFeatured: false,
        seoTitle: "",
        seoDescription: "",
        metaKeywords: [],
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Add New Product</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Add products by scanning QR codes, uploading files, or filling the form manually
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scan">
            <Scan className="h-4 w-4 mr-2" />
            QR Scan
          </TabsTrigger>
          <TabsTrigger value="upload">
            <Upload className="h-4 w-4 mr-2" />
            File Upload
          </TabsTrigger>
          <TabsTrigger value="form">
            <FileText className="h-4 w-4 mr-2" />
            Manual Form
          </TabsTrigger>
        </TabsList>

        {/* QR Scanner Tab */}
        <TabsContent value="scan">
          <Card>
            <CardHeader>
              <CardTitle>QR Code Scanner</CardTitle>
              <CardDescription>Scan product QR codes to automatically extract product information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center max-w-md mx-auto">
                {isScanning ? (
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <div className="text-center">
                    <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Camera preview will appear here</p>
                    <Button onClick={startScanning}>
                      <Camera className="h-4 w-4 mr-2" />
                      Start Scanning
                    </Button>
                  </div>
                )}
              </div>

              {isScanning && (
                <div className="text-center space-y-4">
                  <p className="text-sm text-gray-600">Point camera at QR code...</p>
                  <Button onClick={stopScanning} variant="outline">
                    <X className="h-4 w-4 mr-2" />
                    Stop Scanning
                  </Button>
                </div>
              )}

              {scannedData && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Scanned Data:</h4>
                  <div className="space-y-1 text-sm">
                    {Object.entries(scannedData).map(([key, value]) => (
                      <p key={key}>
                        <span className="font-medium">{key}:</span> {value}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* File Upload Tab */}
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>File Upload</CardTitle>
              <CardDescription>
                Upload PDF catalogs, CSV files, or product images to extract information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-4">Upload PDF catalogs or CSV files</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.csv,.txt"
                    onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                    className="hidden"
                  />
                  <Button onClick={() => fileInputRef.current?.click()} disabled={isProcessingFile}>
                    {isProcessingFile ? "Processing..." : "Choose Files"}
                  </Button>
                </div>

                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-4">Upload product images</p>
                  <input
                    ref={imageInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                    className="hidden"
                  />
                  <Button onClick={() => imageInputRef.current?.click()}>Choose Images</Button>
                </div>
              </div>

              {formData.images.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Uploaded Images:</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {formData.images.map((file, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={URL.createObjectURL(file) || "/placeholder.svg"}
                          alt={`Product ${index + 1}`}
                          width={100}
                          height={100}
                          className="object-cover rounded"
                        />
                        <Button
                          size="icon"
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-6 w-6"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              images: prev.images.filter((_, i) => i !== index),
                            }))
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {formData.documents.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Uploaded Documents:</h4>
                  <div className="space-y-2">
                    {formData.documents.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                      >
                        <span className="text-sm">{file.name}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              documents: prev.documents.filter((_, i) => i !== index),
                            }))
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manual Form Tab */}
        <TabsContent value="form">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateFormField("name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => updateFormField("brand", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateFormField("description", e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => updateFormField("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Rompers">Rompers</SelectItem>
                        <SelectItem value="Onesies">Onesies</SelectItem>
                        <SelectItem value="Dresses">Dresses</SelectItem>
                        <SelectItem value="Sleep Suits">Sleep Suits</SelectItem>
                        <SelectItem value="Accessories">Accessories</SelectItem>
                        <SelectItem value="Toys">Toys</SelectItem>
                        <SelectItem value="Feeding">Feeding</SelectItem>
                        <SelectItem value="Bath & Care">Bath & Care</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subcategory">Subcategory</Label>
                    <Input
                      id="subcategory"
                      value={formData.subcategory}
                      onChange={(e) => updateFormField("subcategory", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ageGroup">Age Group</Label>
                    <Select value={formData.ageGroup} onValueChange={(value) => updateFormField("ageGroup", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select age group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-3 months">0-3 months</SelectItem>
                        <SelectItem value="3-6 months">3-6 months</SelectItem>
                        <SelectItem value="6-12 months">6-12 months</SelectItem>
                        <SelectItem value="1-2 years">1-2 years</SelectItem>
                        <SelectItem value="2-3 years">2-3 years</SelectItem>
                        <SelectItem value="3+ years">3+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Inventory */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing & Inventory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => updateFormField("price", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">Original Price (₹)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => updateFormField("originalPrice", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity *</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => updateFormField("stock", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minStock">Minimum Stock</Label>
                    <Input
                      id="minStock"
                      type="number"
                      value={formData.minStock}
                      onChange={(e) => updateFormField("minStock", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <div className="flex gap-2">
                      <Input id="sku" value={formData.sku} onChange={(e) => updateFormField("sku", e.target.value)} />
                      <Button type="button" onClick={generateSKU}>
                        Generate
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input
                      id="barcode"
                      value={formData.barcode}
                      onChange={(e) => updateFormField("barcode", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="material">Material</Label>
                    <Input
                      id="material"
                      value={formData.material}
                      onChange={(e) => updateFormField("material", e.target.value)}
                      placeholder="e.g., 100% Cotton"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight</Label>
                    <Input
                      id="weight"
                      value={formData.weight}
                      onChange={(e) => updateFormField("weight", e.target.value)}
                      placeholder="e.g., 200g"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensions</Label>
                    <Input
                      id="dimensions"
                      value={formData.dimensions}
                      onChange={(e) => updateFormField("dimensions", e.target.value)}
                      placeholder="e.g., 30x20x5 cm"
                    />
                  </div>
                </div>

                {/* Size Options */}
                <div className="space-y-2">
                  <Label>Available Sizes</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.size.map((size, index) => (
                      <Badge key={index} variant="secondary">
                        {size}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-4 w-4 p-0"
                          onClick={() => removeArrayItem("size", index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add size (e.g., 0-3M, 3-6M)"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addArrayItem("size", e.currentTarget.value)
                          e.currentTarget.value = ""
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement
                        addArrayItem("size", input.value)
                        input.value = ""
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>

                {/* Color Options */}
                <div className="space-y-2">
                  <Label>Available Colors</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.color.map((color, index) => (
                      <Badge key={index} variant="secondary">
                        {color}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-4 w-4 p-0"
                          onClick={() => removeArrayItem("color", index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add color"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addArrayItem("color", e.currentTarget.value)
                          e.currentTarget.value = ""
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement
                        addArrayItem("color", input.value)
                        input.value = ""
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-4 w-4 p-0"
                          onClick={() => removeArrayItem("tags", index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add tag"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addArrayItem("tags", e.currentTarget.value)
                          e.currentTarget.value = ""
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement
                        addArrayItem("tags", input.value)
                        input.value = ""
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    value={formData.seoTitle}
                    onChange={(e) => updateFormField("seoTitle", e.target.value)}
                    placeholder="SEO optimized title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seoDescription">SEO Description</Label>
                  <Textarea
                    id="seoDescription"
                    value={formData.seoDescription}
                    onChange={(e) => updateFormField("seoDescription", e.target.value)}
                    placeholder="SEO meta description"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Meta Keywords</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.metaKeywords.map((keyword, index) => (
                      <Badge key={index} variant="outline">
                        {keyword}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-4 w-4 p-0"
                          onClick={() => removeArrayItem("metaKeywords", index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add keyword"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addArrayItem("metaKeywords", e.currentTarget.value)
                          e.currentTarget.value = ""
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement
                        addArrayItem("metaKeywords", input.value)
                        input.value = ""
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit">
                <Package className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}
