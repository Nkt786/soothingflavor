"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

type OrderItem = { productName?: string; productId?: string; qty: number; price: number; lineTotal?: number };
type Order = { id?: string; orderNumber?: string; customerName?: string; total?: number; items?: OrderItem[] };

export default function OrderSuccess() {
  const sp = useSearchParams();
  const qId = sp.get("orderId") || sp.get("id") || "";
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let off = false;
    (async () => {
      setLoading(true);
      let data: Order | null = null;
      if (qId) {
        try { const r = await fetch(`/api/orders/${qId}`, { cache: "no-store" }); if (r.ok) data = await r.json(); } catch {}
      }
      if (!data) {
        try {
          const raw = localStorage.getItem("lastOrder");
          if (raw) {
            const snap = JSON.parse(raw);
            if (!qId || snap?.orderId === qId) data = { ...snap, orderNumber: snap?.orderId };
          }
        } catch {}
      }
      if (!off) { setOrder(data); setLoading(false); }
    })();
    return () => { off = true; };
  }, [qId]);

  if (loading) return <div className="max-w-2xl mx-auto p-6"><div className="animate-pulse h-24 bg-gray-200 rounded" /></div>;
  if (!order) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-semibold mb-2">Order not found</h1>
        <p className="text-gray-600 mb-6">If you just placed it, please try again.</p>
        <div className="flex gap-3 justify-center">
          <Link className="px-4 py-2 rounded-xl bg-emerald-600 text-white" href="/products">Browse Products</Link>
          <a className="px-4 py-2 rounded-xl border border-emerald-600 text-emerald-700" href="https://wa.me/917709811319">Chat on WhatsApp</a>
        </div>
      </div>
    );
  }
  const displayId = order.orderNumber || order.id || qId;
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="rounded-2xl bg-white shadow p-6">
        <h1 className="text-2xl font-bold mb-2">Thank you! Your order is placed.</h1>
        <p className="text-gray-700 mb-1"><span className="font-semibold">Order ID:</span> {displayId}</p>
        {order.customerName && <p className="text-gray-700 mb-1"><span className="font-semibold">Customer:</span> {order.customerName}</p>}
        {order.total != null && <p className="text-gray-700 mb-4"><span className="font-semibold">Total:</span> ₹{order.total}</p>}
        {Array.isArray(order.items) && order.items.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <h2 className="font-semibold mb-2">Items</h2>
            <ul className="space-y-1 text-gray-700">
              {order.items.map((it, i) => (
                <li key={i} className="flex justify-between">
                  <span>{it.qty} × {it.productName || it.productId}</span>
                  <span>₹{it.lineTotal ?? (it.qty * it.price)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-6 flex gap-3">
          <a className="px-4 py-2 rounded-xl bg-emerald-600 text-white" href="https://wa.me/917709811319">Order on WhatsApp</a>
          <Link className="px-4 py-2 rounded-xl border border-emerald-600 text-emerald-700" href="/products">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
