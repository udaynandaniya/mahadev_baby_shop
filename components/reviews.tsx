"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  MessageSquare,
  Shield,
  Users,
  TrendingUp,
  Loader2,
  AlertCircle,
  CheckCircle,
  LogIn,
  UserPlus,
} from "lucide-react"
import { useAuth } from "@/app/contexts/auth-provider"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Review {
  id: string
  name: string
  rating: number
  comment: string
  date: string
  isVerified: boolean
}

interface ReviewStats {
  totalReviews: number
  averageRating: number
  ratingDistribution: { [key: number]: number }
}

const StarRating = ({ rating, size = "sm", interactive = false, onRatingChange }: any) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? "button" : undefined}
          onClick={interactive ? () => onRatingChange?.(star) : undefined}
          className={interactive ? "p-1 hover:scale-110 transition-transform" : ""}
          disabled={!interactive}
        >
          <Star
            className={`${sizeClasses[size]} ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            } ${interactive ? "cursor-pointer" : ""}`}
          />
        </button>
      ))}
    </div>
  )
}

const LoginPrompt = () => {
  const router = useRouter()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
          <MessageSquare className="h-4 w-4 mr-2" />
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Login Required
          </DialogTitle>
          <DialogDescription>You need to login or signup to write a review</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            Join our community and share your experience with other customers
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={() => router.push("/auth/login")}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login to Your Account
            </Button>

            <Button
              onClick={() => router.push("/auth/signup")}
              variant="outline"
              className="w-full border-pink-200 hover:bg-pink-50"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Create New Account
            </Button>
          </div>

          <div className="text-xs text-center text-muted-foreground">
            By creating an account, you can write reviews, track orders, and get personalized recommendations
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [stats, setStats] = useState<ReviewStats | null>(null)
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" })
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasUserReviewed, setHasUserReviewed] = useState(false)
  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    fetchReviews()
    fetchStats()
  }, [])

  const fetchReviews = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/reviews")
      if (!response.ok) throw new Error("Failed to fetch reviews")

      const data = await response.json()
      setReviews(data.data || [])
    } catch (error) {
      console.error("Error fetching reviews:", error)
      toast.error("Failed to load reviews")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/reviews/stats")
      if (!response.ok) throw new Error("Failed to fetch stats")

      const data = await response.json()
      setStats(data.data)
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newReview.comment.trim()) {
      toast.error("Please write a comment")
      return
    }

    if (newReview.comment.length < 10) {
      toast.error("Comment must be at least 10 characters long")
      return
    }

    if (newReview.comment.length > 500) {
      toast.error("Comment must be less than 500 characters")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          rating: newReview.rating,
          comment: newReview.comment,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit review")
      }

      toast.success("Review submitted successfully!")
      setNewReview({ rating: 5, comment: "" })
      setShowReviewForm(false)
      setHasUserReviewed(true)

      // Add new review to the top of the list
      setReviews((prev) => [result.data, ...prev.slice(0, 4)])

      // Refresh stats
      fetchStats()
    } catch (error: any) {
      console.error("Error submitting review:", error)
      toast.error(error.message || "Failed to submit review")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
            Customer Reviews
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See what our happy customers say about Mahadev Baby Shop
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Review Stats */}
          {stats && stats.totalReviews > 0 && (
            <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Average Rating */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-yellow-500">{stats.averageRating}</span>
                      <StarRating rating={Math.round(stats.averageRating)} size="md" />
                    </div>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                  </div>

                  {/* Total Reviews */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Users className="h-6 w-6 text-blue-500" />
                      <span className="text-3xl font-bold text-blue-500">{stats.totalReviews}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Total Reviews</p>
                  </div>

                  {/* Rating Distribution */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-center mb-3">Rating Distribution</p>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2 text-sm">
                        <span className="w-3">{rating}</span>
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${stats.totalReviews > 0 ? (stats.ratingDistribution[rating] / stats.totalReviews) * 100 : 0}%`,
                            }}
                          />
                        </div>
                        <span className="w-8 text-right">{stats.ratingDistribution[rating]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Write Review Section */}
          <div className="text-center">
            {isAuthenticated ? (
              !hasUserReviewed ? (
                <Button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Write a Review
                </Button>
              ) : (
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Thank you for your review!</span>
                </div>
              )
            ) : (
              <LoginPrompt />
            )}
          </div>

          {/* Review Form */}
          {showReviewForm && isAuthenticated && (
            <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Write Your Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  <div>
                    <Label htmlFor="rating" className="text-sm font-medium">
                      Rating <span className="text-red-500">*</span>
                    </Label>
                    <div className="mt-2">
                      <StarRating
                        rating={newReview.rating}
                        size="lg"
                        interactive={true}
                        onRatingChange={(rating: number) => setNewReview((prev) => ({ ...prev, rating }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="comment" className="text-sm font-medium">
                      Your Review <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="comment"
                      placeholder="Share your experience with Mahadev Baby Shop... (minimum 10 characters)"
                      value={newReview.comment}
                      onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                      className="mt-2 min-h-[100px]"
                      maxLength={500}
                    />
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-muted-foreground">Minimum 10 characters required</p>
                      <p className="text-xs text-muted-foreground">{newReview.comment.length}/500</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button type="submit" disabled={isSubmitting} className="flex-1">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Submit Review
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowReviewForm(false)}
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Latest Reviews
              </h3>
              {reviews.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  Showing latest {reviews.length} reviews
                </Badge>
              )}
            </div>

            {reviews.map((review, index) => (
              <Card key={review.id} className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`/placeholder.svg?height=48&width=48&text=${getInitials(review.name)}`} />
                      <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white font-semibold">
                        {getInitials(review.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{review.name}</h4>
                          {review.isVerified && (
                            <Badge variant="secondary" className="text-xs">
                              <Shield className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          {index === 0 && (
                            <Badge className="text-xs bg-green-100 text-green-700 hover:bg-green-100">New</Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>

                      <StarRating rating={review.rating} size="sm" />

                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {reviews.length === 0 && (
            <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
              <CardContent className="text-center py-12">
                <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
                <p className="text-muted-foreground mb-6">
                  Be the first to share your experience with Mahadev Baby Shop!
                </p>
                {isAuthenticated ? (
                  <Button
                    onClick={() => setShowReviewForm(true)}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Write First Review
                  </Button>
                ) : (
                  <LoginPrompt />
                )}
              </CardContent>
            </Card>
          )}

          {/* Load More Info */}
          {reviews.length === 5 && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full text-sm text-blue-600 dark:text-blue-400">
                <AlertCircle className="h-4 w-4" />
                Showing latest 5 reviews for faster loading
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
