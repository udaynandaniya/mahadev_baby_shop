"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SliderItem {
  _id: string
  images: string[]
  groupName: string
  order?: number
  caption?: string
  altText?: string
}

interface SliderDisplayProps {
  groupName: string
  autoPlay?: boolean
  autoPlayInterval?: number
  showControls?: boolean
  showDots?: boolean
  className?: string
}

export function SliderDisplay({
  groupName,
  autoPlay = true,
  autoPlayInterval = 5000,
  showControls = true,
  showDots = true,
  className = "",
}: SliderDisplayProps) {
  const [sliders, setSliders] = useState<SliderItem[]>([])
  const [currentSliderIndex, setCurrentSliderIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Flatten all images from all sliders
  const allImages = sliders.flatMap((slider, sliderIdx) =>
    slider.images.map((image, imgIdx) => ({
      url: image,
      caption: slider.caption,
      altText: slider.altText,
      sliderIndex: sliderIdx,
      imageIndex: imgIdx,
    })),
  )

  useEffect(() => {
    fetchSliders()
  }, [groupName])

  useEffect(() => {
    if (!autoPlay || allImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, allImages.length])

  const fetchSliders = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admin/sliders?groupName=${groupName}`)
      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      setSliders(data.data || [])
    } catch (error) {
      console.error("Error fetching sliders:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  if (isLoading) {
    return (
      <div className={`relative aspect-video bg-gray-200 animate-pulse rounded-lg ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400">Loading slider...</div>
        </div>
      </div>
    )
  }

  if (allImages.length === 0) {
    return (
      <div className={`relative aspect-video bg-gray-100 rounded-lg ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400">No slides available</div>
        </div>
      </div>
    )
  }

  const currentImage = allImages[currentImageIndex]

  return (
    <div className={`relative aspect-video overflow-hidden rounded-lg ${className}`}>
      {/* Main Image */}
      <div className="relative w-full h-full">
        <Image
          src={currentImage.url || "/placeholder.svg"}
          alt={currentImage.altText || currentImage.caption || `Slide ${currentImageIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-500"
          priority={currentImageIndex === 0}
        />

        {/* Caption Overlay */}
        {currentImage.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <p className="text-white text-lg font-medium">{currentImage.caption}</p>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      {showControls && allImages.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0 rounded-full h-10 w-10 p-0"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0 rounded-full h-10 w-10 p-0"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && allImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {allImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      <div className="absolute top-4 right-4">
        <div className="bg-black/50 text-white text-xs px-2 py-1 rounded">
          {currentImageIndex + 1} / {allImages.length}
        </div>
      </div>
    </div>
  )
}
