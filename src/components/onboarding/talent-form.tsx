'use client'

import { useActionState, useState } from 'react'
import { saveTalentOnboarding } from '@/actions/onboarding'
import { StepIndicator } from './step-indicator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

const steps = [
  { id: 1, label: "Personal Info" },
  { id: 2, label: "Experience" },
  { id: 3, label: "Socials" }
]

export function TalentOnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [state, action, isPending] = useActionState(saveTalentOnboarding, { message: '', success: false })

  // We can manage field values in state to persist them between steps if we wanted to only submit at the end.
  // Since we are using FormData and hidden inputs or submitting all at once, we need to make sure all data is present when submitting.
  // However, simpler approach for "Steps":
  // We can treat this as a single form where we toggle visibility of fields based on step.
  // This ensures all inputs are in the DOM when we submit.

  const nextStep = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentStep(prev => Math.min(prev + 1, steps.length))
  }

  const prevStep = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  /* Step 2 Logic specific states */
  const [experience, setExperience] = useState<string>("0")
  const [isFresher, setIsFresher] = useState<boolean>(true)

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setExperience(val)
    
    // Logic: if 0 or blank -> auto check fresher. 
    // If > 0 -> auto uncheck fresher.
    if (val === "" || parseFloat(val) === 0) {
      setIsFresher(true)
    } else {
      setIsFresher(false)
    }
  }

  const handleFresherChange = (checked: boolean) => {
    setIsFresher(checked)
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <StepIndicator steps={steps} currentStep={currentStep} />
      
      <Card>
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && "Basic Details"}
            {currentStep === 2 && "Professional Experience"}
            {currentStep === 3 && "Social Presence"}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "Let's start with the basics. Tell us who you are."}
            {currentStep === 2 && "Share your professional journey with us."}
            {currentStep === 3 && "Where can we find your work?"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="onboarding-form" action={action} className="space-y-6">
            
            {state.message && !state.success && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}

            {/* Step 1: Personal Info */}
            <div className={currentStep === 1 ? 'block space-y-4' : 'hidden'}>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" placeholder="John Doe" required />
                {state.errors?.fullName && <p className="text-sm text-red-500">{state.errors.fullName}</p>}
              </div>
            </div>

            {/* Step 2: Experience */}
            <div className={currentStep === 2 ? 'block space-y-4' : 'hidden'}>
              <div className="space-y-2">
                <Label htmlFor="currentCompany">Current Company (Optional)</Label>
                <Input id="currentCompany" name="currentCompany" placeholder="Acme Inc." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalExperienceYears">Years of Experience</Label>
                <Input 
                  id="totalExperienceYears" 
                  name="totalExperienceYears" 
                  type="number" 
                  min="0" 
                  step="0.5"
                  value={experience}
                  onChange={handleExperienceChange}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox" 
                  id="isFresher" 
                  name="isFresher" 
                  checked={isFresher}
                  onChange={(e) => handleFresherChange(e.target.checked)}
                  disabled={parseFloat(experience) > 0}
                  className="h-4 w-4"
                />
                <Label htmlFor="isFresher" className="text-sm font-normal">I am a fresher / looking for first job</Label>
              </div>
            </div>

            {/* Step 3: Socials */}
            <div className={currentStep === 3 ? 'block space-y-4' : 'hidden'}>
              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <Input id="linkedinUrl" name="linkedinUrl" placeholder="https://linkedin.com/in/..." type="url" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input id="githubUrl" name="githubUrl" placeholder="https://github.com/..." type="url" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                <Input id="portfolioUrl" name="portfolioUrl" placeholder="https://myportfolio.com" type="url" />
              </div>
            </div>

            {/* Navigation Buttons */}
            <CardFooter className="flex justify-between px-0 pt-4">
              <Button 
                variant="outline" 
                onClick={prevStep} 
                className={currentStep === 1 ? 'invisible' : ''}
                disabled={isPending}
              >
                Previous
              </Button>

              {currentStep < steps.length ? (
                <Button onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Complete Profile'
                  )}
                </Button>
              )}
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
