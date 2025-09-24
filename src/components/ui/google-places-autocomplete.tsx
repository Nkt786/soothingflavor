'use client'

import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import FallbackAddressInput from './fallback-address-input'

interface GooglePlacesAutocompleteProps {
  value: string
  onChange: (value: string) => void
  onPlaceSelect?: (place: any) => void
  placeholder?: string
  label?: string
  error?: string
  required?: boolean
  className?: string
}

// Singleton for Google Maps script loading
let googleMapsScriptLoaded = false
let googleMapsScriptLoading = false
let googleMapsLoadPromise: Promise<void> | null = null

const loadGoogleMapsScript = (): Promise<void> => {
  if (googleMapsScriptLoaded) {
    return Promise.resolve()
  }
  
  if (googleMapsScriptLoading && googleMapsLoadPromise) {
    return googleMapsLoadPromise
  }

  googleMapsScriptLoading = true
  googleMapsLoadPromise = new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.google && window.google.maps && window.google.maps.places) {
      googleMapsScriptLoaded = true
      googleMapsScriptLoading = false
      resolve()
      return
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!apiKey) {
      console.error('Google Maps API key not found. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables.')
      googleMapsScriptLoading = false
      reject(new Error('Google Maps API key not found'))
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    script.async = true
    script.defer = true
    script.onload = () => {
      googleMapsScriptLoaded = true
      googleMapsScriptLoading = false
      resolve()
    }
    script.onerror = () => {
      console.error('Failed to load Google Maps script')
      googleMapsScriptLoading = false
      reject(new Error('Failed to load Google Maps script'))
    }
    
    document.head.appendChild(script)
  })

  return googleMapsLoadPromise
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
  const autocompleteRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    // Check if API key is available
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!apiKey) {
      setLoadError('Google Maps API key not found')
      setIsLoaded(false)
      return
    }

    loadGoogleMapsScript()
      .then(() => {
        setIsLoaded(true)
        setLoadError(null)
      })
      .catch((error) => {
        console.error('Error loading Google Maps:', error)
        setLoadError(error.message)
        setIsLoaded(false)
      })
  }, [])

  useEffect(() => {
    if (!isLoaded || !inputRef.current || !window.google) return

    const initializeAutocomplete = () => {
      if (autocompleteRef.current) {
        autocompleteRef.current.unbindAll()
      }

      try {
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
      } catch (error) {
        console.error('Error initializing Google Places Autocomplete:', error)
        setLoadError('Failed to initialize address suggestions')
      }
    }

    initializeAutocomplete()

    return () => {
      if (autocompleteRef.current) {
        try {
          autocompleteRef.current.unbindAll()
        } catch (error) {
          console.error('Error cleaning up autocomplete:', error)
        }
      }
    }
  }, [isLoaded, onChange, onPlaceSelect])

  // Use fallback component if API key is missing
  if (loadError && loadError.includes('API key')) {
    return (
      <FallbackAddressInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        label={label}
        error={error}
        required={required}
        className={className}
      />
    )
  }

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
      {loadError && (
        <p className="mt-1 text-sm text-red-600">{loadError}</p>
      )}
      {!isLoaded && !loadError && (
        <p className="mt-1 text-sm text-gray-500">Loading address suggestions...</p>
      )}
    </div>
  )
}
