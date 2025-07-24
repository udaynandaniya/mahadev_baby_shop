//C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\components\location-selector.tsx

"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import indiaData from "@/lib/data/data.json"


// This would be your all India data - for demo purposes, I'm using a sample structure

interface AddressData {
  street: string
  area: string
  state: string
  district: string
  subDistrict: string
  village: string
  pincode: string
}

interface LocationSelectorProps {
  value: AddressData
  onChange: (address: AddressData) => void
  required?: boolean
}

export default function LocationSelector({ value, onChange, required = false }: LocationSelectorProps) {
  const [stateOpen, setStateOpen] = useState(false)
  const [districtOpen, setDistrictOpen] = useState(false)
  const [subDistrictOpen, setSubDistrictOpen] = useState(false)
  const [villageOpen, setVillageOpen] = useState(false)

  const [availableStates, setAvailableStates] = useState<string[]>([])
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([])
  const [availableSubDistricts, setAvailableSubDistricts] = useState<string[]>([])
  const [availableVillages, setAvailableVillages] = useState<string[]>([])

  // Update available states when component mounts
  useEffect(() => {
    setAvailableStates(indiaData.map((s) => s.state))
  }, [])

  // Update available districts when state changes
  useEffect(() => {
    const selectedState = indiaData.find((s) => s.state === value.state)
    setAvailableDistricts(selectedState ? selectedState.districts.map((d) => d.district) : [])
  }, [value.state])

  // Update available sub-districts when district changes
  useEffect(() => {
    const selectedState = indiaData.find((s) => s.state === value.state)
    const selectedDistrict = selectedState?.districts.find((d) => d.district === value.district)
    setAvailableSubDistricts(selectedDistrict ? selectedDistrict.subDistricts.map((sd) => sd.subDistrict) : [])
  }, [value.state, value.district])

  // Update available villages when subDistrict changes
  useEffect(() => {
    const selectedState = indiaData.find((s) => s.state === value.state)
    const selectedDistrict = selectedState?.districts.find((d) => d.district === value.district)
    const selectedSubDistrict = selectedDistrict?.subDistricts.find((sd) => sd.subDistrict === value.subDistrict)
    setAvailableVillages(selectedSubDistrict ? selectedSubDistrict.villages : [])
  }, [value.state, value.district, value.subDistrict])

  const handleInputChange = (field: keyof AddressData, inputValue: string) => {
    onChange({
      ...value,
      [field]: inputValue,
    })
  }

  const handleStateChange = (state: string) => {
    onChange({
      ...value,
      state,
      district: "",
      subDistrict: "",
      village: "",
    })
    setStateOpen(false)
  }

  const handleDistrictChange = (district: string) => {
    onChange({
      ...value,
      district,
      subDistrict: "",
      village: "",
    })
    setDistrictOpen(false)
  }

  const handleSubDistrictChange = (subDistrict: string) => {
    onChange({
      ...value,
      subDistrict,
      village: "",
    })
    setSubDistrictOpen(false)
  }

  const handleVillageChange = (village: string) => {
    onChange({
      ...value,
      village,
    })
    setVillageOpen(false)
  }

  return (
    <div className="space-y-4">
      {/* Manual Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="street" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Street Address {required && <span className="text-red-500">*</span>}
          </Label>
          <Input
            id="street"
            value={value.street}
            onChange={(e) => handleInputChange("street", e.target.value)}
            placeholder="Enter street address"
            required={required}
            className="mt-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500"
          />
        </div>
        <div>
          <Label htmlFor="area" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Area/Locality {required && <span className="text-red-500">*</span>}
          </Label>
          <Input
            id="area"
            value={value.area}
            onChange={(e) => handleInputChange("area", e.target.value)}
            placeholder="Enter area/locality"
            required={required}
            className="mt-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500"
          />
        </div>
      </div>

      {/* State Selector */}
      <div>
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          State {required && <span className="text-red-500">*</span>}
        </Label>
        <Popover open={stateOpen} onOpenChange={setStateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={stateOpen}
              className="w-full justify-between mt-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 hover:border-pink-400 dark:hover:border-purple-500"
            >
              {value.state || "Select state..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-pink-200/50 dark:border-purple-700/50">
            <Command>
              <CommandInput placeholder="Search state..." />
              <CommandList>
                <CommandEmpty>No state found.</CommandEmpty>
                <CommandGroup>
                  {availableStates.map((state) => (
                    <CommandItem key={state} value={state} onSelect={() => handleStateChange(state)}>
                      <Check className={cn("mr-2 h-4 w-4", value.state === state ? "opacity-100" : "opacity-0")} />
                      {state}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* District Selector */}
      <div>
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          District {required && <span className="text-red-500">*</span>}
        </Label>
        <Popover open={districtOpen} onOpenChange={setDistrictOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={districtOpen}
              className="w-full justify-between mt-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 hover:border-pink-400 dark:hover:border-purple-500"
              disabled={!value.state}
            >
              {value.district || "Select district..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-pink-200/50 dark:border-purple-700/50">
            <Command>
              <CommandInput placeholder="Search district..." />
              <CommandList>
                <CommandEmpty>No district found.</CommandEmpty>
                <CommandGroup>
                  {availableDistricts.map((district) => (
                    <CommandItem key={district} value={district} onSelect={() => handleDistrictChange(district)}>
                      <Check
                        className={cn("mr-2 h-4 w-4", value.district === district ? "opacity-100" : "opacity-0")}
                      />
                      {district}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Sub-District Selector */}
      <div>
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Sub-District {required && <span className="text-red-500">*</span>}
        </Label>
        <Popover open={subDistrictOpen} onOpenChange={setSubDistrictOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={subDistrictOpen}
              className="w-full justify-between mt-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 hover:border-pink-400 dark:hover:border-purple-500"
              disabled={!value.district}
            >
              {value.subDistrict || "Select sub-district..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-pink-200/50 dark:border-purple-700/50">
            <Command>
              <CommandInput placeholder="Search sub-district..." />
              <CommandList>
                <CommandEmpty>No sub-district found.</CommandEmpty>
                <CommandGroup>
                  {availableSubDistricts.map((subDistrict) => (
                    <CommandItem
                      key={subDistrict}
                      value={subDistrict}
                      onSelect={() => handleSubDistrictChange(subDistrict)}
                    >
                      <Check
                        className={cn("mr-2 h-4 w-4", value.subDistrict === subDistrict ? "opacity-100" : "opacity-0")}
                      />
                      {subDistrict}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Village Selector */}
      <div>
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Village/City {required && <span className="text-red-500">*</span>}
        </Label>
        {availableVillages.length > 0 ? (
          <Popover open={villageOpen} onOpenChange={setVillageOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={villageOpen}
                className="w-full justify-between mt-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 hover:border-pink-400 dark:hover:border-purple-500"
                disabled={!value.subDistrict}
              >
                {value.village || "Select village/city..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-pink-200/50 dark:border-purple-700/50">
              <Command>
                <CommandInput placeholder="Search village/city..." />
                <CommandList>
                  <CommandEmpty>No village/city found.</CommandEmpty>
                  <CommandGroup>
                    {availableVillages.map((village) => (
                      <CommandItem key={village} value={village} onSelect={() => handleVillageChange(village)}>
                        <Check
                          className={cn("mr-2 h-4 w-4", value.village === village ? "opacity-100" : "opacity-0")}
                        />
                        {village}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        ) : (
          <Input
            id="village"
            type="text"
            placeholder={value.subDistrict ? "Enter village/city name" : "Select sub-district first"}
            value={value.village}
            onChange={(e) => handleInputChange("village", e.target.value)}
            required={required}
            disabled={!value.subDistrict}
            className="mt-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500"
          />
        )}
      </div>

      {/* Pincode */}
      <div>
        <Label htmlFor="pincode" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Pincode {required && <span className="text-red-500">*</span>}
        </Label>
        <Input
          id="pincode"
          type="text"
          maxLength={6}
          value={value.pincode}
          onChange={(e) => handleInputChange("pincode", e.target.value.replace(/\D/g, ""))}
          placeholder="Enter 6-digit pincode"
          required={required}
          className="mt-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-200/50 dark:border-purple-700/50 focus:border-pink-400 dark:focus:border-purple-500"
        />
      </div>
    </div>
  )
}
