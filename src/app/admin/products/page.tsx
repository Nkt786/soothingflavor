'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Plus, Search, Filter, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProductsTable } from '@/components/admin/ProductsTable'
import { ProductForm } from '@/components/admin/ProductForm'
import { api } from '@/lib/api'
import { withParams } from '@/lib/url'

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)

  const { data: products, isLoading } = useQuery({
    queryKey: ['admin-products', searchQuery, categoryFilter, statusFilter],
    queryFn: async () => {
      const response = await api.get(withParams('/api/admin/products', {
        search: searchQuery,
        category: categoryFilter,
        status: statusFilter
      })) as any
      return response
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  })

  const { data: categories } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: async () => {
      const response = await api.get('/api/admin/categories') as any
      return response
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  })

  const handleEdit = (product: any) => {
    setEditingProduct(product)
    setIsFormOpen(true)
  }

  const handleDuplicate = (product: any) => {
    const duplicatedProduct = {
      ...product,
      id: undefined,
      name: `${product.name} (Copy)`,
      slug: `${product.slug}-copy`,
      isActive: false
    }
    setEditingProduct(duplicatedProduct)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingProduct(null)
  }

  const handleExport = () => {
    // Implement CSV export
    console.log('Exporting products...')
  }

  const filteredProducts = products?.filter((product: any) => {
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (categoryFilter && product.categoryId !== categoryFilter) {
      return false
    }
    if (statusFilter && product.isActive !== (statusFilter === 'active')) {
      return false
    }
    return true
  }) || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog and inventory</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">All Categories</option>
              {categories?.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductsTable
            products={filteredProducts}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDuplicate={handleDuplicate}
          />
        </CardContent>
      </Card>

      {/* Product Form Modal */}
      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          categories={categories || []}
          onClose={handleFormClose}
        />
      )}
    </div>
  )
}
