"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Download, MapPin, Phone, Mail, MessageCircle } from "lucide-react"

export function InvoicePreview() {
  return (
    <Card className="max-w-2xl mx-auto border-0 bg-white/90 backdrop-blur-sm shadow-xl">
      <CardHeader className="text-center pb-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-pink-600">MAHADEV BABY SHOP</h1>
          <p className="text-gray-600">Professional Baby Care Products & Accessories</p>
          <Badge variant="secondary" className="mx-auto">
            Sample Invoice Preview
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Shop Information */}
        <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-pink-700 mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Shop Owner & Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="space-y-2">
              <p>
                <strong>Owner:</strong> Divyesh Nanadaniya
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                +91 99137 37023
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                +91 98988 93380
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                mahadevbabyshop5@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="h-3 w-3" />
                WhatsApp: +91 99137 37023
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                Vithalani Complex, Mangrol, Gujarat
              </p>
            </div>
          </div>
        </div>

        {/* Invoice Features */}
        <div>
          <h3 className="font-semibold mb-3">Your Professional Invoice Will Include:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="space-y-2">
              <p>✅ Complete order details</p>
              <p>✅ Product codes & descriptions</p>
              <p>✅ Itemized pricing breakdown</p>
              <p>✅ Delivery address</p>
            </div>
            <div className="space-y-2">
              <p>✅ Professional shop branding</p>
              <p>✅ Contact information</p>
              <p>✅ Order tracking number</p>
              <p>✅ PDF format for easy storage</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Sample Order Summary */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Sample Order Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Baby Cotton Dress (Code: BC001)</span>
              <span>₹299 × 2 = ₹598</span>
            </div>
            <div className="flex justify-between">
              <span>Baby Bath Set (Code: BB002)</span>
              <span>₹450 × 1 = ₹450</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹1,048</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charge:</span>
              <span>₹90</span>
            </div>
            <div className="flex justify-between font-bold text-green-600">
              <span>Total Amount:</span>
              <span>₹1,138</span>
            </div>
          </div>
        </div>

        {/* Download Note */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
          <Download className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Note:</strong> Invoice download will be available once your order status changes to "Completed" by
            our admin.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
