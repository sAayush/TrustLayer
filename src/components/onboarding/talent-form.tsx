'use client'

import { useActionState, useState, useEffect } from 'react'
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
  { id: 3, label: "Skills" },
  { id: 4, label: "Socials" }
]

// Maps field names to their respective step numbers
const FIELD_TO_STEP_MAP: Record<string, number> = {
  fullName: 1,
  currentCompany: 2,
  totalExperienceYears: 2,
  isFresher: 2,
  selectedSkills: 3,
  manualSkills: 3,
  linkedinUrl: 4,
  githubUrl: 4,
  portfolioUrl: 4,
}

interface TalentOnboardingFormProps {
  skills: { id: string; name: string }[]
}

export function TalentOnboardingForm({ skills }: TalentOnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [state, action, isPending] = useActionState(saveTalentOnboarding, { message: '', success: false })
  const [localErrors, setLocalErrors] = useState<Record<string, string[]> | undefined>(undefined)

  // Sync server errors to local state when they arrive
  useEffect(() => {
    if (state.errors) {
      setLocalErrors(state.errors)
    }
  }, [state.errors])

  const clearError = (field: string) => {
    setLocalErrors(prev => {
      if (!prev || !prev[field]) return prev
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }

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
    if (localErrors?.totalExperienceYears) clearError('totalExperienceYears')
    if (val === "" || parseFloat(val) === 0) {
      setIsFresher(true)
    } else {
      setIsFresher(false)
    }
  }

  const handleFresherChange = (checked: boolean) => {
    setIsFresher(checked)
  }

  /* Step 3 Logic: Skills */
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([])
  const [manualSkills, setManualSkills] = useState<string[]>([])
  const [skillSearch, setSkillSearch] = useState("")
  const [manualSkillInput, setManualSkillInput] = useState("")

  const toggleSkill = (id: string) => {
    if (localErrors?.selectedSkills) clearError('selectedSkills')
    if (selectedSkillIds.includes(id)) {
      setSelectedSkillIds(prev => prev.filter(sid => sid !== id))
    } else {
      if (selectedSkillIds.length + manualSkills.length >= 15) return 
      setSelectedSkillIds(prev => [...prev, id])
    }
  }

  const addManualSkill = () => {
    const val = manualSkillInput.trim()
    if (!val) return
    if (selectedSkillIds.length + manualSkills.length >= 15) return
    if (manualSkills.includes(val)) return 
    setManualSkills(prev => [...prev, val])
    setManualSkillInput("")
  }

  const removeManualSkill = (skill: string) => {
     setManualSkills(prev => prev.filter(s => s !== skill))
  }

  /* Step 4 Logic: Additional Links */
  const [additionalLinks, setAdditionalLinks] = useState<{label: string, url: string}[]>([])

  const addLink = () => {
    if (additionalLinks.length < 2) {
      setAdditionalLinks([...additionalLinks, { label: "", url: "" }])
    }
  }

  const removeLink = (index: number) => {
    setAdditionalLinks(additionalLinks.filter((_, i) => i !== index))
  }

  const updateLink = (index: number, field: 'label' | 'url', value: string) => {
    const newLinks = [...additionalLinks]
    newLinks[index][field] = value
    setAdditionalLinks(newLinks)
  }

  const offScreenErrors = localErrors && Object.keys(localErrors).length > 0
    ? Object.entries(localErrors).filter(([field]) => {
         const step = FIELD_TO_STEP_MAP[field]
         return step && step !== currentStep
      })
    : []

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
            
            {/* Error Display */}
            {offScreenErrors.length > 0 && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription className="space-y-3">
                  <div className="text-sm space-y-2 max-h-40 overflow-y-auto pl-2">
                    {offScreenErrors.map(([field, messages]) => {
                      const step = FIELD_TO_STEP_MAP[field]
                      return (
                        <div key={field} className="flex items-center justify-between gap-4 group">
                          <div className="space-y-0.5">
                            <span className="font-semibold capitalize text-destructive-foreground/80">
                              {field.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="ml-1 text-muted-foreground">
                              {messages?.[0]}
                            </span>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setCurrentStep(step)}
                            className="h-6 text-xs bg-background/50 hover:bg-background border-destructive/30 hover:text-destructive whitespace-nowrap cursor-pointer"
                            type="button"
                          >
                            Go to Step {step}
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Step 1: Personal Info */}
            <div className={currentStep === 1 ? 'block space-y-4' : 'hidden'}>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  name="fullName" 
                  placeholder="John Doe" 
                  onChange={() => clearError('fullName')}
                />
                {localErrors?.fullName && <p className="text-sm text-red-500">{localErrors.fullName}</p>}
              </div>
            </div>

            {/* Step 2: Experience */}
            <div className={currentStep === 2 ? 'block space-y-4' : 'hidden'}>
              <div className="space-y-2">
                <Label htmlFor="currentCompany">Current Company (Optional)</Label>
                <Input id="currentCompany" name="currentCompany" placeholder="Company Name" />
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
                {localErrors?.totalExperienceYears && <p className="text-sm text-red-500">{localErrors.totalExperienceYears}</p>}
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

            {/* Step 3: Skills */}
            <div className={currentStep === 3 ? 'block space-y-4' : 'hidden'}>
              <div className="space-y-4">
                <div>
                    <Label>Selected Skills ({selectedSkillIds.length + manualSkills.length}/15)</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {selectedSkillIds.map(id => {
                            const skill = skills.find(s => s.id === id)
                            return (
                                <div key={id} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm flex items-center gap-1">
                                    {skill?.name}
                                    <button type="button" onClick={() => toggleSkill(id)} className="hover:text-red-500 font-bold ml-1">×</button>
                                </div>
                            )
                        })}
                        {manualSkills.map(skill => (
                            <div key={skill} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm flex items-center gap-1 border">
                                {skill}
                                <button type="button" onClick={() => removeManualSkill(skill)} className="hover:text-red-500 font-bold ml-1">×</button>
                            </div>
                        ))}
                        {(selectedSkillIds.length === 0 && manualSkills.length === 0) && (
                            <p className="text-sm text-muted-foreground italic">No skills selected.</p>
                        )}
                 {!(selectedSkillIds.length === 0 && manualSkills.length === 0) && localErrors?.selectedSkills && (
                    <p className="text-sm text-red-500 mt-1">{localErrors.selectedSkills}</p>
                 )}
                    </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skillSearch">Add from Library</Label>
                  <Input 
                    type="text"
                    id="skillSearch" 
                    placeholder="Search skills..." 
                    value={skillSearch}
                    onChange={(e) => setSkillSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const matchingSkills = skills.filter(s => s.name.toLowerCase().includes(skillSearch.toLowerCase()));
                        if (matchingSkills.length > 0) {
                          toggleSkill(matchingSkills[0].id);
                        }
                      }
                    }}
                  />
                  <div className="border rounded-md max-h-32 overflow-y-auto p-2 space-y-1">
                     {skills
                        .filter(s => s.name.toLowerCase().includes(skillSearch.toLowerCase()))
                        .map(skill => (
                            <div 
                                key={skill.id} 
                                className={
                                  `px-2 py-1.5 text-sm rounded cursor-pointer flex justify-between 
                                  items-center ${selectedSkillIds.includes(skill.id) ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`
                                }
                                onClick={() => toggleSkill(skill.id)}
                            >
                                {skill.name}
                                {selectedSkillIds.includes(skill.id) && <span>✓</span>}
                            </div>
                        ))}
                     {skills.filter(s => s.name.toLowerCase().includes(skillSearch.toLowerCase())).length === 0 && (
                         <p className="text-sm text-center text-muted-foreground py-2">No matching skills found.</p>
                     )}
                  </div>
                </div>

                <div className="space-y-2">
                   <Label htmlFor="manualSkill">Add Additional Skill</Label>
                   <div className="flex gap-2">
                      <Input 
                        id="manualSkill" 
                        placeholder="e.g. ExoticLang v2" 
                        value={manualSkillInput}
                        onChange={(e) => setManualSkillInput(e.target.value)}
                        onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); addManualSkill(); } }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addManualSkill}
                        disabled={!manualSkillInput.trim() || selectedSkillIds.length + manualSkills.length >= 15}
                        className="cursor-pointer"
                      >
                        Add
                      </Button>
                   </div>
                   <p className="text-xs text-muted-foreground">If you can&apos;t find a skill in the library, add it here.</p>
                </div>

                {/* Hidden Inputs for Submission */}
                {selectedSkillIds.map(id => (
                    <input key={id} type="hidden" name="selectedSkills" value={id} />
                ))}
                {manualSkills.map(skill => (
                    <input key={skill} type="hidden" name="manualSkills" value={skill} />
                ))}

              </div>
            </div>

            {/* Step 4: Socials */}
            <div className={currentStep === 4 ? 'block space-y-4' : 'hidden'}>
              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <Input id="linkedinUrl" name="linkedinUrl" placeholder="https://linkedin.com/in/..." type="url" onChange={() => clearError('linkedinUrl')} />
                {localErrors?.linkedinUrl && <p className="text-sm text-red-500">{localErrors.linkedinUrl}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input id="githubUrl" name="githubUrl" placeholder="https://github.com/..." type="url" onChange={() => clearError('githubUrl')} />
                {localErrors?.githubUrl && <p className="text-sm text-red-500">{localErrors.githubUrl}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                <Input id="portfolioUrl" name="portfolioUrl" placeholder="https://myportfolio.com" type="url" onChange={() => clearError('portfolioUrl')} />
                {localErrors?.portfolioUrl && <p className="text-sm text-red-500">{localErrors.portfolioUrl}</p>}
              </div>

               {/* Additional Links */}
               {additionalLinks.map((link, index) => (
                <div key={index} className="grid grid-cols-2 gap-2 items-end border p-2 rounded-md">
                   <div className="space-y-1">
                      <Label className="text-xs">Label</Label>
                      <Input 
                        placeholder="Blog / Twitter / Etc" 
                        value={link.label} 
                        onChange={(e) => updateLink(index, 'label', e.target.value)} 
                      />
                   </div>
                   <div className="space-y-1">
                      <Label className="text-xs">URL</Label>
                      <Input 
                        placeholder="https://..." 
                        value={link.url} 
                        type="url"
                        onChange={(e) => updateLink(index, 'url', e.target.value)} 
                      />
                   </div>
                   <div className="col-span-2 text-right">
                       <Button type="button" variant="ghost" size="sm" onClick={() => removeLink(index)} className="text-red-500 h-6 cursor-pointer">Remove</Button>
                   </div>
                </div>
              ))}

              {additionalLinks.length < 2 && (
                <Button type="button" variant="outline" size="sm" onClick={addLink} className="mt-2 w-full cursor-pointer border-dashed">
                  + Add Another Link
                </Button>
              )}

              <input type="hidden" name="otherLinks" value={JSON.stringify(additionalLinks)} />

            </div>

            {/* Navigation Buttons */}
            <CardFooter className="flex justify-between px-0 pt-4">
              <Button 
                variant="outline" 
                onClick={prevStep} 
                type="button"
                className={currentStep === 1 ? 'invisible cursor-not-allowed' : 'cursor-pointer'}
                disabled={isPending}
              >
                Previous
              </Button>

              {currentStep < steps.length ? (
                <Button onClick={nextStep} type="button" className='cursor-pointer'>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={isPending} className='cursor-pointer'>
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
