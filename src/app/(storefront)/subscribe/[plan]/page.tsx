'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MEAL_PLANS, SPICE_LEVELS, PROTEIN_OPTIONS, CALORIE_FOCUS, DELIVERY_CHARGE_PER_KM } from '@/lib/plans'
import StepWizard, { StepNavigation } from '@/components/StepWizard'
import SummaryCard from '@/components/SummaryCard'
import DayChips from '@/components/DayChips'
import SlotChips from '@/components/SlotChips'
import GooglePlacesAutocomplete from '@/components/ui/google-places-autocomplete'
import { calculateDeliveryCharge, getDistanceFromGoogle, RESTAURANT_LOCATION, type DeliveryInfo } from '@/lib/delivery'
import { Loader2, MessageCircle, MapPin, Truck } from 'lucide-react'

// Add CSS to prevent scroll blocking
const dropdownStyles = `
  /* Prevent scroll blocking when dropdowns are open */
  [data-radix-select-content] {
    pointer-events: auto !important;
  }
  
  [data-radix-popper-content-wrapper] {
    pointer-events: auto !important;
  }
  
  /* Allow body scroll when dropdown is open */
  body[data-scroll-locked="false"] {
    overflow: visible !important;
  }
  
  /* Ensure dropdown content is interactive */
  [data-radix-select-content] * {
    pointer-events: auto !important;
  }
  
  /* Prevent focus trap from blocking scroll */
  [data-radix-focus-scope] {
    pointer-events: none !important;
  }
  
  [data-radix-focus-scope] > * {
    pointer-events: auto !important;
  }
`

// Validation schemas
const preferencesSchema = z.object({
  veg: z.boolean(),
  spiceLevel: z.string().min(1, 'Spice level is required'),
  protein: z.string().min(1, 'Protein option is required'),
  calorieFocus: z.string().min(1, 'Calorie focus is required'),
  allergens: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  selectedDays: z.array(z.string()).min(1, 'Please select at least one day'),
  selectedSlots: z.array(z.string()).min(1, 'Please select at least one delivery slot'),
})

const deliverySchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian phone number'),
  addressLine1: z.string().min(1, 'Address line 1 is required'),
  addressLine2: z.string().optional(),
  landmark: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Please enter a valid 6-digit pincode'),
  distance: z.string().regex(/^\d+$/, 'Please enter a valid distance').optional(),
})

type PreferencesFormData = z.infer<typeof preferencesSchema>
type DeliveryFormData = z.infer<typeof deliverySchema>

