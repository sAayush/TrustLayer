"use client"

import { useState } from "react";
import { TypographyH1, TypographyLead, TypographyH3 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState<"dev" | "company">("dev");

  return (
    <div className="container  py-12 md:py-24 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <TypographyH1>Frequently Asked Questions</TypographyH1>
        <TypographyLead>
          Everything you need to know about TrustLayer.
        </TypographyLead>
      </div>

      <div className="flex justify-center gap-4">
        <Button 
          variant={activeTab === "dev" ? "default" : "outline"} 
          onClick={() => setActiveTab("dev")}
          className="w-40"
        >
          For Developers
        </Button>
        <Button 
          variant={activeTab === "company" ? "default" : "outline"} 
          onClick={() => setActiveTab("company")}
          className="w-40"
        >
          For Companies
        </Button>
      </div>

      <div className="border rounded-xl p-6 md:p-10 shadow-sm bg-card">
        {activeTab === "dev" ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <TypographyH3>Developer FAQs</TypographyH3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it free to join?</AccordionTrigger>
                <AccordionContent>
                  Yes! TrustLayer is completely free for developers. You only need to pass our vetting process to get listed.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I retake the test if I fail?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can retake the assessment after a 3-month cooling-off period. 
                  This gives you time to improve your skills.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What tech stacks do you support?</AccordionTrigger>
                <AccordionContent>
                  We currently support JavaScript/TypeScript (React, Node.js), 
                  Python, Go, and Java. We are constantly adding new tracks.
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-4">
                <AccordionTrigger>Is this a freelance platform?</AccordionTrigger>
                <AccordionContent>
                  We focus on long-term, full-time remote roles. 
                  While some contract opportunities exist, our main goal is stable employment with top global startups.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <TypographyH3>Company FAQs</TypographyH3>
             <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is the cost?</AccordionTrigger>
                <AccordionContent>
                  We charge a flat success fee of ₹10,000 only after you make a hire. 
                  There are no upfront costs or subscription fees to browse candidates.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What if the developer quits?</AccordionTrigger>
                <AccordionContent>
                  If a developer leaves within the first 3 months, we will replace them for free or refund your success fee. 
                  We stand by our vetting quality.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Do you handle payroll?</AccordionTrigger>
                <AccordionContent>
                   No, you hire the developer directly. We are a talent partner, not an EOR (Employer of Record). 
                   However, we can recommend partners for payroll if needed.
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-4">
                <AccordionTrigger>How long does it take to hire?</AccordionTrigger>
                <AccordionContent>
                  Most companies hire within 7 days. Since our candidates are pre-vetted, 
                  you can skip the technical screening and go straight to the final interview.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </div>

    </div>
  );
}
