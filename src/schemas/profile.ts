import { z } from 'zod'

export const onboardingSchema = z
  .object({
    fullName: z.string().min(2, 'Full name is required'),
    currentCompany: z.string().optional(),
    totalExperienceYears: z.coerce.number().min(0, 'Experience years must be positive'),
    linkedinUrl: z.url('Invalid URL').optional().or(z.literal('')),
    githubUrl: z.url('Invalid URL').optional().or(z.literal('')),
    portfolioUrl: z.url('Invalid URL').optional().or(z.literal('')),
    isFresher: z.boolean().optional(),
    selectedSkills: z.array(z.uuid()).optional().default([]),
    manualSkills: z.array(z.string()).optional().default([]),

    otherLinks: z
      .string()
      .optional()
      .transform((str) => {
        if (!str) return []
        try {
          const parsed = JSON.parse(str)
          if (!Array.isArray(parsed)) return []
          return parsed.slice(0, 2) // Enforce max 2
        } catch {
          return []
        }
      }),
  })
  .refine(
    (data) => {
      const total = (data.selectedSkills?.length || 0) + (data.manualSkills?.length || 0)
      return total <= 15
    },
    {
      message: 'You can select up to 15 skills in total.',
      path: ['selectedSkills'],
    },
  )
