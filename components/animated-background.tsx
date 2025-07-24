// // components/animated-background.tsx

// "use client"

// import { useEffect, useState } from "react"
// import {
//   Baby,
//   Shirt,
//   ToyBrickIcon as Toy,
//   Heart,
//   Star,
//   Gift,
//   Sparkles,
//   Home,
//   Sun,
//   Moon,
//   Crown,
//   Flower,
//   FlowerIcon as Butterfly,
//   Rainbow,
//   Cloud,
//   Smile,
//   Music,
//   Palette,
//   Zap,
//   Gem,
//   Candy,
//   Cookie,
//   IceCream,
//   TreePine,
//   Snowflake,
// } from "lucide-react"

// interface FloatingIcon {
//   id: number
//   Icon: any
//   x: number
//   y: number
//   size: number
//   speed: number
//   direction: number
//   opacity: number
//   color: string
//   rotation: number
//   rotationSpeed: number
//   scale: number
//   pulseDelay: number
// }

// export function AnimatedBackground() {
//   const [icons, setIcons] = useState<FloatingIcon[]>([])
//   const [mounted, setMounted] = useState(false)

//   const iconTypes = [
//     Baby,
//     Shirt,
//     Toy,
//     Heart,
//     Star,
//     Gift,
//     Sparkles,
//     Home,
//     Sun,
//     Moon,
//     Crown,
//     Flower,
//     Butterfly,
//     Rainbow,
//     Cloud,
//     Smile,
//     Music,
//     Palette,
//     Zap,
//     Gem,
//     Candy,
//     Cookie,
//     IceCream,
//     TreePine,
//     Snowflake,
//   ]

//   const lightColors = [
//     "text-pink-300/25 drop-shadow-sm",
//     "text-purple-300/25 drop-shadow-sm",
//     "text-blue-300/25 drop-shadow-sm",
//     "text-yellow-300/25 drop-shadow-sm",
//     "text-green-300/25 drop-shadow-sm",
//     "text-indigo-300/25 drop-shadow-sm",
//     "text-rose-300/25 drop-shadow-sm",
//     "text-orange-300/25 drop-shadow-sm",
//     "text-cyan-300/25 drop-shadow-sm",
//     "text-emerald-300/25 drop-shadow-sm",
//     "text-violet-300/25 drop-shadow-sm",
//     "text-fuchsia-300/25 drop-shadow-sm",
//   ]

//   const darkColors = [
//     "text-pink-400/30 drop-shadow-lg",
//     "text-purple-400/30 drop-shadow-lg",
//     "text-blue-400/30 drop-shadow-lg",
//     "text-yellow-400/30 drop-shadow-lg",
//     "text-green-400/30 drop-shadow-lg",
//     "text-indigo-400/30 drop-shadow-lg",
//     "text-rose-400/30 drop-shadow-lg",
//     "text-orange-400/30 drop-shadow-lg",
//     "text-cyan-400/30 drop-shadow-lg",
//     "text-emerald-400/30 drop-shadow-lg",
//     "text-violet-400/30 drop-shadow-lg",
//     "text-fuchsia-400/30 drop-shadow-lg",
//   ]

//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   useEffect(() => {
//     if (!mounted) return

//     const createIcons = () => {
//       const newIcons: FloatingIcon[] = []
//       const iconCount = window.innerWidth < 768 ? 25 : 45 // Fewer icons on mobile

