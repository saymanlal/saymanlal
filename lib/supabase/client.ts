import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

// Client-side only implementation
export const createClient = () => createBrowserClient(supabaseUrl, supabaseKey)

// For API routes/pages that need server-side auth
export const createPagesRouterServerClient = (context: any) => {
  return createBrowserClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return context.req.cookies[name]
      },
      set(name: string, value: string, options: any) {
        context.res.setHeader('Set-Cookie', `${name}=${value}; ${options}`)
      },
      remove(name: string, options: any) {
        context.res.setHeader('Set-Cookie', `${name}=; ${options}`)
      }
    }
  })
}
