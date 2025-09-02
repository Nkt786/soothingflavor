import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getPrisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !['ADMIN', 'MANAGER', 'STAFF'].includes((session.user as any)?.role as string)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const prisma = await getPrisma();
    if (!prisma) {
      // Return mock data if DB not available
      return NextResponse.json({
        todayOrders: 12,
        ordersChange: 15,
        todayRevenue: 8500,
        revenueChange: 8,
        pendingApprovals: 3,
        lowStockCount: 2,
        topProducts: [
          { id: '1', name: 'Chicken Meal Box', orders: 45, quantity: 67 },
          { id: '2', name: 'Deluxe Meal Plan', orders: 38, quantity: 42 },
          { id: '3', name: 'Regular Meal Plan', orders: 32, quantity: 35 },
          { id: '4', name: 'All Day Salad & Juice', orders: 28, quantity: 31 },
          { id: '5', name: 'Quinoa Power Bowl', orders: 25, quantity: 28 },
        ],
      })
    }

    // Get real data from database
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const [
      todayOrders,
      totalOrders,
      todayRevenue,
      totalRevenue,
      pendingOrders,
      lowStockProducts,
    ] = await Promise.all([
      prisma.order.count({
        where: { createdAt: { gte: today } }
      }),
      prisma.order.count(),
      prisma.order.aggregate({
        where: { createdAt: { gte: today } },
        _sum: { total: true }
      }),
      prisma.order.aggregate({
        _sum: { total: true }
      }),
      prisma.order.count({
        where: { status: "NEW" }
      }),
      prisma.inventory.count({
        where: { stockQty: { lte: 10 } }
      }),
    ]);

    const ordersChange = totalOrders > 0 ? Math.round((todayOrders / totalOrders) * 100) : 0;
    const revenueChange = (totalRevenue._sum.total || 0) > 0 ? 
      Math.round(((todayRevenue._sum.total || 0) / (totalRevenue._sum.total || 1)) * 100) : 0;

    // Get top products from order items
    const topProducts = await prisma.orderItem.groupBy({
      by: ['productName'],
      _sum: { qty: true },
      _count: { productName: true },
      orderBy: { _sum: { qty: true } },
      take: 5,
    });

    return NextResponse.json({
      todayOrders,
      ordersChange,
      todayRevenue: todayRevenue._sum.total || 0,
      revenueChange,
      pendingApprovals: pendingOrders,
      lowStockCount: lowStockProducts,
      topProducts: topProducts.map((product, index) => ({
        id: (index + 1).toString(),
        name: product.productName,
        orders: product._count.productName,
        quantity: product._sum.qty || 0,
      })),
    })
  } catch (error) {
    console.error('Dashboard KPIs error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
