"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Home, RefreshCw } from "lucide-react";
import { TypographyP } from "@/components/ui/typography";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Animated Grid Pattern Background */}
      <div className={
        "absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px), " +
        "linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] " +
        "[mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"
      } />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 via-transparent to-destructive/10" />
      
      {/* Floating Dots Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-2 w-2 animate-pulse rounded-full bg-destructive/20" />
        <div className="absolute right-1/3 top-1/3 h-3 w-3 animate-pulse rounded-full bg-destructive/20 [animation-delay:0.5s]" />
        <div className="absolute bottom-1/4 left-1/3 h-2 w-2 animate-pulse rounded-full bg-destructive/20 [animation-delay:1s]" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
            <CardTitle className="text-3xl font-bold">Oops! Something went wrong</CardTitle>
            <CardDescription className="text-base">
              We encountered an unexpected error while processing your request.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <TypographyP className="mb-2 text-sm font-semibold text-muted-foreground">Error Details:</TypographyP>
              <code className="block break-all text-xs text-foreground/80">
                {error.message || "An unknown error occurred"}
              </code>
              {error.digest && (
                <TypographyP className="mt-2 text-xs text-muted-foreground">
                  Error ID: {error.digest}
                </TypographyP>
              )}
            </div>
            
            <div className="rounded-lg border border-border bg-card p-4">
              <TypographyP className="text-sm text-muted-foreground">
                Don&apos;t worry! This error has been logged and our team has been notified. 
                You can try refreshing the page or return to the homepage.
              </TypographyP>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              onClick={reset}
              className="w-full sm:w-auto"
              size="lg"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
              className="w-full sm:w-auto"
              size="lg"
            >
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

