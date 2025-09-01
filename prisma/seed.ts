import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'vegan-sweets' },
      update: {},
      create: {
        slug: 'vegan-sweets',
        name: 'Vegan Sweets',
        description: 'Delicious plant-based sweet treats',
        image: '/images/categories/vegan-sweets.jpg'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'low-cal-sauces' },
      update: {},
      create: {
        slug: 'low-cal-sauces',
        name: 'Low-Cal Sauces',
        description: 'Flavorful sauces with fewer calories',
        image: '/images/categories/low-cal-sauces.jpg'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'nut-butters' },
      update: {},
      create: {
        slug: 'nut-butters',
        name: 'Nut Butters',
        description: 'Premium nut butters for healthy snacking',
        image: '/images/categories/nut-butters.jpg'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'fresh-bakes' },
      update: {},
      create: {
        slug: 'fresh-bakes',
        name: 'Fresh Bakes',
        description: 'Freshly baked healthy treats',
        image: '/images/categories/fresh-bakes.jpg'
      }
    })
  ])

  console.log('✅ Categories created')

  // Create meal plans
  const mealPlans = await Promise.all([
    prisma.mealPlan.upsert({
      where: { slug: 'weight-loss' },
      update: {},
      create: {
        slug: 'weight-loss',
        name: 'Weight Loss',
        summary: 'Scientifically designed meals to help you lose weight sustainably',
        longDescription: 'Our weight loss meal plan focuses on creating a calorie deficit while ensuring you get all the essential nutrients. Each meal is carefully portioned and balanced to keep you satisfied while promoting fat loss.',
        caloriesMin: 1200,
        caloriesMax: 1500,
        macros: {
          protein: '30%',
          carbs: '40%',
          fats: '30%'
        },
        isVeg: true,
        isKeto: false,
        images: ['/images/meal-plans/weight-loss-1.jpg', '/images/meal-plans/weight-loss-2.jpg'],
        benefits: [
          'Scientifically proven calorie deficit',
          'High protein to preserve muscle mass',
          'Fiber-rich for satiety',
          'Balanced macronutrients'
        ],
        pricePerWeek: 1499.00
      }
    }),
    prisma.mealPlan.upsert({
      where: { slug: 'maintenance' },
      update: {},
      create: {
        slug: 'maintenance',
        name: 'Maintenance',
        summary: 'Balanced meals to maintain your current weight and energy levels',
        longDescription: 'Perfect for those who want to maintain their current weight while enjoying delicious, nutritious meals. This plan provides balanced nutrition without the stress of strict calorie counting.',
        caloriesMin: 1800,
        caloriesMax: 2200,
        macros: {
          protein: '25%',
          carbs: '50%',
          fats: '25%'
        },
        isVeg: true,
        isKeto: false,
        images: ['/images/meal-plans/maintenance-1.jpg', '/images/meal-plans/maintenance-2.jpg'],
        benefits: [
          'Balanced calorie intake',
          'Sustained energy throughout the day',
          'Variety of flavors and textures',
          'Flexible meal timing'
        ],
        pricePerWeek: 1299.00
      }
    }),
    prisma.mealPlan.upsert({
      where: { slug: 'athletic' },
      update: {},
      create: {
        slug: 'athletic',
        name: 'Athletic',
        summary: 'High-performance meals for active individuals and athletes',
        longDescription: 'Designed for those with active lifestyles, this plan provides higher protein and complex carbohydrates to support muscle recovery and sustained energy during workouts.',
        caloriesMin: 2200,
        caloriesMax: 2800,
        macros: {
          protein: '35%',
          carbs: '45%',
          fats: '20%'
        },
        isVeg: false,
        isKeto: false,
        images: ['/images/meal-plans/athletic-1.jpg', '/images/meal-plans/athletic-2.jpg'],
        benefits: [
          'High protein for muscle building',
          'Complex carbs for sustained energy',
          'Optimal timing for workout recovery',
          'Enhanced performance support'
        ],
        pricePerWeek: 1799.00
      }
    }),
    prisma.mealPlan.upsert({
      where: { slug: 'keto' },
      update: {},
      create: {
        slug: 'keto',
        name: 'Keto',
        summary: 'Low-carb, high-fat meals to achieve ketosis',
        longDescription: 'Our keto meal plan is designed to help you achieve and maintain ketosis through carefully calculated macronutrient ratios. Each meal is delicious and satisfying while keeping carbs minimal.',
        caloriesMin: 1600,
        caloriesMax: 2000,
        macros: {
          protein: '25%',
          carbs: '5%',
          fats: '70%'
        },
        isVeg: false,
        isKeto: true,
        images: ['/images/meal-plans/keto-1.jpg', '/images/meal-plans/keto-2.jpg'],
        benefits: [
          'Rapid fat burning',
          'Stable blood sugar levels',
          'Mental clarity and focus',
          'Reduced inflammation'
        ],
        pricePerWeek: 1699.00
      }
    })
  ])

  console.log('✅ Meal plans created')

  // Create products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { slug: 'almond-butter' },
      update: {},
      create: {
        slug: 'almond-butter',
        name: 'Premium Almond Butter',
        description: 'Smooth and creamy almond butter made from premium California almonds',
        images: ['/images/products/almond-butter-1.jpg', '/images/products/almond-butter-2.jpg'],
        price: 299.00,
        salePrice: 249.00,
        categoryId: categories[2].id, // nut-butters
        stock: 50,
        attributes: {
          size: '250g',
          flavor: 'Natural',
          type: 'Organic'
        },
        nutrition: {
          servingSize: '15g',
          calories: 90,
          protein: '3g',
          carbs: '3g',
          fats: '8g',
          fiber: '2g'
        }
      }
    }),
    prisma.product.upsert({
      where: { slug: 'vegan-chocolate-chip-cookies' },
      update: {},
      create: {
        slug: 'vegan-chocolate-chip-cookies',
        name: 'Vegan Chocolate Chip Cookies',
        description: 'Delicious plant-based cookies with dark chocolate chips',
        images: ['/images/products/vegan-cookies-1.jpg', '/images/products/vegan-cookies-2.jpg'],
        price: 199.00,
        categoryId: categories[0].id, // vegan-sweets
        stock: 100,
        attributes: {
          size: '6 cookies',
          flavor: 'Chocolate Chip',
          type: 'Vegan'
        },
        nutrition: {
          servingSize: '1 cookie',
          calories: 120,
          protein: '2g',
          carbs: '18g',
          fats: '5g',
          fiber: '1g'
        }
      }
    }),
    prisma.product.upsert({
      where: { slug: 'low-cal-pesto-sauce' },
      update: {},
      create: {
        slug: 'low-cal-pesto-sauce',
        name: 'Low-Cal Pesto Sauce',
        description: 'Flavorful pesto sauce with reduced calories and maximum taste',
        images: ['/images/products/pesto-sauce-1.jpg', '/images/products/pesto-sauce-2.jpg'],
        price: 149.00,
        categoryId: categories[1].id, // low-cal-sauces
        stock: 75,
        attributes: {
          size: '200ml',
          flavor: 'Basil Pesto',
          type: 'Low-Calorie'
        },
        nutrition: {
          servingSize: '30ml',
          calories: 45,
          protein: '1g',
          carbs: '2g',
          fats: '4g',
          fiber: '1g'
        }
      }
    })
  ])

  console.log('✅ Products created')

  // Create testimonials
  const testimonials = await Promise.all([
    prisma.testimonial.upsert({
      where: { id: 'testimonial-1' },
      update: {},
      create: {
        id: 'testimonial-1',
        name: 'Priya Sharma',
        avatarUrl: '/images/testimonials/priya.jpg',
        quote: 'Soothing Flavor has completely transformed my relationship with food. The weight loss plan is not just effective but also incredibly delicious!',
        rating: 5,
        city: 'Nagpur'
      }
    }),
    prisma.testimonial.upsert({
      where: { id: 'testimonial-2' },
      update: {},
      create: {
        id: 'testimonial-2',
        name: 'Rahul Mehta',
        avatarUrl: '/images/testimonials/rahul.jpg',
        quote: 'As a fitness enthusiast, I needed meals that could fuel my workouts. The Athletic plan delivers exactly what I need with amazing taste.',
        rating: 5,
        city: 'Delhi'
      }
    }),
    prisma.testimonial.upsert({
      where: { id: 'testimonial-3' },
      update: {},
      create: {
        id: 'testimonial-3',
        name: 'Anjali Patel',
        avatarUrl: '/images/testimonials/anjali.jpg',
        quote: 'The keto plan helped me achieve my health goals while enjoying every single meal. The variety and quality are outstanding!',
        rating: 5,
        city: 'Bangalore'
      }
    })
  ])

  console.log('✅ Testimonials created')

  // Create FAQs
  const faqs = await Promise.all([
    prisma.faq.upsert({
      where: { id: 'faq-1' },
      update: {},
      create: {
        id: 'faq-1',
        question: 'How does the meal plan delivery work?',
        answer: 'We deliver fresh, prepared meals to your doorstep every week. You can choose your preferred delivery day and time slot during checkout.',
        category: 'Delivery'
      }
    }),
    prisma.faq.upsert({
      where: { id: 'faq-2' },
      update: {},
      create: {
        id: 'faq-2',
        question: 'Can I pause or skip weeks?',
        answer: 'Yes! You can pause your subscription for up to 4 weeks or skip specific weeks. Simply manage this through your account dashboard.',
        category: 'Subscription'
      }
    }),
    prisma.faq.upsert({
      where: { id: 'faq-3' },
      update: {},
      create: {
        id: 'faq-3',
        question: 'Are the meals suitable for vegetarians?',
        answer: 'We offer both vegetarian and non-vegetarian options. You can choose your preference when selecting a meal plan.',
        category: 'Dietary'
      }
    })
  ])

  console.log('✅ FAQs created')

  // Create service areas
  const serviceAreas = await Promise.all([
    prisma.serviceArea.upsert({
      where: { id: 'area-1' },
      update: {},
      create: {
        id: 'area-1',
        city: 'Nagpur',
        pincode: '440001',
        active: true
      }
    }),
    prisma.serviceArea.upsert({
      where: { id: 'area-2' },
      update: {},
      create: {
        id: 'area-2',
        city: 'Delhi',
        pincode: '110001',
        active: true
      }
    }),
    prisma.serviceArea.upsert({
      where: { id: 'area-3' },
      update: {},
      create: {
        id: 'area-3',
        city: 'Bangalore',
        pincode: '560001',
        active: true
      }
    })
  ])

  console.log('✅ Service areas created')

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
