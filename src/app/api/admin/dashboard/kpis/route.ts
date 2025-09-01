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

    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    // Start of today and yesterday
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const startOfYesterday = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate())
    
    // End of today and yesterday
    const endOfToday = new Date(startOfToday)
    endOfToday.setDate(endOfToday.getDate() + 1)
    const endOfYesterday = new Date(startOfYesterday)
    endOfYesterday.setDate(endOfYesterday.getDate() + 1)

    // Today's orders and revenue
    const todayOrders = await prisma.order.count({
      where: {
        createdAt: {
          gte: startOfToday,
          lt: endOfToday,
        },
      },
    })

    const todayRevenue = await prisma.order.aggregate({
      where: {
        createdAt: {
          gte: startOfToday,
          lt: endOfToday,
        },
        status: {
          not: 'CANCELLED',
        },
      },
      _sum: {
        total: true,
      },
    })

    // Yesterday's orders and revenue
    const yesterdayOrders = await prisma.order.count({
      where: {
        createdAt: {
          gte: startOfYesterday,
          lt: endOfYesterday,
        },
      },
    })

    const yesterdayRevenue = await prisma.order.aggregate({
      where: {
        createdAt: {
          gte: startOfYesterday,
          lt: endOfYesterday,
        },
        status: {
          not: 'CANCELLED',
        },
      },
      _sum: {
        total: true,
      },
    })

    // Calculate changes
    const ordersChange = yesterdayOrders > 0 
      ? Math.round(((todayOrders - yesterdayOrders) / yesterdayOrders) * 100)
      : 0

    const todayRevenueValue = todayRevenue._sum.total || 0
    const yesterdayRevenueValue = yesterdayRevenue._sum.total || 0
    const revenueChange = yesterdayRevenueValue > 0
      ? Math.round(((todayRevenueValue - yesterdayRevenueValue) / yesterdayRevenueValue) * 100)
      : 0

    // Pending approvals (NEW orders)
    const pendingApprovals = await prisma.order.count({
      where: {
        status: 'NEW',
      },
    })

    // Low stock count
    const lowStockCount = await prisma.inventory.count({
      where: {
        stockQty: {
          lte: prisma.inventory.fields.reorderLevel,
        },
      },
    })

    // Top products by order count (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const topProducts = await prisma.orderItem.groupBy({
      by: ['productId'],
      where: {
        order: {
          createdAt: {
            gte: thirtyDaysAgo,
          },
          status: {
            not: 'CANCELLED',
          },
        },
        productId: {
          not: null,
        },
      },
      _sum: {
        qty: true,
      },
      _count: {
        orderId: true,
      },
      orderBy: {
        _count: {
          orderId: 'desc',
        },
      },
      take: 5,
    })

    // Get product names for top products
    const topProductsWithNames = await Promise.all(
      topProducts.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId! },
          select: { name: true },
        })
        return {
          id: item.productId,
          name: product?.name || 'Unknown Product',
          orders: item._count.orderId,
          quantity: item._sum.qty || 0,
        }
      })
    )

    return NextResponse.json({
      todayOrders,
      ordersChange,
      todayRevenue: todayRevenueValue,
      revenueChange,
      pendingApprovals,
      lowStockCount,
      topProducts: topProductsWithNames,
    })
  } catch (error) {
    console.error('Dashboard KPIs error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
