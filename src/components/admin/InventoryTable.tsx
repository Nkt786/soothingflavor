'use client'

import { useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
} from '@tanstack/react-table'
import { 
  Plus, 
  Minus, 
  Eye,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'

interface InventoryItem {
  id: string
  sku: string
  product: {
    name: string
    images: string[]
    priceMRP: number
  }
  stockQty: number
  reorderLevel: number
  unit: string
  lastMovement?: {
    createdAt: string
    qty: number
    reason: string
  }
}

interface InventoryTableProps {
  inventory: InventoryItem[]
  isLoading: boolean
  onStockIn: (item: InventoryItem) => void
  onStockOut: (item: InventoryItem) => void
}

export function InventoryTable({ inventory, isLoading, onStockIn, onStockOut }: InventoryTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])

  const columns: ColumnDef<InventoryItem>[] = [
    {
      accessorKey: 'product',
      header: 'Product',
      cell: ({ row }) => {
        const product = row.getValue('product') as { name: string; images: string[] }
        const images = product.images || []
        return (
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
              {images.length > 0 ? (
                <img 
                  src={images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-gray-400 text-xs">No image</div>
              )}
            </div>
            <span className="font-medium">{product.name}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'sku',
      header: 'SKU',
      cell: ({ row }) => (
        <span className="font-mono text-sm text-gray-600">{row.getValue('sku')}</span>
      ),
    },
    {
      accessorKey: 'stockQty',
      header: 'In Stock',
      cell: ({ row }) => {
        const stockQty = row.getValue('stockQty') as number
        const reorderLevel = row.original.reorderLevel
        const isLowStock = stockQty <= reorderLevel
        const isOutOfStock = stockQty === 0
        
        return (
          <div className="flex items-center space-x-2">
            <span className={`font-medium ${isOutOfStock ? 'text-red-600' : isLowStock ? 'text-amber-600' : 'text-gray-900'}`}>
              {stockQty} {row.original.unit}
            </span>
            {isLowStock && (
              <Badge variant={isOutOfStock ? 'destructive' : 'secondary'} className="text-xs">
                {isOutOfStock ? 'Out of Stock' : 'Low Stock'}
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'reorderLevel',
      header: 'Reorder Level',
      cell: ({ row }) => (
        <span className="text-sm text-gray-600">{row.getValue('reorderLevel')} {row.original.unit}</span>
      ),
    },
    {
      accessorKey: 'lastMovement',
      header: 'Last Movement',
      cell: ({ row }) => {
        const lastMovement = row.getValue('lastMovement') as { createdAt: string; qty: number; reason: string } | undefined
        
        if (!lastMovement) {
          return <span className="text-sm text-gray-400">No movements</span>
        }

        const isStockIn = lastMovement.qty > 0
        const date = new Date(lastMovement.createdAt).toLocaleDateString()
        
        return (
          <div className="flex items-center space-x-2">
            {isStockIn ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
            <div className="text-sm">
              <div className="font-medium">
                {Math.abs(lastMovement.qty)} {row.original.unit}
              </div>
              <div className="text-gray-500">{date}</div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'value',
      header: 'Stock Value',
      cell: ({ row }) => {
        const stockQty = row.original.stockQty
        const price = row.original.product.priceMRP
        const value = stockQty * price
        
        return (
          <span className="font-medium">₹{value.toLocaleString()}</span>
        )
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const item = row.original
        
        return (
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onStockIn(item)}
              className="text-green-600 border-green-200 hover:bg-green-50"
            >
              <Plus className="h-4 w-4 mr-1" />
              Stock In
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onStockOut(item)}
              className="text-red-600 border-red-200 hover:bg-red-50"
              disabled={item.stockQty === 0}
            >
              <Minus className="h-4 w-4 mr-1" />
              Stock Out
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {/* TODO: View movement history */}}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: inventory,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  })

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg animate-pulse">
            <div className="w-12 h-12 bg-gray-200 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-6 bg-gray-200 rounded w-20"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No inventory items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{' '}
          of {table.getFilteredRowModel().rows.length} results
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
