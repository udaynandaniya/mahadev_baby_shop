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
import { MessageSquare, Send, Phone, Mail, MapPin, ExternalLink, HelpCircle } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function QueryPage() {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Query Submitted Successfully!",
        description: "We'll get back to you within 24 hours.",
      })
      
      setFormData({ subject: "", message: "" })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit query. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
              <HelpCircle className="h-8 w-8 text-blue-500" />
              Ask Your Query
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have questions about our products or services? We're here to help! Fill out the form below or use our Google Form.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                  Send Us a Message
                </CardTitle>
                <CardDescription>
                  Fill out this form and we'll respond within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What's your query about?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please describe your query in detail..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Query
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Google Form & Contact Info */}
            <div className="space-y-6">
              {/* Google Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5 text-green-500" />
                    Google Form
                  </CardTitle>
                  <CardDescription>
                    Prefer using Google Forms? Click below to open our query form
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSclRI95PV__qCDVn3VHFy-7rA5VmgXOuQcZ0BQyl3XTdNBqYA/viewform?usp=dialog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Google Form
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Direct Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-blue-500" />
                    Direct Contact
                  </CardTitle>
                  <CardDescription>
                    Need immediate assistance? Contact us directly
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Divyesh Nanadaniya</p>
                        <div className="space-y-1">
                          <a 
                            href="tel:9913737023"
                            className="text-blue-600 hover:text-blue-800 transition-colors text-sm block"
                          >
                            +91 99137 37023
                          </a>
                          <a 
                            href="tel:9898893380"
                            className="text-blue-600 hover:text-blue-800 transition-colors text-sm block"
                          >
                            +91 98988 93380
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <a 
                        href="mailto:mahadevbabyshop5@gmail.com"
                        className="text-green-600 hover:text-green-800 transition-colors text-sm"
                      >
                        mahadevbabyshop5@gmail.com
                      </a>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p>Vithalani Complex</p>
                        <p>Mangrol, Gujarat</p>
                        <a 
                          href="https://maps.app.goo.gl/HfPkkBRqkwAh1JVR9"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-800 transition-colors inline-flex items-center gap-1 mt-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View on Map
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <a 
                      href="https://wa.me/919913737023"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full text-green-600 border-green-600 hover:bg-green-50">
                        <Phone className="h-4 w-4 mr-2" />
                        WhatsApp Chat
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
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
                  We accept returns within 7 days of delivery for unused items in original packaging with valid reason.
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
      </main>
      <Footer />
    </div>
  )
}
