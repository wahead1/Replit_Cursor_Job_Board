import { NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req) {
  console.log('Middleware called for path:', req.nextUrl.pathname)
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log('Middleware - Session status:', !!session, 'Path:', req.nextUrl.pathname)

  if (!session && req.nextUrl.pathname.startsWith('/admin')) {
    console.log('Middleware - No session, redirecting to login')
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (session && req.nextUrl.pathname.startsWith('/admin')) {
    const { data: { user } } = await supabase.auth.getUser()
    console.log('Middleware - User data:', user)
    const isAdmin = user?.user_metadata?.is_admin || user?.app_metadata?.is_admin
    const isSuperAdmin = user?.user_metadata?.is_super_admin || user?.app_metadata?.is_super_admin

    console.log('Middleware - Is admin:', isAdmin, 'Is super admin:', isSuperAdmin)

    if (!isAdmin && !isSuperAdmin) {
      console.log('Middleware - User is not admin, redirecting to unauthorized')
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  }

  console.log('Middleware - Allowing request to proceed')
  return res
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}