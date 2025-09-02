'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Search, Filter, Download, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InventoryTable } from '@/components/admin/InventoryTable'
import { StockMovementForm } from '@/components/admin/StockMovementForm'
import { api } from '@/lib/api'
import { toast } from 'sonner'

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [lowStockFilter, setLowStockFilter] = useState(false)
  const [isMovementFormOpen, setIsMovementFormOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [movementType, setMovementType] = useState<'in' | 'out'>('in')
  const queryClient = useQueryClient()

  const { data: inventoryData, isLoading } = useQuery({
    queryKey: ['admin-inventory', searchQuery, lowStockFilter],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (searchQuery) params.append('search', searchQuery)
      if (lowStockFilter) params.append('lowStock', lowStockFilter.toString())
      
      const url = `/api/admin/inventory${params.toString() ? `?${params.toString()}` : ''}`
      const response = await api.get(url) as { inventory: any[]; pagination: any }
      return response
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  })

  const stockMovementMutation = useMutation({
    mutationFn: async (data: { inventoryId: string; qty: number; reason: string; note: string }) => {
      const response = await api.post('/api/admin/inventory/movements', data) as any
      return response
    },
    onSuccess: (data) => {
      toast.success(`Stock ${movementType === 'in' ? 'added' : 'removed'} successfully`)
      queryClient.invalidateQueries({ queryKey: ['admin-inventory'] })
      setIsMovementFormOpen(false)
      setSelectedItem(null)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to process stock movement')
    },
  })

  const handleStockIn = (item: any) => {
    setSelectedItem(item)
    setMovementType('in')
    setIsMovementFormOpen(true)
  }

  const handleStockOut = (item: any) => {
    setSelectedItem(item)
    setMovementType('out')
    setIsMovementFormOpen(true)
  }

  const handleFormClose = () => {
    setIsMovementFormOpen(false)
    setSelectedItem(null)
  }

  const handleStockMovement = async (data: { qty: number; reason: string; note: string }) => {
    if (!selectedItem) return
    
    const qty = movementType === 'in' ? data.qty : -data.qty
    
    await stockMovementMutation.mutateAsync({
      inventoryId: selectedItem.id,
      qty,
      reason: data.reason,
      note: data.note,
    })
  }

  const handleExport = () => {
    // Implement CSV export
    console.log('Exporting inventory...')
  }

  const inventory = inventoryData?.inventory || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-600 mt-1">Manage stock levels and track movements</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setIsMovementFormOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Stock Movement
          </Button>
        </div>
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
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="lowStock"
                checked={lowStockFilter}
                onChange={(e) => setLowStockFilter(e.target.checked)}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="lowStock" className="text-sm font-medium text-gray-700">
                Show only low stock items
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory ({inventory.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <InventoryTable
            inventory={inventory}
            isLoading={isLoading}
            onStockIn={handleStockIn}
            onStockOut={handleStockOut}
          />
        </CardContent>
      </Card>

      {/* Stock Movement Form Modal */}
      {isMovementFormOpen && selectedItem && (
        <StockMovementForm
          isOpen={isMovementFormOpen}
          onClose={handleFormClose}
          item={selectedItem}
          type={movementType}
          onSubmit={handleStockMovement}
        />
      )}
    </div>
  )
}
