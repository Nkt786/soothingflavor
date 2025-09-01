import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const mealPlan = getMealPlanBySlug(params.slug)
  
  if (!mealPlan) {
    return {
      title: 'Meal Plan Not Found - Soothing Flavor',
    }
  }

  return {
    title: `${mealPlan.name} - Soothing Flavor`,
    description: mealPlan.description,
  }
}

const mealPlans = [
  {
    slug: 'weight-loss',
    name: 'Weight Loss Meal Plan',
    description: 'A balanced, calorie-controlled meal plan designed to help you achieve sustainable weight loss while maintaining energy and satisfaction.',
    duration: '4 weeks',
    calories: '1,200-1,500',
    difficulty: 'Beginner',
    price: '$89',
    features: [
      'Calorie-controlled meals',
      'High protein content',
      'Fiber-rich foods',
      'Portion control guidance',
      'Weekly shopping lists',
      'Recipe modifications'
    ],
    meals: {
      breakfast: [
        { name: 'Greek Yogurt Parfait', calories: 280, protein: '18g', carbs: '32g', fat: '8g' },
        { name: 'Oatmeal with Berries', calories: 320, protein: '12g', carbs: '45g', fat: '10g' },
        { name: 'Egg White Omelette', calories: 240, protein: '20g', carbs: '8g', fat: '12g' }
      ],
      lunch: [
        { name: 'Grilled Chicken Salad', calories: 380, protein: '35g', carbs: '15g', fat: '18g' },
        { name: 'Quinoa Bowl', calories: 420, protein: '18g', carbs: '52g', fat: '16g' },
        { name: 'Turkey Wrap', calories: 360, protein: '28g', carbs: '38g', fat: '12g' }
      ],
      dinner: [
        { name: 'Salmon with Vegetables', calories: 450, protein: '42g', carbs: '22g', fat: '20g' },
        { name: 'Lean Beef Stir-Fry', calories: 480, protein: '38g', carbs: '28g', fat: '24g' },
        { name: 'Vegetarian Chili', calories: 380, protein: '22g', carbs: '45g', fat: '12g' }
      ],
      snacks: [
        { name: 'Almonds', calories: 160, protein: '6g', carbs: '6g', fat: '14g' },
        { name: 'Apple with Peanut Butter', calories: 200, protein: '4g', carbs: '28g', fat: '10g' },
        { name: 'Protein Smoothie', calories: 180, protein: '20g', carbs: '18g', fat: '4g' }
      ]
    }
  },
  {
    slug: 'athletic',
    name: 'Athletic Performance Meal Plan',
    description: 'Optimize your athletic performance with this high-energy meal plan designed for active individuals and athletes.',
    duration: '4 weeks',
    calories: '2,200-2,800',
    difficulty: 'Intermediate',
    price: '$99',
    features: [
      'High protein meals',
      'Complex carbohydrates',
      'Performance timing',
      'Recovery nutrition',
      'Hydration guidance',
      'Pre/post workout meals'
    ],
    meals: {
      breakfast: [
        { name: 'Protein Pancakes', calories: 480, protein: '32g', carbs: '58g', fat: '16g' },
        { name: 'Breakfast Burrito', calories: 520, protein: '28g', carbs: '45g', fat: '22g' },
        { name: 'Smoothie Bowl', calories: 450, protein: '24g', carbs: '52g', fat: '18g' }
      ],
      lunch: [
        { name: 'Chicken Rice Bowl', calories: 580, protein: '42g', carbs: '68g', fat: '18g' },
        { name: 'Tuna Pasta Salad', calories: 520, protein: '38g', carbs: '52g', fat: '20g' },
        { name: 'Beef and Sweet Potato', calories: 560, protein: '45g', carbs: '58g', fat: '22g' }
      ],
      dinner: [
        { name: 'Grilled Salmon with Rice', calories: 620, protein: '48g', carbs: '58g', fat: '24g' },
        { name: 'Lean Steak with Potatoes', calories: 680, protein: '52g', carbs: '62g', fat: '28g' },
        { name: 'Chicken Stir-Fry', calories: 580, protein: '42g', carbs: '52g', fat: '26g' }
      ],
      snacks: [
        { name: 'Protein Bar', calories: 240, protein: '20g', carbs: '28g', fat: '8g' },
        { name: 'Greek Yogurt with Granola', calories: 280, protein: '18g', carbs: '32g', fat: '10g' },
        { name: 'Trail Mix', calories: 320, protein: '12g', carbs: '28g', fat: '20g' }
      ]
    }
  },
  {
    slug: 'maintenance',
    name: 'Maintenance & Wellness Meal Plan',
    description: 'Maintain your current weight and improve overall wellness with this balanced, nutrient-rich meal plan.',
    duration: '4 weeks',
    calories: '1,800-2,200',
    difficulty: 'Beginner',
    price: '$79',
    features: [
      'Balanced macronutrients',
      'Whole food focus',
      'Variety of cuisines',
      'Flexible portions',
      'Healthy fats included',
      'Antioxidant-rich foods'
    ],
    meals: {
      breakfast: [
        { name: 'Avocado Toast', calories: 380, protein: '16g', carbs: '42g', fat: '18g' },
        { name: 'Smoothie with Nuts', calories: 420, protein: '20g', carbs: '48g', fat: '20g' },
        { name: 'Eggs with Vegetables', calories: 360, protein: '24g', carbs: '18g', fat: '22g' }
      ],
      lunch: [
        { name: 'Mediterranean Salad', calories: 420, protein: '22g', carbs: '28g', fat: '26g' },
        { name: 'Soup and Sandwich', calories: 480, protein: '26g', carbs: '52g', fat: '20g' },
        { name: 'Buddha Bowl', calories: 440, protein: '24g', carbs: '48g', fat: '22g' }
      ],
      dinner: [
        { name: 'Grilled Fish with Quinoa', calories: 520, protein: '38g', carbs: '48g', fat: '24g' },
        { name: 'Vegetarian Pasta', calories: 480, protein: '22g', carbs: '58g', fat: '18g' },
        { name: 'Chicken with Vegetables', calories: 460, protein: '36g', carbs: '32g', fat: '26g' }
      ],
      snacks: [
        { name: 'Hummus with Veggies', calories: 180, protein: '8g', carbs: '22g', fat: '10g' },
        { name: 'Dark Chocolate', calories: 160, protein: '4g', carbs: '18g', fat: '12g' },
        { name: 'Mixed Berries', calories: 120, protein: '2g', carbs: '26g', fat: '2g' }
      ]
    }
  },
  {
    slug: 'keto',
    name: 'Keto Meal Plan',
    description: 'Achieve ketosis with this high-fat, low-carbohydrate meal plan designed for fat burning and mental clarity.',
    duration: '4 weeks',
    calories: '1,600-2,000',
    difficulty: 'Advanced',
    price: '$109',
    features: [
      'High healthy fats',
      'Low carbohydrates',
      'Moderate protein',
      'Keto-friendly foods',
      'Electrolyte guidance',
      'Transition support'
    ],
    meals: {
      breakfast: [
        { name: 'Keto Smoothie', calories: 420, protein: '18g', carbs: '8g', fat: '36g' },
        { name: 'Eggs with Avocado', calories: 480, protein: '24g', carbs: '6g', fat: '42g' },
        { name: 'Bacon and Cheese', calories: 520, protein: '28g', carbs: '4g', fat: '44g' }
      ],
      lunch: [
        { name: 'Caesar Salad', calories: 480, protein: '32g', carbs: '8g', fat: '38g' },
        { name: 'Bunless Burger', calories: 520, protein: '36g', carbs: '6g', fat: '42g' },
        { name: 'Tuna with Mayo', calories: 460, protein: '28g', carbs: '4g', fat: '38g' }
      ],
      dinner: [
        { name: 'Steak with Butter', calories: 580, protein: '42g', carbs: '6g', fat: '46g' },
        { name: 'Salmon with Avocado', calories: 520, protein: '38g', carbs: '8g', fat: '42g' },
        { name: 'Chicken with Cheese', calories: 480, protein: '32g', carbs: '4g', fat: '38g' }
      ],
      snacks: [
        { name: 'Macadamia Nuts', calories: 200, protein: '4g', carbs: '4g', fat: '20g' },
        { name: 'Cheese Cubes', calories: 160, protein: '12g', carbs: '2g', fat: '14g' },
        { name: 'Olives', calories: 120, protein: '2g', carbs: '4g', fat: '12g' }
      ]
    }
  }
]

