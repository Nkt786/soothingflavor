import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'meal-boxes' },
      update: {},
      create: {
        name: 'Meal Boxes',
        slug: 'meal-boxes',
        description: 'Complete meal packages with protein, carbs, and vegetables',
        isActive: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'bowls' },
      update: {},
      create: {
        name: 'Bowls',
        slug: 'bowls',
        description: 'Nutritious grain bowls with fresh ingredients',
        isActive: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'wraps' },
      update: {},
      create: {
        name: 'Wraps',
        slug: 'wraps',
        description: 'Fresh and healthy wraps with whole grain tortillas',
        isActive: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'sandwiches' },
      update: {},
      create: {
        name: 'Sandwiches',
        slug: 'sandwiches',
        description: 'Wholesome sandwiches with fresh ingredients',
        isActive: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'salads' },
      update: {},
      create: {
        name: 'Salads',
        slug: 'salads',
        description: 'Fresh garden salads with light dressings',
        isActive: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'juices' },
      update: {},
      create: {
        name: 'Juices',
        slug: 'juices',
        description: 'Fresh fruit and vegetable juices',
        isActive: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'meal-plans' },
      update: {},
      create: {
        name: 'Meal Plans',
        slug: 'meal-plans',
        description: 'Subscription meal plans for different goals',
        isActive: true,
      },
    }),
  ])

  console.log('✅ Categories created')

  // Create products
  const products = await Promise.all([
    // Non-Veg Products
    prisma.product.upsert({
      where: { slug: 'chicken-meal-box' },
      update: {},
      create: {
        name: 'Chicken Meal Box',
        slug: 'chicken-meal-box',
        description: 'Protein-rich bowl with wholesome grains and seasonal veggies.',
        categoryId: categories.find(c => c.slug === 'meal-boxes')?.id,
        priceMRP: 299,
        priceSale: 249,
        calories: 450,
        protein: 35,
        veg: false,
        isActive: true,
        tags: ['high-protein', 'non-veg', 'meal-box'],
        images: ['/images/products/chicken-meal-box.jpg'],
      },
    }),
    prisma.product.upsert({
      where: { slug: 'chicken-fried-rice-bowl' },
      update: {},
      create: {
        name: 'Chicken Fried Rice Bowl',
        slug: 'chicken-fried-rice-bowl',
        description: 'Protein-rich bowl with wholesome grains and seasonal veggies.',
        categoryId: categories.find(c => c.slug === 'bowls')?.id,
        priceMRP: 239,
        priceSale: 239,
        calories: 420,
        protein: 28,
        veg: false,
        isActive: true,
        tags: ['high-protein', 'non-veg', 'bowl'],
        images: ['/images/products/chicken-fried-rice-bowl.jpg'],
      },
    }),
    prisma.product.upsert({
      where: { slug: 'tandoori-chicken-wrap' },
      update: {},
      create: {
        name: 'Tandoori Chicken Wrap',
        slug: 'tandoori-chicken-wrap',
        description: 'Grilled filling wrapped with fresh greens.',
        categoryId: categories.find(c => c.slug === 'wraps')?.id,
        priceMRP: 219,
        priceSale: 219,
        calories: 380,
        protein: 25,
        veg: false,
        isActive: true,
        tags: ['high-protein', 'non-veg', 'wrap'],
        images: ['/images/products/tandoori-chicken-wrap.jpg'],
      },
    }),
    // Veg Products
    prisma.product.upsert({
      where: { slug: 'quinoa-power-bowl' },
      update: {},
      create: {
        name: 'Quinoa Power Bowl',
        slug: 'quinoa-power-bowl',
        description: 'Protein-rich bowl with wholesome grains and seasonal veggies.',
        categoryId: categories.find(c => c.slug === 'bowls')?.id,
        priceMRP: 199,
        priceSale: 199,
        calories: 380,
        protein: 22,
        veg: true,
        isActive: true,
        tags: ['high-protein', 'veg', 'bowl'],
        images: ['/images/products/quinoa-power-bowl.jpg'],
      },
    }),
    prisma.product.upsert({
      where: { slug: 'veggie-wrap' },
      update: {},
      create: {
        name: 'Veggie Wrap',
        slug: 'veggie-wrap',
        description: 'Grilled filling wrapped with fresh greens.',
        categoryId: categories.find(c => c.slug === 'wraps')?.id,
        priceMRP: 179,
        priceSale: 179,
        calories: 320,
        protein: 18,
        veg: true,
        isActive: true,
        tags: ['veg', 'wrap'],
        images: ['/images/products/veggie-wrap.jpg'],
      },
    }),
    // Meal Plans
    prisma.product.upsert({
      where: { slug: 'deluxe-meal-plan' },
      update: {},
      create: {
        name: 'Deluxe Meal Plan',
        slug: 'deluxe-meal-plan',
        description: 'Premium lunch and dinner plan with freshly cooked, portion-controlled, macro-balanced meals using premium ingredients.',
        categoryId: categories.find(c => c.slug === 'meal-plans')?.id,
        priceMRP: 12999,
        priceSale: 12499,
        calories: 2000,
        protein: 120,
        veg: true,
        isActive: true,
        tags: ['meal-plan', 'premium', 'lunch-dinner'],
        images: ['/images/meal-plans/deluxe-meal-plan.jpg'],
      },
    }),
    prisma.product.upsert({
      where: { slug: 'regular-meal-plan' },
      update: {},
      create: {
        name: 'Regular Meal Plan',
        slug: 'regular-meal-plan',
        description: 'Flexible meal plan offering lunch or dinner with freshly cooked, portion-controlled, macro-balanced meals.',
        categoryId: categories.find(c => c.slug === 'meal-plans')?.id,
        priceMRP: 5999,
        priceSale: 5499,
        calories: 1800,
        protein: 90,
        veg: true,
        isActive: true,
        tags: ['meal-plan', 'flexible', 'lunch-or-dinner'],
        images: ['/images/meal-plans/regular-meal-plan.jpg'],
      },
    }),
    prisma.product.upsert({
      where: { slug: 'all-day-salad-juice' },
      update: {},
      create: {
        name: 'All Day Salad & Juice Plan',
        slug: 'all-day-salad-juice',
        description: 'Nutrient-rich vegetable and fruit salads with fresh juices, perfect for detox and healthy living.',
        categoryId: categories.find(c => c.slug === 'meal-plans')?.id,
        priceMRP: 4999,
        priceSale: 4499,
        calories: 1200,
        protein: 60,
        veg: true,
        isActive: true,
        tags: ['meal-plan', 'detox', 'salad-juice'],
        images: ['/images/meal-plans/salad-juice-plan.jpg'],
      },
    }),
  ])

  console.log('✅ Products created')

  // Create inventory for products
  await Promise.all(
    products.map(product =>
      prisma.inventory.upsert({
        where: { productId: product.id },
        update: {},
        create: {
          productId: product.id,
          stockQty: Math.floor(Math.random() * 50) + 10, // Random stock between 10-60
          reorderLevel: 10,
          sku: `SKU-${product.slug.toUpperCase()}`,
          unit: 'g',
        },
      })
    )
  )

  console.log('✅ Inventory created')

  // Create admin users
  const adminUsers = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@demo.local' },
      update: {},
      create: {
        name: 'Admin User',
        email: 'admin@demo.local',
        role: 'ADMIN',
      },
    }),
    prisma.user.upsert({
      where: { email: 'manager@demo.com' },
      update: {},
      create: {
        name: 'Manager User',
        email: 'manager@demo.com',
        role: 'MANAGER',
      },
    }),
    prisma.user.upsert({
      where: { email: 'staff@demo.com' },
      update: {},
      create: {
        name: 'Staff User',
        email: 'staff@demo.com',
        role: 'STAFF',
      },
    }),
  ])

  console.log('✅ Admin users created')

  // Create sample orders
  const sampleOrders = await Promise.all([
    prisma.order.create({
      data: {
        orderNumber: 'SF-1234567890',
        customerName: 'Anjali Sharma',
        customerEmail: 'anjali@example.com',
        phone: '9876543210',
        address: JSON.stringify({
          line1: '123 Main Street',
          city: 'Nagpur',
          pincode: '440001',
        }),
        status: 'NEW',
        paymentStatus: 'PENDING',
        subtotal: 12499,
        total: 12499,
        items: {
          create: [
            {
              productName: 'Deluxe Meal Plan',
              qty: 1,
              price: 12499,
              lineTotal: 12499,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        orderNumber: 'SF-1234567891',
        customerName: 'Priya Patel',
        customerEmail: 'priya@example.com',
        phone: '9876543211',
        address: JSON.stringify({
          line1: '456 Oak Avenue',
          city: 'Nagpur',
          pincode: '440002',
        }),
        status: 'PREPARING',
        paymentStatus: 'PAID',
        subtotal: 5499,
        total: 5499,
        items: {
          create: [
            {
              productName: 'Regular Meal Plan',
              qty: 1,
              price: 5499,
              lineTotal: 5499,
            },
          ],
        },
      },
    }),
  ])

  console.log('✅ Sample orders created')

  console.log('🎉 Database seeding completed successfully!')
  console.log('\n📋 Summary:')
  console.log(`- ${categories.length} categories created`)
  console.log(`- ${products.length} products created`)
  console.log(`- ${adminUsers.length} admin users created`)
  console.log(`- ${sampleOrders.length} sample orders created`)
  console.log('\n🔑 Admin Login Credentials:')
  console.log('- Email: admin@demo.local (ADMIN)')
  console.log('- Email: manager@demo.com (MANAGER)')
  console.log('- Email: staff@demo.com (STAFF)')
  console.log('\n💡 Note: These are demo users without passwords. Use NextAuth for real authentication.')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
