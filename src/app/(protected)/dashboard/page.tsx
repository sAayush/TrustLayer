import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 text-center">
        <h1 className="text-4xl font-bold">Welcome to the Dashboard</h1>
        <p className="text-lg">You are logged in as {user.email}</p>
        <form action="/auth/signout" method="post">
             <button className="bg-foreground text-background py-2 px-4 rounded hover:opacity-90">
                Sign Out
             </button>
        </form>
      </main>
    </div>
  );
}
