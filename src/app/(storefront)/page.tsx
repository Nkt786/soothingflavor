import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-gradient-to-b from-[#F5FDF9] to-white">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#66BB6A]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#2E7D32]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-[#66BB6A]/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-[#2E7D32]/6 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Animated gradient shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E7D32]/10 via-[#66BB6A]/5 to-[#2E7D32]/10 animate-pulse"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Headline & CTAs */}
            <div className="space-y-8 animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold text-[#1B5E20] mb-6 leading-tight">
                Flavors that <span className="text-[#2E7D32]">Heal</span>, 
                <br />Meals that <span className="text-[#66BB6A]">Energize</span>
              </h1>
              <p className="text-xl text-[#4F4F4F] mb-8 max-w-2xl leading-relaxed">
                Nutritious, customizable meal boxes delivered to your doorstep with professional service and quality assurance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/products"
                  className="bg-[#2E7D32] hover:bg-[#66BB6A] text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105 hover:-translate-y-1"
                >
                  Order Now
                </Link>
                <Link 
                  href="/meal-plans"
                  className="bg-white hover:bg-[#E8F5E9] text-[#2E7D32] border-2 border-[#2E7D32] hover:border-[#66BB6A] px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-md transform hover:scale-105"
                >
                  Explore Plans
                </Link>
              </div>
            </div>

            {/* Right: Product Image */}
            <div className="relative animate-fade-in-up-delay">
              <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src="/home/bowl.png"
                      alt="Healthy Bowl"
                      fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#66BB6A] rounded-full opacity-20 animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#2E7D32] rounded-full opacity-20 animate-bounce delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-[#E8F5E9] relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1B5E20] mb-6">
              Why Choose Us
            </h2>
            <p className="text-xl text-[#4F4F4F] max-w-3xl mx-auto">
              Professional service backed by years of experience in healthy meal preparation and delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Fresh Ingredients */}
            <div className="group animate-fade-in-up-delay">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-[#66BB6A]/20">
                <div className="w-20 h-20 bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🥬</span>
                </div>
                <h3 className="text-xl font-bold text-[#1B5E20] mb-4 group-hover:text-[#2E7D32] transition-colors">
                  Fresh Ingredients
                </h3>
                <p className="text-[#4F4F4F] leading-relaxed mb-6">
                  Locally sourced, organic produce for maximum nutrition and quality assurance
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-full">
                    High-Protein
                  </span>
                  <span className="px-3 py-1.5 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-full">
                    Low-Oil
                  </span>
                </div>
              </div>
            </div>

            {/* Fitness-Focused */}
            <div className="group animate-fade-in-up-delay-2">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-[#66BB6A]/20">
                <div className="w-20 h-20 bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">💪</span>
                </div>
                <h3 className="text-xl font-bold text-[#1B5E20] mb-4 group-hover:text-[#2E7D32] transition-colors">
                  Fitness-Focused
                </h3>
                <p className="text-[#4F4F4F] leading-relaxed mb-6">
                  Meals designed for your health and fitness goals with nutritional expertise
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-full">
                    Macro-Balanced
                  </span>
                  <span className="px-3 py-1.5 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-full">
                    Hygienic
                  </span>
                </div>
              </div>
              </div>
              
            {/* Customizable */}
            <div className="group animate-fade-in-up-delay-3">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-[#66BB6A]/20">
                <div className="w-20 h-20 bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">⚙️</span>
                </div>
                <h3 className="text-xl font-bold text-[#1B5E20] mb-4 group-hover:text-[#2E7D32] transition-colors">
                  Customizable
                </h3>
                <p className="text-[#4F4F4F] leading-relaxed mb-6">
                  Tailor your meals to your dietary preferences with professional consultation
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-full">
                    Veg/Non-Veg
                  </span>
                  <span className="px-3 py-1.5 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-full">
                    Spice Level
                  </span>
                </div>
              </div>
              </div>
              
            {/* Affordable */}
            <div className="group animate-fade-in-up-delay-4">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-[#66BB6A]/20">
                <div className="w-20 h-20 bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">💰</span>
                </div>
                <h3 className="text-xl font-bold text-[#1B5E20] mb-4 group-hover:text-[#2E7D32] transition-colors">
                  Affordable
                </h3>
                <p className="text-[#4F4F4F] leading-relaxed mb-6">
                  Premium quality meals at reasonable prices with transparent pricing
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-full">
                    Value
                  </span>
                  <span className="px-3 py-1.5 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-full">
                    Quality
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services/Menu Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1B5E20] mb-6">
              Our Services
            </h2>
            <p className="text-xl text-[#4F4F4F] max-w-3xl mx-auto">
              Comprehensive meal solutions tailored to your lifestyle and preferences
            </p>
          </div>
          
          {/* Main Service Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Meal Plans */}
            <Link 
              href="/meal-plans"
              className="group bg-gradient-to-br from-[#E8F5E9] to-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-[#66BB6A]/20 animate-fade-in-up-delay"
            >
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">📅</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#1B5E20] mb-4 group-hover:text-[#2E7D32] transition-colors">
                    Meal Plans
                  </h3>
                  <p className="text-[#4F4F4F] mb-6 leading-relaxed">
                    Weekly, bi-weekly, and monthly subscription plans with customizable options for your health goals.
                  </p>
                  <div className="inline-flex items-center text-[#2E7D32] font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Explore Plans</span>
                    <span className="ml-2">→</span>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Individual Meals */}
            <Link 
              href="/products"
              className="group bg-gradient-to-br from-[#E8F5E9] to-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-[#66BB6A]/20 animate-fade-in-up-delay-2"
            >
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🥗</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#1B5E20] mb-4 group-hover:text-[#2E7D32] transition-colors">
                    Individual Meals
                  </h3>
                  <p className="text-[#4F4F4F] mb-6 leading-relaxed">
                    Order individual meals anytime with our à la carte menu featuring fresh, healthy options.
                  </p>
                  <div className="inline-flex items-center text-[#2E7D32] font-semibold group-hover:translate-x-2 transition-transform">
                    <span>View Menu</span>
                    <span className="ml-2">→</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Menu Categories Grid */}
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-[#1B5E20] mb-4">Menu Categories</h3>
            <p className="text-[#4F4F4F]">Discover healthy options for every meal</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Bowls */}
            <Link 
              href="/products?category=bowls"
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-[#66BB6A]/20 text-center animate-fade-in-up-delay"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">🥗</span>
              </div>
              <h4 className="text-[#1B5E20] font-semibold text-sm group-hover:text-[#2E7D32] transition-colors">Bowls</h4>
              <p className="text-xs text-[#4F4F4F] mt-1">Nutritious grain bowls</p>
            </Link>

            {/* Meal Boxes */}
            <Link 
              href="/products?category=meal-boxes"
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-[#66BB6A]/20 text-center animate-fade-in-up-delay-2"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">📦</span>
              </div>
              <h4 className="text-[#1B5E20] font-semibold text-sm group-hover:text-[#2E7D32] transition-colors">Meal Boxes</h4>
              <p className="text-xs text-[#4F4F4F] mt-1">Complete meal packages</p>
            </Link>

            {/* Wraps */}
            <Link 
              href="/products?category=wraps"
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-[#66BB6A]/20 text-center animate-fade-in-up-delay-3"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">🌯</span>
              </div>
              <h4 className="text-[#1B5E20] font-semibold text-sm group-hover:text-[#2E7D32] transition-colors">Wraps</h4>
              <p className="text-xs text-[#4F4F4F] mt-1">Fresh & healthy wraps</p>
            </Link>

            {/* Sandwiches */}
            <Link 
              href="/products?category=sandwiches"
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-[#66BB6A]/20 text-center animate-fade-in-up-delay-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">🥪</span>
              </div>
              <h4 className="text-[#1B5E20] font-semibold text-sm group-hover:text-[#2E7D32] transition-colors">Sandwiches</h4>
              <p className="text-xs text-[#4F4F4F] mt-1">Wholesome sandwiches</p>
            </Link>

            {/* Salads */}
            <Link 
              href="/products?category=salads"
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-[#66BB6A]/20 text-center animate-fade-in-up-delay-5"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">🥬</span>
              </div>
              <h4 className="text-[#1B5E20] font-semibold text-sm group-hover:text-[#2E7D32] transition-colors">Salads</h4>
              <p className="text-xs text-[#4F4F4F] mt-1">Fresh garden salads</p>
            </Link>

            {/* Juices */}
            <Link 
              href="/products?category=juices"
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-[#66BB6A]/20 text-center animate-fade-in-up-delay-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">🥤</span>
              </div>
              <h4 className="text-[#1B5E20] font-semibold text-sm group-hover:text-[#2E7D32] transition-colors">Juices</h4>
              <p className="text-xs text-[#4F4F4F] mt-1">Fresh fruit juices</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured This Week */}
      <section className="py-20 bg-[#E8F5E9] relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1B5E20] mb-6">
              Featured This Week
            </h2>
            <p className="text-xl text-[#4F4F4F] max-w-2xl mx-auto">
              Discover our trending dishes that are popular this week
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quinoa Power Bowl */}
            <div className="group animate-fade-in-up-delay">
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <Image
                  src="/home/bowl.png"
                  alt="Quinoa Power Bowl"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-bold text-xl mb-2">Quinoa Power Bowl</h3>
                  <p className="text-white/90 text-sm mb-3">Protein-packed with fresh vegetables</p>
                  <div className="flex items-center justify-between">
                    <span className="bg-[#2E7D32] text-white px-3 py-1 rounded-full text-xs font-medium">Veg</span>
                    <span className="text-white font-semibold">₹180</span>
                </div>
                </div>
              </div>
            </div>
            
            {/* Grilled Chicken Wrap */}
            <div className="group animate-fade-in-up-delay-2">
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <Image
                  src="/home/wrap.png"
                  alt="Grilled Chicken Wrap"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-bold text-xl mb-2">Grilled Chicken Wrap</h3>
                  <p className="text-white/90 text-sm mb-3">Lean protein with whole grain tortilla</p>
                  <div className="flex items-center justify-between">
                    <span className="bg-[#66BB6A] text-white px-3 py-1 rounded-full text-xs font-medium">Non-Veg</span>
                    <span className="text-white font-semibold">₹220</span>
                </div>
                </div>
              </div>
            </div>
            
            {/* Green Detox Juice */}
            <div className="group animate-fade-in-up-delay-3">
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <Image
                  src="/home/juice.jpg"
                  alt="Green Detox Juice"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-bold text-xl mb-2">Green Detox Juice</h3>
                  <p className="text-white/90 text-sm mb-3">Fresh spinach, kale, and apple blend</p>
                  <div className="flex items-center justify-between">
                    <span className="bg-[#2E7D32] text-white px-3 py-1 rounded-full text-xs font-medium">Veg</span>
                    <span className="text-white font-semibold">₹120</span>
                </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12 animate-fade-in-up-delay-4">
            <Link 
              href="/products"
              className="bg-[#2E7D32] hover:bg-[#66BB6A] text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1B5E20] mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-[#4F4F4F] max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Soothing Flavor
            </p>
          </div>
          
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Anjali */}
            <div className="group animate-fade-in-up-delay">
              <div className="bg-gradient-to-br from-[#E8F5E9] to-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-[#66BB6A]/20">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">👩</span>
                  </div>
                  <div>
                    <h4 className="text-[#1B5E20] font-bold text-lg">Anjali</h4>
                    <div className="flex text-yellow-400">
                      <span>⭐</span>
                      <span>⭐</span>
                      <span>⭐</span>
                      <span>⭐</span>
                      <span>⭐</span>
                    </div>
                  </div>
                </div>
                <p className="text-[#4F4F4F] leading-relaxed italic">
                  "The meal plans are perfectly balanced for my fitness goals. Love the variety and freshness!"
                </p>
              </div>
            </div>
            
            {/* Priya */}
            <div className="group animate-fade-in-up-delay-2">
              <div className="bg-gradient-to-br from-[#E8F5E9] to-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-[#66BB6A]/20">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">👩</span>
                  </div>
                  <div>
                    <h4 className="text-[#1B5E20] font-bold text-lg">Priya</h4>
                    <div className="flex text-yellow-400">
                      <span>⭐</span>
                      <span>⭐</span>
                      <span>⭐</span>
                      <span>⭐</span>
                      <span>⭐</span>
                    </div>
                  </div>
                </div>
                <p className="text-[#4F4F4F] leading-relaxed italic">
                  "Fresh ingredients and professional service. Highly recommend to anyone looking for healthy meals!"
                </p>
              </div>
            </div>
            
            {/* Rahul */}
            <div className="group animate-fade-in-up-delay-3">
              <div className="bg-gradient-to-br from-[#E8F5E9] to-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-[#66BB6A]/20">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">👨</span>
                  </div>
                  <div>
                    <h4 className="text-[#1B5E20] font-bold text-lg">Rahul</h4>
                    <div className="flex text-yellow-400">
                      <span>⭐</span>
                      <span>⭐</span>
                      <span>⭐</span>
                      <span>⭐</span>
                      <span>⭐</span>
                    </div>
                  </div>
                </div>
                <p className="text-[#4F4F4F] leading-relaxed italic">
                  "Perfect for my busy schedule. Healthy meals delivered on time with great taste!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#E8F5E9] relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1B5E20] mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-[#4F4F4F] max-w-2xl mx-auto">
              Get answers to common questions about our services
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-[#66BB6A]/20 animate-fade-in-up-delay">
              <h3 className="text-xl font-bold text-[#1B5E20] mb-4 group-hover:text-[#2E7D32] transition-colors">
                What areas do you deliver to?
              </h3>
              <p className="text-[#4F4F4F] leading-relaxed">
                We currently serve Nagpur and surrounding areas with a delivery fee of ₹10/km.
              </p>
            </div>
            
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-[#66BB6A]/20 animate-fade-in-up-delay-2">
              <h3 className="text-xl font-bold text-[#1B5E20] mb-4 group-hover:text-[#2E7D32] transition-colors">
                How do subscriptions work?
              </h3>
              <p className="text-[#4F4F4F] leading-relaxed">
                Choose from weekly, bi-weekly, or monthly plans. Meals are delivered fresh daily according to your schedule.
              </p>
            </div>
            
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-[#66BB6A]/20 animate-fade-in-up-delay-3">
              <h3 className="text-xl font-bold text-[#1B5E20] mb-4 group-hover:text-[#2E7D32] transition-colors">
                Do you offer both Veg and Non-Veg options?
              </h3>
              <p className="text-[#4F4F4F] leading-relaxed">
                Yes! We provide both vegetarian and non-vegetarian meal options, all prepared with the same care and quality.
              </p>
            </div>
            
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-[#66BB6A]/20 animate-fade-in-up-delay-4">
              <h3 className="text-xl font-bold text-[#1B5E20] mb-4 group-hover:text-[#2E7D32] transition-colors">
                Can I customize my meals?
              </h3>
              <p className="text-[#4F4F4F] leading-relaxed">
                Absolutely! We offer customization for dietary preferences, spice levels, and portion sizes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#2E7D32] via-[#66BB6A] to-[#2E7D32] relative overflow-hidden">
        {/* Floating food icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 text-4xl opacity-20 animate-bounce">🥗</div>
          <div className="absolute top-20 right-20 text-3xl opacity-20 animate-bounce delay-1000">🥤</div>
          <div className="absolute bottom-20 left-20 text-3xl opacity-20 animate-bounce delay-2000">🌯</div>
          <div className="absolute bottom-10 right-10 text-4xl opacity-20 animate-bounce delay-3000">🥬</div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-fade-in-up">
            Start your healthy journey today
          </h2>
          <p className="text-white/90 mb-12 max-w-3xl mx-auto text-xl animate-fade-in-up-delay">
            Join thousands of satisfied customers who trust Soothing Flavor for their daily nutrition needs
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up-delay-2">
            <Link 
              href="https://wa.me/7709811319?text=Hi, I want to start my healthy meal journey with Soothing Flavor"
              className="bg-white hover:bg-[#E8F5E9] text-[#2E7D32] px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 hover:shadow-xl transform hover:scale-105"
            >
              Buy Now
            </Link>
            <Link 
              href="/meal-plans"
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white/50 hover:border-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 hover:shadow-lg transform hover:scale-105"
            >
              Explore Meal Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <Link 
        href="https://wa.me/7709811319?text=Hi, I want to order healthy meals from Soothing Flavor"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#2E7D32] hover:bg-[#66BB6A] text-white rounded-2xl shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Buy Now"
      >
        <span className="text-2xl">💬</span>
      </Link>
    </main>
  )
}
