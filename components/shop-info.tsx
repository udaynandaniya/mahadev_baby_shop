"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Truck, Shield, Headphones, RotateCcw, Award, Clock } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Free delivery on orders above ₹500 in Mangrol",
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "100% safe materials, tested for baby's safety",
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always here to help with your queries",
    color: "from-purple-500 to-violet-500",
    bgColor: "from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day hassle-free return policy",
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Only the finest materials for your baby",
    color: "from-pink-500 to-rose-500",
    bgColor: "from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30",
  },
  {
    icon: Clock,
    title: "Quick Service",
    description: "Fast processing and delivery times",
    color: "from-indigo-500 to-blue-500",
    bgColor: "from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30",
  },
]

export function ShopInfo() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-muted/40 via-muted/20 to-background dark:from-gray-900/40 dark:via-gray-900/20 dark:to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-blue-500/5 dark:from-pink-500/10 dark:via-purple-500/10 dark:to-blue-500/10" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 mb-4 md:mb-6">
            <Award className="h-3 w-3 md:h-4 md:w-4 text-pink-500 dark:text-pink-400" />
            <span className="text-xs md:text-sm font-semibold text-pink-700 dark:text-pink-300">Why Choose Us</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 dark:from-white dark:via-purple-100 dark:to-blue-100 bg-clip-text text-transparent">
            Why Choose Mahadev Baby Shop?
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-sm md:text-base lg:text-lg leading-relaxed px-4 md:px-0">
            We're committed to providing the best shopping experience for you and your little ones
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl hover:shadow-pink-500/10 dark:hover:shadow-purple-500/20 transition-all duration-500 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:scale-105 overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <CardContent className="p-4 md:p-6 text-center relative z-10">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-2xl md:rounded-3xl bg-gradient-to-br ${feature.color} shadow-xl mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                >
                  <feature.icon className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-white" />
                </div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
