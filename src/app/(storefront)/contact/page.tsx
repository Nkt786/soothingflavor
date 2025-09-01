'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, MessageCircle, Zap, Star, Shield, Truck, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ContactPage() {
  const [activeContact, setActiveContact] = useState<'phone' | 'whatsapp' | 'email'>('whatsapp')

  const contactMethods = [
    {
      id: 'phone',
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our friendly team',
      action: '+91 7709811319',
      href: 'tel:7709811319',
      color: 'from-blue-100 to-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Instant support and quick responses',
      action: 'Chat Now',
      href: 'https://wa.me/917709811319',
      color: 'from-emerald-100 to-emerald-200',
      iconColor: 'text-emerald-600'
    },
    {
      id: 'email',
      icon: Mail,
      title: 'Email Us',
      description: 'Detailed inquiries and feedback',
      action: 'soothingflavor6@gmail.com',
      href: 'mailto:soothingflavor6@gmail.com',
      color: 'from-purple-100 to-purple-200',
      iconColor: 'text-purple-600'
    }
  ]

  const serviceInfo = [
    {
      icon: MapPin,
      title: 'Service Area',
      description: 'Nagpur and surrounding areas',
      details: 'Complete city coverage with extended delivery network'
    },
    {
      icon: Truck,
      title: 'Delivery Charges',
      description: '₹10 per kilometer',
      details: 'Transparent pricing, no hidden charges'
    },
    {
      icon: Clock,
      title: 'Operating Hours',
      description: '7:00 AM - 9:00 PM',
      details: 'Kitchen: 6:00 AM - 10:00 PM • Orders accepted 24/7'
    },
    {
      icon: Zap,
      title: 'Response Time',
      description: 'Instant - 24 hours',
      details: 'WhatsApp: Instant • Email: Within 24 hours'
    }
  ]

  const features = [
    { icon: '🌱', title: 'Fresh Ingredients', desc: 'Locally sourced, organic ingredients' },
    { icon: '💪', title: 'Fitness-Focused', desc: 'Nutritionist-designed meals' },
    { icon: '🎯', title: 'Customizable', desc: 'Personalized meal plans' },
    { icon: '💰', title: 'Affordable', desc: 'Premium quality, competitive prices' },
    { icon: '⚡', title: 'Fast Delivery', desc: 'Quick and reliable service' },
    { icon: '🛡️', title: 'Quality Assured', desc: 'Rigorous quality control' }
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
            Get in Touch
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6">
            Ready to transform your health journey? We&apos;re here to help you achieve your fitness goals with delicious, nutritious meals delivered right to your doorstep.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Interactive Contact Methods */}
      <section className="py-8 md:py-12 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Contact Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg border border-emerald-200">
              {contactMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setActiveContact(method.id as any)}
                  className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-200 ${
                    activeContact === method.id
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  {method.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Contact Method */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-emerald-200">
            {contactMethods.map((method) => (
              method.id === activeContact && (
                <div key={method.id} className="text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${method.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <method.icon className={`w-10 h-10 ${method.iconColor}`} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">{method.title}</h2>
                  <p className="text-base md:text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
                    {method.description}
                  </p>
                  <a 
                    href={method.href}
                    target={method.id === 'whatsapp' ? '_blank' : undefined}
                    rel={method.id === 'whatsapp' ? 'noopener noreferrer' : undefined}
                    className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    {method.action}
                  </a>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Service Information Grid */}
      <section className="py-8 md:py-12 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 text-center mb-8">Service Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {serviceInfo.map((info, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-emerald-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-1">{info.title}</h3>
                    <p className="text-emerald-600 font-medium mb-1">{info.description}</p>
                    <p className="text-sm text-slate-600">{info.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-8 md:py-12 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              Why Choose Soothing Flavor?
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              We&apos;re not just another meal delivery service. We&apos;re your partners in achieving a healthier, more fulfilling lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center shadow-lg border border-emerald-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl md:text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-xs md:text-sm text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-12 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-6 md:p-8 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Start Your Healthy Journey?
            </h2>
            <p className="text-lg md:text-xl text-emerald-100 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have transformed their health with Soothing Flavor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button className="bg-white text-emerald-600 hover:bg-gray-100 px-6 py-3 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  Browse Our Menu
                </Button>
              </Link>
              <a href="https://wa.me/917709811319" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 px-6 py-3 text-lg font-semibold rounded-2xl transition-all duration-300 transform hover:-translate-y-1">
                  Chat with Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
