'use server'

import { createClient } from '@/utils/supabase/server'
import { updateProfile } from '@/data/profiles'
import { updateTalentProfile } from '@/data/talent_profiles'
import { updateTalentSkills } from '@/data/talent_skills'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { onboardingSchema } from '@/schemas/profile'

export type OnboardingState = {
  message: string
  errors?: Record<string, string[]>
  success?: boolean
}

export async function saveTalentOnboarding(prevState: OnboardingState, formData: FormData): Promise<OnboardingState> {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { message: 'Unauthorized', success: false }
  }

  const rawData = {
    fullName: formData.get('fullName'),
    currentCompany: formData.get('currentCompany'),
    totalExperienceYears: formData.get('totalExperienceYears'),
    linkedinUrl: formData.get('linkedinUrl'),
    githubUrl: formData.get('githubUrl'),
    portfolioUrl: formData.get('portfolioUrl'),
    isFresher: formData.get('isFresher') === 'on',
    selectedSkills: formData.getAll('selectedSkills'),
    manualSkills: formData.getAll('manualSkills'),
    otherLinks: formData.get('otherLinks'),
  }

  const validatedFields = onboardingSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      message: 'Validation failed',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false
    }
  }

  const {
    fullName, 
    currentCompany, 
    totalExperienceYears, 
    linkedinUrl, 
    githubUrl, 
    portfolioUrl, 
    isFresher,
    otherLinks,
    selectedSkills,
    manualSkills } = validatedFields.data

  try {
    // 1. Update Profile (Basic Info)
    const { error: profileError } = await updateProfile(supabase, user.id, {
      full_name: fullName,
    })

    if (profileError) throw new Error('Failed to update profile: ' + profileError.message)

    // 2. Update Talent Profile (Professional Info)
    const { error: talentError } = await updateTalentProfile(supabase, user.id, {
      current_company: currentCompany || null,
      total_experience_years: totalExperienceYears,
      linkedin_url: linkedinUrl || null,
      github_url: githubUrl || null,
      portfolio_url: portfolioUrl || null,
      is_fresher: isFresher,
      other_skills: manualSkills || [], 
      other_links: otherLinks,
    })

    if (talentError) throw new Error('Failed to update talent profile: ' + talentError.message)

    // 3. Update Talent Skills (Selected Skills)
    const { error: skillsError } = await updateTalentSkills(supabase, user.id, selectedSkills)
    
    if (skillsError) throw new Error('Failed to update skills: ' + skillsError.message)

  } catch (error) {
    console.error('Onboarding Error:', error)
    const message = error instanceof Error ? error.message : 'Something went wrong'
    return { message, success: false }
  }

  revalidatePath('/talent') // Or wherever they go next
  redirect('/talent/dashboard') // Assuming this is the destination
}
