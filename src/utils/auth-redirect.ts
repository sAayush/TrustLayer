import { Database } from '@/utils/types/database'
import { SupabaseClient } from '@supabase/supabase-js'

export async function getAuthRedirectPath(supabase: SupabaseClient<Database>): Promise<string> {
  // 1. Get the current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return '/login'

  // 2. Get their Role & Basic Info
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  // If no profile exists yet (rare race condition or just signed up without trigger?), send to login or setup
  if (!profile) return '/login'

  // 3. LOGIC: Where do they go?
  
  // A. If they haven't even finished the first step (Name) -> Onboarding
  // Note: 'full_name' might be populated from OAuth, so this check might be weak if we rely ONLY on it for "started onboarding".
  // But per user requirements:
  if (!profile.full_name) {
    return profile.role === 'organization' 
      ? '/organization/onboarding' 
      : '/talent/onboarding'
  }

  // B. If they are TALENT
  if (profile.role === 'talent') {
    const { data: talentProfile } = await supabase
      .from('talent_profiles')
      .select('linkedin_url, id') // Check a required field or just existence
      .eq('id', user.id)
      .single()

    // If missing details -> Onboarding
    // We used 'linkedin_url' as a proxy for "completed onboarding" in the user snippet.
    // In our previous simple check we just checked existence of the row. 
    // Let's stick to the user's snippet logic but maybe safer to check if row exists first.
    if (!talentProfile || !talentProfile.linkedin_url) {
      return '/talent/onboarding'
    }

    // All good -> Dashboard
    return '/talent/dashboard'
  }

  // C. If they are ORGANIZATION (Placeholder)
  if (profile.role === 'organization') {
     // const { data: orgProfile } = ...
     // if (!orgProfile?.company_name) return '/organization/onboarding'
     return '/organization/dashboard'
  }

  // Fallback
  return '/'
}
