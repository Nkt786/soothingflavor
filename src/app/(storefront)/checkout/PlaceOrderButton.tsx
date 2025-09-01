'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { useCartStore } from '@/lib/store/cart'

interface PlaceOrderButtonProps {
  customer: {
    fullName: string
    phone: string
    address: {
      line1: string
      line2?: string
      landmark?: string
      city: string
      pincode: string
    }
    deliveryNotes?: string
  }
  pricing: {
    subtotal: number
    deliveryCharge: number
    total: number
    distance?: number
  }
  paymentMethod: string
  disabled?: boolean
}

export default function PlaceOrderButton({
  customer,
  pricing,
  paymentMethod,
  disabled = false
}: PlaceOrderButtonProps) {
  const router = useRouter()
  const { items, clearCart } = useCartStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePlaceOrder = async () => {
    if (isSubmitting || disabled) return

    setIsSubmitting(true)

    try {
      // Validate cart has items
      if (items.length === 0) {
        toast.error('Your cart is empty. Please add items before placing an order.')
        setIsSubmitting(false)
        return
      }

      // Build order payload
      const orderPayload = {
        customer: {
          fullName: customer.fullName,
          phone: customer.phone,
          address: customer.address,
          deliveryNotes: customer.deliveryNotes || '',
        },
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          type: item.type,
        })),
        pricing: {
          subtotal: pricing.subtotal,
          deliveryCharge: pricing.deliveryCharge,
          total: pricing.total,
          distance: pricing.distance || null,
        },
        paymentMethod,
      }

      console.log('Submitting order:', orderPayload)

      // Call the orders API
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
      const text = await res.text();
      if (!res.ok) throw new Error(text || "Order failed");
      const data = JSON.parse(text || "{}");
      const orderId = data?.orderId || data?.id || `SF-${Date.now()}`;

      try { localStorage.setItem("lastOrder", JSON.stringify({ ...orderPayload, orderId })); } catch {}
      clearCart?.();
      router.replace(`/order/success?orderId=${encodeURIComponent(orderId)}`);

    } catch (e) {
      console.error("PLACE_ORDER_FAIL", e);
      alert("Could not place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Button
      onClick={handlePlaceOrder}
      disabled={isSubmitting || disabled}
      className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Placing Order...
        </>
      ) : (
        `Place Order - ₹${pricing.total}`
      )}
    </Button>
  )
}
