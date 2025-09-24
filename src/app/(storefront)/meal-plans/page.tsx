'use client'

import { useState } from 'react'
import PlanCard from '@/components/PlanCard'

export default function MealPlansPage() {
  const [selectedDuration, setSelectedDuration] = useState<'weekly' | 'monthly'>('monthly')
  
  const mealPlans = [
    {
      title: 'Deluxe Meal',
      monthlyPrice: 12499,
      weeklyPrice: 3249,
      description: 'Lunch and Dinner',
      features: ['Freshly cooked', 'Portion-controlled', 'Macro-balanced', 'Premium ingredients'],
      isVeg: false, // Offers both veg and non-veg
      vegNote: 'Veg & Non-Veg Available',
      popular: true,
      savings: 'Save ₹1,000 monthly',
    },
    {
      title: 'Regular Meal',
      monthlyPrice: 5499,
      weeklyPrice: 1449,
      description: 'Lunch or Dinner',
      features: ['Freshly cooked', 'Portion-controlled', 'Macro-balanced', 'Flexible timing'],
      isVeg: false, // Offers both veg and non-veg
      vegNote: 'Veg & Non-Veg Available',
      popular: false,
      savings: 'Save ₹500 monthly',
    },
    {
      title: 'All Day Salad & Juice',
      monthlyPrice: 4499,
      weeklyPrice: 1199,
      description: 'Vegetable & Fruit Salad + Juices',
      features: ['Freshly prepared', 'Portion-controlled', 'Nutrient-rich', 'Detox friendly'],
      isVeg: true, // 100% vegetarian
      vegNote: '100% Vegetarian',
      popular: false,
      savings: 'Save ₹400 monthly',
    }
  ]

  const calculateSavings = (plan: { weeklyPrice: number; monthlyPrice: number }) => {
    if (selectedDuration === 'weekly') {
      const weeklyTotal = plan.weeklyPrice * 4
      const monthlyPrice = plan.monthlyPrice
      return monthlyPrice - weeklyTotal
    }
    return 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 relative overflow-hidden">
      {/* Light green texture background - Mobile optimized */}
      <div className="absolute inset-0 bg-green-dots opacity-8"></div>
      <div className="absolute inset-0 bg-green-grid opacity-5"></div>
      <div className="absolute inset-0 bg-green-lines opacity-6"></div>
      
      {/* Page Header - Mobile optimized */}
      <section className="py-6 md:py-8 lg:py-12 relative">
        {/* Enhanced light green texture patterns */}
        <div className="absolute inset-0 bg-green-dots opacity-12"></div>
        <div className="absolute inset-0 bg-green-lines opacity-8"></div>
        
        {/* Subtle floating elements - Hidden on mobile */}
        <div className="hidden md:block absolute top-8 left-8 w-24 h-24 bg-emerald-200/10 rounded-full blur-3xl"></div>
        <div className="hidden md:block absolute bottom-8 right-8 w-32 h-32 bg-teal-200/10 rounded-full blur-3xl"></div>
        <div className="hidden md:block absolute top-1/2 left-1/4 w-20 h-20 bg-emerald-100/15 rounded-full blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 md:mb-4">
            Meal Plans
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-4 md:mb-6 px-2">
            Monthly and weekly subscription plans tailored to your fitness goals
          </p>
          
          {/* Duration Toggle - Mobile optimized */}
          <div className="inline-flex bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg border border-emerald-200">
            <button
              onClick={() => setSelectedDuration('monthly')}
              className={`px-3 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                selectedDuration === 'monthly'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              Monthly Plans
            </button>
            <button
              onClick={() => setSelectedDuration('weekly')}
              className={`px-3 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                selectedDuration === 'weekly'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              Weekly Plans
            </button>
          </div>
          
          {/* Savings Info - Mobile optimized */}
          {selectedDuration === 'weekly' && (
            <div className="mt-3 md:mt-4 inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full text-xs md:text-sm font-medium">
              <span>💰</span>
              <span className="hidden sm:inline">Weekly plans offer flexibility with great value!</span>
              <span className="sm:hidden">Great weekly value!</span>
            </div>
          )}
        </div>
      </section>

      {/* Meal Plans Grid - Mobile optimized */}
      <section className="py-6 md:py-8 lg:py-12 relative">
        {/* Enhanced light green texture patterns */}
        <div className="absolute inset-0 bg-green-dots opacity-10"></div>
        <div className="absolute inset-0 bg-green-lines opacity-6"></div>
        
        {/* Subtle floating elements - Hidden on mobile */}
        <div className="hidden md:block absolute top-6 left-6 w-20 h-20 bg-teal-200/10 rounded-full blur-3xl"></div>
        <div className="hidden md:block absolute bottom-6 right-6 w-28 h-28 bg-emerald-200/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header - Mobile optimized */}
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
              {selectedDuration === 'weekly' ? 'Weekly Subscription Plans' : 'Monthly Subscription Plans'}
            </h2>
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto px-2">
              {selectedDuration === 'weekly' 
                ? 'Flexible weekly plans perfect for trying new routines or short-term goals'
                : 'Comprehensive monthly plans for consistent nutrition and maximum savings'
              }
            </p>
            <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto mt-2 md:mt-3 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {mealPlans.map((plan, index) => (
              <div key={index} className="relative">
                {plan.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2 md:px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      MOST POPULAR
                    </div>
                  </div>
                )}
                <PlanCard
                  title={plan.title}
                  price={selectedDuration === 'weekly' ? plan.weeklyPrice : plan.monthlyPrice}
                  description={plan.description}
                  features={plan.features}
                  isVeg={plan.isVeg}
                  vegNote={plan.vegNote}
                  duration={selectedDuration}
                  savings={selectedDuration === 'weekly' ? calculateSavings(plan) : plan.savings}
                />
              </div>
            ))}
          </div>

          {/* Pricing Comparison - Mobile optimized */}
          <div className="mt-8 md:mt-12 bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl border border-emerald-200">
            <h3 className="text-lg md:text-xl font-bold text-slate-800 text-center mb-3 md:mb-4">
              Pricing Comparison
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {mealPlans.map((plan, index) => (
                <div key={index} className="text-center p-2 md:p-3 rounded-xl md:rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
                  <h4 className="font-bold text-slate-800 mb-1 md:mb-2 text-sm md:text-base">{plan.title}</h4>
                  <div className="space-y-1">
                    <div className="text-xs md:text-sm text-slate-600">
                      <span className="font-medium">Weekly:</span> ₹{plan.weeklyPrice}
                    </div>
                    <div className="text-xs md:text-sm text-slate-600">
                      <span className="font-medium">Monthly:</span> ₹{plan.monthlyPrice}
                    </div>
                    <div className="text-xs text-emerald-600 font-medium">
                      {plan.savings}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Row - Mobile optimized */}
      <section className="py-6 md:py-8 lg:py-12 relative">
        {/* Enhanced light green texture patterns */}
        <div className="absolute inset-0 bg-green-dots opacity-8"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6 bg-white/90 backdrop-blur-sm px-4 md:px-6 py-4 md:py-4 rounded-2xl shadow-lg border border-emerald-200">
              <div className="flex items-center space-x-2">
                <span className="text-lg">⏰</span>
                <span className="font-semibold text-slate-800 text-sm md:text-base">On-time delivery</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-emerald-200"></div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">🧼</span>
                <span className="font-semibold text-slate-800 text-sm md:text-base">Hygienic packaging</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-emerald-200"></div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">📍</span>
                <span className="font-semibold text-emerald-600 text-sm md:text-base">Nagpur service area</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Note - Mobile optimized */}
      <section className="py-6 md:py-8 lg:py-12 relative">
        {/* Enhanced light green texture patterns */}
        <div className="absolute inset-0 bg-green-dots opacity-6"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 md:px-6 py-4 md:py-6 rounded-2xl md:rounded-3xl shadow-xl">
            <h3 className="text-lg md:text-xl font-bold mb-2">Delivery Information</h3>
            <p className="text-sm md:text-base mb-2 md:mb-3">Delivery charges ₹10 per km</p>
            <div className="inline-flex items-center space-x-2 md:space-x-3 bg-white/20 rounded-full px-3 md:px-4 py-1 md:py-1.5">
              <span>🚚</span>
              <span className="text-xs md:text-sm">Free delivery for orders above ₹500</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
