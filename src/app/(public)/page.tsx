import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Building2, CheckCircle2 } from "lucide-react";
import { 
  TypographyH1, 
  TypographyH2, 
  TypographyH3, 
  TypographyLead, 
  TypographyLarge, 
  TypographyMuted, 
  TypographySmall,
} from "@/components/ui/typography";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section - Traffic Controller */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[85vh]">
        {/* Developer Side */}
        <div className={
          "relative group flex flex-col items-center justify-center p-8 md:p-16 text-center " +
          "border-b md:border-b-0 md:border-r border-border " +
          "hover:bg-muted/30 transition-colors duration-500"
        }>
          <div className={
            "absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/20 " +
            "pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          } />
          <div className="relative z-10 max-w-md space-y-6">
            <div className={
              "mx-auto w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/50 " +
              "flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6"
            }>
              <Code2 className="w-8 h-8" />
            </div>
            <TypographyH1 className="text-4xl md:text-5xl">
              I am a <span className="text-blue-600 dark:text-blue-400">Developer</span>
            </TypographyH1>
            <TypographyLead>
              Skip the endless interviews. Take one test, prove your skills, and get hired by top companies.
            </TypographyLead>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className={
                "rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 " +
                "bg-color-primary text-color-secondary"
              }>
                <Link href="/developers">
                  Get Vetted <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2 pt-4">
              <li className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> No cost for developers
              </li>
              <li className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> Direct access to top jobs
              </li>
            </ul>
          </div>
        </div>

        {/* Company Side */}
        <div className="relative group flex flex-col items-center justify-center p-8 md:p-16 text-center hover:bg-muted/30 transition-colors duration-500">
          <div className={
            "absolute inset-0 bg-gradient-to-bl from-purple-50/50 to-transparent dark:from-purple-950/20 " +
            "pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          } />
          <div className="relative z-10 max-w-md space-y-6">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
              <Building2 className="w-8 h-8" />
            </div>
            <TypographyH1 className="text-4xl md:text-5xl">
              I am <span className="text-purple-600 dark:text-purple-400">Hiring</span>
            </TypographyH1>
            <TypographyLead>
              Stop sifting through resumes. Hire pre-vetted, top 1% talent ready to ship code from Day 1.
            </TypographyLead>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 bg-color-tertiary text-white">
                <Link href="/companies">
                  Find Talent <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
             <ul className="text-sm text-muted-foreground space-y-2 pt-4">
              <li className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> 100% Quality Guarantee
              </li>
              <li className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> Pay only when you hire
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-20 border-t bg-muted/20">
        <div className="container px-4 text-center">
          <TypographySmall className="text-muted-foreground uppercase tracking-wider mb-8 block">
            Trusted by forward-thinking companies
          </TypographySmall>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Placeholders for logos - purely textual for now to keep it clean if no images available */}
             {["Testamonials", "Testamonials", "Testamonials", "Testamonials", "Testamonials"].map((name) => (
               <div key={name} className="text-xl md:text-2xl font-bold font-mono text-foreground/40 hover:text-foreground transition-colors cursor-default">
                 {name}
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Vetting Process High Level */}
      <section className="py-24">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <TypographyH2 className="text-3xl md:text-5xl border-none mb-4">
              Quality over Quantity
            </TypographyH2>
            <TypographyLead>
              Our rigorous vetting process ensures only the best 3% of developers make it to our platform.
            </TypographyLead>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className={
              "hidden md:block absolute top-12 left-[16%] right-[16%] " +
            "h-0.5 bg-gradient-to-r from-transparent via-border to-transparent z-0"
            } />
            
            {[
              {
                step: "1",
                title: "Code Assessment",
                desc: "Real-world project implementation, not just leetcode puzzles.",
                icon: "💻"
              },
              {
                step: "2",
                title: "Human Review",
                desc: "Code structure, patterns, and logic reviewed by senior engineers.",
                icon: "👀"
              },
              {
                step: "3",
                title: "Video Interview",
                desc: "Communication and problem-solving explanation skills verified.",
                icon: "🎥"
              }
            ].map((item, i) => (
              <Card key={i} className=
                "relative z-10 flex flex-col items-center text-center p-6 border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold mb-4 border border-primary/20">
                  {item.step}
                </div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <TypographyH3 className="mb-2 border-none">{item.title}</TypographyH3>
                <TypographyMuted>{item.desc}</TypographyMuted>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Talent Teaser */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 text-center">
            <TypographyH2 className="text-3xl border-none mb-8">Top Talent Ready to Work</TypographyH2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* Mock Developer Cards */}
                 {[1, 2, 3].map((i) => (
                    <Card key={i} className="p-6 text-left">
                        <div className="flex items-center gap-4 mb-4">
                             <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700" />
                             <div>
                                 <TypographyLarge>Full Stack Dev</TypographyLarge>
                                 <TypographySmall className="text-muted-foreground">5 years exp • Remote</TypographySmall>
                             </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="text-xs bg-muted px-2 py-1 rounded-md">React</span>
                            <span className="text-xs bg-muted px-2 py-1 rounded-md">Node.js</span>
                            <span className="text-xs bg-muted px-2 py-1 rounded-md">AWS</span>
                        </div>
                        <TypographyMuted className="line-clamp-2">
                            Experienced in building scalable microservices and real-time applications...
                        </TypographyMuted>
                    </Card>
                ))}
            </div>
             <div className="mt-10">
                <Button variant="outline" size="lg" asChild>
                    <Link href="/companies">View All Talent</Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
