'use client'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="p-4 bg-red-50 text-red-700 rounded-lg">
      <h2 className="font-bold">Supabase Error</h2>
      <p>{error.message}</p>
      <button 
        onClick={reset}
        className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded"
      >
        Try Again
      </button>
    </div>
  )
}
