'use client'

import { Suspense } from 'react'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle, ShoppingBag, MapPin, MessageCircle } from 'lucide-react'

interface SubscriptionPreferences {
  veg: boolean
  spiceLevel: string
  protein: string
  calorieFocus: string
  allergens: string
  startDate: string
  selectedDays: string[]
  selectedSlots: string[]
}

interface SubscriptionDelivery {
  fullName: string
  phone: string
  addressLine1: string
  addressLine2: string
  landmark: string
  city: string
  pincode: string
  distance: string
}

interface SubscriptionPricing {
  monthlyPrice: number
  deliveryCharge: number
  total: number
}

interface Subscription {
  subId: string
  createdAt: string
  plan: {
    id: string
    name: string
    price: number
    description: string
  }
  preferences: SubscriptionPreferences
  delivery: SubscriptionDelivery
  pricing: SubscriptionPricing
  status: string
}

function SubscriptionSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const subId = searchParams.get('subId')
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!subId) {
      router.push('/meal-plans')
      return
    }

    // Try to get subscription from localStorage
    const lastSubscription = localStorage.getItem('lastSubscription')
    if (lastSubscription) {
      try {
        const parsedSubscription = JSON.parse(lastSubscription)
        if (parsedSubscription.subId === subId) {
          setSubscription(parsedSubscription)
        } else {
          router.push('/meal-plans')
        }
      } catch (error) {
        console.error('Error parsing subscription:', error)
        router.push('/meal-plans')
      }
    } else {
      router.push('/meal-plans')
    }
    
    setIsLoading(false)
  }, [subId, router])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`
  }

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

  const handleWhatsAppChat = () => {
    if (!subscription) return
    
    const message = `Hi, my subscription ${subscription.subId} is active. I have some questions.`
    const whatsappUrl = `https://wa.me/917709811319?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subscription details...</p>
        </div>
      </div>
    )
  }

  if (!subscription) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Subscription Not Found</h1>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t find the subscription you&apos;re looking for. It may have been removed or the link is invalid.
          </p>
          <Link href="/meal-plans">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Browse Meal Plans
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Thank you! Your subscription is active.
          </h1>
          <p className="text-lg text-gray-600">
            We&apos;ve received your subscription and will start preparing your personalized meals according to your preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subscription Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2 text-green-600" />
                Subscription Details
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subscription ID:</span>
                  <span className="font-mono font-medium text-gray-900">{subscription.subId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="text-gray-900">{formatDate(subscription.preferences.startDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="text-green-600 font-medium capitalize">{subscription.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Price:</span>
                  <span className="text-gray-900">{formatPrice(subscription.pricing.monthlyPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Charge:</span>
                  <span className="text-gray-900">
                    {subscription.delivery.distance 
                      ? `${formatPrice(subscription.pricing.deliveryCharge)} (${subscription.delivery.distance} km)`
                      : '₹10 per km'
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Plan Information */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Plan Information</h2>
              
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600">Plan:</span>
                  <p className="font-medium text-gray-900">{subscription.plan.name}</p>
                </div>
                <div>
                  <span className="text-gray-600">Description:</span>
                  <p className="font-medium text-gray-900">{subscription.plan.description}</p>
                </div>
                <div>
                  <span className="text-gray-600">Diet:</span>
                  <p className="font-medium text-gray-900">
                    {subscription.preferences.veg ? 'Vegetarian' : 'Non-Vegetarian'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Spice Level:</span>
                  <p className="font-medium text-gray-900">{subscription.preferences.spiceLevel}</p>
                </div>
                <div>
                  <span className="text-gray-600">Protein:</span>
                  <p className="font-medium text-gray-900">{subscription.preferences.protein}</p>
                </div>
                <div>
                  <span className="text-gray-600">Calorie Focus:</span>
                  <p className="font-medium text-gray-900">{subscription.preferences.calorieFocus}</p>
                </div>
                {subscription.preferences.allergens && (
                  <div>
                    <span className="text-gray-600">Allergens:</span>
                    <p className="font-medium text-gray-900">{subscription.preferences.allergens}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Delivery & Schedule */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-green-600" />
                Delivery & Schedule
              </h2>
              
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <p className="font-medium text-gray-900">{subscription.delivery.fullName}</p>
                </div>
                <div>
                  <span className="text-gray-600">Phone:</span>
                  <p className="font-medium text-gray-900">{subscription.delivery.phone}</p>
                </div>
                <div>
                  <span className="text-gray-600">Address:</span>
                  <div className="text-gray-900">
                    <p>{subscription.delivery.addressLine1}</p>
                    {subscription.delivery.addressLine2 && <p>{subscription.delivery.addressLine2}</p>}
                    {subscription.delivery.landmark && <p>Near {subscription.delivery.landmark}</p>}
                    <p>{subscription.delivery.city} - {subscription.delivery.pincode}</p>
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Delivery Days:</span>
                  <p className="font-medium text-gray-900">{formatDays(subscription.preferences.selectedDays)}</p>
                </div>
                <div>
                  <span className="text-gray-600">Delivery Slots:</span>
                  <p className="font-medium text-gray-900">{formatSlots(subscription.preferences.selectedSlots)}</p>
                </div>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Pricing Summary</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Monthly Plan:</span>
                  <span>{formatPrice(subscription.pricing.monthlyPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery:</span>
                  <span>{formatPrice(subscription.pricing.deliveryCharge)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total:</span>
                    <span className="text-green-600">{formatPrice(subscription.pricing.total)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Note */}
              <div className="mt-4 bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                <p className="font-medium mb-1">Delivery Information</p>
                <p>Delivery charges ₹10 per km</p>
                {subscription.delivery.distance && (
                  <p>Your delivery distance: {subscription.delivery.distance} km</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleWhatsAppChat}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 h-12 rounded-xl"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Subscribe Now
              </Button>
              
              <Link href="/products" className="block">
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3 h-12 rounded-xl"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-2xl shadow-md p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What happens next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <div className="text-2xl mb-2">📋</div>
                <p>We&apos;ll confirm your subscription and start preparing your personalized meals</p>
              </div>
              <div>
                <div className="text-2xl mb-2">🚚</div>
                <p>Your meals will be delivered according to your selected schedule and preferences</p>
              </div>
              <div>
                <div className="text-2xl mb-2">💳</div>
                <p>Monthly billing will continue automatically until you cancel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SubscriptionSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SubscriptionSuccessContent />
    </Suspense>
  )
}
