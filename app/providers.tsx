'use client'

import { createClient } from '../lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        router.refresh()
      }
    })

    return () => subscription?.unsubscribe()
  }, [router, supabase])

  return <>{children}</>
}
