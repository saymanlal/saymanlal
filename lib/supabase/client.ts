// lib/supabase/client.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// 1. Type-safe client initialization
const initializeClient = (): ReturnType<typeof createSupabaseClient<Database>> => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(`
      Missing Supabase configuration!
      URL: ${supabaseUrl ? '***' : 'MISSING'}
      KEY: ${supabaseKey ? '***' : 'MISSING'}
    `)
  }

  return createSupabaseClient<Database>(supabaseUrl, supabaseKey)
}

// 2. Singleton client instance
export const supabase = initializeClient()

// 3. Backward-compatible createClient export
export const createClient = (): typeof supabase => supabase

// 4. Type helper for components
export type SupabaseClient = typeof supabase