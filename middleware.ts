// middleware.ts
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import type { NextRequest } from 'next/server'

// Shared validation utility (used by both middleware and build scripts)
function validateSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error(`
      Missing Supabase environment variables:
      NEXT_PUBLIC_SUPABASE_URL: ${url ? '***' : 'MISSING'}
      NEXT_PUBLIC_SUPABASE_ANON_KEY: ${key ? '***' : 'MISSING'}
    `)
  }

  try {
    const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url
    new URL(cleanUrl)
    return { url: cleanUrl, key }
  } catch (e) {
    throw new Error(`Invalid Supabase URL: ${url}`)
  }
}

// Middleware-specific version that fails gracefully
function getValidatedSupabaseUrl() {
  try {
    const config = validateSupabaseConfig()
    return config.url
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  const supabaseUrl = getValidatedSupabaseUrl()
  if (!supabaseUrl || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return response
  }

  try {
    const supabase = createServerClient(
      supabaseUrl,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set() {},
          remove() {}
        }
      }
    )
    return response
  } catch (error) {
    console.error('Middleware Supabase init failed:', error)
    return response
  }
}

export const config = {
  matcher: []
}

// Build-time validation (automatically runs during npm run build)
if (process.env.NEXT_PHASE === 'phase-production-build') {
  try {
    validateSupabaseConfig()
    console.log('✅ Supabase configuration validated successfully')
  } catch (error) {
    console.error('❌ Supabase configuration error:')
    console.error(error)
    process.exit(1)
  }
}