// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

// Singleton client instance
let client: ReturnType<typeof createBrowserClient<Database>> | null = null

// Mock client methods for SSR/static generation
const createMockClient = () => ({
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signOut: async () => ({ error: null }),
    signInWithOAuth: async () => ({ data: null, error: null }),
    getUser: async () => ({ data: { user: null }, error: null })
  },
  from: (table: string) => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: (data: any) => Promise.resolve({ data: null, error: null }),
    update: (data: any) => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null })
  }),
  channel: () => ({
    subscribe: () => ({ unsubscribe: () => {} })
  }),
  removeAllChannels: () => {},
  getChannels: () => []
})

export const createClient = (): ReturnType<typeof createBrowserClient<Database>> => {
  // Return mock client during SSR/static generation
  if (typeof window === 'undefined') {
    return createMockClient() as unknown as ReturnType<typeof createBrowserClient<Database>>
  }

  // Initialize real client if not exists
  if (!client) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

    // Validate environment variables
    if (!supabaseUrl || !supabaseKey) {
      const errorMessage = [
        'Missing Supabase credentials!',
        `NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? '***' : 'MISSING'}`,
        `NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseKey ? '***' : 'MISSING'}`
      ].join('\n')
      
      console.error(errorMessage)
      throw new Error('Supabase configuration error')
    }

    // Validate URL format
    if (!/^https?:\/\//.test(supabaseUrl)) {
      throw new Error(`Invalid Supabase URL: Must start with http:// or https://`)
    }

    try {
      client = createBrowserClient<Database>(supabaseUrl, supabaseKey)
    } catch (error) {
      console.error('Failed to initialize Supabase client:', error)
      throw new Error('Supabase client initialization failed')
    }
  }

  return client
}

// Optional: Add a cleanup function for testing
export const _resetClient = () => {
  client = null
}