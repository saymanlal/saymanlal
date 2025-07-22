import { SupabaseClient, SupabaseClientOptions } from '@supabase/supabase-js'

declare module '@supabase/ssr' {
  export function createBrowserClient<Database = any>(
    supabaseUrl: string,
    supabaseKey: string,
    options?: SupabaseClientOptions<string>
  ): SupabaseClient<Database>
  
  export function createServerClient<Database = any>(
    supabaseUrl: string,
    supabaseKey: string,
    options: {
      cookies: {
        get(name: string): string | undefined
        set(name: string, value: string, options: any): void
        remove(name: string, options: any): void
      }
    }
  ): SupabaseClient<Database>
}
