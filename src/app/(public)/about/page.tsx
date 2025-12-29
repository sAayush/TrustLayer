import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Target, MapPin } from "lucide-react";
import { TypographyH1, TypographyH2, TypographyH3, TypographyLead, TypographyMuted, TypographyLarge } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero / Mission */}
      <section className="py-20 md:py-32 bg-muted/20 border-b">
        <div className="container m-auto px-4 text-center max-w-4xl mx-auto space-y-8">
           <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
              Our Mission
           </div>
           <TypographyH1 className="text-4xl md:text-6xl">
            Fixing the Broken Hiring Industry.
          </TypographyH1>
          <TypographyLead>
            We believe ability matters more than a resume. We're building a world where developers get hired for what they can do, not who they know.
          </TypographyLead>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container m-auto px-4">
             <div className="grid md:grid-cols-2 gap-12 items-center">
                 <div className="space-y-6">
                     <TypographyH2 className="text-3xl border-none">Why TrustLayer?</TypographyH2>
                     <p className="text-lg text-muted-foreground">
                         The traditional hiring process is broken. Resume screens filter out great talent, and whiteboard interviews test memorization, not engineering skills.
                     </p>
                     <p className="text-lg text-muted-foreground">
                         We started TrustLayer to create a meritocratic platform. Developers prove their skills through real-world projects, and companies get access to pre-vetted talent without the headache of screening hundreds of unqualified candidates.
                     </p>
                 </div>
                 <div className="bg-muted rounded-2xl aspect-video flex items-center justify-center">
                     {/* Placeholder for story image */}
                     <Target className="w-24 h-24 text-muted-foreground/20" />
                 </div>
             </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-muted/30">
        <div className="container m-auto px-4 text-center">
             <TypographyH2 className="text-3xl border-none mb-16">Meet the Team</TypographyH2>
             <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto justify-center">
                 {/* Founder */}
                 <Card className="p-6">
                     <div className="w-24 h-24 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
                         <span className="text-3xl">👨‍💻</span>
                     </div>
                     <TypographyH3 className="text-xl border-none">Aayush Soni</TypographyH3>
                     <TypographyLarge className="text-primary font-medium mb-2">Founder</TypographyLarge>
                     <TypographyMuted>
                         Building the future of tech hiring.
                     </TypographyMuted>
                 </Card>
                 {/* Add more team members here */}
             </div>
        </div>
      </section>

       {/* Location */}
       <section className="py-24 border-t">
           <div className="container m-auto px-4 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 text-primary">
                    <MapPin className="w-8 h-8" />
                </div>
                <TypographyH2 className="text-3xl border-none mb-4">Our Base</TypographyH2>
                <TypographyMuted className="max-w-md mx-auto mb-8">
                    We are a remote-first company with roots in India.
                </TypographyMuted>
                <TypographyLarge>
                    Not found :)
                </TypographyLarge>
           </div>
       </section>
    </div>
  );
}
