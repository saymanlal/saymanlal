'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    // Verify environment variables are properly loaded
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!supabaseUrl?.startsWith('https://')) {
      console.error('Invalid Supabase URL:', supabaseUrl)
      return
    }
    
    // Optional: Redirect after delay if needed
    const timer = setTimeout(() => router.push('/'), 3000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg">Redirecting you to the homepage...</p>
    </div>
  )
}

export const dynamic = 'force-static'
