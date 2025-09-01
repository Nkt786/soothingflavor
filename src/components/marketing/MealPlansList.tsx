import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Leaf, Target, Zap, Flame } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

// Mock data - replace with actual API call
const mealPlans = [
  {
    id: 'weight-loss',
    slug: 'weight-loss',
    name: 'Weight Loss',
    summary: 'Scientifically designed meals to help you lose weight sustainably',
    caloriesMin: 1200,
    caloriesMax: 1500,
    macros: {
      protein: '30%',
      carbs: '40%',
      fats: '30%'
    },
    isVeg: true,
    isKeto: false,
    images: ['/images/placeholder.svg'],
    benefits: [
      'Scientifically proven calorie deficit',
      'High protein to preserve muscle mass',
      'Fiber-rich for satiety',
      'Balanced macronutrients'
    ],
    pricePerWeek: 1499.00
  },
  {
    id: 'maintenance',
    slug: 'maintenance',
    name: 'Maintenance',
    summary: 'Balanced meals to maintain your current weight and energy levels',
    caloriesMin: 1800,
    caloriesMax: 2200,
    macros: {
      protein: '25%',
      carbs: '50%',
      fats: '25%'
    },
    isVeg: true,
    isKeto: false,
    images: ['/images/placeholder.svg'],
    benefits: [
      'Balanced calorie intake',
      'Sustained energy throughout the day',
      'Variety of flavors and textures',
      'Flexible meal timing'
    ],
    pricePerWeek: 1299.00
  },
  {
    id: 'athletic',
    slug: 'athletic',
    name: 'Athletic',
    summary: 'High-performance meals for active individuals and athletes',
    caloriesMin: 2200,
    caloriesMax: 2800,
    macros: {
      protein: '35%',
      carbs: '45%',
      fats: '20%'
    },
    isVeg: false,
    isKeto: false,
    images: ['/images/placeholder.svg'],
    benefits: [
      'High protein for muscle building',
      'Complex carbs for sustained energy',
      'Optimal timing for workout recovery',
      'Enhanced performance support'
    ],
    pricePerWeek: 1799.00
  },
  {
    id: 'keto',
    slug: 'keto',
    name: 'Keto',
    summary: 'Low-carb, high-fat meals to achieve ketosis',
    caloriesMin: 1600,
    caloriesMax: 2000,
    macros: {
      protein: '25%',
      carbs: '5%',
      fats: '70%'
    },
    isVeg: false,
    isKeto: true,
    images: ['/images/placeholder.svg'],
    benefits: [
      'Rapid fat burning',
      'Stable blood sugar levels',
      'Mental clarity and focus',
      'Reduced inflammation'
    ],
    pricePerWeek: 1699.00
  }
]

export function MealPlansList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {mealPlans.map((plan) => (
        <Card key={plan.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
            {plan.images[0] ? (
              <Image
                src={plan.images[0]}
                alt={plan.name}
                className="w-full h-full object-cover"
                width={400}
                height={225}
              />
            ) : (
              <div className="text-center text-gray-500">
                <Leaf className="w-16 h-16 mx-auto mb-2 text-green-400" />
                <p>Image coming soon</p>
              </div>
            )}
          </div>
          
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {plan.summary}
                </CardDescription>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <Badge variant={plan.isVeg ? "default" : "secondary"}>
                  {plan.isVeg ? "Vegetarian" : "Non-Veg"}
                </Badge>
                {plan.isKeto && (
                  <Badge variant="outline" className="border-green-200 text-green-700">
                    Keto
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Calories & Macros */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Flame className="w-4 h-4 text-orange-500 mr-1" />
                  <span className="font-medium">Calories</span>
                </div>
                <p className="text-gray-600">
                  {plan.caloriesMin}-{plan.caloriesMax}
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Target className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="font-medium">Protein</span>
                </div>
                <p className="text-gray-600">{plan.macros.protein}</p>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Key Benefits</h4>
              <ul className="space-y-1">
                {plan.benefits.slice(0, 3).map((benefit, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <Zap className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {formatPrice(plan.pricePerWeek)}
                </p>
                <p className="text-sm text-gray-500">per week</p>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/meal-plans/${plan.slug}`}>
                    Learn More
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href={`/meal-plans/${plan.slug}`}>
                    Choose Plan
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
