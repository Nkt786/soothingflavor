import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !['ADMIN', 'MANAGER'].includes(session.user?.role as string)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const product = await prisma.product.findUnique({
      where: { id: id },
      include: {
        category: true,
        inventory: true,
      },
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Product fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !['ADMIN', 'MANAGER'].includes(session.user?.role as string)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const {
      name,
      description,
      categoryId,
      priceMRP,
      priceSale,
      calories,
      protein,
      veg,
      isActive,
      tags,
      reorderLevel,
      unit,
      images,
    } = body

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: id },
    })

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Prepare update data
    const updateData: any = {}
    
    if (name !== undefined) updateData.name = name
    if (description !== undefined) updateData.description = description
    if (categoryId !== undefined) updateData.categoryId = categoryId
    if (priceMRP !== undefined) updateData.priceMRP = parseFloat(priceMRP)
    if (priceSale !== undefined) updateData.priceSale = priceSale ? parseFloat(priceSale) : null
    if (calories !== undefined) updateData.calories = calories ? parseInt(calories) : null
    if (protein !== undefined) updateData.protein = protein ? parseFloat(protein) : null
    if (veg !== undefined) updateData.veg = veg
    if (isActive !== undefined) updateData.isActive = isActive
    if (tags !== undefined) updateData.tags = tags
    if (images !== undefined) updateData.images = images

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: updateData,
    })

    // Update inventory if reorder level or unit changed
    if (reorderLevel !== undefined || unit !== undefined) {
      const inventoryUpdateData: any = {}
      if (reorderLevel !== undefined) inventoryUpdateData.reorderLevel = reorderLevel
      if (unit !== undefined) inventoryUpdateData.unit = unit

      await prisma.inventory.update({
        where: { productId: id },
        data: inventoryUpdateData,
      })
    }

    // Log audit
    await prisma.auditLog.create({
      data: {
        actorId: session.user?.id!,
        action: 'UPDATE',
        entity: 'PRODUCT',
        entityId: id,
        details: {
          changes: updateData,
        },
      },
    })

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('Product update error:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !['ADMIN'].includes(session.user?.role as string)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: id },
    })

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Check if product has orders
    const orderCount = await prisma.orderItem.count({
      where: { productId: id },
    })

    if (orderCount > 0) {
      return NextResponse.json(
        { error: 'Cannot delete product with existing orders' },
        { status: 400 }
      )
    }

    // Delete product (this will cascade to inventory and meal plan items)
    await prisma.product.delete({
      where: { id: id },
    })

    // Log audit
    await prisma.auditLog.create({
      data: {
        actorId: session.user?.id!,
        action: 'DELETE',
        entity: 'PRODUCT',
        entityId: id,
        details: {
          name: existingProduct.name,
        },
      },
    })

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Product delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
