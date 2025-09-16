'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export function MealPlansFilters() {
  const [filters, setFilters] = useState({
    goals: [] as string[],
    calories: [] as string[],
    dietary: [] as string[]
  })

  const goals = [
    { id: 'weight-loss', label: 'Weight Loss' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'muscle-gain', label: 'Muscle Gain' },
    { id: 'energy-boost', label: 'Energy Boost' }
  ]

  const calories = [
    { id: '1200-1500', label: '1200-1500 cal' },
    { id: '1500-2000', label: '1500-2000 cal' },
    { id: '2000-2500', label: '2000-2500 cal' },
    { id: '2500+', label: '2500+ cal' }
  ]

  const dietary = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'non-vegetarian', label: 'Non-Vegetarian' },
    { id: 'keto', label: 'Keto' },
    { id: 'low-carb', label: 'Low Carb' }
  ]

  const handleFilterChange = (category: keyof typeof filters, value: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      [category]: checked
        ? [...prev[category], value]
        : prev[category].filter(item => item !== value)
    }))
  }

  const clearFilters = () => {
    setFilters({
      goals: [],
      calories: [],
      dietary: []
    })
  }

  const hasActiveFilters = Object.values(filters).some(category => category.length > 0)

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {hasActiveFilters && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Active Filters</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(([category, values]) =>
                values.map(value => (
                  <span
                    key={`${category}-${value}`}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {value}
                    <button
                      onClick={() => handleFilterChange(category as keyof typeof filters, value, false)}
                      className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Goals Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Goals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {goals.map((goal) => (
            <div key={goal.id} className="flex items-center space-x-2">
              <Checkbox
                id={goal.id}
                checked={filters.goals.includes(goal.id)}
                onCheckedChange={(checked) =>
                  handleFilterChange('goals', goal.id, checked as boolean)
                }
              />
              <Label htmlFor={goal.id} className="text-sm font-medium">
                {goal.label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Calories Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Calories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {calories.map((calorie) => (
            <div key={calorie.id} className="flex items-center space-x-2">
              <Checkbox
                id={calorie.id}
                checked={filters.calories.includes(calorie.id)}
                onCheckedChange={(checked) =>
                  handleFilterChange('calories', calorie.id, checked as boolean)
                }
              />
              <Label htmlFor={calorie.id} className="text-sm font-medium">
                {calorie.label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Dietary Preferences Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dietary Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {dietary.map((diet) => (
            <div key={diet.id} className="flex items-center space-x-2">
              <Checkbox
                id={diet.id}
                checked={filters.dietary.includes(diet.id)}
                onCheckedChange={(checked) =>
                  handleFilterChange('dietary', diet.id, checked as boolean)
                }
              />
              <Label htmlFor={diet.id} className="text-sm font-medium">
                {diet.label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sort Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sort By</CardTitle>
        </CardHeader>
        <CardContent>
          <select suppressHydrationWarning className="w-full p-2 border border-gray-300 rounded-md text-sm">
            <option value="popularity">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="calories">Calories</option>
          </select>
        </CardContent>
      </Card>
    </div>
  )
}
