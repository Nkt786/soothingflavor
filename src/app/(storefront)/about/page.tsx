'use client'

import { useState } from 'react'
import { Heart, CheckCircle, Globe, Users, Star, Award, Leaf, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'mission' | 'story' | 'values'>('mission')

  const stats = [
    { label: 'Happy Customers', value: '5000+', icon: Heart },
    { label: 'Meals Delivered', value: '50K+', icon: CheckCircle },
    { label: 'Cities Served', value: '3+', icon: Globe },
    { label: 'Team Members', value: '25+', icon: Users },
  ]

  const values = [
    {
      icon: Star,
      title: 'Quality First',
      description: 'Premium ingredients, expert nutritionists, and rigorous quality control',
      color: 'from-blue-100 to-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Eco-friendly packaging, local sourcing, and waste reduction',
      color: 'from-emerald-100 to-teal-200',
      iconColor: 'text-emerald-600'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a supportive network of health-conscious individuals',
      color: 'from-purple-100 to-purple-200',
      iconColor: 'text-purple-600'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Constantly evolving recipes and meal plans for modern lifestyles',
      color: 'from-orange-100 to-orange-200',
      iconColor: 'text-orange-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-green-dots opacity-8"></div>
      <div className="absolute inset-0 bg-green-grid opacity-5"></div>
      <div className="absolute inset-0 bg-green-lines opacity-6"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-12 left-12 w-32 h-32 bg-emerald-200/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-12 right-12 w-40 h-40 bg-teal-200/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-100/15 rounded-full blur-2xl"></div>
      
      {/* Hero Section */}
      <section className="py-8 md:py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            About Soothing Flavor
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6">
            We&apos;re passionate about creating delicious, nutritious food that nourishes both body and soul.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center shadow-lg border border-emerald-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section className="py-8 md:py-12 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg border border-emerald-200">
              {[
                { id: 'mission', label: 'Our Mission' },
                { id: 'story', label: 'Our Story' },
                { id: 'values', label: 'Our Values' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'story' | 'mission' | 'values')}
                  className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-emerald-200">
            {activeTab === 'mission' && (
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">Our Mission</h2>
                <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-4">
                  At Soothing Flavor, we believe that healthy eating should be enjoyable, accessible, and sustainable. 
                  Our mission is to provide premium quality food products that support your wellness journey without 
                  compromising on taste or convenience.
                </p>
                <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  We source the finest ingredients, prioritize organic and non-GMO options, and create recipes that 
                  celebrate natural flavors while supporting your health goals.
                </p>
              </div>
            )}

            {activeTab === 'story' && (
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">Our Journey</h2>
                  <p className="text-base md:text-lg text-slate-600 mb-4 leading-relaxed">
                    Soothing Flavor was born from a simple belief: healthy food should taste amazing. 
                    Our founder, a nutritionist and food enthusiast, was frustrated with the lack of 
                    truly delicious healthy options in the market.
                  </p>
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    What started as a small kitchen experiment has grown into a beloved brand that 
                    thousands of customers trust for their daily nutrition needs.
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">Today</h2>
                  <p className="text-base md:text-lg text-slate-600 mb-4 leading-relaxed">
                    Today, we&apos;re proud to offer a comprehensive selection of products, from 
                    protein-rich snacks to wholesome meal plans, all designed to make healthy 
                    eating enjoyable and sustainable.
                  </p>
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    Our team of nutrition experts, chefs, and wellness coaches work together 
                    to ensure every product meets our high standards for taste, nutrition, and quality.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'values' && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 text-center">Our Core Values</h2>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  {values.map((value, index) => (
                    <div key={index} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 md:p-6 border border-emerald-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${value.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <value.icon className={`w-6 h-6 ${value.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800 mb-2">{value.title}</h3>
                          <p className="text-sm text-slate-600 leading-relaxed">{value.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-8 md:py-12 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-6 md:p-8 text-center shadow-xl">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Award-Winning Service</h2>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Recognized for excellence in healthy meal delivery and customer satisfaction
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full text-white">Best Healthy Food 2023</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-white">Customer Choice Award</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-white">Quality Excellence</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-12 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-emerald-200">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">Ready to Join Our Community?</h2>
            <p className="text-base md:text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
              Start your healthy journey with Soothing Flavor today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  Browse Menu
                </Button>
              </Link>
              <Link href="/meal-plans">
                <Button variant="outline" className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:-translate-y-1">
                  View Meal Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
