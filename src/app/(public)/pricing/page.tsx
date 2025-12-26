import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TypographyH1, TypographyH2, TypographyH3, TypographyLead, TypographyMuted } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-20 md:py-32 px-4 text-center bg-background">
        <TypographyH1 className="text-4xl md:text-6xl mb-6">
          Simple, Transparent Pricing
        </TypographyH1>
        <TypographyLead className="max-w-2xl mx-auto mb-12">
          No upfront costs. No subscription fees. Pay only when you succeed.
        </TypographyLead>

        <Card className="max-w-lg mx-auto border rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600" />
          
          <TypographyH2 className="text-2xl border-none mb-2">Success Fee</TypographyH2>
          <div className="flex items-baseline justify-center gap-1 mb-6">
            <span className="text-5xl font-extrabold tracking-tight">10,000</span>
            <span className="text-muted-foreground">/ hire</span>
          </div>
          
          <div className="mb-8 text-sm text-muted-foreground">
             Charged only after the candidate completes <span className="font-semibold text-foreground">3 months</span> at your company.
          </div>

          <ul className="space-y-4 text-left mb-8">
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>Unlimited candidate interviews</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>Access to pre-vetted senior talent</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>Zero upfront cost</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>Replacement guarantee</span>
            </li>
          </ul>

          <Button size="lg" className="w-full rounded-full" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-secondary)' }} asChild>
            <Link href="/companies">Hire Talent Now</Link>
          </Button>
        </Card>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container px-4 max-w-3xl mx-auto">
          <TypographyH2 className="text-3xl border-none text-center mb-12">Frequently Asked Questions</TypographyH2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>When do I pay the fee?</AccordionTrigger>
              <AccordionContent>
                We only send you an invoice after the candidate has successfully completed 3 months of employment with you. If they leave before that, you owe us nothing.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is there any cost for developers?</AccordionTrigger>
              <AccordionContent>
                No. TrustLayer is 100% free for developers. We believe you shouldn't have to pay to prove your skills.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What happens if a candidate doesn't work out?</AccordionTrigger>
              <AccordionContent>
                If a candidate leaves or is let go within the first 3 months, you pay nothing. We will also prioritize finding you a replacement immediately.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger>How do you vet the developers?</AccordionTrigger>
              <AccordionContent>
                Our vetting process includes identity verification, a real-world coding project (approx. 4-6 hours), a code review, a video explanation of their architecture, and a final interview with our senior engineers.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
