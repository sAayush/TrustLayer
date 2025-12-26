import {
  TypographyH1,
  TypographyLead,
  TypographyP,
} from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-24 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <TypographyH1>Contact Us</TypographyH1>
        <TypographyLead>
          Have questions? We'd love to hear from you.
        </TypographyLead>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                Reach out to our team for any general inquiries or support.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <TypographyP className="font-medium">Email</TypographyP>
                  <TypographyP className="text-sm text-muted-foreground mt-0">
                    support@trustlayer.io
                  </TypographyP>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <TypographyP className="font-medium">Phone</TypographyP>
                  <TypographyP className="text-sm text-muted-foreground mt-0">
                    +1 (555) 123-4567
                  </TypographyP>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <TypographyP className="font-medium">Office</TypographyP>
                  <TypographyP className="text-sm text-muted-foreground mt-0">
                    New Delhi, India
                  </TypographyP>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as
              possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="john@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  className="min-h-[120px]"
                />
              </div>
              <Button type="button" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
