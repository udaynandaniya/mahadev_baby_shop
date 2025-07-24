"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Pause, Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const sliderImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=500&width=900&text=Premium Baby Clothes Collection",
    alt: "Baby Clothes Collection",
    title: "Premium Baby Clothes",
    description: "Soft, comfortable, and stylish clothes for your little ones",
    badge: "New Collection",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=500&width=900&text=Fun Baby Toys & Accessories",
    alt: "Baby Toys & Accessories",
    title: "Fun Toys & Accessories",
    description: "Safe and educational toys for healthy development",
    badge: "Best Sellers",
    color: "from-purple-500 to-violet-500",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=500&width=900&text=Essential Baby Care Products",
    alt: "Baby Care Products",
    title: "Essential Care Products",
    description: "Everything you need for your baby's daily care",
    badge: "Premium Quality",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=500&width=900&text=Cute Baby Footwear Collection",
    alt: "Baby Footwear",
    title: "Cute Baby Footwear",
    description: "First steps deserve the best shoes",
    badge: "Trending",
    color: "from-green-500 to-emerald-500",
  },
]

export function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!isAutoPlaying || isHovered) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isHovered])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-background via-muted/30 to-background dark:from-background dark:via-gray-900/30 dark:to-background relative overflow-hidden">
      {/* Section Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/8 via-purple-500/8 to-blue-500/8 dark:from-pink-500/12 dark:via-purple-500/12 dark:to-blue-500/12" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 mb-4 md:mb-6">
            <Star className="h-3 w-3 md:h-4 md:w-4 text-pink-500 dark:text-pink-400" />
            <span className="text-xs md:text-sm font-semibold text-pink-700 dark:text-pink-300">Our Collection</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 dark:from-white dark:via-purple-100 dark:to-blue-100 bg-clip-text text-transparent">
            Discover Our Premium Range
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-sm md:text-base lg:text-lg leading-relaxed px-4 md:px-0">
            Explore our carefully curated collection of premium baby products, designed with love and crafted for
            comfort
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <Card
            className="overflow-hidden shadow-2xl border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px]">
              {sliderImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  }`}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />

                  {/* Enhanced Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${image.color} opacity-25`} />

                  {/* Content - Mobile Responsive */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12 text-white">
                    <div className="max-w-2xl">
                      <Badge
                        className={`mb-3 md:mb-4 bg-gradient-to-r ${image.color} border-0 text-white shadow-lg text-xs md:text-sm`}
                      >
                        {image.badge}
                      </Badge>
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 leading-tight">
                        {image.title}
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 mb-4 md:mb-6 leading-relaxed">
                        {image.description}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                        <Button
                          size="lg"
                          className={`bg-gradient-to-r ${image.color} hover:scale-105 transition-all duration-300 shadow-lg rounded-xl text-sm md:text-base`}
                        >
                          Shop Now
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className="border-white/40 text-white hover:bg-white/20 backdrop-blur-sm rounded-xl bg-transparent text-sm md:text-base"
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          Add to Wishlist
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Navigation Arrows - Mobile Responsive */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 md:left-4 lg:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-white/25 hover:bg-white/35 text-white backdrop-blur-md border border-white/30 rounded-xl md:rounded-2xl shadow-xl hover:scale-110 transition-all duration-300"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-white/25 hover:bg-white/35 text-white backdrop-blur-md border border-white/30 rounded-xl md:rounded-2xl shadow-xl hover:scale-110 transition-all duration-300"
                onClick={nextSlide}
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8" />
              </Button>

              {/* Play/Pause Button - Mobile Responsive */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 md:top-4 lg:top-8 right-2 md:right-4 lg:right-8 w-10 h-10 md:w-12 md:h-12 bg-white/25 hover:bg-white/35 text-white backdrop-blur-md border border-white/30 rounded-xl md:rounded-2xl shadow-xl hover:scale-110 transition-all duration-300"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              >
                {isAutoPlaying ? (
                  <Pause className="h-4 w-4 md:h-5 md:w-5" />
                ) : (
                  <Play className="h-4 w-4 md:h-5 md:w-5" />
                )}
              </Button>
            </div>
          </Card>

          {/* Enhanced Dots Indicator - Mobile Responsive */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-2 md:space-x-3">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative transition-all duration-500 rounded-full ${
                  index === currentSlide
                    ? "w-8 md:w-12 h-2.5 md:h-3 bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg"
                    : "w-2.5 md:w-3 h-2.5 md:h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
              >
                {index === currentSlide && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Slide Counter - Mobile Responsive */}
          <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 bg-black/60 backdrop-blur-sm text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
            {currentSlide + 1} / {sliderImages.length}
          </div>
        </div>
      </div>
    </section>
  )
}
