import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const prisma = await getPrisma();
    if (!prisma) {
      // DB not available — return 404 so UI can fall back to localStorage
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const o = await prisma.order.findFirst({
      where: { OR: [{ id: params.id }, { orderNumber: params.id }] },
      include: { items: true },
    });
    if (!o) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    return NextResponse.json(o, { status: 200 });
  } catch (e: any) {
    console.error("ORDER_READ_ERROR", e?.message);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}
