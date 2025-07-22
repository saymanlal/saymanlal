// lib/supabase/env.ts
export const getSupabaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url?.startsWith('http')) {
    throw new Error(`
      Invalid Supabase URL: ${url}
      Must start with http:// or https://
      No trailing slash!
    `)
  }
  return url
}
