'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  LayoutDashboard,
  Package,
  ShoppingCart,
  Calendar,
  BarChart3,
  Settings,
  Users,
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    roles: ['ADMIN', 'MANAGER', 'STAFF']
  },
  {
    name: 'Products',
    href: '/admin/products',
    icon: Package,
    roles: ['ADMIN', 'MANAGER']
  },
  {
    name: 'Inventory',
    href: '/admin/inventory',
    icon: BarChart3,
    roles: ['ADMIN', 'MANAGER', 'STAFF']
  },
  {
    name: 'Orders',
    href: '/admin/orders',
    icon: ShoppingCart,
    roles: ['ADMIN', 'MANAGER', 'STAFF']
  },
  {
    name: 'Meal Plans',
    href: '/admin/meal-plans',
    icon: Calendar,
    roles: ['ADMIN', 'MANAGER']
  },
  {
    name: 'Customers',
    href: '/admin/customers',
    icon: Users,
    roles: ['ADMIN', 'MANAGER']
  },
  {
    name: 'Audit Log',
    href: '/admin/audit-log',
    icon: FileText,
    roles: ['ADMIN', 'MANAGER']
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    roles: ['ADMIN']
  }
]

export function AdminSidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const userRole = session?.user?.role as string
  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(userRole)
  )

  return (
    <div className={cn(
      "flex flex-col border-r border-gray-200 bg-white transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Collapse Toggle */}
      <div className="flex items-center justify-end p-4 border-b border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-emerald-100 text-emerald-700 border-r-2 border-emerald-500"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 flex-shrink-0",
                  isActive ? "text-emerald-600" : "text-gray-400"
                )} />
                {!isCollapsed && (
                  <span className="truncate">{item.name}</span>
                )}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* User Info */}
      {!isCollapsed && (
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-sm font-medium text-emerald-600">
                {session?.user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session?.user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session?.user?.role || 'Role'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
