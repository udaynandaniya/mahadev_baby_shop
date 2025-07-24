import { RefreshCw } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"

export default function Loading() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-3 text-lg font-medium">
          <RefreshCw className="h-6 w-6 animate-spin text-pink-500" />
          Loading Users...
        </div>
      </div>
    </div>
  )
}
