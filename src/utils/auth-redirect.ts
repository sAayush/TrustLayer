import { createClient } from '@/utils/supabase/server'
import { getProfileById } from '@/data/profiles'
import { getTalentProfileById } from '@/data/talent_profiles'

import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/utils/types/database'

export async function getAuthRedirectPath(supabaseClient?: SupabaseClient<Database>): Promise<string> {
  const supabase = supabaseClient ?? (await createClient())

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return '/login'

  const { data: profile } = await getProfileById(supabase, user.id)

  if (!profile) return '/login'

  if (!profile.full_name) {
    return profile.role === 'organization' ? '/organization/onboarding' : '/talent/onboarding'
  }

  if (profile.role === 'talent') {
    const { data: talentProfile } = await getTalentProfileById(supabase, user.id)

    // Check if talent profile exists and has been populated (is_fresher is always set during onboarding)
    if (!talentProfile || talentProfile.is_fresher === null) {
      return '/talent/onboarding'
    }

    return '/talent/dashboard'
  }

  if (profile.role === 'organization') {
    return '/organization/dashboard'
  }

  return '/'
}