//       for (let i = 0; i < iconCount; i++) {
//         newIcons.push({
//           id: i,
//           Icon: iconTypes[Math.floor(Math.random() * iconTypes.length)],
//           x: Math.random() * (window.innerWidth + 200) - 100,
//           y: Math.random() * (window.innerHeight + 200) - 100,
//           size:
//             window.innerWidth < 768
//               ? Math.random() * 18 + 10 // Smaller icons on mobile
//               : Math.random() * 28 + 15, // Larger icons on desktop
//           speed: Math.random() * 0.6 + 0.2,
//           direction: Math.random() * Math.PI * 2,
//           opacity: Math.random() * 0.4 + 0.15,
//           color: [...lightColors, ...darkColors][Math.floor(Math.random() * (lightColors.length + darkColors.length))],
//           rotation: Math.random() * 360,
//           rotationSpeed: (Math.random() - 0.5) * 1.5,
//           scale: Math.random() * 0.4 + 0.8,
//           pulseDelay: Math.random() * 5,
//         })
//       }
//       setIcons(newIcons)
//     }

//     createIcons()
//     window.addEventListener("resize", createIcons)

//     const animateIcons = () => {
//       setIcons((prevIcons) =>
//         prevIcons.map((icon) => {
//           let newX = icon.x + Math.cos(icon.direction) * icon.speed
//           let newY = icon.y + Math.sin(icon.direction) * icon.speed
//           const newRotation = icon.rotation + icon.rotationSpeed

//           // Smooth edge wrapping
//           if (newX < -100) newX = window.innerWidth + 100
//           if (newX > window.innerWidth + 100) newX = -100
//           if (newY < -100) newY = window.innerHeight + 100
//           if (newY > window.innerHeight + 100) newY = -100

//           return {
//             ...icon,
//             x: newX,
//             y: newY,
//             rotation: newRotation,
//           }
//         }),
//       )
//     }

//     const interval = setInterval(animateIcons, 60)

//     return () => {
//       clearInterval(interval)
//       window.removeEventListener("resize", createIcons)
//     }
//   }, [mounted])

//   if (!mounted) return null

//   return (
//     <>
//       {/* Main Background Icons */}
//       <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
//         {icons.map((icon) => {
//           const { Icon } = icon
//           return (
//             <div
//               key={icon.id}
//               className={`absolute transition-all duration-150 animate-pulse dark:brightness-125 ${icon.color}`}
//               style={{
//                 left: `${icon.x}px`,
//                 top: `${icon.y}px`,
//                 opacity: icon.opacity,
//                 transform: `rotate(${icon.rotation}deg) scale(${icon.scale})`,
//                 animationDelay: `${icon.pulseDelay}s`,
//                 animationDuration: "3s",
//               }}
//             >
//               <Icon size={icon.size} />
//             </div>
//           )
//         })}
//       </div>

//       {/* Enhanced Gradient Overlays */}
//       <div className="fixed inset-0 pointer-events-none z-1">
//         {/* Light mode gradients */}
//         <div className="absolute inset-0 bg-gradient-to-br from-pink-500/8 via-purple-500/6 to-blue-500/8 dark:from-pink-500/12 dark:via-purple-500/10 dark:to-blue-500/12" />
//         <div className="absolute inset-0 bg-gradient-to-tl from-rose-500/5 via-transparent to-indigo-500/5 dark:from-rose-500/8 dark:to-indigo-500/8" />

//         {/* Radial gradients */}
//         <div className="absolute top-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-gradient-radial from-pink-400/15 to-transparent dark:from-pink-400/20 dark:to-transparent rounded-full blur-3xl" />
//         <div className="absolute bottom-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-gradient-radial from-purple-400/15 to-transparent dark:from-purple-400/20 dark:to-transparent rounded-full blur-3xl" />
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 md:w-[800px] md:h-[800px] bg-gradient-radial from-blue-400/8 to-transparent dark:from-blue-400/12 dark:to-transparent rounded-full blur-3xl" />

//         {/* Mobile specific gradients */}
//         <div className="md:hidden absolute top-1/4 right-0 w-48 h-48 bg-gradient-radial from-yellow-400/10 to-transparent dark:from-yellow-400/15 dark:to-transparent rounded-full blur-2xl" />
//         <div className="md:hidden absolute bottom-1/4 left-0 w-48 h-48 bg-gradient-radial from-green-400/10 to-transparent dark:from-green-400/15 dark:to-transparent rounded-full blur-2xl" />
//       </div>
//     </>
//   )
// }


