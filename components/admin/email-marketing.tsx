"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Mail, Send, Users, Calendar, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface EmailCampaign {
  id: string
  subject: string
  content: string
  recipientCount: number
  sentAt: string
  status: "draft" | "sent" | "scheduled"
  openRate?: number
  clickRate?: number
}

export function EmailMarketing() {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([])
  const [loading, setLoading] = useState(true)
  const [newCampaign, setNewCampaign] = useState({
    subject: "",
    content: "",
  })
  const [userCount, setUserCount] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    fetchCampaigns()
    fetchUserCount()
  }, [])

  const fetchCampaigns = async () => {
    try {
      // Mock data - replace with actual API call
      const mockCampaigns: EmailCampaign[] = [
        {
          id: "1",
          subject: "New Baby Collection Arrived! 🍼",
          content: "Check out our latest collection of premium baby clothes...",
          recipientCount: 1247,
          sentAt: "2024-01-20T10:00:00Z",
          status: "sent",
          openRate: 68,
          clickRate: 12,
        },
        {
          id: "2",
          subject: "Special Discount - 25% Off All Items",
          content: "Limited time offer! Get 25% off on all baby clothes...",
          recipientCount: 1247,
          sentAt: "2024-01-15T14:30:00Z",
          status: "sent",
          openRate: 72,
          clickRate: 18,
        },
      ]
      setCampaigns(mockCampaigns)
    } catch (error) {
      console.error("Error fetching campaigns:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserCount = async () => {
    try {
      // Mock user count - replace with actual API call
      setUserCount(1247)
    } catch (error) {
      console.error("Error fetching user count:", error)
    }
  }

  const sendCampaign = async () => {
    if (!newCampaign.subject.trim() || !newCampaign.content.trim()) {
      toast({
        title: "Please fill all fields",
        description: "Subject and content are required",
        variant: "destructive",
      })
      return
    }

    try {
      const campaign: EmailCampaign = {
        id: Date.now().toString(),
        subject: newCampaign.subject,
        content: newCampaign.content,
        recipientCount: userCount,
        sentAt: new Date().toISOString(),
        status: "sent",
      }

      setCampaigns((prev) => [campaign, ...prev])
      setNewCampaign({ subject: "", content: "" })

      toast({
        title: "Campaign sent successfully!",
        description: `Email sent to ${userCount} customers`,
      })

      // Here you would integrate with actual email service (Nodemailer, etc.)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send campaign",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: EmailCampaign["status"]) => {
    switch (status) {
      case "sent":
        return "default"
      case "draft":
        return "secondary"
      case "scheduled":
        return "outline"
      default:
        return "secondary"
    }
  }

  if (loading) {
    return <div>Loading campaigns...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Email Marketing</h2>
        <p className="text-gray-600 dark:text-gray-300">Send promotional emails to all customers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Create New Campaign
              </CardTitle>
              <CardDescription>Send promotional emails to all registered customers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Email Subject</Label>
                <Input
                  id="subject"
                  placeholder="Enter email subject..."
                  value={newCampaign.subject}
                  onChange={(e) => setNewCampaign((prev) => ({ ...prev, subject: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Email Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your email content here..."
                  value={newCampaign.content}
                  onChange={(e) => setNewCampaign((prev) => ({ ...prev, content: e.target.value }))}
                  rows={8}
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  Will be sent to {userCount} customers
                </div>
                <Button onClick={sendCampaign} className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Send Campaign
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Templates</CardTitle>
              <CardDescription>Use these templates to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() =>
                  setNewCampaign({
                    subject: "New Arrivals - Premium Baby Clothes! 👶",
                    content:
                      "Dear Valued Customer,\n\nWe're excited to announce our latest collection of premium baby clothes has arrived! From soft cotton onesies to adorable romper sets, we have everything your little one needs.\n\n🌟 New Collection Highlights:\n• Premium quality fabrics\n• Comfortable and safe designs\n• Affordable prices\n• Latest fashion trends\n\nVisit our shop in Mangrol or browse online to see the complete collection.\n\nBest regards,\nDivyesh Nanadaniya\nMahadev Baby Shop",
                  })
                }
              >
                New Arrivals Template
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() =>
                  setNewCampaign({
                    subject: "Special Offer - 25% Off Everything! 🎉",
                    content:
                      "Dear Customer,\n\nGreat news! We're offering 25% OFF on all items in our store for a limited time.\n\n🎁 Offer Details:\n• 25% discount on all products\n• Valid for 7 days only\n• No minimum purchase required\n• Applicable on both online and in-store purchases\n\nDon't miss this amazing opportunity to get premium baby clothes at unbeatable prices!\n\nVisit us today at Mangrol or shop online.\n\nHappy Shopping!\nMahadev Baby Shop Team",
                  })
                }
              >
                Discount Offer Template
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() =>
                  setNewCampaign({
                    subject: "Thank You for Being Our Valued Customer! ❤️",
                    content:
                      "Dear Valued Customer,\n\nThank you for choosing Mahadev Baby Shop for your little one's clothing needs. Your trust and support mean the world to us.\n\n🙏 Why customers love us:\n• Quality products at affordable prices\n• Personal service and care\n• Local business serving Mangrol families\n• Wide variety of baby essentials\n\nWe're committed to providing the best for your babies. If you have any feedback or suggestions, please don't hesitate to reach out.\n\nWith gratitude,\nDivyesh Nanadaniya\nMahadev Baby Shop",
                  })
                }
              >
                Thank You Template
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign History</CardTitle>
          <CardDescription>Previous email campaigns and their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent Date</TableHead>
                <TableHead>Open Rate</TableHead>
                <TableHead>Click Rate</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.subject}</TableCell>
                  <TableCell>{campaign.recipientCount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(campaign.status)}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(campaign.sentAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{campaign.openRate ? `${campaign.openRate}%` : "-"}</TableCell>
                  <TableCell>{campaign.clickRate ? `${campaign.clickRate}%` : "-"}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {campaigns.length === 0 && (
            <div className="text-center py-8">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No campaigns sent yet</p>
              <p className="text-sm text-gray-400">Create your first email campaign above</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
