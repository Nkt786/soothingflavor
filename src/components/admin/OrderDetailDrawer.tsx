'use client'

import { useState } from 'react'
import { 
  X, 
  User, 
  Phone, 
  MapPin, 
  Package, 
  CreditCard, 
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Package as PackageIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

interface OrderItem {
  product: {
    name: string
    images: string[]
  }
  qty: number
  price: number
}

interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  phone: string
  address: string
  status: string
  paymentStatus: string
  subtotal: number
  discount: number
  total: number
  items: OrderItem[]
  notes: string
  internalNotes: string
  createdAt: string
  updatedAt: string
}

interface OrderDetailDrawerProps {
  order: Order
  isOpen: boolean
  onClose: () => void
  onStatusUpdate: (orderId: string, status: string) => Promise<void>
}

export function OrderDetailDrawer({ 
  order, 
  isOpen, 
  onClose, 
  onStatusUpdate 
}: OrderDetailDrawerProps) {
  const [internalNote, setInternalNote] = useState(order.internalNotes || '')
  const [isUpdating, setIsUpdating] = useState(false)

  const getStatusConfig = (status: string) => {
    const configs = {
      NEW: { 
        label: 'New', 
        icon: Clock, 
        className: 'bg-blue-100 text-blue-800 border-blue-200',
        description: 'Order received, awaiting approval'
      },
      ACCEPTED: { 
        label: 'Accepted', 
        icon: CheckCircle, 
        className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        description: 'Order approved, preparing to fulfill'
      },
      PREPARING: { 
        label: 'Preparing', 
        icon: PackageIcon, 
        className: 'bg-orange-100 text-orange-800 border-orange-200',
        description: 'Order is being prepared'
      },
      OUT_FOR_DELIVERY: { 
        label: 'Out for Delivery', 
        icon: Truck, 
        className: 'bg-purple-100 text-purple-800 border-purple-200',
        description: 'Order is on its way'
      },
      DELIVERED: { 
        label: 'Delivered', 
        icon: CheckCircle, 
        className: 'bg-green-100 text-green-800 border-green-200',
        description: 'Order successfully delivered'
      },
      DECLINED: { 
        label: 'Declined', 
        icon: XCircle, 
        className: 'bg-red-100 text-red-800 border-red-200',
        description: 'Order was declined'
      },
      CANCELLED: { 
        label: 'Cancelled', 
        icon: XCircle, 
        className: 'bg-gray-100 text-gray-800 border-gray-200',
        description: 'Order was cancelled'
      },
    }

    return configs[status as keyof typeof configs] || configs.NEW
  }

  const getPaymentStatusConfig = (status: string) => {
    const configs = {
      PENDING: { 
        label: 'Pending', 
        className: 'bg-yellow-100 text-yellow-800 border-yellow-200' 
      },
      PAID: { 
        label: 'Paid', 
        className: 'bg-green-100 text-green-800 border-green-200' 
      },
      REFUNDED: { 
        label: 'Refunded', 
        className: 'bg-red-100 text-red-800 border-red-200' 
      },
    }

    return configs[status as keyof typeof configs] || configs.PENDING
  }

  const getAvailableActions = () => {
    const actions = []
    
    switch (order.status) {
      case 'NEW':
        actions.push(
          { label: 'Accept Order', action: 'ACCEPTED', icon: CheckCircle, className: 'bg-green-600 hover:bg-green-700' },
          { label: 'Decline Order', action: 'DECLINED', icon: XCircle, className: 'bg-red-600 hover:bg-red-700' }
        )
        break
      case 'ACCEPTED':
        actions.push(
          { label: 'Mark Preparing', action: 'PREPARING', icon: PackageIcon, className: 'bg-orange-600 hover:bg-orange-700' }
        )
        break
      case 'PREPARING':
        actions.push(
          { label: 'Out for Delivery', action: 'OUT_FOR_DELIVERY', icon: Truck, className: 'bg-purple-600 hover:bg-purple-700' }
        )
        break
      case 'OUT_FOR_DELIVERY':
        actions.push(
          { label: 'Mark Delivered', action: 'DELIVERED', icon: CheckCircle, className: 'bg-green-600 hover:bg-green-700' }
        )
        break
    }

    return actions
  }

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      setIsUpdating(true)
      await onStatusUpdate(order.id, newStatus)
    } finally {
      setIsUpdating(false)
    }
  }

  const statusConfig = getStatusConfig(order.status)
  const paymentConfig = getPaymentStatusConfig(order.paymentStatus)
  const availableActions = getAvailableActions()

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold">
              Order #{order.orderNumber}
            </SheetTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Status Badge */}
          <div className="flex items-center space-x-3">
            <Badge className={statusConfig.className}>
              <statusConfig.icon className="h-4 w-4 mr-2" />
              {statusConfig.label}
            </Badge>
            <Badge className={paymentConfig.className}>
              {paymentConfig.label}
            </Badge>
          </div>
          
          <p className="text-sm text-gray-600">{statusConfig.description}</p>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Customer Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Name</Label>
                <p className="text-sm">{order.customerName}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Email</Label>
                <p className="text-sm">{order.customerEmail}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Phone</Label>
                <p className="text-sm flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>{order.phone}</span>
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Address</Label>
                <p className="text-sm flex items-start space-x-2">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  <span>{order.address}</span>
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Order Items */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Order Items ({order.items.length})</span>
            </h3>
            
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                    {item.product.images.length > 0 ? (
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-gray-400 text-xs">No image</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{item.product.name}</div>
                    <div className="text-sm text-gray-600">
                      Qty: {item.qty} × ₹{item.price.toLocaleString()} = ₹{(item.qty * item.price).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Order Summary */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Order Summary</span>
            </h3>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span>₹{order.subtotal.toLocaleString()}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span>-₹{order.discount.toLocaleString()}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>₹{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Customer Notes */}
          {order.notes && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Customer Notes</Label>
                <p className="text-sm bg-blue-50 p-3 rounded-lg border border-blue-200">
                  {order.notes}
                </p>
              </div>
            </>
          )}

          {/* Internal Notes */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Internal Notes</Label>
            <Textarea
              value={internalNote}
              onChange={(e) => setInternalNote(e.target.value)}
              placeholder="Add internal notes about this order..."
              className="min-h-[80px]"
            />
          </div>

          {/* Order Timeline */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Order Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="text-sm">
                  <div className="font-medium">Order Placed</div>
                  <div className="text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
              {order.status !== 'NEW' && (
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="text-sm">
                    <div className="font-medium">Status Updated</div>
                    <div className="text-gray-500">
                      {new Date(order.updatedAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {availableActions.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Actions</h3>
              <div className="flex flex-wrap gap-3">
                {availableActions.map((action) => (
                  <Button
                    key={action.action}
                    onClick={() => handleStatusUpdate(action.action)}
                    disabled={isUpdating}
                    className={action.className}
                  >
                    <action.icon className="h-4 w-4 mr-2" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
