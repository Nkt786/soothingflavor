'use client'

import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProductFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
  vegFilter: 'all' | 'veg' | 'nonveg'
  setVegFilter: (filter: 'all' | 'veg' | 'nonveg') => void
  onClearFilters: () => void
}

const allCategories = ['Bowls', 'Meal Boxes', 'Wraps', 'Sandwiches', 'Salads', 'Juices']

export default function ProductFilters({
  searchQuery,
  setSearchQuery,
  selectedCategories,
  setSelectedCategories,
  vegFilter,
  setVegFilter,
  onClearFilters
}: ProductFiltersProps) {
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery)

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(debouncedSearch)
    }, 300)

    return () => clearTimeout(timer)
  }, [debouncedSearch, setSearchQuery])

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || vegFilter !== 'all'

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 mb-8 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Search Bar */}
      <div className="mb-8 relative z-10">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Find Your Perfect Meal</h3>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={debouncedSearch}
            onChange={(e) => setDebouncedSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-emerald-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Veg/Non-Veg Toggle */}
      <div className="mb-8 relative z-10">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Dietary Preference</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { value: 'all', label: 'All', icon: '🍽️' },
            { value: 'veg', label: 'Veg', icon: '🌱' },
            { value: 'nonveg', label: 'Non-Veg', icon: '🍖' }
          ].map((option) => (
            <Button
              key={option.value}
              variant={vegFilter === option.value ? 'default' : 'outline'}
              size="lg"
              onClick={() => setVegFilter(option.value as 'all' | 'veg' | 'nonveg')}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                vegFilter === option.value 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-1' 
                  : 'bg-white hover:bg-emerald-50 text-slate-700 border-2 border-emerald-200 hover:border-emerald-300 hover:text-emerald-700'
              }`}
            >
              <span className="mr-2">{option.icon}</span>
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Category Chips */}
      <div className="mb-6 relative z-10">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Categories</h3>
        <div className="flex flex-wrap gap-3">
          {allCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategories.includes(category) ? 'default' : 'outline'}
              size="lg"
              onClick={() => toggleCategory(category)}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                selectedCategories.includes(category)
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-1'
                  : 'bg-white hover:bg-emerald-50 text-slate-700 border-2 border-emerald-200 hover:border-emerald-300 hover:text-emerald-700'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="pt-6 border-t border-slate-200 relative z-10">
          <Button
            variant="outline"
            size="lg"
            onClick={onClearFilters}
            className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200 hover:border-slate-300 rounded-2xl font-medium transition-all duration-300 hover:-translate-y-1"
          >
            <X className="w-4 h-4 mr-2" />
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  )
}
