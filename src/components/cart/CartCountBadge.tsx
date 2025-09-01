"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/store/cart";

export default function CartCountBadge() {
  const { getItemCount } = useCartStore();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return null; // avoid SSR/client mismatch
  
  const count = Number(getItemCount?.() || 0);
  if (count <= 0) return null;
  
  return (
    <span
      className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
      aria-live="polite"
    >
      {count}
    </span>
  );
}
