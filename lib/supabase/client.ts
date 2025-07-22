// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database' // Your generated database types

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(`
    Missing Supabase configuration!
    NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? '***' : 'MISSING'}
    NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseAnonKey ? '***' : 'MISSING'}
    
    Please add these to your .env.local file and Vercel environment variables.
  `)
}

if (!supabaseUrl.startsWith('http')) {
  throw new Error(`
    Invalid Supabase URL format!
    Received: ${supabaseUrl}
    Required format: https://[project-ref].supabase.co
  `)
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Optional: Add test connection method
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('test').select('*').limit(1)
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Supabase connection test failed:', error)
    return { success: false, error }
  }
}