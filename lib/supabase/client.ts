// lib/supabase/client.ts
import { createBrowserClient, createServerClient } from '@supabase/ssr'
import type { Database } from '@/types/database'
import type { NextRequest, NextResponse } from 'next/server'

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseKey)
}

export const createMiddlewareClient = (context: {
  req: NextRequest
  res: NextResponse
}) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return context.req.cookies.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        context.res.cookies.set(name, value, options)
      },
      remove(name: string, options: any) {
        context.res.cookies.set(name, '', options)
      }
    }
  })
}
