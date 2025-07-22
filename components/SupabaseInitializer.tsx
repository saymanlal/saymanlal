// components/SupabaseInitializer.tsx
'use client'

import { SupabaseProvider } from '@/context/supabase-context'

export default function SupabaseInitializer({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return <SupabaseProvider>{children}</SupabaseProvider>
}