'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Search, Filter, Download, Eye, CheckCircle, XCircle, Clock, Truck, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { api } from '@/lib/api'
import { withParams } from '@/lib/url'
import { toast } from 'sonner'
import { OrdersTable } from '@/components/admin/OrdersTable'
import { OrderDetailDrawer } from '@/components/admin/OrderDetailDrawer'

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const queryClient = useQueryClient()

  const { data: ordersData, isLoading } = useQuery({
    queryKey: ['admin-orders', searchQuery, statusFilter],
    queryFn: async () => {
      const response = await api.get(withParams('/api/admin/orders', {
        search: searchQuery,
        status: statusFilter
      })) as any
      return response
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  })

  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const response = await api.patch(`/api/admin/orders/${orderId}/status`, { status }) as any
      return response
    },
    onSuccess: (data, variables) => {
      toast.success(`Order status updated to ${variables.status}`)
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update order status')
    },
  })

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
    setIsDetailDrawerOpen(true)
  }

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    await updateOrderStatusMutation.mutateAsync({ orderId, status: newStatus })
  }

  const handleExport = () => {
    // Implement CSV export
    console.log('Exporting orders...')
  }

  const orders = ordersData?.orders || []

  const getStatusStats = () => {
    const stats = {
      NEW: 0,
      ACCEPTED: 0,
      PREPARING: 0,
      OUT_FOR_DELIVERY: 0,
      DELIVERED: 0,
      DECLINED: 0,
      CANCELLED: 0,
    }

    orders.forEach((order: any) => {
      if (stats.hasOwnProperty(order.status)) {
        stats[order.status as keyof typeof stats]++
      }
    })

    return stats
  }

  const statusStats = getStatusStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">Manage customer orders and track fulfillment</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-900">{statusStats.NEW}</div>
                <div className="text-sm text-blue-700">New</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-900">{statusStats.ACCEPTED}</div>
                <div className="text-sm text-yellow-700">Accepted</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-orange-900">{statusStats.PREPARING}</div>
                <div className="text-sm text-orange-700">Preparing</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-900">{statusStats.OUT_FOR_DELIVERY}</div>
                <div className="text-sm text-purple-700">Out for Delivery</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-900">{statusStats.DELIVERED}</div>
                <div className="text-sm text-green-700">Delivered</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-900">{statusStats.DECLINED}</div>
                <div className="text-sm text-red-700">Declined</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-5 w-5 text-gray-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{statusStats.CANCELLED}</div>
                <div className="text-sm text-gray-700">Cancelled</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search orders, customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="NEW">New</SelectItem>
                <SelectItem value="ACCEPTED">Accepted</SelectItem>
                <SelectItem value="PREPARING">Preparing</SelectItem>
                <SelectItem value="OUT_FOR_DELIVERY">Out for Delivery</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="DECLINED">Declined</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({orders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <OrdersTable
            orders={orders}
            isLoading={isLoading}
            onViewOrder={handleViewOrder}
            onStatusUpdate={handleStatusUpdate}
          />
        </CardContent>
      </Card>

      {/* Order Detail Drawer */}
      {isDetailDrawerOpen && selectedOrder && (
        <OrderDetailDrawer
          order={selectedOrder}
          isOpen={isDetailDrawerOpen}
          onClose={() => {
            setIsDetailDrawerOpen(false)
            setSelectedOrder(null)
          }}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  )
}
