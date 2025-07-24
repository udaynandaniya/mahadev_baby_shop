"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Edit, Trash2, MoreVertical, Star, Eye, Copy, Package, AlertTriangle } from "lucide-react"
import { toast } from "react-hot-toast"

interface ProductCardProps {
  product: {
    _id: string
    name: string
    productCode: string
    sellingPrice: number
    actualPrice?: number
    inStock: number
    images: string[]
    category?: string[] | string
    description?: string
    createdAt: string
  }
  onEdit: (product: any) => void
  onDelete: (id: string) => void
  type: "clothes" | "toys" | "bath" | "newborn"
}

export function ProductCard({ product, onEdit, onDelete, type }: ProductCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [imageError, setImageError] = useState(false)

  const discount =
    product.actualPrice && product.actualPrice > product.sellingPrice
      ? Math.round(((product.actualPrice - product.sellingPrice) / product.actualPrice) * 100)
      : 0

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", variant: "destructive" as const, color: "text-red-600" }
    if (stock <= 5) return { label: "Low Stock", variant: "secondary" as const, color: "text-orange-600" }
    return { label: "In Stock", variant: "default" as const, color: "text-green-600" }
  }

  const stockStatus = getStockStatus(product.inStock)

  const handleCopyCode = () => {
    navigator.clipboard.writeText(product.productCode)
    toast.success("Product code copied!")
  }

  const handleDelete = () => {
    onDelete(product._id)
    setShowDeleteDialog(false)
  }

  const formatCategory = (category: string[] | string | undefined) => {
    if (!category) return ""
    if (Array.isArray(category)) {
      return category.join(", ")
    }
    return category
  }

  return (
    <>
      <Card className="group border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
          {product.images.length > 0 && !imageError ? (
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Package className="h-12 w-12 md:h-16 md:w-16 text-gray-400" />
            </div>
          )}

          {/* Stock Status Badge */}
          <div className="absolute top-2 left-2">
            <Badge variant={stockStatus.variant} className="text-xs font-medium">
              {stockStatus.label}
            </Badge>
          </div>

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold">-{discount}%</Badge>
            </div>
          )}

          {/* Actions Menu */}
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => onEdit(product)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Product
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCopyCode}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Product Code
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-red-600 dark:text-red-400">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Product
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Product Info */}
        <CardContent className="p-3 md:p-4">
          {/* Product Code */}
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs font-mono">
              {product.productCode}
            </Badge>
            {product.inStock <= 5 && product.inStock > 0 && <AlertTriangle className="h-4 w-4 text-orange-500" />}
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
            {product.name}
          </h3>

          {/* Category */}
          {product.category && (
            <p className="text-xs text-muted-foreground mb-2 capitalize">{formatCategory(product.category)}</p>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-lg text-green-600 dark:text-green-400">₹{product.sellingPrice}</span>
            {product.actualPrice && product.actualPrice > product.sellingPrice && (
              <span className="text-sm text-muted-foreground line-through">₹{product.actualPrice}</span>
            )}
          </div>

          {/* Stock Info */}
          <div className="flex items-center justify-between mb-3">
            <span className={`text-sm font-medium ${stockStatus.color}`}>Stock: {product.inStock}</span>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-muted-foreground">4.5</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(product)}
              className="flex-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:border-blue-200"
            >
              <Edit className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Edit</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
              className="flex-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/50 hover:border-red-200 text-red-600 dark:text-red-400"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Delete</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="max-w-md mx-4">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Delete Product
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{product.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="w-full sm:w-auto bg-red-600 hover:bg-red-700">
              Delete Product
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
