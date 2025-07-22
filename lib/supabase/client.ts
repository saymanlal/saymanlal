// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

export const createClient = () => {
  // Always validate in both browser and server contexts
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

  // Server-side: Return mock client
  if (typeof window === 'undefined') {
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        // ... other mock methods
      }
    } as unknown as ReturnType<typeof createBrowserClient<Database>>
  }

  // Client-side validation
  if (!supabaseUrl || !supabaseKey) {
    console.error(`
      Missing Supabase configuration!
      URL: ${supabaseUrl ? '***' : 'MISSING'}
      KEY: ${supabaseKey ? '***' : 'MISSING'}
    `)
    throw new Error('Supabase credentials not configured')
  }

  if (!supabaseUrl.startsWith('http')) {
    throw new Error(`
      Invalid Supabase URL format!
      Received: ${supabaseUrl}
      Required format: https://[project-ref].supabase.co
    `)
  }

  try {
    return createBrowserClient<Database>(supabaseUrl, supabaseKey)
  } catch (error) {
    console.error('Supabase client initialization failed:', error)
    throw new Error('Failed to initialize Supabase client')
  }
}

// Singleton access pattern
let client: ReturnType<typeof createBrowserClient<Database>> | undefined

export const getClient = () => {
  if (!client) {
    client = createClient()
  }
  return client
}