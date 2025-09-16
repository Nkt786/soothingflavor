import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    // Database removed for demo purposes - return mock data
    const mockOrder = {
      id: id,
      orderNumber: `ORD-${id}`,
      status: 'placed',
      createdAt: new Date().toISOString(),
      items: [
        { id: '1', name: 'Demo Product 1', quantity: 2, price: 150 },
        { id: '2', name: 'Demo Product 2', quantity: 1, price: 200 }
      ],
      customer: {
        fullName: 'Demo Customer',
        phone: '9876543210',
        address: {
          line1: '123 Demo Street',
          city: 'Nagpur',
          pincode: '440001'
        }
      },
      total: 500,
      deliveryCharge: 50
    };
    
    return NextResponse.json(mockOrder, { status: 200 });
  } catch (e: unknown) {
    console.error("ORDER_READ_ERROR", e instanceof Error ? e.message : 'Unknown error');
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}
