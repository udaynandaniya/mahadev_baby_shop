"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Send, Phone, Mail, MapPin } from "lucide-react"

import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/contexts/auth-provider"

export default function QueryPage() {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">What are your shop hours?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Monday-Saturday: 9:00 AM - 8:00 PM, Sunday: 10:00 AM - 6:00 PM
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-1">Do you offer home delivery?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Yes, we offer free delivery within Mangrol and paid delivery to nearby cities.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-1">What's your return policy?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    We accept returns within 7 days of purchase for unused items in original packaging.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-1">Do you have size guides?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Yes, each product page includes detailed size information and age recommendations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
