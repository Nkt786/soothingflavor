'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { useCartStore } from '@/lib/store/cart'

interface PlaceOrderButtonProps {
  customer: {
    fullName: string
    email?: string
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
          email: customer.email || '',
          phone: customer.phone,
          address: customer.address,
          deliveryNotes: customer.deliveryNotes || '',
        },
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          slug: item.slug,
          image: item.image,
          veg: item.veg,
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

      // Call the orders API to format the message
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        const errorMessage = data?.message || data?.error || "Order failed";
        console.error("Order API error:", errorMessage);
        throw new Error(errorMessage);
      }
      
      // Clear cart after successful order processing
      clearCart?.();
      
      // Format WhatsApp message and redirect
      const whatsappMessage = encodeURIComponent(data.whatsappMessage || JSON.stringify(orderPayload, null, 2));
      const whatsappNumber = data.whatsappNumber || "917709811319";
      
      toast.success("Redirecting to WhatsApp to complete your order...");
      
      // Redirect to WhatsApp
      window.location.href = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    } catch (e) {
      console.error("PLACE_ORDER_FAIL", e);
      toast.error("Could not process order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Button
      type="button"
      onClick={handlePlaceOrder}
      disabled={isSubmitting || disabled}
      className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Processing Order...
        </>
      ) : (
        `Place Order - ₹${pricing.total}`
      )}
    </Button>
  )
}