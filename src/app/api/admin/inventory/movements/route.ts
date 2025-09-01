import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !['ADMIN', 'MANAGER', 'STAFF'].includes(session.user?.role as string)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { inventoryId, qty, reason, note } = body

    if (!inventoryId || !qty || !reason || !note) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate qty is not zero
    if (qty === 0) {
      return NextResponse.json(
        { error: 'Quantity cannot be zero' },
        { status: 400 }
      )
    }

    // Get current inventory item
    const inventory = await prisma.inventory.findUnique({
      where: { id: inventoryId },
      include: {
        product: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!inventory) {
      return NextResponse.json(
        { error: 'Inventory item not found' },
        { status: 404 }
      )
    }

    // Check if stock out would result in negative stock
    if (qty < 0 && Math.abs(qty) > inventory.stockQty) {
      // Only allow negative stock for ADMIN users
      if (session.user?.role !== 'ADMIN') {
        return NextResponse.json(
          { error: 'Insufficient stock. Only admins can create negative stock.' },
          { status: 400 }
        )
      }
    }

    // Use transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Create inventory movement record
      const movement = await tx.inventoryMovement.create({
        data: {
          productId: inventory.productId,
          qty,
          reason,
          note,
          actorId: session.user?.id as string,
        },
      })

      // Update inventory stock quantity
      const updatedInventory = await tx.inventory.update({
        where: { id: inventoryId },
        data: {
          stockQty: {
            increment: qty,
          },
        },
      })

      // Create audit log
      await tx.auditLog.create({
        data: {
          actorId: session.user?.id as string,
          action: qty > 0 ? 'STOCK_IN' : 'STOCK_OUT',
          entity: 'INVENTORY',
          entityId: inventoryId,
          details: {
            productName: inventory.product.name,
            qty: Math.abs(qty),
            reason,
            note,
            previousStock: inventory.stockQty,
            newStock: updatedInventory.stockQty,
          },
        },
      })

      return { movement, updatedInventory }
    })

    return NextResponse.json({
      message: 'Stock movement recorded successfully',
      movement: result.movement,
      newStock: result.updatedInventory.stockQty,
    })
  } catch (error) {
    console.error('Stock movement error:', error)
    return NextResponse.json(
      { error: 'Failed to record stock movement' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !['ADMIN', 'MANAGER', 'STAFF'].includes(session.user?.role as string)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')
    const reason = searchParams.get('reason')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (productId) {
      where.productId = productId
    }
    
    if (reason) {
      where.reason = reason
    }
    
    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) {
        where.createdAt.gte = new Date(startDate)
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate)
      }
    }

    // Get movements with product and actor details
    const movements = await prisma.inventoryMovement.findMany({
      where,
      include: {
        product: {
          select: {
            name: true,
            sku: true,
          },
        },
        actor: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    })

    // Get total count for pagination
    const total = await prisma.inventoryMovement.count({ where })

    // Transform data for frontend
    const transformedMovements = movements.map((movement) => ({
      id: movement.id,
      qty: movement.qty,
      reason: movement.reason,
      note: movement.note,
      createdAt: movement.createdAt.toISOString(),
      product: {
        name: movement.product.name,
        sku: movement.product.sku,
      },
      actor: {
        name: movement.actor.name,
        email: movement.actor.email,
      },
    }))

    return NextResponse.json({
      movements: transformedMovements,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Movements fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch movements' },
      { status: 500 }
    )
  }
}
