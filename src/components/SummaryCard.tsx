'use client'

import { MealPlan } from '@/lib/plans'
import { formatPrice } from '@/lib/utils'
import { calculateDeliveryCharge, type DeliveryInfo } from '@/lib/delivery'
import { MapPin } from 'lucide-react'

interface SummaryCardProps {
  plan: MealPlan
  preferences: {
    veg: boolean
    spiceLevel: string
    protein: string
    calorieFocus: string
    allergens?: string
    startDate: string
    selectedDays: string[]
    selectedSlots: string[]
  }
  deliveryDetails: {
    distance?: string | number
  }
  deliveryInfo?: DeliveryInfo | null
  isCalculatingDelivery?: boolean
  deliveryError?: string | null
  isReview?: boolean
}

export default function SummaryCard({ 
  plan, 
  preferences, 
  deliveryDetails, 
  deliveryInfo,
  isCalculatingDelivery = false,
  deliveryError = null
}: SummaryCardProps) {
  const deliveryCharge = deliveryInfo?.deliveryCharge || 0
  const total = plan.price + deliveryCharge

  const formatDays = (days: string[]) => {
    const dayNames = days.map(day => {
      const dayMap: Record<string, string> = {
        monday: 'Mon', tuesday: 'Tue', wednesday: 'Wed', thursday: 'Thu',
        friday: 'Fri', saturday: 'Sat', sunday: 'Sun'
      }
      return dayMap[day] || day
    })
    return dayNames.join(', ')
  }

  const formatSlots = (slots: string[]) => {
    const slotNames = slots.map(slot => {
      const slotMap: Record<string, string> = {
        lunch: 'Lunch (12-2 PM)', dinner: 'Dinner (7-9 PM)'
      }
      return slotMap[slot] || slot
    })
    return slotNames.join(', ')
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Subscription Summary</h3>
      
      {/* Plan Details */}
      <div className="space-y-4 mb-6">
        <div className="bg-green-50 p-4 rounded-xl">
          <h4 className="font-semibold text-green-800 text-lg">{plan.name}</h4>
          <p className="text-green-700">{plan.description}</p>
          <div className="text-2xl font-bold text-green-800 mt-2">
            {formatPrice(plan.price)} <span className="text-sm font-normal">/ month</span>
          </div>
        </div>

        {/* Preferences Summary */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Diet:</span>
            <span className="font-medium">{preferences.veg ? 'Vegetarian' : 'Non-Vegetarian'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Spice Level:</span>
            <span className="font-medium">{preferences.spiceLevel}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Protein:</span>
            <span className="font-medium">{preferences.protein}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Calorie Focus:</span>
            <span className="font-medium">{preferences.calorieFocus}</span>
          </div>
          {preferences.allergens && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Allergens:</span>
              <span className="font-medium">{preferences.allergens}</span>
            </div>
          )}
        </div>

        {/* Schedule */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Start Date:</span>
            <span className="font-medium">{preferences.startDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Delivery Days:</span>
            <span className="font-medium">{formatDays(preferences.selectedDays)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Delivery Slots:</span>
            <span className="font-medium">{formatSlots(preferences.selectedSlots)}</span>
          </div>
        </div>
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
            <div className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
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
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Monthly Plan:</span>
          <span className="font-medium">{formatPrice(plan.price)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Delivery
            {deliveryInfo?.isFreeDelivery && <span className="text-green-600 ml-1">(Free!)</span>}
          </span>
          <span className={`font-medium ${deliveryInfo?.isFreeDelivery ? 'line-through text-gray-500' : ''}`}>
            {deliveryInfo 
              ? `${formatPrice(deliveryCharge)} (${deliveryInfo.distance} km)`
              : 'TBD - ₹10/km'
            }
          </span>
        </div>
        <div className="border-t border-gray-200 pt-2">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span className="text-green-600">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>Custom meals available.</p>
        <p>Free delivery on orders above ₹500</p>
      </div>
    </div>
  )
}
