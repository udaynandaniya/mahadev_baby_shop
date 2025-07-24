"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Play, DollarSign } from "lucide-react"

interface VideoItem {
  _id: string
  name: string
  productCode: string
  videoUrl: string
  sellingPrice: number
  actualPrice?: number
  description?: string
}

interface VideoDisplayProps {
  limit?: number
  showPricing?: boolean
  className?: string
}

export function VideoDisplay({ limit, showPricing = true, className = "" }: VideoDisplayProps) {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/videos")
      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      let videoList = data.data || []

      if (limit) {
        videoList = videoList.slice(0, limit)
      }

      setVideos(videoList)
    } catch (error) {
      console.error("Error fetching videos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {Array.from({ length: limit || 6 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="aspect-video bg-gray-200 animate-pulse" />
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 font-medium">No videos available</p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {videos.map((video) => (
        <Card key={video._id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative aspect-video bg-gray-100">
            <video
              src={video.videoUrl}
              className="w-full h-full object-cover"
              controls={false}
              muted
              preload="metadata"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors cursor-pointer">
              <Play className="h-12 w-12 text-white/80" />
            </div>
          </div>
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="font-medium text-sm line-clamp-2">{video.name}</h3>
              <p className="text-xs text-muted-foreground font-mono">{video.productCode}</p>

              {showPricing && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-green-600">
                    <DollarSign className="h-3 w-3" />
                    <span className="text-sm font-medium">₹{video.sellingPrice}</span>
                  </div>
                  {video.actualPrice && video.actualPrice > video.sellingPrice && (
                    <span className="text-xs text-muted-foreground line-through">₹{video.actualPrice}</span>
                  )}
                </div>
              )}

              {video.description && <p className="text-xs text-muted-foreground line-clamp-2">{video.description}</p>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
