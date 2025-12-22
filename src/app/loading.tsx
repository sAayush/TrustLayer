import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-10">
      <Spinner className="size-10 animate-spin" />
      <p className="text-muted-foreground">Loading...</p>
    </main>
  );
}

