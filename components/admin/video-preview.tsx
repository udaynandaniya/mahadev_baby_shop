"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Play, Download } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface VideoPreviewProps {
  videos: string[]
  onRemove: (index: number) => void
  className?: string
}

export function VideoPreview({ videos, onRemove, className = "" }: VideoPreviewProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const handleDownload = async (videoUrl: string, index: number) => {
    try {
      const a = document.createElement("a")
      a.href = videoUrl
      a.download = `product-video-${index + 1}.mp4`
      a.target = "_blank"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading video:", error)
    }
  }

  if (videos.length === 0) return null

  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {videos.map((video, index) => (
          <div key={index} className="relative group">
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              <video src={video} className="w-full h-full object-cover" muted preload="metadata" />
            </div>

            {/* Overlay with actions */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="h-10 w-10 bg-white/90 hover:bg-white"
                onClick={() => setSelectedVideo(video)}
              >
                <Play className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="h-10 w-10 bg-white/90 hover:bg-white"
                onClick={() => handleDownload(video, index)}
              >
                <Download className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="h-10 w-10"
                onClick={() => onRemove(index)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Video number badge */}
            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              Video {index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Full-size video dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Video Preview</DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-0">
            {selectedVideo && (
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <video src={selectedVideo} controls className="w-full h-full" autoPlay />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