function getMealPlanBySlug(slug: string) {
  return mealPlans.find(plan => plan.slug === slug)
}

export default function MealPlanPage({ params }: { params: { slug: string } }) {
  const mealPlan = getMealPlanBySlug(params.slug)
  
  if (!mealPlan) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {mealPlan.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {mealPlan.description}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-center">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-green-600">{mealPlan.duration}</div>
              <div className="text-gray-600">Duration</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-blue-600">{mealPlan.calories}</div>
              <div className="text-gray-600">Daily Calories</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-purple-600">{mealPlan.difficulty}</div>
              <div className="text-gray-600">Difficulty</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-green-600">{mealPlan.price}</div>
              <div className="text-gray-600">Price</div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What&apos;s Included</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mealPlan.features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-800 font-medium">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meal Breakdown */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Daily Meal Breakdown</h2>
          <div className="space-y-8">
            {Object.entries(mealPlan.meals).map(([mealType, meals]) => (
              <div key={mealType} className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 capitalize">
                  {mealType}
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {meals.map((meal, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">{meal.name}</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Calories:</span>
                          <span className="font-medium">{meal.calories}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Protein:</span>
                          <span className="font-medium">{meal.protein}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Carbs:</span>
                          <span className="font-medium">{meal.carbs}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fat:</span>
                          <span className="font-medium">{meal.fat}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Get instant access to your personalized meal plan, complete with recipes, 
            shopping lists, and nutritional guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Get Started - {mealPlan.price}
            </button>
            <button className="border border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 px-8 rounded-lg transition-colors">
              View Sample Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
