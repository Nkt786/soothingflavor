'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store/cart'

interface ProductCardProps {
  id: string
  name: string
  priceINR?: number
  veg: boolean
  categories: string[]
  description: string
  imageUrl?: string
}

export default function ProductCard({ id, name, priceINR, veg, categories, description, imageUrl }: ProductCardProps) {
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    if (priceINR) {
      addItem({
        id,
        name,
        price: priceINR,
        quantity: 1,
        type: 'product',
        image: imageUrl,
        veg: veg,
      })
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200 min-h-full flex flex-col">
      {/* Image Container */}
      <div className="aspect-[4/3] bg-gray-100 rounded-xl flex items-center justify-center mb-6 overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">📷</div>
            <div className="text-sm">Add image</div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Title and Badges */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">{name}</h3>
          <div className="flex flex-col items-end space-y-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              veg 
                ? 'bg-green-100 text-green-800' 
                : 'bg-orange-100 text-orange-800'
            }`}>
              <span className={`w-2 h-2 rounded-full mr-2 ${
                veg ? 'bg-green-500' : 'bg-orange-500'
              }`}></span>
              {veg ? 'Veg' : 'Non-Veg'}
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((category, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{description}</p>

        {/* Price */}
        <div className="mb-4">
          {priceINR ? (
            <div className="text-2xl font-bold text-green-600">
              ₹{priceINR}
            </div>
          ) : (
            <div className="text-lg font-semibold text-orange-600">
              Ask for price
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3 mt-auto">
          <Button 
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            onClick={handleAddToCart}
            disabled={!priceINR}
          >
            {priceINR ? 'Add to Cart' : 'Ask for Price'}
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full border-2 border-green-600 bg-white hover:bg-gray-50 text-green-600"
          >
            <Link href="https://wa.me/917709811319?text=I want to order: {name}">
              WhatsApp Order
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
