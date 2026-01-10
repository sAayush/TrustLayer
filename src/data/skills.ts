import { createClient } from '@/utils/supabase/server'
import { Database } from '@/utils/types/database'

export type Skill = Database['public']['Tables']['skills']['Row']

type Client = Awaited<ReturnType<typeof createClient>>

export async function getAllSkills(supabase: Client) {
  return await supabase
    .from('skills')
    .select('id, name')
    .order('name')
}
