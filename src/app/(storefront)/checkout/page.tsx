'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useCartStore } from '@/lib/store/cart'
import { ArrowLeft, MapPin, Truck } from 'lucide-react'
import PlaceOrderButton from './PlaceOrderButton'
import GooglePlacesAutocomplete from '@/components/ui/google-places-autocomplete'
import { calculateDeliveryCharge, getDistanceFromGoogle, getCoordinatesFromAddress, RESTAURANT_LOCATION, type DeliveryInfo } from '@/lib/delivery'

// Validation schema
const checkoutSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian phone number'),
  addressLine1: z.string().min(1, 'Address line 1 is required'),
  addressLine2: z.string().optional(),
  landmark: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Please enter a valid 6-digit pincode'),
  deliveryNotes: z.string().optional(),
  distance: z.string().regex(/^\d+$/, 'Please enter a valid distance').optional(),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal } = useCartStore()
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null)
  const [isCalculatingDelivery, setIsCalculatingDelivery] = useState(false)
  const [deliveryError, setDeliveryError] = useState<string | null>(null)

  const {
    register,
    formState: { errors, isValid },
    setFocus,
    watch,
    setValue,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      city: 'Nagpur',
    },
    mode: 'onChange',
  })

  // Watch form values for real-time validation
  const watchedValues = watch()

  // Calculate delivery when address changes
  const handleAddressSelect = async (place: any) => {
    if (!place.geometry?.location) return

    setIsCalculatingDelivery(true)
    setDeliveryError(null)

    try {
      const customerLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }

      const distance = await getDistanceFromGoogle(customerLocation)
      const subtotal = getTotal()
      const deliveryInfo = calculateDeliveryCharge(distance, subtotal)
      
      setDeliveryInfo(deliveryInfo)
      setValue('distance', distance.toString())
    } catch (error) {
      console.error('Error calculating delivery:', error)
      setDeliveryError('Failed to calculate delivery charge. Please try again.')
    } finally {
      setIsCalculatingDelivery(false)
    }
  }

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/products')
    }
  }, [items.length, router])

  // Focus first error field
  useEffect(() => {
    const firstError = Object.keys(errors)[0] as keyof CheckoutFormData
    if (firstError) {
      setFocus(firstError)
    }
  }, [errors, setFocus])

  // Recalculate delivery when cart total changes
  useEffect(() => {
    if (deliveryInfo) {
      const subtotal = getTotal()
      const newDeliveryInfo = calculateDeliveryCharge(deliveryInfo.distance, subtotal)
      setDeliveryInfo(newDeliveryInfo)
    }
  }, [items, getTotal])

  const subtotal = getTotal()
  const deliveryCharge = deliveryInfo?.deliveryCharge || 0
  const total = subtotal + deliveryCharge

  if (items.length === 0) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="mb-4 text-gray-600 hover:text-gray-900 flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-sm text-gray-500 mt-1">Cart items: {items.length}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Details Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Details</h2>
              
              <form className="space-y-4">
                {/* Full Name */}
                <div>
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    {...register('fullName')}
                    placeholder="Enter your full name"
                    className="mt-1 rounded-xl h-12"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    {...register('phone')}
                    placeholder="Enter 10-digit phone number"
                    className="mt-1 rounded-xl h-12"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                {/* Address Line 1 */}
                <div>
                  <GooglePlacesAutocomplete
                    value={watchedValues.addressLine1 || ''}
                    onChange={(value) => setValue('addressLine1', value)}
                    onPlaceSelect={handleAddressSelect}
                    label="Delivery Address"
                    placeholder="Start typing your address..."
                    required
                    error={errors.addressLine1?.message}
                    className="mt-1"
                  />
                </div>

                {/* Address Line 2 */}
                <div>
                  <Label htmlFor="addressLine2" className="text-sm font-medium text-gray-700">
                    Address Line 2
                  </Label>
                  <Input
                    id="addressLine2"
                    {...register('addressLine2')}
                    placeholder="Apartment, suite, etc. (optional)"
                    className="mt-1 rounded-xl h-12"
                  />
                </div>

                {/* Landmark */}
                <div>
                  <Label htmlFor="landmark" className="text-sm font-medium text-gray-700">
                    Landmark
                  </Label>
                  <Input
                    id="landmark"
                    {...register('landmark')}
                    placeholder="Near hospital, school, etc. (optional)"
                    className="mt-1 rounded-xl h-12"
                  />
                </div>

                {/* City */}
                <div>
                  <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                    City *
                  </Label>
                  <Input
                    id="city"
                    {...register('city')}
                    placeholder="Enter city name"
                    className="mt-1 rounded-xl h-12"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                  )}
                </div>

                {/* Pincode */}
                <div>
                  <Label htmlFor="pincode" className="text-sm font-medium text-gray-700">
                    Pincode *
                  </Label>
                  <Input
                    id="pincode"
                    {...register('pincode')}
                    placeholder="Enter 6-digit pincode"
                    className="mt-1 rounded-xl h-12"
                  />
                  {errors.pincode && (
                    <p className="mt-1 text-sm text-red-600">{errors.pincode.message}</p>
                  )}
                </div>


                {/* Delivery Notes */}
                <div>
                  <Label htmlFor="deliveryNotes" className="text-sm font-medium text-gray-700">
                    Delivery Notes
                  </Label>
                  <Textarea
                    id="deliveryNotes"
                    {...register('deliveryNotes')}
                    placeholder="Any special instructions for delivery"
                    className="mt-1 rounded-xl min-h-[80px]"
                  />
                </div>

                {/* Place Order Button */}
                <PlaceOrderButton
                  customer={{
                    fullName: watchedValues.fullName || '',
                    phone: watchedValues.phone || '',
                    address: {
                      line1: watchedValues.addressLine1 || '',
                      line2: watchedValues.addressLine2 || '',
                      landmark: watchedValues.landmark || '',
                      city: watchedValues.city || '',
                      pincode: watchedValues.pincode || '',
                    },
                    deliveryNotes: watchedValues.deliveryNotes || '',
                  }}
                  pricing={{
                    subtotal,
                    deliveryCharge,
                    total,
                    distance: deliveryInfo?.distance,
                  }}
                  paymentMethod="Cash on Delivery"
                  disabled={items.length === 0}
                />
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Delivery Information */}
              {deliveryInfo && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Delivery Information</span>
                  </div>
                  <div className="text-sm text-blue-700">
                    <p>Distance: {deliveryInfo.distance} km from Ajni Metro</p>
                    {deliveryInfo.isFreeDelivery && (
                      <p className="text-green-600 font-medium">🎉 Free delivery on orders above ₹500!</p>
                    )}
                  </div>
                </div>
              )}

              {/* Delivery Calculation Status */}
              {isCalculatingDelivery && (
                <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-yellow-600 animate-pulse" />
                    <span className="text-sm text-yellow-700">Calculating delivery charge...</span>
                  </div>
                </div>
              )}

              {/* Delivery Error */}
              {deliveryError && (
                <div className="bg-red-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-red-700">{deliveryError}</p>
                </div>
              )}

              {/* Pricing */}
              <div className="space-y-2 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Delivery Charge
                    {deliveryInfo?.isFreeDelivery && <span className="text-green-600 ml-1">(Free!)</span>}
                  </span>
                  <span className={`text-gray-900 ${deliveryInfo?.isFreeDelivery ? 'line-through text-gray-500' : ''}`}>
                    ₹{deliveryCharge}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
                  <span className="text-gray-900">Total</span>
                  <span className="text-emerald-600">₹{total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
