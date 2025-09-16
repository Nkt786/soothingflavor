import Link from 'next/link'
import Image from 'next/image'
import AnimatedFoodBackground from '@/components/AnimatedFoodBackground'

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      {/* Hero Section - Split Layout with Image Collage */}
      <section className="relative py-20 md:py-32 bg-gradient-green-hero overflow-hidden">
        {/* Animated Food Background */}
        <AnimatedFoodBackground />
        
        {/* Enhanced green texture overlay */}
        <div className="absolute inset-0 bg-green-dots opacity-30"></div>
        {/* Additional green gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-sf-green/15 via-sf-teal/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Headline & CTAs */}
            <div className="space-y-8 fade-up">
              <h1 className="text-4xl md:text-6xl font-bold text-sf-slate mb-6 leading-tight">
                Flavors that <span className="text-sf-green">Heal</span>, 
                <br />Meals that <span className="text-sf-orange">Energize</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                Nutritious, customizable meal boxes delivered to your doorstep with professional service and quality assurance.
              </p>
              <div className="space-y-4">
                {/* Primary CTA Row */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/products"
                    className="bg-sf-green hover:bg-sf-green-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 btn-glow relative overflow-hidden group flex items-center justify-center"
                  >
                    <span className="relative z-10 flex items-center">
                      <span className="mr-2">🥗</span>
                      Order Products
                    </span>
                    {/* Green accent glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-sf-green via-sf-teal to-sf-green opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  </Link>
                  <Link 
                    href="/meal-plans"
                    className="bg-sf-orange hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 btn-glow relative overflow-hidden group flex items-center justify-center"
                  >
                    <span className="relative z-10 flex items-center">
                      <span className="mr-2">📅</span>
                      Meal Plans
                    </span>
                    {/* Orange accent glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-sf-orange via-orange-500 to-sf-orange opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  </Link>
                </div>
                
                {/* Secondary CTA Row */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="https://wa.me/7709811319?text=Hi, I want to order healthy meals from Soothing Flavor"
                    className="bg-white hover:bg-sf-mint text-sf-slate border-2 border-sf-green hover:border-sf-green-dark px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-md relative overflow-hidden group flex items-center justify-center"
                  >
                    <span className="relative z-10 flex items-center">
                      <span className="mr-2">💬</span>
                      WhatsApp Order
                    </span>
                    {/* Green accent glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-sf-green/10 to-sf-teal/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Link>
                  <Link 
                    href="tel:7709811319"
                    className="bg-white hover:bg-sf-mint text-sf-slate border-2 border-sf-green hover:border-sf-green-dark px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-md relative overflow-hidden group flex items-center justify-center"
                  >
                    <span className="relative z-10 flex items-center">
                      <span className="mr-2">📞</span>
                      Call Us
                    </span>
                    {/* Green accent glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-sf-green/10 to-sf-teal/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Image Collage */}
            <div className="relative fade-up fade-up-stagger-1">
              <div className="grid grid-cols-2 gap-4 h-96 md:h-[500px]">
                <div className="space-y-4">
                  <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden hover-lift">
                    <Image
                      src="/home/bowl.png"
                      alt="Healthy Bowl"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden hover-lift">
                    <Image
                      src="/home/juice.jpg"
                      alt="Fresh Juice"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
                <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden hover-lift">
                  <Image
                    src="/home/wrap.png"
                    alt="Healthy Wrap"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
              {/* Faint radial mint glow behind */}
              <div className="absolute inset-0 -z-10 bg-gradient-radial opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Order Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-50 via-white to-teal-50 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-green-dots opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 via-transparent to-teal-100/20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-sf-slate mb-4">
              Quick Order Options
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your preferred way to order healthy meals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Browse Products */}
            <Link 
              href="/products"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-emerald-100 hover:border-emerald-300 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🥗</span>
              </div>
              <h3 className="text-xl font-bold text-sf-slate mb-3 group-hover:text-emerald-700 transition-colors">
                Browse Products
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Explore our full menu of individual meals, bowls, wraps, and more
              </p>
              <div className="inline-flex items-center text-emerald-600 font-semibold group-hover:translate-x-1 transition-transform">
                <span>View Menu</span>
                <span className="ml-1">→</span>
              </div>
            </Link>

            {/* Meal Plans */}
            <Link 
              href="/meal-plans"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-orange-100 hover:border-orange-300 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="text-xl font-bold text-sf-slate mb-3 group-hover:text-orange-700 transition-colors">
                Meal Plans
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Subscribe to weekly, bi-weekly, or monthly meal plans
              </p>
              <div className="inline-flex items-center text-orange-600 font-semibold group-hover:translate-x-1 transition-transform">
                <span>View Plans</span>
                <span className="ml-1">→</span>
              </div>
            </Link>

            {/* WhatsApp Order */}
            <Link 
              href="https://wa.me/7709811319?text=Hi, I want to order healthy meals from Soothing Flavor"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-green-100 hover:border-green-300 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-sf-slate mb-3 group-hover:text-green-700 transition-colors">
                WhatsApp Order
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Quick order via WhatsApp with instant support and updates
              </p>
              <div className="inline-flex items-center text-green-600 font-semibold group-hover:translate-x-1 transition-transform">
                <span>Order Now</span>
                <span className="ml-1">→</span>
              </div>
            </Link>

            {/* Call Us */}
            <Link 
              href="tel:7709811319"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-teal-100 hover:border-teal-300 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">📞</span>
              </div>
              <h3 className="text-xl font-bold text-sf-slate mb-3 group-hover:text-teal-700 transition-colors">
                Call Us
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Speak directly with our team for personalized service
              </p>
              <div className="inline-flex items-center text-teal-600 font-semibold group-hover:translate-x-1 transition-transform">
                <span>Call Now</span>
                <span className="ml-1">→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Service Benefits Banner */}
      <section className="py-12 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 relative overflow-hidden">
        {/* Enhanced background patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-teal-500/20"></div>
        <div className="absolute inset-0 bg-green-dots opacity-30"></div>
        <div className="absolute inset-0 bg-green-grid opacity-20"></div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-4 left-8 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-4 right-8 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        
        {/* Premium accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white via-emerald-200 to-white opacity-60"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Premium Service, Premium Results
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Experience the difference with our professional meal preparation and delivery service
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👨‍🍳</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Chef-Crafted Meals</h3>
                <p className="text-white/80">Every dish is prepared by experienced chefs using premium ingredients and authentic recipes</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Nutritionist-Designed</h3>
                <p className="text-white/80">Meals are carefully balanced by nutritionists to meet your dietary and health goals</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Professional Delivery</h3>
                <p className="text-white/80">Timely delivery with proper packaging to ensure your meals arrive fresh and ready to enjoy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 bg-gradient-green-light relative">
        {/* Enhanced green texture */}
        <div className="absolute inset-0 bg-green-dots opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-sf-green/5 to-sf-teal/5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-sf-slate mb-3">
              Our Services
            </h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              Comprehensive meal solutions tailored to your lifestyle and preferences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Meal Plans */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 fade-up fade-up-stagger-1 border border-sf-mint/30 hover:border-sf-green/50 group">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-sf-green/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-sf-green/20 transition-colors">
                  <span className="text-2xl">📅</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-sf-slate mb-2">Meal Plans</h3>
                  <p className="text-sm text-gray-600 mb-3">Weekly, bi-weekly, and monthly subscription plans with customizable options.</p>
                  <Link 
                    href="/meal-plans"
                    className="inline-flex items-center text-sf-green hover:text-sf-green-dark font-medium text-sm transition-colors group-hover:translate-x-1"
                  >
                    Explore Plans
                    <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Products */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 fade-up fade-up-stagger-2 border border-sf-mint/30 hover:border-sf-green/50 group">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-sf-teal/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-sf-teal/20 transition-colors">
                  <span className="text-2xl">🥗</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-sf-slate mb-2">Individual Meals</h3>
                  <p className="text-sm text-gray-600 mb-3">Order individual meals anytime with our à la carte menu featuring fresh, healthy options.</p>
                  <Link 
                    href="/products"
                    className="inline-flex items-center text-sf-green hover:text-sf-green-dark font-medium text-sm transition-colors group-hover:translate-x-1"
                  >
                    View Menu
                    <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Categories - Compact Design */}
      <section className="py-12 bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden">
        {/* Enhanced background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/15 via-transparent to-teal-100/8"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-green-dots opacity-10"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          {/* Section header */}
          <div className="text-center mb-8">
            <h3 className="text-slate-700 text-xl font-semibold mb-2">Explore Our Menu Categories</h3>
            <p className="text-slate-500 text-sm">Discover healthy options for every meal</p>
          </div>
          
          {/* Compact category grid - 2 rows of 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {/* Bowls */}
            <Link 
              href="/products?category=bowls"
              className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-emerald-100/50 hover:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer"
              aria-label="Browse healthy bowl meals"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">🥗</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-slate-700 font-medium text-sm group-hover:text-emerald-700 transition-colors duration-300">Bowls</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Nutritious grain bowls</p>
                </div>
                <span className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </div>
            </Link>

            {/* Meal Boxes */}
            <Link 
              href="/products?category=meal-boxes"
              className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-emerald-100/50 hover:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer"
              aria-label="Browse meal box options"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">📦</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-slate-700 font-medium text-sm group-hover:text-orange-700 transition-colors duration-300">Meal Boxes</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Complete meal packages</p>
                </div>
                <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </div>
            </Link>

            {/* Wraps */}
            <Link 
              href="/products?category=wraps"
              className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-emerald-100/50 hover:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer"
              aria-label="Browse healthy wrap options"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">🌯</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-slate-700 font-medium text-sm group-hover:text-purple-700 transition-colors duration-300">Wraps</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Fresh & healthy wraps</p>
                </div>
                <span className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </div>
            </Link>

            {/* Sandwiches */}
            <Link 
              href="/products?category=sandwiches"
              className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-emerald-100/50 hover:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer"
              aria-label="Browse healthy sandwich options"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">🥪</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-slate-700 font-medium text-sm group-hover:text-red-700 transition-colors duration-300">Sandwiches</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Wholesome sandwiches</p>
                </div>
                <span className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </div>
            </Link>

            {/* Salads */}
            <Link 
              href="/products?category=salads"
              className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-emerald-100/50 hover:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer"
              aria-label="Browse fresh salad options"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">🥬</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-slate-700 font-medium text-sm group-hover:text-green-700 transition-colors duration-300">Salads</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Fresh garden salads</p>
                </div>
                <span className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </div>
            </Link>

            {/* Juices */}
            <Link 
              href="/products?category=juices"
              className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-emerald-100/50 hover:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer"
              aria-label="Browse healthy juice options"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">🥤</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-slate-700 font-medium text-sm group-hover:text-blue-700 transition-colors duration-300">Juices</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Fresh fruit juices</p>
                </div>
                <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Premium Redesign */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden">
        {/* Premium background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/30 via-transparent to-teal-100/20"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400"></div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-200/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-20 fade-up">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span>Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
              Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Difference</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Professional service backed by years of experience in healthy meal preparation and delivery
            </p>
          </div>

          {/* Premium Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Fresh Ingredients Card */}
            <div className="group fade-up fade-up-stagger-1">
              <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 overflow-hidden">
                {/* Card background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon container with enhanced styling */}
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <span className="text-3xl">🥬</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-emerald-700 transition-colors duration-300">
                    Fresh Ingredients
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed mb-6">
                    Locally sourced, organic produce for maximum nutrition and quality assurance
                  </p>
                  
                  {/* Enhanced tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                      High-Protein
                    </span>
                    <span className="px-3 py-1.5 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full border border-teal-200">
                      Low-Oil
                    </span>
                  </div>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Fitness-Focused Card */}
            <div className="group fade-up fade-up-stagger-2">
              <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 overflow-hidden">
                {/* Card background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-white to-orange-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <span className="text-3xl">💪</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-orange-700 transition-colors duration-300">
                    Fitness-Focused
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed mb-6">
                    Meals designed for your health and fitness goals with nutritional expertise
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full border border-orange-200">
                      Macro-Balanced
                    </span>
                    <span className="px-3 py-1.5 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full border border-teal-200">
                      Hygienic
                    </span>
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Customizable Card */}
            <div className="group fade-up fade-up-stagger-3">
              <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 overflow-hidden">
                {/* Card background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white to-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <span className="text-3xl">⚙️</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-teal-700 transition-colors duration-300">
                    Customizable
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed mb-6">
                    Tailor your meals to your dietary preferences with professional consultation
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                      Veg/Non-Veg
                    </span>
                    <span className="px-3 py-1.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full border border-orange-200">
                      Spice Level
                    </span>
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Affordable Card */}
            <div className="group fade-up fade-up-stagger-3">
              <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 overflow-hidden">
                {/* Card background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <span className="text-3xl">💰</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-emerald-700 transition-colors duration-300">
                    Affordable
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed mb-6">
                    Premium quality meals at reasonable prices with transparent pricing
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                      Value
                    </span>
                    <span className="px-3 py-1.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full border border-orange-200">
                      Quality
                    </span>
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>

          {/* Bottom CTA Section */}
          <div className="text-center mt-16 fade-up">
            <div className="inline-flex items-center space-x-3 bg-white px-8 py-4 rounded-2xl shadow-lg border border-slate-200">
              <span className="text-emerald-600 text-lg">✨</span>
              <span className="text-slate-700 font-semibold">Ready to experience the difference?</span>
              <Link 
                href="https://wa.me/7709811319?text=Hi, I want to order healthy meals from Soothing Flavor"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-md"
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Menu Teaser */}
      <section className="py-20 bg-gradient-green-soft relative">
        {/* Enhanced green grid texture */}
        <div className="absolute inset-0 bg-green-grid opacity-35"></div>
        {/* Green gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-sf-green/15 to-sf-teal/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-sf-slate mb-4">
              This Week&apos;s Stars
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our featured dishes that are trending this week
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="group fade-up fade-up-stagger-1">
              <div className="relative h-64 rounded-2xl overflow-hidden hover-lift border-2 border-transparent hover:border-sf-green/30 transition-colors">
                <Image
                  src="/images/placeholder.svg"
                  alt="Whole Grain Bowl"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg mb-2">Quinoa Power Bowl</h3>
                  <p className="text-white/90 text-sm">Protein-packed with fresh vegetables</p>
                </div>
                <div className="absolute top-4 right-4 bg-sf-green text-white px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Veg
                </div>
                {/* Green accent glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sf-green/0 via-sf-green/0 to-sf-green/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
            
            <div className="group fade-up fade-up-stagger-2">
              <div className="relative h-64 rounded-2xl overflow-hidden hover-lift border-2 border-transparent hover:border-sf-teal/30 transition-colors">
                <Image
                  src="/images/placeholder.svg"
                  alt="Healthy Wrap"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg mb-2">Grilled Chicken Wrap</h3>
                  <p className="text-white/90 text-sm">Lean protein with whole grain tortilla</p>
                </div>
                <div className="absolute top-4 right-4 bg-sf-orange text-white px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Non-Veg
                </div>
                {/* Teal accent glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sf-teal/0 via-sf-teal/0 to-sf-teal/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
            
            <div className="group fade-up fade-up-stagger-3">
              <div className="relative h-64 rounded-2xl overflow-hidden hover-lift border-2 border-transparent hover:border-sf-green/30 transition-colors">
                <Image
                  src="/images/placeholder.svg"
                  alt="Fresh Juice"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg mb-2">Green Detox Juice</h3>
                  <p className="text-white/90 text-sm">Fresh spinach, kale, and apple blend</p>
                </div>
                <div className="absolute top-4 right-4 bg-sf-green text-white px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Veg
                </div>
                {/* Green accent glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sf-green/0 via-sf-green/0 to-sf-green/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>
          <div className="text-center fade-up">
            <Link 
              href="/products?cat=Bowls"
              className="inline-flex items-center space-x-2 bg-sf-green hover:bg-sf-green-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg btn-glow"
            >
              <span>See Weekly Menu</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Success & Social Proof */}
      <section className="py-16 bg-gradient-to-r from-sf-foam via-sf-mint to-sf-foam relative">
        {/* Enhanced green accent border */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sf-green via-sf-teal to-sf-green"></div>
        {/* Green pattern overlay */}
        <div className="absolute inset-0 bg-green-dots opacity-25"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 fade-up">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-2xl">⭐</span>
              <span className="text-2xl">⭐</span>
              <span className="text-2xl">⭐</span>
              <span className="text-2xl">⭐</span>
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-xl font-semibold text-sf-slate mb-2">
              Loved by Nagpur fitness enthusiasts
            </h3>
            <div className="inline-flex items-center space-x-2 bg-sf-green text-white px-4 py-2 rounded-full text-sm font-medium">
              <span>🚚</span>
              <span>Fast Delivery</span>
            </div>
          </div>
          
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center fade-up fade-up-stagger-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm hover-lift border-t-4 border-sf-green/30 hover:border-sf-green/50 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-sf-green/10">
                  <Image
                    src="/images/testimonial-placeholder.svg"
                    alt="Anjali"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-600 text-sm mb-4">&ldquo;The meal plans are perfectly balanced for my fitness goals. Love the variety!&rdquo;</p>
                <p className="font-semibold text-sf-slate">- Anjali</p>
              </div>
            </div>
            
            <div className="text-center fade-up fade-up-stagger-2">
              <div className="bg-white rounded-2xl p-6 shadow-sm hover-lift border-t-4 border-sf-teal/30 hover:border-sf-teal/50 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-sf-teal/10">
                  <Image
                    src="/images/testimonial-placeholder.svg"
                    alt="Priya"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-600 text-sm mb-4">&ldquo;Fresh ingredients and professional service. Highly recommend!&rdquo;</p>
                <p className="font-semibold text-sf-slate">- Priya</p>
              </div>
            </div>
            
            <div className="text-center fade-up fade-up-stagger-3">
              <div className="bg-white rounded-2xl p-6 shadow-sm hover-lift border-t-4 border-sf-green/30 hover:border-sf-green/50 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-sf-green/10">
                  <Image
                    src="/images/testimonial-placeholder.svg"
                    alt="Rahul"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-600 text-sm mb-4">&ldquo;Perfect for my busy schedule. Healthy meals delivered on time!&rdquo;</p>
                <p className="font-semibold text-sf-slate">- Rahul</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Hook */}
      <section className="py-20 bg-gradient-green-medium relative">
        {/* Enhanced green lines texture */}
        <div className="absolute inset-0 bg-green-lines opacity-30"></div>
        {/* Green gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-sf-green/20 to-sf-teal/15"></div>
        <div className="container mx-auto px-10 relative z-10">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-sf-slate mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about our services
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-sf-mint rounded-2xl p-6 fade-up fade-up-stagger-1 border-l-4 border-sf-green/30 hover:border-sf-green/50 transition-colors">
              <h3 className="text-lg font-semibold text-sf-slate mb-3">What areas do you deliver to?</h3>
              <p className="text-gray-600">We currently serve Nagpur and surrounding areas with a delivery fee of ₹10/km.</p>
            </div>
            
            <div className="bg-sf-foam rounded-2xl p-6 fade-up fade-up-stagger-2 border-l-4 border-sf-teal/30 hover:border-sf-teal/50 transition-colors">
              <h3 className="text-lg font-semibold text-sf-slate mb-3">How do subscriptions work?</h3>
              <p className="text-gray-600">Choose from weekly, bi-weekly, or monthly plans. Meals are delivered fresh daily according to your schedule.</p>
            </div>
            
            <div className="bg-sf-mint rounded-2xl p-6 fade-up fade-up-stagger-3 border-l-4 border-sf-green/30 hover:border-sf-green/50 transition-colors">
              <h3 className="text-lg font-semibold text-sf-slate mb-3">Do you offer both Veg and Non-Veg options?</h3>
              <p className="text-gray-600">Yes! We provide both vegetarian and non-vegetarian meal options, all prepared with the same care and quality.</p>
            </div>
            
            <div className="bg-sf-foam rounded-2xl p-6 fade-up fade-up-stagger-3 border-l-4 border-sf-teal/30 hover:border-sf-teal/50 transition-colors">
              <h3 className="text-lg font-semibold text-sf-slate mb-3">Can I customize my meals?</h3>
              <p className="text-gray-600">Absolutely! We offer customization for dietary preferences, spice levels, and portion sizes.</p>
            </div>
          </div>
          
          <div className="text-center mt-12 fade-up">
            <Link 
              href="/about#faq"
              className="inline-flex items-center space-x-2 text-sf-green hover:text-sf-green-dark font-semibold text-lg transition-colors"
            >
              <span>See all FAQs</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Band - Green */}
      <section className="py-20 bg-gradient-to-br from-sf-green via-sf-green-dark to-sf-green relative overflow-hidden">
        {/* Enhanced diagonal texture */}
        <div className="absolute inset-0 bg-diag opacity-20"></div>
        {/* Green pattern overlay */}
        <div className="absolute inset-0 bg-green-dots opacity-30"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 fade-up">
            Start your healthy journey today
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg fade-up">
            Join thousands of satisfied customers who trust Soothing Flavor for their daily nutrition needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-up">
            <Link 
              href="https://wa.me/7709811319?text=Hi, I want to start my healthy meal journey with Soothing Flavor"
              className="bg-white hover:bg-sf-mint text-sf-green px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg btn-glow"
            >
              Order on WhatsApp
            </Link>
            <Link 
              href="/meal-plans"
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white/50 hover:border-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-md"
            >
              Explore Meal Plans
            </Link>
          </div>
        </div>
      </section>



      {/* Floating WhatsApp Button */}
      <Link 
        href="https://wa.me/7709811319?text=Hi, I want to order healthy meals from Soothing Flavor"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-sf-green hover:bg-sf-green-dark text-white rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 border border-sf-green-dark"
        aria-label="Order on WhatsApp"
      >
        <span className="text-xl">💬</span>
      </Link>
    </main>
  )
}
