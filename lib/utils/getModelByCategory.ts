

import { ClothesModel } from "@/lib/models/clothes"
import { BathItemModel } from "@/lib/models/bath"
import { NewbornItemModel } from "@/lib/models/newborn"
import { ToyModel } from "../models"

export function getModelByCategory(category: string) {
  switch (category) {
    case "toy":
    case "toys":
      return ToyModel
    case "clothes":
      return ClothesModel
    case "bath":
      return BathItemModel
    case "newborn":
      return NewbornItemModel
    default:
      throw new Error(`Unsupported category: ${category}`)
  }
}
