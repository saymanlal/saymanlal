// middleware.ts
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // 1. Skip if no Supabase env vars (remove if you're certain they exist)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return response // Skip Supabase initialization
  }

  try {
    // 2. Minimal client for non-auth usage
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          // Minimal cookie handling
          set() {}, 
          remove() {} 
        }
      }
    )

    // 3. Optional: Test connection (remove if not needed)
    await supabase.from('any_table').select('*').limit(1)

    return response

  } catch (error) {
    console.error('Supabase connection failed (non-critical):', error)
    return response // Still proceed without Supabase
  }
}

export const config = {
  matcher: [] // Empty array = middleware runs on no routes
}