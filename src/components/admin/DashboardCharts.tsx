'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function DashboardCharts() {
  return (
    <div className="space-y-6">
      {/* Orders Trend Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Orders Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-sm">Charts coming soon...</p>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-sm">Revenue charts coming soon...</p>
          </div>
        </CardContent>
      </Card>

      {/* Top Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Top Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-sm">Category charts coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
