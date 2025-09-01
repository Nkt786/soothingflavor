import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !['ADMIN', 'MANAGER', 'STAFF'].includes(session.user?.role as string)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const lowStock = searchParams.get('lowStock') === 'true'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { product: { name: { contains: search, mode: 'insensitive' } } },
        { sku: { contains: search, mode: 'insensitive' } },
      ]
    }
    
    if (lowStock) {
      where.stockQty = {
        lte: { reorderLevel: true }
      }
    }

    // Get inventory with product details and last movement
    const inventory = await prisma.inventory.findMany({
      where,
      include: {
        product: {
          select: {
            name: true,
            images: true,
            priceMRP: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        inventoryMovements: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
          select: {
            qty: true,
            reason: true,
            createdAt: true,
          },
        },
      },
      orderBy: [
        { stockQty: 'asc' }, // Low stock first
        { product: { name: 'asc' } },
      ],
      skip,
      take: limit,
    })

    // Get total count for pagination
    const total = await prisma.inventory.count({ where })

    // Transform data to match frontend expectations
    const transformedInventory = inventory.map((item) => ({
      id: item.id,
      sku: item.sku,
      product: {
        name: item.product.name,
        images: item.product.images || [],
        priceMRP: item.product.priceMRP,
        category: item.product.category?.name,
      },
      stockQty: item.stockQty,
      reorderLevel: item.reorderLevel,
      unit: item.unit,
      lastMovement: item.inventoryMovements[0] ? {
        qty: item.inventoryMovements[0].qty,
        reason: item.inventoryMovements[0].reason,
        createdAt: item.inventoryMovements[0].createdAt.toISOString(),
      } : undefined,
    }))

    return NextResponse.json({
      inventory: transformedInventory,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Inventory fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inventory' },
      { status: 500 }
    )
  }
}
