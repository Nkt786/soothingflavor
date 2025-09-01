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
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Truck, 
  Package,
  MoreHorizontal
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
  items: Array<{
    product: {
      name: string
      images: string[]
    }
    qty: number
    price: number
  }>
  notes: string
  internalNotes: string
  createdAt: string
  updatedAt: string
}

interface OrdersTableProps {
  orders: Order[]
  isLoading: boolean
  onViewOrder: (order: Order) => void
  onStatusUpdate: (orderId: string, status: string) => Promise<void>
}

export function OrdersTable({ orders, isLoading, onViewOrder, onStatusUpdate }: OrdersTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      NEW: { variant: 'default' as const, className: 'bg-blue-100 text-blue-800 border-blue-200' },
      ACCEPTED: { variant: 'default' as const, className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
      PREPARING: { variant: 'default' as const, className: 'bg-orange-100 text-orange-800 border-orange-200' },
      OUT_FOR_DELIVERY: { variant: 'default' as const, className: 'bg-purple-100 text-purple-800 border-purple-200' },
      DELIVERED: { variant: 'default' as const, className: 'bg-green-100 text-green-800 border-green-200' },
      DECLINED: { variant: 'destructive' as const, className: 'bg-red-100 text-red-800 border-red-200' },
      CANCELLED: { variant: 'secondary' as const, className: 'bg-gray-100 text-gray-800 border-gray-200' },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.NEW
    return (
      <Badge variant={config.variant} className={config.className}>
        {status.replace('_', ' ')}
      </Badge>
    )
  }

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
      PAID: { variant: 'default' as const, className: 'bg-green-100 text-green-800 border-green-200' },
      REFUNDED: { variant: 'destructive' as const, className: 'bg-red-100 text-red-800 border-red-200' },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING
    return (
      <Badge variant={config.variant} className={config.className}>
        {status}
      </Badge>
    )
  }

  const getAvailableActions = (order: Order) => {
    const actions = []
    
    switch (order.status) {
      case 'NEW':
        actions.push(
          { label: 'Accept', action: 'ACCEPTED', icon: CheckCircle, className: 'text-green-600' },
          { label: 'Decline', action: 'DECLINED', icon: XCircle, className: 'text-red-600' }
        )
        break
      case 'ACCEPTED':
        actions.push(
          { label: 'Mark Preparing', action: 'PREPARING', icon: Package, className: 'text-orange-600' }
        )
        break
      case 'PREPARING':
        actions.push(
          { label: 'Out for Delivery', action: 'OUT_FOR_DELIVERY', icon: Truck, className: 'text-purple-600' }
        )
        break
      case 'OUT_FOR_DELIVERY':
        actions.push(
          { label: 'Mark Delivered', action: 'DELIVERED', icon: CheckCircle, className: 'text-green-600' }
        )
        break
    }

    return actions
  }

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'orderNumber',
      header: 'Order #',
      cell: ({ row }) => (
        <span className="font-mono font-medium">{row.getValue('orderNumber')}</span>
      ),
    },
    {
      accessorKey: 'customerName',
      header: 'Customer',
      cell: ({ row }) => {
        const order = row.original
        return (
          <div>
            <div className="font-medium">{order.customerName}</div>
            <div className="text-sm text-gray-500">{order.customerEmail}</div>
            <div className="text-sm text-gray-500">{order.phone}</div>
          </div>
        )
      },
    },
    {
      accessorKey: 'items',
      header: 'Items',
      cell: ({ row }) => {
        const items = row.getValue('items') as Order['items']
        return (
          <div className="text-sm">
            <div className="font-medium">{items.length} items</div>
            <div className="text-gray-500">
              {items.slice(0, 2).map((item, index) => (
                <div key={index}>
                  {item.qty}x {item.product.name}
                </div>
              ))}
              {items.length > 2 && (
                <div className="text-gray-400">+{items.length - 2} more</div>
              )}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: ({ row }) => {
        const order = row.original
        return (
          <div>
            <div className="font-medium">₹{order.total.toLocaleString()}</div>
            {order.discount > 0 && (
              <div className="text-sm text-green-600">
                -₹{order.discount.toLocaleString()} discount
              </div>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => getStatusBadge(row.getValue('status')),
    },
    {
      accessorKey: 'paymentStatus',
      header: 'Payment',
      cell: ({ row }) => getPaymentStatusBadge(row.getValue('paymentStatus')),
    },
    {
      accessorKey: 'createdAt',
      header: 'Placed At',
      cell: ({ row }) => (
        <div className="text-sm">
          <div>{new Date(row.getValue('createdAt')).toLocaleDateString()}</div>
          <div className="text-gray-500">
            {new Date(row.getValue('createdAt')).toLocaleTimeString()}
          </div>
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const order = row.original
        const availableActions = getAvailableActions(order)
        
        return (
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onViewOrder(order)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            
            {availableActions.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {availableActions.map((action) => (
                    <DropdownMenuItem
                      key={action.action}
                      onClick={() => onStatusUpdate(order.id, action.action)}
                      className={action.className}
                    >
                      <action.icon className="h-4 w-4 mr-2" />
                      {action.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: orders,
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
            <div className="h-6 bg-gray-200 rounded w-20"></div>
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
                  No orders found.
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
