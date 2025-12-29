import { Database } from '@/utils/types/database'
import { SupabaseClient } from '@supabase/supabase-js'

export type Profile = Database['public']['Tables']['profiles']['Row']

export async function getProfileById(supabase: SupabaseClient<Database>, userId: string) {
  return await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
}

export async function updateProfile(
  supabase: SupabaseClient<Database>,
  userId: string,
  data: Database['public']['Tables']['profiles']['Update']
) {
  return await supabase
    .from('profiles')
    .update(data)
    .eq('id', userId)
}
