// // "use client"

// // import { useState } from "react"
// // import { Button } from "@/components/ui/button"
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/components/ui/dialog"
// // import { Badge } from "@/components/ui/badge"
// // import { HelpCircle, Code, Info } from "lucide-react"

// // interface SchemaField {
// //   name: string
// //   type: string
// //   rules: string
// //   example: string
// // }

// // interface SchemaInfo {
// //   title: string
// //   description: string
// //   fields: SchemaField[]
// // }

// // interface HelpDialogProps {
// //   schemaInfo: SchemaInfo
// // }

// // export function HelpDialog({ schemaInfo }: HelpDialogProps) {
// //   const [isOpen, setIsOpen] = useState(false)

// //   return (
// //     <Dialog open={isOpen} onOpenChange={setIsOpen}>
// //       <DialogTrigger asChild>
// //         <Button
// //           variant="outline"
// //           size="sm"
// //           className="fixed bottom-4 right-4 z-50 rounded-full h-12 w-12 p-0 shadow-lg bg-blue-500 hover:bg-blue-600 text-white border-0"
// //         >
// //           <HelpCircle className="h-5 w-5" />
// //         </Button>
// //       </DialogTrigger>
// //       <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
// //         <DialogHeader>
// //           <DialogTitle className="flex items-center gap-2">
// //             <Code className="h-5 w-5" />
// //             {schemaInfo.title}
// //           </DialogTitle>
// //           <DialogDescription>{schemaInfo.description}</DialogDescription>
// //         </DialogHeader>

// //         <div className="space-y-4">
// //           <div className="grid gap-4">
// //             {schemaInfo.fields.map((field) => (
// //               <div key={field.name} className="border rounded-lg p-4 space-y-2">
// //                 <div className="flex items-center gap-2">
// //                   <Badge variant="outline" className="font-mono">
// //                     {field.name}
// //                   </Badge>
// //                   <Badge variant="secondary">{field.type}</Badge>
// //                 </div>

// //                 <div className="space-y-1">
// //                   <div className="flex items-start gap-2">
// //                     <Info className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
// //                     <div>
// //                       <p className="text-sm font-medium">Rules:</p>
// //                       <p className="text-sm text-muted-foreground">{field.rules}</p>
// //                     </div>
// //                   </div>

// //                   <div className="flex items-start gap-2">
// //                     <Code className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
// //                     <div>
// //                       <p className="text-sm font-medium">Example:</p>
// //                       <code className="text-sm bg-muted px-2 py-1 rounded">{field.example}</code>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
// //             <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Important Notes:</h4>
// //             <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
// //               <li>• Product codes must be unique across all product types</li>
// //               <li>• Stock changes sync automatically with Stock Manager</li>
// //               <li>• At least one image is required for each product</li>
// //               <li>• Actual price should be greater than or equal to selling price</li>
// //             </ul>
// //           </div>
// //         </div>
// //       </DialogContent>
// //     </Dialog>
// //   )
// // }

// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Badge } from "@/components/ui/badge"
// import { HelpCircle, Code, Info } from "lucide-react"

// interface SchemaField {
//   name: string
//   type: string
//   rules: string
//   example: string
// }

// interface SchemaInfo {
//   title: string
//   description: string
//   fields: SchemaField[]
// }

// interface HelpDialogProps {
//   schemaInfo: SchemaInfo
// }

// export function HelpDialog({ schemaInfo }: HelpDialogProps) {
//   const [isOpen, setIsOpen] = useState(false)

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//         <Button
//           variant="outline"
//           size="sm"
//           className="fixed bottom-4 right-4 z-50 rounded-full h-12 w-12 p-0 shadow-lg bg-blue-500 hover:bg-blue-600 text-white border-0"
//         >
//           <HelpCircle className="h-5 w-5" />
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2">
//             <Code className="h-5 w-5" />
//             {schemaInfo.title}
//           </DialogTitle>
//           <DialogDescription>{schemaInfo.description}</DialogDescription>
//         </DialogHeader>

//         <div className="space-y-4">
//           <div className="grid gap-4">
//             {schemaInfo.fields.map((field) => (
//               <div key={field.name} className="border rounded-lg p-4 space-y-2">
//                 <div className="flex items-center gap-2">
//                   <Badge variant="outline" className="font-mono">
//                     {field.name}
//                   </Badge>
//                   <Badge variant="secondary">{field.type}</Badge>
//                 </div>

//                 <div className="space-y-1">
//                   <div className="flex items-start gap-2">
//                     <Info className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
//                     <div>
//                       <p className="text-sm font-medium">Rules:</p>
//                       <p className="text-sm text-muted-foreground">{field.rules}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-2">
//                     <Code className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
//                     <div>
//                       <p className="text-sm font-medium">Example:</p>
//                       <code className="text-sm bg-muted px-2 py-1 rounded">{field.example}</code>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
//             <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Important Notes:</h4>
//             <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
//               <li>• Product codes must be unique across all product types</li>
//               <li>• Stock changes sync automatically with Stock Manager</li>
//               <li>• At least one image is required for each product</li>
//               <li>• Actual price should be greater than or equal to selling price</li>
//             </ul>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Code, Info } from "lucide-react"

interface SchemaField {
  name: string
  type: string
  rules: string
  example: string
}

interface SchemaInfo {
  title: string
  description: string
  fields: SchemaField[]
}

interface HelpDialogProps {
  schemaInfo: SchemaInfo
}

export function HelpDialog({ schemaInfo }: HelpDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-4 right-4 z-50 rounded-full h-12 w-12 p-0 shadow-lg bg-blue-500 hover:bg-blue-600 text-white border-0"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            {schemaInfo.title}
          </DialogTitle>
          <DialogDescription>{schemaInfo.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid gap-4">
            {schemaInfo.fields.map((field) => (
              <div key={field.name} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">
                    {field.name}
                  </Badge>
                  <Badge variant="secondary">{field.type}</Badge>
                </div>

                <div className="space-y-1">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Rules:</p>
                      <p className="text-sm text-muted-foreground">{field.rules}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Code className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Example:</p>
                      <code className="text-sm bg-muted px-2 py-1 rounded">{field.example}</code>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Important Notes:</h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• Product codes must be unique across all product types</li>
              <li>• Stock changes sync automatically with Stock Manager</li>
              <li>• At least one image is required for each product</li>
              <li>• Actual price should be greater than or equal to selling price</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
