import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createPagesRouterServerClient } from '../project/lib/supabase/client'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createPagesRouterServerClient({
    req: request,
    res: response
  })
  await supabase.auth.getSession()
  return response
}
