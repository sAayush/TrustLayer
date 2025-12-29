import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // 1. Create the initial response
  let supabaseResponse = NextResponse.next({
    request,
  })

  // 2. Setup the Supabase Client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check your .env.local file."
    );
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
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
    request.nextUrl.pathname.startsWith('/auth') ||
    // Landing stuff
    request.nextUrl.pathname.startsWith('/about') ||
    request.nextUrl.pathname.startsWith('/companies') ||
    request.nextUrl.pathname.startsWith('/developers') ||
    request.nextUrl.pathname.startsWith('/faq') ||
    request.nextUrl.pathname.startsWith('/pricing') ||
    request.nextUrl.pathname.startsWith('/contact') ||
    request.nextUrl.pathname.startsWith('/legal/privacy') ||
    request.nextUrl.pathname.startsWith('/legal/terms') ||
    request.nextUrl.pathname.startsWith('/legal/cookies');
    
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
