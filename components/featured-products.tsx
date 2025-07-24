"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star, Eye } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "Cute Baby Dress",
    price: 599,
    originalPrice: 799,
    image: "/placeholder.svg?height=300&width=300&text=Baby Dress",
    rating: 4.8,
    reviews: 24,
    category: "Dresses",
    isNew: true,
  },
  {
    id: 2,
    name: "Baby Boy Romper",
    price: 449,
    originalPrice: 599,
    image: "/placeholder.svg?height=300&width=300&text=Baby Romper",
    rating: 4.9,
    reviews: 18,
    category: "Rompers",
    isBestseller: true,
  },
  {
    id: 3,
    name: "Soft Baby Blanket",
    price: 899,
    originalPrice: 1199,
    image: "/placeholder.svg?height=300&width=300&text=Baby Blanket",
    rating: 5.0,
    reviews: 32,
    category: "Accessories",
    isNew: true,
  },
  {
    id: 4,
    name: "Baby Shoes Set",
    price: 349,
    originalPrice: 499,
    image: "/placeholder.svg?height=300&width=300&text=Baby Shoes",
    rating: 4.7,
    reviews: 15,
    category: "Footwear",
    isBestseller: true,
  },
]

export function FeaturedProducts() {
  const [likedProducts, setLikedProducts] = useState<number[]>([])

  const toggleLike = (productId: number) => {
    setLikedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background relative overflow-hidden">
      {/* Section Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30 dark:from-gray-900/30 dark:via-background dark:to-gray-900/30" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 mb-4 md:mb-6">
            <Star className="h-3 w-3 md:h-4 md:w-4 text-pink-500 dark:text-pink-400" />
            <span className="text-xs md:text-sm font-semibold text-pink-700 dark:text-pink-300">Featured Products</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 dark:from-white dark:via-purple-100 dark:to-blue-100 bg-clip-text text-transparent">
            Our Best Sellers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base lg:text-lg leading-relaxed px-4 md:px-0">
            Discover our handpicked selection of premium baby products, loved by parents across Mangrol
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-2xl hover:shadow-pink-500/10 dark:hover:shadow-purple-500/20 transition-all duration-500 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badges - Mobile Responsive */}
                <div className="absolute top-2 md:top-3 left-2 md:left-3 flex flex-col gap-1">
                  {product.isNew && (
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-xs shadow-lg">
                      New
                    </Badge>
                  )}
                  {product.isBestseller && (
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-xs shadow-lg">
                      Bestseller
                    </Badge>
                  )}
                </div>

                {/* Action Buttons - Mobile Responsive */}
                <div className="absolute top-2 md:top-3 right-2 md:right-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-7 w-7 md:h-8 md:w-8 bg-white/95 dark:bg-gray-800/95 hover:bg-white dark:hover:bg-gray-700 shadow-lg backdrop-blur-sm"
                    onClick={() => toggleLike(product.id)}
                  >
                    <Heart
                      className={`h-3 w-3 md:h-4 md:w-4 transition-colors ${
                        likedProducts.includes(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-7 w-7 md:h-8 md:w-8 bg-white/95 dark:bg-gray-800/95 hover:bg-white dark:hover:bg-gray-700 shadow-lg backdrop-blur-sm"
                    asChild
                  >
                    <Link href={`/products/${product.id}`}>
                      <Eye className="h-3 w-3 md:h-4 md:w-4 text-gray-600 dark:text-gray-300" />
                    </Link>
                  </Button>
                </div>

                {/* Discount Badge */}
                {product.originalPrice > product.price && (
                  <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3">
                    <Badge
                      variant="destructive"
                      className="text-xs shadow-lg bg-gradient-to-r from-red-500 to-pink-500"
                    >
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-3 md:p-4">
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="text-xs border-pink-200 dark:border-purple-700 text-pink-700 dark:text-pink-300"
                    >
                      {product.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2">
                    <span className="text-lg md:text-xl font-bold text-primary">₹{product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-3 md:p-4 pt-0">
                <Button
                  className="w-full text-sm bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300"
                  size="sm"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600 bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur-sm rounded-xl px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-semibold hover:shadow-lg transition-all duration-300"
            asChild
          >
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
