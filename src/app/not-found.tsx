import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Dynamic Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      
      {/* Animated Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-1/4 h-24 w-24 animate-pulse rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-4 bottom-1/4 h-32 w-32 animate-pulse rounded-full bg-accent/5 blur-3xl [animation-delay:1s]" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl">
          <CardHeader className="text-center">
            {/* Large 404 Display */}
            <div className="relative mb-4">
              <h1 className="bg-gradient-to-br from-primary via-primary/80 to-accent bg-clip-text text-9xl font-bold text-transparent">
                404
              </h1>
              <div className="absolute inset-0 -z-10 blur-2xl">
                <h1 className="text-9xl font-bold text-primary/20">404</h1>
              </div>
            </div>
            
            <CardTitle className="text-3xl font-bold">Page Not Found</CardTitle>
            <CardDescription className="text-base">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </CardDescription>
          </CardHeader>
          
          <Separator className="my-4" />
          
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-muted/50 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                The page you&apos;re looking for might have been removed, had its name changed, 
                or is temporarily unavailable.
              </p>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 text-center transition-colors hover:bg-accent/5">
                <Home className="h-8 w-8 text-primary" />
                <p className="text-sm font-medium">Return Home</p>
                <p className="text-xs text-muted-foreground">Start fresh</p>
              </div>
              
              <div className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 text-center transition-colors hover:bg-accent/5">
                <Search className="h-8 w-8 text-primary" />
                <p className="text-sm font-medium">Search</p>
                <p className="text-xs text-muted-foreground">Find content</p>
              </div>
              
              <div className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 text-center transition-colors hover:bg-accent/5">
                <ArrowLeft className="h-8 w-8 text-primary" />
                <p className="text-sm font-medium">Go Back</p>
                <p className="text-xs text-muted-foreground">Previous page</p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              size="lg"
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

