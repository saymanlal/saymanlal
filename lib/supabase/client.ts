// lib/supabase/client.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// 1. Runtime-safe configuration validation
const getConfig = () => {
  // Skip validation during SSR/prerendering
  if (typeof window === 'undefined') {
    return { 
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase env vars missing in browser context')
    return { supabaseUrl: undefined, supabaseKey: undefined }
  }

  try {
    new URL(supabaseUrl) // Validate URL format
    return { supabaseUrl, supabaseKey }
  } catch (error) {
    console.error('Invalid Supabase URL:', supabaseUrl)
    return { supabaseUrl: undefined, supabaseKey: undefined }
  }
}

// 2. Hybrid client initialization
export const supabase = (() => {
  const { supabaseUrl, supabaseKey } = getConfig()

  if (!supabaseUrl || !supabaseKey) {
    // Return mock client when config is invalid
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null })
      },
      from: () => ({
        select: () => Promise.resolve({ data: [], error: null })
      })
    } as unknown as ReturnType<typeof createSupabaseClient<Database>>
  }

  return createSupabaseClient<Database>(supabaseUrl, supabaseKey)
})()

// 3. Type-safe exports
export type SupabaseClient = typeof supabase
export const createClient = (): SupabaseClient => supabase