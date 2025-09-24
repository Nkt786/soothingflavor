'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle } from 'lucide-react'

interface FallbackAddressInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  error?: string
  required?: boolean
  className?: string
}

export default function FallbackAddressInput({
  value,
  onChange,
  placeholder = "Enter your address",
  label,
  error,
  required = false,
  className = ""
}: FallbackAddressInputProps) {
  return (
    <div className={className}>
      {label && (
        <Label htmlFor="address" className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      {/* API Key Missing Warning */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-2">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-yellow-600" />
          <span className="text-sm text-yellow-700">
            Google Maps API key not configured. Address suggestions are disabled.
          </span>
        </div>
        <p className="text-xs text-yellow-600 mt-1">
          Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables to enable address autocomplete.
        </p>
      </div>

      <Input
        id="address"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`mt-1 ${error ? 'border-red-500' : ''}`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
