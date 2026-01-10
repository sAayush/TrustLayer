import { createClient } from '@/utils/supabase/server'

type Client = Awaited<ReturnType<typeof createClient>>

export async function updateTalentSkills(
  supabase: Client,
  userId: string,
  skillIds: string[]
) {
  // 1. Delete existing skills
  const { error: deleteError } = await supabase
    .from('talent_skills')
    .delete()
    .eq('profile_id', userId)

  if (deleteError) {
    return { error: deleteError }
  }

  // 2. Insert new skills
  if (skillIds.length > 0) {
    const { error: insertError } = await supabase
      .from('talent_skills')
      .insert(
        skillIds.map((skillId) => ({
          profile_id: userId,
          skill_id: skillId,
        }))
      )

    if (insertError) {
      return { error: insertError }
    }
  }

  return { error: null }
}
