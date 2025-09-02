import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const mealPlan = getMealPlanBySlug(slug)
  
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
    slug: 'deluxe-meal',
    name: 'Deluxe Meal Plan',
    description: 'Premium lunch and dinner plan with freshly cooked, portion-controlled, macro-balanced meals using premium ingredients.',
    duration: 'Monthly',
    calories: '1,800-2,200',
    difficulty: 'All Levels',
    price: '₹12,499',
    features: [
      'Freshly cooked meals',
      'Portion-controlled servings',
      'Macro-balanced nutrition',
      'Premium ingredients',
      'Lunch and dinner included',
      'Flexible delivery timing'
    ],
    meals: {
      lunch: [
        { name: 'Grilled Chicken with Quinoa', calories: 450, protein: '35g', carbs: '45g', fat: '18g' },
        { name: 'Salmon with Brown Rice', calories: 480, protein: '38g', carbs: '42g', fat: '22g' },
        { name: 'Vegetarian Buddha Bowl', calories: 420, protein: '22g', carbs: '48g', fat: '16g' }
      ],
      dinner: [
        { name: 'Lean Beef Stir-Fry', calories: 460, protein: '42g', carbs: '38g', fat: '20g' },
        { name: 'Grilled Fish with Vegetables', calories: 440, protein: '36g', carbs: '32g', fat: '24g' },
        { name: 'Chicken Curry with Rice', calories: 480, protein: '38g', carbs: '45g', fat: '18g' }
      ]
    }
  },
  {
    slug: 'regular-meal',
    name: 'Regular Meal Plan',
    description: 'Flexible meal plan offering lunch or dinner with freshly cooked, portion-controlled, macro-balanced meals.',
    duration: 'Monthly',
    calories: '1,500-1,800',
    difficulty: 'All Levels',
    price: '₹5,499',
    features: [
      'Freshly cooked meals',
      'Portion-controlled servings',
      'Macro-balanced nutrition',
      'Flexible timing',
      'Lunch or dinner choice',
      'Cost-effective option'
    ],
    meals: {
      lunch: [
        { name: 'Chicken Salad Wrap', calories: 380, protein: '28g', carbs: '35g', fat: '16g' },
        { name: 'Vegetable Pasta', calories: 420, protein: '18g', carbs: '52g', fat: '14g' },
        { name: 'Rice and Dal Bowl', calories: 400, protein: '24g', carbs: '48g', fat: '12g' }
      ],
      dinner: [
        { name: 'Grilled Chicken with Rice', calories: 440, protein: '32g', carbs: '42g', fat: '18g' },
        { name: 'Fish Curry with Roti', calories: 420, protein: '26g', carbs: '38g', fat: '20g' },
        { name: 'Vegetable Biryani', calories: 460, protein: '22g', carbs: '58g', fat: '16g' }
      ]
    }
  },
  {
    slug: 'all-day-salad-juice',
    name: 'All Day Salad & Juice Plan',
    description: 'Nutrient-rich vegetable and fruit salads with fresh juices, perfect for detox and healthy living.',
    duration: 'Monthly',
    calories: '800-1,200',
    difficulty: 'Beginner',
    price: '₹4,499',
    features: [
      'Freshly prepared salads',
      'Portion-controlled servings',
      'Nutrient-rich ingredients',
      'Detox friendly',
      'Fresh fruit juices',
      'Light and healthy'
    ],
    meals: {
      breakfast: [
        { name: 'Green Smoothie Bowl', calories: 280, protein: '12g', carbs: '38g', fat: '8g' },
        { name: 'Fruit Salad with Yogurt', calories: 240, protein: '8g', carbs: '42g', fat: '6g' },
        { name: 'Vegetable Juice Blend', calories: 180, protein: '6g', carbs: '32g', fat: '4g' }
      ],
      lunch: [
        { name: 'Mixed Green Salad', calories: 320, protein: '16g', carbs: '28g', fat: '18g' },
        { name: 'Quinoa Vegetable Bowl', calories: 360, protein: '18g', carbs: '42g', fat: '14g' },
        { name: 'Fruit and Nut Salad', calories: 340, protein: '12g', carbs: '38g', fat: '16g' }
      ],
      dinner: [
        { name: 'Light Vegetable Soup', calories: 280, protein: '14g', carbs: '32g', fat: '12g' },
        { name: 'Fresh Fruit Platter', calories: 260, protein: '8g', carbs: '45g', fat: '6g' },
        { name: 'Green Juice Cleanse', calories: 220, protein: '6g', carbs: '38g', fat: '4g' }
      ],
      snacks: [
        { name: 'Fresh Fruit Juice', calories: 160, protein: '4g', carbs: '28g', fat: '2g' },
        { name: 'Vegetable Sticks', calories: 120, protein: '6g', carbs: '18g', fat: '4g' },
        { name: 'Mixed Berries', calories: 140, protein: '4g', carbs: '24g', fat: '2g' }
      ]
    }
  }
]

function getMealPlanBySlug(slug: string) {
  return mealPlans.find(plan => plan.slug === slug)
}

export default async function MealPlanPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const mealPlan = getMealPlanBySlug(slug)
  
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
