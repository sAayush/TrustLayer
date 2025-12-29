import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // 1. Create the initial response
  let supabaseResponse = NextResponse.next({
    request,
  })

  // 2. Setup the Supabase Client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 3. Check the User (The "Level 1 Guard")
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 4. DEFINE PUBLIC PATHS (Crucial!)
  // These are the pages a "Guest" is allowed to see.
  const isPublicPath = 
    request.nextUrl.pathname === '/' ||                 // Landing Page
    request.nextUrl.pathname.startsWith('/login') ||    // Login Page
    request.nextUrl.pathname.startsWith('/signup') ||   // Signup Page
    request.nextUrl.pathname.startsWith('/auth')    // OAuth Callback
    
  // 5. THE GATEKEEPER LOGIC
  // If user is NOT logged in AND they are trying to visit a PRIVATE page...
  if (!user && !isPublicPath) {
    // ...Kick them back to Login
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // 6. Return the updated response (with refreshed cookies)
  return supabaseResponse
}
