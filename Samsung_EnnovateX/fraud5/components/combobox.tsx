"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

interface ComboboxProps {
  options: { value: string; label: string }[]
  value?: string
  onValueChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  disabled?: boolean
  allowCustom?: boolean
  className?: string
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  disabled = false,
  allowCustom = true,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")

  const selectedOption = options.find((option) => option.value === value)

  const handleSelect = (selectedValue: string) => {
    if (selectedValue === value) {
      onValueChange("")
    } else {
      onValueChange(selectedValue)
    }
    setOpen(false)
    setSearchValue("")
  }

  const handleCustomValue = () => {
    if (allowCustom && searchValue && !options.find((opt) => opt.value.toLowerCase() === searchValue.toLowerCase())) {
      onValueChange(searchValue)
      setOpen(false)
      setSearchValue("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && allowCustom && searchValue) {
      e.preventDefault()
      handleCustomValue()
    }
  }

  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between bg-background border-border text-foreground hover:bg-accent",
            className,
          )}
          disabled={disabled}
        >
          {selectedOption ? selectedOption.label : value || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-popover border-border" align="start">
        <div className="p-2">
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-background border-border text-foreground"
          />
        </div>
        <div className="max-h-60 overflow-y-auto">
          {filteredOptions.length === 0 && searchValue ? (
            <div className="p-2">
              {allowCustom ? (
                <Button
                  variant="ghost"
                  className="w-full justify-start text-foreground hover:bg-accent"
                  onClick={handleCustomValue}
                >
                  Use "{searchValue}"
                </Button>
              ) : (
                <div className="text-sm text-muted-foreground p-2">No option found.</div>
              )}
            </div>
          ) : (
            <div className="p-1">
              {filteredOptions.map((option) => (
                <Button
                  key={option.value}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-foreground hover:bg-accent",
                    value === option.value && "bg-accent",
                  )}
                  onClick={() => handleSelect(option.value)}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                  {option.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
