import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !['ADMIN', 'MANAGER', 'STAFF'].includes((session.user as any)?.role as string)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Return mock data for Netlify deployment without database
    const mockProducts = [
      {
        id: '1',
        name: 'Chicken Meal Box',
        priceMRP: 299,
        priceSale: 249,
        veg: false,
        status: 'ACTIVE',
        stock: 50,
        categories: ['Meal Boxes'],
        description: 'Protein-rich bowl with wholesome grains and seasonal veggies.',
        images: '/images/products/chicken-meal-box.jpg',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Deluxe Meal Plan',
        priceMRP: 12999,
        priceSale: 12499,
        veg: true,
        status: 'ACTIVE',
        stock: 25,
        categories: ['Meal Plans'],
        description: 'Premium lunch and dinner plan with freshly cooked meals.',
        images: '/images/products/deluxe-meal-plan.jpg',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Regular Meal Plan',
        priceMRP: 5999,
        priceSale: 5499,
        veg: true,
        status: 'ACTIVE',
        stock: 30,
        categories: ['Meal Plans'],
        description: 'Flexible meal plan offering lunch or dinner.',
        images: '/images/products/regular-meal-plan.jpg',
        createdAt: new Date().toISOString()
      }
    ]

    return NextResponse.json(mockProducts)
  } catch (error) {
    console.error('Admin products error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !['ADMIN', 'MANAGER'].includes(session.user?.role as string)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      description,
      categoryId,
      priceMRP,
      priceSale,
      calories,
      protein,
      veg,
      isActive,
      tags,
      reorderLevel,
      unit,
      images,
    } = body

    // Validate required fields
    if (!name || !categoryId || !priceMRP) {
      return NextResponse.json(
        { error: 'Name, category, and price are required' },
        { status: 400 }
      )
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // This section would typically involve database operations
    // For now, we'll just return a placeholder response
    console.log('Mock product creation:', {
      name,
      slug,
      categoryId,
      priceMRP,
      priceSale,
      calories,
      protein,
      veg,
      isActive,
      tags,
      reorderLevel,
      unit,
      images,
    })

    return NextResponse.json({ message: 'Product created (mock)' }, { status: 201 })
  } catch (error) {
    console.error('Product creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
