import { Database } from '@/utils/types/database'
import { SupabaseClient } from '@supabase/supabase-js'

export type TalentProfile = Database['public']['Tables']['talent_profiles']['Row']

export async function getTalentProfileById(supabase: SupabaseClient<Database>, userId: string) {
  return await supabase
    .from('talent_profiles')
    .select('*')
    .eq('id', userId)
    .single()
}

export async function updateTalentProfile(
  supabase: SupabaseClient<Database>,
  userId: string,
  data: Database['public']['Tables']['talent_profiles']['Update']
) {
  return await supabase
    .from('talent_profiles')
    .upsert({ ...data, id: userId }) // upsert in case it doesn't exist yet
    .eq('id', userId)
}
