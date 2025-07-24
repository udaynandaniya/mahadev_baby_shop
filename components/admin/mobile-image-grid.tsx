"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, X, Play, ImageIcon } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface MobileImageGridProps {
  images: string[]
  onRemoveImage: (index: number) => void
  maxDisplay?: number
}

export function MobileImageGrid({ images, onRemoveImage, maxDisplay = 4 }: MobileImageGridProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const isVideo = (url: string) => {
    return url.includes(".mp4") || url.includes(".webm") || url.includes(".mov") || url.includes("video")
  }

  const displayImages = showAll ? images : images.slice(0, maxDisplay)
  const remainingCount = images.length - maxDisplay

  return (
    <>
      <div className="space-y-3">
        {/* Mobile Grid */}
        <div className="grid grid-cols-2 gap-2 sm:hidden">
          {displayImages.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border">
                {isVideo(url) ? (
                  <div className="relative w-full h-full">
                    <video src={url} className="w-full h-full object-cover" muted />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  </div>
                ) : (
                  <Image
                    src={url || "/placeholder.svg"}
                    alt={`Image ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Mobile Actions */}
              <div className="absolute top-1 right-1 flex flex-col gap-1">
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => setPreviewImage(url)}
                  className="h-6 w-6 p-0 bg-white/90"
                >
                  <Eye className="h-3 w-3" />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={() => onRemoveImage(index)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>

              <Badge variant="secondary" className="absolute bottom-1 left-1 text-xs">
                {isVideo(url) ? "Video" : "Image"}
              </Badge>
            </div>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {displayImages.map((url, index) => (
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
                    alt={`Image ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

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
                  onClick={() => onRemoveImage(index)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>

              <Badge variant="secondary" className="absolute bottom-2 left-2 text-xs">
                {isVideo(url) ? "Video" : "Image"}
              </Badge>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {!showAll && remainingCount > 0 && (
          <Button type="button" variant="outline" onClick={() => setShowAll(true)} className="w-full rounded-xl">
            <ImageIcon className="h-4 w-4 mr-2" />
            Show {remainingCount} more image{remainingCount !== 1 ? "s" : ""}
          </Button>
        )}

        {/* Show Less Button */}
        {showAll && images.length > maxDisplay && (
          <Button type="button" variant="outline" onClick={() => setShowAll(false)} className="w-full rounded-xl">
            Show Less
          </Button>
        )}
      </div>

      {/* Preview Dialog */}
      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-2 sm:p-6">
          <div className="relative">
            {previewImage && (
              <>
                {isVideo(previewImage) ? (
                  <video src={previewImage} controls className="w-full h-auto max-h-[85vh] object-contain rounded-lg" />
                ) : (
                  <Image
                    src={previewImage || "/placeholder.svg"}
                    alt="Preview"
                    width={800}
                    height={600}
                    className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                  />
                )}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPreviewImage(null)}
                  className="absolute top-2 right-2 rounded-full z-10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
