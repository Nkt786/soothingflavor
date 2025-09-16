'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ProductCard from '@/components/ProductCard'

// Product data type
type Product = {
  id: string
  name: string
  priceINR?: number
  veg: boolean
  categories: ("Bowls"|"Meal Boxes"|"Wraps"|"Sandwiches"|"Salads"|"Juices")[]
  description: string
  imageUrl?: string
}

// Seed catalog data
const products: Product[] = [
  // Non-Veg – Meal Box & Bowls
  {
    id: '1',
    name: 'Chicken Meal Box',
    priceINR: 249,
    veg: false,
    categories: ['Meal Boxes'],
    description: 'Protein-rich bowl with wholesome grains and seasonal veggies.',
  },
  {
    id: '2',
    name: 'Chicken Fried Rice Bowl',
    priceINR: 239,
    veg: false,
    categories: ['Bowls'],
    description: 'Protein-rich bowl with wholesome grains and seasonal veggies.',
  },
  {
    id: '3',
    name: 'Chicken Peri Peri Bowl',
    priceINR: 199,
    veg: false,
    categories: ['Bowls'],
    description: 'Protein-rich bowl with wholesome grains and seasonal veggies.',
  },
  {
    id: '4',
    name: 'Chicken Tandoori',
    priceINR: 229,
    veg: false,
    categories: ['Bowls'],
    description: 'Protein-rich bowl with wholesome grains and seasonal veggies.',
  },
  {
    id: '5',
    name: 'Shredded Chicken Salad',
    priceINR: 219,
    veg: false,
    categories: ['Salads'],
    description: 'Lean protein with crunchy veggies and light dressing.',
  },
  // Non-Veg – Wraps & Sandwich
  {
    id: '6',
    name: 'Tandoori Chicken Wrap',
    priceINR: 219,
    veg: false,
    categories: ['Wraps'],
    description: 'Grilled filling wrapped with fresh greens.',
  },
  {
    id: '7',
    name: 'Makhni Chicken Wrap',
    priceINR: 179,
    veg: false,
    categories: ['Wraps'],
    description: 'Grilled filling wrapped with fresh greens.',
  },
  {
    id: '8',
    name: 'Egg Bhurji Wrap',
    priceINR: 179,
    veg: false,
    categories: ['Wraps'],
    description: 'Grilled filling wrapped with fresh greens.',
  },
  {
    id: '9',
    name: 'Tandoori Chicken Sandwich',
    priceINR: 169,
    veg: false,
    categories: ['Sandwiches'],
    description: 'Grilled filling stacked with fresh greens.',
  },
  {
    id: '10',
    name: 'Egg Sandwich',
    priceINR: 169,
    veg: false,
    categories: ['Sandwiches'],
    description: 'Grilled filling stacked with fresh greens.',
  },
  {
    id: '11',
    name: 'Grilled Chicken Sandwich',
    priceINR: 149,
    veg: false,
    categories: ['Sandwiches'],
    description: 'Grilled filling stacked with fresh greens.',
  },
  // Veg – Sandwiches & Wraps
  {
    id: '12',
    name: 'Makhni Paneer Sandwich',
    priceINR: 179,
    veg: true,
    categories: ['Sandwiches'],
    description: 'Grilled filling stacked with fresh greens.',
  },
  {
    id: '13',
    name: 'Paneer Bhurji Wrap',
    priceINR: 179,
    veg: true,
    categories: ['Wraps'],
    description: 'Grilled filling wrapped with fresh greens.',
  },
  {
    id: '14',
    name: 'Tandoori Paneer Wrap',
    veg: true,
    categories: ['Wraps'],
    description: 'Grilled filling wrapped with fresh greens.',
  },
  {
    id: '15',
    name: 'Peanut Butter Sandwich (Flavoured)',
    veg: true,
    categories: ['Sandwiches'],
    description: 'Grilled filling stacked with fresh greens.',
  },
  {
    id: '16',
    name: 'Paneer Grilled Sandwich',
    veg: true,
    categories: ['Sandwiches'],
    description: 'Grilled filling stacked with fresh greens.',
  },
  {
    id: '17',
    name: 'Peanut Butter Banana Sandwich',
    veg: true,
    categories: ['Sandwiches'],
    description: 'Grilled filling stacked with fresh greens.',
  },
  // Veg – Meal Box & Bowls
  {
    id: '18',
    name: 'Paneer Makhni Bowl',
    priceINR: 249,
    veg: true,
    categories: ['Bowls'],
    description: 'Protein-rich bowl with wholesome grains and seasonal veggies.',
  },
  {
    id: '19',
    name: 'Veg Pasta Bowl',
    priceINR: 239,
    veg: true,
    categories: ['Bowls'],
    description: 'Protein-rich bowl with wholesome grains and seasonal veggies.',
  },
  {
    id: '20',
    name: 'Paneer Fried Rice Bowl',
    priceINR: 199,
    veg: true,
    categories: ['Bowls'],
    description: 'Protein-rich bowl with wholesome grains and seasonal veggies.',
  },
  {
    id: '21',
    name: 'Veg Meal Box',
    priceINR: 229,
    veg: true,
    categories: ['Meal Boxes'],
    description: 'Protein-rich bowl with wholesome grains and seasonal veggies.',
  },
  {
    id: '22',
    name: 'Rajma Rice Bowl',
    priceINR: 219,
    veg: true,
    categories: ['Bowls'],
    description: 'Protein-rich bowl with wholesome grains and seasonal veggies.',
  },
  {
    id: '23',
    name: 'Chole Rice Bowl',
    priceINR: 219,
    veg: true,
    categories: ['Bowls'],
    description: 'Protein-rich bowl with wholesome grains and seasonal veggies.',
  },
]

function ProductsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // State from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('cat') ? searchParams.get('cat')!.split(',') : []
  )
  const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'nonveg'>(
    (searchParams.get('veg') as 'all' | 'veg' | 'nonveg') || 'all'
  )

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (selectedCategories.length > 0) params.set('cat', selectedCategories.join(','))
    if (vegFilter !== 'all') params.set('veg', vegFilter)
    
    const newUrl = params.toString() ? `?${params.toString()}` : '/products'
    router.push(newUrl, { scroll: false })
  }, [searchQuery, selectedCategories, vegFilter, router])

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase()
        const matchesSearch = product.name.toLowerCase().includes(searchLower) ||
                            product.description.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // Veg filter
      if (vegFilter === 'veg' && !product.veg) return false
      if (vegFilter === 'nonveg' && product.veg) return false

      // Category filter
      if (selectedCategories.length > 0) {
        const hasMatchingCategory = product.categories.some(cat => 
          selectedCategories.includes(cat)
        )
        if (!hasMatchingCategory) return false
      }

      return true
    })
  }, [searchQuery, selectedCategories, vegFilter])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategories([])
    setVegFilter('all')
  }

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || vegFilter !== 'all'

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 relative">
      {/* Light green texture background */}
      <div className="absolute inset-0 bg-green-dots opacity-8"></div>
      <div className="absolute inset-0 bg-green-grid opacity-5"></div>
      <div className="absolute inset-0 bg-green-lines opacity-6"></div>
      
      {/* Compact Sticky Filter Bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-200 shadow-sm transition-all duration-300" id="filter-bar">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Desktop Filter Bar */}
          <div className="hidden md:flex items-center justify-between space-x-4">
            {/* Left: Item Count */}
            <div className="text-sm text-slate-500 font-medium">
              {filteredProducts.length} items
            </div>

            {/* Center: Search & Filters */}
            <div className="flex-1 flex items-center space-x-4 max-w-2xl">
                             {/* Search Input */}
               <div className="relative flex-1 max-w-md">
                 <input
                   type="text"
                   placeholder="Search meals..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   suppressHydrationWarning
                   className="w-full pl-5 pr-10 py-3 text-sm border border-slate-200 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 shadow-sm hover:shadow-md"
                 />
                 {searchQuery && (
                   <button
                     onClick={() => setSearchQuery('')}
                     suppressHydrationWarning
                     className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                   >
                     ×
                   </button>
                 )}
               </div>

                             {/* Diet Toggle */}
               <div className="flex space-x-2">
                 {[
                   { value: 'all', label: 'All', icon: '🍽️' },
                   { value: 'veg', label: 'Veg', icon: '🌱' },
                   { value: 'nonveg', label: 'Non-Veg', icon: '🍖' }
                 ].map((option) => (
                   <button
                     key={option.value}
                     onClick={() => setVegFilter(option.value as 'all' | 'veg' | 'nonveg')}
                     suppressHydrationWarning
                     className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${
                       vegFilter === option.value
                         ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                         : 'bg-white text-slate-600 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300'
                     }`}
                   >
                     <span className="mr-2">{option.icon}</span>
                     {option.label}
                   </button>
                 ))}
               </div>
            </div>

            {/* Right: Categories & Sort */}
            <div className="flex items-center space-x-4">
              {/* Categories Scroll */}
              <div className="flex items-center space-x-2 overflow-hidden">
                <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                  {['Bowls', 'Meal Boxes', 'Wraps', 'Sandwiches', 'Salads', 'Juices'].map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        if (selectedCategories.includes(category)) {
                          setSelectedCategories(selectedCategories.filter(c => c !== category))
                        } else {
                          setSelectedCategories([...selectedCategories, category])
                        }
                      }}
                      suppressHydrationWarning
                      className={`px-4 py-2 text-sm font-medium rounded-full border whitespace-nowrap transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${
                        selectedCategories.includes(category)
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                          : 'bg-white text-slate-600 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Dropdown */}
              <select suppressHydrationWarning className="px-4 py-2 text-sm border border-slate-200 rounded-full bg-white text-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm hover:shadow-md transition-all duration-200">
                <option value="popular">Popular</option>
                <option value="new">New</option>
                <option value="protein">High Protein</option>
                <option value="calories">Low Calories</option>
                <option value="price_asc">Price ↑</option>
                <option value="price_desc">Price ↓</option>
              </select>

              {/* Clear All Link */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  suppressHydrationWarning
                  className="px-4 py-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium bg-emerald-50 hover:bg-emerald-100 rounded-full transition-all duration-200"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filter Bar */}
          <div className="md:hidden space-y-3">
            {/* Row 1: Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search meals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                suppressHydrationWarning
                className="w-full pl-5 pr-10 py-3 text-sm border border-slate-200 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  suppressHydrationWarning
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                >
                  ×
                </button>
              )}
            </div>

            {/* Row 2: Diet Chips + Filters Button */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {[
                  { value: 'all', label: 'All', icon: '🍽️' },
                  { value: 'veg', label: 'Veg', icon: '🌱' },
                  { value: 'nonveg', label: 'Non-Veg', icon: '🍖' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setVegFilter(option.value as 'all' | 'veg' | 'nonveg')}
                    suppressHydrationWarning
                    className={`px-3 py-2 text-sm font-medium rounded-full border transition-all duration-200 shadow-sm ${
                      vegFilter === option.value
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-slate-600 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300'
                    }`}
                  >
                    <span className="mr-1">{option.icon}</span>
                    {option.label}
                  </button>
                ))}
              </div>

              <button suppressHydrationWarning className="px-4 py-2 text-sm font-medium text-emerald-600 border border-emerald-200 rounded-full hover:bg-emerald-50 shadow-sm transition-all duration-200">
                Filters
              </button>
            </div>

            {/* Mobile Categories Scroll */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex space-x-2 min-w-max">
                {['Bowls', 'Meal Boxes', 'Wraps', 'Sandwiches', 'Salads', 'Juices'].map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      if (selectedCategories.includes(category)) {
                        setSelectedCategories(selectedCategories.filter(c => c !== category))
                      } else {
                        setSelectedCategories([...selectedCategories, category])
                      }
                    }}
                    suppressHydrationWarning
                    className={`px-3 py-2 text-sm font-medium rounded-full border whitespace-nowrap transition-all duration-200 shadow-sm ${
                      selectedCategories.includes(category)
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-slate-600 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid Section */}
      <section className="py-8 relative">
        {/* Enhanced light green texture patterns */}
        <div className="absolute inset-0 bg-green-dots opacity-12"></div>
        <div className="absolute inset-0 bg-green-lines opacity-8"></div>
        
        {/* Subtle floating elements */}
        <div className="absolute top-12 left-12 w-32 h-32 bg-emerald-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-12 right-12 w-40 h-40 bg-teal-200/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-100/15 rounded-full blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
              Fresh & Fitness-Focused Meals
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Discover our curated collection of nutritious meals, carefully crafted for your health and fitness goals
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto mt-4 rounded-full"></div>
          </div>
          
          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <div className="text-4xl">🔍</div>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">No products found</h3>
              <p className="text-slate-600 mb-6 text-lg max-w-md mx-auto">
                Try adjusting your filters or search terms to discover more delicious meals
              </p>
              <button
                onClick={clearFilters}
                suppressHydrationWarning
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔄</div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
