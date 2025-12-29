import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ClipboardList, Code, Video, Wallet, Zap, Globe } from "lucide-react";
import { TypographyH1, TypographyH2, TypographyH3, TypographyLead, TypographyMuted } from "@/components/ui/typography";

export default function DevelopersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50/50 to-background dark:from-blue-950/20 py-20 md:py-32 border-b">
        <div className="container m-auto px-4 text-center max-w-4xl mx-auto space-y-6">
           <TypographyH1 className="text-4xl md:text-6xl">
            Skip the Interview.<br/>
            <span className="text-blue-600 dark:text-blue-400">Get Hired by Output.</span>
          </TypographyH1>
          <TypographyLead className="max-w-2xl mx-auto">
            No more whiteboard interviews. Show us your code, explain your implementation, and get matched with top global companies.
          </TypographyLead>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button size="lg" className="rounded-full h-12 px-8 text-base" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-secondary)' }}>
              Start Assessment
            </Button>
            <Button variant="outline" size="lg" className="rounded-full h-12 px-8 text-base">
              How it works
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="container m-auto px-4">
          <div className="text-center mb-16">
            <TypographyH2 className="text-3xl border-none mb-4">Why Top Developers Choose TrustLayer</TypographyH2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-muted/30 border-none shadow-none">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                  <Wallet className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>High Salaries</CardTitle>
              </CardHeader>
              <CardContent>
                Access global opportunities with competitive pay. No low-ball offers or middlemen taking a massive cut.
              </CardContent>
            </Card>
             <Card className="bg-muted/30 border-none shadow-none">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Remote Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                Work from anywhere. 90% of our partner companies are remote-first and value performance over presence.
              </CardContent>
            </Card>
             <Card className="bg-muted/30 border-none shadow-none">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle>Speed to Hire</CardTitle>
              </CardHeader>
              <CardContent>
                Once vetted, you skip the technical screens. Jump straight to the final culture fit or offer stage.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Exam - Step by Step */}
      <section className="py-24 bg-secondary/30 border-y">
        <div className="container m-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
             <TypographyH2 className="text-3xl border-none mb-4">The Vetting Process</TypographyH2>
             <TypographyMuted>It takes about 4-6 hours to complete. Do it on your own time.</TypographyMuted>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ClipboardList,
                title: "1. Profile & Info",
                desc: "Tell us about your stack and experience level so we can assign the right project."
              },
              {
                icon: Code,
                title: "2. The Project",
                desc: "Build a real-world feature. No algorithms, just clean, maintainable code."
              },
               {
                icon: Video,
                title: "3. Video Walkthrough",
                desc: "Record a 3-min Loom/video explaining your architectural decisions and code."
              },
               {
                icon: Check,
                title: "4. Final Review",
                desc: "Our senior engineers review your code and video. If you pass, you're live."
              }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                 <div className="w-16 h-16 rounded-full border-2 border-primary/20 bg-background flex items-center justify-center mb-6 group-hover:border-primary transition-colors">
                   <step.icon className="w-8 h-8 text-primary" />
                 </div>
                 <TypographyH3 className="mb-2 border-none">{step.title}</TypographyH3>
                 <TypographyMuted className="text-sm">{step.desc}</TypographyMuted>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs / CTA */}
       <section className="py-24">
        <div className="container m-auto px-4 text-center">
          <div className="bg-primary/5 dark:bg-primary/10 rounded-3xl p-8 md:p-16">
            <TypographyH2 className="text-3xl border-none mb-6">Ready to prove your skills?</TypographyH2>
            <TypographyLead className="max-w-xl mx-auto mb-8">
              Join 5,000+ developers who found their dream high-paying remote jobs through TrustLayer.
            </TypographyLead>
             <Button size="lg" className="rounded-full" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-secondary)' }}>
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