export default function SubscribePage() {
  const router = useRouter()
  const params = useParams()
  const planId = params.plan as string
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [preferencesData, setPreferencesData] = useState<PreferencesFormData | null>(null)
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null)
  const [isCalculatingDelivery, setIsCalculatingDelivery] = useState(false)
  const [deliveryError, setDeliveryError] = useState<string | null>(null)

  // Inject CSS to prevent scroll blocking
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = dropdownStyles
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Get plan details
  const plan = MEAL_PLANS[planId]

  // Redirect if invalid plan
  useEffect(() => {
    if (!plan) {
      router.push('/meal-plans')
    }
  }, [plan, router])

  // Preferences form
  const preferencesForm = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      veg: true,
      spiceLevel: '',
      protein: '',
      calorieFocus: '',
      allergens: '',
      startDate: new Date().toISOString().split('T')[0],
      selectedDays: [],
      selectedSlots: [],
    },
  })

  // Delivery form
  const deliveryForm = useForm<DeliveryFormData>({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      city: 'Nagpur',
    },
  })

  // Handle preferences form submission
  const handlePreferencesSubmit = (data: PreferencesFormData) => {
    setPreferencesData(data)
    setCurrentStep(2)
  }

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
      const planPrice = plan.price
      const deliveryInfo = calculateDeliveryCharge(distance, planPrice)
      
      setDeliveryInfo(deliveryInfo)
    } catch (error) {
      console.error('Error calculating delivery:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to calculate delivery charge. Please try again.'
      setDeliveryError(errorMessage)
    } finally {
      setIsCalculatingDelivery(false)
    }
  }

  // Handle delivery form submission
  const handleDeliverySubmit = () => {
    if (!preferencesData) return
    setCurrentStep(3)
  }

  // Handle final subscription
  const handleStartSubscription = async () => {
    if (!preferencesData || !deliveryForm.getValues()) return
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const deliveryData = deliveryForm.getValues()
      
      // Generate subscription ID
      const subId = `SF-SUB-${Date.now()}`
      
      // Build subscription object
      const subscription = {
        subId,
        createdAt: new Date().toISOString(),
        plan: {
          id: plan.id,
          name: plan.name,
          price: plan.price,
          description: plan.description,
        },
        preferences: preferencesData,
        delivery: deliveryData,
        pricing: {
          monthlyPrice: plan.price,
          deliveryCharge: deliveryData.distance ? parseInt(deliveryData.distance) * DELIVERY_CHARGE_PER_KM : 0,
          total: plan.price + (deliveryData.distance ? parseInt(deliveryData.distance) * DELIVERY_CHARGE_PER_KM : 0),
        },
        status: 'active',
      }

      // Save to localStorage
      localStorage.setItem('lastSubscription', JSON.stringify(subscription))
      
      // Show success toast (if toast system exists)
      if (typeof window !== 'undefined' && 'showToast' in window) {
        (window as { showToast: (message: string, type: string) => void }).showToast('Subscription started! #' + subId, 'success')
      }

      // Redirect to success page
      router.push(`/subscription-success?subId=${subId}`)
    } catch (error) {
      console.error('Error starting subscription:', error)
      setIsSubmitting(false)
    }
  }

  // Handle WhatsApp inquiry
  const handleWhatsAppInquiry = () => {
    if (!preferencesData) return
    
    const message = `Hi, I want to subscribe to ${plan.name} starting ${preferencesData.startDate}.`
    const whatsappUrl = `https://wa.me/917709811319?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  // Navigation functions
  const goToNext = () => {
    if (currentStep === 1) {
      preferencesForm.handleSubmit(handlePreferencesSubmit)()
    } else if (currentStep === 2) {
      deliveryForm.handleSubmit(handleDeliverySubmit)()
    } else if (currentStep === 3) {
      handleStartSubscription()
    }
  }

  const goToPrevious = () => {
    setCurrentStep(Math.max(1, currentStep - 1))
  }

  // Check if can proceed to next step
  const canProceed = (): boolean => {
    if (currentStep === 1) {
      // Check if all required fields are filled
      const values = preferencesForm.watch()
      const hasVeg = values.veg !== undefined
      const hasSpiceLevel = Boolean(values.spiceLevel && values.spiceLevel.trim() !== '')
      const hasProtein = Boolean(values.protein && values.protein.trim() !== '')
      const hasCalorieFocus = Boolean(values.calorieFocus && values.calorieFocus.trim() !== '')
      const hasStartDate = Boolean(values.startDate && values.startDate.trim() !== '')
      const hasSelectedDays = Array.isArray(values.selectedDays) && values.selectedDays.length > 0
      const hasSelectedSlots = Array.isArray(values.selectedSlots) && values.selectedSlots.length > 0
      
      return hasVeg && hasSpiceLevel && hasProtein && hasCalorieFocus && hasStartDate && hasSelectedDays && hasSelectedSlots
    } else if (currentStep === 2) {
      // Check if all required fields are filled
      const values = deliveryForm.watch()
      const hasFullName = Boolean(values.fullName && values.fullName.trim() !== '')
      const hasPhone = Boolean(values.phone && values.phone.trim() !== '')
      const hasAddressLine1 = Boolean(values.addressLine1 && values.addressLine1.trim() !== '')
      const hasCity = Boolean(values.city && values.city.trim() !== '')
      const hasPincode = Boolean(values.pincode && values.pincode.trim() !== '')
      
      return hasFullName && hasPhone && hasAddressLine1 && hasCity && hasPincode
    }
    return true
  }

  if (!plan) {
    return null // Will redirect
  }

  const deliveryData = deliveryForm.watch()
  const preferencesDataForSummary = preferencesForm.watch()

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Subscribe to {plan.name}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            {plan.description} - ₹{plan.price.toLocaleString()} per month
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 lg:p-8">
              <StepWizard
                currentStep={currentStep}
                totalSteps={3}
                onNext={goToNext}
                onPrevious={goToPrevious}
                canProceed={canProceed()}
                isSubmitting={isSubmitting}
              />

              {/* Step 1: Preferences */}
              {currentStep === 1 && (
                <form onSubmit={preferencesForm.handleSubmit(handlePreferencesSubmit)} className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Customize Your Meal Plan</h2>
                    <p className="text-gray-600">Tell us about your preferences so we can create the perfect meal plan for you</p>
                  </div>
                  
                  {/* Plan Info Card */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-6 rounded-2xl shadow-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-green-800 text-lg mb-2">{plan.name}</h3>
                        <p className="text-green-700 text-sm mb-3">{plan.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-green-800">₹{plan.price.toLocaleString()}</span>
                          <span className="text-sm text-green-600 font-medium">/ month</span>
                        </div>
                      </div>
                      <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">🍽️</span>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields Grid */}
                  <div className="space-y-8">
                    {/* Diet Preference */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <Label className="text-base font-semibold text-gray-800">Diet Preference</Label>
                        <span className="text-red-500">*</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label className={`
                          relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                          ${preferencesForm.watch('veg') === true 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-200 bg-white hover:border-gray-300'
                          }
                        `}>
                          <input
                            type="radio"
                            name="veg"
                            checked={preferencesForm.watch('veg') === true}
                            onChange={() => preferencesForm.setValue('veg', true)}
                            className="sr-only"
                          />
                          <div className="flex items-center gap-3">
                            <div className={`
                              w-5 h-5 rounded-full border-2 flex items-center justify-center
                              ${preferencesForm.watch('veg') === true 
                                ? 'border-green-500 bg-green-500' 
                                : 'border-gray-300'
                              }
                            `}>
                              {preferencesForm.watch('veg') === true && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Vegetarian</div>
                              <div className="text-sm text-gray-500">Plant-based meals</div>
                            </div>
                          </div>
                        </label>
                        
                        <label className={`
                          relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                          ${preferencesForm.watch('veg') === false 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-200 bg-white hover:border-gray-300'
                          }
                        `}>
                          <input
                            type="radio"
                            name="veg"
                            checked={preferencesForm.watch('veg') === false}
                            onChange={() => preferencesForm.setValue('veg', false)}
                            className="sr-only"
                          />
                          <div className="flex items-center gap-3">
                            <div className={`
                              w-5 h-5 rounded-full border-2 flex items-center justify-center
                              ${preferencesForm.watch('veg') === false 
                                ? 'border-green-500 bg-green-500' 
                                : 'border-gray-300'
                              }
                            `}>
                              {preferencesForm.watch('veg') === false && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Non-Vegetarian</div>
                              <div className="text-sm text-gray-500">Includes meat & eggs</div>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Preferences Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Spice Level */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <Label className="text-base font-semibold text-gray-800">Spice Level</Label>
                          <span className="text-red-500">*</span>
                        </div>
                        <Select onValueChange={(value) => preferencesForm.setValue('spiceLevel', value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Choose your spice preference" />
                          </SelectTrigger>
                          <SelectContent>
                            {SPICE_LEVELS.map((level) => (
                              <SelectItem key={level} value={level}>{level}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {preferencesForm.formState.errors.spiceLevel && (
                          <p className="text-sm text-red-600">{preferencesForm.formState.errors.spiceLevel.message}</p>
                        )}
                      </div>

                      {/* Protein Preference */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <Label className="text-base font-semibold text-gray-800">Protein Preference</Label>
                          <span className="text-red-500">*</span>
                        </div>
                        <Select onValueChange={(value) => preferencesForm.setValue('protein', value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select protein option" />
                          </SelectTrigger>
                          <SelectContent>
                            {PROTEIN_OPTIONS.map((option) => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {preferencesForm.formState.errors.protein && (
                          <p className="text-sm text-red-600">{preferencesForm.formState.errors.protein.message}</p>
                        )}
                      </div>

                      {/* Calorie Focus */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <Label className="text-base font-semibold text-gray-800">Calorie Focus</Label>
                          <span className="text-red-500">*</span>
                        </div>
                        <Select onValueChange={(value) => preferencesForm.setValue('calorieFocus', value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select calorie focus" />
                          </SelectTrigger>
                          <SelectContent>
                            {CALORIE_FOCUS.map((focus) => (
                              <SelectItem key={focus} value={focus}>{focus}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {preferencesForm.formState.errors.calorieFocus && (
                          <p className="text-sm text-red-600">{preferencesForm.formState.errors.calorieFocus.message}</p>
                        )}
                      </div>

                      {/* Start Date */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <Label className="text-base font-semibold text-gray-800">Start Date</Label>
                          <span className="text-red-500">*</span>
                        </div>
                        <Input
                          {...preferencesForm.register('startDate')}
                          type="date"
                          className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                        />
                        {preferencesForm.formState.errors.startDate && (
                          <p className="text-sm text-red-600">{preferencesForm.formState.errors.startDate.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Allergens */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <Label className="text-base font-semibold text-gray-800">Allergens & Dietary Restrictions</Label>
                        <span className="text-gray-500 text-sm">(Optional)</span>
                      </div>
                      <Textarea
                        {...preferencesForm.register('allergens')}
                        placeholder="List any food allergies, intolerances, or dietary restrictions..."
                        className="min-h-[100px] border-gray-200 focus:border-green-500 focus:ring-green-500/20 resize-none"
                      />
                    </div>

                    {/* Days of Week */}
                    <DayChips
                      selectedDays={preferencesForm.watch('selectedDays')}
                      onChange={(days) => preferencesForm.setValue('selectedDays', days)}
                    />

                    {/* Delivery Slots */}
                    <SlotChips
                      selectedSlots={preferencesForm.watch('selectedSlots')}
                      onChange={(slots) => preferencesForm.setValue('selectedSlots', slots)}
                      planMeals={plan.meals}
                    />

                    <p className="text-sm text-gray-500 text-center">Custom meals available.</p>
                  </div>
                  
                  <StepNavigation
                    currentStep={currentStep}
                    totalSteps={3}
                    onNext={goToNext}
                    onPrevious={goToPrevious}
                    canProceed={canProceed()}
                    isSubmitting={isSubmitting}
                  />
                </form>
              )}

              {/* Step 2: Delivery Details */}
              {currentStep === 2 && (
                <form onSubmit={deliveryForm.handleSubmit(handleDeliverySubmit)} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Details</h2>
                  
                  {/* Full Name */}
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                      Full Name *
                    </Label>
                    <Input
                      {...deliveryForm.register('fullName')}
                      placeholder="Enter your full name"
                      className="mt-1 rounded-xl h-12"
                    />
                    {deliveryForm.formState.errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{deliveryForm.formState.errors.fullName.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone *
                    </Label>
                    <Input
                      {...deliveryForm.register('phone')}
                      placeholder="Enter 10-digit phone number"
                      className="mt-1 rounded-xl h-12"
                    />
                    {deliveryForm.formState.errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{deliveryForm.formState.errors.phone.message}</p>
                    )}
                  </div>

                  {/* Address Line 1 */}
                  <div>
                    <GooglePlacesAutocomplete
                      value={deliveryForm.watch('addressLine1') || ''}
                      onChange={(value) => deliveryForm.setValue('addressLine1', value)}
                      onPlaceSelect={handleAddressSelect}
                      label="Delivery Address"
                      placeholder="Start typing your address..."
                      required
                      error={deliveryForm.formState.errors.addressLine1?.message}
                      className="mt-1"
                    />
                  </div>

                  {/* Address Line 2 */}
                  <div>
                    <Label htmlFor="addressLine2" className="text-sm font-medium text-gray-700">
                      Address Line 2
                    </Label>
                    <Input
                      {...deliveryForm.register('addressLine2')}
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
                      {...deliveryForm.register('landmark')}
                      placeholder="Nearby landmark (optional)"
                      className="mt-1 rounded-xl h-12"
                    />
                  </div>

                  {/* City and Pincode */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                        City *
                      </Label>
                      <Input
                        {...deliveryForm.register('city')}
                        placeholder="Nagpur"
                        className="mt-1 rounded-xl h-12"
                      />
                      {deliveryForm.formState.errors.city && (
                        <p className="mt-1 text-sm text-red-600">{deliveryForm.formState.errors.city.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="pincode" className="text-sm font-medium text-gray-700">
                        Pincode *
                      </Label>
                      <Input
                        {...deliveryForm.register('pincode')}
                        placeholder="Enter 6-digit pincode"
                        className="mt-1 rounded-xl h-12"
                      />
                      {deliveryForm.formState.errors.pincode && (
                        <p className="mt-1 text-sm text-red-600">{deliveryForm.formState.errors.pincode.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Distance Input */}
                  <div>
                    <Label htmlFor="distance" className="text-sm font-medium text-gray-700">
                      Distance (km)
                    </Label>
                    <Input
                      {...deliveryForm.register('distance')}
                      placeholder="Enter distance for delivery charge"
                      className="mt-1 rounded-xl h-12"
                    />
                    {deliveryForm.formState.errors.distance && (
                      <p className="mt-1 text-sm text-red-600">{deliveryForm.formState.errors.distance.message}</p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">
                      Leave empty if you don&apos;t know the distance
                    </p>
                  </div>

                  <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                    Delivery charges ₹10 per km.
                  </div>
                  
                  <StepNavigation
                    currentStep={currentStep}
                    totalSteps={3}
                    onNext={goToNext}
                    onPrevious={goToPrevious}
                    canProceed={canProceed()}
                    isSubmitting={isSubmitting}
                  />
                </form>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Confirm</h2>
                  
                  <div className="bg-green-50 p-4 rounded-xl">
                    <h3 className="font-semibold text-green-800 text-lg mb-2">Ready to Start Your Subscription?</h3>
                    <p className="text-green-700">
                      Please review your subscription details below. Once confirmed, we&apos;ll start preparing your personalized meals.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={handleStartSubscription}
                      disabled={isSubmitting}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 h-12 rounded-xl"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Starting Subscription...
                        </>
                      ) : (
                        'Start Subscription'
                      )}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleWhatsAppInquiry}
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3 h-12 rounded-xl"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Subscribe Now
                    </Button>
                  </div>
                  
                  <StepNavigation
                    currentStep={currentStep}
                    totalSteps={3}
                    onNext={goToNext}
                    onPrevious={goToPrevious}
                    canProceed={canProceed()}
                    isSubmitting={isSubmitting}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Summary Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <SummaryCard
                plan={plan}
                preferences={preferencesDataForSummary}
                deliveryDetails={deliveryData}
                deliveryInfo={deliveryInfo}
                isCalculatingDelivery={isCalculatingDelivery}
                deliveryError={deliveryError}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
