'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  AlertTriangle, 
  Package, 
  ShoppingCart, 
  Clock,
  Eye
} from 'lucide-react'
import Link from 'next/link'

interface AttentionItem {
  id: string
  type: 'order' | 'inventory'
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  createdAt: string
  status?: string
  stockLevel?: number
  reorderLevel?: number
}

interface NeedAttentionListProps {
  items?: AttentionItem[]
  isLoading: boolean
}

export function NeedAttentionList({ items, isLoading }: NeedAttentionListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg animate-pulse">
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-48"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    )
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8">
        <Package className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">All caught up!</h3>
        <p className="mt-1 text-sm text-gray-500">No items need attention right now.</p>
      </div>
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-amber-100 text-amber-800'
      case 'low':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="h-5 w-5 text-blue-600" />
      case 'inventory':
        return <Package className="h-5 w-5 text-amber-600" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-600" />
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Card key={item.id} className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getTypeIcon(item.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {item.title}
                  </h4>
                  <Badge 
                    variant="secondary" 
                    className={getPriorityColor(item.priority)}
                  >
                    {item.priority}
                  </Badge>
                  {item.type === 'inventory' && item.stockLevel !== undefined && (
                    <Badge variant="outline" className="text-xs">
                      Stock: {item.stockLevel}
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeAgo(item.createdAt)}</span>
                    </div>
                    {item.status && (
                      <span className="capitalize">{item.status}</span>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    {item.type === 'order' && (
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/orders/${item.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>
                    )}
                    {item.type === 'inventory' && (
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/inventory?product=${item.id}`}>
                          <Package className="h-4 w-4 mr-1" />
                          Manage
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {items.length > 5 && (
        <div className="text-center pt-4">
          <Button variant="outline" size="sm">
            View All ({items.length})
          </Button>
        </div>
      )}
    </div>
  )
}
