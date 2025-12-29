import { Button } from "@/components/ui/button";
import { Check, Clock, Search, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { 
    TypographyH1, 
    TypographyH2, 
    TypographyH3, 
    TypographyH4, 
    TypographyLead, 
    TypographyMuted 
} from "@/components/ui/typography";

export default function CompaniesPage() {
  return (
    <div className="flex flex-col min-h-screen">
       {/* Hero */}
       <section className="bg-gradient-to-b from-purple-50/50 to-background dark:from-purple-950/20 py-20 md:py-32 border-b">
        <div className="container px-4 text-center max-w-4xl mx-auto space-y-6">
           <TypographyH1 className="text-4xl md:text-6xl">
            Stop Wasting Time on Interviews.<br/>
            <span className="text-purple-600 dark:text-purple-400">Hire Pre-Vetted Talent Today.</span>
          </TypographyH1>
          <TypographyLead className="max-w-2xl mx-auto">
            We&apos;ve already done the hard work. Access a pool of developers who have passed 
            rigorous technical and communication assessments.
          </TypographyLead>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button size="lg" className="rounded-full h-12 px-8 text-base bg-color-tertiary text-white">
              View Available Talent
            </Button>
            <Button variant="outline" size="lg" className="rounded-full h-12 px-8 text-base">
              Book a Call
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24">
        <div className="container px-4">
             <div className="grid md:grid-cols-3 gap-12">
                <div className="space-y-4">
                     <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                         <Clock className="w-6 h-6" />
                     </div>
                     <TypographyH3 className="text-xl font-bold border-none pb-0">Fast Hiring</TypographyH3>
                     <TypographyMuted>
                        Reduce time-to-hire from months to days. Our developers are ready to start immediately.
                    </TypographyMuted>
                </div>
                 <div className="space-y-4">
                     <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                         <Search className="w-6 h-6" />
                     </div>
                     <TypographyH3 className="text-xl font-bold border-none pb-0">Deeply Vetted</TypographyH3>
                     <TypographyMuted>
                        We check code quality, architecture patterns, and communication skills so you don&apos;t have to.
                    </TypographyMuted>
                </div>
                 <div className="space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <TypographyH3 className="text-xl font-bold border-none pb-0">Risk Free</TypographyH3>
                    <TypographyMuted>
                    Pay nothing unless you hire. We offer a satisfaction guarantee on all placements.
                    </TypographyMuted>
                </div>
             </div>
        </div>
      </section>

      {/* Deep Dive Vetting */}
      <section className="py-24 bg-muted/30 border-y">
        <div className="container px-4">
             <div className="mb-16 text-center">
                 <TypographyH2 className="text-3xl border-none mb-4">How We Vet Them</TypographyH2>
                 <TypographyMuted>Our 4-step process ensures top 1% quality.</TypographyMuted>
             </div>
             
             <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
                 <div className="space-y-8">
                     <div className="flex gap-4">
                         <div className="flex-none mt-1">
                             <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 font-bold text-sm">1</div>
                         </div>
                         <div>
                             <TypographyH4 className="text-lg">Identity & Basics</TypographyH4>
                             <TypographyMuted>
                                Verification of identity, basic coding knowledge, and English proficiency.
                             </TypographyMuted>
                         </div>
                     </div>
                     <div className="flex gap-4">
                          <div className="flex-none mt-1">
                             <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 font-bold text-sm">2</div>
                         </div>
                         <div>
                             <TypographyH4 className="text-lg">Project Implementation</TypographyH4>
                             <TypographyMuted>
                                They build a complex, real-world feature (e.g., Auth, Payments) with clean, documented code.
                             </TypographyMuted>
                         </div>
                     </div>
                     <div className="flex gap-4">
                          <div className="flex-none mt-1">
                             <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 font-bold text-sm">3</div>
                         </div>
                         <div>
                             <TypographyH4 className="text-lg">Code Review & Explanation</TypographyH4>
                             <TypographyMuted>
                                We review their GitHub repo and a 3-minute video explanation to assess their thought process.
                             </TypographyMuted>
                         </div>
                     </div>
                      <div className="flex gap-4">
                          <div className="flex-none mt-1">
                             <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 font-bold text-sm">4</div>
                         </div>
                         <div>
                             <TypographyH4>Final Interview</TypographyH4>
                             <TypographyMuted>
                                A senior engineer from our team conducts a final behavioral and technical interview.
                             </TypographyMuted>
                         </div>
                     </div>
                 </div>
                 
                 <Card className="p-8 shadow-lg">
                     <TypographyH3 className="text-xl mb-6 border-none">The Result</TypographyH3>
                     <ul className="space-y-4">
                         <li className="flex items-center gap-3">
                             <Check className="w-5 h-5 text-green-500" />
                             <span>Only 3% pass rate</span>
                         </li>
                          <li className="flex items-center gap-3">
                             <Check className="w-5 h-5 text-green-500" />
                             <span>Senior-level code quality</span>
                         </li>
                          <li className="flex items-center gap-3">
                             <Check className="w-5 h-5 text-green-500" />
                             <span>Clear communication</span>
                         </li>
                          <li className="flex items-center gap-3">
                             <Check className="w-5 h-5 text-green-500" />
                             <span>Ready to onboard instantly</span>
                         </li>
                     </ul>
                 </Card>
             </div>
        </div>
      </section>

      {/* Pricing Teaser / Guarantee */}
      <section className="py-24">
           <div className="container px-4 text-center">
               <div className="max-w-3xl mx-auto space-y-8">
                   <TypographyH2 className="text-3xl border-none">Zero Risk Hiring</TypographyH2>
                   <TypographyLead className="text-lg">
                       You only pay <b>10k INR</b> after a successful 3 months with the candidate. 
                       If it doesn&apos;t work out before then, you owe us nothing.
                   </TypographyLead>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                        <Button size="lg" className="rounded-full bg-color-tertiary text-white">
                            See Detailed Pricing
                        </Button>
                    </div>
               </div>
           </div>
      </section>
    </div>
  );
}
