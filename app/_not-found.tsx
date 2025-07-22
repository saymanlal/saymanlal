'use client'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p>Sorry, we couldn&apos;t find this page</p>
    </div>
  )
}

export const dynamic = 'force-dynamic'
