import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    const isAdminLogin = req.nextUrl.pathname === '/admin-login'
    
    // If accessing admin login while already authenticated, redirect to admin
    if (isAdminLogin && token && ['ADMIN', 'MANAGER', 'STAFF'].includes(token.role as string)) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    
    // If accessing admin routes without proper role, redirect to admin-login
    if (isAdminRoute && !isAdminLogin) {
      if (!token || !['ADMIN', 'MANAGER', 'STAFF'].includes(token.role as string)) {
        const loginUrl = new URL('/admin-login', req.url)
        loginUrl.searchParams.set('next', req.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
      }
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow all requests to pass through, we'll handle auth logic above
        return true
      }
    },
  }
)

export const config = {
  matcher: ['/admin/:path*', '/checkout/:path*']
}
