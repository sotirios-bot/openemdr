import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const next = url.searchParams.get('next') ?? '/checkout'

  if (code) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Password recovery sessions should always land on the reset page
      if (data.session?.user?.aud === 'authenticated' && next === '/auth/reset-password') {
        return NextResponse.redirect(new URL('/auth/reset-password', request.url))
      }
      return NextResponse.redirect(new URL(next, request.url))
    }
  }

  return NextResponse.redirect(new URL('/auth/login?error=auth', request.url))
}
