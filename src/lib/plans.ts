export interface MealPlan {
  id: string
  name: string
  price: number
  description: string
  meals: string[]
  features: string[]
}

export const MEAL_PLANS: Record<string, MealPlan> = {
  deluxe: {
    id: 'deluxe',
    name: 'Deluxe Meal',
    price: 12499,
    description: 'Lunch and Dinner',
    meals: ['Lunch', 'Dinner'],
    features: ['Freshly cooked', 'Portion-controlled', 'Macro-balanced']
  },
  regular: {
    id: 'regular',
    name: 'Regular Meal',
    price: 5499,
    description: 'Lunch or Dinner',
    meals: ['Lunch', 'Dinner'],
    features: ['Freshly cooked', 'Portion-controlled', 'Macro-balanced']
  },
  'salad-juice': {
    id: 'salad-juice',
    name: 'All Day Salad & Juice',
    price: 4499,
    description: 'Vegetable & Fruit Salad + Juices',
    meals: ['All Day'],
    features: ['Freshly prepared', 'Portion-controlled', 'Nutrient-rich']
  }
}

export const DELIVERY_CHARGE_PER_KM = 10

export const DELIVERY_SLOTS = {
  lunch: { name: 'Lunch', time: '12:00 PM - 2:00 PM' },
  dinner: { name: 'Dinner', time: '7:00 PM - 9:00 PM' }
}

export const DAYS_OF_WEEK = [
  { id: 'monday', name: 'Mon', short: 'M' },
  { id: 'tuesday', name: 'Tue', short: 'Tu' },
  { id: 'wednesday', name: 'Wed', short: 'W' },
  { id: 'thursday', name: 'Thu', short: 'Th' },
  { id: 'friday', name: 'Fri', short: 'F' },
  { id: 'saturday', name: 'Sat', short: 'Sa' },
  { id: 'sunday', name: 'Sun', short: 'Su' }
]

export const SPICE_LEVELS = ['Mild', 'Medium', 'Hot']
export const PROTEIN_OPTIONS = ['Paneer', 'Chicken', 'Egg', 'None']
export const CALORIE_FOCUS = ['Weight Loss', 'Maintain', 'Muscle Gain']
