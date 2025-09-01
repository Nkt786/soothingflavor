"use client";
import { useRouter } from "next/navigation";

export default function DevOrderTest() {
  const router = useRouter();
  const click = async () => {
    const res = await fetch("/api/orders", { method: "POST", body: JSON.stringify({ items: [], pricing: { subtotal: 0, total: 0 } }), headers: { "Content-Type": "application/json" } });
    const data = await res.json();
    router.replace(`/order/success?orderId=${encodeURIComponent(data.orderId || data.id)}`);
  };
  return <div className="p-6"><button className="px-4 py-2 rounded bg-emerald-600 text-white" onClick={click}>Test Order Redirect</button></div>;
}
