// // C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\components\admin\form-field.tsx

// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Check, X, Loader2 } from "lucide-react"
// import { cn } from "@/lib/utils"

// interface ValidationResult {
//   isValid: boolean
//   error?: string
// }

// interface FormFieldProps {
//   label: string
//   name: string
//   value: string | number
//   onChange: (value: string | number) => void
//   onValidation?: (fieldName: string, isValid: boolean, error?: string) => void
//   placeholder?: string
//   type?: "text" | "number" | "email" | "textarea"
//   required?: boolean
//   validation?: (value: string | number) => ValidationResult
//   checkUnique?: (value: string) => Promise<boolean>
//   className?: string
//   rows?: number
// }

// export function FormField({
//   label,
//   name,
//   value,
//   onChange,
//   onValidation,
//   placeholder,
//   type = "text",
//   required = false,
//   validation,
//   checkUnique,
//   className,
//   rows = 3,
// }: FormFieldProps) {
//   const [isValidating, setIsValidating] = useState(false)
//   const [validationState, setValidationState] = useState<{
//     isValid: boolean
//     error?: string
//     isChecking?: boolean
//   }>({ isValid: true })

//   const validateField = useCallback(
//     async (fieldValue: string | number) => {
//       if (!fieldValue && !required) {
//         setValidationState({ isValid: true })
//         onValidation?.(name, true)
//         return
//       }

//       // Basic validation
//       if (validation) {
//         const result = validation(fieldValue)
//         if (!result.isValid) {
//           setValidationState({ isValid: false, error: result.error })
//           onValidation?.(name, false, result.error)
//           return
//         }
//       }

//       // Uniqueness check for product codes
//       if (checkUnique && fieldValue && typeof fieldValue === "string") {
//         setIsValidating(true)
//         setValidationState({ isValid: true, isChecking: true })

//         try {
//           const isUnique = await checkUnique(fieldValue)
//           if (!isUnique) {
//             setValidationState({ isValid: false, error: "This code already exists" })
//             onValidation?.(name, false, "This code already exists")
//           } else {
//             setValidationState({ isValid: true })
//             onValidation?.(name, true)
//           }
//         } catch (error) {
//           setValidationState({ isValid: false, error: "Failed to check uniqueness" })
//           onValidation?.(name, false, "Failed to check uniqueness")
//         } finally {
//           setIsValidating(false)
//         }
//       } else {
//         setValidationState({ isValid: true })
//         onValidation?.(name, true)
//       }
//     },
//     [name, required, validation, checkUnique, onValidation],
//   )

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       validateField(value)
//     }, 500)

//     return () => clearTimeout(timeoutId)
//   }, [value, validateField])

//   const getValidationIcon = () => {
//     if (isValidating || validationState.isChecking) {
//       return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
//     }
//     if (!value) return null
//     if (validationState.isValid) {
//       return <Check className="h-4 w-4 text-green-500" />
//     }
//     return <X className="h-4 w-4 text-red-500" />
//   }

//   const getInputClassName = () => {
//     if (!value) return ""
//     if (validationState.isValid) return "border-green-500 focus:border-green-500"
//     return "border-red-500 focus:border-red-500"
//   }

//   const InputComponent = type === "textarea" ? Textarea : Input

//   return (
//     <div className={cn("space-y-2", className)}>
//       <Label htmlFor={name} className="text-sm font-medium">
//         {label}
//         {required && <span className="text-red-500 ml-1">*</span>}
//       </Label>
//       <div className="relative">
//         <InputComponent
//           id={name}
//           type={type === "textarea" ? undefined : type}
//           value={value}
//           onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
//           placeholder={placeholder}
//           required={required}
//           rows={type === "textarea" ? rows : undefined}
//           className={cn("pr-10 rounded-xl transition-colors", getInputClassName())}
//         />
//         <div className="absolute right-3 top-1/2 transform -translate-y-1/2">{getValidationIcon()}</div>
//       </div>
//       {validationState.error && <p className="text-sm text-red-500 mt-1">{validationState.error}</p>}
//     </div>
//   )
// }


"use client"

import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Check, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ValidationResult {
  isValid: boolean
  error?: string
}

interface FormFieldProps {
  label: string
  name: string
  value: string | number
  onChange: (value: string | number) => void
  onValidation?: (fieldName: string, isValid: boolean, error?: string) => void
  placeholder?: string
  type?: "text" | "number" | "email" | "textarea"
  required?: boolean
  validation?: (value: string | number) => ValidationResult
  checkUnique?: (value: string) => Promise<boolean>
  className?: string
  rows?: number
}

export function FormField({
  label,
  name,
  value,
  onChange,
  onValidation,
  placeholder,
  type = "text",
  required = false,
  validation,
  checkUnique,
  className,
  rows = 3,
}: FormFieldProps) {
  const [isValidating, setIsValidating] = useState(false)
  const [validationState, setValidationState] = useState<{
    isValid: boolean
    error?: string
    isChecking?: boolean
  }>({ isValid: true })

  const validateField = useCallback(
    async (fieldValue: string | number) => {
      if (!fieldValue && !required) {
        setValidationState({ isValid: true })
        onValidation?.(name, true)
        return
      }

      if (validation) {
        const result = validation(fieldValue)
        if (!result.isValid) {
          setValidationState({ isValid: false, error: result.error })
          onValidation?.(name, false, result.error)
          return
        }
      }

      if (checkUnique && typeof fieldValue === "string") {
        setIsValidating(true)
        setValidationState({ isValid: true, isChecking: true })

        try {
          const isUnique = await checkUnique(fieldValue)
          if (!isUnique) {
            setValidationState({ isValid: false, error: "This code already exists" })
            onValidation?.(name, false, "This code already exists")
          } else {
            setValidationState({ isValid: true })
            onValidation?.(name, true)
          }
        } catch (error) {
          setValidationState({ isValid: false, error: "Failed to check uniqueness" })
          onValidation?.(name, false, "Failed to check uniqueness")
        } finally {
          setIsValidating(false)
        }
      } else {
        setValidationState({ isValid: true })
        onValidation?.(name, true)
      }
    },
    [name, required, validation, checkUnique, onValidation]
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      validateField(value)
    }, 400)

    return () => clearTimeout(timeoutId)
  }, [value, validateField])

  const getValidationIcon = () => {
    if (isValidating || validationState.isChecking) {
      return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
    }
    if (!value) return null
    if (validationState.isValid) {
      return <Check className="h-4 w-4 text-green-500" />
    }
    return <X className="h-4 w-4 text-red-500" />
  }

  const getInputClassName = () => {
    if (!value) return ""
    if (validationState.isValid) return "border-green-500 focus:border-green-500"
    return "border-red-500 focus:border-red-500"
  }

  const InputComponent = type === "textarea" ? Textarea : Input

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div className="relative">
        <InputComponent
          id={name}
          type={type === "textarea" ? undefined : type}
          value={value ?? ""}
          onChange={(e) => {
            const raw = e.target.value
            const finalValue = type === "number" ? Number(raw) : raw
            onChange(finalValue)
          }}
          placeholder={placeholder}
          required={required}
          rows={type === "textarea" ? rows : undefined}
          className={cn("pr-10 rounded-xl transition-colors", getInputClassName())}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">{getValidationIcon()}</div>
      </div>
      {validationState.error && (
        <p className="text-sm text-red-500 mt-1">{validationState.error}</p>
      )}
    </div>
  )
}
