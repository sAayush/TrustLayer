import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TypographyH3, TypographyMuted, TypographySmall } from "@/components/ui/typography";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container m-auto px-4 md:px-8 py-12 md:py-16 max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">TrustLayer</span>
            </Link>
            <TypographyMuted className="mt-4">
              Fixing the broken hiring industry, one vetted developer at a time.
            </TypographyMuted>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 col-span-1 md:col-span-3">
            <div className="flex flex-col gap-3">
              <TypographyH3 className="text-sm font-semibold border-none pb-0">Platform</TypographyH3>
              <Link href="/developers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                For Developers
              </Link>
              <Link href="/companies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                For Companies
              </Link>
              <Link href="/vetting" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </Link>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
            </div>
            
            <div className="flex flex-col gap-3">
              <TypographyH3 className="text-sm font-semibold border-none pb-0">Company</TypographyH3>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>

            <div className="flex flex-col gap-3 col-span-2 md:col-span-1">
              <TypographyH3 className="text-sm font-semibold border-none pb-0">Subscribe</TypographyH3>
              <TypographyMuted className="text-sm">
                Join our newsletter for the latest updates.
              </TypographyMuted>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" className="max-w-[180px]" />
                <Button size="sm">Join</Button>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <TypographySmall>© {new Date().getFullYear()} TrustLayer. All rights reserved.</TypographySmall>
          <div className="flex gap-4">
            <Link href="/legal/terms-and-conditions" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/legal/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/legal/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
