import { z } from "zod";

export const onboardingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  currentCompany: z.string().optional(),
  totalExperienceYears: z.coerce.number().min(0, "Experience years must be positive"),
  linkedinUrl: z.url("Invalid URL").optional().or(z.literal('')),
  githubUrl: z.url("Invalid URL").optional().or(z.literal('')),
  portfolioUrl: z.url("Invalid URL").optional().or(z.literal('')),
  skills: z.array(z.string()).optional(),
  isFresher: z.boolean().optional(),
  otherLinks: z.string().optional().transform((str) => {
    if (!str) return [];
    try {
      const parsed = JSON.parse(str);
      if (!Array.isArray(parsed)) return [];
      return parsed.slice(0, 2);
    } catch {
      return [];
    }
  }),
})