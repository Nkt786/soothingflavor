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
  } catch (error) {
    console.error('Dashboard KPIs error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
