import { TypographyH1, TypographyH2, TypographyLead, TypographyP } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Code2, MonitorCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VettingPage() {
  const steps = [
    {
      title: "1. Identity Verification",
      description: "We verify every candidate's identity using government-issued ID and background checks to ensure legitimacy and safety.",
      icon: <CheckCircle2 className="h-10 w-10 text-primary" />,
    },
    {
      title: "2. Async Code Challenge",
      description: "Candidates solve real-world coding problems in an asynchronous environment. " +
      "We test for code quality, efficiency, and problem-solving skills.",
      icon: <Code2 className="h-10 w-10 text-primary" />,
    },
    {
      title: "3. Live System Design",
      description: "Top performers move to a live system design interview with senior engineers. " +
      "We assess architecture skills, scalability knowledge, and communication.",
      icon: <MonitorCheck className="h-10 w-10 text-primary" />,
    },
    {
      title: "4. Soft Skills Assessment",
      description: "Technical skills aren't enough. " +
      "We evaluate communication, teamwork, and cultural fit to ensure candidates integrate seamlessly into your team.",
      icon: <Users className="h-10 w-10 text-primary" />,
    },
  ];

  return (
    <div className="container py-12 md:py-24 max-w-5xl mx-auto space-y-16">
      
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <TypographyH1>How We Vet the Top 1%</TypographyH1>
        <TypographyLead className="max-w-3xl mx-auto">
          Our rigorous 4-step vetting process ensures that you hire only the best. We handle the screening so you can focus on building.
        </TypographyLead>
        <div className="flex justify-center gap-4">
          <Link href="/companies">
            <Button size="lg" style={{ backgroundColor: 'var(--color-tertiary)', color: 'white' }}>
              Hire Vetted Talent
            </Button>
          </Link>
          <Link href="/developers">
            <Button size="lg" variant="outline">
              Apply as Developer
            </Button>
          </Link>
        </div>
      </section>

      {/* Steps Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map((step, index) => (
          <Card key={index} className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="space-y-4">
              <div className="bg-secondary/10 w-fit p-3 rounded-xl border border-secondary/20">
                {step.icon}
              </div>
              <CardTitle className="text-2xl">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <TypographyP className="text-muted-foreground">{step.description}</TypographyP>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Visual / Screenshot Placeholder */}
      <section className="bg-muted/30 rounded-3xl p-8 md:p-12 text-center border space-y-8">
        <TypographyH2>See It In Action</TypographyH2>
        <TypographyP className="max-w-2xl mx-auto">
          Our platform provides a transparent view of each candidate&apos;s test results, code submissions, and interviewer feedback.
        </TypographyP>
        
        {/* Placeholder for Screenshot */}
        <div className="aspect-video bg-background rounded-xl border shadow-sm flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
            <div className="text-muted-foreground font-mono text-sm z-10">
                [Platform Interface Screenshot: Candidate Report]
            </div>
             {/* Abstract UI representation */}
             <div className="absolute inset-4 border border-dashed rounded-lg opacity-20 pointer-events-none" />
        </div>
      </section>

    </div>
  );
}
