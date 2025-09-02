'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { LoadingSpinner } from '@/components/ui/loading'
import { Toaster } from 'sonner'
import { QueryProvider } from '@/components/providers/QueryProvider'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mint-50 to-emerald-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!session || !['ADMIN', 'MANAGER', 'STAFF'].includes((session.user as any)?.role as string)) {
    redirect('/admin-login')
  }

  return (
    <QueryProvider>
      <div className="min-h-screen bg-gradient-to-br from-mint-50 to-emerald-50" data-admin-shell="true">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6 lg:p-8">
            {children}
          </main>
        </div>
        <Toaster position="top-right" />
      </div>
    </QueryProvider>
  )
}
