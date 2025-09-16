'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Star } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/lib/store/cart'
import { useToast } from '@/components/ui/toast'
import { useState, useMemo } from 'react'

// Mock data - replace with actual API call
const products = [
  {
    id: 'almond-butter',
    slug: 'almond-butter',
    name: 'Premium Almond Butter',
    description: 'Smooth and creamy almond butter made from premium California almonds',
    images: ['/images/placeholder.svg'],
    price: 299.00,
    salePrice: 249.00,
    category: 'Nut Butters',
    stock: 50,
    rating: 4.8,
    reviewCount: 127
  },
  {
    id: 'vegan-chocolate-chip-cookies',
    slug: 'vegan-chocolate-chip-cookies',
    name: 'Vegan Chocolate Chip Cookies',
    description: 'Delicious plant-based cookies with dark chocolate chips',
    images: ['/images/placeholder.svg'],
    price: 199.00,
    category: 'Vegan Sweets',
    stock: 100,
    rating: 4.6,
    reviewCount: 89
  },
  {
    id: 'low-cal-pesto-sauce',
    slug: 'low-cal-pesto-sauce',
    name: 'Low-Cal Pesto Sauce',
    description: 'Flavorful pesto sauce with reduced calories and maximum taste',
    images: ['/images/placeholder.svg'],
    price: 149.00,
    category: 'Low-Cal Sauces',
    stock: 75,
    rating: 4.7,
    reviewCount: 156
  },
  {
    id: 'protein-bars',
    slug: 'protein-bars',
    name: 'High Protein Energy Bars',
    description: 'Nutritious protein bars perfect for pre or post workout',
    images: ['/images/placeholder.svg'],
    price: 399.00,
    salePrice: 349.00,
    category: 'Fresh Bakes',
    stock: 60,
    rating: 4.5,
    reviewCount: 203
  },
  {
    id: 'chia-seeds',
    slug: 'chia-seeds',
    name: 'Organic Chia Seeds',
    description: 'Premium organic chia seeds rich in omega-3 and fiber',
    images: ['/images/placeholder.svg'],
    price: 179.00,
    category: 'Nut Butters',
    stock: 200,
    rating: 4.9,
    reviewCount: 312
  },
  {
    id: 'quinoa-mix',
    slug: 'quinoa-mix',
    name: 'Ancient Grains Quinoa Mix',
    description: 'Nutritious blend of quinoa, amaranth, and millet',
    images: ['/images/placeholder.svg'],
    price: 229.00,
    category: 'Fresh Bakes',
    stock: 80,
    rating: 4.4,
    reviewCount: 67
  }
]

export function ProductsList() {
  const addToCart = useCartStore((state) => state.addItem)
  const { addToast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleAddToCart = (product: { 
    id: string; 
    name: string; 
    price: number; 
    salePrice?: number;
    images: string[];
    slug?: string;
    veg?: boolean;
  }) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      quantity: 1,
      image: product.images[0],
      slug: product.slug,
      veg: product.veg,
      type: 'product' as const
    })
    
    addToast({
      type: 'success',
      title: 'Added to Cart!',
      message: `${product.name} has been added to your cart.`,
      duration: 3000
    })
  }

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))]
    return ['all', ...uniqueCategories]
  }, [])

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select suppressHydrationWarning className="text-sm border border-gray-300 rounded-md px-2 py-1">
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
            </select>
        </div>
      </div>

                    {/* Products Grid */}
       {filteredProducts.length === 0 ? (
         <div className="text-center py-12">
           <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
             <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
           </div>
           <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
           <p className="text-gray-600 mb-4">
             Try adjusting your search terms or category filter
           </p>
           <button
             onClick={() => {
               setSearchTerm('')
               setSelectedCategory('all')
             }}
             className="text-green-600 hover:text-green-700 font-medium"
           >
             Clear filters
           </button>
         </div>
       ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredProducts.map((product) => (
             <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                         <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
               {product.images[0] ? (
                 <Image
                   src={product.images[0]}
                   alt={product.name}
                   className="w-full h-full object-cover"
                   width={400}
                   height={400}
                 />
               ) : (
                 <div className="text-center text-gray-500">
                   <p>Image coming soon</p>
                 </div>
               )}
             </div>
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1 line-clamp-2">{product.name}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {product.description}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="ml-2 flex-shrink-0">
                  {product.category}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2">
                {product.salePrice ? (
                  <>
                    <span className="text-2xl font-bold text-green-600">
                      {formatPrice(product.salePrice)}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <Badge variant="destructive" className="text-xs">
                      {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                    </Badge>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-green-600">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="text-sm text-gray-600">
                {product.stock > 0 ? (
                  <span className="text-green-600">In Stock ({product.stock} available)</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  asChild
                >
                  <Link href={`/products/${product.slug}`}>
                    View Details
                  </Link>
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
       )}

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 pt-8">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <Button variant="outline" size="sm" className="bg-green-600 text-white hover:bg-green-700">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  )
}
