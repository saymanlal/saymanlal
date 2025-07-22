import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '')
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')
if (!supabaseKey) throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')

try {
  new URL(supabaseUrl)
} catch {
  throw new Error(`Invalid Supabase URL: ${supabaseUrl}`)
}

export const supabase = createClient(supabaseUrl, supabaseKey)
