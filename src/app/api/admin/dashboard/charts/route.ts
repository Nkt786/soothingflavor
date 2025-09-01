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
    const range = searchParams.get('range') || '7d'

    const today = new Date()
    let startDate: Date
    let days: number

    if (range === '30d') {
      startDate = new Date(today)
      startDate.setDate(startDate.getDate() - 30)
      days = 30
    } else {
      startDate = new Date(today)
      startDate.setDate(startDate.getDate() - 7)
      days = 7
    }

    // Generate date range
    const dateRange = []
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)
      dateRange.push(date)
    }

    // Get orders data for each date
    const ordersTrend = await Promise.all(
      dateRange.map(async (date) => {
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        const endOfDay = new Date(startOfDay)
        endOfDay.setDate(endOfDay.getDate() + 1)

        const orders = await prisma.order.count({
          where: {
            createdAt: {
              gte: startOfDay,
              lt: endOfDay,
            },
          },
        })

        const revenue = await prisma.order.aggregate({
          where: {
            createdAt: {
              gte: startOfDay,
              lt: endOfDay,
            },
            status: {
              not: 'CANCELLED',
            },
          },
          _sum: {
            total: true,
          },
        })

        return {
          date: startOfDay.toISOString().split('T')[0],
          orders,
          revenue: revenue._sum.total || 0,
        }
      })
    )

    // Get top categories by order count
    const topCategories = await prisma.orderItem.groupBy({
      by: ['productId'],
      where: {
        order: {
          createdAt: {
            gte: startDate,
          },
          status: {
            not: 'CANCELLED',
          },
        },
        productId: {
          not: null,
        },
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

    // Get category names and aggregate by category
    const categoryStats = new Map<string, { name: string; orders: number }>()

    for (const item of topCategories) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId! },
        include: { category: true },
      })

      if (product?.category) {
        const existing = categoryStats.get(product.category.id)
        if (existing) {
          existing.orders += item._count.orderId
        } else {
          categoryStats.set(product.category.id, {
            name: product.category.name,
            orders: item._count.orderId,
          })
        }
      }
    }

    const topCategoriesData = Array.from(categoryStats.values())
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 5)

    // Get stock movements (in vs out)
    const stockMovements = await prisma.inventoryMovement.groupBy({
      by: ['reason'],
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      _sum: {
        qty: true,
      },
    })

    const stockIns = stockMovements.find(m => m.reason === 'PURCHASE')?._sum.qty || 0
    const stockOuts = Math.abs(stockMovements.find(m => m.reason === 'ORDER')?._sum.qty || 0)

    return NextResponse.json({
      ordersTrend,
      revenueTrend: ordersTrend.map(item => ({
        date: item.date,
        revenue: item.revenue,
      })),
      topCategories: topCategoriesData,
      stockIns,
      stockOuts,
    })
  } catch (error) {
    console.error('Charts data error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch charts data' },
      { status: 500 }
    )
  }
}
