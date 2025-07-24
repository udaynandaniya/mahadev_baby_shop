"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Share2,
  Search,
  Grid3X3,
  List,
  Video,
  RefreshCw,
  Copy,
  Facebook,
  Twitter,
  MessageCircle,
  Mail,
  ExternalLink,
  DollarSign,
  Clock,
  Eye,
} from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"
import { toast } from "react-hot-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

interface VideoItem {
  _id: string
  name: string
  productCode: string
  videoUrl: string
  sellingPrice: number
  actualPrice?: number
  description?: string
  createdAt: string
}

interface VideoPlayerProps {
  video: VideoItem
  isPlaying: boolean
  onPlayPause: () => void
  isMuted: boolean
  onMuteToggle: () => void
}

const VideoPlayer = ({ video, isPlaying, onPlayPause, isMuted, onMuteToggle }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handleLoadedData = () => {
      setIsLoading(false)
      setDuration(videoElement.duration)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime)
    }

    const handleEnded = () => {
      onPlayPause()
    }

    videoElement.addEventListener("loadeddata", handleLoadedData)
    videoElement.addEventListener("timeupdate", handleTimeUpdate)
    videoElement.addEventListener("ended", handleEnded)

    return () => {
      videoElement.removeEventListener("loadeddata", handleLoadedData)
      videoElement.removeEventListener("timeupdate", handleTimeUpdate)
      videoElement.removeEventListener("ended", handleEnded)
    }
  }, [onPlayPause])

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted])

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number.parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="relative group">
      <div className="aspect-video relative bg-gray-900 rounded-lg overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <RefreshCw className="h-8 w-8 text-white animate-spin" />
          </div>
        )}
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="w-full h-full object-cover"
          preload="metadata"
          playsInline
          onClick={onPlayPause}
        />

        {/* Play/Pause Overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={onPlayPause}
        >
          {isPlaying ? <Pause className="h-16 w-16 text-white/80" /> : <Play className="h-16 w-16 text-white/80" />}
        </div>

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Progress Bar */}
          <div className="mb-3">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onPlayPause} className="text-white hover:bg-white/20 p-2">
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>

              <Button variant="ghost" size="sm" onClick={onMuteToggle} className="text-white hover:bg-white/20 p-2">
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>

              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShareDialog = ({ video }: { video: VideoItem }) => {
  const videoUrl = `${window.location.origin}/video?id=${video._id}`

  const shareOptions = [
    {
      name: "Copy Link",
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText(videoUrl)
        toast.success("Link copied to clipboard!")
      },
      color: "text-gray-600",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      action: () => {
        window.open(
          `https://wa.me/?text=Check out this amazing product video: ${encodeURIComponent(videoUrl)}`,
          "_blank",
        )
      },
      color: "text-green-600",
    },
    {
      name: "Facebook",
      icon: Facebook,
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`, "_blank")
      },
      color: "text-blue-600",
    },
    {
      name: "Twitter",
      icon: Twitter,
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(videoUrl)}&text=Check out this product: ${encodeURIComponent(video.name)}`,
          "_blank",
        )
      },
      color: "text-blue-400",
    },
    {
      name: "Email",
      icon: Mail,
      action: () => {
        window.open(
          `mailto:?subject=${encodeURIComponent(video.name)}&body=Check out this product video: ${encodeURIComponent(videoUrl)}`,
          "_blank",
        )
      },
      color: "text-red-600",
    },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full bg-transparent">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Video
          </DialogTitle>
          <DialogDescription>Share "{video.name}" with others</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* URL Display */}
          <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Input value={videoUrl} readOnly className="border-0 bg-transparent text-sm" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(videoUrl)
                toast.success("Link copied!")
              }}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <Separator />

          {/* Share Options */}
          <div className="grid grid-cols-2 gap-3">
            {shareOptions.map((option) => (
              <Button
                key={option.name}
                variant="outline"
                onClick={option.action}
                className="flex items-center gap-2 h-12 bg-transparent"
              >
                <option.icon className={`h-5 w-5 ${option.color}`} />
                <span className="text-sm">{option.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function VideoPage() {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [filteredVideos, setFilteredVideos] = useState<VideoItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)
  const [mutedVideos, setMutedVideos] = useState<Set<string>>(new Set())
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)

  useEffect(() => {
    fetchVideos()
  }, [])

  useEffect(() => {
    filterVideos()
  }, [videos, searchQuery])

  const fetchVideos = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/videos")
      if (!response.ok) throw new Error("Failed to fetch videos")

      const data = await response.json()
      setVideos(data.data || [])
    } catch (error) {
      console.error("Error fetching videos:", error)
      toast.error("Failed to load videos")
    } finally {
      setIsLoading(false)
    }
  }

  const filterVideos = () => {
    if (!searchQuery.trim()) {
      setFilteredVideos(videos)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = videos.filter(
      (video) =>
        video.name.toLowerCase().includes(query) ||
        video.productCode.toLowerCase().includes(query) ||
        video.description?.toLowerCase().includes(query),
    )
    setFilteredVideos(filtered)
  }

  const handlePlayPause = (videoId: string) => {
    if (playingVideo === videoId) {
      setPlayingVideo(null)
    } else {
      setPlayingVideo(videoId)
    }
  }

  const handleMuteToggle = (videoId: string) => {
    setMutedVideos((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(videoId)) {
        newSet.delete(videoId)
      } else {
        newSet.add(videoId)
      }
      return newSet
    })
  }

  const openVideoModal = (video: VideoItem) => {
    setSelectedVideo(video)
    setPlayingVideo(video._id)
  }

  const closeVideoModal = () => {
    setSelectedVideo(null)
    setPlayingVideo(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="flex items-center gap-3 text-lg font-medium">
            <RefreshCw className="h-6 w-6 animate-spin text-pink-500" />
            Loading Videos...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Product Videos
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              Discover our amazing products through interactive video demonstrations
            </p>
          </div>

          {/* Search and Controls */}
          <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search videos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-full"
                  />
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-full"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-full"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Video className="h-4 w-4" />
                    {filteredVideos.length} videos
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    Watch & Share
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Videos Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <Card key={video._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <VideoPlayer
                      video={video}
                      isPlaying={playingVideo === video._id}
                      onPlayPause={() => handlePlayPause(video._id)}
                      isMuted={mutedVideos.has(video._id)}
                      onMuteToggle={() => handleMuteToggle(video._id)}
                    />

                    {/* Expand Button */}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => openVideoModal(video)}
                      className="absolute top-2 right-2 h-8 w-8 p-0 bg-black/50 hover:bg-black/70 text-white border-0"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>

                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-1">{video.name}</h3>
                      <p className="text-xs text-muted-foreground font-mono">{video.productCode}</p>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-green-600">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-bold">₹{video.sellingPrice}</span>
                      </div>
                      {video.actualPrice && video.actualPrice > video.sellingPrice && (
                        <span className="text-sm text-muted-foreground line-through">₹{video.actualPrice}</span>
                      )}
                    </div>

                    {/* Description */}
                    {video.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">{video.description}</p>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {new Date(video.createdAt).toLocaleDateString()}
                      </div>
                      <ShareDialog video={video} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVideos.map((video) => (
                <Card key={video._id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Video Thumbnail */}
                      <div className="w-full md:w-80 flex-shrink-0">
                        <VideoPlayer
                          video={video}
                          isPlaying={playingVideo === video._id}
                          onPlayPause={() => handlePlayPause(video._id)}
                          isMuted={mutedVideos.has(video._id)}
                          onMuteToggle={() => handleMuteToggle(video._id)}
                        />
                      </div>

                      {/* Video Info */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{video.name}</h3>
                          <p className="text-sm text-muted-foreground font-mono">{video.productCode}</p>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-green-600">
                            <DollarSign className="h-5 w-5" />
                            <span className="font-bold text-xl">₹{video.sellingPrice}</span>
                          </div>
                          {video.actualPrice && video.actualPrice > video.sellingPrice && (
                            <span className="text-muted-foreground line-through">₹{video.actualPrice}</span>
                          )}
                        </div>

                        {/* Description */}
                        {video.description && <p className="text-muted-foreground">{video.description}</p>}

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {new Date(video.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openVideoModal(video)}
                              className="rounded-full"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Full Screen
                            </Button>
                            <ShareDialog video={video} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredVideos.length === 0 && (
            <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
              <CardContent className="text-center py-12">
                <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No videos found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? "Try adjusting your search terms" : "No videos available at the moment"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Full Screen Video Modal */}
      {selectedVideo && (
        <Dialog open={!!selectedVideo} onOpenChange={closeVideoModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0">
            <div className="relative">
              <VideoPlayer
                video={selectedVideo}
                isPlaying={playingVideo === selectedVideo._id}
                onPlayPause={() => handlePlayPause(selectedVideo._id)}
                isMuted={mutedVideos.has(selectedVideo._id)}
                onMuteToggle={() => handleMuteToggle(selectedVideo._id)}
              />

              {/* Video Info Overlay */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold">{selectedVideo.name}</h2>
                    <p className="text-sm text-muted-foreground font-mono">{selectedVideo.productCode}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-green-600">
                        <DollarSign className="h-5 w-5" />
                        <span className="font-bold text-xl">₹{selectedVideo.sellingPrice}</span>
                      </div>
                      {selectedVideo.actualPrice && selectedVideo.actualPrice > selectedVideo.sellingPrice && (
                        <span className="text-muted-foreground line-through">₹{selectedVideo.actualPrice}</span>
                      )}
                    </div>
                  </div>
                  <ShareDialog video={selectedVideo} />
                </div>

                {selectedVideo.description && <p className="text-muted-foreground">{selectedVideo.description}</p>}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
