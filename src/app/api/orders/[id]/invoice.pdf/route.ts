import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // For now, return a simple text response
    // In production, this would generate a proper PDF using a library like puppeteer or jsPDF
    const invoiceText = `
Order Invoice
Order ID: ${id}
Date: ${new Date().toLocaleDateString()}

Customer: Demo Customer
Phone: 9876543210
Address: 123 Demo Street, Nagpur - 440001

Items:
Demo Product 1 × 2 = ₹300
Demo Product 2 × 1 = ₹200

Subtotal: ₹500
Delivery: ₹50
Total: ₹550

Payment: Cash on Delivery
    `.trim()

    // Return as text for now (will be PDF in production)
    return new NextResponse(invoiceText, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename="invoice-${id}.txt"`
      }
    })
  } catch (error) {
    console.error('Error generating invoice:', error)
    return NextResponse.json(
      { error: 'Failed to generate invoice' },
      { status: 500 }
    )
  }
}
