'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Menu, X, Phone, MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
// import { useCartStore } from '@/lib/store/cart' // Removed - no longer needed
import { useCart } from '@/context/CartContext'
import dynamic from 'next/dynamic'

const CartCountBadge = dynamic(() => import('@/components/cart/CartCountBadge'), { ssr: false })

export default function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
            ? 'h-16 shadow-lg shadow-black/5' 
            : 'h-18'
        }`}
      >
        <div className="h-full bg-white/65 backdrop-blur-md border-b border-black/5">
          <div className="max-w-7xl mx-auto px-4 h-full">
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

              {/* Navigation - Center */}
              <nav className="hidden md:flex items-center space-x-1">
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
              <div className="hidden md:flex items-center space-x-4">
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

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center space-x-3">
                {/* Mobile Cart */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={openCart}
                  className="relative text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <CartCountBadge />
                </Button>

                {/* Hamburger */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Sheet Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Bottom Sheet */}
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom-full duration-300">
              <div className="p-6 space-y-6">
                {/* Handle */}
                <div className="flex justify-center">
                  <div className="w-12 h-1 bg-slate-300 rounded-full"></div>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-2">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={`block px-4 py-3 rounded-2xl text-base font-medium transition-all duration-300 ${
                          isActive
                            ? 'text-emerald-600 bg-emerald-50 border-l-4 border-emerald-600'
                            : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                </nav>

                {/* Mobile Actions */}
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  {/* Call Button */}
                  <Link
                    href="tel:7709811319"
                    className="flex items-center justify-center space-x-2 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-medium transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call 7709811319</span>
                  </Link>

                  {/* Order Now Button */}
                  <Button 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-medium shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Order Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
