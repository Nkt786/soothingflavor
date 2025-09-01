'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const stockMovementSchema = z.object({
  qty: z.number().positive('Quantity must be positive'),
  reason: z.enum(['PURCHASE', 'ADJUSTMENT', 'ORDER', 'RETURN', 'WASTAGE']),
  note: z.string().min(1, 'Note is required'),
})

type StockMovementFormData = z.infer<typeof stockMovementSchema>

interface StockMovementFormProps {
  isOpen: boolean
  onClose: () => void
  item: {
    id: string
    sku: string
    product: {
      name: string
      images: string[]
    }
    stockQty: number
    unit: string
  }
  type: 'in' | 'out'
  onSubmit: (data: StockMovementFormData) => Promise<void>
}

export function StockMovementForm({ 
  isOpen, 
  onClose, 
  item, 
  type, 
  onSubmit 
}: StockMovementFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [qty, setQty] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<StockMovementFormData>({
    resolver: zodResolver(stockMovementSchema),
    defaultValues: {
      reason: 'PURCHASE',
      note: '',
    },
  })

  const watchedReason = watch('reason')

  const handleQtyChange = (value: string) => {
    const numValue = parseInt(value) || 0
    setQty(value)
    setValue('qty', numValue)
  }

  const handleFormSubmit = async (data: StockMovementFormData) => {
    try {
      setIsSubmitting(true)
      await onSubmit(data)
      reset()
      setQty('')
      onClose()
    } catch (error) {
      console.error('Stock movement error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    reset()
    setQty('')
    onClose()
  }

  const getReasonLabel = (reason: string) => {
    switch (reason) {
      case 'PURCHASE': return 'Purchase/Stock In'
      case 'ADJUSTMENT': return 'Stock Adjustment'
      case 'ORDER': return 'Order Fulfillment'
      case 'RETURN': return 'Customer Return'
      case 'WASTAGE': return 'Wastage/Loss'
      default: return reason
    }
  }

  const getReasonDescription = (reason: string) => {
    switch (reason) {
      case 'PURCHASE': return 'New stock received from supplier'
      case 'ADJUSTMENT': 'Manual stock correction or adjustment'
      case 'ORDER': return 'Stock used for customer order'
      case 'RETURN': return 'Customer returned product'
      case 'WASTAGE': return 'Product expired, damaged, or lost'
      default: return ''
    }
  }

  const getReasonIcon = (reason: string) => {
    switch (reason) {
      case 'PURCHASE': return <Plus className="h-4 w-4 text-green-600" />
      case 'ADJUSTMENT': return <div className="h-4 w-4 text-blue-600">⚙</div>
      case 'ORDER': return <Minus className="h-4 w-4 text-red-600" />
      case 'RETURN': return <Plus className="h-4 w-4 text-green-600" />
      case 'WASTAGE': return <Minus className="h-4 w-4 text-red-600" />
      default: return null
    }
  }

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'PURCHASE': return 'border-green-200 bg-green-50 text-green-800'
      case 'ADJUSTMENT': return 'border-blue-200 bg-blue-50 text-blue-800'
      case 'ORDER': return 'border-red-200 bg-red-50 text-red-800'
      case 'RETURN': return 'border-green-200 bg-green-50 text-green-800'
      case 'WASTAGE': return 'border-red-200 bg-red-50 text-red-800'
      default: return 'border-gray-200 bg-gray-50 text-gray-800'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {type === 'in' ? (
              <Plus className="h-5 w-5 text-green-600" />
            ) : (
              <Minus className="h-5 w-5 text-red-600" />
            )}
            <span>
              Stock {type === 'in' ? 'In' : 'Out'} - {item.product.name}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Info */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
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
            <div>
              <div className="font-medium">{item.product.name}</div>
              <div className="text-sm text-gray-600">SKU: {item.sku}</div>
              <div className="text-sm text-gray-600">
                Current Stock: {item.stockQty} {item.unit}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            {/* Quantity */}
            <div>
              <Label htmlFor="qty">
                Quantity ({type === 'in' ? 'Stock In' : 'Stock Out'})
              </Label>
              <Input
                id="qty"
                type="number"
                min="1"
                value={qty}
                onChange={(e) => handleQtyChange(e.target.value)}
                placeholder={`Enter quantity in ${item.unit}`}
                className="mt-1"
              />
              {errors.qty && (
                <p className="text-sm text-red-600 mt-1">{errors.qty.message}</p>
              )}
            </div>

            {/* Reason */}
            <div>
              <Label htmlFor="reason">Reason</Label>
              <Select 
                value={watchedReason} 
                onValueChange={(value) => setValue('reason', value as any)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {type === 'in' ? (
                    <>
                      <SelectItem value="PURCHASE">Purchase/Stock In</SelectItem>
                      <SelectItem value="RETURN">Customer Return</SelectItem>
                      <SelectItem value="ADJUSTMENT">Stock Adjustment</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="ORDER">Order Fulfillment</SelectItem>
                      <SelectItem value="WASTAGE">Wastage/Loss</SelectItem>
                      <SelectItem value="ADJUSTMENT">Stock Adjustment</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              {watchedReason && (
                <div className={`mt-2 p-2 rounded border ${getReasonColor(watchedReason)}`}>
                  <div className="flex items-center space-x-2 text-sm">
                    {getReasonIcon(watchedReason)}
                    <span className="font-medium">{getReasonLabel(watchedReason)}</span>
                  </div>
                  <p className="text-xs mt-1 opacity-80">
                    {getReasonDescription(watchedReason)}
                  </p>
                </div>
              )}
            </div>

            {/* Note */}
            <div>
              <Label htmlFor="note">Note</Label>
              <Textarea
                id="note"
                placeholder="Add a note explaining this stock movement..."
                className="mt-1"
                {...register('note')}
              />
              {errors.note && (
                <p className="text-sm text-red-600 mt-1">{errors.note.message}</p>
              )}
            </div>

            {/* Stock Preview */}
            {qty && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm font-medium text-blue-800">Stock Impact Preview</div>
                <div className="text-sm text-blue-600 mt-1">
                  Current: {item.stockQty} {item.unit}
                  <br />
                  {type === 'in' ? '+' : '-'} {qty} {item.unit}
                  <br />
                  <span className="font-medium">
                    New Total: {type === 'in' ? item.stockQty + parseInt(qty) : item.stockQty - parseInt(qty)} {item.unit}
                  </span>
                </div>
                {type === 'out' && parseInt(qty) > item.stockQty && (
                  <div className="text-sm text-red-600 mt-2 font-medium">
                    ⚠️ This will result in negative stock!
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !qty}
                className={type === 'in' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    {type === 'in' ? <Plus className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                    <span>Confirm {type === 'in' ? 'Stock In' : 'Stock Out'}</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
