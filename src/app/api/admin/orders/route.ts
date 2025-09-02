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
    const mockOrders = [
      {
        id: '1',
        orderNumber: 'SF-1234567890',
        customerName: 'Anjali Sharma',
        customerEmail: 'anjali@example.com',
        phone: '9876543210',
        total: 12499,
        status: 'NEW',
        createdAt: new Date().toISOString(),
        items: [
          { productName: 'Deluxe Meal Plan', qty: 1, price: 12499 }
        ]
      },
      {
        id: '2',
        orderNumber: 'SF-1234567891',
        customerName: 'Priya Patel',
        customerEmail: 'priya@example.com',
        phone: '9876543211',
        total: 5499,
        status: 'PREPARING',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        items: [
          { productName: 'Regular Meal Plan', qty: 1, price: 5499 }
        ]
      },
      {
        id: '3',
        orderNumber: 'SF-1234567892',
        customerName: 'Rahul Kumar',
        customerEmail: 'rahul@example.com',
        phone: '9876543212',
        total: 4499,
        status: 'DELIVERED',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        items: [
          { productName: 'All Day Salad & Juice', qty: 1, price: 4499 }
        ]
      }
    ]

    return NextResponse.json(mockOrders)
  } catch (error) {
    console.error('Admin orders error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
