'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Phone } from 'lucide-react'
import { useState, useEffect } from 'react'
// import { useCartStore } from '@/lib/store/cart' // Removed - no longer needed
import { useCart } from '@/context/CartContext'
import dynamic from 'next/dynamic'

const CartCountBadge = dynamic(() => import('@/components/cart/CartCountBadge'), { ssr: false })

export default function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  // const { getItemCount } = useCartStore() // Removed - now using CartCountBadge component
  const { openCart } = useCart()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Meal Plans', href: '/meal-plans' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Announcement Bar */}
      <div className="sticky top-0 z-50 bg-emerald-600 text-white text-xs sm:text-sm py-2 text-center">
        <span>Free delivery today in Nagpur • Fresh & customizable meals</span>
      </div>

      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-50 focus:bg-emerald-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:text-sm"
      >
        Skip to content
      </a>

      {/* Main Header */}
      <header 
        className={`sticky top-8 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'shadow-lg shadow-black/5' 
            : ''
        }`}
      >
        <div className="bg-white/65 backdrop-blur-md border-b border-black/5">
          {/* Desktop Layout */}
          <div className="hidden md:block">
            <div className="max-w-7xl mx-auto px-4 h-18">
              <div className="flex items-center justify-between h-full">
                {/* Logo Section - Left */}
                <div className="flex-shrink-0">
                  <Link href="/" className="flex items-center space-x-3 group">
                    <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                      <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-slate-700 group-hover:text-emerald-600 transition-colors duration-300">
                        Soothing Flavor
                      </span>
                      <span className="text-xs text-emerald-600 font-medium tracking-wide">
                        Healthy Meals Delivered
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Navigation - Center (Desktop) */}
                <nav className="flex items-center space-x-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group ${
                          isActive
                            ? 'text-slate-800'
                            : 'text-slate-600 hover:text-slate-800 hover:bg-emerald-50'
                        }`}
                      >
                        {item.name}
                        {/* Active gradient underline */}
                        {isActive && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full"></div>
                        )}
                      </Link>
                    )
                  })}
                </nav>

                {/* Actions - Right */}
                <div className="flex items-center space-x-4">
                  {/* Phone */}
                  <Link
                    href="tel:7709811319"
                    className="flex items-center space-x-2 text-slate-600 hover:text-emerald-600 transition-colors duration-300 group"
                  >
                    <Phone className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-medium">7709811319</span>
                  </Link>

                  {/* Cart */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={openCart}
                    className="relative text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300 group"
                  >
                    <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <CartCountBadge />
                  </Button>

                  {/* Order Now Button */}
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
                    Order Now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout - All Options Visible */}
          <div className="md:hidden">
            {/* Top Row: Logo + Actions */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 group">
                  <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-slate-700 group-hover:text-emerald-600 transition-colors duration-300">
                      Soothing Flavor
                    </span>
                    <span className="text-xs text-emerald-600 font-medium tracking-wide">
                      Healthy Meals
                    </span>
                  </div>
                </Link>

                {/* Mobile Actions */}
                <div className="flex items-center space-x-2">
                  {/* Mobile Cart */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={openCart}
                    className="relative text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300 p-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <CartCountBadge />
                  </Button>

                  {/* Mobile Order Now Button */}
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-full text-sm shadow-sm hover:shadow-md transition-all duration-300">
                    Order
                  </Button>
                </div>
              </div>
            </div>

            {/* Bottom Row: Navigation */}
            <div className="px-4 py-3">
              <nav className="flex items-center justify-between">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex-1 text-center px-2 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? 'text-white bg-emerald-600 shadow-md'
                          : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>

      </header>
    </>
  )
}
