"use client"

import { Bike, Car, Bus, MapPin } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function LocationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Visit Mahadev Baby Shop</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Find us easily at our store in Mangrol, Gujarat. Click on the map below to open the exact location in Google Maps.
          </p>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-xl relative aspect-video border border-purple-300 dark:border-purple-800 group">
            {/* Embedded Google Map */}
            <iframe
              src="https://www.google.com/maps?q=Mahadev+baby+shop,+Vithlani+complex,+Tower+Rd,+Gaffar+Belim,+Mangrol,+Gujarat+362225&output=embed"
              className="w-full h-full pointer-events-none"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>

            {/* Clickable Overlay */}
            <a
              href="https://maps.app.goo.gl/7hNBAfXomk87PVhc6"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10"
              aria-label="Open location in Google Maps"
            ></a>

            {/* Vehicle Icons */}
            <div className="absolute top-4 left-4 flex gap-3 bg-white/70 dark:bg-black/40 backdrop-blur rounded-full p-2 shadow-md z-20">
              <Bike className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              <Car className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              <Bus className="h-5 w-5 text-purple-600 dark:text-purple-300" />
            </div>
          </div>
        </div>

        {/* Address and directions */}
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold mb-2 flex justify-center items-center gap-2">
            <MapPin className="h-5 w-5 text-purple-600" /> Store Address
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Mahadev Baby Shop, Vithlani Complex, Tower Rd, Gaffar Belim,<br />
            Mangrol, Gujarat 362225
          </p>
          <p className="mt-2">
            <a
              href="https://maps.app.goo.gl/7hNBAfXomk87PVhc6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline"
            >
              Open in Google Maps →
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
