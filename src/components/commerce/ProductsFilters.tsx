'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { X } from 'lucide-react'

export function ProductsFilters() {
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 1000] as [number, number],
    rating: [] as number[],
    availability: [] as string[]
  })

  const categories = [
    { id: 'vegan-sweets', label: 'Vegan Sweets' },
    { id: 'low-cal-sauces', label: 'Low-Cal Sauces' },
    { id: 'nut-butters', label: 'Nut Butters' },
    { id: 'fresh-bakes', label: 'Fresh Bakes' },
    { id: 'superfoods', label: 'Superfoods' },
    { id: 'protein-products', label: 'Protein Products' }
  ]

  const ratings = [
    { value: 4, label: '4★ & above' },
    { value: 3, label: '3★ & above' },
    { value: 2, label: '2★ & above' }
  ]

  const availability = [
    { id: 'in-stock', label: 'In Stock' },
    { id: 'on-sale', label: 'On Sale' },
    { id: 'new-arrivals', label: 'New Arrivals' }
  ]

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      categories: checked
        ? [...prev.categories, categoryId]
        : prev.categories.filter(id => id !== categoryId)
    }))
  }

  const handleRatingChange = (rating: number, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      rating: checked
        ? [...prev.rating, rating]
        : prev.rating.filter(r => r !== rating)
    }))
  }

  const handleAvailabilityChange = (availabilityId: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      availability: checked
        ? [...prev.availability, availabilityId]
        : prev.availability.filter(id => id !== availabilityId)
    }))
  }

  const handlePriceRangeChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: value as [number, number]
    }))
  }

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 1000],
      rating: [],
      availability: []
    })
  }

  const hasActiveFilters = 
    filters.categories.length > 0 ||
    filters.rating.length > 0 ||
    filters.availability.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 1000

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
              {filters.categories.map(categoryId => {
                const category = categories.find(c => c.id === categoryId)
                return (
                  <span
                    key={`category-${categoryId}`}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {category?.label}
                    <button
                      onClick={() => handleCategoryChange(categoryId, false)}
                      className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )
              })}
              {filters.rating.map(rating => (
                <span
                  key={`rating-${rating}`}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {rating}★ & above
                  <button
                    onClick={() => handleRatingChange(rating, false)}
                    className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {filters.availability.map(availabilityId => {
                const availabilityItem = availability.find(a => a.id === availabilityId)
                return (
                  <span
                    key={`availability-${availabilityId}`}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                  >
                    {availabilityItem?.label}
                    <button
                      onClick={() => handleAvailabilityChange(availabilityId, false)}
                      className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )
              })}
              {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, priceRange: [0, 1000] }))}
                    className="ml-1 hover:bg-orange-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={filters.categories.includes(category.id)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category.id, checked as boolean)
                }
              />
              <Label htmlFor={category.id} className="text-sm font-medium">
                {category.label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={handlePriceRangeChange}
            max={1000}
            min={0}
            step={50}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>₹{filters.priceRange[0]}</span>
            <span>₹{filters.priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {ratings.map((rating) => (
            <div key={rating.value} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating.value}`}
                checked={filters.rating.includes(rating.value)}
                onCheckedChange={(checked) =>
                  handleRatingChange(rating.value, checked as boolean)
                }
              />
              <Label htmlFor={`rating-${rating.value}`} className="text-sm font-medium">
                {rating.label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Availability Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Availability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {availability.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                id={item.id}
                checked={filters.availability.includes(item.id)}
                onCheckedChange={(checked) =>
                  handleAvailabilityChange(item.id, checked as boolean)
                }
              />
              <Label htmlFor={item.id} className="text-sm font-medium">
                {item.label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
