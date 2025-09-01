import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !['ADMIN', 'MANAGER', 'STAFF'].includes(session.user?.role as string)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params
    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      )
    }

    // Validate status transition
    const validStatuses = ['NEW', 'ACCEPTED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'DECLINED', 'CANCELLED']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    // Get current order with items
    const currentOrder = await prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
      },
    })

    if (!currentOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Check if status transition is valid
    const currentStatus = currentOrder.status
    const isValidTransition = validateStatusTransition(currentStatus, status)
    
    if (!isValidTransition) {
      return NextResponse.json(
        { error: `Invalid status transition from ${currentStatus} to ${status}` },
        { status: 400 }
      )
    }

    // Use transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Update order status
      const updatedOrder = await tx.order.update({
        where: { id },
        data: {
          status,
          updatedAt: new Date(),
        },
      })

      // Handle inventory adjustments based on status change
      if (status === 'ACCEPTED' && currentStatus === 'NEW') {
        // Reserve stock for accepted orders
        for (const item of currentOrder.items) {
          await tx.inventory.update({
            where: { productId: item.productId },
            data: {
              stockQty: {
                decrement: item.qty,
              },
            },
          })

          // Log inventory movement
          await tx.inventoryMovement.create({
            data: {
              productId: item.productId,
              qty: -item.qty, // Negative for stock out
              reason: 'ORDER',
              refId: id,
              note: `Order ${currentOrder.orderNumber} accepted`,
              actorId: session.user?.id as string,
            },
          })
        }
      } else if ((status === 'DECLINED' || status === 'CANCELLED') && 
                 (currentStatus === 'ACCEPTED' || currentStatus === 'PREPARING')) {
        // Restore stock for declined/cancelled orders if stock was reserved
        for (const item of currentOrder.items) {
          await tx.inventory.update({
            where: { productId: item.productId },
            data: {
              stockQty: {
                increment: item.qty,
              },
            },
          })

          // Log inventory movement
          await tx.inventoryMovement.create({
            data: {
              productId: item.productId,
              qty: item.qty, // Positive for stock in
              reason: 'RETURN',
              refId: id,
              note: `Order ${currentOrder.orderNumber} ${status.toLowerCase()}`,
              actorId: session.user?.id as string,
            },
          })
        }
      }

      // Create audit log
      await tx.auditLog.create({
        data: {
          actorId: session.user?.id as string,
          action: 'ORDER_STATUS_UPDATE',
          entity: 'ORDER',
          entityId: id,
          details: {
            orderNumber: currentOrder.orderNumber,
            previousStatus: currentStatus,
            newStatus: status,
            customerName: currentOrder.customerName,
          },
        },
      })

      return updatedOrder
    })

    return NextResponse.json({
      message: 'Order status updated successfully',
      order: result,
    })
  } catch (error) {
    console.error('Order status update error:', error)
    return NextResponse.json(
      { error: 'Failed to update order status' },
      { status: 500 }
    )
  }
}

function validateStatusTransition(currentStatus: string, newStatus: string): boolean {
  const validTransitions: Record<string, string[]> = {
    NEW: ['ACCEPTED', 'DECLINED', 'CANCELLED'],
    ACCEPTED: ['PREPARING', 'DECLINED', 'CANCELLED'],
    PREPARING: ['OUT_FOR_DELIVERY', 'DECLINED', 'CANCELLED'],
    OUT_FOR_DELIVERY: ['DELIVERED', 'CANCELLED'],
    DELIVERED: [], // Terminal state
    DECLINED: [], // Terminal state
    CANCELLED: [], // Terminal state
  }

  const allowedTransitions = validTransitions[currentStatus] || []
  return allowedTransitions.includes(newStatus)
}
