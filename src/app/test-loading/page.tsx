import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Simulate a slow loading page - loading.tsx will show while this loads
async function getData() {
  // This delay will trigger the loading.tsx to display
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return { loaded: true };
}

export default async function TestLoadingPage() {
  await getData();
  
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Content Loaded! ✨</CardTitle>
          <CardDescription>
            This content took 3 seconds to load, showing the loading state.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The beautiful loading skeleton you saw was from the <code className="rounded bg-muted px-1 py-0.5">loading.tsx</code> file.
            In a real app, this would be actual data being fetched from an API or database.
          </p>
          <Button asChild variant="outline">
            <Link href="/">← Back to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

