import { createClient } from '@supabase/supabase-js'

const assertEnv = (name: string) => {
  const value = process.env[name]
  if (!value) throw new Error(`Missing ${name} environment variable`)
  return value
}

const supabaseUrl = assertEnv('NEXT_PUBLIC_SUPABASE_URL').replace(/\/$/, '')
const supabaseKey = assertEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

try {
  new URL(supabaseUrl) // Validate URL format
} catch {
  throw new Error(`Invalid Supabase URL: ${supabaseUrl}`)
}

export const supabase = createClient(supabaseUrl, supabaseKey)
