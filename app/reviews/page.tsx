import { Reviews } from "@/components/reviews"
import { AnimatedBackground } from "@/components/animated-background"

export default function ReviewsPage() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Reviews />
      </div>
    </div>
  )
}
