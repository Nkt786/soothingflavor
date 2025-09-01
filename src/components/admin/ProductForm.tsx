'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { X, Upload, Plus, Trash2 } from 'lucide-react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { api } from '@/lib/api'
import { toast } from '@/components/ui/use-toast'

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  categoryId: z.string().min(1, 'Category is required'),
  priceMRP: z.number().min(0, 'Price must be positive'),
  priceSale: z.number().min(0, 'Sale price must be positive').optional(),
  calories: z.number().min(0, 'Calories must be positive').optional(),
  protein: z.number().min(0, 'Protein must be positive').optional(),
  veg: z.boolean(),
  isActive: z.boolean(),
  tags: z.array(z.string()).default([]),
  reorderLevel: z.number().min(0, 'Reorder level must be positive').default(10),
  unit: z.string().default('g'),
})

type ProductFormData = z.infer<typeof productSchema>

interface ProductFormProps {
  product?: any
  categories: any[]
  onClose: () => void
}

export function ProductForm({ product, categories, onClose }: ProductFormProps) {
  const [activeTab, setActiveTab] = useState('basics')
  const [images, setImages] = useState<string[]>(product?.images || [])
  const [newTag, setNewTag] = useState('')
  const queryClient = useQueryClient()

  const isEditing = !!product

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      categoryId: product?.categoryId || '',
      priceMRP: product?.priceMRP || 0,
      priceSale: product?.priceSale || undefined,
      calories: product?.calories || undefined,
      protein: product?.protein || undefined,
      veg: product?.veg ?? true,
      isActive: product?.isActive ?? true,
      tags: product?.tags || [],
      reorderLevel: product?.reorderLevel || 10,
      unit: product?.unit || 'g',
    },
  })

  const createMutation = useMutation({
    mutationFn: (data: ProductFormData) => api.post('/api/admin/products', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] })
      toast({
        title: 'Success',
        description: 'Product created successfully',
      })
      onClose()
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to create product',
        variant: 'destructive',
      })
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: ProductFormData) => 
      api.patch(`/api/admin/products/${product.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] })
      toast({
        title: 'Success',
        description: 'Product updated successfully',
      })
      onClose()
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update product',
        variant: 'destructive',
      })
    },
  })

  const onSubmit = (data: ProductFormData) => {
    const productData = {
      ...data,
      images,
    }

    if (isEditing) {
      updateMutation.mutate(productData)
    } else {
      createMutation.mutate(productData)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // In a real app, you'd upload to a CDN/cloud storage
      // For now, we'll just create object URLs
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setImages(prev => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (newTag.trim() && !watch('tags').includes(newTag.trim())) {
      setValue('tags', [...watch('tags'), newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setValue('tags', watch('tags').filter(tag => tag !== tagToRemove))
  }

  const watchedTags = watch('tags')

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{isEditing ? 'Edit Product' : 'Add New Product'}</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basics">Basics</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="visibility">Visibility</TabsTrigger>
            </TabsList>

            {/* Basics Tab */}
            <TabsContent value="basics" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    {...register('name')}
                    placeholder="Enter product name"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoryId">Category *</Label>
                  <Select
                    value={watch('categoryId')}
                    onValueChange={(value) => setValue('categoryId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.categoryId && (
                    <p className="text-sm text-red-600">{errors.categoryId.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Enter product description"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="veg"
                  checked={watch('veg')}
                  onCheckedChange={(checked) => setValue('veg', checked as boolean)}
                />
                <Label htmlFor="veg">Vegetarian</Label>
              </div>
            </TabsContent>

            {/* Pricing Tab */}
            <TabsContent value="pricing" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priceMRP">MRP (₹) *</Label>
                  <Input
                    id="priceMRP"
                    type="number"
                    step="0.01"
                    {...register('priceMRP', { valueAsNumber: true })}
                    placeholder="0.00"
                  />
                  {errors.priceMRP && (
                    <p className="text-sm text-red-600">{errors.priceMRP.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priceSale">Sale Price (₹)</Label>
                  <Input
                    id="priceSale"
                    type="number"
                    step="0.01"
                    {...register('priceSale', { valueAsNumber: true })}
                    placeholder="0.00"
                  />
                  {errors.priceSale && (
                    <p className="text-sm text-red-600">{errors.priceSale.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reorderLevel">Reorder Level</Label>
                  <Input
                    id="reorderLevel"
                    type="number"
                    {...register('reorderLevel', { valueAsNumber: true })}
                    placeholder="10"
                  />
                  {errors.reorderLevel && (
                    <p className="text-sm text-red-600">{errors.reorderLevel.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select
                    value={watch('unit')}
                    onValueChange={(value) => setValue('unit', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="g">Grams (g)</SelectItem>
                      <SelectItem value="ml">Milliliters (ml)</SelectItem>
                      <SelectItem value="pcs">Pieces (pcs)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            {/* Nutrition Tab */}
            <TabsContent value="nutrition" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="calories">Calories (per 100g/ml)</Label>
                  <Input
                    id="calories"
                    type="number"
                    {...register('calories', { valueAsNumber: true })}
                    placeholder="0"
                  />
                  {errors.calories && (
                    <p className="text-sm text-red-600">{errors.calories.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="protein">Protein (g per 100g/ml)</Label>
                  <Input
                    id="protein"
                    type="number"
                    step="0.1"
                    {...register('protein', { valueAsNumber: true })}
                    placeholder="0.0"
                  />
                  {errors.protein && (
                    <p className="text-sm text-red-600">{errors.protein.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {watchedTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Images Tab */}
            <TabsContent value="images" className="space-y-4">
              <div className="space-y-2">
                <Label>Product Images</Label>
                <div className="grid grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <label className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-emerald-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="text-center">
                      <Upload className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">Add Image</p>
                    </div>
                  </label>
                </div>
              </div>
            </TabsContent>

            {/* Visibility Tab */}
            <TabsContent value="visibility" className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isActive"
                  checked={watch('isActive')}
                  onCheckedChange={(checked) => setValue('isActive', checked as boolean)}
                />
                <Label htmlFor="isActive">Active (visible on storefront)</Label>
              </div>
            </TabsContent>
          </Tabs>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : (isEditing ? 'Update Product' : 'Create Product')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
