'use client'

import { Leaf, Apple, Carrot, Wheat, Droplets } from 'lucide-react'

export default function AnimatedFoodBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating food-themed shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-sf-green/10 rounded-full animate-float-slow blur-sm"></div>
      <div className="absolute top-20 right-20 w-24 h-24 bg-sf-teal/15 rounded-full animate-float-medium blur-sm"></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-sf-mint/20 rounded-full animate-float-fast blur-sm"></div>
      <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-sf-orange/10 rounded-full animate-float-slow blur-sm"></div>
      
      {/* Food-themed colored circles */}
      <div className="absolute top-1/2 left-1/6 w-28 h-28 bg-gradient-to-br from-sf-green/15 to-sf-teal/10 rounded-full animate-food-pulse blur-sm"></div>
      <div className="absolute bottom-1/3 right-1/6 w-24 h-24 bg-gradient-to-br from-sf-orange/15 to-sf-green/10 rounded-full animate-food-float blur-sm" style={{animationDelay: '2s', animationDuration: '25s'}}></div>
      <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-sf-teal/20 to-sf-mint/15 rounded-full animate-float-medium blur-sm" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-gradient-to-br from-sf-green/10 to-sf-orange/10 rounded-full animate-float-slow blur-sm" style={{animationDelay: '3s'}}></div>
      
      {/* Additional floating elements */}
      <div className="absolute top-3/4 left-1/5 w-16 h-16 bg-sf-mint/25 rounded-full animate-float-fast blur-sm" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute top-1/6 right-1/5 w-12 h-12 bg-sf-green/20 rounded-full animate-food-pulse blur-sm" style={{animationDelay: '1.5s'}}></div>
      <div className="absolute bottom-1/6 left-1/2 w-20 h-20 bg-sf-teal/15 rounded-full animate-float-medium blur-sm" style={{animationDelay: '2.5s'}}></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/3 w-40 h-40 bg-gradient-to-br from-sf-green/5 to-sf-teal/5 rounded-full animate-pulse-slow blur-xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-gradient-to-br from-sf-mint/5 to-sf-green/5 rounded-full animate-pulse-medium blur-xl"></div>
      
      {/* Food-themed geometric shapes */}
      <div className="absolute top-1/3 left-1/8 w-8 h-8 bg-sf-orange/20 rotate-45 animate-float-fast blur-sm"></div>
      <div className="absolute bottom-1/3 right-1/8 w-6 h-6 bg-sf-green/25 rotate-45 animate-food-pulse blur-sm" style={{animationDelay: '1s'}}></div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-sf-green/20 via-sf-teal/15 to-sf-mint/10 animate-gradient-shift"></div>
      </div>
      
      {/* Additional animated elements for more visual interest */}
      <div className="absolute top-1/2 right-1/3 w-14 h-14 bg-gradient-to-br from-sf-green/10 to-sf-teal/10 rounded-full animate-float-slow blur-sm" style={{animationDelay: '4s'}}></div>
      <div className="absolute bottom-1/2 left-1/4 w-18 h-18 bg-gradient-to-br from-sf-mint/15 to-sf-green/10 rounded-full animate-food-pulse blur-sm" style={{animationDelay: '0.8s'}}></div>
      
      {/* Food-themed icons */}
      <div className="absolute top-1/5 left-1/10 text-sf-green/20 animate-float-slow" style={{animationDelay: '0.5s'}}>
        <Leaf className="w-8 h-8" />
      </div>
      <div className="absolute top-2/3 right-1/10 text-sf-orange/20 animate-food-pulse" style={{animationDelay: '1.5s'}}>
        <Apple className="w-6 h-6" />
      </div>
      <div className="absolute bottom-1/4 left-1/6 text-sf-teal/20 animate-float-medium" style={{animationDelay: '2s'}}>
        <Carrot className="w-7 h-7" />
      </div>
      <div className="absolute top-1/3 right-1/6 text-sf-green/15 animate-float-fast" style={{animationDelay: '0.8s'}}>
        <Wheat className="w-5 h-5" />
      </div>
      <div className="absolute bottom-1/3 right-1/4 text-sf-mint/25 animate-food-pulse" style={{animationDelay: '3s'}}>
        <Droplets className="w-6 h-6" />
      </div>
    </div>
  )
}
