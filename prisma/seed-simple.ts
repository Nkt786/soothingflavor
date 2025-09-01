import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding simple admin dashboard data...')

  // Create demo users
  const adminPassword = await bcrypt.hash('admin123', 12)
  const managerPassword = await bcrypt.hash('manager123', 12)
  const staffPassword = await bcrypt.hash('staff123', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@demo.local' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@demo.local',
      passwordHash: adminPassword,
      role: 'ADMIN' as any,
    },
  })

  const manager = await prisma.user.upsert({
    where: { email: 'manager@demo.com' },
    update: {},
    create: {
      name: 'Manager User',
      email: 'manager@demo.com',
      passwordHash: managerPassword,
      role: 'MANAGER' as any,
    },
  })

  const staff = await prisma.user.upsert({
    where: { email: 'staff@demo.com' },
    update: {},
    create: {
      name: 'Staff User',
      email: 'staff@demo.com',
      passwordHash: staffPassword,
      role: 'STAFF' as any,
    },
  })

  console.log('✅ Demo users created')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'fresh-bakes' },
      update: {},
      create: {
        slug: 'fresh-bakes',
        name: 'Fresh Bakes',
        description: 'Freshly baked breads and pastries',
        isActive: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'healthy-sauces' },
      update: {},
      create: {
        slug: 'healthy-sauces',
        name: 'Healthy Sauces',
        description: 'Nutritious and flavorful sauces',
        isActive: true,
      },
    }),
  ])

  console.log('✅ Categories created')

  // Create products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { slug: 'whole-grain-bread' },
      update: {},
      create: {
        name: 'Whole Grain Bread',
        slug: 'whole-grain-bread',
        description: 'Nutritious whole grain bread made with organic ingredients',
        categoryId: categories[0].id,
        images: JSON.stringify(['/images/placeholder.svg']),
        veg: true,
        priceMRP: 120,
        priceSale: 99,
        calories: 80,
        protein: 4,
        tags: JSON.stringify(['organic', 'whole-grain', 'healthy']),
        isActive: true,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'almond-butter' },
      update: {},
      create: {
        name: 'Almond Butter',
        slug: 'almond-butter',
        description: 'Creamy almond butter made from premium almonds',
        categoryId: categories[1].id,
        images: JSON.stringify(['/images/placeholder.svg']),
        veg: true,
        priceMRP: 450,
        priceSale: 399,
        calories: 180,
        protein: 7,
        tags: JSON.stringify(['organic', 'gluten-free', 'protein-rich']),
        isActive: true,
      },
    }),
  ])

  console.log('✅ Products created')

  // Create inventory
  await Promise.all([
    prisma.inventory.upsert({
      where: { productId: products[0].id },
      update: {},
      create: {
        productId: products[0].id,
        stockQty: 50,
        reorderLevel: 10,
        sku: 'WB001',
        unit: 'pcs',
      },
    }),
    prisma.inventory.upsert({
      where: { productId: products[1].id },
      update: {},
      create: {
        productId: products[1].id,
        stockQty: 25,
        reorderLevel: 5,
        sku: 'AB001',
        unit: 'pcs',
      },
    }),
  ])

  console.log('✅ Inventory created')

  console.log('🎉 Simple admin dashboard seeding completed!')
  console.log('\nDemo Accounts:')
  console.log('Admin: admin@demo.local / admin123')
  console.log('Manager: manager@demo.com / manager123')
  console.log('Staff: staff@demo.com / staff123')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
