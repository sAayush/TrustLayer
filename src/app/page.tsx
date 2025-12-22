import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-10">
      
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
          Build something <span className="text-primary">amazing</span>
        </h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl">
          This is your landing page. It inherits the dark/light mode from your
          layout automatically.
        </p>
      </section>

      {/* Call to Action */}
      <div className="flex gap-4">
        <Button size="lg">Get Started</Button>
        <Button variant="outline" size="lg">
          Learn More
        </Button>
      </div>

      <Separator className="my-4 w-full max-w-2xl" />

      {/* Test Pages Section */}
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Test Custom Pages</CardTitle>
          <CardDescription>
            Check out the beautiful error, loading, and 404 pages
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <Button asChild variant="outline" className="w-full">
            <Link href="/test-error">
              ⚠️ Error Page
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/test-loading">
              ⏳ Loading Page
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/this-page-does-not-exist">
              🔍 404 Page
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
