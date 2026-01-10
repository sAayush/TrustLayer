import { TalentOnboardingForm } from "@/components/onboarding/talent-form"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { TypographyH1, TypographyP } from "@/components/ui/typography"
import { getAuthRedirectPath } from "@/utils/auth-redirect"
import { getAllSkills } from "@/data/skills"

export default async function OnboardingPage() {
  const supabase = await createClient()
  
  const targetPath = await getAuthRedirectPath(supabase)
  
  if (targetPath !== '/talent/onboarding') {
    redirect(targetPath)
  }

  const { data: skills } = await getAllSkills(supabase)

  return (
    <div className="container mx-auto max-w-4xl py-10">
      <div className="text-center mb-10">
        <TypographyH1>Complete Your Profile</TypographyH1>
        <TypographyP>
          Tell us about your experience and skills to match you with the best opportunities.
        </TypographyP>
      </div>
      
      <TalentOnboardingForm skills={skills || []} />
    </div>
  )
}
