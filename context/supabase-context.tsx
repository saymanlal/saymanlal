// context/supabase-context.ts
'use client'

import { createClient } from '@/lib/supabase/client'
import { createContext, useContext, ReactNode } from 'react'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// Define the context type
type SupabaseContextType = SupabaseClient<Database>

// Create context with explicit generic type
const SupabaseContext = createContext<SupabaseContextType | null>(null)

// Define props type for the provider
interface SupabaseProviderProps {
  children: ReactNode
}

export const SupabaseProvider = ({ children }: SupabaseProviderProps) => {
  const supabase = createClient()
  
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  )
}

export const useSupabase = (): SupabaseContextType => {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error('useSupabase must be used within SupabaseProvider')
  }
  return context
}