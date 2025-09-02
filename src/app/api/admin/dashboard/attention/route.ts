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
    const attentionItems: any[] = [
      {
        id: '1',
        type: 'low_stock',
        title: 'Low Stock Alert',
        message: 'Chicken Meal Box is running low (5 units remaining)',
        priority: 'high',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        type: 'pending_order',
        title: 'New Order Received',
        message: 'Order #SF-1234567890 needs approval',
        priority: 'medium',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        type: 'delivery_issue',
        title: 'Delivery Delay',
        message: 'Order #SF-1234567891 delivery delayed due to weather',
        priority: 'medium',
        createdAt: new Date().toISOString()
      }
    ]

    return NextResponse.json(attentionItems)
  } catch (error) {
    console.error('Dashboard attention error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch attention items' },
      { status: 500 }
    )
  }
}
