'use client'

import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface GooglePlacesAutocompleteProps {
  value: string
  onChange: (value: string) => void
  onPlaceSelect?: (place: google.maps.places.PlaceResult) => void
  placeholder?: string
  label?: string
  error?: string
  required?: boolean
  className?: string
}

declare global {
  interface Window {
    google: typeof google
  }
}

export default function GooglePlacesAutocomplete({
  value,
  onChange,
  onPlaceSelect,
  placeholder = "Enter your address",
  label,
  error,
  required = false,
  className = ""
}: GooglePlacesAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setIsLoaded(true)
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => setIsLoaded(true)
      script.onerror = () => console.error('Failed to load Google Maps script')
      
      document.head.appendChild(script)
    }

    loadGoogleMapsScript()
  }, [])

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return

    const initializeAutocomplete = () => {
      if (autocompleteRef.current) {
        autocompleteRef.current.unbindAll()
      }

      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'in' }, // Restrict to India
        fields: ['formatted_address', 'geometry', 'place_id']
      })

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace()
        if (place && place.formatted_address) {
          onChange(place.formatted_address)
          if (onPlaceSelect) {
            onPlaceSelect(place)
          }
        }
      })
    }

    initializeAutocomplete()

    return () => {
      if (autocompleteRef.current) {
        autocompleteRef.current.unbindAll()
      }
    }
  }, [isLoaded, onChange, onPlaceSelect])

  return (
    <div className={className}>
      {label && (
        <Label htmlFor="address" className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Input
        ref={inputRef}
        id="address"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`mt-1 ${error ? 'border-red-500' : ''}`}
        disabled={!isLoaded}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {!isLoaded && (
        <p className="mt-1 text-sm text-gray-500">Loading address suggestions...</p>
      )}
    </div>
  )
}
