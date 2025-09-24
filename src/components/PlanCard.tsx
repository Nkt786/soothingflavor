import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface PlanCardProps {
  title: string
  price: number
  description: string
  features: string[]
  isVeg: boolean
  image?: string
  duration?: 'weekly' | 'monthly'
  savings?: string | number
}

export default function PlanCard({ title, price, description, features, isVeg, image, duration = 'monthly', savings }: PlanCardProps) {
  // Convert title to plan ID for routing
  const getPlanId = (title: string) => {
    if (title.includes('Deluxe')) return 'deluxe'
    if (title.includes('Regular')) return 'regular'
    if (title.includes('Salad') || title.includes('Juice')) return 'salad-juice'
    return 'deluxe' // fallback
  }

  const planId = getPlanId(title)

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-200 group hover:border-emerald-300 hover:-translate-y-1 overflow-hidden">
      {/* Image Placeholder - Mobile optimized */}
      <div className="w-full h-32 md:h-36 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-t-2xl md:rounded-t-3xl flex items-center justify-center group-hover:from-emerald-200 group-hover:to-teal-200 transition-all duration-300">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover rounded-t-2xl md:rounded-t-3xl" />
        ) : (
          <div className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300">🍽️</div>
        )}
      </div>

      {/* Content - Mobile optimized */}
      <div className="space-y-2 md:space-y-3 p-3 md:p-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <h3 className="text-base md:text-lg font-bold text-slate-800 flex-1 pr-2">{title}</h3>
          <div className="flex flex-col space-y-1 flex-shrink-0">
            <span className={`inline-flex items-center px-2 md:px-2.5 py-0.5 rounded-full text-xs font-bold ${
              duration === 'weekly' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-orange-100 text-orange-800'
            }`}>
              {duration === 'weekly' ? 'Weekly' : 'Monthly'}
            </span>
            <span className={`inline-flex items-center px-2 md:px-2.5 py-0.5 rounded-full text-xs font-bold ${
              isVeg 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {isVeg ? '🥬 Veg' : '🍗 Non-Veg'}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="text-xl md:text-2xl font-bold text-emerald-600">
          ₹{price.toLocaleString()}
          <span className="text-sm md:text-base font-normal text-slate-500"> / {duration === 'weekly' ? 'week' : 'month'}</span>
        </div>

        {/* Savings Badge */}
        {savings && (
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-2 md:px-2.5 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium border border-emerald-200">
            <span>💰</span>
            <span className="text-xs">
              {typeof savings === 'number' 
                ? `Save ₹${savings.toLocaleString()} monthly` 
                : savings
              }
            </span>
          </div>
        )}

        {/* Description */}
        <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{description}</p>

        {/* Features - Mobile optimized */}
        <ul className="space-y-1.5 md:space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></div>
              <span className="text-xs text-slate-700 leading-tight">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Action Buttons - Mobile optimized */}
        <div className="space-y-2 pt-2">
          <Link href={`/subscribe/${planId}`}>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 md:py-2.5 h-9 md:h-10 rounded-xl md:rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 text-sm flex items-center justify-center">
              <span className="mr-2">🚀</span>
              Subscribe Now
            </Button>
          </Link>
          <Button asChild variant="outline" className="w-full border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-800 py-2 md:py-2.5 h-9 md:h-10 rounded-xl md:rounded-2xl font-medium transition-all duration-300 text-sm flex items-center justify-center">
            <Link href="https://wa.me/917709811319?text=Hi, I have questions about your meal plans">
              <span className="mr-2">💬</span>
              Get Custom Quote
            </Link>
          </Button>
        </div>

        {/* Footnote */}
        <p className="text-xs text-slate-500 text-center pt-1">Custom meals available • Free delivery above ₹500</p>
      </div>
    </div>
  )
}