"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import {
  Baby,
  Shirt,
  ToyBrickIcon as Toy,
  Heart,
  Star,
  Gift,
  Sparkles,
  Home,
  Sun,
  Moon,
  Crown,
  Flower,
  FlowerIcon as Butterfly,
  Rainbow,
  Cloud,
  Smile,
  Music,
  Palette,
  Zap,
  Gem,
  Candy,
  Cookie,
  IceCream,
  TreePine,
  Snowflake,
} from "lucide-react"

interface FloatingIcon {
  id: number
  Icon: any
  x: number
  y: number
  size: number
  speed: number
  direction: number
  opacity: number
  color: string
  rotation: number
  rotationSpeed: number
  scale: number
  pulseDelay: number
}

export function AnimatedBackground() {
  const [icons, setIcons] = useState<FloatingIcon[]>([])
  const [mounted, setMounted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Memoize icon types to prevent recreation on every render
  const iconTypes = useMemo(
    () => [
      Baby,
      Shirt,
      Toy,
      Heart,
      Star,
      Gift,
      Sparkles,
      Home,
      Sun,
      Moon,
      Crown,
      Flower,
      Butterfly,
      Rainbow,
      Cloud,
      Smile,
      Music,
      Palette,
      Zap,
      Gem,
      Candy,
      Cookie,
      IceCream,
      TreePine,
      Snowflake,
    ],
    [],
  )

  // Memoize color arrays to prevent recreation
  const lightColors = useMemo(
    () => [
      "text-pink-300/25 drop-shadow-sm",
      "text-purple-300/25 drop-shadow-sm",
      "text-blue-300/25 drop-shadow-sm",
      "text-yellow-300/25 drop-shadow-sm",
      "text-green-300/25 drop-shadow-sm",
      "text-indigo-300/25 drop-shadow-sm",
      "text-rose-300/25 drop-shadow-sm",
      "text-orange-300/25 drop-shadow-sm",
      "text-cyan-300/25 drop-shadow-sm",
      "text-emerald-300/25 drop-shadow-sm",
      "text-violet-300/25 drop-shadow-sm",
      "text-fuchsia-300/25 drop-shadow-sm",
    ],
    [],
  )

  const darkColors = useMemo(
    () => [
      "text-pink-400/30 drop-shadow-lg",
      "text-purple-400/30 drop-shadow-lg",
      "text-blue-400/30 drop-shadow-lg",
      "text-yellow-400/30 drop-shadow-lg",
      "text-green-400/30 drop-shadow-lg",
      "text-indigo-400/30 drop-shadow-lg",
      "text-rose-400/30 drop-shadow-lg",
      "text-orange-400/30 drop-shadow-lg",
      "text-cyan-400/30 drop-shadow-lg",
      "text-emerald-400/30 drop-shadow-lg",
      "text-violet-400/30 drop-shadow-lg",
      "text-fuchsia-400/30 drop-shadow-lg",
    ],
    [],
  )

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Memoize createIcons function with proper dependencies
  const createIcons = useCallback(() => {
    if (typeof window === "undefined") return

    const newIcons: FloatingIcon[] = []
    const baseIconCount = reducedMotion ? 15 : window.innerWidth < 768 ? 25 : 45
    const iconCount = Math.min(baseIconCount, Math.floor(window.innerWidth / 30))
    const allColors = [...lightColors, ...darkColors]

    for (let i = 0; i < iconCount; i++) {
      newIcons.push({
        id: i,
        Icon: iconTypes[Math.floor(Math.random() * iconTypes.length)],
        x: Math.random() * (window.innerWidth + 200) - 100,
        y: Math.random() * (window.innerHeight + 200) - 100,
        size: window.innerWidth < 768 ? Math.random() * 18 + 10 : Math.random() * 28 + 15,
        speed: reducedMotion ? 0.1 : Math.random() * 0.6 + 0.2,
        direction: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.4 + 0.15,
        color: allColors[Math.floor(Math.random() * allColors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: reducedMotion ? 0 : (Math.random() - 0.5) * 1.5,
        scale: Math.random() * 0.4 + 0.8,
        pulseDelay: Math.random() * 5,
      })
    }
    setIcons(newIcons)
  }, [reducedMotion, iconTypes, lightColors, darkColors])

  useEffect(() => {
    if (!mounted) return

    createIcons()

    const handleResize = () => {
      createIcons()
    }

    window.addEventListener("resize", handleResize)

    // Skip animation if reduced motion is preferred
    if (reducedMotion) {
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }

    const animateIcons = () => {
      setIcons((prevIcons) =>
        prevIcons.map((icon) => {
          let newX = icon.x + Math.cos(icon.direction) * icon.speed
          let newY = icon.y + Math.sin(icon.direction) * icon.speed
          const newRotation = icon.rotation + icon.rotationSpeed

          // Smooth edge wrapping
          if (newX < -100) newX = window.innerWidth + 100
          if (newX > window.innerWidth + 100) newX = -100
          if (newY < -100) newY = window.innerHeight + 100
          if (newY > window.innerHeight + 100) newY = -100

          return {
            ...icon,
            x: newX,
            y: newY,
            rotation: newRotation,
          }
        }),
      )
    }

    const intervalTime = window.innerWidth < 768 ? 80 : 60
    const interval = setInterval(animateIcons, intervalTime)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [mounted, reducedMotion, createIcons])

  if (!mounted) return null

  return (
    <>
      {/* Main Background Icons */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {icons.map((icon) => {
          const { Icon } = icon
          return (
            <div
              key={icon.id}
              className={`absolute transition-all duration-150 ${
                reducedMotion ? "" : "animate-pulse"
              } dark:brightness-125 ${icon.color}`}
              style={{
                left: `${icon.x}px`,
                top: `${icon.y}px`,
                opacity: icon.opacity,
                transform: `rotate(${icon.rotation}deg) scale(${icon.scale})`,
                animationDelay: reducedMotion ? "0s" : `${icon.pulseDelay}s`,
                animationDuration: reducedMotion ? "0s" : "3s",
              }}
            >
              <Icon size={icon.size} />
            </div>
          )
        })}
      </div>

      {/* Enhanced Gradient Overlays */}
      <div className="fixed inset-0 pointer-events-none z-1">
        {/* Light mode gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/8 via-purple-500/6 to-blue-500/8 dark:from-pink-500/12 dark:via-purple-500/10 dark:to-blue-500/12" />
        <div className="absolute inset-0 bg-gradient-to-tl from-rose-500/5 via-transparent to-indigo-500/5 dark:from-rose-500/8 dark:to-indigo-500/8" />

        {/* Radial gradients */}
        <div className="absolute top-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-gradient-radial from-pink-400/15 to-transparent dark:from-pink-400/20 dark:to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-gradient-radial from-purple-400/15 to-transparent dark:from-purple-400/20 dark:to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 md:w-[800px] md:h-[800px] bg-gradient-radial from-blue-400/8 to-transparent dark:from-blue-400/12 dark:to-transparent rounded-full blur-3xl" />

        {/* Mobile specific gradients */}
        <div className="md:hidden absolute top-1/4 right-0 w-48 h-48 bg-gradient-radial from-yellow-400/10 to-transparent dark:from-yellow-400/15 dark:to-transparent rounded-full blur-2xl" />
        <div className="md:hidden absolute bottom-1/4 left-0 w-48 h-48 bg-gradient-radial from-green-400/10 to-transparent dark:from-green-400/15 dark:to-transparent rounded-full blur-2xl" />
      </div>
    </>
  )
}
