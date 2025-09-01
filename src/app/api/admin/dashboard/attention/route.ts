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

    const attentionItems = []

    // Get NEW orders that need attention
    const newOrders = await prisma.order.findMany({
      where: {
        status: 'NEW',
      },
      select: {
        id: true,
        customerName: true,
        total: true,
        createdAt: true,
        status: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    })

    newOrders.forEach(order => {
      attentionItems.push({
        id: order.id,
        type: 'order',
        title: `New Order from ${order.customerName}`,
        description: `Order #${order.id.slice(-8)} - ₹${order.total}`,
        priority: 'high',
        createdAt: order.createdAt,
        status: order.status,
      })
    })

    // Get low stock items
    const lowStockItems = await prisma.inventory.findMany({
      where: {
        stockQty: {
          lte: prisma.inventory.fields.reorderLevel,
        },
      },
      include: {
        product: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        stockQty: 'asc',
      },
      take: 5,
    })

    lowStockItems.forEach(item => {
      const priority = item.stockQty === 0 ? 'high' : 
                     item.stockQty <= Math.ceil(item.reorderLevel / 2) ? 'medium' : 'low'
      
      attentionItems.push({
        id: item.productId,
        type: 'inventory',
        title: `Low Stock: ${item.product.name}`,
        description: `Current stock: ${item.stockQty} ${item.unit} (Reorder level: ${item.reorderLevel})`,
        priority,
        createdAt: new Date(), // Use current time for low stock alerts
        stockLevel: item.stockQty,
        reorderLevel: item.reorderLevel,
      })
    })

    // Get orders that have been in PREPARING status for too long (more than 2 hours)
    const twoHoursAgo = new Date()
    twoHoursAgo.setHours(twoHoursAgo.getHours() - 2)

    const longPreparingOrders = await prisma.order.findMany({
      where: {
        status: 'PREPARING',
        updatedAt: {
          lt: twoHoursAgo,
        },
      },
      select: {
        id: true,
        customerName: true,
        total: true,
        updatedAt: true,
        status: true,
      },
      orderBy: {
        updatedAt: 'asc',
      },
      take: 3,
    })

    longPreparingOrders.forEach(order => {
      attentionItems.push({
        id: order.id,
        type: 'order',
        title: `Order Stuck in Preparing: ${order.customerName}`,
        description: `Order #${order.id.slice(-8)} has been preparing for over 2 hours`,
        priority: 'medium',
        createdAt: order.updatedAt,
        status: order.status,
      })
    })

    // Sort by priority (high, medium, low) and then by creation time
    attentionItems.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
      if (priorityDiff !== 0) return priorityDiff
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    return NextResponse.json(attentionItems.slice(0, 10)) // Return top 10 items
  } catch (error) {
    console.error('Attention items error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch attention items' },
      { status: 500 }
    )
  }
}
